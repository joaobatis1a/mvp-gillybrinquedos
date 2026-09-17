import Link from "next/link";
import { categories } from "@/lib/data/categories";

export function CategoryNav() {
  return (
    <nav className="border-t border-border/70">
      <div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-4 py-2.5 text-sm font-semibold text-ink-soft sm:px-6">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/categoria/${category.slug}`}
            className="flex shrink-0 items-center gap-1.5 whitespace-nowrap transition-colors hover:text-gilly"
          >
            <span aria-hidden>{category.emoji}</span>
            {category.shortName}
          </Link>
        ))}
      </div>
    </nav>
  );
}
