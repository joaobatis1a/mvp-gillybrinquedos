"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { UserIcon, PackageIcon, PinIcon, ChevronDownIcon } from "@/components/icons";
import { useAuth } from "@/lib/auth-context";

export function AccountMenu() {
  const { user, logout, isHydrated } = useAuth();
  const [open, setOpen] = useState(false);
  const firstName = user?.name.split(" ")[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="squish group flex h-11 items-center gap-2 rounded-2xl px-2.5 text-ink transition-colors hover:bg-gilly-tint hover:text-gilly-dark"
      >
        <span className="transition-transform duration-300 group-hover:-translate-y-0.5">
          <UserIcon size={21} />
        </span>
        <span className="hidden text-left leading-tight lg:block">
          <span className="block text-[0.65rem] font-semibold text-ink-soft">
            {isHydrated && user ? "Olá," : "Entrar ou"}
          </span>
          <span className="block text-xs font-extrabold">
            {isHydrated && user ? firstName : "criar conta"}
          </span>
        </span>
        <ChevronDownIcon
          size={15}
          className={`hidden transition-transform duration-300 lg:block ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <>
          <button
            aria-hidden
            tabIndex={-1}
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div
            role="menu"
            className="absolute right-0 z-50 mt-3 w-60 animate-pop rounded-3xl border-2 border-border bg-white p-2 shadow-[var(--shadow-lift)]"
          >
            {isHydrated && user ? (
              <>
                <div className="rounded-2xl bg-cream-deep px-3 py-2.5">
                  <p className="text-sm font-extrabold text-ink">{user.name}</p>
                  <p className="truncate text-xs text-ink-soft">{user.email}</p>
                </div>
                <div className="mt-1.5">
                  <MenuLink href="/conta/dados" onClick={() => setOpen(false)} icon={<UserIcon size={17} />}>
                    Meus dados
                  </MenuLink>
                  <MenuLink href="/conta/enderecos" onClick={() => setOpen(false)} icon={<PinIcon size={17} />}>
                    Meus endereços
                  </MenuLink>
                  <MenuLink href="/conta/pedidos" onClick={() => setOpen(false)} icon={<PackageIcon size={17} />}>
                    Meus pedidos
                  </MenuLink>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="mt-1 block w-full rounded-2xl px-3 py-2.5 text-left text-sm font-bold text-danger transition-colors hover:bg-danger-light"
                >
                  Sair da conta
                </button>
              </>
            ) : (
              <>
                <p className="px-3 pb-2 pt-1.5 text-sm text-ink-soft">
                  Entre para acompanhar seus pedidos e comprar mais rápido.
                </p>
                <Link
                  href="/conta/login"
                  onClick={() => setOpen(false)}
                  className="squish block rounded-2xl bg-gilly px-3 py-2.5 text-center text-sm font-bold text-white transition-colors hover:bg-gilly-dark"
                >
                  Entrar
                </Link>
                <Link
                  href="/conta/cadastro"
                  onClick={() => setOpen(false)}
                  className="mt-1.5 block rounded-2xl px-3 py-2.5 text-center text-sm font-bold text-ink-soft transition-colors hover:bg-gilly-tint hover:text-gilly-dark"
                >
                  Criar uma conta
                </Link>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function MenuLink({
  href,
  onClick,
  icon,
  children,
}: {
  href: string;
  onClick: () => void;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      role="menuitem"
      className="group flex items-center gap-2.5 rounded-2xl px-3 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-gilly-tint hover:text-gilly-dark"
    >
      <span className="text-ink-faint transition-colors group-hover:text-gilly">{icon}</span>
      {children}
    </Link>
  );
}
