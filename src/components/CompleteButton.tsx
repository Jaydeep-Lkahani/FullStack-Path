"use client";

import { lessonKey, setLessonComplete, useCompleted } from "@/lib/progress";

export function CompleteButton({ module, slug }: { module: string; slug: string }) {
  const key = lessonKey(module, slug);
  const done = useCompleted().has(key);

  return (
    <button
      type="button"
      onClick={() => setLessonComplete(key, !done)}
      aria-pressed={done}
      className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition ${
        done
          ? "border-success bg-success/10 text-success"
          : "border-accent bg-accent text-white hover:opacity-90"
      }`}
    >
      {done ? "✓ Completed (click to undo)" : "Mark as complete"}
    </button>
  );
}
