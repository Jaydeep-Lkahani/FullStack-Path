"use client";

import { useSyncExternalStore } from "react";
import { CONSENT_KEY, CONSENT_VERSION } from "./consent-config";

/** "unknown" on the server and first paint, before localStorage can be read. */
export type ConsentState = "unknown" | "pending" | "accepted";

const listeners = new Set<() => void>();
// Fallback when storage is blocked: acceptance lasts for this page session only.
let acceptedInMemory = false;

function read(): ConsentState {
  if (acceptedInMemory) return "accepted";
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    const ok =
      typeof parsed === "object" &&
      parsed !== null &&
      (parsed as { version?: unknown }).version === CONSENT_VERSION;
    return ok ? "accepted" : "pending";
  } catch {
    return "pending";
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === CONSENT_KEY || e.key === null) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Records that the visitor accepted the current version of the policies. */
export function acceptPolicies() {
  acceptedInMemory = true;
  try {
    window.localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({ version: CONSENT_VERSION, acceptedAt: new Date().toISOString() }),
    );
  } catch {
    // Storage unavailable (private mode / quota): acceptance lasts until the tab closes.
  }
  listeners.forEach((l) => l());
}

export function useConsent(): ConsentState {
  return useSyncExternalStore(subscribe, read, () => "unknown");
}
