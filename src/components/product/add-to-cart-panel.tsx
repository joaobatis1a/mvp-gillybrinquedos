"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";

export function AddToCartPanel({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  function handleAdd() {
    addItem(product.id, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  function handleBuyNow() {
    addItem(product.id, quantity);
    router.push("/carrinho");
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-ink-soft">Quantidade</span>
        <div className="flex items-center rounded-full border-2 border-border">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-10 w-10 items-center justify-center text-lg font-bold text-ink-soft hover:text-gilly cursor-pointer"
            aria-label="Diminuir quantidade"
          >
            −
          </button>
          <span className="w-8 text-center font-bold text-ink">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
            className="flex h-10 w-10 items-center justify-center text-lg font-bold text-ink-soft hover:text-gilly cursor-pointer"
            aria-label="Aumentar quantidade"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button onClick={handleBuyNow} size="lg" className="flex-1">
          Comprar agora
        </Button>
        <Button onClick={handleAdd} variant="outline" size="lg" className="flex-1">
          {justAdded ? "Adicionado! ✓" : "Adicionar ao carrinho"}
        </Button>
      </div>
    </div>
  );
}
