"use client";

import { useState } from "react";
import Image from "next/image";
import { ToyArt, type ToyArtKey } from "@/components/toys/toy-art";

/**
 * Foto de produto num fundo neutro, ao estilo dos grandes marketplaces
 * (sem gradiente colorido nem decoração — deixa a foto ser a protagonista).
 * Se ainda não há foto real cadastrada, cai numa ilustração discreta em
 * escala de cinza em vez de um cartão vazio.
 */
export function ProductPhoto({
  src,
  alt,
  art,
  className,
  sizes = "(min-width: 1024px) 240px, 45vw",
  priority = false,
}: {
  src?: string;
  alt: string;
  art: ToyArtKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [errored, setErrored] = useState(false);
  const showPhoto = Boolean(src) && !errored;

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-[#F7F5F2] ${className ?? ""}`}
    >
      {showPhoto ? (
        <Image
          src={src!}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setErrored(true)}
          className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />
      ) : (
        <span className="opacity-40 grayscale transition-transform duration-500 group-hover:scale-105">
          <ToyArt art={art} size={72} />
        </span>
      )}
    </div>
  );
}
