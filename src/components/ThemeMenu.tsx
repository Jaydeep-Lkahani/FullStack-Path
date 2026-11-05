"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { CheckIcon, MonitorIcon, MoonIcon, SunIcon } from "./course/icons";
import { iconButtonClass } from "./ui/button";

const subscribe = () => () => {};
const OPTIONS = [
  { value: "light", label: "Light", Icon: SunIcon },
  { value: "dark", label: "Dark", Icon: MoonIcon },
  { value: "system", label: "System", Icon: MonitorIcon },
] as const;

/**
 * Applies the theme class right away (inside a view transition when supported) and
 * reveals the new theme in a circle growing from the menu button.
 */
function switchTheme(
  value: string,
  origin: HTMLElement | null,
  setTheme: (theme: string) => void,
) {
  const root = document.documentElement;
  const nextDark =
    value === "dark" ||
    (value === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  const apply = () => {
    root.classList.toggle("dark", nextDark);
    root.style.colorScheme = nextDark ? "dark" : "light";
    setTheme(value);
  };
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (
    !document.startViewTransition ||
    reduce ||
    nextDark === root.classList.contains("dark")
  ) {
    apply();
    return;
  }
  const rect = origin?.getBoundingClientRect();
  const x = rect ? rect.left + rect.width / 2 : window.innerWidth;
  const y = rect ? rect.top + rect.height / 2 : 0;
  const r = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );
  root.dataset.themeSwitching = "";
  const t = document.startViewTransition(apply);
  t.ready
    .then(() =>
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        {
          duration: 400,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      ),
    )
    .catch(() => {});
  t.finished.finally(() => delete root.dataset.themeSwitching);
}

/** Light / Dark / System menu (UI-UX.md §8.1). Switching reveals the new theme in a circle. */
export function ThemeMenu() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const current = mounted ? (theme ?? "system") : "system";
  const Icon = !mounted ? MonitorIcon : resolvedTheme === "dark" ? MoonIcon : SunIcon;

  useEffect(() => {
    if (!open) return;
    const items = [
      ...(menu.current?.querySelectorAll<HTMLElement>("[role=menuitemradio]") ?? []),
    ];
    (items.find((i) => i.getAttribute("aria-checked") === "true") ?? items[0])?.focus();
    const onDown = (e: PointerEvent) => {
      if (!menu.current?.contains(e.target as Node) && e.target !== button.current)
        setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const i = items.indexOf(document.activeElement as HTMLElement);
        const step = e.key === "ArrowDown" ? 1 : -1;
        items[(i + step + items.length) % items.length]?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function choose(value: string) {
    setOpen(false);
    button.current?.focus();
    switchTheme(value, button.current, setTheme);
  }

  return (
    <div className="relative">
      <span className="tip" data-tip="Theme" data-tip-hidden={open || undefined}>
        <button
          ref={button}
          type="button"
          aria-label="Theme"
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className={iconButtonClass()}
        >
          <Icon className="size-[18px]" />
        </button>
      </span>
      {open && (
        <div
          ref={menu}
          role="menu"
          aria-label="Theme"
          className="menu-pop card absolute top-12 right-0 z-50 w-40 p-1 shadow-[var(--elev-lg)]"
        >
          {OPTIONS.map(({ value, label, Icon: OptionIcon }) => (
            <button
              key={value}
              type="button"
              role="menuitemradio"
              aria-checked={current === value}
              onClick={() => choose(value)}
              className="hover:bg-surface-hover flex min-h-10 w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 text-sm"
            >
              <OptionIcon className="text-muted size-4" />
              <span className="flex-1 text-left">{label}</span>
              {current === value && <CheckIcon className="text-accent size-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
