import Link from "next/link";
import type { Product } from "@/lib/types";
import { ProductGrid } from "@/components/product/product-grid";

export function ProductSection({
  title,
  subtitle,
  products,
  href,
}: {
  title: string;
  subtitle?: string;
  products: Product[];
  href?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">{title}</h2>
          {subtitle && <p className="mt-1 text-ink-soft">{subtitle}</p>}
        </div>
        {href && (
          <Link href={href} className="shrink-0 text-sm font-bold text-gilly hover:text-gilly-dark">
            Ver tudo →
          </Link>
        )}
      </div>
      <div className="mt-6">
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
