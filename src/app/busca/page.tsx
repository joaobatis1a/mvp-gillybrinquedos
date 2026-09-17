import { Suspense } from "react";
import type { Metadata } from "next";
import { searchProducts, products } from "@/lib/data/products";
import { ProductGrid } from "@/components/product/product-grid";
import { GillyMascot } from "@/components/mascot/gilly-mascot";

export const metadata: Metadata = { title: "Busca - Gilly Brinquedos" };

type Props = { searchParams: Promise<{ q?: string }> };

async function SearchResults({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q ?? "";

  const results =
    query === "mais-vendido"
      ? products.filter((p) => p.tags?.includes("mais-vendido"))
      : query === "novidade"
        ? products.filter((p) => p.tags?.includes("novidade"))
        : searchProducts(query);

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
        {query ? (
          <>
            Resultados para <span className="text-gilly">&ldquo;{query}&rdquo;</span>
          </>
        ) : (
          "Buscar produtos"
        )}
      </h1>
      <p className="mt-1 text-ink-soft">{results.length} produto(s) encontrado(s)</p>

      <div className="mt-8">
        {results.length > 0 ? (
          <ProductGrid products={results} />
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border py-16 text-center">
            <GillyMascot mood="search" size={120} />
            <p className="font-display text-lg font-bold text-ink">Nenhum brinquedo encontrado</p>
            <p className="max-w-sm text-ink-soft">
              Tenta buscar por outro nome, marca ou categoria. A Gilly te ajuda a achar!
            </p>
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
