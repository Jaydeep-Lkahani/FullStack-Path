"use client";

import { useState } from "react";
import { lessonKey, setLessonComplete, useCompleted } from "@/lib/progress";
import { CheckIcon, NotStartedIcon, UndoIcon } from "./course/icons";
import { buttonClass } from "./ui/button";
import { toast } from "./ui/toast";

const PIECES = Array.from({ length: 12 }, (_, i) => i);
const COLORS = ["var(--accent)", "#7c3aed", "#0284c7", "var(--success)"];

function DrawnCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="check-draw size-4">
      <path
        d="M5 12.5 10 17.5 19 7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Marks a lesson complete (UI-UX.md §8.6, §10). `full` is the end-of-lesson button with
 * confetti and a separate Undo; `compact` is the small toggle in the lesson header.
 */
export function CompleteButton({
  module,
  slug,
  moduleLessons = [],
  variant = "full",
}: {
  module: string;
  slug: string;
  /** Keys ("module/slug") of every lecture in this module, for the progress toast. */
  moduleLessons?: string[];
  variant?: "full" | "compact";
}) {
  const key = lessonKey(module, slug);
  const completed = useCompleted();
  const done = completed.has(key);
  const [burst, setBurst] = useState(0);

  function set(next: boolean) {
    setLessonComplete(key, next);
    if (!next) return;
    if (variant === "full") {
      setBurst((n) => n + 1);
      setTimeout(() => setBurst(0), 800);
    }
    const total = moduleLessons.length;
    if (total > 0) {
      const count = moduleLessons.filter((k) => k === key || completed.has(k)).length;
      toast(`Saved · ${count} of ${total} in this module`, "success");
    } else {
      toast("Saved", "success");
    }
  }

  if (variant === "compact") {
    return (
      <span className="tip" data-tip={done ? "Click to undo" : "Mark this lesson done"}>
        <button
          type="button"
          onClick={() => set(!done)}
          aria-pressed={done}
          className={buttonClass(done ? "success" : "secondary", "sm")}
        >
          {done ? <DrawnCheck /> : <NotStartedIcon className="size-4" />}
          {done ? "Completed" : "Mark done"}
        </button>
      </span>
    );
  }

  return (
    <div className="relative inline-flex items-center gap-2">
      {done ? (
        <>
          <span
            className={buttonClass("success", "lg", "pointer-events-none")}
            role="status"
          >
            <span className="bg-success text-background check-pop grid size-5 place-items-center rounded-full">
              <CheckIcon className="size-3.5" />
            </span>
            Completed
          </span>
          <button
            type="button"
            onClick={() => set(false)}
            data-shortcut="complete"
            className={buttonClass("ghost", "md")}
          >
            <UndoIcon className="size-4" />
            Undo
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => set(true)}
          data-shortcut="complete"
          className={buttonClass("gradient", "lg", "group")}
        >
          <span className="bg-background/25 grid size-5 place-items-center rounded-full">
            <CheckIcon className="size-3.5" />
          </span>
          Mark as complete
        </button>
      )}
      {burst > 0 && (
        <span aria-hidden key={burst} className="confetti">
          {PIECES.map((i) => (
            <i
              key={i}
              style={
                {
                  "--a": `${(360 / PIECES.length) * i}deg`,
                  "--r": `${56 + (i % 3) * 20}px`,
                  "--c": COLORS[i % COLORS.length],
                } as React.CSSProperties
              }
            />
          ))}
        </span>
      )}
    </div>
  );
}
