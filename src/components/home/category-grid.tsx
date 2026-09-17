import Link from "next/link";
import { categories } from "@/lib/data/categories";
import { CategoryThumb } from "@/components/category/category-thumb";
import { Reveal } from "@/components/effects/reveal";
import { ArrowRightIcon } from "@/components/icons";

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-gilly">
              Escolha por tipo
            </p>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-ink sm:text-4xl">
              O que você veio buscar hoje?
            </h2>
          </div>
          <Link
            href="/categorias"
            className="group inline-flex items-center gap-1.5 text-sm font-extrabold text-gilly hover:text-gilly-dark"
          >
            Ver todas
            <ArrowRightIcon size={17} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Reveal>

      <div className="mt-8 grid grid-cols-3 gap-x-3 gap-y-6 sm:grid-cols-5">
        {categories.map((category, index) => (
          <Reveal key={category.slug} variant="zoom" delay={index * 45}>
            <Link href={`/categoria/${category.slug}`} className="group flex flex-col items-center text-center">
              <CategoryThumb category={category} size={92} />
              <span className="mt-2.5 text-[0.82rem] font-bold leading-tight text-ink group-hover:text-gilly-dark">
                {category.shortName}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
