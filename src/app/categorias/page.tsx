import Link from "next/link";
import type { Metadata } from "next";
import { categories } from "@/lib/data/categories";
import type { CategoryAccent } from "@/lib/types";

export const metadata: Metadata = { title: "Categorias - Gilly Brinquedos" };

const ACCENT_CLASSES: Record<CategoryAccent, string> = {
  gilly: "bg-gilly-light",
  sky: "bg-sky-light",
  candy: "bg-candy-light",
  sun: "bg-sun-light",
};

export default function CategoriasPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-extrabold text-ink">Categorias</h1>
      <p className="mt-1 text-ink-soft">Encontre o brinquedo perfeito por tipo.</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/categoria/${category.slug}`}
            className={`flex items-center gap-4 rounded-3xl p-5 transition-transform hover:scale-[1.02] ${ACCENT_CLASSES[category.accent]}`}
          >
            <span className="text-4xl" aria-hidden>
              {category.emoji}
            </span>
            <div>
              <p className="font-display font-bold text-ink">{category.name}</p>
              <p className="text-sm text-ink-soft">{category.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
