"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export function CartBadge() {
  const { itemCount, isHydrated } = useCart();

  return (
    <Link
      href="/carrinho"
      aria-label="Carrinho de compras"
      className="relative flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-gilly-light hover:text-gilly-dark"
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="21" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="19" cy="21" r="1.5" fill="currentColor" stroke="none" />
        <path d="M2.5 3h2l2.4 12.4a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {isHydrated && itemCount > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-candy px-1 text-[11px] font-bold text-white">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
