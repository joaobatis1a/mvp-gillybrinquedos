"use client";

import { useState } from "react";
import Image from "next/image";
import { ToyArt } from "@/components/toys/toy-art";
import type { Category } from "@/lib/types";

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
      className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-border bg-white transition-all duration-300 group-hover:border-gilly group-hover:shadow-[0_6px_16px_-6px_rgba(242,96,10,0.4)]"
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
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.08]"
        />
      ) : (
        <span className="opacity-45 grayscale transition-transform duration-500 group-hover:scale-110">
          <ToyArt art={category.art} size={Math.round(size * 0.56)} />
        </span>
      )}
    </span>
  );
}
