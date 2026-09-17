"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { useCheckout } from "@/lib/checkout-context";
import { PixPanel } from "@/components/checkout/pix-panel";
import { CreditCardPanel } from "@/components/checkout/credit-card-panel";
import { GillyMascot } from "@/components/mascot/gilly-mascot";
import { Button } from "@/components/ui/button";
import { formatBRL } from "@/lib/format";
import type { Order, PaymentMethod } from "@/lib/types";

export default function PagamentoPage() {
  const router = useRouter();
  const cart = useCart();
  const { user, isHydrated: authHydrated, addOrder } = useAuth();
  const checkout = useCheckout();
  const { address, shipping, paymentMethod, installments, setPaymentMethod, setInstallments, setLastOrder } =
    checkout;

  useEffect(() => {
    if (cart.isHydrated && cart.lines.length === 0) router.replace("/carrinho");
  }, [cart.isHydrated, cart.lines.length, router]);

  useEffect(() => {
    if (checkout.isHydrated && !address) router.replace("/checkout/endereco");
    else if (checkout.isHydrated && address && !shipping) router.replace("/checkout/frete");
  }, [checkout.isHydrated, address, shipping, router]);

  if (!address || !shipping) return null;

  const shippingPrice = cart.freeShipping ? 0 : shipping.price;
  const total = cart.total + shippingPrice;

  function finalizeOrder(method: PaymentMethod, finalInstallments: number) {
    if (!address || !shipping) return;
    const order: Order = {
      id: `GB${Date.now().toString().slice(-8)}`,
      createdAt: new Date().toISOString(),
      items: cart.lines,
      address,
      shipping,
      paymentMethod: method,
      installments: finalInstallments,
      subtotal: cart.subtotal,
      discount: cart.discount,
      total,
      couponCode: cart.couponCode ?? undefined,
      status: "confirmado",
    };
    addOrder(order);
    setLastOrder(order);
    router.push("/checkout/confirmacao");
  }

  if (authHydrated && !user) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border py-16 text-center">
        <GillyMascot mood="love" size={120} />
        <h1 className="font-display text-xl font-bold text-ink">
          Entre na sua conta para finalizar a compra
        </h1>
        <p className="max-w-sm text-ink-soft">
          Assim você acompanha seus pedidos e agiliza as próximas compras.
        </p>
        <div className="flex gap-3">
          <Link href="/conta/login">
            <Button>Entrar</Button>
          </Link>
          <Link href="/conta/cadastro">
            <Button variant="outline">Criar conta</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-ink">Pagamento</h1>

      <div className="mt-4 rounded-2xl bg-surface p-4 text-sm">
        <div className="flex justify-between text-ink-soft">
          <span>Subtotal</span>
          <span>{formatBRL(cart.subtotal)}</span>
        </div>
        {cart.discount > 0 && (
          <div className="flex justify-between text-success">
            <span>Desconto</span>
            <span>-{formatBRL(cart.discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-ink-soft">
          <span>Frete ({shipping.name})</span>
          <span>{shippingPrice === 0 ? "Grátis" : formatBRL(shippingPrice)}</span>
        </div>
        <div className="mt-2 flex justify-between border-t border-border pt-2 font-display text-base font-bold text-ink">
          <span>Total</span>
          <span>{formatBRL(total)}</span>
        </div>
      </div>

      <div className="mt-6 flex gap-2 rounded-full bg-black/5 p-1 text-sm font-bold">
        <button
          onClick={() => setPaymentMethod("pix")}
          className={`flex-1 rounded-full py-2 cursor-pointer ${paymentMethod === "pix" ? "bg-white text-gilly shadow-sm" : "text-ink-soft"}`}
        >
          Pix
        </button>
        <button
          onClick={() => setPaymentMethod("credito")}
          className={`flex-1 rounded-full py-2 cursor-pointer ${paymentMethod === "credito" ? "bg-white text-gilly shadow-sm" : "text-ink-soft"}`}
        >
          Cartão de crédito
        </button>
      </div>

      <div className="mt-6">
        {paymentMethod === "pix" ? (
          <PixPanel amount={total} onConfirm={() => finalizeOrder("pix", 1)} />
        ) : (
          <CreditCardPanel
            amount={total}
            installments={installments}
            onInstallmentsChange={setInstallments}
            onConfirm={() => finalizeOrder("credito", installments)}
          />
        )}
      </div>
    </div>
  );
}
