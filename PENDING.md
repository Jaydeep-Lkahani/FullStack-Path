# Full Stack Learning Website — PENDING

A learning website to go from fundamentals to job-ready in **React + Node.js + Next.js**, with curated videos, practice, and interview prep.

**Stack for the site itself:** Next.js (App Router) + TypeScript + Tailwind + MDX for lessons. Building the site with the same tools we're teaching doubles as learning.
**Progress tracking:** localStorage first (no login needed), optional database in Phase 4.

Legend: `[ ]` pending · `[x]` done · `[~]` skipped by decision

**How to use this file (humans and AI agents):** read `CLAUDE.md` first. Work top to bottom, **one `[ ]` item per session**. Lesson items read `slug` (order) — what it covers: create `content/<module>/<slug>.mdx` with that `order`, following the lesson spec in `CLAUDE.md` (videos, docs links, 3–5 exercises are part of every lesson, not separate tasks).

---

## Phase 1 — Foundation & Site Skeleton
Goal: a running site with navigation, a roadmap, and the core web fundamentals content.

### 1.1 Project setup
- [x] Init Next.js + TypeScript + Tailwind project
- [x] ESLint, Prettier, folder structure (`/content`, `/components`, `/app`)
- [x] MDX pipeline for writing lessons as markdown files
- [x] Layout: header, sidebar (topic tree), footer, dark/light mode
- [x] Responsive design (mobile friendly)

### 1.2 Core site features
- [x] Home page with the full roadmap (Phase → Module → Lesson)
- [x] Lesson page template: explanation, code samples, embedded video, key takeaways, exercises
- [x] "Mark as complete" + progress bar (saved in localStorage)
- [x] Syntax-highlighted code blocks with copy button
- [x] Search across lessons

### 1.3 Content: Web fundamentals
- [x] How the web works (HTTP, DNS, browser, client/server)
- [~] HTML5 + semantic markup + accessibility basics — skipped (5+ years HTML/CSS experience)
- [~] CSS: box model, flexbox, grid, responsive design — skipped (5+ years HTML/CSS experience)
- [x] JavaScript core: variables, functions, scope, closures, `this`, prototypes
- [x] Modern JS (ES6+): destructuring, spread, modules, async/await, promises, event loop
- [x] DOM manipulation, events, fetch API
- [x] TypeScript basics: types, interfaces, generics
- [x] Git & GitHub workflow, npm basics, terminal basics

### 1.4 Videos for Phase 1
- [x] Curate 1–3 vetted videos per lesson (free, up to date, well-reviewed)
- [x] Verify every link works and is not outdated before adding
- [x] `videos` field per lesson (title, channel, duration, URL) rendered as embedded player

### 1.5 Phase 1 wrap-up (backfill — site features first, they're reused by every later lesson)
- [x] Site: `docs` frontmatter field — list of `{ title, url }`, rendered as an "Official docs" link list under the videos; add to the `Lesson` type and to `scripts/check-content.mjs`
- [x] Site: `quiz` frontmatter field — list of `{ question, options: string[], answer: number (0-based), explanation }`; a client `Quiz` component rendered at the end of the lesson page (one question at a time or all at once, show right/wrong + explanation, "Try again" button); best score saved in localStorage key `fs-learn-quiz-v1`; validation in `scripts/check-content.mjs` (≥2 options, answer in range); show the best score on the module page
- [x] Content: `web-foundations/quiz` (99) — "Ready to move on?" checklist + 8–10 questions. This file becomes the format reference for every later quiz
- [x] Content: `javascript-core/quiz` (99)
- [x] Content: `modern-javascript/quiz` (99)
- [x] Content: `browser-javascript/quiz` (99)
- [x] Content: `typescript-basics/quiz` (99)
- [x] Content: `browser-javascript/browser-storage` (4) — localStorage, sessionStorage, cookies: what each is for, size limits, what never to store there (tokens/XSS)
- [x] Content: `typescript-basics/project-github-search` (3) — checkpoint project, plain TS + DOM, no framework: search GitHub users via the public API, loading/error/empty states, recent searches saved in localStorage
- [x] Content: add `docs` links (MDN / TypeScript handbook / git-scm) to all 13 existing Phase 1 lessons

**Phase 1 done when (met — see Status):** site runs locally, roadmap + progress tracking work, all 1.3 lessons exist with videos. (1.5 is a backfill added after review.)

---

## Phase 2 — React, Node.js & Databases
Goal: deep content for the frontend and backend pillars, then connect them.

- [x] Site: in `src/lib/roadmap.ts` add modules `databases` ("Databases") and `fullstack-integration` ("Connecting Frontend & Backend") to Phase 2 after `node-express`, and `production` ("Shipping to Production") to Phase 3 after `nextjs`, all `status: "soon"`

### 2.1 React — `content/react/`
- [x] `setup-vite` (1) — what React is and why, create a Vite + React + TypeScript app, project structure, React DevTools
- [x] `jsx-and-components` (2) — JSX rules, components, props, children, composition
- [x] `state-and-events` (3) — `useState`, event handlers, rendering lists with keys, conditional rendering, state is a snapshot
- [x] `thinking-in-react` (4) — splitting UI into components, lifting state up, one-way data flow, where state should live
- [x] `react-with-typescript` (5) — typing props, children, events, refs, state, and hooks
- [x] `use-effect` (6) — `useEffect` and cleanup, dependency arrays, "You might not need an effect" mistakes and what to use instead
- [x] `refs-context-id` (7) — `useRef` (DOM + mutable values), `useContext` (prop drilling fix), `useId`
- [x] `use-reducer` (8) — `useReducer`, when to pick it over `useState`, reducer + context pattern
- [x] `custom-hooks` (9) — extracting custom hooks, rules of hooks, composition patterns
- [x] `suspense-error-boundaries` (10) — `Suspense`, `lazy`, error boundaries, loading and error states
- [x] `forms` (11) — controlled vs uncontrolled inputs, React Hook Form + Zod validation
- [x] `react-19-actions` (12) — Actions, `useTransition`, `useActionState`, `useOptimistic`, `use()`, form actions
- [x] `styling` (13) — Tailwind in React, CSS Modules, shadcn/ui
- [x] `routing` (14) — React Router (declarative mode): routes, params, nested layouts, navigation
- [x] `data-fetching` (15) — TanStack Query: queries, mutations, caching, invalidation; server state vs client state
- [x] `state-management` (16) — Zustand for global client state; Redux Toolkit overview (enough for interviews and older codebases)
- [x] `performance` (17) — how rendering works, React Compiler auto-memoization, when `memo`/`useMemo`/`useCallback` still matter, code splitting
- [x] `testing` (18) — Vitest + React Testing Library, mocking APIs with MSW
- [x] `project-todo-1` (19) — Todo app part 1: setup, reducer, add/list/toggle/delete, inline edit
- [x] `project-todo-2` (20) — Todo app part 2: filters, clear completed, localStorage persistence, tests
- [x] `project-weather-1` (21) — Weather app part 1: Open-Meteo API (no key needed), typed API layer with Zod, debounced city search with TanStack Query, loading/error/empty states
- [x] `project-weather-2` (22) — part 2: current weather + 5-day forecast, °C/°F switch with `keepPreviousData`, remember the last city in localStorage
- [x] `project-weather-3` (23) — part 3: tests with Vitest, Testing Library and MSW (API layer, debounce hook, user flows), breaking the code on purpose
- [x] `project-expense-tracker-1` (24) — Expense tracker part 1: setup, money in cents and dates, Zod form and storage schemas, persisted Zustand store, tests for the data layer
- [x] `project-expense-tracker-2` (25) — part 2: layout and routes, React Hook Form add/edit form, list with delete, tests for the flows
- [x] `project-expense-tracker-3` (26) — part 3: filters in the URL (`useSearchParams`), dashboard with CSS bars (no chart library), tests, breaking the code on purpose
- [x] `quiz` (99)

### 2.2 Node.js & Express — `content/node-express/`
- [x] `node-runtime` (1) — what Node is, ES modules vs CommonJS, `process`, env variables and `.env` files
- [x] `node-event-loop` (2) — Node's event loop phases, `nextTick` vs promises vs `setImmediate`, the thread pool, never blocking the loop (split from `node-runtime`; see Open questions)
- [ ] `fs-and-streams` (3) — `fs/promises`, paths, streams and piping, when streams matter
- [ ] `node-typescript` (4) — running `.ts` directly (type stripping), `node --watch`, `tsx`, tsconfig for Node
- [ ] `express-basics` (5) — Express 5 app, routes, params/query/body, middleware chain
- [ ] `express-error-handling` (6) — error middleware, async errors in Express 5, 404 handler, consistent error JSON
- [ ] `rest-api-design` (7) — resources, methods, status codes, pagination, versioning, documenting with OpenAPI, testing by hand with curl + Bruno
- [ ] `validation` (8) — validating body/params with Zod, sharing schemas
- [ ] `authentication` (9) — password hashing (argon2), cookie sessions vs JWT, httpOnly cookies, login/logout
- [ ] `authorization-oauth` (10) — roles and permissions middleware, how OAuth "Sign in with GitHub" works
- [ ] `security` (11) — CORS, helmet, rate limiting, OWASP top 10 for APIs
- [ ] `uploads-config-logging` (12) — file uploads (multer), config from env, structured logging (pino)
- [ ] `websockets` (13) — HTTP vs WebSockets, Socket.IO server + client, rooms (needed for capstone 3)
- [ ] `testing-apis` (14) — Vitest + Supertest, test database strategy
- [ ] `project-notes-api` (15) — Notes REST API (in-memory store), validation, errors, tests
- [ ] `project-auth-service` (16) — sign up / log in / me / log out with sessions, roles, tests
- [ ] `stretch-redis-queues` (17) — optional: Redis caching and background jobs (BullMQ)
- [ ] `quiz` (99)

### 2.3 Databases — `content/databases/`
- [ ] `postgres-setup` (1) — what a relational DB is, install PostgreSQL (Postgres.app/Homebrew) or a free Neon database, connect with `psql` and a GUI
- [ ] `sql-basics` (2) — tables, `CREATE`, `INSERT`, `SELECT`, `WHERE`, `ORDER BY`, `UPDATE`, `DELETE`
- [ ] `joins-and-aggregates` (3) — `JOIN`s, `GROUP BY`, aggregates, subqueries
- [ ] `schema-design` (4) — primary/foreign keys, one-to-many, many-to-many, normalization, constraints
- [ ] `indexes-transactions` (5) — indexes and `EXPLAIN`, transactions, ACID, N+1 problem
- [ ] `prisma` (6) — Prisma schema, migrations, seeding, queries and relations, raw SQL when needed
- [ ] `mongodb-mongoose` (7) — documents vs tables, Mongoose models, when NoSQL fits and when it doesn't
- [ ] `project-blog-backend` (8) — Blog API: Express + Prisma + PostgreSQL, posts/comments/users, pagination, tests
- [ ] `quiz` (99)

### 2.4 Connecting frontend & backend — `content/fullstack-integration/`
- [ ] `react-meets-express` (1) — Vite dev proxy vs CORS, env per environment, fetching from your own API, typed API client
- [ ] `auth-end-to-end` (2) — sign up → log in → protected routes → log out; cookies across origins, `credentials: "include"`
- [ ] `project-notes-app-1` (3) — full-stack Notes app part 1: monorepo layout, Express + Prisma API, database
- [ ] `project-notes-app-2` (4) — part 2: React UI with TanStack Query, auth, protected pages
- [ ] `quiz` (99)

**Phase 2 done when:** all 2.x items are ticked: four modules with lessons, videos, exercises and quizzes, plus 8 projects.

---

## Phase 3 — Next.js, Production, Projects & Interview Prep
Goal: tie everything together and become interview-ready.

### 3.1 Next.js — `content/nextjs/` (Next.js 16 — read `node_modules/next/dist/docs/01-app/` before each lesson)
- [ ] `why-nextjs` (1) — what Next.js adds to React, create-next-app, project structure (Pages Router: one section, just enough to read older code)
- [ ] `routing-and-layouts` (2) — App Router: pages, layouts, dynamic routes, async `params`, `Link`, route groups
- [ ] `server-and-client-components` (3) — Server vs Client Components, the `"use client"` boundary, passing data across it
- [ ] `loading-and-errors` (4) — `loading.tsx`, `error.tsx`, `not-found.tsx`, streaming with Suspense
- [ ] `data-fetching` (5) — fetching in Server Components, static vs dynamic rendering, parallel fetching
- [ ] `caching` (6) — Cache Components: `use cache`, `cacheLife`, `cacheTag`, `revalidatePath`/`revalidateTag`; map old terms (SSG/ISR/SSR) to the new model for interviews
- [ ] `server-actions-forms` (7) — Server Actions, forms with `useActionState` + Zod, optimistic UI
- [ ] `route-handlers` (8) — Route Handlers (API endpoints), when to use them vs Server Actions
- [ ] `proxy` (9) — `proxy.ts` (called `middleware` before Next.js 16): redirects, headers, optimistic auth checks
- [ ] `auth` (10) — authentication with Better Auth + Prisma, protecting pages and actions
- [ ] `data-security` (11) — data access layer, server-only code, keeping secrets out of the client
- [ ] `seo-and-optimization` (12) — metadata, OG images, `next/image`, `next/font`, Core Web Vitals
- [ ] `deployment` (13) — env variables, deploying to Vercel, `output: "standalone"` for Docker
- [ ] `quiz` (99)

### 3.2 Shipping to production — `content/production/`
- [ ] `docker-basics` (1) — images vs containers, Dockerfile for a Node app, `docker compose` with Postgres
- [ ] `github-actions-ci` (2) — CI workflow: install, lint, typecheck, test on every pull request
- [ ] `deploy-api-and-db` (3) — deploy an Express API to Render with a Neon PostgreSQL database, migrations on deploy
- [ ] `env-and-secrets` (4) — env management across dev/preview/production, never committing secrets
- [ ] `monitoring` (5) — error tracking with Sentry, reading production logs
- [ ] `e2e-playwright` (6) — end-to-end tests with Playwright, running them in CI
- [ ] `quiz` (99)

### 3.3 Capstone projects — `content/capstone-projects/`
Each part ends with something runnable. The last part of each project includes the portfolio bar: live URL, README with screenshots, tests, CI passing.
- [ ] `blog-cms-1` (1) — Blog/CMS: Next.js + Prisma + PostgreSQL setup, schema, seed data
- [ ] `blog-cms-2` (2) — public pages: post list, post page, pagination, caching
- [ ] `blog-cms-3` (3) — auth + admin editor with Server Actions (create/edit/publish)
- [ ] `blog-cms-4` (4) — images, SEO, tests, CI, deploy
- [ ] `shop-1` (5) — E-commerce: product catalog, categories, search
- [ ] `shop-2` (6) — cart (Zustand + persistence), cart page
- [ ] `shop-3` (7) — checkout with Stripe test mode, webhooks, orders
- [ ] `shop-4` (8) — order history, admin view, tests, CI, deploy
- [ ] `chat-1` (9) — Real-time chat: Express + Socket.IO server, rooms
- [ ] `chat-2` (10) — React client, auth, message history in PostgreSQL
- [ ] `chat-3` (11) — typing indicators, online users, tests, deploy

### 3.4 Interview preparation — `content/interview-prep/`
Question banks use `<Exercise title="Q: …">` + `<Solution>` for the answer, 20–40 questions each, easy → hard.
- [ ] `javascript-questions` (1) — closures, hoisting, event loop, promises, `this`, prototypes, output-prediction
- [ ] `typescript-questions` (2) — `type` vs `interface`, generics, narrowing, utility types
- [ ] `web-fundamentals-questions` (3) — browser rendering, Core Web Vitals, XSS/CSRF, CORS, cookies vs tokens
- [ ] `react-questions` (4) — reconciliation, keys, hooks pitfalls, performance, state design
- [ ] `node-questions` (5) — event loop phases, streams, clustering, security
- [ ] `nextjs-questions` (6) — Server Components, rendering, caching, Server Actions
- [ ] `databases-system-design` (7) — indexes, transactions, caching, scaling, REST vs GraphQL, design a URL shortener / chat
- [ ] `dsa-essentials` (8) — arrays, strings, hashmaps, two pointers, recursion, trees + curated problem list with links
- [ ] `machine-coding` (9) — build-in-60-min rounds: autocomplete, infinite scroll, star rating, modal, pagination (with solutions)
- [ ] `behavioral` (10) — common questions + STAR answer templates
- [ ] `resume-portfolio` (11) — resume, GitHub profile and portfolio checklist
- [ ] `revision-plan` (12) — 8-week revision plan + mock interview checklist
- [ ] Site: flashcard mode on `interview-prep` lessons — a toggle that shows one `Exercise` at a time with "Show answer" / "Next"

**Phase 3 done when:** all 3.x items are ticked: Next.js and production modules, 3 deployed capstone projects, and all interview banks live.

---

## Phase 4 — Polish & Launch (optional — only when the user asks)
- [ ] Optional login + saving progress to a database
- [ ] Bookmarks, notes per lesson, streak tracker
- [ ] In-browser code playground in lessons (e.g. Sandpack) so examples can be edited and run
- [ ] Study-plan generator (4 / 8 / 12-week schedules)
- [ ] Lighthouse score 90+, accessibility audit
- [ ] Deploy to Vercel, custom domain
- [ ] Final link check for all videos

---

## Decisions to confirm before Phase 1 starts
- [x] Experience level: HTML/CSS skipped (5+ years); web fundamentals + JS/TS from scratch
- [x] Video style: YouTube embeds (click-to-load, youtube-nocookie)
- [x] Content depth: detailed tutorials
- [x] Deployment target: local only for now (Vercel in Phase 4)

## Tool choices (fixed — lessons teach these; don't switch without asking the user)
| Area | Choice |
|------|--------|
| React setup | Vite + React + TypeScript |
| Forms | React Hook Form + Zod |
| Routing (plain React) | React Router (declarative mode) |
| Server state | TanStack Query |
| Client state | Zustand (Redux Toolkit as overview only) |
| Styling | Tailwind + shadcn/ui |
| Unit/component tests | Vitest + React Testing Library + MSW |
| Backend | Node.js + Express 5 |
| Validation | Zod (frontend and backend) |
| Password hashing | argon2 |
| Real-time | Socket.IO |
| API tests | Vitest + Supertest |
| HTTP client for manual testing | Bruno (curl for quick checks) |
| SQL database / ORM | PostgreSQL + Prisma |
| NoSQL | MongoDB + Mongoose (one lesson) |
| Next.js auth | Better Auth |
| Payments | Stripe test mode |
| E2E tests | Playwright |
| Hosting | Vercel (Next.js), Render (Express), Neon (PostgreSQL) |
| CI / errors | GitHub Actions / Sentry |

## Status
| Phase | Status |
|-------|--------|
| Phase 1 — Foundation & Skeleton | Done (15 lessons + 5 module quizzes, 29 verified videos, docs links on every lesson) |
| Phase 2 — React, Node.js & Databases | Pending |
| Phase 3 — Next.js, Production, Projects, Interview Prep | Pending |
| Phase 4 — Polish & Launch | Pending |

## Open questions
_(Agents: add anything you're unsure about here, then stop and ask.)_
- `node-express/node-runtime` was split into `node-runtime` (1) and `node-event-loop` (2) because one lesson came to 560 lines. Parts are 358 and 265 lines. Every later `node-express` lesson moved up by one (`fs-and-streams` is now 3, `express-basics` 5, and so on up to `stretch-redis-queues` 17); the quiz stays at 99. Tell me if you would rather have one longer lesson.
- `react/project-expense-tracker` was split into three lessons (`-1`, `-2`, `-3`, orders 24–26) because one lesson would have been about 950 lines (roughly 750 of them code and tests). Parts are 461, 554 and 526 lines, all over 400 because the solutions are full code and test files. Part 2 is the longest (554); the form, the pages and the flow tests are all full solution code there. Tell me if you would rather have four shorter parts, or fewer tests. The quiz stays at order 99.
- Lesson length: `CLAUDE.md` says 250–400 lines, but project lessons must hold full solution code in `<Solution>` blocks. `typescript-basics/project-github-search` is ~500 lines (about 330 of them code). Keep project lessons longer than 400, or split each into two parts like the capstones? Left as one lesson for now.
- `react/project-weather` was split into three lessons (`project-weather-1`, `-2`, `-3`, orders 21–23) because one lesson would have been about 1,180 lines (two parts still came to about 800 of code and tests). Parts are 391, 342 and 446 lines; Part 3 is over 400 because the MSW handlers and the test files are full solution code. `project-expense-tracker` moved from order 22 to 24. Tell me if you would rather have fewer, longer lessons.
- Project lessons: `react/project-todo` would have been ~710 lines (about 560 of them solution code), so it was split into `project-todo-1` and `project-todo-2` (the capstones already come in parts). `typescript-basics/project-github-search` is still one lesson of ~500 lines; the other two React projects (weather, expense tracker) will be split the same way if they get long. Tell me if you would rather keep projects whole.
- `browser-javascript/browser-storage` is ~410 lines including frontmatter (the body is under 400); it was trimmed once to fit.

## Needs videos
_(Lessons published with `videos: []` because no verified video was found.)_
- `react/project-expense-tracker-1`, `-2` and `-3` — web searches found no YouTube video for an expense tracker with React Hook Form, Zod and Zustand, and none for `useSearchParams` filters in React Router 7/8, so no ID could be confirmed. Lessons 11, 14 and 16 have the verified videos for those tools.
- `react/project-todo-1` — no vetted video found for a todo app built around `useReducer` and TypeScript; lesson 8's `useReducer` videos cover the reducer idea.
- `typescript-basics/project-github-search` — no vetted video found for a vanilla TypeScript GitHub search project; the lesson relies on the Fetch API videos in `browser-javascript/fetch-api`.

- `react/project-weather-2` and `react/project-weather-3` — no vetted video found for the weather app flow or for testing it with MSW; lesson 18's testing videos cover the tools. Part 1 has one verified video (Dave Gray's `useDebounce` tutorial).

## Phase 1 notes
- Run: `npm run dev` → http://localhost:3000. Checks: `npm run lint`, `npm run typecheck`, `npm run build`.
- Content lives in `content/<module>/<lesson>.mdx`; roadmap/modules in `src/lib/roadmap.ts`.
- `npm run check:content` validates frontmatter; `npm run check:videos` re-verifies every YouTube link (use again in Phase 4).
- `cacheComponents` is off: the MDX renderer uses `Date.now()` during prerender, which Cache Components rejects.
- Phase 1.5 added: `docs` and `quiz` frontmatter (see `src/lib/content.ts`, `scripts/check-content.mjs`), `src/components/Quiz.tsx`, and `src/lib/quiz.ts` (localStorage key `fs-learn-quiz-v1`). Quiz format reference: `content/web-foundations/quiz.mdx`.
- Docs links were each checked with an HTTP request before adding. There is no script for them yet; re-check them in Phase 4's link check.
- Project code for `project-github-search` was built and tested in `../fs-sandbox/project-github-search/`.
- React lesson code is built and tested in `../fs-sandbox/<lesson-slug>/` (Vite apps share `node_modules` via a symlink to `use-effect/node_modules`).
- `../fs-sandbox/forms/` has its own `node_modules`: `@hookform/resolvers@6` needs `npm install --legacy-peer-deps` (optional peer `effect` conflict).
- `../fs-sandbox/styling/` has its own `node_modules` (Tailwind 4, shadcn CLI 4.22 with the `radix-nova` preset, `cn` package). `shadcn init` needs `-p nova` to run without prompts.
- `../fs-sandbox/routing/` has its own `node_modules` (React Router 8.5, declarative mode). v8 needs Node 22.22+ and React 19.2.7+, and `react-router-dom` no longer exists (import from `react-router`). The tool choice "React Router (declarative mode)" still holds in v8.
- `../fs-sandbox/data-fetching/` has its own `node_modules` (TanStack Query 5.104 + devtools) and an in-memory fake API (`src/api.ts`) with `server.fail` and `server.delayMs` switches. Remember `queryClient.removeQueries` on a mounted query orphans its observer; use `resetQueries` in experiments.
- `../fs-sandbox/state-management/` has its own `node_modules` (Zustand 5.0, Redux Toolkit 2.13, React Redux 9.3). The app switches on the URL hash (`#bad`, `#shallow`, `#ctx`, `#redux`) to reproduce the object-selector loop, `useShallow`, the context re-render comparison and the Redux cart. Zustand 5 throws "Maximum update depth exceeded" for a selector that returns a new object.
- `../fs-sandbox/performance/` has its own `node_modules` (React 19.3, Vite 8.3, `@vitejs/plugin-react` 6.1, `babel-plugin-react-compiler` 1.0, `@rolldown/plugin-babel` 0.2, recharts for the bundle test). `COMPILER=off npm run dev` turns the compiler off; the app switches on the URL hash (`#cascade`, `#inline`, `#effect`, `#profiler`, `#plain`, `#deferred`, ...) and `window.renders` holds render counts. The compiler silently skips code it can't handle (for example `??=` in a component), so check with a render counter.
- `../fs-sandbox/testing/` has its own `node_modules` (Vitest 5.0, jsdom 30, Testing Library react 16.3 / user-event 14.6 / jest-dom 7, MSW 3.0, TanStack Query 5.104). Run `npx vitest run` there (15 tests). MSW 3 renamed `onUnhandledRequest` to `onUnhandledFrame`, and needs Node 22.12+. Without `cleanup()` in `afterEach` (Vitest has no globals by default) tests see each other's components.
- `../fs-sandbox/project-todo/` is the finished Todo app (Vite 8 react-ts template + Vitest 5 + Testing Library); the code in both parts was extracted from the lesson into a copy and passes `tsc` and all 16 tests. Split into two lessons because one lesson came to about 710 lines (the same question as the GitHub search project, see Open questions).
- `../fs-sandbox/project-weather/` is the finished weather app (Vite 8, React 19.3, TanStack Query 5.104, Zod 4.6, Vitest 5, MSW 3.0); it has its own `node_modules` and 16 tests (the lessons use 13: the sandbox also has a 3-test `format.test.ts`). The code in all three parts was extracted from the lessons into a copy and passes `tsc`, `oxlint`, all 13 tests and `vite build`, and the app was run against the real Open-Meteo API in the browser. Open-Meteo facts: the geocoding API leaves out `results` when nothing matches, errors are `{ error: true, reason }` with status 400, and `daily` data comes as parallel arrays.
- `../fs-sandbox/project-expense-tracker/` is the finished expense tracker (Vite 8, React 19.3, React Router 8.5, Zustand 5.0, Zod 4.6, React Hook Form 7.90 + `@hookform/resolvers` 6 (install needs `--legacy-peer-deps`), Vitest 5); it has its own `node_modules` and 35 tests (17 after Part 1, 25 after Part 2). The code in all three parts was embedded into the lessons from the sandbox files by a script, so it is exactly what ran; it passes `tsc`, `oxlint`, all tests and `vite build`, and was run in the browser. Facts worth knowing: `new Date("2026-10-20")` is UTC midnight, `toCents` needs `Math.round` (`1.15 * 100` is `114.99999999999999`), Zustand's `persist` survives non-JSON saved text by itself, and a controlled search box driven by `setSearchParams` with `replace: true` lost no characters in the browser.
- `../fs-sandbox/node-runtime/` holds the Node lesson code (plain scripts, no dependencies; run with Node 24.21). Facts worth knowing: in an ES module `Promise` callbacks run before `process.nextTick` (CommonJS and I/O callbacks run `nextTick` first); `setTimeout(0)` vs `setImmediate` from the main file is racy (the file read can even land between them), but inside an I/O callback `setImmediate` always wins; `import.meta` in a `.js` file with no `"type"` makes Node re-parse it as ESM; `require(esm)` works on 24; a real shell variable beats the same name in `--env-file`.
- Folder name `fs` is a Node core module name, so the npm package is `fullstack-learn`.
