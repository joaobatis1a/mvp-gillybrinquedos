import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/effects/reveal";
import { ArrowRightIcon, TagIcon, SparkleIcon } from "@/components/icons";

const CORNER_TOYS = [
  {
    src: "https://m.media-amazon.com/images/I/511uNX5p+CL._AC_SX679_.jpg",
    className: "left-[6%] top-[14%]",
    size: 68,
    delay: "0s",
    tilt: "-10deg",
  },
  {
    src: "https://http2.mlstatic.com/D_NQ_NP_802227-MLB52854556942_122022-O.webp",
    className: "left-[16%] bottom-[10%]",
    size: 56,
    delay: "0.9s",
    tilt: "7deg",
  },
  {
    src: "https://m.media-amazon.com/images/I/71NZ4m2GbHL._AC_SX679_.jpg",
    className: "right-[8%] top-[10%]",
    size: 64,
    delay: "0.5s",
    tilt: "8deg",
  },
  {
    src: "https://m.media-amazon.com/images/I/71yJ6Tu7+zL._AC_SX679_.jpg",
    className: "right-[20%] bottom-[8%]",
    size: 60,
    delay: "1.4s",
    tilt: "-6deg",
  },
] as const;

const SPARKLES = [
  { className: "left-[30%] top-[18%]", size: 16, delay: "0s" },
  { className: "right-[28%] top-[26%]", size: 12, delay: "1.1s" },
  { className: "right-[36%] bottom-[22%]", size: 14, delay: "2s" },
] as const;

export function PromoBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Reveal variant="zoom">
        <div
          className="relative overflow-hidden rounded-[2.5rem] px-6 py-12 text-center text-white sm:px-12 sm:py-16"
          style={{
            backgroundImage:
              "linear-gradient(115deg, var(--color-gilly-dark) 0%, var(--color-gilly) 45%, #FF7A2E 75%, var(--color-gilly) 100%)",
            backgroundSize: "220% 220%",
            animation: "gradient-pan 10s ease-in-out infinite",
          }}
        >
          {/* listras diagonais */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.16]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(115deg, #fff 0 18px, transparent 18px 46px)",
            }}
          />
          {/* brilho automático passando pelo banner inteiro */}
          <div className="shine-loop pointer-events-none absolute inset-0" />

          {CORNER_TOYS.map((toy) => (
            <span
              key={toy.src}
              className={`animate-float absolute hidden overflow-hidden rounded-2xl border-2 border-white/70 bg-white shadow-[0_12px_18px_rgba(0,0,0,0.25)] lg:block ${toy.className}`}
              style={{
                width: toy.size,
                height: toy.size,
                animationDelay: toy.delay,
                transform: `rotate(${toy.tilt})`,
              }}
            >
              <Image src={toy.src} alt="" fill sizes={`${toy.size}px`} className="object-cover" />
            </span>
          ))}

          {SPARKLES.map((sparkle, index) => (
            <span
              key={index}
              className={`animate-sparkle pointer-events-none absolute hidden text-white/80 sm:block ${sparkle.className}`}
              style={{ animationDelay: sparkle.delay }}
            >
              <SparkleIcon size={sparkle.size} />
            </span>
          ))}

          <div className="relative mx-auto max-w-xl">
            <span className="animate-pulse-ring inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.18em] backdrop-blur">
              <TagIcon size={15} />
              Semana de ofertas
            </span>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              Tem brinquedo saindo com até 25% off
            </h2>
            <p className="mt-4 text-white/90">
              Separamos o que tá com preço bom de verdade, sem aquela história de aumentar antes pra
              dar desconto depois.
            </p>
            <Link
              href="/busca?q=promo"
              className="shine squish group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-extrabold text-gilly-dark transition-transform hover:scale-[1.03]"
            >
              Ver o que está em oferta
              <ArrowRightIcon
                size={19}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
