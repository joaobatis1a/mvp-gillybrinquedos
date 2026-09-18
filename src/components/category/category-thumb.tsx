"use client";

import { useState } from "react";
import Image from "next/image";
import { ToyArt } from "@/components/toys/toy-art";
import type { Category } from "@/lib/types";

/**
 * Miniatura circular de categoria com foto real. Usa object-contain (em vez
 * de cover) porque as fotos de produto vêm em proporções variadas — cover
 * cortava o produto de forma estranha dentro do círculo.
 */
export function CategoryThumb({ category, size = 84 }: { category: Category; size?: number }) {
  const [errored, setErrored] = useState(false);
  const showPhoto = Boolean(category.image) && !errored;
  const padding = Math.round(size * 0.16);

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
          style={{ padding }}
          onError={() => setErrored(true)}
          className="object-contain transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <span className="opacity-45 grayscale transition-transform duration-500 group-hover:scale-110">
          <ToyArt art={category.art} size={Math.round(size * 0.56)} />
        </span>
      )}
    </span>
  );
}
