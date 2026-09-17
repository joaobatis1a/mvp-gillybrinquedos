"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

const NAV_ITEMS = [
  { href: "/conta/dados", label: "Meus dados" },
  { href: "/conta/enderecos", label: "Meus endereços" },
  { href: "/conta/pedidos", label: "Meus pedidos" },
];

export default function AccountPrivateLayout({ children }: { children: React.ReactNode }) {
  const { user, isHydrated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isHydrated && !user) router.replace("/conta/login");
  }, [isHydrated, user, router]);

  if (!user) return null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="grid gap-8 md:grid-cols-[220px_1fr]">
        <nav className="flex gap-2 overflow-x-auto md:flex-col">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-bold transition-colors ${
                pathname === item.href
                  ? "bg-gilly text-white"
                  : "text-ink-soft hover:bg-gilly-light hover:text-gilly-dark"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div>{children}</div>
      </div>
    </div>
  );
}
