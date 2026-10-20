"use client";

import { lessonKey, useCompleted } from "@/lib/progress";

/** Progress for a set of lesson keys ("module/slug"). */
export function ProgressBar({
  lessons,
  label,
}: {
  lessons: { module: string; slug: string }[];
  label?: string;
}) {
  const completed = useCompleted();
  const total = lessons.length;
  const done = lessons.filter((l) => completed.has(lessonKey(l.module, l.slug))).length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <div>
      <div className="text-muted mb-1 flex justify-between text-xs">
        <span>{label ?? "Progress"}</span>
        <span>
          {done}/{total} lessons · {pct}%
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-label={label ?? "Progress"}
        className="bg-surface-hover h-2 overflow-hidden rounded-full"
      >
        <div
          className="bg-accent h-full rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
