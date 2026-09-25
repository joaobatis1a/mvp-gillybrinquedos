"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { CartItemRow } from "@/components/cart/cart-item-row";
import { CouponForm } from "@/components/cart/coupon-form";
import { GillyMascot } from "@/components/mascot/gilly-mascot";
import { Button } from "@/components/ui/button";
import { formatBRL } from "@/lib/format";

export default function CarrinhoPage() {
  const { lines, subtotal, discount, total, freeShipping, isHydrated } = useCart();
  const router = useRouter();

  if (isHydrated && lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-20 text-center sm:px-6">
        <GillyMascot mood="sleepy" size={140} />
        <h1 className="font-display text-2xl font-extrabold text-ink">Seu carrinho está vazio</h1>
        <p className="max-w-sm text-ink-soft">
          Que tal dar uma olhada nos brinquedos mais amados da Nina?
        </p>
        <Button onClick={() => router.push("/")}>Continuar comprando</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
        Meu carrinho
      </h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="rounded-3xl border border-border bg-surface px-5">
          {lines.map(({ product, quantity }) => (
            <CartItemRow key={product.id} product={product} quantity={quantity} />
          ))}
        </div>

        <aside className="h-fit rounded-3xl border border-border bg-surface p-5">
          <h2 className="font-display text-lg font-bold text-ink">Resumo do pedido</h2>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-ink-soft">
              <span>Subtotal</span>
              <span>{formatBRL(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-success">
                <span>Desconto</span>
                <span>-{formatBRL(discount)}</span>
              </div>
            )}
            {freeShipping && (
              <p className="text-xs font-semibold text-success">
                Frete grátis será aplicado na entrega econômica
              </p>
            )}
            <div className="flex justify-between border-t border-border pt-2 font-display text-base font-bold text-ink">
              <span>Total</span>
              <span>{formatBRL(total)}</span>
            </div>
          </div>

          <div className="mt-4">
            <CouponForm />
          </div>

          <Link href="/checkout/endereco" className="mt-5 block">
            <Button size="lg" className="w-full">
              Ir para o checkout
            </Button>
          </Link>
        </aside>
      </div>
    </div>
  );
}
