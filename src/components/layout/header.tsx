"use client";

import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
import { GillyLogo } from "@/components/brand/gilly-logo";
import { SearchBar } from "@/components/layout/search-bar";
import { CartBadge } from "@/components/layout/cart-badge";
import { FavoritesBadge } from "@/components/layout/favorites-badge";
import { AccountMenu } from "@/components/layout/account-menu";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { CategoryThumb } from "@/components/category/category-thumb";
import { categories } from "@/lib/data/categories";
import { MenuIcon, CloseIcon } from "@/components/icons";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catMenuOpen, setCatMenuOpen] = useState(false);
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
            onClick={() => setCatMenuOpen((v) => !v)}
            aria-expanded={catMenuOpen}
            aria-label="Categorias"
            className="squish hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl border-2 border-border text-ink transition-colors hover:border-gilly hover:bg-gilly-tint hover:text-gilly-dark lg:flex"
          >
            <MenuIcon size={20} />
          </button>

          <Suspense fallback={<div className="hidden flex-1 lg:block" />}>
            <SearchBar className="hidden flex-1 lg:block" />
          </Suspense>

          <div className="ml-auto flex items-center gap-1">
            <FavoritesBadge />
            <AccountMenu />
            <CartBadge />
          </div>
        </div>

        <Suspense fallback={null}>
          <SearchBar className="block px-4 pb-3 lg:hidden" />
        </Suspense>
      </div>

      {/* menu de categorias (desktop) */}
      {catMenuOpen && (
        <>
          <button
            aria-hidden
            tabIndex={-1}
            className="fixed inset-0 z-30 hidden cursor-default bg-ink/20 lg:block"
            onClick={() => setCatMenuOpen(false)}
          />
          <div className="absolute left-0 top-full z-40 hidden px-4 pt-3 sm:px-6 lg:block">
            <div className="w-72 animate-pop overflow-hidden rounded-[1.75rem] border-2 border-border bg-white p-3 shadow-[var(--shadow-lift)]">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categoria/${category.slug}`}
                  onClick={() => setCatMenuOpen(false)}
                  className="group flex items-center gap-3 rounded-2xl p-2 transition-colors hover:bg-cream-deep"
                >
                  <CategoryThumb category={category} size={40} />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-extrabold text-ink group-hover:text-gilly-dark">
                      {category.shortName}
                    </span>
                    <span className="block truncate text-xs text-ink-soft">{category.blurb}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}

      {/* menu mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Fechar menu"
            className="absolute inset-0 bg-ink/45"
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
                    <CategoryThumb category={category} size={44} />
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
                  { href: "/favoritos", label: "Meus favoritos" },
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
