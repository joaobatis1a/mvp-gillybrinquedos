"use client";

import { createContext, useCallback, useContext, type ReactNode } from "react";
import type { Address, Order, StoredUser } from "@/lib/types";
import { usePersistentState, useIsClient } from "@/lib/persistent-state";

const STORAGE_KEY = "gilly:auth";

type AuthState = {
  users: StoredUser[];
  currentEmail: string | null;
  addressesByEmail: Record<string, Address[]>;
  ordersByEmail: Record<string, Order[]>;
};

type RegisterInput = { name: string; email: string; phone: string; password: string };

type AuthContextValue = {
  user: StoredUser | null;
  addresses: Address[];
  orders: Order[];
  isHydrated: boolean;
  register: (data: RegisterInput) => { success: boolean; message: string };
  login: (email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
  updateProfile: (data: Partial<Pick<StoredUser, "name" | "phone">>) => void;
  resetPassword: (email: string) => { success: boolean; message: string };
  addAddress: (address: Omit<Address, "id">) => Address;
  updateAddress: (address: Address) => void;
  removeAddress: (id: string) => void;
  addOrder: (order: Order) => void;
};

const initialState: AuthState = {
  users: [],
  currentEmail: null,
  addressesByEmail: {},
  ordersByEmail: {},
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = usePersistentState<AuthState>(STORAGE_KEY, initialState);
  const isHydrated = useIsClient();

  const register = useCallback(
    (data: RegisterInput) => {
      const email = data.email.trim().toLowerCase();
      let result = { success: true, message: "Cadastro realizado com sucesso!" };
      setState((prev) => {
        if (prev.users.some((u) => u.email === email)) {
          result = { success: false, message: "Já existe uma conta com este e-mail." };
          return prev;
        }
        return {
          ...prev,
          users: [...prev.users, { ...data, email }],
          currentEmail: email,
        };
      });
      return result;
    },
    [setState]
  );

  const login = useCallback(
    (email: string, password: string) => {
      const normalized = email.trim().toLowerCase();
      let result = { success: false, message: "E-mail ou senha incorretos." };
      setState((prev) => {
        const found = prev.users.find(
          (u) => u.email === normalized && u.password === password
        );
        if (!found) return prev;
        result = { success: true, message: "Login realizado com sucesso!" };
        return { ...prev, currentEmail: found.email };
      });
      return result;
    },
    [setState]
  );

  const logout = useCallback(() => {
    setState((prev) => ({ ...prev, currentEmail: null }));
  }, [setState]);

  const updateProfile = useCallback(
    (data: Partial<Pick<StoredUser, "name" | "phone">>) => {
      setState((prev) => ({
        ...prev,
        users: prev.users.map((u) => (u.email === prev.currentEmail ? { ...u, ...data } : u)),
      }));
    },
    [setState]
  );

  const resetPassword = useCallback(
    (email: string) => {
      const normalized = email.trim().toLowerCase();
      const exists = state.users.some((u) => u.email === normalized);
      return exists
        ? { success: true, message: "Enviamos um link de redefinição para o seu e-mail." }
        : { success: false, message: "Não encontramos uma conta com este e-mail." };
    },
    [state.users]
  );

  const addAddress = useCallback(
    (address: Omit<Address, "id">) => {
      const newAddress: Address = { ...address, id: crypto.randomUUID() };
      setState((prev) => {
        if (!prev.currentEmail) return prev;
        const current = prev.addressesByEmail[prev.currentEmail] ?? [];
        return {
          ...prev,
          addressesByEmail: {
            ...prev.addressesByEmail,
            [prev.currentEmail]: [...current, newAddress],
          },
        };
      });
      return newAddress;
    },
    [setState]
  );

  const updateAddress = useCallback(
    (address: Address) => {
      setState((prev) => {
        if (!prev.currentEmail) return prev;
        const current = prev.addressesByEmail[prev.currentEmail] ?? [];
        return {
          ...prev,
          addressesByEmail: {
            ...prev.addressesByEmail,
            [prev.currentEmail]: current.map((a) => (a.id === address.id ? address : a)),
          },
        };
      });
    },
    [setState]
  );

  const removeAddress = useCallback(
    (id: string) => {
      setState((prev) => {
        if (!prev.currentEmail) return prev;
        const current = prev.addressesByEmail[prev.currentEmail] ?? [];
        return {
          ...prev,
          addressesByEmail: {
            ...prev.addressesByEmail,
            [prev.currentEmail]: current.filter((a) => a.id !== id),
          },
        };
      });
    },
    [setState]
  );

  const addOrder = useCallback(
    (order: Order) => {
      setState((prev) => {
        if (!prev.currentEmail) return prev;
        const current = prev.ordersByEmail[prev.currentEmail] ?? [];
        return {
          ...prev,
          ordersByEmail: {
            ...prev.ordersByEmail,
            [prev.currentEmail]: [order, ...current],
          },
        };
      });
    },
    [setState]
  );

  const user = state.users.find((u) => u.email === state.currentEmail) ?? null;
  const addresses = state.currentEmail ? state.addressesByEmail[state.currentEmail] ?? [] : [];
  const orders = state.currentEmail ? state.ordersByEmail[state.currentEmail] ?? [] : [];

  const value: AuthContextValue = {
    user,
    addresses,
    orders,
    isHydrated,
    register,
    login,
    logout,
    updateProfile,
    resetPassword,
    addAddress,
    updateAddress,
    removeAddress,
    addOrder,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}
