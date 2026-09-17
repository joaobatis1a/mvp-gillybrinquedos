"use client";

import Link from "next/link";
import { useFavorites } from "@/lib/favorites-context";
import { ProductGrid } from "@/components/product/product-grid";
import { GillyMascot } from "@/components/mascot/gilly-mascot";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "@/components/icons";

export default function FavoritosPage() {
  const { products, isHydrated } = useFavorites();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-candy-light text-candy">
          <HeartIcon size={24} />
        </span>
        <div>
          <h1 className="font-display text-3xl font-extrabold text-ink">Meus favoritos</h1>
          <p className="text-ink-soft">Guardado aqui até você decidir levar pra casa.</p>
        </div>
      </div>

      <div className="mt-8">
        {!isHydrated ? null : products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-[2rem] border-2 border-dashed border-border bg-white/60 py-16 text-center">
            <GillyMascot mood="sleepy" size={140} />
            <p className="font-display text-2xl font-extrabold text-ink">
              Sua lista está vazia
            </p>
            <p className="max-w-sm text-ink-soft">
              Clique no coraçãozinho de um produto pra guardar aqui e comparar depois.
            </p>
            <Link href="/categorias">
              <Button size="lg">Ver categorias</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
