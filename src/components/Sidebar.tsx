"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavModule } from "@/lib/nav";
import { lessonKey, useCompleted } from "@/lib/progress";

export function Sidebar({
  modules,
  onNavigate,
}: {
  modules: NavModule[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const completed = useCompleted();
  const phases = [...new Set(modules.map((m) => m.phase))];

  return (
    <nav aria-label="Topics" className="space-y-6 text-sm">
      {phases.map((phase) => (
        <div key={phase}>
          <p className="text-muted mb-2 px-2 text-xs font-semibold tracking-wider uppercase">
            Phase {phase}
          </p>
          <ul className="space-y-1">
            {modules
              .filter((m) => m.phase === phase)
              .map((m) => {
                const open = pathname.startsWith(`/learn/${m.slug}`);
                const done = m.lessons.filter((l) =>
                  completed.has(lessonKey(m.slug, l.slug)),
                ).length;
                return (
                  <li key={m.slug}>
                    {m.available ? (
                      <Link
                        href={`/learn/${m.slug}`}
                        onClick={onNavigate}
                        className="hover:bg-surface-hover flex items-center justify-between rounded-md px-2 py-1.5 font-medium"
                      >
                        <span>{m.title}</span>
                        <span className="text-muted text-xs">
                          {done}/{m.lessons.length}
                        </span>
                      </Link>
                    ) : (
                      <span className="text-muted flex items-center justify-between rounded-md px-2 py-1.5">
                        <span>{m.title}</span>
                        <span className="bg-surface-hover rounded px-1.5 py-0.5 text-[10px] uppercase">
                          Soon
                        </span>
                      </span>
                    )}
                    {m.available && open && (
                      <ul className="border-border mt-1 ml-3 space-y-0.5 border-l pl-2">
                        {m.lessons.map((l) => {
                          const active = pathname === l.href;
                          const isDone = completed.has(lessonKey(m.slug, l.slug));
                          return (
                            <li key={l.slug}>
                              <Link
                                href={l.href}
                                onClick={onNavigate}
                                aria-current={active ? "page" : undefined}
                                className={`flex items-start gap-2 rounded-md px-2 py-1 ${
                                  active
                                    ? "bg-accent/10 text-accent font-medium"
                                    : "text-muted hover:bg-surface-hover hover:text-foreground"
                                }`}
                              >
                                <span
                                  aria-label={isDone ? "Completed" : "Not completed"}
                                  className={`mt-1 inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border text-[9px] ${
                                    isDone
                                      ? "border-success bg-success text-white"
                                      : "border-border"
                                  }`}
                                >
                                  {isDone ? "✓" : ""}
                                </span>
                                <span>{l.title}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
