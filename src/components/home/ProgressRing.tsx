"use client";

import { lessonKey, useCompleted } from "@/lib/progress";

type LessonRef = { module: string; slug: string };

export function useLessonProgress(lessons: LessonRef[]) {
  const completed = useCompleted();
  const total = lessons.length;
  const done = lessons.filter((l) => completed.has(lessonKey(l.module, l.slug))).length;
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

/** Circular progress for a set of lessons; the arc animates when progress changes. */
export function ProgressRing({
  lessons,
  size = 44,
  stroke = 4,
  label,
}: {
  lessons: LessonRef[];
  size?: number;
  stroke?: number;
  label: string;
}) {
  const { pct } = useLessonProgress(lessons);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      className="relative shrink-0"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          className="stroke-border"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct / 100)}
          className="stroke-accent transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <span
        className="absolute inset-0 grid place-items-center text-[11px] font-semibold tabular-nums"
        style={{ fontSize: size < 40 ? 9 : undefined }}
      >
        {pct}%
      </span>
    </div>
  );
}
