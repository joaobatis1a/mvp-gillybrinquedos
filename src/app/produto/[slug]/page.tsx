import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getRelatedProducts, products } from "@/lib/data/products";
import { getCategoryBySlug } from "@/lib/data/categories";
import { ProductImage } from "@/components/product/product-image";
import { PriceTag } from "@/components/product/price-tag";
import { Rating } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";
import { AddToCartPanel } from "@/components/product/add-to-cart-panel";
import { ProductSection } from "@/components/home/product-section";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return { title: product ? `${product.name} - Gilly Brinquedos` : "Produto" };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategoryBySlug(product.categorySlug)!;
  const related = getRelatedProducts(product);
  const lowStock = product.stock > 0 && product.stock <= 8;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav className="text-sm text-ink-soft">
        <Link href="/" className="hover:text-gilly">
          Início
        </Link>{" "}
        /{" "}
        <Link href={`/categoria/${category.slug}`} className="hover:text-gilly">
          {category.shortName}
        </Link>{" "}
        / <span className="text-ink">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <ProductImage
          emoji={product.emoji}
          accent={category.accent}
          className="aspect-square w-full"
          emojiClassName="text-9xl"
        />

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
            {product.brand}
          </p>
          <h1 className="mt-1 font-display text-3xl font-extrabold text-ink">{product.name}</h1>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Rating value={product.rating} count={product.reviewsCount} />
            <Badge tone="neutral">{product.ageRange}</Badge>
          </div>

          <div className="mt-5">
            <PriceTag
              price={product.price}
              originalPrice={product.originalPrice}
              installmentsMax={product.installmentsMax}
              size="lg"
            />
          </div>

          <div className="mt-3">
            {product.stock === 0 ? (
              <Badge tone="danger">Fora de estoque</Badge>
            ) : lowStock ? (
              <Badge tone="danger">Últimas {product.stock} unidades</Badge>
            ) : (
              <Badge tone="success">Em estoque</Badge>
            )}
          </div>

          <p className="mt-5 text-ink-soft">{product.description}</p>

          <ul className="mt-4 space-y-1.5 text-sm text-ink">
            {product.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2">
                <span className="mt-0.5 text-gilly">✓</span>
                {highlight}
              </li>
            ))}
          </ul>

          <div className="mt-7 border-t border-border pt-6">
            {product.stock > 0 ? (
              <AddToCartPanel product={product} />
            ) : (
              <p className="font-semibold text-danger">
                Este produto está temporariamente indisponível.
              </p>
            )}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-10 border-t border-border">
          <ProductSection title="Você também pode gostar" products={related} />
        </div>
      )}
    </div>
  );
}
