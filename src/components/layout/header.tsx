"use client";

import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
import { GillyLogo } from "@/components/brand/gilly-logo";
import { SearchBar } from "@/components/layout/search-bar";
import { CartBadge } from "@/components/layout/cart-badge";
import { AccountMenu } from "@/components/layout/account-menu";
import { CategoryStrip } from "@/components/layout/category-nav";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { ToyArt } from "@/components/toys/toy-art";
import { categories } from "@/lib/data/categories";
import {
  MenuIcon,
  CloseIcon,
  ChevronDownIcon,
  SparkleIcon,
  TagIcon,
  GiftIcon,
  ArrowRightIcon,
} from "@/components/icons";

const ACCENT_BG = {
  gilly: "bg-gilly-light",
  sky: "bg-sky-light",
  candy: "bg-candy-light",
  sun: "bg-sun-light",
  mint: "bg-mint-light",
  grape: "bg-grape-light",
} as const;

export function Header() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = barRef.current;
    if (!element) return;

    const sync = () => {
      element.dataset.scrolled = window.scrollY > 20 ? "true" : "false";
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40">
      <AnnouncementBar />

      <div
        ref={barRef}
        data-scrolled="false"
        className="group/bar border-b border-border bg-cream/85 backdrop-blur-xl transition-shadow duration-300 data-[scrolled=true]:shadow-[0_10px_30px_-18px_rgba(105,62,20,0.5)]"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 transition-all duration-300 group-data-[scrolled=true]/bar:py-2 sm:px-6">
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menu"
            className="squish flex h-11 w-11 items-center justify-center rounded-2xl text-ink transition-colors hover:bg-gilly-tint lg:hidden"
          >
            <MenuIcon />
          </button>

          <GillyLogo size="md" />

          <button
            onClick={() => setMegaOpen((v) => !v)}
            aria-expanded={megaOpen}
            className="squish ml-2 hidden items-center gap-1.5 rounded-full border-2 border-border px-4 py-2.5 text-sm font-extrabold text-ink transition-all duration-300 hover:border-gilly hover:bg-gilly-tint hover:text-gilly-dark lg:flex"
          >
            Categorias
            <ChevronDownIcon
              size={16}
              className={`transition-transform duration-300 ${megaOpen ? "rotate-180" : ""}`}
            />
          </button>

          <Suspense fallback={<div className="hidden flex-1 lg:block" />}>
            <SearchBar className="hidden flex-1 lg:block" />
          </Suspense>

          <div className="ml-auto flex items-center gap-1">
            <Link
              href="/categoria/jogos"
              className="squish hidden items-center gap-1.5 rounded-2xl px-3 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-sun-light hover:text-gilly-dark xl:flex"
            >
              <GiftIcon size={19} />
              Presentes
            </Link>
            <AccountMenu />
            <CartBadge />
          </div>
        </div>

        <Suspense fallback={null}>
          <SearchBar className="block px-4 pb-3 lg:hidden" />
        </Suspense>

        <div className="hidden lg:block">
          <Suspense fallback={null}>
            <CategoryStrip />
          </Suspense>
        </div>
      </div>

      {/* mega menu */}
      {megaOpen && (
        <>
          <button
            aria-hidden
            tabIndex={-1}
            className="fixed inset-0 z-30 cursor-default bg-ink/20 backdrop-blur-[2px]"
            onClick={() => setMegaOpen(false)}
          />
          <div className="absolute left-0 right-0 top-full z-40 px-4 pt-3 sm:px-6">
            <div className="mx-auto max-w-7xl animate-pop overflow-hidden rounded-[2rem] border-2 border-border bg-white shadow-[var(--shadow-lift)]">
              <div className="grid gap-6 p-6 lg:grid-cols-[1.6fr_1fr]">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-ink-faint">
                    Todas as categorias
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3">
                    {categories.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/categoria/${category.slug}`}
                        onClick={() => setMegaOpen(false)}
                        className="group flex items-center gap-3 rounded-2xl p-2.5 transition-colors hover:bg-cream-deep"
                      >
                        <span
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${ACCENT_BG[category.accent]} transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110`}
                        >
                          <ToyArt art={category.art} size={30} />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-extrabold text-ink group-hover:text-gilly-dark">
                            {category.shortName}
                          </span>
                          <span className="block truncate text-xs text-ink-soft">
                            {category.blurb}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Link
                    href="/busca?q=promo"
                    onClick={() => setMegaOpen(false)}
                    className="group relative flex-1 overflow-hidden rounded-3xl bg-gilly p-5 text-white"
                  >
                    <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/15 transition-transform duration-500 group-hover:scale-125" />
                    <TagIcon size={24} className="relative" />
                    <p className="relative mt-3 font-display text-xl font-extrabold leading-tight">
                      Promoções da semana
                    </p>
                    <p className="relative mt-1 text-sm text-white/85">
                      Tem coisa boa saindo com desconto de verdade.
                    </p>
                    <span className="relative mt-3 inline-flex items-center gap-1.5 text-sm font-bold">
                      Ver ofertas
                      <ArrowRightIcon
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </Link>

                  <Link
                    href="/busca?q=novidade"
                    onClick={() => setMegaOpen(false)}
                    className="group flex items-center gap-3 rounded-3xl border-2 border-border p-4 transition-colors hover:border-sky hover:bg-sky-light"
                  >
                    <SparkleIcon size={22} className="text-sky-deep" />
                    <span>
                      <span className="block text-sm font-extrabold text-ink">Acabou de chegar</span>
                      <span className="block text-xs text-ink-soft">Novidades da semana na loja</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* menu mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Fechar menu"
            className="absolute inset-0 bg-ink/45 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[85%] max-w-sm animate-pop flex-col bg-cream shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <GillyLogo size="sm" href={null} />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Fechar menu"
                className="squish flex h-10 w-10 items-center justify-center rounded-2xl text-ink hover:bg-gilly-tint"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              <p className="px-1 text-xs font-extrabold uppercase tracking-[0.18em] text-ink-faint">
                Categorias
              </p>
              <div className="mt-3 grid gap-1.5">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/categoria/${category.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-center gap-3 rounded-2xl bg-white/70 p-3 transition-colors hover:bg-white"
                  >
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl ${ACCENT_BG[category.accent]}`}
                    >
                      <ToyArt art={category.art} size={28} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-extrabold text-ink">
                        {category.shortName}
                      </span>
                      <span className="block truncate text-xs text-ink-soft">{category.blurb}</span>
                    </span>
                  </Link>
                ))}
              </div>

              <p className="mt-6 px-1 text-xs font-extrabold uppercase tracking-[0.18em] text-ink-faint">
                Minha conta
              </p>
              <div className="mt-3 grid gap-1.5">
                {[
                  { href: "/conta/pedidos", label: "Meus pedidos" },
                  { href: "/conta/enderecos", label: "Meus endereços" },
                  { href: "/conta/dados", label: "Meus dados" },
                  { href: "/carrinho", label: "Carrinho" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-2xl px-3 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-gilly-tint hover:text-gilly-dark"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <a
              href="https://wa.me/558198930095"
              className="m-4 rounded-2xl bg-gilly px-4 py-3 text-center text-sm font-extrabold text-white"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
