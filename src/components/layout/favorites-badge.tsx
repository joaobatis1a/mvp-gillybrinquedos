"use client";

import Link from "next/link";
import { HeartIcon } from "@/components/icons";
import { useFavorites } from "@/lib/favorites-context";

export function FavoritesBadge() {
  const { count, isHydrated } = useFavorites();

  return (
    <Link
      href="/favoritos"
      aria-label={`Favoritos${count > 0 ? ` (${count})` : ""}`}
      className="squish group relative hidden h-11 w-11 items-center justify-center rounded-2xl text-ink transition-colors hover:bg-gilly-tint hover:text-candy sm:flex"
    >
      <span className="transition-transform duration-300 group-hover:scale-110">
        <HeartIcon size={21} />
      </span>
      {isHydrated && count > 0 && (
        <span className="absolute right-0.5 top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-candy px-1 text-[11px] font-extrabold text-white shadow-sm">
          {count}
        </span>
      )}
    </Link>
  );
}
