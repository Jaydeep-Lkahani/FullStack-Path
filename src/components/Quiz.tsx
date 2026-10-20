"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/lib/content";
import { quizKey, recordQuizScore, useQuizScores } from "@/lib/quiz";

/** Renders `backtick` segments as inline code. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("`").map((part, i) =>
        i % 2 === 1 ? (
          <code
            key={i}
            className="bg-surface-hover rounded px-1 py-0.5 font-mono text-[0.85em]"
          >
            {part}
          </code>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function Quiz({
  module,
  slug,
  questions,
}: {
  module: string;
  slug: string;
  questions: QuizQuestion[];
}) {
  const key = quizKey(module, slug);
  const best = useQuizScores()[key];
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const total = questions.length;
  const q = questions[index];

  function choose(option: number) {
    if (picked !== null) return;
    setPicked(option);
    if (option === q.answer) setScore((s) => s + 1);
  }

  function next() {
    if (index + 1 < total) {
      setIndex(index + 1);
      setPicked(null);
      return;
    }
    recordQuizScore(key, score, total);
    setFinished(true);
  }

  function retry() {
    setIndex(0);
    setPicked(null);
    setScore(0);
    setFinished(false);
  }

  return (
    <section
      aria-labelledby="quiz-heading"
      className="border-border bg-surface mt-10 rounded-xl border p-5"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="quiz-heading" className="text-lg font-semibold">
          Quiz
        </h2>
        {best && !finished && (
          <p className="text-muted text-sm">
            Best score: {best.best}/{best.total}
          </p>
        )}
      </div>

      {finished ? (
        <div className="mt-4" role="status">
          <p className="text-2xl font-bold">
            {score}/{total}
          </p>
          <p className="text-muted mt-1">
            {score === total
              ? "Perfect score. You're ready to move on."
              : score >= total * 0.7
                ? "Solid. Review the explanations you missed, then move on."
                : "Worth another pass through the lessons before moving on."}
          </p>
          <button
            type="button"
            onClick={retry}
            className="bg-accent mt-4 rounded-lg px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Try again
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <p className="text-muted text-sm">
            Question {index + 1} of {total}
          </p>
          <p className="mt-2 font-medium">
            <Rich text={q.question} />
          </p>
          <ul className="mt-3 space-y-2">
            {q.options.map((option, i) => {
              const answered = picked !== null;
              const isRight = i === q.answer;
              const isPicked = i === picked;
              let style = "border-border hover:border-accent";
              if (answered && isRight) style = "border-success bg-success/10";
              else if (answered && isPicked) style = "border-warning bg-warning/10";
              else if (answered) style = "border-border opacity-60";
              return (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => choose(i)}
                    disabled={answered}
                    aria-pressed={isPicked}
                    className={`w-full rounded-lg border px-4 py-2.5 text-left text-sm transition ${style}`}
                  >
                    <span className="mr-2 font-mono text-xs">
                      {String.fromCharCode(65 + i)}.
                    </span>
                    <Rich text={option} />
                    {answered && isRight && (
                      <span className="text-success ml-2 font-medium">✓ Correct</span>
                    )}
                    {answered && isPicked && !isRight && (
                      <span className="text-warning ml-2 font-medium">✗ Not quite</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {picked !== null && (
            <div className="mt-4" role="status">
              <p className="text-sm">
                <span className="font-semibold">
                  {picked === q.answer ? "Right. " : "Not quite. "}
                </span>
                <Rich text={q.explanation} />
              </p>
              <button
                type="button"
                onClick={next}
                className="bg-accent mt-3 rounded-lg px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                {index + 1 < total ? "Next question" : "See my score"}
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
