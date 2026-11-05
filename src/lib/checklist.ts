"use client";

/** Ticked "Ready to move on?" checklist items, keyed by "module/slug" → item indexes. */
const KEY = "fs-learn-checklist-v1";

type Store = Record<string, number[]>;

function readAll(): Store {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(KEY) ?? "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as Store)
      : {};
  } catch {
    return {};
  }
}

export function getChecked(key: string): ReadonlySet<number> {
  return new Set(readAll()[key] ?? []);
}

export function setChecked(key: string, index: number, checked: boolean) {
  const all = readAll();
  const set = new Set(all[key] ?? []);
  if (checked) set.add(index);
  else set.delete(index);
  all[key] = [...set].sort((a, b) => a - b);
  try {
    window.localStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    // Storage unavailable: ticks last until the page closes.
  }
}
