@AGENTS.md

# FullStack Path — working rules for AI agents

A learning site (Next.js 16 + MDX) that teaches the owner React, Node.js and Next.js. The owner has 5+ years of HTML/CSS but is new to JavaScript-heavy development: explain programming concepts from scratch, skip HTML/CSS basics.

`PENDING.md` is the plan. Every `[ ]` line is one task. These rules make every task come out the same way, whoever does it.

## Workflow (follow in order)

1. Open `PENDING.md` and take the **first** `[ ]` item from the top, skipping Phase 4 unless the user asks for it. If the user names a task, do that one instead.
2. Do **only that one item** in a session. Don't start the next one.
3. Before writing a lesson, read `content/javascript-core/scope-hoisting-closures.mdx` as the style reference, plus the previous lesson in the same module so the new one builds on it.
4. Do the work following the specs below.
5. Run the checks in "Definition of done". Fix every failure.
6. Tick the item `[x]` in `PENDING.md` and update the Status table when a module or phase completes.
7. Report back in a few lines: what you made, which checks passed, anything left open.

If something is unclear or a fixed choice in `PENDING.md` turns out to be wrong (such as a deprecated library), **don't guess or switch tools on your own**. Add the question under `## Open questions` in `PENDING.md`, then stop and ask the user.

## Lesson spec

**File:** `content/<module-slug>/<lesson-slug>.mdx`. Use exactly the path and `order` given in `PENDING.md`. Lessons show up only when the module's `status` in `src/lib/roadmap.ts` is `"available"`; switch it from `"soon"` when the module's first lesson is added.

**Frontmatter (exact shape; `npm run check:content` validates it):**

```yaml
---
title: Short Title Case Name
summary: "One sentence on what the learner will be able to do. Quote it if it contains a colon."
order: 3
takeaways:
  - 4 to 6 plain sentences, one idea each. No colons at the start, no markdown.
videos:
  - title: "Exact video title from YouTube"
    channel: "Exact channel name"
    duration: "12:34"
    url: https://www.youtube.com/watch?v=VIDEO_ID
docs:
  - title: "react.dev — useEffect"
    url: https://react.dev/reference/react/useEffect
---
```

(`docs` is added in Phase 1.5. Until the site supports it, leave it out.)

**Body:**

- Open with 1–2 paragraphs saying why the topic matters (interviews, real jobs, which later lessons use it). No H1 heading; the title is rendered for you.
- 4–8 `##` sections, from simple to advanced. `###` is fine inside them. Never skip a step the learner needs.
- Each concept follows: short explanation → small code example → what it prints or does → a common mistake.
- Code fences always carry a language (`js`, `ts`, `tsx`, `bash`, `sql`, `text` for diagrams). Show file names in a comment on the first line when there are several files.
- Use `<Callout type="note|tip|warning" title="...">` for gotchas, at most 3 per lesson.
- End with 3–5 exercises, from easy to hard. At least one should be "predict the output" or "fix the bug":

  ````mdx
  <Exercise title="Short name">
  Task description.

  <Solution>
  ```js
  // full working solution
  ```
  </Solution>
  </Exercise>
  ````

- Length: 250–400 lines. If a topic needs more, split it into two lessons and note the split in `PENDING.md`.

**MDX gotchas (these break the build):**

- `{`, `}` and `<` in normal prose are read as JSX. Wrap them in backticks.
- HTML comments `<!-- -->` don't work. Use `{/* comment */}` if you need one.
- Only `Callout`, `Exercise` and `Solution` exist as components (see `src/components/mdx.tsx`). Don't use others unless your task adds them.

**Module quiz (`<module>/quiz.mdx`, `order: 99`):** a `## Ready to move on?` checklist of 5–8 "I can…" statements, then 8–10 multiple-choice questions in the `quiz` frontmatter field. The exact format is set by the Phase 1.5 quiz task; once that task is done, copy the format from `content/web-foundations/quiz.mdx`.

**Project lessons (`project-*.mdx`):** say what will be built and show a screenshot or ASCII sketch. List requirements as a checklist, give step-by-step build stages (each stage ends in something runnable), add stretch goals, and put the full solution code inside `<Solution>` blocks.

## Videos: never invent links

- Find videos with web search. Only add a video whose page you actually opened or whose ID you confirmed, then run `npm run check:videos`. It must pass.
- Prefer videos published in the last 3 years for React, Next.js and Node tooling. Older is fine for timeless topics (event loop, SQL, HTTP).
- 1–3 videos per lesson: ideally one short overview (under 15 min) and one in-depth.
- If you can't find a good verified video, use `videos: []` and add the lesson under `## Needs videos` in `PENDING.md`. An empty list is better than a wrong link.

## Code in lessons must actually run

- Run every non-trivial snippet before publishing. For plain JS/TS: write it in the scratchpad and run it with `node` (Node runs `.ts` files directly).
- For React, Express, database and Next.js examples and projects: build them in `../fs-sandbox/<lesson-slug>/`, a sibling folder **outside** this repo, because nested projects break this site's lint and build. Install, run and test there, then copy the code into the lesson.
- Next.js lessons: read the matching guide in `node_modules/next/dist/docs/01-app/` first and follow it over memory. Key Next.js 16 facts: `middleware` is now `proxy.ts`; `params`/`searchParams` are Promises; caching uses Cache Components (`use cache`, `cacheLife`, `cacheTag`).
- For other libraries, check the current official docs on the web for the latest stable version. Mention the major version in the lesson intro (for example "written for React Router 7").

## Changing site code (`src/`)

- TypeScript strict, Server Components by default, `"use client"` only where interactivity needs it.
- The React Compiler is on: don't add `useMemo`/`useCallback`/`memo` for performance.
- Style with Tailwind using the existing tokens (`accent`, `surface`, `border`, `muted`, `success`, `warning`). Copy patterns from neighbouring components.
- Lesson progress lives in localStorage via `src/lib/progress.ts` (a `useSyncExternalStore` store). New saved state, such as quiz scores, follows the same pattern in a sibling file under `src/lib/`, with its own versioned key (e.g. `fs-learn-quiz-v1`).
- Keep `cacheComponents` off (see "Phase 1 notes" in `PENDING.md`).
- When adding a frontmatter field, update the `Lesson` type in `src/lib/content.ts` **and** the validation in `scripts/check-content.mjs`.
- After UI changes, start the `site` preview (`.claude/launch.json`), open the affected page, and check light mode, dark mode and phone width.

## Definition of done

Every task:

```bash
npm run check:content && npm run lint && npm run typecheck && npm run build
```

Also:

- If videos changed: `npm run check:videos`.
- If it's a lesson: open it at `http://localhost:3000/learn/<module>/<lesson>` and confirm it renders, the exercises' solutions toggle, and the code is highlighted.
- Run `npx prettier --write` on the files you touched.

Don't tick a box in `PENDING.md` unless all of the above passed.

## Don't

- Don't change the fixed tool choices in `PENDING.md` → "Tool choices".
- Don't edit the `nextjs-agent-rules` block in `AGENTS.md` (`next dev` regenerates it).
- Don't rewrite existing lessons except to fix a bug or add a field your task asks for.
- Don't do several `PENDING.md` items in one go, or mark partial work as done.
