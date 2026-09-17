"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";
import { getCategoryBySlug } from "@/lib/data/categories";
import { ProductImage } from "@/components/product/product-image";
import { PriceTag } from "@/components/product/price-tag";
import { Rating } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart-context";

const TAG_LABEL: Record<NonNullable<Product["tags"]>[number], string> = {
  novidade: "Novidade",
  "mais-vendido": "Mais vendido",
  "ultimas-unidades": "Últimas unidades",
};

export function ProductCard({ product }: { product: Product }) {
  const category = getCategoryBySlug(product.categorySlug)!;
  const { addItem } = useCart();

  return (
    <div className="group relative flex flex-col rounded-3xl border border-border bg-surface p-3 transition-shadow hover:shadow-lg hover:shadow-ink/5">
      <Link href={`/produto/${product.slug}`} className="block">
        <ProductImage
          emoji={product.emoji}
          accent={category.accent}
          className="aspect-square w-full"
          emojiClassName="text-7xl transition-transform duration-200 group-hover:scale-110"
        />
      </Link>

      {product.tags && product.tags.length > 0 && (
        <div className="absolute left-5 top-5">
          <Badge tone={product.tags[0] === "ultimas-unidades" ? "danger" : "candy"}>
            {TAG_LABEL[product.tags[0]]}
          </Badge>
        </div>
      )}

      <div className="mt-3 flex flex-1 flex-col gap-1.5 px-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
          {product.brand}
        </p>
        <Link href={`/produto/${product.slug}`}>
          <h3 className="font-display text-base font-bold leading-snug text-ink hover:text-gilly">
            {product.name}
          </h3>
        </Link>
        <Rating value={product.rating} count={product.reviewsCount} />
        <div className="mt-auto pt-2">
          <PriceTag
            price={product.price}
            originalPrice={product.originalPrice}
            installmentsMax={product.installmentsMax}
          />
        </div>
        <button
          onClick={() => addItem(product.id, 1)}
          className="mt-2 w-full rounded-full bg-gilly-light py-2.5 text-sm font-bold text-gilly-dark transition-colors hover:bg-gilly hover:text-white cursor-pointer"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}
