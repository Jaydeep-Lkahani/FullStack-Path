"use client";

import { quizKey, useQuizScores } from "@/lib/quiz";

/** "Best: 7/10" for a quiz lesson, or a prompt if it hasn't been attempted. */
export function QuizScore({ module, slug }: { module: string; slug: string }) {
  const score = useQuizScores()[quizKey(module, slug)];
  if (!score) return <span>Not attempted yet</span>;
  const perfect = score.best === score.total;
  return (
    <span className={perfect ? "text-success font-medium" : undefined}>
      Best score: {score.best}/{score.total}
      {perfect ? " ✓" : ""}
    </span>
  );
}
