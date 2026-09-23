"use client";

import { useState } from "react";
import Image from "next/image";
import { ToyArt, type ToyArtKey } from "@/components/toys/toy-art";

export function ProductGallery({
  images,
  art,
  name,
}: {
  images: string[] | undefined;
  art: ToyArtKey;
  name: string;
}) {
  const photos = images?.filter(Boolean) ?? [];
  const [active, setActive] = useState(0);
  const [errored, setErrored] = useState<Record<number, boolean>>({});

  const current = photos[active];
  const showPhoto = Boolean(current) && !errored[active];

  return (
    <div>
      <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border border-border bg-white">
        {showPhoto ? (
          <Image
            key={current}
            src={current}
            alt={name}
            fill
            sizes="(min-width: 1024px) 46vw, 92vw"
            priority
            onError={() => setErrored((prev) => ({ ...prev, [active]: true }))}
            className="animate-pop object-contain p-8"
          />
        ) : (
          <span className="opacity-40 grayscale">
            <ToyArt art={art} size={190} />
          </span>
        )}
      </div>

      {photos.length > 1 && (
        <div className="mt-3 flex gap-2.5 overflow-x-auto pb-1">
          {photos.map((photo, index) => (
            <button
              key={photo + index}
              onClick={() => setActive(index)}
              aria-label={`Ver foto ${index + 1}`}
              aria-current={active === index}
              className={`group relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_18px_-10px_rgba(105,62,20,0.4)] ${
                active === index
                  ? "border-gilly shadow-[0_0_0_3px_rgba(242,96,10,0.16)]"
                  : "border-border hover:border-gilly-light"
              }`}
            >
              {!errored[index] ? (
                <Image
                  src={photo}
                  alt=""
                  fill
                  sizes="64px"
                  onError={() => setErrored((prev) => ({ ...prev, [index]: true }))}
                  className="object-contain p-1.5 transition-transform duration-300 group-hover:scale-110"
                />
              ) : (
                <span className="flex h-full items-center justify-center opacity-40 grayscale">
                  <ToyArt art={art} size={30} />
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
