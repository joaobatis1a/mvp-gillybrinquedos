import Link from "next/link";
import type { Product } from "@/lib/types";
import { ProductGrid } from "@/components/product/product-grid";
import { Reveal } from "@/components/effects/reveal";
import { ArrowRightIcon } from "@/components/icons";

export function ProductSection({
  eyebrow,
  title,
  subtitle,
  products,
  href,
  linkLabel = "Ver tudo",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  products: Product[];
  href?: string;
  linkLabel?: string;
}) {
  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            {eyebrow && (
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-gilly">
                {eyebrow}
              </p>
            )}
            <h2 className="mt-2 font-display text-3xl font-extrabold text-ink sm:text-4xl">
              {title}
            </h2>
            {subtitle && <p className="mt-1.5 max-w-xl text-ink-soft">{subtitle}</p>}
          </div>
          {href && (
            <Link
              href={href}
              className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border-2 border-border bg-white px-4 py-2.5 text-sm font-extrabold text-ink transition-colors hover:border-gilly hover:text-gilly-dark"
            >
              {linkLabel}
              <ArrowRightIcon size={17} className="transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </Reveal>

      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
