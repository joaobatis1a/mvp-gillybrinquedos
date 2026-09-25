import Link from "next/link";
import { Reveal } from "@/components/effects/reveal";
import { ArrowRightIcon, TagIcon, SparkleIcon } from "@/components/icons";

const SPARKLES = [
  { className: "left-[30%] top-[18%]", size: 16, delay: "0s" },
  { className: "right-[28%] top-[26%]", size: 12, delay: "1.1s" },
  { className: "right-[36%] bottom-[22%]", size: 14, delay: "2s" },
] as const;

export function PromoBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Reveal variant="zoom">
        <div className="promo-surface relative overflow-hidden rounded-[2.5rem] px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          {/* brilhos de destaque nos cantos */}
          <div
            aria-hidden
            className="animate-glow pointer-events-none absolute -left-16 -top-20 h-72 w-72 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(255,197,61,0.35) 0%, transparent 72%)" }}
          />
          <div
            aria-hidden
            className="animate-glow pointer-events-none absolute -bottom-24 -right-10 h-80 w-80 rounded-full blur-3xl"
            style={{
              animationDelay: "3s",
              background: "radial-gradient(circle, rgba(242,96,10,0.5) 0%, transparent 74%)",
            }}
          />
          {/* listras diagonais correndo devagar */}
          <div className="stripes-diagonal pointer-events-none opacity-[0.08]" />
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
            <span className="animate-cta-drift mt-8 inline-block">
              <Link
                href="/busca?q=promo"
                className="squish group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-extrabold text-gilly-dark shadow-[0_10px_24px_-10px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[0_18px_34px_-10px_rgba(0,0,0,0.6)]"
              >
                Ver o que está em oferta
                <ArrowRightIcon
                  size={19}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
