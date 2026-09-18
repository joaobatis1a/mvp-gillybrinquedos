"use client";

import { useState } from "react";
import Image from "next/image";
import { ToyArt } from "@/components/toys/toy-art";
import type { Category } from "@/lib/types";

/** Anel e brilho no hover na cor de cada categoria, em vez de um laranja único pra tudo. */
const ACCENT_RING: Record<Category["accent"], string> = {
  candy: "group-hover:border-candy group-hover:shadow-[0_10px_24px_-8px_rgba(255,92,147,0.45)]",
  sky: "group-hover:border-sky group-hover:shadow-[0_10px_24px_-8px_rgba(63,176,229,0.45)]",
  gilly: "group-hover:border-gilly group-hover:shadow-[0_10px_24px_-8px_rgba(242,96,10,0.45)]",
  sun: "group-hover:border-sun group-hover:shadow-[0_10px_24px_-8px_rgba(255,197,61,0.5)]",
  mint: "group-hover:border-mint group-hover:shadow-[0_10px_24px_-8px_rgba(63,196,160,0.45)]",
  grape: "group-hover:border-grape group-hover:shadow-[0_10px_24px_-8px_rgba(139,92,246,0.45)]",
};

/**
 * Miniatura circular de categoria com foto real. Usa object-cover puro
 * (sem zoom artificial) porque as fotos vêm em proporções bem diferentes
 * (quadradas, retrato bem alto etc.) — um zoom fixo cortava justo a parte
 * que identifica o brinquedo (logo, rosto) em várias delas. object-cover
 * simples já resolve a "foto quadrada" sobrando dentro do círculo, e
 * object-position no topo evita cortar a parte de cima da embalagem,
 * que costuma ter o personagem ou a marca.
 */
export function CategoryThumb({ category, size = 84 }: { category: Category; size?: number }) {
  const [errored, setErrored] = useState(false);
  const showPhoto = Boolean(category.image) && !errored;

  return (
    <span
      className={`relative flex shrink-0 -translate-y-0 items-center justify-center overflow-hidden rounded-full border-2 border-border bg-white transition-all duration-300 group-hover:-translate-y-1 ${ACCENT_RING[category.accent]}`}
      style={{ width: size, height: size }}
    >
      {showPhoto ? (
        <Image
          src={category.image!}
          alt=""
          fill
          sizes={`${size}px`}
          quality={90}
          onError={() => setErrored(true)}
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.12]"
        />
      ) : (
        <span className="opacity-45 grayscale transition-transform duration-500 group-hover:scale-110">
          <ToyArt art={category.art} size={Math.round(size * 0.56)} />
        </span>
      )}
    </span>
  );
}
