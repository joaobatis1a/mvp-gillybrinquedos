import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getRelatedProducts, products } from "@/lib/data/products";
import { getCategoryBySlug } from "@/lib/data/categories";
import { ProductArt } from "@/components/product/product-image";
import { PriceTag } from "@/components/product/price-tag";
import { Rating } from "@/components/ui/rating";
import { AddToCartPanel } from "@/components/product/add-to-cart-panel";
import { ProductSection } from "@/components/home/product-section";
import { Reveal } from "@/components/effects/reveal";
import {
  ChevronRightIcon,
  CheckIcon,
  AgeIcon,
  StoreIcon,
  TruckIcon,
  ShieldIcon,
  PackageIcon,
} from "@/components/icons";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return {
    title: product ? product.name : "Produto",
    description: product?.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategoryBySlug(product.categorySlug)!;
  const related = getRelatedProducts(product);
  const lowStock = product.stock > 0 && product.stock <= 8;
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav className="flex flex-wrap items-center gap-1 text-sm text-ink-soft">
        <Link href="/" className="link-draw hover:text-gilly">
          Início
        </Link>
        <ChevronRightIcon size={15} className="text-ink-faint" />
        <Link href={`/categoria/${category.slug}`} className="link-draw hover:text-gilly">
          {category.shortName}
        </Link>
        <ChevronRightIcon size={15} className="text-ink-faint" />
        <span className="font-semibold text-ink">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        {/* visual */}
        <Reveal variant="left">
          <div className="group relative">
            <ProductArt
              art={product.art}
              accent={category.accent}
              className="aspect-square w-full border-2 border-border"
              artSize={260}
              seed={product.id}
            />
            {discount > 0 && (
              <span className="absolute left-5 top-5 rounded-full bg-ink px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wide text-white shadow-md">
                {discount}% off
              </span>
            )}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { Icon: StoreIcon, label: "Retire na loja", note: "Grátis em Paulista" },
              { Icon: TruckIcon, label: "Entrega", note: "Grande Recife" },
              { Icon: ShieldIcon, label: "Garantia", note: "7 dias pra trocar" },
            ].map(({ Icon, label, note }) => (
              <div
                key={label}
                className="rounded-2xl border-2 border-border bg-white/80 p-3 text-center"
              >
                <Icon size={20} className="mx-auto text-gilly" />
                <p className="mt-1.5 text-xs font-extrabold text-ink">{label}</p>
                <p className="text-[0.7rem] text-ink-soft">{note}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* informações */}
        <Reveal variant="right">
          <div>
            <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.18em] text-ink-faint">
              {product.brand}
            </p>
            <h1 className="mt-1.5 font-display text-3xl font-extrabold leading-tight text-ink sm:text-[2.6rem]">
              {product.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Rating value={product.rating} count={product.reviewsCount} size={16} />
              <span className="flex items-center gap-1.5 rounded-full bg-cream-deep px-3 py-1 text-xs font-bold text-ink-soft">
                <AgeIcon size={14} />
                {product.ageLabel}
              </span>
            </div>

            <div className="mt-6 rounded-[1.5rem] border-2 border-border bg-white/80 p-5">
              <PriceTag
                price={product.price}
                originalPrice={product.originalPrice}
                installmentsMax={product.installmentsMax}
                size="lg"
              />

              <div className="mt-3 flex flex-wrap items-center gap-2">
                {product.stock === 0 ? (
                  <span className="rounded-full bg-danger-light px-3 py-1.5 text-xs font-extrabold text-danger">
                    Esgotado por enquanto
                  </span>
                ) : lowStock ? (
                  <span className="flex items-center gap-1.5 rounded-full bg-candy-light px-3 py-1.5 text-xs font-extrabold text-candy">
                    <PackageIcon size={14} />
                    Restam {product.stock} em estoque
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 rounded-full bg-success-light px-3 py-1.5 text-xs font-extrabold text-success">
                    <CheckIcon size={14} />
                    Pronta entrega
                  </span>
                )}
              </div>

              <div className="mt-5 border-t border-border pt-5">
                {product.stock > 0 ? (
                  <AddToCartPanel product={product} />
                ) : (
                  <p className="text-sm font-semibold text-danger">
                    Esse acabou. Chama no WhatsApp que a gente avisa quando chegar.
                  </p>
                )}
              </div>
            </div>

            <p className="mt-6 leading-relaxed text-ink-soft">{product.description}</p>

            <div className="mt-5 rounded-[1.5rem] bg-cream-deep/70 p-5">
              <p className="font-display text-sm font-extrabold uppercase tracking-[0.12em] text-ink">
                O que vem
              </p>
              <ul className="mt-3 space-y-2">
                {product.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2.5 text-sm text-ink">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gilly text-white">
                      <CheckIcon size={12} strokeWidth={3} />
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>

      {related.length > 0 && (
        <div className="mt-12 border-t-2 border-border">
          <ProductSection title="Quem levou esse, olhou esses" products={related} />
        </div>
      )}
    </div>
  );
}
