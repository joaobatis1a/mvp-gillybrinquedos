"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/lib/data/categories";

export function CategoryStrip() {
  const pathname = usePathname();

  return (
    <nav aria-label="Categorias" className="border-t border-border/70">
      <div className="no-scrollbar mx-auto flex max-w-7xl gap-1 overflow-x-auto px-3 py-2 sm:px-6">
        {categories.map((category) => {
          const href = `/categoria/${category.slug}`;
          const active = pathname === href;
          return (
            <Link
              key={category.slug}
              href={href}
              className={`relative shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[0.82rem] font-bold transition-all duration-300 ${
                active
                  ? "bg-gilly text-white shadow-sm"
                  : "text-ink-soft hover:bg-gilly-tint hover:text-gilly-dark"
              }`}
            >
              {category.shortName}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
