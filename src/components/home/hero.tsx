import Link from "next/link";
import { GillyMascot } from "@/components/mascot/gilly-mascot";

const FLOATERS = [
  { emoji: "🚗", top: "8%", left: "8%", delay: "0s" },
  { emoji: "🧸", top: "62%", left: "4%", delay: "0.6s" },
  { emoji: "🎮", top: "10%", left: "80%", delay: "0.3s" },
  { emoji: "⭐", top: "68%", left: "82%", delay: "0.9s" },
  { emoji: "🍳", top: "38%", left: "88%", delay: "1.2s" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gilly-light/60">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-bold text-gilly shadow-sm">
            🎈 Loja de brinquedos em Paulista, PE
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
            Diversão sem limites,
            <br />
            brinquedos <span className="text-gilly">sem igual</span>.
          </h1>
          <p className="mt-4 max-w-md text-base text-ink-soft sm:text-lg">
            Estimulando a imaginação, a criatividade e o aprendizado com os brinquedos
            preferidos da criançada — da primeira infância aos colecionáveis.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/categoria/carrinhos"
              className="rounded-full bg-gilly px-7 py-3.5 font-bold text-white shadow-sm shadow-gilly/30 transition-colors hover:bg-gilly-dark"
            >
              Ver ofertas
            </Link>
            <Link
              href="/categoria/bonecas"
              className="rounded-full border-2 border-gilly bg-white/70 px-7 py-3.5 font-bold text-gilly transition-colors hover:bg-white"
            >
              Explorar categorias
            </Link>
          </div>
        </div>

        <div className="relative mx-auto flex h-72 w-72 items-center justify-center sm:h-96 sm:w-96">
          {FLOATERS.map((floater) => (
            <span
              key={floater.emoji}
              className="absolute animate-float text-4xl drop-shadow-sm sm:text-5xl"
              style={{ top: floater.top, left: floater.left, animationDelay: floater.delay }}
              aria-hidden
            >
              {floater.emoji}
            </span>
          ))}
          <GillyMascot mood="wave" size={220} className="relative" />
        </div>
      </div>

      <svg
        className="block w-full text-cream"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path fill="currentColor" d="M0 30C240 60 480 0 720 15C960 30 1200 60 1440 30V60H0V30Z" />
      </svg>
    </section>
  );
}
