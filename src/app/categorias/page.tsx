import Link from "next/link";
import type { Metadata } from "next";
import { categories } from "@/lib/data/categories";
import { products } from "@/lib/data/products";
import { ToyArt } from "@/components/toys/toy-art";
import { Reveal } from "@/components/effects/reveal";
import { ArrowRightIcon } from "@/components/icons";
import type { CategoryAccent } from "@/lib/types";

export const metadata: Metadata = {
  title: "Categorias",
  description: "Todas as categorias da Gilly Brinquedos.",
};

const TONE: Record<CategoryAccent, { bg: string; chip: string; hover: string }> = {
  gilly: { bg: "from-gilly-light to-white", chip: "bg-gilly text-white", hover: "hover:border-gilly" },
  sky: { bg: "from-sky-light to-white", chip: "bg-sky text-white", hover: "hover:border-sky" },
  candy: { bg: "from-candy-light to-white", chip: "bg-candy text-white", hover: "hover:border-candy" },
  sun: { bg: "from-sun-light to-white", chip: "bg-sun text-ink", hover: "hover:border-sun" },
  mint: { bg: "from-mint-light to-white", chip: "bg-mint text-white", hover: "hover:border-mint" },
  grape: { bg: "from-grape-light to-white", chip: "bg-grape text-white", hover: "hover:border-grape" },
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
          const tone = TONE[category.accent];

          return (
            <Reveal key={category.slug} variant="zoom" delay={index * 60}>
              <Link
                href={`/categoria/${category.slug}`}
                className={`group relative flex h-full flex-col overflow-hidden rounded-[2rem] border-2 border-border bg-gradient-to-br p-6 transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)] ${tone.bg} ${tone.hover}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-white shadow-sm transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <ToyArt art={category.art} size={52} />
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-[0.68rem] font-extrabold uppercase tracking-wide ${tone.chip}`}
                  >
                    {count} {count === 1 ? "item" : "itens"}
                  </span>
                </div>

                <h2 className="mt-5 font-display text-xl font-extrabold leading-tight text-ink">
                  {category.name}
                </h2>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-soft">
                  {category.description}
                </p>

                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-extrabold text-gilly-dark">
                  Ver produtos
                  <ArrowRightIcon
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1.5"
                  />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
