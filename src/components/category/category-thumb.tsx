"use client";

import { useState } from "react";
import Image from "next/image";
import { ToyArt } from "@/components/toys/toy-art";
import type { Category } from "@/lib/types";

/**
 * Miniatura circular de categoria com foto real (estilo "comprar por
 * categoria" da Amazon/Mercado Livre). Sem gradiente — só a foto, um
 * anel neutro e um leve realce laranja no hover/foco.
 */
export function CategoryThumb({ category, size = 84 }: { category: Category; size?: number }) {
  const [errored, setErrored] = useState(false);
  const showPhoto = Boolean(category.image) && !errored;

  return (
    <span
      className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-border bg-[#F7F5F2] transition-all duration-300 group-hover:border-gilly group-hover:shadow-[0_6px_16px_-6px_rgba(242,96,10,0.4)]"
      style={{ width: size, height: size }}
    >
      {showPhoto ? (
        <Image
          src={category.image!}
          alt=""
          fill
          sizes={`${size}px`}
          onError={() => setErrored(true)}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <span className="opacity-45 grayscale transition-transform duration-500 group-hover:scale-110">
          <ToyArt art={category.art} size={Math.round(size * 0.56)} />
        </span>
      )}
    </span>
  );
}
