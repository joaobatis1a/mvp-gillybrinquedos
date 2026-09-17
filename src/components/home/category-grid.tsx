import Link from "next/link";
import { categories } from "@/lib/data/categories";
import type { CategoryAccent } from "@/lib/types";

const ACCENT_CLASSES: Record<CategoryAccent, string> = {
  gilly: "bg-gilly-light group-hover:bg-gilly",
  sky: "bg-sky-light group-hover:bg-sky",
  candy: "bg-candy-light group-hover:bg-candy",
  sun: "bg-sun-light group-hover:bg-sun",
};

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex items-end justify-between">
        <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
          Compre por categoria
        </h2>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/categoria/${category.slug}`}
            className="group flex flex-col items-center gap-2 text-center"
          >
            <span
              className={`flex h-20 w-20 items-center justify-center rounded-[2rem] text-4xl transition-colors duration-200 group-hover:scale-105 group-hover:text-white ${ACCENT_CLASSES[category.accent]}`}
            >
              {category.emoji}
            </span>
            <span className="text-sm font-bold text-ink-soft group-hover:text-ink">
              {category.shortName}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
