"use client";

import { useSyncExternalStore } from "react";

/** Which sidebar phases the learner opened or closed: { [phaseId]: open }. */
const KEY = "fs-learn-sidebar-v1";

type State = Readonly<Record<string, boolean>>;
const EMPTY: State = {};

let cachedRaw: string | null = null;
let cached: State = EMPTY;
const listeners = new Set<() => void>();

function read(): State {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    return cached;
  }
  if (raw === cachedRaw) return cached;
  cachedRaw = raw;
  try {
    const parsed: unknown = raw ? JSON.parse(raw) : {};
    cached =
      parsed && typeof parsed === "object" && !Array.isArray(parsed)
        ? (parsed as State)
        : EMPTY;
  } catch {
    cached = EMPTY;
  }
  return cached;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function setPhaseOpen(phase: number, open: boolean) {
  const next = { ...read(), [phase]: open };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    cached = next;
  }
  listeners.forEach((l) => l());
}

export function usePhaseState(): State {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}
