"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { PlusIcon, MinusIcon, CartIcon, CheckIcon } from "@/components/icons";

export function AddToCartPanel({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  function handleAdd() {
    addItem(product.id, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 2000);
  }

  function handleBuyNow() {
    addItem(product.id, quantity);
    router.push("/carrinho");
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-ink-soft">Quantidade</span>
        <div className="flex items-center rounded-full border-2 border-border bg-white">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="squish flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-gilly-tint hover:text-gilly-dark"
            aria-label="Diminuir quantidade"
          >
            <MinusIcon size={17} />
          </button>
          <span className="w-9 text-center font-display text-lg font-extrabold text-ink">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
            className="squish flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-gilly-tint hover:text-gilly-dark"
            aria-label="Aumentar quantidade"
          >
            <PlusIcon size={17} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 sm:flex-row">
        <button
          onClick={handleBuyNow}
          className="shine squish flex flex-1 items-center justify-center gap-2 rounded-full bg-gilly px-6 py-4 font-extrabold text-white shadow-[0_12px_26px_-14px_rgba(242,96,10,0.95)] transition-colors hover:bg-gilly-dark"
        >
          Comprar agora
        </button>
        <button
          onClick={handleAdd}
          className={`squish flex flex-1 items-center justify-center gap-2 rounded-full border-2 px-6 py-4 font-extrabold transition-colors ${
            justAdded
              ? "border-success bg-success text-white"
              : "border-gilly text-gilly hover:bg-gilly-tint"
          }`}
        >
          {justAdded ? (
            <>
              <CheckIcon size={19} />
              Adicionado
            </>
          ) : (
            <>
              <CartIcon size={19} />
              Pôr no carrinho
            </>
          )}
        </button>
      </div>
    </div>
  );
}
