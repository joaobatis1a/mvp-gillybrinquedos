"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product, ProductTag } from "@/lib/types";
import { ProductPhoto } from "@/components/product/product-photo";
import { PriceTag } from "@/components/product/price-tag";
import { Rating } from "@/components/ui/rating";
import { FavoriteButton } from "@/components/product/favorite-button";
import { TiltCard } from "@/components/effects/tilt-card";
import { CartIcon, CheckIcon, AgeIcon } from "@/components/icons";
import { useCart } from "@/lib/cart-context";

const TAG_STYLE: Record<ProductTag, { label: string; className: string }> = {
  novidade: { label: "Chegou agora", className: "bg-sky text-white" },
  "mais-vendido": { label: "Mais vendido", className: "bg-gilly text-white" },
  "ultimas-unidades": { label: "Últimas unidades", className: "bg-candy text-white" },
  exclusivo: { label: "Exclusivo", className: "bg-grape text-white" },
};

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  function handleAdd() {
    addItem(product.id, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <TiltCard strength={4}>
      <article className="tilt-card group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white transition-shadow duration-200 hover:shadow-[0_10px_28px_-10px_rgba(43,32,24,0.24)]">
        <Link href={`/produto/${product.slug}`} className="tilt-layer relative block">
          <ProductPhoto
            src={product.images?.[0]}
            alt={product.name}
            art={product.art}
            className="aspect-square w-full"
            priority={priority}
          />

          {/* selos */}
          <div className="pointer-events-none absolute left-2.5 top-2.5 flex flex-col items-start gap-1.5">
            {product.tags?.slice(0, 1).map((tag) => (
              <span
                key={tag}
                className={`rounded-md px-2 py-0.5 text-[0.62rem] font-extrabold uppercase tracking-wide shadow-sm ${TAG_STYLE[tag].className}`}
              >
                {TAG_STYLE[tag].label}
              </span>
            ))}
            {discount > 0 && (
              <span className="rounded-md bg-danger px-2 py-0.5 text-[0.62rem] font-extrabold uppercase tracking-wide text-white shadow-sm">
                -{discount}%
              </span>
            )}
          </div>
        </Link>

        <FavoriteButton
          productId={product.id}
          className="absolute right-2.5 top-2.5 h-8 w-8 shadow-sm"
        />

        <div className="flex flex-1 flex-col p-3.5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.08em] text-ink-faint">
              {product.brand}
            </p>
            <span className="flex shrink-0 items-center gap-1 text-[0.65rem] font-bold text-ink-faint">
              <AgeIcon size={12} />
              {product.ageMin === 0 ? "0+" : `${product.ageMin}+`}
            </span>
          </div>

          <h3 className="mt-0.5 line-clamp-2 min-h-[2.6em] text-[0.92rem] font-semibold leading-tight text-ink">
            <Link href={`/produto/${product.slug}`} className="hover:text-gilly-dark">
              {product.name}
            </Link>
          </h3>

          <div className="mt-1.5">
            <Rating value={product.rating} count={product.reviewsCount} />
          </div>

          <div className="mt-auto pt-3">
            <PriceTag
              price={product.price}
              originalPrice={product.originalPrice}
              installmentsMax={product.installmentsMax}
            />
          </div>

          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className={`shine squish group/btn relative mt-3 flex w-full items-center justify-center gap-2 overflow-hidden rounded-full py-2.5 text-sm font-extrabold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
              added
                ? "bg-success text-white"
                : "bg-gilly text-white shadow-[0_8px_18px_-8px_rgba(242,96,10,0.85)] hover:bg-gilly-dark hover:shadow-[0_10px_22px_-8px_rgba(242,96,10,0.95)]"
            }`}
          >
            {added ? (
              <>
                <CheckIcon size={16} />
                Adicionado
              </>
            ) : (
              <>
                <CartIcon
                  size={16}
                  className="transition-transform duration-300 group-hover/btn:-rotate-6 group-hover/btn:scale-110"
                />
                Adicionar
              </>
            )}
          </button>
        </div>
      </article>
    </TiltCard>
  );
}
