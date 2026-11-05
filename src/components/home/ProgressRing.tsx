"use client";

import { lessonKey, useCompleted } from "@/lib/progress";
import { CheckIcon } from "@/components/course/icons";

type LessonRef = { module: string; slug: string };

export function useLessonProgress(lessons: LessonRef[]) {
  const completed = useCompleted();
  const total = lessons.length;
  const done = lessons.filter((l) => completed.has(lessonKey(l.module, l.slug))).length;
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

/** Circular progress (UI-UX.md §7.4). Ink blue while in progress, green with a check at 100%. */
export function ProgressRing({
  lessons,
  size = 40,
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
  const full = pct === 100;

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
          strokeLinecap="butt"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct / 100)}
          className={`${full ? "stroke-success" : "stroke-accent"} transition-[stroke-dashoffset,stroke] duration-[420ms] ease-out`}
        />
      </svg>
      <span
        className={`absolute inset-0 grid place-items-center font-mono font-semibold tabular-nums ${full ? "text-success" : ""}`}
        style={{ fontSize: size >= 64 ? 15 : 11 }}
      >
        {full ? (
          <CheckIcon className={`check-pop ${size >= 64 ? "size-6" : "size-4"}`} />
        ) : (
          `${pct}%`
        )}
      </span>
    </div>
  );
}
