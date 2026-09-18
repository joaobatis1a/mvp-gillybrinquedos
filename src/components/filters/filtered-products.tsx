"use client";

import { useMemo, useState } from "react";
import type { Product, SortOption } from "@/lib/types";
import { ProductGrid } from "@/components/product/product-grid";
import { GillyMascot } from "@/components/mascot/gilly-mascot";
import { formatBRL } from "@/lib/format";
import {
  FilterIcon,
  CloseIcon,
  CheckIcon,
  SlidersIcon,
  ChevronDownIcon,
} from "@/components/icons";

const AGE_BUCKETS = [
  { id: "0-2", label: "Até 2 anos", test: (age: number) => age <= 2 },
  { id: "3-5", label: "3 a 5 anos", test: (age: number) => age >= 3 && age <= 5 },
  { id: "6-8", label: "6 a 8 anos", test: (age: number) => age >= 6 && age <= 8 },
  { id: "9+", label: "9 anos ou mais", test: (age: number) => age >= 9 },
] as const;

const SORT_LABEL: Record<SortOption, string> = {
  relevancia: "Mais relevantes",
  "menor-preco": "Menor preço",
  "maior-preco": "Maior preço",
  avaliacao: "Melhor avaliados",
  novidades: "Novidades primeiro",
};

export function FilteredProducts({ products }: { products: Product[] }) {
  const brands = useMemo(
    () => [...new Set(products.map((p) => p.brand))].sort((a, b) => a.localeCompare(b, "pt-BR")),
    [products]
  );
  const ceiling = useMemo(
    () => Math.ceil(Math.max(...products.map((p) => p.price), 100) / 50) * 50,
    [products]
  );

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedAges, setSelectedAges] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(ceiling);
  const [onlyPromo, setOnlyPromo] = useState(false);
  const [sort, setSort] = useState<SortOption>("relevancia");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeCount =
    selectedBrands.length + selectedAges.length + (onlyPromo ? 1 : 0) + (maxPrice < ceiling ? 1 : 0);

  const visible = useMemo(() => {
    const filtered = products.filter((product) => {
      if (selectedBrands.length && !selectedBrands.includes(product.brand)) return false;
      if (
        selectedAges.length &&
        !AGE_BUCKETS.some((b) => selectedAges.includes(b.id) && b.test(product.ageMin))
      ) {
        return false;
      }
      if (product.price > maxPrice) return false;
      if (onlyPromo && !product.originalPrice) return false;
      return true;
    });

    const sorted = [...filtered];
    if (sort === "menor-preco") sorted.sort((a, b) => a.price - b.price);
    if (sort === "maior-preco") sorted.sort((a, b) => b.price - a.price);
    if (sort === "avaliacao") sorted.sort((a, b) => b.rating - a.rating);
    if (sort === "novidades") {
      sorted.sort(
        (a, b) => Number(!!b.tags?.includes("novidade")) - Number(!!a.tags?.includes("novidade"))
      );
    }
    return sorted;
  }, [products, selectedBrands, selectedAges, maxPrice, onlyPromo, sort]);

  function toggle(list: string[], setList: (value: string[]) => void, value: string) {
    setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  }

  function clearAll() {
    setSelectedBrands([]);
    setSelectedAges([]);
    setMaxPrice(ceiling);
    setOnlyPromo(false);
  }

  const panel = (
    <div className="space-y-6">
      <FilterBlock title="Faixa de idade">
        <div className="space-y-1.5">
          {AGE_BUCKETS.map((bucket) => (
            <CheckRow
              key={bucket.id}
              checked={selectedAges.includes(bucket.id)}
              onChange={() => toggle(selectedAges, setSelectedAges, bucket.id)}
              label={bucket.label}
            />
          ))}
        </div>
      </FilterBlock>

      <FilterBlock title="Preço até">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-ink-soft">R$</span>
          <input
            type="number"
            min={50}
            max={ceiling}
            step={10}
            value={maxPrice}
            onChange={(event) => {
              const raw = Number(event.target.value);
              if (!Number.isNaN(raw)) setMaxPrice(Math.min(Math.max(raw, 0), ceiling));
            }}
            aria-label="Digitar preço máximo"
            className="w-24 rounded-lg border-2 border-border bg-white px-2 py-1.5 text-sm font-bold text-ink outline-none focus:border-gilly"
          />
        </div>
        <input
          type="range"
          min={50}
          max={ceiling}
          step={10}
          value={maxPrice}
          onChange={(event) => setMaxPrice(Number(event.target.value))}
          className="mt-3 w-full accent-[#F2600A]"
          aria-label="Preço máximo (arrastar)"
        />
        <div className="mt-1 flex justify-between text-[0.7rem] font-semibold text-ink-faint">
          <span>{formatBRL(50)}</span>
          <span>{formatBRL(ceiling)}</span>
        </div>
      </FilterBlock>

      <FilterBlock title="Marca">
        <div className="max-h-56 space-y-1.5 overflow-y-auto pr-1">
          {brands.map((brand) => (
            <CheckRow
              key={brand}
              checked={selectedBrands.includes(brand)}
              onChange={() => toggle(selectedBrands, setSelectedBrands, brand)}
              label={brand}
            />
          ))}
        </div>
      </FilterBlock>

      <FilterBlock title="Ofertas">
        <CheckRow
          checked={onlyPromo}
          onChange={() => setOnlyPromo((v) => !v)}
          label="Só produtos com desconto"
        />
      </FilterBlock>

      {activeCount > 0 && (
        <button
          onClick={clearAll}
          className="squish w-full rounded-full border-2 border-border py-2.5 text-sm font-bold text-ink-soft transition-colors hover:border-danger hover:bg-danger-light hover:text-danger"
        >
          Limpar filtros
        </button>
      )}
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
      {/* sidebar desktop */}
      <aside className="hidden lg:block">
        <div className="sticky top-52 rounded-[1.8rem] border-2 border-border bg-white/80 p-5 backdrop-blur">
          <p className="flex items-center gap-2 font-display text-lg font-extrabold text-ink">
            <SlidersIcon size={19} className="text-gilly" />
            Filtrar
          </p>
          <div className="mt-5">{panel}</div>
        </div>
      </aside>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-ink-soft">
            <span className="font-extrabold text-ink">{visible.length}</span>{" "}
            {visible.length === 1 ? "produto" : "produtos"}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDrawerOpen(true)}
              className="squish flex items-center gap-2 rounded-full border-2 border-border bg-white px-4 py-2.5 text-sm font-bold text-ink transition-colors hover:border-gilly hover:text-gilly-dark lg:hidden"
            >
              <FilterIcon size={17} />
              Filtrar
              {activeCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gilly px-1 text-[0.65rem] font-extrabold text-white">
                  {activeCount}
                </span>
              )}
            </button>

            <div className="relative">
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortOption)}
                aria-label="Ordenar produtos"
                className="squish cursor-pointer appearance-none rounded-full border-2 border-border bg-white py-2.5 pl-4 pr-10 text-sm font-bold text-ink outline-none transition-colors hover:border-gilly focus:border-gilly"
              >
                {(Object.keys(SORT_LABEL) as SortOption[]).map((option) => (
                  <option key={option} value={option}>
                    {SORT_LABEL[option]}
                  </option>
                ))}
              </select>
              <ChevronDownIcon
                size={16}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-soft"
              />
            </div>
          </div>
        </div>

        {/* chips ativos */}
        {activeCount > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedAges.map((age) => (
              <Chip
                key={age}
                label={AGE_BUCKETS.find((b) => b.id === age)!.label}
                onRemove={() => toggle(selectedAges, setSelectedAges, age)}
              />
            ))}
            {selectedBrands.map((brand) => (
              <Chip
                key={brand}
                label={brand}
                onRemove={() => toggle(selectedBrands, setSelectedBrands, brand)}
              />
            ))}
            {maxPrice < ceiling && (
              <Chip label={`Até ${formatBRL(maxPrice)}`} onRemove={() => setMaxPrice(ceiling)} />
            )}
            {onlyPromo && <Chip label="Com desconto" onRemove={() => setOnlyPromo(false)} />}
          </div>
        )}

        <div className="mt-6">
          {visible.length > 0 ? (
            <ProductGrid products={visible} />
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-[2rem] border-2 border-dashed border-border bg-white/60 py-16 text-center">
              <GillyMascot mood="search" size={130} />
              <p className="font-display text-xl font-extrabold text-ink">
                Nada bateu com esses filtros
              </p>
              <p className="max-w-sm text-ink-soft">
                Tenta afrouxar um pouco: tirar uma marca ou subir o preço costuma resolver.
              </p>
              <button
                onClick={clearAll}
                className="squish mt-1 rounded-full bg-gilly px-6 py-2.5 text-sm font-extrabold text-white hover:bg-gilly-dark"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </div>

      {/* drawer mobile */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Fechar filtros"
            className="absolute inset-0 bg-ink/45 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 flex w-[88%] max-w-sm animate-pop flex-col bg-cream shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <p className="font-display text-lg font-extrabold text-ink">Filtrar</p>
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Fechar filtros"
                className="squish flex h-10 w-10 items-center justify-center rounded-2xl hover:bg-gilly-tint"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-5">{panel}</div>
            <button
              onClick={() => setDrawerOpen(false)}
              className="m-4 rounded-full bg-gilly py-3 text-sm font-extrabold text-white"
            >
              Ver {visible.length} {visible.length === 1 ? "produto" : "produtos"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2.5 text-xs font-extrabold uppercase tracking-[0.14em] text-ink-faint">
        {title}
      </p>
      {children}
    </div>
  );
}

function CheckRow({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onChange}
      aria-pressed={checked}
      className="group flex w-full items-center gap-2.5 rounded-xl px-1.5 py-1.5 text-left transition-colors hover:bg-gilly-tint"
    >
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200 ${
          checked
            ? "border-gilly bg-gilly text-white"
            : "border-border-strong bg-white group-hover:border-gilly"
        }`}
      >
        {checked && <CheckIcon size={13} strokeWidth={3} />}
      </span>
      <span className={`text-sm font-semibold ${checked ? "text-ink" : "text-ink-soft"}`}>
        {label}
      </span>
    </button>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      onClick={onRemove}
      className="squish flex items-center gap-1.5 rounded-full bg-gilly-light px-3 py-1.5 text-xs font-bold text-gilly-dark transition-colors hover:bg-gilly hover:text-white"
    >
      {label}
      <CloseIcon size={13} />
    </button>
  );
}
