import { browser } from '$app/env';
import { writable } from 'svelte/store';

function load<T>(key: string, fallback: T): T {
  if (!browser) return fallback;

  try {
    const saved = localStorage.getItem(key);
    return saved === null ? fallback : JSON.parse(saved) as T;
  } catch {
    return fallback;
  }
}

export function persistedStore<T>(key: string, fallback: T) {
  const store = writable<T>(load(key, fallback));

  if (browser) {
    store.subscribe((value) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
  }

  return store;
}