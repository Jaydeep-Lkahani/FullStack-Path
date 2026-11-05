"use client";

import { useSyncExternalStore } from "react";

/** A tiny global toast store (UI-UX.md §7.6). One toast at a time. */
export type ToastTone = "neutral" | "success";
export interface ToastState {
  id: number;
  message: string;
  tone: ToastTone;
  leaving: boolean;
}

let current: ToastState | null = null;
let nextId = 1;
let hideTimer: ReturnType<typeof setTimeout> | undefined;
let removeTimer: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export function toast(message: string, tone: ToastTone = "neutral") {
  clearTimeout(hideTimer);
  clearTimeout(removeTimer);
  current = { id: nextId++, message, tone, leaving: false };
  emit();
  hideTimer = setTimeout(() => {
    if (!current) return;
    current = { ...current, leaving: true };
    emit();
    removeTimer = setTimeout(() => {
      current = null;
      emit();
    }, 150);
  }, 2500);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useToast(): ToastState | null {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => null,
  );
}
