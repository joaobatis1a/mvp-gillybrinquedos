"use client";

import { createContext, useCallback, useContext, type ReactNode } from "react";
import type { Address, Order, PaymentMethod, ShippingOption } from "@/lib/types";
import { usePersistentState, useIsClient } from "@/lib/persistent-state";

const STORAGE_KEY = "gilly:checkout";

type CheckoutState = {
  address: Address | null;
  shipping: ShippingOption | null;
  paymentMethod: PaymentMethod;
  installments: number;
  lastOrder: Order | null;
};

type CheckoutContextValue = CheckoutState & {
  isHydrated: boolean;
  setAddress: (address: Address) => void;
  setShipping: (shipping: ShippingOption) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setInstallments: (value: number) => void;
  setLastOrder: (order: Order) => void;
  resetCheckout: () => void;
};

const initialState: CheckoutState = {
  address: null,
  shipping: null,
  paymentMethod: "pix",
  installments: 1,
  lastOrder: null,
};

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [state, setState] = usePersistentState<CheckoutState>(STORAGE_KEY, initialState, "session");
  const isHydrated = useIsClient();

  const setAddress = useCallback(
    (address: Address) => setState((prev) => ({ ...prev, address })),
    [setState]
  );

  const setShipping = useCallback(
    (shipping: ShippingOption) => setState((prev) => ({ ...prev, shipping })),
    [setState]
  );

  const setPaymentMethod = useCallback(
    (paymentMethod: PaymentMethod) => setState((prev) => ({ ...prev, paymentMethod })),
    [setState]
  );

  const setInstallments = useCallback(
    (installments: number) => setState((prev) => ({ ...prev, installments })),
    [setState]
  );

  const setLastOrder = useCallback(
    (lastOrder: Order) => setState((prev) => ({ ...prev, lastOrder })),
    [setState]
  );

  const resetCheckout = useCallback(() => setState(initialState), [setState]);

  const value: CheckoutContextValue = {
    ...state,
    isHydrated,
    setAddress,
    setShipping,
    setPaymentMethod,
    setInstallments,
    setLastOrder,
    resetCheckout,
  };

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckout deve ser usado dentro de CheckoutProvider");
  return ctx;
}
