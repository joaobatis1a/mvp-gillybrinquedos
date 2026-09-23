import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getRelatedProducts, products } from "@/lib/data/products";
import { getCategoryBySlug } from "@/lib/data/categories";
import { ProductGallery } from "@/components/product/product-gallery";
import { PriceTag } from "@/components/product/price-tag";
import { Rating } from "@/components/ui/rating";
import { AddToCartPanel } from "@/components/product/add-to-cart-panel";
import { FavoriteButton } from "@/components/product/favorite-button";
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
            <ProductGallery images={product.images} art={product.art} name={product.name} />
            {discount > 0 && (
              <span className="absolute left-3 top-3 rounded-md bg-danger px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-white shadow-md">
                {discount}% off
              </span>
            )}
            <FavoriteButton
              productId={product.id}
              className="absolute right-3 top-3 h-10 w-10 shadow-md"
            />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { Icon: StoreIcon, label: "Retire na loja", note: "Grátis em Paulista", tone: "bg-gilly", tint: "bg-gilly-tint" },
              { Icon: TruckIcon, label: "Entrega rápida", note: "Grande Recife", tone: "bg-sky-deep", tint: "bg-sky-light" },
              { Icon: ShieldIcon, label: "Garantia real", note: "7 dias pra trocar", tone: "bg-mint", tint: "bg-mint-light" },
            ].map(({ Icon, label, note, tone, tint }) => (
              <div
                key={label}
                className={`group flex flex-col items-center gap-1.5 rounded-2xl border-2 border-white p-3.5 text-center shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 ${tint}`}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-white shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${tone}`}
                >
                  <Icon size={19} />
                </span>
                <p className="text-xs font-extrabold text-ink">{label}</p>
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

            <div className="mt-5 rounded-[1.75rem] border-2 border-dashed border-gilly-light bg-gilly-tint/40 p-5">
              <p className="flex items-center gap-2 font-display text-sm font-extrabold uppercase tracking-[0.12em] text-gilly-deep">
                <PackageIcon size={16} />
                O que vem na caixa
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {product.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-center gap-2.5 rounded-xl bg-white/80 px-3 py-2.5 text-sm font-semibold text-ink shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gilly text-white">
                      <CheckIcon size={12} strokeWidth={3} />
                    </span>
                    {highlight}
                  </div>
                ))}
              </div>
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
