"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product, ProductTag } from "@/lib/types";
import { getCategoryBySlug } from "@/lib/data/categories";
import { ProductArt } from "@/components/product/product-image";
import { PriceTag } from "@/components/product/price-tag";
import { Rating } from "@/components/ui/rating";
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
  const category = getCategoryBySlug(product.categorySlug)!;
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
    <TiltCard strength={5}>
      <article className="tilt-card glare group relative flex h-full flex-col overflow-hidden rounded-[1.8rem] border-2 border-border bg-white p-3 shadow-[0_2px_0_rgba(227,205,178,0.7)] transition-[box-shadow,border-color] duration-300 hover:border-gilly-light hover:shadow-[var(--shadow-lift)]">
        <Link href={`/produto/${product.slug}`} className="tilt-layer block" tabIndex={-1}>
          <ProductArt
            art={product.art}
            accent={category.accent}
            className="aspect-square w-full"
            artSize={priority ? 150 : 128}
            seed={product.id}
          />
        </Link>

        {/* selos */}
        <div className="pointer-events-none absolute left-5 top-5 flex flex-col items-start gap-1.5">
          {product.tags?.slice(0, 1).map((tag) => (
            <span
              key={tag}
              className={`rounded-full px-2.5 py-1 text-[0.62rem] font-extrabold uppercase tracking-wide shadow-sm ${TAG_STYLE[tag].className}`}
            >
              {TAG_STYLE[tag].label}
            </span>
          ))}
          {discount > 0 && (
            <span className="rounded-full bg-ink px-2.5 py-1 text-[0.62rem] font-extrabold uppercase tracking-wide text-white shadow-sm">
              -{discount}%
            </span>
          )}
        </div>

        {/* idade */}
        <span className="pointer-events-none absolute right-5 top-5 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[0.62rem] font-extrabold text-ink-soft shadow-sm backdrop-blur">
          <AgeIcon size={12} />
          {product.ageMin === 0 ? "0+" : `${product.ageMin}+`}
        </span>

        <div className="mt-3.5 flex flex-1 flex-col px-1.5">
          <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-ink-faint">
            {product.brand}
          </p>
          <h3 className="mt-1 font-display text-[1.02rem] font-bold leading-tight text-ink">
            <Link href={`/produto/${product.slug}`} className="link-draw">
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
            className={`shine squish mt-3 flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-extrabold transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${
              added
                ? "bg-success text-white"
                : "bg-gilly-light text-gilly-dark hover:bg-gilly hover:text-white"
            }`}
          >
            {added ? (
              <>
                <CheckIcon size={17} />
                Está no carrinho
              </>
            ) : (
              <>
                <CartIcon size={17} />
                Adicionar
              </>
            )}
          </button>
        </div>
      </article>
    </TiltCard>
  );
}
