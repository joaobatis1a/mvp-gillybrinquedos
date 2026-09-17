import { Suspense } from "react";
import type { Metadata } from "next";
import { searchProducts, products } from "@/lib/data/products";
import { FilteredProducts } from "@/components/filters/filtered-products";
import { GillyMascot } from "@/components/mascot/gilly-mascot";
import { Reveal } from "@/components/effects/reveal";
import Link from "next/link";
import { categories } from "@/lib/data/categories";
import { ToyArt } from "@/components/toys/toy-art";

export const metadata: Metadata = { title: "Busca" };

type Props = { searchParams: Promise<{ q?: string }> };

const CURATED: Record<string, { title: string; subtitle: string }> = {
  promo: {
    title: "Tá tudo com desconto aqui",
    subtitle: "Preço que a gente segurou pra essa semana.",
  },
  novidade: {
    title: "Chegou agora na loja",
    subtitle: "Saiu da caixa essa semana e já está disponível.",
  },
  "mais-vendido": {
    title: "Os que mais saem",
    subtitle: "A prateleira que a gente mais repõe.",
  },
};

function resolve(query: string) {
  if (query === "promo") return products.filter((p) => p.originalPrice);
  if (query === "novidade") return products.filter((p) => p.tags?.includes("novidade"));
  if (query === "mais-vendido") return products.filter((p) => p.tags?.includes("mais-vendido"));
  return searchProducts(query);
}

async function SearchResults({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const curated = CURATED[query];
  const results = resolve(query);

  return (
    <div>
      <Reveal>
        <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
          {curated ? (
            curated.title
          ) : query ? (
            <>
              Resultados para <span className="text-gilly">&ldquo;{query}&rdquo;</span>
            </>
          ) : (
            "O que você quer encontrar?"
          )}
        </h1>
        <p className="mt-2 text-ink-soft">
          {curated
            ? curated.subtitle
            : `${results.length} ${results.length === 1 ? "produto encontrado" : "produtos encontrados"}`}
        </p>
      </Reveal>

      <div className="mt-8">
        {results.length > 0 ? (
          <FilteredProducts products={results} />
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-[2rem] border-2 border-dashed border-border bg-white/60 py-16 text-center">
            <GillyMascot mood="search" size={150} />
            <p className="font-display text-2xl font-extrabold text-ink">
              Não achei nada com esse nome
            </p>
            <p className="max-w-md text-ink-soft">
              Tenta escrever de outro jeito, ou dá uma olhada por categoria — costuma ser mais fácil
              de achar.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              {categories.slice(0, 6).map((category) => (
                <Link
                  key={category.slug}
                  href={`/categoria/${category.slug}`}
                  className="squish flex items-center gap-2 rounded-full border-2 border-border bg-white px-4 py-2 text-sm font-bold text-ink-soft transition-colors hover:border-gilly hover:text-gilly-dark"
                >
                  <ToyArt art={category.art} size={20} />
                  {category.shortName}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BuscaPage({ searchParams }: Props) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Suspense fallback={<p className="text-ink-soft">Carregando...</p>}>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
