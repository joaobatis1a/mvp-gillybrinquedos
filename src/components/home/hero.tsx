"use client";

import Link from "next/link";
import { useRef } from "react";
import { GillyMascot } from "@/components/mascot/gilly-mascot";
import { ToyArt, type ToyArtKey } from "@/components/toys/toy-art";
import {
  ArrowRightIcon,
  StoreIcon,
  TruckIcon,
  CardIcon,
  PinIcon,
  SparkleIcon,
  WhatsAppIcon,
} from "@/components/icons";

type Floater = {
  art: ToyArtKey;
  className: string;
  size: number;
  depth: number;
  delay: string;
  tilt: string;
};

const FLOATERS: Floater[] = [
  { art: "brick", className: "left-[2%] top-[12%]", size: 74, depth: 26, delay: "0s", tilt: "-8deg" },
  { art: "racecar", className: "right-[4%] top-[6%]", size: 86, depth: 18, delay: "0.7s", tilt: "6deg" },
  { art: "plush", className: "left-[6%] bottom-[14%]", size: 80, depth: 32, delay: "1.4s", tilt: "5deg" },
  { art: "dino", className: "right-[0%] bottom-[20%]", size: 78, depth: 22, delay: "0.4s", tilt: "-6deg" },
  { art: "capsule", className: "right-[24%] bottom-[2%]", size: 58, depth: 38, delay: "1.1s", tilt: "9deg" },
  { art: "guitar", className: "left-[26%] top-[0%]", size: 62, depth: 14, delay: "1.8s", tilt: "-10deg" },
];

export function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const dx = (event.clientX - rect.left) / rect.width - 0.5;
    const dy = (event.clientY - rect.top) / rect.height - 0.5;

    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      stage.style.setProperty("--mx", dx.toFixed(3));
      stage.style.setProperty("--my", dy.toFixed(3));
    });
  }

  function handleLeave() {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.setProperty("--mx", "0");
    stage.style.setProperty("--my", "0");
  }

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-10 pt-12 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pb-16 lg:pt-16">
        <div className="relative z-10">
          <span className="inline-flex animate-pop items-center gap-2 rounded-full border-2 border-gilly-light bg-white px-4 py-2 text-xs font-extrabold text-gilly shadow-sm">
            <PinIcon size={15} />
            Loja física em Paulista, PE, bem na beira da PE-15
          </span>

          <h1 className="mt-6 max-w-[15ch] text-balance font-display text-[2.6rem] font-extrabold leading-[1.05] text-ink sm:text-[3.4rem] lg:text-6xl">
            Brinquedo bom é o que a criança
            <span className="relative mx-2 inline-block">
              <span className="relative z-10 text-gilly">não larga</span>
              <svg
                viewBox="0 0 200 24"
                className="absolute -bottom-1 left-0 z-0 w-full text-sun"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M4 16C46 6 92 4 140 9c22 2 40 5 56 9"
                  stroke="currentColor"
                  strokeWidth="9"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.85"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-balance text-base leading-relaxed text-ink-soft sm:text-lg">
            A gente escolhe item por item, abre a caixa, testa e só coloca na prateleira o que daria
            de presente pros nossos. De LEGO a bebê reborn, com quem entende do assunto do outro lado
            do balcão.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/categorias"
              className="shine squish group inline-flex items-center gap-2 rounded-full bg-gilly px-7 py-4 font-extrabold text-white shadow-[0_12px_28px_-12px_rgba(242,96,10,0.9)] transition-colors hover:bg-gilly-dark"
            >
              Ver a loja inteira
              <ArrowRightIcon
                size={19}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/busca?q=promo"
              className="squish inline-flex items-center gap-2 rounded-full border-2 border-ink/15 bg-white/80 px-7 py-4 font-extrabold text-ink backdrop-blur transition-all hover:border-gilly hover:bg-white hover:text-gilly-dark"
            >
              Quero ver o que tá barato
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-ink-soft">
            <span className="flex items-center gap-2">
              <StoreIcon size={18} className="text-gilly" />
              Retirada no mesmo dia
            </span>
            <span className="flex items-center gap-2">
              <TruckIcon size={18} className="text-sky-deep" />
              Entrega na Grande Recife
            </span>
            <span className="flex items-center gap-2">
              <CardIcon size={18} className="text-mint" />
              Até 10x sem juros
            </span>
          </div>
        </div>

        {/* palco ilustrado */}
        <div
          ref={stageRef}
          onPointerMove={handleMove}
          onPointerLeave={handleLeave}
          className="relative mx-auto aspect-square w-full max-w-[34rem]"
          style={{ ["--mx" as string]: "0", ["--my" as string]: "0" }}
        >
          {/* fundo neutro atrás da mascote — um único tom, sem degradê */}
          <div className="absolute inset-[10%] rounded-full bg-gilly-tint" />
          <div className="absolute inset-[19%] rounded-full border border-gilly-light" />

          {/* anel pontilhado girando devagar, dá vida ao palco sem poluir */}
          <svg viewBox="0 0 100 100" className="animate-spin-slow absolute inset-[13%] text-gilly-light">
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="1 7"
              strokeLinecap="round"
            />
          </svg>

          {/* faíscas discretas perto da mascote */}
          <span
            className="animate-sparkle absolute right-[16%] top-[8%] text-sun"
            style={{ animationDelay: "0.4s" }}
          >
            <SparkleIcon size={20} />
          </span>
          <span
            className="animate-sparkle absolute left-[10%] top-[30%] text-candy"
            style={{ animationDelay: "1.6s" }}
          >
            <SparkleIcon size={13} />
          </span>

          {FLOATERS.map((floater) => (
            <span
              key={floater.art}
              className={`animate-float-sm absolute drop-shadow-[0_14px_20px_rgba(105,62,20,0.2)] ${floater.className}`}
              style={{
                animationDelay: floater.delay,
                ["--tilt" as string]: floater.tilt,
                transform: `translate3d(calc(var(--mx) * ${floater.depth}px), calc(var(--my) * ${floater.depth}px), 0)`,
                transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              <ToyArt art={floater.art} size={floater.size} />
            </span>
          ))}

          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: "translate3d(calc(var(--mx) * -14px), calc(var(--my) * -14px), 0)",
              transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <GillyMascot mood="wave" size={300} className="drop-shadow-[0_24px_30px_rgba(105,62,20,0.22)]" />
          </div>

          {/* etiqueta flutuante */}
          <div
            className="animate-float absolute bottom-[8%] left-[4%] rounded-2xl border-2 border-border bg-white px-4 py-3 shadow-[var(--shadow-soft)]"
            style={{ animationDelay: "0.9s" }}
          >
            <p className="text-[0.62rem] font-extrabold uppercase tracking-widest text-ink-faint">
              Oi, eu sou a Gilly
            </p>
            <p className="font-display text-sm font-extrabold text-ink">Te ajudo a escolher?</p>
          </div>

          {/* etiqueta flutuante secundária */}
          <a
            href="https://wa.me/558198930095"
            className="animate-float squish absolute right-[0%] top-[38%] flex items-center gap-2 rounded-2xl border-2 border-border bg-white px-3.5 py-2.5 shadow-[var(--shadow-soft)] transition-colors hover:border-mint"
            style={{ animationDelay: "1.6s" }}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mint/15 text-mint">
              <WhatsAppIcon size={16} />
            </span>
            <span className="font-display text-xs font-extrabold leading-tight text-ink">
              Chama no
              <br />
              WhatsApp
            </span>
          </a>
        </div>
      </div>

      {/* onda de transição */}
      <svg
        className="block w-full text-white/70"
        viewBox="0 0 1440 70"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          fill="currentColor"
          d="M0 34c180 34 360 44 540 24s360-52 540-30 240 40 360 34v12H0z"
        />
      </svg>
    </section>
  );
}
