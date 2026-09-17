"use client";

import { useFavorites } from "@/lib/favorites-context";
import { HeartIcon } from "@/components/icons";

export function FavoriteButton({
  productId,
  className,
}: {
  productId: string;
  className?: string;
}) {
  const { isFavorite, toggle, isHydrated } = useFavorites();
  const active = isHydrated && isFavorite(productId);

  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggle(productId);
      }}
      aria-pressed={active}
      aria-label={active ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      className={`squish flex items-center justify-center rounded-full border transition-colors duration-200 ${
        active
          ? "border-candy bg-candy text-white"
          : "border-border bg-white/95 text-ink-soft hover:border-candy hover:text-candy"
      } ${className ?? ""}`}
    >
      <HeartIcon size={16} className={active ? "fill-current" : ""} />
    </button>
  );
}
