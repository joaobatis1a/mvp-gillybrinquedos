"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/lib/checkout-context";
import { useCart } from "@/lib/cart-context";
import { GillyMascot } from "@/components/mascot/gilly-mascot";
import { Button } from "@/components/ui/button";
import { formatBRL, formatDate } from "@/lib/format";

const PAYMENT_LABEL = { pix: "Pix", credito: "Cartão de crédito" } as const;

export default function ConfirmacaoPage() {
  const router = useRouter();
  const { lastOrder, isHydrated } = useCheckout();
  const { clear } = useCart();

  useEffect(() => {
    if (isHydrated && !lastOrder) router.replace("/");
  }, [isHydrated, lastOrder, router]);

  useEffect(() => {
    if (lastOrder) clear();
  }, [lastOrder, clear]);

  if (!lastOrder) return null;

  const order = lastOrder;

  return (
    <div className="flex flex-col items-center text-center">
      <GillyMascot mood="celebrate" size={140} />
      <h1 className="mt-2 font-display text-3xl font-extrabold text-ink">Pedido confirmado!</h1>
      <p className="mt-1 text-ink-soft">
        Pedido <span className="font-bold text-ink">#{order.id}</span> feito em{" "}
        {formatDate(order.createdAt)}
      </p>

      <div className="mt-8 w-full rounded-3xl border border-border bg-surface p-6 text-left">
        <h2 className="font-display font-bold text-ink">Itens</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {order.items.map(({ product, quantity }) => (
            <li key={product.id} className="flex justify-between text-ink-soft">
              <span>
                {quantity}x {product.name}
              </span>
              <span>{formatBRL(product.price * quantity)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 space-y-1 border-t border-border pt-4 text-sm text-ink-soft">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatBRL(order.subtotal)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-success">
              <span>Desconto {order.couponCode ? `(${order.couponCode})` : ""}</span>
              <span>-{formatBRL(order.discount)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Frete ({order.shipping.name})</span>
            <span>{formatBRL(order.total - order.subtotal + order.discount)}</span>
          </div>
          <div className="flex justify-between border-t border-border pt-2 font-display text-base font-bold text-ink">
            <span>Total</span>
            <span>{formatBRL(order.total)}</span>
          </div>
        </div>

        <div className="mt-4 grid gap-3 border-t border-border pt-4 text-sm sm:grid-cols-2">
          <div>
            <p className="font-bold text-ink">Entrega</p>
            <p className="text-ink-soft">
              {order.address.street}, {order.address.number} · {order.address.neighborhood}
            </p>
            <p className="text-ink-soft">
              {order.address.city}/{order.address.state} · {order.shipping.name}
            </p>
          </div>
          <div>
            <p className="font-bold text-ink">Pagamento</p>
            <p className="text-ink-soft">
              {PAYMENT_LABEL[order.paymentMethod]}
              {order.paymentMethod === "credito" && order.installments > 1
                ? ` em ${order.installments}x`
                : ""}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/conta/pedidos">
          <Button size="lg">Ver meus pedidos</Button>
        </Link>
        <Link href="/">
          <Button size="lg" variant="outline">
            Continuar comprando
          </Button>
        </Link>
      </div>
    </div>
  );
}
