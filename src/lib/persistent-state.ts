"use client";

import { useCallback, useSyncExternalStore } from "react";

type Updater<T> = T | ((prev: T) => T);

type Store<T> = {
  getSnapshot: () => T;
  getServerSnapshot: () => T;
  subscribe: (listener: () => void) => () => void;
  set: (updater: Updater<T>) => void;
};

type StorageKind = "local" | "session";

const registry = new Map<string, Store<unknown>>();

function getBrowserStorage(kind: StorageKind) {
  return kind === "session" ? window.sessionStorage : window.localStorage;
}

function createStore<T>(key: string, initial: T, kind: StorageKind): Store<T> {
  let value = initial;
  let hydrated = false;
  const listeners = new Set<() => void>();

  function hydrate() {
    if (hydrated || typeof window === "undefined") return;
    hydrated = true;
    try {
      const raw = getBrowserStorage(kind).getItem(key);
      if (raw) value = { ...initial, ...JSON.parse(raw) } as T;
    } catch {
      // ignore corrupted storage
    }
  }

  function getSnapshot() {
    hydrate();
    return value;
  }

  function getServerSnapshot() {
    return initial;
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  function set(updater: Updater<T>) {
    hydrate();
    value = typeof updater === "function" ? (updater as (prev: T) => T)(value) : updater;
    try {
      getBrowserStorage(kind).setItem(key, JSON.stringify(value));
    } catch {
      // ignore quota / serialization errors
    }
    listeners.forEach((listener) => listener());
  }

  return { getSnapshot, getServerSnapshot, subscribe, set };
}

function getStore<T>(key: string, initial: T, kind: StorageKind): Store<T> {
  if (!registry.has(key)) registry.set(key, createStore(key, initial, kind) as Store<unknown>);
  return registry.get(key) as Store<T>;
}

export function usePersistentState<T>(key: string, initial: T, kind: StorageKind = "local") {
  const store = getStore(key, initial, kind);
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
  const setState = useCallback((updater: Updater<T>) => store.set(updater), [store]);
  return [state, setState] as const;
}

const emptySubscribe = () => () => {};

export function useIsClient() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}
