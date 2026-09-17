"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

export function AccountMenu() {
  const { user, logout, isHydrated } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-gilly-light hover:text-gilly-dark cursor-pointer"
        aria-label="Minha conta"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <>
          <button
            aria-hidden
            tabIndex={-1}
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 z-20 mt-2 w-56 rounded-2xl border border-border bg-surface p-2 shadow-xl">
            {isHydrated && user ? (
              <>
                <p className="px-3 py-2 text-sm text-ink-soft">
                  Olá, <span className="font-bold text-ink">{user.name.split(" ")[0]}</span>
                </p>
                <MenuLink href="/conta/dados" onClick={() => setOpen(false)}>
                  Meus dados
                </MenuLink>
                <MenuLink href="/conta/enderecos" onClick={() => setOpen(false)}>
                  Meus endereços
                </MenuLink>
                <MenuLink href="/conta/pedidos" onClick={() => setOpen(false)}>
                  Meus pedidos
                </MenuLink>
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="mt-1 block w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-danger hover:bg-danger-light cursor-pointer"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <MenuLink href="/conta/login" onClick={() => setOpen(false)}>
                  Entrar
                </MenuLink>
                <MenuLink href="/conta/cadastro" onClick={() => setOpen(false)}>
                  Criar conta
                </MenuLink>
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
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block rounded-xl px-3 py-2 text-sm font-semibold text-ink hover:bg-gilly-light hover:text-gilly-dark"
    >
      {children}
    </Link>
  );
}
