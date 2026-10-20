"use client";

import { useSyncExternalStore } from "react";

const KEY = "fs-learn-quiz-v1";

export interface QuizScore {
  best: number;
  total: number;
}

type Scores = Readonly<Record<string, QuizScore>>;

const EMPTY: Scores = {};

let cachedRaw: string | null = null;
let cached: Scores = EMPTY;
const listeners = new Set<() => void>();

function read(): Scores {
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
        ? (parsed as Scores)
        : EMPTY;
  } catch {
    cached = EMPTY;
  }
  return cached;
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

export const quizKey = (module: string, slug: string) => `${module}/${slug}`;

/** Records a finished attempt; keeps the best score. */
export function recordQuizScore(key: string, score: number, total: number) {
  const current = read();
  const previous = current[key];
  if (previous && previous.total === total && previous.best >= score) return;
  const next: Scores = { ...current, [key]: { best: score, total } };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable (private mode / quota): the score just won't persist.
  }
  listeners.forEach((l) => l());
}

/** Best scores keyed by "module/slug". Empty on the server and first paint. */
export function useQuizScores(): Scores {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}
