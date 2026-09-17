"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, Product } from "@/lib/types";
import { getProductById } from "@/lib/data/products";
import { findCoupon } from "@/lib/coupons";

const STORAGE_KEY = "gilly:cart";

type CartState = {
  items: CartItem[];
  couponCode: string | null;
};

type CartContextValue = {
  items: CartItem[];
  lines: Array<{ product: Product; quantity: number }>;
  itemCount: number;
  subtotal: number;
  discount: number;
  freeShipping: boolean;
  couponCode: string | null;
  total: number;
  isHydrated: boolean;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CartState>({ items: [], couponCode: null });
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setState(JSON.parse(raw));
    } catch {
      // ignore corrupted storage
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, isHydrated]);

  const addItem = useCallback((productId: string, quantity = 1) => {
    setState((prev) => {
      const existing = prev.items.find((item) => item.productId === productId);
      if (existing) {
        return {
          ...prev,
          items: prev.items.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return { ...prev, items: [...prev.items, { productId, quantity }] };
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setState((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.productId !== productId),
    }));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setState((prev) => ({
      ...prev,
      items:
        quantity <= 0
          ? prev.items.filter((item) => item.productId !== productId)
          : prev.items.map((item) =>
              item.productId === productId ? { ...item, quantity } : item
            ),
    }));
  }, []);

  const clear = useCallback(() => {
    setState({ items: [], couponCode: null });
  }, []);

  const applyCoupon = useCallback((code: string) => {
    const coupon = findCoupon(code);
    if (!coupon) {
      return { success: false, message: "Cupom inválido ou expirado." };
    }
    setState((prev) => ({ ...prev, couponCode: coupon.code }));
    return { success: true, message: coupon.description };
  }, []);

  const removeCoupon = useCallback(() => {
    setState((prev) => ({ ...prev, couponCode: null }));
  }, []);

  const lines = useMemo(
    () =>
      state.items
        .map((item) => {
          const product = getProductById(item.productId);
          return product ? { product, quantity: item.quantity } : null;
        })
        .filter((line): line is { product: Product; quantity: number } => line !== null),
    [state.items]
  );

  const itemCount = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity, 0),
    [lines]
  );

  const subtotal = useMemo(
    () => lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0),
    [lines]
  );

  const activeCoupon = state.couponCode ? findCoupon(state.couponCode) : undefined;

  const discount = useMemo(() => {
    if (!activeCoupon || activeCoupon.kind !== "percent") return 0;
    return (subtotal * activeCoupon.value) / 100;
  }, [activeCoupon, subtotal]);

  const freeShipping = activeCoupon?.kind === "shipping";
  const total = Math.max(subtotal - discount, 0);

  const value: CartContextValue = {
    items: state.items,
    lines,
    itemCount,
    subtotal,
    discount,
    freeShipping,
    couponCode: state.couponCode,
    total,
    isHydrated,
    addItem,
    removeItem,
    updateQuantity,
    clear,
    applyCoupon,
    removeCoupon,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve ser usado dentro de CartProvider");
  return ctx;
}
