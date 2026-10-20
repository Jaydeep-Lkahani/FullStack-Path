"use client";

import { useSyncExternalStore } from "react";

const KEY = "fs-learn-progress-v1";
const EMPTY: ReadonlySet<string> = new Set();

let cachedRaw: string | null = null;
let cachedSet: ReadonlySet<string> = EMPTY;
const listeners = new Set<() => void>();

function read(): ReadonlySet<string> {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    return cachedSet;
  }
  if (raw === cachedRaw) return cachedSet;
  cachedRaw = raw;
  try {
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    cachedSet = new Set(Array.isArray(parsed) ? (parsed as string[]) : []);
  } catch {
    cachedSet = EMPTY;
  }
  return cachedSet;
}

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export const lessonKey = (module: string, slug: string) => `${module}/${slug}`;

export function setLessonComplete(key: string, done: boolean) {
  const next = new Set(read());
  if (done) next.add(key);
  else next.delete(key);
  try {
    window.localStorage.setItem(KEY, JSON.stringify([...next]));
  } catch {
    // Storage unavailable (private mode / quota): ignore, progress just won't persist.
  }
  emit();
}

/** Set of completed lesson keys ("module/slug"). Empty on the server and first paint. */
export function useCompleted(): ReadonlySet<string> {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}
