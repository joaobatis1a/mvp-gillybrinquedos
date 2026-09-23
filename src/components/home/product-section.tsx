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
              className="squish group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-gilly-tint py-2 pl-4 pr-2 text-sm font-extrabold text-gilly-deep transition-all duration-300 hover:-translate-y-0.5 hover:bg-gilly hover:text-white hover:shadow-[0_12px_24px_-12px_rgba(242,96,10,0.7)]"
            >
              {linkLabel}
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-gilly transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-white/25 group-hover:text-white">
                <ArrowRightIcon size={15} />
              </span>
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
