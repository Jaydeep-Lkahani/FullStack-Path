"use client";

import Link from "next/link";
import { lessonKey, useCompleted } from "@/lib/progress";
import { CheckIcon } from "@/components/course/icons";

type Item = { module: string; slug: string; href: string; title: string; label: string };

/** Lesson links with a check that fills in once the lesson is marked complete. */
export function LessonChecklist({ lessons }: { lessons: Item[] }) {
  const completed = useCompleted();
  return (
    <ul className="max-h-64 space-y-0.5 overflow-y-auto pr-1 text-sm">
      {lessons.map((l) => {
        const done = completed.has(lessonKey(l.module, l.slug));
        return (
          <li key={l.slug}>
            <Link
              href={l.href}
              className="text-muted hover:text-foreground hover:bg-surface-hover group/l flex min-h-9 items-center gap-2.5 px-2 py-1.5 transition-colors"
            >
              <span
                aria-hidden
                className={`grid h-4 w-4 shrink-0 place-items-center border transition-colors ${done ? "border-success bg-success text-background" : "border-border-strong group-hover/l:border-foreground"}`}
              >
                {done && <CheckIcon className="size-2.5" strokeWidth={4} />}
              </span>
              <span className="truncate">{l.label}</span>
              <span className="sr-only">{done ? "(completed)" : ""}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
