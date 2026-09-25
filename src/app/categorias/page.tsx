import Link from "next/link";
import type { Metadata } from "next";
import { categories } from "@/lib/data/categories";
import { products } from "@/lib/data/products";
import { CategoryThumb } from "@/components/category/category-thumb";
import { Reveal } from "@/components/effects/reveal";
import { ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Categorias",
  description: "Todas as categorias da Nina Brinquedos.",
};

export default function CategoriasPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <Reveal>
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-gilly">A loja inteira</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold text-ink sm:text-5xl">
          Todas as categorias
        </h1>
        <p className="mt-3 max-w-xl text-ink-soft">
          Dez prateleiras, tudo separado do jeito que a gente organiza na loja física.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => {
          const count = products.filter((p) => p.categorySlug === category.slug).length;

          return (
            <Reveal key={category.slug} variant="zoom" delay={index * 60}>
              <Link
                href={`/categoria/${category.slug}`}
                className="group flex h-full items-center gap-4 rounded-xl border border-border bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gilly hover:shadow-[0_10px_24px_-12px_rgba(43,32,24,0.25)]"
              >
                <CategoryThumb category={category} size={72} />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-display text-lg font-extrabold leading-tight text-ink">
                      {category.name}
                    </h2>
                    <span className="shrink-0 rounded-full bg-cream-deep px-2.5 py-0.5 text-[0.68rem] font-bold text-ink-soft">
                      {count}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm leading-snug text-ink-soft">
                    {category.description}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-extrabold text-gilly-dark">
                    Ver produtos
                    <ArrowRightIcon
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
