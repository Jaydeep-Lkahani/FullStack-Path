"use client";

import Link from "next/link";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import type { QuizQuestion } from "@/lib/content";
import { quizKey, recordQuizScore, useQuizScores } from "@/lib/quiz";
import {
  ArrowRightIcon,
  CorrectIcon,
  ListChecksIcon,
  RotateCcwIcon,
  WrongIcon,
} from "./course/icons";
import { buttonClass } from "./ui/button";
import { Kbd } from "./ui/Kbd";

/** Renders `backtick` segments as inline code. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("`").map((part, i) =>
        i % 2 === 1 ? (
          <code
            key={i}
            className="bg-surface-2 rounded-md px-1 py-0.5 font-mono text-[0.85em]"
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

function ScoreRing({ score, total }: { score: number; total: number }) {
  const pct = total ? score / total : 0;
  const size = 96;
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const good = pct >= 0.8;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          className="stroke-border-strong"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          className={`${good ? "stroke-success" : "stroke-accent"} transition-[stroke-dashoffset] duration-700 ease-out`}
          style={
            {
              "--c": c,
              animation: "ring-fill 800ms var(--ease-out) both",
            } as React.CSSProperties
          }
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center font-mono text-xl font-bold tabular-nums">
        <span>
          <span className="count" style={{ "--to": score } as React.CSSProperties} />
          <span className="text-muted text-sm">/{total}</span>
        </span>
      </span>
    </div>
  );
}

/**
 * Module quiz (UI-UX.md §8.8): radio group with arrow keys, 1–4 to answer, Enter for the
 * next question; feedback is an icon, a colour and a word; ends with a score ring and
 * a "review mistakes" list.
 */
export function Quiz({
  module,
  slug,
  questions,
  nextModule = null,
}: {
  module: string;
  slug: string;
  questions: QuizQuestion[];
  nextModule?: { title: string; href: string } | null;
}) {
  const key = quizKey(module, slug);
  const best = useQuizScores()[key];
  const total = questions.length;
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    questions.map(() => null),
  );
  const [index, setIndex] = useState(0);
  const [focus, setFocus] = useState(0);
  const [finished, setFinished] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const nextRef = useRef<HTMLButtonElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const q = questions[index];
  const picked = answers[index];
  const answered = picked !== null;
  const score = answers.filter((a, i) => a === questions[i].answer).length;
  const mistakes = questions
    .map((question, i) => ({ question, picked: answers[i], i }))
    .filter((m) => m.picked !== m.question.answer);

  function choose(option: number) {
    if (answered || finished) return;
    setAnswers((a) => a.map((v, i) => (i === index ? option : v)));
    requestAnimationFrame(() => nextRef.current?.focus({ preventScroll: true }));
  }

  function next() {
    if (index + 1 < total) {
      setIndex(index + 1);
      setFocus(0);
      requestAnimationFrame(() => optionRefs.current[0]?.focus({ preventScroll: true }));
      return;
    }
    recordQuizScore(key, score, total);
    setFinished(true);
  }

  function retry() {
    setAnswers(questions.map(() => null));
    setIndex(0);
    setFocus(0);
    setFinished(false);
    setReviewing(false);
    sectionRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  // Number keys answer, Enter moves on — only while the quiz is on screen.
  const onKey = useEffectEvent((e: KeyboardEvent) => {
    if (finished || e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target as HTMLElement | null;
    if (t?.closest("input, textarea, select, [contenteditable='true']")) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect || rect.bottom < 0 || rect.top > window.innerHeight) return;
    const n = Number(e.key);
    if (Number.isInteger(n) && n >= 1 && n <= q.options.length) {
      e.preventDefault();
      choose(n - 1);
    } else if (e.key === "Enter" && answered && t === document.body) {
      e.preventDefault();
      next();
    }
  });
  useEffect(() => {
    const handler = (e: KeyboardEvent) => onKey(e);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  function onOptionKey(e: React.KeyboardEvent, i: number) {
    const count = q.options.length;
    let to = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") to = (i + 1) % count;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") to = (i - 1 + count) % count;
    if (to < 0) return;
    e.preventDefault();
    setFocus(to);
    optionRefs.current[to]?.focus();
  }

  return (
    <section
      ref={sectionRef}
      aria-labelledby="quiz-heading"
      className="card mt-10 scroll-mt-24 p-5 sm:p-7"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="quiz-heading" className="flex items-center gap-3 text-xl font-bold">
          <span className="icon-tile" aria-hidden>
            <ListChecksIcon className="size-5" />
          </span>
          Quiz
        </h2>
        {best && !finished && (
          <p className="text-muted text-sm">
            Best score: {best.best}/{best.total}
          </p>
        )}
      </div>

      {finished ? (
        <div className="slide-in mt-6" role="status">
          <div className="flex flex-wrap items-center gap-5">
            <ScoreRing score={score} total={total} />
            <div className="min-w-0 flex-1">
              <p className="text-lg font-semibold">
                {score === total
                  ? "Perfect score. You're ready to move on."
                  : score >= total * 0.8
                    ? "Solid. Review what you missed, then move on."
                    : "Worth another pass through the lessons before moving on."}
              </p>
              <p className="text-muted mt-1 text-sm">
                {score} of {total} correct
                {best ? ` · best ${best.best}/${best.total}` : ""}
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {mistakes.length > 0 && (
              <button
                type="button"
                onClick={() => setReviewing((r) => !r)}
                aria-expanded={reviewing}
                className={buttonClass("secondary")}
              >
                {reviewing ? "Hide mistakes" : `Review mistakes (${mistakes.length})`}
              </button>
            )}
            <button type="button" onClick={retry} className={buttonClass("ghost")}>
              <RotateCcwIcon className="size-4" />
              Retake
            </button>
            {nextModule && (
              <Link
                href={nextModule.href}
                transitionTypes={["nav-forward"]}
                className={buttonClass("primary", "md", "group sm:ml-auto")}
              >
                Next module
                <ArrowRightIcon className="size-4 transition-transform duration-150 group-hover:translate-x-[3px]" />
              </Link>
            )}
          </div>
          {reviewing && (
            <ol className="slide-in mt-6 space-y-4">
              {mistakes.map((m) => (
                <li key={m.i} className="border-border rounded-xl border p-4">
                  <p className="text-muted kicker">Question {m.i + 1}</p>
                  <p className="mt-1 font-medium">
                    <Rich text={m.question.question} />
                  </p>
                  {m.picked !== null && (
                    <p className="text-danger mt-2 flex items-start gap-2 text-sm">
                      <WrongIcon className="mt-0.5 size-4 shrink-0" />
                      <span>
                        You chose: <Rich text={m.question.options[m.picked]} />
                      </span>
                    </p>
                  )}
                  <p className="text-success mt-1 flex items-start gap-2 text-sm">
                    <CorrectIcon className="mt-0.5 size-4 shrink-0" />
                    <span>
                      Answer: <Rich text={m.question.options[m.question.answer]} />
                    </span>
                  </p>
                  <p className="text-muted mt-2 text-sm">
                    <Rich text={m.question.explanation} />
                  </p>
                </li>
              ))}
            </ol>
          )}
        </div>
      ) : (
        <div className="mt-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-muted text-sm font-medium">
              Question {index + 1} of {total}
            </p>
            <ol className="flex flex-wrap gap-1.5" aria-label="Progress">
              {questions.map((question, i) => (
                <li
                  key={i}
                  className="quiz-dot"
                  data-state={
                    i === index
                      ? "current"
                      : answers[i] === null
                        ? undefined
                        : answers[i] === question.answer
                          ? "right"
                          : "wrong"
                  }
                >
                  <span className="sr-only">
                    Question {i + 1}
                    {answers[i] === null
                      ? ""
                      : answers[i] === question.answer
                        ? ": correct"
                        : ": wrong"}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <p
            id={`q-${index}`}
            className="mt-3 text-[1.0625rem] font-semibold text-pretty"
          >
            <Rich text={q.question} />
          </p>
          <div
            role="radiogroup"
            aria-labelledby={`q-${index}`}
            className="mt-4 space-y-2"
            key={index}
          >
            {q.options.map((option, i) => {
              const isRight = i === q.answer;
              const isPicked = i === picked;
              const state = !answered
                ? undefined
                : isRight
                  ? "correct"
                  : isPicked
                    ? "wrong"
                    : "dim";
              return (
                <button
                  key={i}
                  ref={(el) => {
                    optionRefs.current[i] = el;
                  }}
                  type="button"
                  role="radio"
                  aria-checked={isPicked}
                  aria-disabled={answered}
                  tabIndex={answered ? -1 : i === focus ? 0 : -1}
                  onClick={() => choose(i)}
                  onKeyDown={(e) => onOptionKey(e, i)}
                  data-state={state}
                  className="quiz-option"
                >
                  <span className="quiz-letter">{String.fromCharCode(65 + i)}</span>
                  <span className="min-w-0 flex-1">
                    <Rich text={option} />
                  </span>
                  {state === "correct" && (
                    <span className="text-success check-pop inline-flex shrink-0 items-center gap-1 text-sm font-semibold">
                      <CorrectIcon className="size-4" />
                      Correct
                    </span>
                  )}
                  {state === "wrong" && (
                    <span className="text-danger inline-flex shrink-0 items-center gap-1 text-sm font-semibold">
                      <WrongIcon className="size-4" />
                      Not quite
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {answered ? (
            <div className="slide-in mt-5" role="status">
              <p className="text-[0.9375rem] leading-relaxed">
                <span className="font-semibold">
                  {picked === q.answer
                    ? "Correct. "
                    : `Not quite. The answer is ${String.fromCharCode(65 + q.answer)}. `}
                </span>
                <span className="text-muted">
                  <Rich text={q.explanation} />
                </span>
              </p>
              <button
                ref={nextRef}
                type="button"
                onClick={next}
                className={buttonClass("primary", "md", "group mt-4")}
              >
                {index + 1 < total ? "Next question" : "See my score"}
                <ArrowRightIcon className="size-4 transition-transform duration-150 group-hover:translate-x-[3px]" />
              </button>
            </div>
          ) : (
            <p className="text-muted mt-4 hidden items-center gap-1.5 text-xs sm:flex">
              Press <Kbd>1</Kbd>–<Kbd>{q.options.length}</Kbd> to answer, <Kbd>↵</Kbd> for
              the next question.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
