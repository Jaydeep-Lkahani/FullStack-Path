"use client";

import { useSyncExternalStore } from "react";

/** Lessons the learner opened most recently, newest first (powers "Resume" and search). */
const KEY = "fs-learn-last-v1";
const MAX = 5;

export interface RecentLesson {
  module: string;
  slug: string;
  href: string;
  title: string;
  moduleTitle: string;
  at: number;
}

type Recent = readonly RecentLesson[];
const EMPTY: Recent = [];

let cachedRaw: string | null = null;
let cached: Recent = EMPTY;
const listeners = new Set<() => void>();

function read(): Recent {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    return cached;
  }
  if (raw === cachedRaw) return cached;
  cachedRaw = raw;
  try {
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    cached = Array.isArray(parsed) ? (parsed as RecentLesson[]) : EMPTY;
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

export function recordVisit(lesson: Omit<RecentLesson, "at">) {
  const rest = read().filter((l) => l.href !== lesson.href);
  const next = [{ ...lesson, at: Date.now() }, ...rest].slice(0, MAX);
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable (private mode / quota): resume just won't work.
  }
  listeners.forEach((l) => l());
}

/** Recently opened lessons, newest first. Empty on the server and first paint. */
export function useRecent(): Recent {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}
