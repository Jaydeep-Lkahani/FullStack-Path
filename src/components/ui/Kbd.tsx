/** Keyboard key (UI-UX.md §7.7). */
export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="border-border bg-surface text-muted inline-flex h-5 min-w-5 items-center justify-center gap-0.5 rounded-md border border-b-2 px-1.5 font-sans text-[11px] leading-none font-medium">
      {children}
    </kbd>
  );
}
