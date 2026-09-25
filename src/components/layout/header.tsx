"use client";

import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
import { SearchBar } from "@/components/layout/search-bar";
import { CartBadge } from "@/components/layout/cart-badge";
import { FavoritesBadge } from "@/components/layout/favorites-badge";
import { AccountMenu } from "@/components/layout/account-menu";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { CategoryThumb } from "@/components/category/category-thumb";
import { categories } from "@/lib/data/categories";
import {
  MenuIcon,
  CloseIcon,
  ChevronRightIcon,
  HomeIcon,
  PackageIcon,
  HeartIcon,
  CartIcon,
  WhatsAppIcon,
  UserIcon,
  PinIcon,
} from "@/components/icons";

const QUICK_LINKS = [
  { href: "/", label: "Início", Icon: HomeIcon },
  { href: "/conta/pedidos", label: "Meus pedidos", Icon: PackageIcon },
  { href: "/favoritos", label: "Favoritos", Icon: HeartIcon },
  { href: "/carrinho", label: "Carrinho", Icon: CartIcon },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
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
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40">
      <AnnouncementBar />

      <div className="px-3 pb-3 pt-3 sm:px-6">
        <div
          ref={barRef}
          data-scrolled="false"
          className="group/bar mx-auto max-w-7xl rounded-[1.75rem] border border-border/70 bg-white/85 shadow-[0_20px_44px_-26px_rgba(105,62,20,0.4)] backdrop-blur-xl transition-all duration-300 data-[scrolled=true]:shadow-[0_24px_52px_-22px_rgba(242,96,10,0.35)]"
        >
          <div className="flex items-center gap-3 px-4 py-3 transition-all duration-300 group-data-[scrolled=true]/bar:py-2.5 sm:px-5">
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              className="squish group flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-ink transition-all duration-300 hover:bg-gilly-tint hover:text-gilly"
            >
              <MenuIcon size={22} className="transition-transform duration-300 group-hover:rotate-90" />
            </button>

            <Link href="/" className="shrink-0 font-display text-lg font-extrabold leading-none sm:text-xl">
              <span className="text-gilly">Nina</span>
              <span className="text-ink">brinquedos</span>
            </Link>

            <Suspense fallback={<div className="hidden flex-1 lg:block" />}>
              <SearchBar className="hidden flex-1 lg:block" />
            </Suspense>

            <div className="ml-auto flex items-center gap-1">
              <div className="flex items-center gap-1">
                <FavoritesBadge />
                <CartBadge />
              </div>
              <div className="ml-1.5 h-6 w-px bg-border" />
              <AccountMenu />
            </div>
          </div>

          <Suspense fallback={null}>
            <SearchBar className="block px-4 pb-3 lg:hidden" />
          </Suspense>
        </div>
      </div>

      {/* menu — vem sempre da esquerda, mobile e desktop */}
      {menuOpen && (
        <div className="fixed inset-0 z-50">
          <button
            aria-label="Fechar menu"
            className="absolute inset-0 bg-ink/45"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm animate-pop flex-col bg-cream shadow-2xl">
            <Link
              href="/conta/login"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 bg-gilly py-5 pl-5 pr-14 text-white"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/20">
                <UserIcon size={22} />
              </span>
              <span className="flex-1">
                <span className="block font-display text-base font-extrabold leading-tight">
                  Olá! Acesse sua conta
                </span>
                <span className="block text-xs text-white/80">Pedidos, favoritos e mais</span>
              </span>
            </Link>

            <div className="flex items-center gap-2.5 border-b border-border px-5 py-3.5 text-sm">
              <PinIcon size={17} className="shrink-0 text-gilly" />
              <span className="min-w-0 truncate text-ink-soft">
                Loja física em <strong className="text-ink">Paulista, PE</strong>
              </span>
            </div>

            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Fechar menu"
              className="squish absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-2xl bg-white/25 text-white hover:bg-white/35"
            >
              <CloseIcon size={18} />
            </button>

            <div className="thin-scrollbar flex-1 overflow-y-auto">
              <div className="border-b border-border py-2">
                {QUICK_LINKS.map(({ href, label, Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-ink transition-colors hover:bg-gilly-tint"
                  >
                    <Icon size={19} className="shrink-0 text-gilly" />
                    {label}
                  </Link>
                ))}
                <a
                  href="https://wa.me/558140028922"
                  className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-ink transition-colors hover:bg-gilly-tint"
                >
                  <WhatsAppIcon size={19} className="shrink-0 text-gilly" />
                  Ajuda no WhatsApp
                </a>
              </div>

              <p className="px-5 pb-1 pt-4 text-xs font-extrabold uppercase tracking-[0.18em] text-ink-faint">
                Categorias
              </p>
              <div className="pb-4">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/categoria/${category.slug}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-5 py-2.5 transition-colors hover:bg-gilly-tint"
                  >
                    <CategoryThumb category={category} size={36} />
                    <span className="flex-1 truncate text-sm font-bold text-ink">
                      {category.shortName}
                    </span>
                    <ChevronRightIcon size={16} className="shrink-0 text-ink-faint" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
