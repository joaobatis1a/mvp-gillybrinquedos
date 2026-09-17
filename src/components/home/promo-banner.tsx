import Link from "next/link";
import { ToyArt } from "@/components/toys/toy-art";
import { Reveal } from "@/components/effects/reveal";
import { ArrowRightIcon, TagIcon } from "@/components/icons";

const CORNER_TOYS = [
  { art: "brick", className: "left-[6%] top-[14%]", size: 62, delay: "0s" },
  { art: "ball", className: "left-[18%] bottom-[10%]", size: 50, delay: "0.9s" },
  { art: "dough", className: "right-[8%] top-[10%]", size: 58, delay: "0.5s" },
  { art: "boardgame", className: "right-[20%] bottom-[8%]", size: 54, delay: "1.4s" },
] as const;

export function PromoBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Reveal variant="zoom">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gilly px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          {/* listras diagonais */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.16]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(115deg, #fff 0 18px, transparent 18px 46px)",
            }}
          />
          {CORNER_TOYS.map((toy) => (
            <span
              key={toy.art}
              className={`animate-float absolute hidden opacity-90 drop-shadow-[0_12px_18px_rgba(0,0,0,0.2)] lg:block ${toy.className}`}
              style={{ animationDelay: toy.delay }}
            >
              <ToyArt art={toy.art} size={toy.size} />
            </span>
          ))}

          <div className="relative mx-auto max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.18em] backdrop-blur">
              <TagIcon size={15} />
              Semana de ofertas
            </span>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              Tem brinquedo saindo com até 25% off
            </h2>
            <p className="mt-4 text-white/90">
              Separamos o que tá com preço bom de verdade — sem aquela história de aumentar antes pra
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
