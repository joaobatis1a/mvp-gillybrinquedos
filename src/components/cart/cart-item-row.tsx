"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";
import { ProductPhoto } from "@/components/product/product-photo";
import { formatBRL } from "@/lib/format";
import { useCart } from "@/lib/cart-context";
import { PlusIcon, MinusIcon, TrashIcon } from "@/components/icons";

export function CartItemRow({ product, quantity }: { product: Product; quantity: number }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="group flex gap-4 border-b border-border py-5 last:border-none">
      <Link href={`/produto/${product.slug}`} className="shrink-0 rounded-lg border border-border">
        <ProductPhoto
          src={product.images?.[0]}
          alt={product.name}
          art={product.art}
          className="h-24 w-24 rounded-lg"
          sizes="96px"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-ink-faint">
              {product.brand}
            </p>
            <Link
              href={`/produto/${product.slug}`}
              className="link-draw font-display text-[1.02rem] font-bold leading-tight text-ink"
            >
              {product.name}
            </Link>
            <p className="mt-0.5 text-xs text-ink-soft">{formatBRL(product.price)} cada</p>
          </div>
          <p className="shrink-0 font-display text-lg font-extrabold text-ink">
            {formatBRL(product.price * quantity)}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center rounded-full border-2 border-border bg-white">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="squish flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-gilly-tint hover:text-gilly-dark"
              aria-label="Diminuir quantidade"
            >
              <MinusIcon size={16} />
            </button>
            <span className="w-8 text-center text-sm font-extrabold text-ink">{quantity}</span>
            <button
              onClick={() => updateQuantity(product.id, Math.min(product.stock, quantity + 1))}
              className="squish flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-gilly-tint hover:text-gilly-dark"
              aria-label="Aumentar quantidade"
            >
              <PlusIcon size={16} />
            </button>
          </div>

          <button
            onClick={() => removeItem(product.id)}
            className="squish flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-ink-faint transition-colors hover:bg-danger-light hover:text-danger"
          >
            <TrashIcon size={15} />
            Remover
          </button>
        </div>
      </div>
    </div>
  );
}
