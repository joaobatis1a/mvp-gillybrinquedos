"use client";

import { useState } from "react";
import Image from "next/image";
import { ToyArt } from "@/components/toys/toy-art";
import type { Category } from "@/lib/types";

/** Brilho de fundo no hover na cor de cada categoria, em vez de um laranja único pra tudo. */
const ACCENT_GLOW: Record<Category["accent"], string> = {
  candy: "bg-candy",
  sky: "bg-sky",
  gilly: "bg-gilly",
  sun: "bg-sun",
  mint: "bg-mint",
  grape: "bg-grape",
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
    <span className="relative inline-flex shrink-0" style={{ width: size, height: size }}>
      <span
        aria-hidden
        className={`absolute inset-0 scale-75 rounded-full opacity-0 blur-md transition-all duration-500 group-hover:scale-110 group-hover:opacity-25 ${ACCENT_GLOW[category.accent]}`}
      />
      <span
        className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-border bg-white transition-transform duration-300 group-hover:[animation:bobble_0.6s_ease-in-out]"
      >
        {showPhoto ? (
          <Image
            src={category.image!}
            alt=""
            fill
            sizes={`${size}px`}
            quality={90}
            onError={() => setErrored(true)}
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.1]"
          />
        ) : (
          <span className="opacity-45 grayscale transition-transform duration-500 group-hover:scale-110">
            <ToyArt art={category.art} size={Math.round(size * 0.56)} />
          </span>
        )}
      </span>
    </span>
  );
}
