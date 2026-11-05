"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { PlayIcon } from "@/components/course/icons";
import { buttonClass } from "@/components/ui/button";
import type { CodeSample } from "@/lib/loop-trap";

/**
 * Home signature (DESIGN.md § Signature): the lesson's loop-trap code, highlighted exactly
 * like a lesson code block, with a var/let switch and a Run button that executes it and
 * prints what console.log really printed. Without script the `var` version still shows.
 */
export function LoopTrap({
  samples,
  lesson,
}: {
  samples: CodeSample[];
  lesson: { href: string; title: string; moduleTitle: string; order: number };
}) {
  const [which, setWhich] = useState<CodeSample["id"]>("var");
  const [out, setOut] = useState<{ run: number; lines: string[] } | null>(null);
  const runId = useRef(0);
  const sample = samples.find((s) => s.id === which) ?? samples[0];

  function choose(id: CodeSample["id"]) {
    runId.current++;
    setWhich(id);
    setOut(null);
  }

  function run() {
    const run = ++runId.current;
    setOut({ run, lines: [] });
    const log = (...args: unknown[]) => {
      if (runId.current !== run) return;
      const line = args.map(String).join(" ");
      setOut((o) => ({ run, lines: [...(o?.lines ?? []), line] }));
    };
    try {
      // The code is the lesson's own snippet, read from content/ at build time.
      new Function("console", sample.code)({ log });
    } catch (error) {
      setOut({ run, lines: [String(error)] });
    }
  }

  return (
    <div className="min-w-0">
      <figure className="code-sample m-0">
        <div className="border-border flex flex-wrap items-center justify-between gap-3 border-b px-4 py-4 sm:px-6">
          <div className="seg" role="group" aria-label="Declare the loop variable with">
            {samples.map((s) => (
              <button
                key={s.id}
                type="button"
                aria-pressed={s.id === which}
                onClick={() => choose(s.id)}
                className="font-mono"
              >
                {s.id}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={run}
            className={buttonClass("secondary", "md", "h-11")}
          >
            <PlayIcon className="size-4" />
            Run
          </button>
        </div>
        <div dangerouslySetInnerHTML={{ __html: sample.html }} />
        <ol
          aria-live="polite"
          aria-label="Console output"
          className="code-out border-border border-t"
        >
          {out === null ? (
            <li className="text-muted font-sans">Predict what it prints, then run it.</li>
          ) : (
            out.lines.map((line, i) => (
              <li key={`${out.run}-${i}`} style={{ animationDelay: `${i * 40}ms` }}>
                {line}
              </li>
            ))
          )}
        </ol>
        {out !== null && out.lines.length > 0 && (
          <p
            className="code-why border-border text-ink-2 slide-in border-t px-4 py-5 leading-relaxed sm:px-6"
            dangerouslySetInnerHTML={{ __html: sample.why }}
          />
        )}
      </figure>
      <p className="text-muted mt-3 text-sm">
        From{" "}
        <Link
          href={lesson.href}
          className="text-foreground decoration-accent underline underline-offset-[0.2em] hover:decoration-2"
        >
          {lesson.title}
        </Link>
        , lesson {lesson.order} of {lesson.moduleTitle}.
      </p>
    </div>
  );
}
