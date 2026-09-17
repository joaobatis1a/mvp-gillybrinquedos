import Link from "next/link";
import { categories } from "@/lib/data/categories";
import { ToyArt } from "@/components/toys/toy-art";
import { Reveal } from "@/components/effects/reveal";
import { ArrowRightIcon } from "@/components/icons";
import type { CategoryAccent } from "@/lib/types";

const TONE: Record<CategoryAccent, { tile: string; blob: string; ring: string }> = {
  gilly: { tile: "bg-gilly-light", blob: "bg-gilly", ring: "group-hover:border-gilly" },
  sky: { tile: "bg-sky-light", blob: "bg-sky", ring: "group-hover:border-sky" },
  candy: { tile: "bg-candy-light", blob: "bg-candy", ring: "group-hover:border-candy" },
  sun: { tile: "bg-sun-light", blob: "bg-sun", ring: "group-hover:border-sun" },
  mint: { tile: "bg-mint-light", blob: "bg-mint", ring: "group-hover:border-mint" },
  grape: { tile: "bg-grape-light", blob: "bg-grape", ring: "group-hover:border-grape" },
};

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

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((category, index) => {
          const tone = TONE[category.accent];
          return (
            <Reveal key={category.slug} variant="zoom" delay={index * 55}>
              <Link
                href={`/categoria/${category.slug}`}
                className={`group relative flex h-full flex-col items-center overflow-hidden rounded-[1.6rem] border-2 border-border bg-white p-4 text-center transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)] ${tone.ring}`}
              >
                <span
                  className={`absolute -top-16 h-32 w-32 rounded-full opacity-0 blur-2xl transition-all duration-500 group-hover:opacity-30 ${tone.blob}`}
                />
                <span
                  className={`relative flex h-20 w-20 items-center justify-center rounded-[1.4rem] ${tone.tile} transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110`}
                >
                  <ToyArt art={category.art} size={52} />
                </span>
                <span className="relative mt-3 font-display text-sm font-extrabold leading-tight text-ink">
                  {category.shortName}
                </span>
                <span className="relative mt-1 text-xs leading-snug text-ink-soft">
                  {category.blurb}
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
