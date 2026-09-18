"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { GillyMascot } from "@/components/mascot/gilly-mascot";
import {
  ArrowRightIcon,
  StoreIcon,
  TruckIcon,
  CardIcon,
  SparkleIcon,
  WhatsAppBadgeIcon,
} from "@/components/icons";

const CLOUD_PATH =
  "M18 60 A12 12 0 0 1 8 44 A20 20 0 0 1 34 22 A26 26 0 0 1 82 20 A18 18 0 0 1 110 46 A11 11 0 0 1 104 60 Z";

/** Etiqueta com formato de nuvem, no mesmo desenho (gordinho) das nuvens decorativas ao redor. */
function CloudLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative flex aspect-[5/3] items-center justify-center px-6 ${className ?? ""}`}>
      <svg viewBox="0 0 120 72" className="absolute inset-0 h-full w-full text-white" aria-hidden>
        <path d={CLOUD_PATH} fill="currentColor" />
      </svg>
      <div className="relative pb-2">{children}</div>
    </div>
  );
}

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
          <h1 className="animate-pop max-w-[15ch] text-balance font-display text-[2.6rem] font-extrabold leading-[1.05] text-ink sm:text-[3.4rem] lg:text-6xl">
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
              className="squish group inline-flex items-center gap-2 rounded-full bg-gilly px-7 py-4 font-extrabold text-white shadow-[0_12px_28px_-12px_rgba(242,96,10,0.9)] transition-colors hover:bg-gilly-dark"
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
          {/* sol nascendo atrás da mascote, no clima do céu do resto do site */}
          <div
            aria-hidden
            className="animate-glow absolute -right-[4%] -top-[2%] h-[52%] w-[52%] rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(circle, rgba(255,197,61,0.6) 0%, rgba(242,96,10,0.22) 55%, transparent 76%)",
            }}
          />
          <div className="absolute inset-[16%] rounded-full bg-gilly-tint/70" />

          {/* nuvenzinhas passando perto da mascote */}
          <svg viewBox="0 0 120 72" className="animate-float-sm absolute left-[2%] top-[6%] w-[30%] text-white">
            <path
              d="M18 60 A12 12 0 0 1 8 44 A20 20 0 0 1 34 22 A26 26 0 0 1 82 20 A18 18 0 0 1 110 46 A11 11 0 0 1 104 60 Z"
              fill="currentColor"
            />
          </svg>
          <svg
            viewBox="0 0 120 72"
            className="animate-float-sm absolute bottom-[10%] right-[4%] w-[22%] text-white opacity-90"
            style={{ animationDelay: "1.2s" }}
          >
            <path
              d="M18 60 A12 12 0 0 1 8 44 A20 20 0 0 1 34 22 A26 26 0 0 1 82 20 A18 18 0 0 1 110 46 A11 11 0 0 1 104 60 Z"
              fill="currentColor"
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
            className="animate-float absolute bottom-[0%] left-[-4%] w-[58%]"
            style={{ animationDelay: "0.9s" }}
          >
            <CloudLabel className="flex-col">
              <p className="text-center text-[0.6rem] font-extrabold uppercase tracking-widest text-ink-faint">
                Oi, eu sou a Gilly
              </p>
              <p className="text-center font-display text-sm font-extrabold text-ink">
                Te ajudo a escolher?
              </p>
            </CloudLabel>
          </div>

          {/* etiqueta flutuante secundária */}
          <a
            href="https://wa.me/558198930095"
            className="animate-float squish absolute right-[-8%] top-[30%] block w-[52%]"
            style={{ animationDelay: "1.6s" }}
          >
            <CloudLabel>
              <span className="flex items-center gap-2">
                <WhatsAppBadgeIcon size={26} className="shrink-0" />
                <span className="font-display text-xs font-extrabold leading-tight text-ink">
                  Chama no
                  <br />
                  WhatsApp
                </span>
              </span>
            </CloudLabel>
          </a>
        </div>
      </div>
    </section>
  );
}
