"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import type { NavModule } from "@/lib/nav";
import { lessonKey, useCompleted } from "@/lib/progress";
import { setPhaseOpen, usePhaseState } from "@/lib/sidebar";
import {
  ChevronDownIcon,
  CurrentIcon,
  DoneIcon,
  ListChecksIcon,
  NotStartedIcon,
  SoonIcon,
} from "./course/icons";

/**
 * Course outline (UI-UX.md §8.9): collapsible phases, module rows with a hairline progress
 * bar, numbered lessons with status icons. `touch` makes rows 44px for the drawer.
 */
export function Sidebar({
  modules,
  onNavigate,
  touch = false,
}: {
  modules: NavModule[];
  onNavigate?: () => void;
  touch?: boolean;
}) {
  const pathname = usePathname();
  const completed = useCompleted();
  const phaseState = usePhaseState();
  const navRef = useRef<HTMLElement>(null);
  const phases = [...new Set(modules.map((m) => m.phase))];
  const currentPhase = modules.find((m) =>
    pathname.startsWith(`/learn/${m.slug}`),
  )?.phase;
  const row = touch ? "min-h-11" : "min-h-9";

  useEffect(() => {
    navRef.current
      ?.querySelector('[aria-current="page"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [pathname]);

  return (
    <nav ref={navRef} aria-label="Course outline" className="space-y-4 text-sm">
      {phases.map((phase) => {
        const inPhase = modules.filter((m) => m.phase === phase);
        const live = inPhase.filter((m) => m.available);
        const soon = inPhase.filter((m) => !m.available);
        const open =
          phaseState[phase] ?? (currentPhase === undefined || currentPhase === phase);
        const id = `phase-${phase}-${touch ? "d" : "s"}`;
        return (
          <div key={phase}>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={id}
              onClick={() => setPhaseOpen(phase, !open)}
              className={`text-muted hover:text-foreground kicker flex w-full cursor-pointer items-center justify-between gap-2 px-2 transition-colors ${row}`}
            >
              <span className="flex min-w-0 items-baseline gap-2">
                <span className="display-sm text-subtle text-base leading-none">
                  {phase}
                </span>
                <span className="truncate">{inPhase[0]?.phaseTitle}</span>
              </span>
              <ChevronDownIcon
                className={`chev size-3.5 shrink-0 transition-transform duration-200 ${open ? "" : "-rotate-90"}`}
              />
            </button>
            <div id={id} hidden={!open}>
              <ul className="mt-1 space-y-0.5">
                {live.map((m) => {
                  const active = pathname.startsWith(`/learn/${m.slug}`);
                  const done = m.lessons.filter((l) =>
                    completed.has(lessonKey(m.slug, l.slug)),
                  ).length;
                  const total = m.lessons.length;
                  return (
                    <li key={m.slug} data-track={m.track}>
                      <Link
                        href={`/learn/${m.slug}`}
                        onClick={onNavigate}
                        aria-current={
                          pathname === `/learn/${m.slug}` ? "page" : undefined
                        }
                        className={`flex items-center gap-2.5 px-2 transition-colors duration-150 ${row} ${
                          active
                            ? "bg-surface text-foreground font-semibold"
                            : "hover:bg-surface-hover text-ink-2"
                        }`}
                      >
                        <span className="min-w-0 flex-1 py-1 leading-snug">
                          {m.title}
                        </span>
                        <span
                          className="bar w-8 shrink-0"
                          data-done={total > 0 && done === total}
                          aria-hidden
                        >
                          <i
                            style={
                              { "--v": total ? done / total : 0 } as React.CSSProperties
                            }
                          />
                        </span>
                        <span className="text-muted w-9 shrink-0 text-right font-mono text-xs font-normal tabular-nums">
                          {done}/{total}
                        </span>
                        <span className="sr-only">
                          {done} of {total} complete
                        </span>
                      </Link>
                      {active && (
                        <ol className="border-border mt-0.5 mb-2 ml-[1.15rem] space-y-px border-l py-0.5">
                          {m.lessons.map((l, i) => {
                            const current = pathname === l.href;
                            const isDone = completed.has(lessonKey(m.slug, l.slug));
                            const Status = isDone
                              ? DoneIcon
                              : current
                                ? CurrentIcon
                                : NotStartedIcon;
                            return (
                              <li key={l.slug} className="relative">
                                {current && (
                                  <span
                                    aria-hidden
                                    className="bg-accent absolute top-1 bottom-1 -left-px w-0.5"
                                  />
                                )}
                                <Link
                                  href={l.href}
                                  onClick={onNavigate}
                                  aria-current={current ? "page" : undefined}
                                  className={`ml-1 flex items-center gap-2.5 py-1 pr-2 pl-2.5 transition-colors duration-150 ${row} ${
                                    current
                                      ? "text-accent font-semibold"
                                      : "text-muted hover:bg-surface-hover hover:text-foreground"
                                  }`}
                                >
                                  <span className="text-subtle w-5 shrink-0 font-mono text-xs tabular-nums">
                                    {l.kind === "quiz" ? (
                                      <ListChecksIcon className="size-3.5" />
                                    ) : (
                                      String(i + 1).padStart(2, "0")
                                    )}
                                  </span>
                                  <span className="min-w-0 flex-1 leading-snug">
                                    {l.title}
                                  </span>
                                  <span
                                    className={isDone ? "text-success" : "text-subtle"}
                                    key={isDone ? "done" : "todo"}
                                  >
                                    <Status
                                      className={`size-4 ${isDone ? "check-pop" : ""}`}
                                    />
                                  </span>
                                  <span className="sr-only">
                                    {isDone ? "(completed)" : ""}
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ol>
                      )}
                    </li>
                  );
                })}
              </ul>
              {soon.length > 0 && (
                <details className="disclose mt-0.5">
                  <summary
                    className={`text-subtle hover:text-muted flex cursor-pointer items-center gap-2.5 px-2 text-[0.8125rem] transition-colors ${row}`}
                  >
                    <SoonIcon className="size-3.5" />
                    {live.length > 0 ? "+" : ""}
                    {soon.length} {soon.length === 1 ? "module" : "modules"} coming soon
                  </summary>
                  <ul className="text-subtle mt-0.5 mb-1 ml-8 space-y-1 text-[0.8125rem]">
                    {soon.map((m) => (
                      <li key={m.slug}>{m.title}</li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
          </div>
        );
      })}
    </nav>
  );
}
