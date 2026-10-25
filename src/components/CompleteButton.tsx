"use client";

import { useState } from "react";
import { lessonKey, setLessonComplete, useCompleted } from "@/lib/progress";
import { CheckIcon } from "./course/icons";

const PIECES = Array.from({ length: 18 }, (_, i) => i);
const COLORS = ["var(--accent)", "#a855f7", "#38bdf8", "#f59e0b", "#22c55e"];

export function CompleteButton({ module, slug }: { module: string; slug: string }) {
  const key = lessonKey(module, slug);
  const done = useCompleted().has(key);
  const [burst, setBurst] = useState(0);

  function toggle() {
    setLessonComplete(key, !done);
    if (!done) {
      setBurst((n) => n + 1);
      setTimeout(() => setBurst(0), 1100);
    }
  }

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={done}
        className={`group focus-visible:outline-accent relative inline-flex cursor-pointer items-center gap-2.5 rounded-xl px-5 py-3 text-sm font-semibold transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.97] ${
          done
            ? "border-success/50 bg-success/10 text-success border"
            : "shine bg-linear-to-r from-indigo-600 via-violet-600 to-sky-600 text-white shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/35"
        }`}
      >
        <span
          aria-hidden
          className={`flex size-5 items-center justify-center rounded-full ${
            done ? "bg-success text-background check-pop" : "bg-white/20"
          }`}
        >
          <CheckIcon className="size-3.5" />
        </span>
        {done ? "Completed — click to undo" : "Mark as complete"}
      </button>
      {burst > 0 && (
        <span aria-hidden key={burst} className="confetti">
          {PIECES.map((i) => (
            <i
              key={i}
              style={
                {
                  "--a": `${(360 / PIECES.length) * i}deg`,
                  "--r": `${60 + (i % 3) * 22}px`,
                  "--c": COLORS[i % COLORS.length],
                  "--s": `${0.5 + (i % 4) * 0.12}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </span>
      )}
    </div>
  );
}
