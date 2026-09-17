"use client";

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import type { Product } from "@/lib/types";
import { getProductById } from "@/lib/data/products";
import { usePersistentState, useIsClient } from "@/lib/persistent-state";

const STORAGE_KEY = "gilly:favorites";

type FavoritesState = {
  ids: string[];
};

const initialState: FavoritesState = { ids: [] };

type FavoritesContextValue = {
  ids: string[];
  products: Product[];
  count: number;
  isHydrated: boolean;
  isFavorite: (productId: string) => boolean;
  toggle: (productId: string) => void;
  remove: (productId: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [state, setState] = usePersistentState<FavoritesState>(STORAGE_KEY, initialState);
  const isHydrated = useIsClient();

  const toggle = useCallback(
    (productId: string) => {
      setState((prev) =>
        prev.ids.includes(productId)
          ? { ids: prev.ids.filter((id) => id !== productId) }
          : { ids: [...prev.ids, productId] }
      );
    },
    [setState]
  );

  const remove = useCallback(
    (productId: string) => {
      setState((prev) => ({ ids: prev.ids.filter((id) => id !== productId) }));
    },
    [setState]
  );

  const isFavorite = useCallback((productId: string) => state.ids.includes(productId), [state.ids]);

  const products = useMemo(
    () => state.ids.map((id) => getProductById(id)).filter((p): p is Product => Boolean(p)),
    [state.ids]
  );

  const value: FavoritesContextValue = {
    ids: state.ids,
    products,
    count: products.length,
    isHydrated,
    isFavorite,
    toggle,
    remove,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites deve ser usado dentro de FavoritesProvider");
  return ctx;
}
