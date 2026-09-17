"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { CartIcon } from "@/components/icons";
import { useCart } from "@/lib/cart-context";

export function CartBadge() {
  const { itemCount, isHydrated } = useCart();
  const badgeRef = useRef<HTMLSpanElement>(null);
  const previous = useRef(itemCount);

  useEffect(() => {
    const badge = badgeRef.current;
    if (badge && itemCount > previous.current) {
      badge.classList.remove("animate-bobble");
      void badge.offsetWidth;
      badge.classList.add("animate-bobble");
    }
    previous.current = itemCount;
  }, [itemCount]);

  return (
    <Link
      href="/carrinho"
      aria-label={`Carrinho${itemCount > 0 ? ` com ${itemCount} item(ns)` : " vazio"}`}
      className="squish group relative flex h-11 w-11 items-center justify-center rounded-2xl text-ink transition-colors hover:bg-gilly-tint hover:text-gilly-dark"
    >
      <span className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
        <CartIcon size={21} />
      </span>
      {isHydrated && itemCount > 0 && (
        <span
          ref={badgeRef}
          className="absolute right-0.5 top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-candy px-1 text-[11px] font-extrabold text-white shadow-sm"
        >
          {itemCount}
        </span>
      )}
    </Link>
  );
}
