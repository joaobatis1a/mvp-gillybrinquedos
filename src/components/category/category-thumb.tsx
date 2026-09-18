"use client";

import { useState } from "react";
import Image from "next/image";
import { ToyArt } from "@/components/toys/toy-art";
import type { Category } from "@/lib/types";

/**
 * Miniatura circular de categoria com foto real. Usa object-cover com um
 * leve zoom pra recortar a margem branca que as fotos de produto trazem
 * de fábrica — sem isso, via de regra sobra "foto quadrada" no meio do
 * círculo em vez do brinquedo preenchendo o espaço.
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
          className="scale-[1.3] object-cover transition-transform duration-500 group-hover:scale-[1.42]"
        />
      ) : (
        <span className="opacity-45 grayscale transition-transform duration-500 group-hover:scale-110">
          <ToyArt art={category.art} size={Math.round(size * 0.56)} />
        </span>
      )}
    </span>
  );
}
