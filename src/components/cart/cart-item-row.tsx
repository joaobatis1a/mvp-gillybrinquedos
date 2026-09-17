"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";
import { getCategoryBySlug } from "@/lib/data/categories";
import { ProductImage } from "@/components/product/product-image";
import { formatBRL } from "@/lib/format";
import { useCart } from "@/lib/cart-context";

export function CartItemRow({ product, quantity }: { product: Product; quantity: number }) {
  const { updateQuantity, removeItem } = useCart();
  const category = getCategoryBySlug(product.categorySlug)!;

  return (
    <div className="flex gap-4 border-b border-border py-5 last:border-none">
      <Link href={`/produto/${product.slug}`} className="shrink-0">
        <ProductImage
          emoji={product.emoji}
          accent={category.accent}
          className="h-24 w-24"
          emojiClassName="text-4xl"
        />
      </Link>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-semibold uppercase text-ink-soft">{product.brand}</p>
            <Link
              href={`/produto/${product.slug}`}
              className="font-display font-bold text-ink hover:text-gilly"
            >
              {product.name}
            </Link>
          </div>
          <p className="shrink-0 font-display font-bold text-ink">
            {formatBRL(product.price * quantity)}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center rounded-full border-2 border-border">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="flex h-8 w-8 items-center justify-center text-ink-soft hover:text-gilly cursor-pointer"
              aria-label="Diminuir quantidade"
            >
              −
            </button>
            <span className="w-6 text-center text-sm font-bold text-ink">{quantity}</span>
            <button
              onClick={() => updateQuantity(product.id, Math.min(product.stock, quantity + 1))}
              className="flex h-8 w-8 items-center justify-center text-ink-soft hover:text-gilly cursor-pointer"
              aria-label="Aumentar quantidade"
            >
              +
            </button>
          </div>
          <button
            onClick={() => removeItem(product.id)}
            className="text-sm font-semibold text-danger hover:underline cursor-pointer"
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  );
}
