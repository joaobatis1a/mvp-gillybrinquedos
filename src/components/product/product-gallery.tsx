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
            className="object-contain p-8"
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
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 bg-white transition-colors ${
                active === index ? "border-gilly" : "border-border hover:border-border-strong"
              }`}
            >
              {!errored[index] ? (
                <Image
                  src={photo}
                  alt=""
                  fill
                  sizes="64px"
                  onError={() => setErrored((prev) => ({ ...prev, [index]: true }))}
                  className="object-contain p-1.5"
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
