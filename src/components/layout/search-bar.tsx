"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { SearchIcon, ArrowRightIcon } from "@/components/icons";
import { ToyArt } from "@/components/toys/toy-art";
import { searchProducts } from "@/lib/data/products";
import { formatBRL } from "@/lib/format";

const QUICK_TERMS = ["Hot Wheels", "LEGO", "pelúcia", "Nerf", "quebra-cabeça"];

export function SearchBar({ className }: { className?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");
  const [focused, setFocused] = useState(false);

  const suggestions = useMemo(
    () => (value.trim().length >= 2 ? searchProducts(value).slice(0, 5) : []),
    [value]
  );

  function submit(query: string) {
    const trimmed = query.trim();
    setFocused(false);
    router.push(trimmed ? `/busca?q=${encodeURIComponent(trimmed)}` : "/busca");
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    submit(value);
  }

  const showPanel = focused && (suggestions.length > 0 || value.trim().length < 2);

  return (
    <div className={`relative ${className ?? ""}`}>
      <form onSubmit={handleSubmit} className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint">
          <SearchIcon size={19} />
        </span>
        <input
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => window.setTimeout(() => setFocused(false), 140)}
          placeholder="O que você está procurando hoje?"
          aria-label="Buscar brinquedos"
          className="w-full rounded-full border-2 border-border bg-white/90 py-3 pl-12 pr-14 text-sm font-medium text-ink shadow-[0_2px_0_rgba(227,205,178,0.6)] outline-none transition-all duration-300 placeholder:text-ink-faint focus:border-gilly focus:bg-white focus:shadow-[0_0_0_5px_rgba(242,96,10,0.14)]"
        />
        <button
          type="submit"
          aria-label="Buscar"
          className="squish absolute right-1.5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-gilly text-white transition-colors hover:bg-gilly-dark"
        >
          <ArrowRightIcon size={18} />
        </button>
      </form>

      {showPanel && (
        <div className="absolute left-0 right-0 top-[calc(100%+0.6rem)] z-50 animate-pop overflow-hidden rounded-3xl border-2 border-border bg-white shadow-[var(--shadow-lift)]">
          {suggestions.length > 0 ? (
            <ul className="p-2">
              {suggestions.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/produto/${product.slug}`}
                    onClick={() => setFocused(false)}
                    className="flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-gilly-tint"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cream-deep">
                      <ToyArt art={product.art} size={34} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold text-ink">
                        {product.name}
                      </span>
                      <span className="text-xs text-ink-soft">{product.brand}</span>
                    </span>
                    <span className="shrink-0 font-display text-sm font-bold text-gilly">
                      {formatBRL(product.price)}
                    </span>
                  </Link>
                </li>
              ))}
              <li className="px-3 pb-1 pt-2">
                <button
                  onClick={() => submit(value)}
                  className="w-full rounded-xl bg-cream-deep py-2 text-xs font-bold text-ink-soft transition-colors hover:bg-gilly-light hover:text-gilly-dark"
                >
                  Ver todos os resultados
                </button>
              </li>
            </ul>
          ) : (
            <div className="p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-ink-faint">
                Buscas frequentes
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {QUICK_TERMS.map((term) => (
                  <button
                    key={term}
                    onClick={() => submit(term)}
                    className="squish rounded-full border-2 border-border px-3.5 py-1.5 text-xs font-bold text-ink-soft transition-colors hover:border-gilly hover:bg-gilly-tint hover:text-gilly-dark"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
