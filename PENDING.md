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
- [x] `files-and-paths` (3) — `fs/promises`, paths (`node:path`, `import.meta.dirname`), reading and writing files, error codes, a small JSON store (split from `fs-and-streams`; see Open questions)
- [x] `streams` (4) — streams and piping: readable and writable streams, backpressure, `pipeline`, streams in HTTP, when streams matter (split from `fs-and-streams`)
- [x] `node-typescript` (5) — running `.ts` directly (type stripping), what Node can't strip, import rules, tsconfig for Node (split; see Open questions)
- [x] `node-dev-workflow` (6) — `node --watch` and `--env-file`, npm scripts, `tsx` and when to use it, building to `dist/` (split from `node-typescript`)
- [x] `express-basics` (7) — Express 5 app, routes, params/query/body (split from `express-basics`; see Open questions)
- [x] `express-middleware` (8) — the middleware chain, writing your own, routers, the 404 handler, `app.ts` vs `server.ts` (split from `express-basics`)
- [x] `express-error-handling` (9) — error middleware, async errors in Express 5, 404 handler, consistent error JSON
- [x] `rest-api-design` (10) — resources and URLs, methods, safe and idempotent, status codes, PUT vs PATCH, response design (one of four lessons split from the original `rest-api-design`; see Open questions)
- [x] `rest-api-build` (11) — the todo CRUD routes in Express 5 with checked input, `Location`, 405, tried by hand with curl (split from `rest-api-design`)
- [x] `pagination-and-versioning` (12) — filtering, sorting, offset and cursor pagination, breaking changes, `/v1` versioning, `Deprecation` and `Sunset` (split from `rest-api-design`)
- [x] `openapi-and-bruno` (13) — documenting with OpenAPI and linting it, testing by hand with Bruno and its CLI (split from `rest-api-design`)
- [x] `validation` (14) — validating body/params/query with Zod, typed `parse` helper, coercion traps (one of two lessons split from the original `validation`; see Open questions)
- [x] `schemas-and-config` (15) — sharing schemas with the frontend, generating OpenAPI schemas with `z.toJSONSchema`, validating `process.env`, which rules a schema can't check (split from `validation`)
- [x] `authentication` (16) — password hashing (argon2), sign-up and the password check at login, no hints for attackers, rehashing (one of two lessons split from the original `authentication`; see Open questions)
- [x] `sessions-and-jwt` (17) — cookie sessions, httpOnly cookies, `requireAuth`, logout, sessions vs JWT (split from `authentication`)
- [x] `authorization-oauth` (18) — roles, `requireRole`, ownership checks, 404 vs 403, broken object level authorization (the authorization half of the original `authorization-oauth`; see Open questions)
- [x] `oauth-github` (19) — how OAuth works, "Sign in with GitHub" with state and PKCE, safe account linking (split from `authorization-oauth`)
- [x] `security` (20) — CORS, helmet, rate limiting, OWASP top 10 for APIs
- [x] `structured-logging` (21) — structured logging with pino and pino-http: levels, request ids, `req.log`, redaction, log config from env (one of two lessons split from the original `uploads-config-logging`; see Open questions)
- [x] `file-uploads` (22) — file uploads with multer: limits, random names, checking the real type, access control, serving files back, upload config from env (split from `uploads-config-logging`)
- [x] `websockets` (23) — HTTP vs WebSockets, the upgrade handshake, raw `ws`, Socket.IO basics, an authenticated Socket.IO server with an `Origin` check (one of two lessons split from the original `websockets`; see Open questions)
- [x] `realtime-chat` (24) — rooms, validated events and acknowledgements, pushes from REST routes, a React hook that rejoins after reconnecting, scaling notes (needed for capstone 3; split from `websockets`)
- [x] `testing-apis` (25) — Vitest + Supertest, isolation between tests, logged-in requests, checking that tests can fail (one of two lessons split from the original `testing-apis`; see Open questions)
- [x] `testing-time-and-databases` (26) — faking the clock, testing rate limits, test database strategy: a guard, one database per worker, rollback vs truncate (split from `testing-apis`)
- [x] `project-notes-api-1` (27) — Notes REST API part 1: setup, errors, Zod schemas, in-memory store, create/read/list with filters, sort and pagination (one of two lessons split from the original `project-notes-api`; see Open questions)
- [x] `project-notes-api-2` (28) — part 2: PATCH and DELETE, Vitest + Supertest suite, breaking the code on purpose (split from `project-notes-api`)
- [x] `project-auth-service-1` (29) — Auth service part 1: setup, config, Zod schemas, argon2 users store, sign-up, a login check that gives nothing away (one of three lessons split from the original `project-auth-service`; see Open questions)
- [x] `project-auth-service-2` (30) — part 2: cookie sessions, `requireAuth`, login/me/logout, roles and the admin API, the first admin from the environment, change password and log out everywhere (split from `project-auth-service`)
- [x] `project-auth-service-3` (31) — part 3: the test suite for every security rule, breaking the code on purpose (split from `project-auth-service`)
- [x] `stretch-redis-queues` (32) — optional: Redis basics and caching: commands, ioredis, cache-aside with a TTL, invalidation, keys that contain the user (one of three lessons split from the original `stretch-redis-queues`; see Open questions)
- [x] `stretch-redis-counters` (33) — optional: a rate limiter on `INCR` + `MULTI` + `EXPIRE NX`, sessions in Redis with a sliding expiry, `noeviction` vs `allkeys-lru`, persistence, access (split from `stretch-redis-queues`)
- [x] `stretch-background-jobs` (34) — optional: job queues with BullMQ: queue and worker process, retries and backoff, `UnrecoverableError`, delayed and repeating jobs, idempotent handlers, safe shutdown (split from `stretch-redis-queues`)
- [x] `quiz` (99)

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
- `node-express/stretch-redis-queues` was split into three lessons: `stretch-redis-queues` (32, Redis basics and caching; 719 lines), `stretch-redis-counters` (33, rate limiter, sessions, running Redis for real; 512 lines) and `stretch-background-jobs` (34, BullMQ; 710 lines), because one lesson came to about 1,020 lines. All three are over 400 mostly because of `<Solution>` blocks that hold full test files (about 220, 150 and 160 lines); without the solutions the bodies are about 450, 260 and 420 lines, and 32 still has the CLI transcripts and the three code files of the cache. The route tests of lesson 32 and the subscribers tests of lesson 34 are described but not printed (they are in the sandbox project). The quiz stays at 99; nothing else referred to the old slug. Tell me if you would rather have one longer lesson per topic, fewer printed tests, or only the caching lesson. Things to know: (1) Redis was missing on this machine, so I ran `brew install redis` (8.10.2, not started as a service) and ran everything against a throwaway server on port 6390; Docker is not installed, so the `docker run` line in lesson 32 is untried. (2) BullMQ 6.4 and ioredis 6.0 are the current majors; BullMQ 6 lists `ioredis`, `redis` and `pg` as optional peer dependencies, and it worked with ioredis 6.0. Its docs say it also has adapters for node-redis, Bun's client and Valkey Glide; I used only ioredis. (3) I ran everything on Redis only, not on Valkey. (4) The sessions lesson keeps only `userId` in the session on purpose, so a demoted admin loses the power at once (the earlier auth lessons read the role from the store each time).
- `node-express/project-auth-service` was split into three lessons: `project-auth-service-1` (29, setup, config, schemas, users and sign-up; 395 lines), `project-auth-service-2` (30, sessions, login, `/me`, logout, roles and the admin API, change password, log out everywhere; 577 lines) and `project-auth-service-3` (31, the 34 tests, break-on-purpose, stretch goals; 557 lines), because one lesson came to about 1,500 lines (a first try at two parts gave 639 and 858). Parts 2 and 3 are over 400 because the solutions are full files. `stretch-redis-queues` is now 32; the quiz stays at 99. I fixed the references to `project-auth-service` in `authentication`, `testing-apis`, `project-notes-api-1` and `-2`. The scope is the one in the item (sign up, log in, me, log out, roles, tests) plus change-password, log out everywhere and the admin routes; rate limits and the `Origin` check from `security` are stretch goals, not part of the suite. A wrong current password in `change-password` answers 403 `WRONG_PASSWORD`, not 401, so a front end does not mistake it for a lost session; tell me if you would rather have 401 or 400. Tell me if you would rather have fewer, longer lessons.
- `node-express/project-notes-api` was split into `project-notes-api-1` (27, setup, errors, schemas, store, create/read/list; 588 lines) and `project-notes-api-2` (28, PATCH and DELETE, the test suite, break-on-purpose; 566 lines) because the code and the tests alone came to about 630 lines and one lesson would have been over 1,000. Both parts are over 400 because the solutions are full files. `project-auth-service` is now 29 and `stretch-redis-queues` 30; the quiz stays at 99. Nothing else referred to the old slug. Tell me if you would rather have one longer lesson or fewer tests. The API uses port 4000 by default because port 3000 is where this site's dev server runs. Ids are UUIDs (`crypto.randomUUID()`), unlike the numeric ids of the todo API, so that the 400-versus-404 rule for ids shows up with a real format check.
- `node-express/testing-apis` was split into `testing-apis` (25, Vitest and Supertest, resets between tests, logging in, break-on-purpose and coverage; 440 lines including about 31 lines of frontmatter) and `testing-time-and-databases` (26, fake clock, the rate-limit test, test database strategy; about 296 lines) because one lesson came to 663 lines. Every later `node-express` lesson moved up by one again (`project-notes-api` is now 27, and so on up to `stretch-redis-queues` 29); the quiz stays at 99. `testing-apis` is over 400 because it holds full test files; tell me if you would rather have fewer of them in the text. The API code changed in three small ways for tests (a `reset` function in `todos.ts`, `users.ts` and `sessions.ts`, and a `RATE_LIMIT` switch in `config.ts` and `rateLimit.ts`); the lessons say so. The test-database lesson runs the strategies only on `node:sqlite` and on a URL guard, not on PostgreSQL, because the databases module comes later; check that the PostgreSQL advice (truncate before each test, one database per worker) still fits when `prisma` is written.
- `node-express/websockets` was split into `websockets` (23, the protocol, raw `ws`, Socket.IO basics, the authenticated server and the `Origin` check; about 290 lines) and `realtime-chat` (24, rooms, events, acknowledgements, REST pushes, the React hook, scaling; about 300 lines) because one lesson came to 534 lines. Every later `node-express` lesson moved up by one again (`testing-apis` is now 25, and so on up to `stretch-redis-queues` 28); the quiz stays at 99. The socket.io docs site (socket.io) could not be reached from this machine (connection refused, also from the fetch tool), so the docs links point to the GitHub repositories and the lessons rely on what was run; if you can open https://socket.io/docs/v4/, tell me and I will add the docs links. Tell me if you would rather have one longer lesson.
- `node-express/uploads-config-logging` was split into `structured-logging` (21, pino, pino-http, request ids, redaction, log config; 295 lines) and `file-uploads` (22, multer, limits, checking the real file type, serving files back, upload config; 347 lines) because the two together came to 555 lines. Logging comes first because the upload code uses `req.log`. The "config from env" part of the original item is spread over the two (the `LOG_*` and `UPLOAD_*` keys); the main config lesson was already `schemas-and-config`. Every later `node-express` lesson moved up by one again (`websockets` is now 23, and so on up to `stretch-redis-queues` 27); the quiz stays at 99. I fixed four cross-references in older lessons that named `uploads-config-logging` (`streams`, `express-error-handling`, `express-middleware`, `security`). Tell me if you would rather have one longer lesson or different slugs.
- `node-express/security` is 446 lines including about 39 lines of frontmatter (the body is about 407), because it holds the full code of the CORS, origin-check, rate-limit and `safeJoin` files. It covers CORS, CSRF (an `Origin` check), Helmet, rate limiting, path traversal and the OWASP API Top 10 as a checklist. I kept it in one lesson rather than splitting it as with the other long ones; tell me if you would rather have it in two (CORS/CSRF/headers, then rate limits/the checklist).- `node-express/authorization-oauth` was split into `authorization-oauth` (18, roles and ownership; 387 lines) and `oauth-github` (19, the OAuth flow and "Sign in with GitHub"; 411 lines) because one lesson would have been about 800 lines. The first part keeps the original slug although it now covers authorization only; the OAuth half is `oauth-github`. Every later `node-express` lesson moved up by one again (`security` is now 20, and so on up to `stretch-redis-queues` 26); the quiz stays at 99. I fixed two cross-references in older lessons (`sessions-and-jwt` now points to `oauth-github`, `schemas-and-config` says `404` or `403` for ownership). Tell me if you would rather have one longer lesson, or different slugs.
- `node-express/oauth-github` was **not** tried against the real GitHub, because that needs an OAuth app registered in your GitHub account (I cannot do that for you). The whole flow, including state, PKCE and the failure cases, ran against a local stand-in (`../fs-sandbox/authorization-oauth/ex/fake-github.ts`) that follows GitHub's documented endpoints. GitHub's docs do not state the HTTP status of a failed token request, so the lesson says to read the body. When you register the app, tell me if anything differs.
- `node-express/authentication` was split into `authentication` (16, argon2, sign-up, the password check; about 420 lines) and `sessions-and-jwt` (17, cookie sessions, `requireAuth`, logout, JWT compared; about 450 lines) because one lesson came to about 870 lines. Both are over 400 including the frontmatter (about 30 lines), because they hold the full code of the files. Every later `node-express` lesson moved up by one again (`authorization-oauth` is now 18, and so on up to `stretch-redis-queues` 25); the quiz stays at 99. Tell me if you would rather have one longer lesson.
- `node-express/validation` was split into `validation` (14, Zod, the `parse` helper, params and query; 401 lines) and `schemas-and-config` (15, sharing schemas, OpenAPI from Zod, checking `process.env`, limits of validation; 228 lines) because one lesson came to 571 lines. Every later `node-express` lesson moved up by one again (`authentication` is now 16, and so on up to `stretch-redis-queues` 24); the quiz stays at 99. Tell me if you would rather have one longer lesson.
- `react/forms` says a `refine` on an object runs only when every field passed. In Zod 4.6 it is skipped only when a field has a wrong *type* (an aborting issue); after failed checks such as `min` or a date format it still runs (checked in `../fs-sandbox/validation/`). Not changed, since existing lessons are only edited for bugs; say if you want it fixed.
- `node-express/rest-api-design` was split into four lessons: `rest-api-design` (10, the design rules, 282 lines), `rest-api-build` (11, the CRUD routes with curl, 385 lines), `pagination-and-versioning` (12, 420 lines) and `openapi-and-bruno` (13, 380 lines), because one lesson came to about 1,230 lines and a two-way split would still have been about 600 each. Lessons 12 and 13 are slightly over 400 including the frontmatter (about 35 lines). Every later `node-express` lesson moved up by three (`validation` is now 14, and so on up to `stretch-redis-queues` 23); the quiz stays at 99. Tell me if you would rather have fewer, longer lessons.
- `node-express/express-basics` was split into `express-basics` (7) and `express-middleware` (8) because one lesson came to 584 lines. Parts are 336 and 347 lines. Every later `node-express` lesson moved up by one again (`express-error-handling` is now 9, and so on up to `stretch-redis-queues` 20); the quiz stays at 99. Tell me if you would rather have one longer lesson.
- `node-express/node-typescript` was split into `node-typescript` (5) and `node-dev-workflow` (6) because one lesson came to 618 lines. Parts are 391 and 279 lines. Every later `node-express` lesson moved up by one again (`express-basics` is now 7, and so on up to `stretch-redis-queues` 19); the quiz stays at 99. Tell me if you would rather have one longer lesson.
- `node-express/fs-and-streams` was split into `files-and-paths` (3) and `streams` (4) because one lesson came to 505 lines. Parts are 262 and 328 lines. Every later `node-express` lesson moved up by one again (`node-typescript` is now 5, `express-basics` 6, and so on up to `stretch-redis-queues` 18); the quiz stays at 99. Tell me if you would rather have one longer lesson.
- `node-express/node-runtime` was split into `node-runtime` (1) and `node-event-loop` (2) because one lesson came to 560 lines. Parts are 358 and 265 lines. Every later `node-express` lesson moved up by one (`fs-and-streams` is now 3, `express-basics` 5, and so on up to `stretch-redis-queues` 17); the quiz stays at 99. Tell me if you would rather have one longer lesson.
- `react/project-expense-tracker` was split into three lessons (`-1`, `-2`, `-3`, orders 24–26) because one lesson would have been about 950 lines (roughly 750 of them code and tests). Parts are 461, 554 and 526 lines, all over 400 because the solutions are full code and test files. Part 2 is the longest (554); the form, the pages and the flow tests are all full solution code there. Tell me if you would rather have four shorter parts, or fewer tests. The quiz stays at order 99.
- Lesson length: `CLAUDE.md` says 250–400 lines, but project lessons must hold full solution code in `<Solution>` blocks. `typescript-basics/project-github-search` is ~500 lines (about 330 of them code). Keep project lessons longer than 400, or split each into two parts like the capstones? Left as one lesson for now.
- `react/project-weather` was split into three lessons (`project-weather-1`, `-2`, `-3`, orders 21–23) because one lesson would have been about 1,180 lines (two parts still came to about 800 of code and tests). Parts are 391, 342 and 446 lines; Part 3 is over 400 because the MSW handlers and the test files are full solution code. `project-expense-tracker` moved from order 22 to 24. Tell me if you would rather have fewer, longer lessons.
- Project lessons: `react/project-todo` would have been ~710 lines (about 560 of them solution code), so it was split into `project-todo-1` and `project-todo-2` (the capstones already come in parts). `typescript-basics/project-github-search` is still one lesson of ~500 lines; the other two React projects (weather, expense tracker) will be split the same way if they get long. Tell me if you would rather keep projects whole.
- `browser-javascript/browser-storage` is ~410 lines including frontmatter (the body is under 400); it was trimmed once to fit.

## Needs videos
_(Lessons published with `videos: []` because no verified video was found.)_
- `node-express/stretch-redis-counters` — no vetted video found for Redis rate limiting or session stores (web search returns no YouTube results, so I used the YouTube results page and oEmbed); the lesson reuses the one general video of lesson 32 (Web Dev Simplified, Redis Crash Course, 2021). `stretch-background-jobs` has one verified BullMQ video (Codeminer42, streamed about a year ago, so it probably predates BullMQ 6; I confirmed title, channel and length, not the content); lesson 32 has two (Fireship, Web Dev Simplified).
- `node-express/project-auth-service-1` and `-3` — no vetted video found for building an auth service with argon2 and cookie sessions in Express 5, or for testing one. `project-auth-service-2` reuses the one verified video of `sessions-and-jwt` (Fireship, 2:18).
- `node-express/project-notes-api-1` and `-2` — no vetted video found for building a notes or CRUD API with Express 5, Zod 4 and Vitest. Web searches found only written guides, and TomDoesTech's REST API tutorial (Express with Zod and MongoDB), which I could not verify (length, date and versions unconfirmed) and which uses MongoDB and an older Zod. Lessons 7, 8, 9 and 25 have the verified Express and testing videos.
- `node-express/testing-time-and-databases` — no vetted video found for faking the clock, testing rate limits or test database strategies in Node (web searches returned only written guides). `testing-apis` has two verified videos, but they are older than the lesson's versions: the Coding Owls one (February 2024) uses Jest, and the Mehul Mohan one (September 2022) is a general Vitest course; I could not watch them, only confirm title, channel, length and date.
- `node-express/rest-api-build` — no vetted video found for building a CRUD API with Express 5 and TypeScript (the YouTube search kept returning an empty result list, so no ID could be confirmed); lesson 7 and 8 videos cover Express itself, and `rest-api-design` has the two REST design videos.
- `react/project-expense-tracker-1`, `-2` and `-3` — web searches found no YouTube video for an expense tracker with React Hook Form, Zod and Zustand, and none for `useSearchParams` filters in React Router 7/8, so no ID could be confirmed. Lessons 11, 14 and 16 have the verified videos for those tools.
- `react/project-todo-1` — no vetted video found for a todo app built around `useReducer` and TypeScript; lesson 8's `useReducer` videos cover the reducer idea.
- `typescript-basics/project-github-search` — no vetted video found for a vanilla TypeScript GitHub search project; the lesson relies on the Fetch API videos in `browser-javascript/fetch-api`.

- `react/project-weather-2` and `react/project-weather-3` — no vetted video found for the weather app flow or for testing it with MSW; lesson 18's testing videos cover the tools. Part 1 has one verified video (Dave Gray's `useDebounce` tutorial).

- `node-express/schemas-and-config` — no vetted video found for sharing Zod schemas, generating JSON Schema or validating `process.env`; `validation` has the one verified Zod video (Web Dev Simplified, December 2022, before Zod 4, so some details differ from the lessons; the lesson says so).
- `node-express/validation` — only one video; no vetted Express + Zod video was found (searches returned only written guides).

- `node-express/authentication` — no vetted video found for password hashing with argon2 or bcrypt in Node (web searches returned only written guides; the one hashing video found was about SHA and file hashes, not passwords). `sessions-and-jwt` has one verified video (Fireship, 2:18).


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
- `../fs-sandbox/fs-and-streams/` holds the code for `files-and-paths` and `streams` (plain scripts, no dependencies; Node 24.21). `make-big.mjs` creates the 220 MB `big.log` (3 million lines) the stream examples use; it is not committed anywhere. Measured there: `readFile` of it reaches about 752 MB resident memory, a stream about 70 MB; the `pipeline` gzip makes it 766 KB; the HTTP server streaming it stayed near 115 MB. Facts worth knowing: `readdir` with `recursive: true` returns relative names and its `withFileTypes` entries have `parentPath` (Node 20.12+); a failed `pipeline` can still leave an empty destination file behind; `for await` over a `readline` interface closes the file on `break`.
- `../fs-sandbox/node-typescript/` holds the code for `node-typescript` and `node-dev-workflow` (Node 24.21, TypeScript 7.0.2, `@types/node` 24, tsx 4.23; one shared `node_modules`, the `proj/` folder is the server project). Facts worth knowing: Node 24 strips types with no flag and no warning; `--experimental-transform-types` runs enums but prints an experimental warning; `tsc --init` in TypeScript 7 writes `types: []`, so `process` is an error until `"types": ["node"]`; `--watch` also restarts when the `--env-file` file changes; with a syntax error `--watch` prints "Waiting for file changes" and keeps going; tsx.is was unreachable from here, so the tsx docs link points to its GitHub repo.
- `../fs-sandbox/express-basics/` holds the code for `express-basics` and `express-middleware` (Express 5.3.0, `@types/express` 5.0.6, Node 24.21, TypeScript 7.0.2; `src/` is the finished todo API, `ex/` the experiments and exercise solutions; the API runs on port 4200 via `.env`). Facts worth knowing: `req.body` is `undefined` without `express.json()` or with another content type; `req.query` uses the simple parser (`?x[y]=1` stays the key `x[y]`, repeated keys give arrays); `app.get("/*")` throws `Missing parameter name` at startup in Express 5; `/*splat` puts an array in `req.params.splat`; a second `res.send` throws `Cannot set headers after they are sent to the client`; a malformed JSON body gets the default HTML error page with status 400 (the `express-error-handling` lesson fixes that); a throw in an `async` handler becomes a 500 by itself in Express 5. The Traversy video is from May 2024, so it probably uses Express 4 (not checked).
- `../fs-sandbox/express-error-handling/` holds the code for `express-error-handling` (Express 5.3.0, Node 24.21, TypeScript 7.0.2; `node_modules` is a symlink to `../express-basics/node_modules`; `src/` is the todo API with `HttpError`, the error handler and the JSON 404, `ex/` the experiments and exercise solutions). Facts worth knowing: the default handler answers HTML with a stack trace unless `NODE_ENV=production`; a handler with three parameters, or one registered above the routes, is silently skipped; a rejected promise in an `async` handler reaches the error handler by itself in Express 5; a `throw` inside a `setTimeout` or a `readFile` callback kills the process; errors from `express.json()` carry a `type` (`entity.parse.failed`, `entity.too.large` for bodies over 100 kB) that the handler maps to 400 and 413; after `res.json()` an error thrown later arrives with `res.headersSent` true. The Coding in Flow video is only 40 seconds long and the procademy one (2023) predates Express 5, so the lesson says so.
- `../fs-sandbox/rest-api-design/` holds the code for the four REST lessons (Express 5.3.0, Node 24.21, TypeScript 7.0.2; `node_modules` is a symlink to `../express-basics/node_modules`). `stage1/` is the code of `rest-api-build` (three todos, `/todos`), `src/` the finished API of `pagination-and-versioning` (25 todos, `/v1`, `/openapi.yaml`), `ex/` the experiments, `openapi.yaml` the full spec, and `bruno/` the Bruno collection in OpenCollection YAML. Facts worth knowing: the Bruno CLI (`@usebruno/cli` 4.2.1, installed in the scratchpad, binary `bru`) runs the collection from inside `bruno/` with `bru run --env local` (6 requests, 12 assertions, 1 test pass); Bruno 4 saves new collections as `opencollection.yml` plus `.yml` request files and `environments/*.yml`, while old `.bru` collections still work; `@redocly/cli` 2.66 lints `openapi.yaml` as valid with two style warnings (license, localhost URL) and does not flag a path parameter without `required: true`; `res.location(`${req.baseUrl}/${id}`)` sends `/v1/todos/26` unchanged; with a middleware before the handler, `req.params.id` needs `router.put<{ id: string }>(...)` to stay typed `string`; `.all()` routes added after the real ones give a 405 with `Allow` (and need an `OPTIONS` branch); the unversioned `/todos` URL gives the JSON 404 once the router is mounted at `/v1`.
- `../fs-sandbox/validation/` holds the code for `validation` and `schemas-and-config` (Zod 4.6.7, Express 5.3.0, Node 24.21; own `node_modules`; `src/` is the todo API with `src/schemas/`, `src/validate.ts` and `src/config.ts`, `ex/` the experiments and exercise solutions, `bruno/` and `openapi.yaml` updated for `details.issues`). Facts worth knowing: the default `z.object` drops unknown keys; `z.coerce.boolean()` turns `"false"` and `"no"` into `true`; `z.coerce.number()` turns `""` and `null` into `0`; `z.stringbool()` accepts `yes`, `1` and `on` unless `truthy`/`falsy` are given; Express 5 `req.query` is a getter, so assigning to it throws `TypeError`; `z.toJSONSchema(schema, { io: "input" })` keeps defaulted fields optional, while the default `io: "output"` marks them required; `refine` is left out of JSON Schema; the Bruno CLI (4.2.1) passes all 6 requests and 12 assertions, and `@redocly/cli` 2.66 lints the updated `openapi.yaml` as valid with the same two warnings.
- `../fs-sandbox/authentication/` holds the code for `authentication` and `sessions-and-jwt` (argon2 0.45.1, cookie-parser 1.4.7, Express 5.3.0, Zod 4.6.7, Node 24.21; own `node_modules`; `stage1/` is the finished code of `authentication` (run with `node stage1/server.ts`), `src/` the finished code of `sessions-and-jwt`, `ex/` the experiments and exercise solutions, `ex4-src/` a copy of `src/` with the change-password exercise added). The lesson code was embedded from these files by a script, so it is exactly what ran. Facts worth knowing: `argon2.hash` defaults to argon2id with `m=65536,p=4,t=3` and prints `p` before `t` in the string; hashing took about 20 ms (19 MiB, t=2, p=1), 37 ms (default) and 161 ms (256 MiB) on this laptop, against 50 ms for 100,000 SHA-256 hashes; npm 11.19 lists argon2's install script as not yet approved (`npm install-scripts`), but the package worked without approval; Node 24.21 has `crypto.argon2`; the `argon2` types export `HashOptions` (not `Options`); with a dummy hash for unknown emails, login took 35–38 ms for an unknown email and 36–41 ms for a real one; `res.clearCookie` needs the same `path` and flags as `res.cookie`; a replayed session cookie gets `401` after logout; a type-only `src/express.d.ts` with `declare global { namespace Express { ... } }` compiles under `erasableSyntaxOnly`; `mock.timers.enable({ apis: ["Date"] })` from `node:test` fakes the clock for the sliding-expiry test.
- `../fs-sandbox/authorization-oauth/` holds the code for `authorization-oauth` and `oauth-github` (same dependencies as `../fs-sandbox/authentication/`, whose `node_modules` it links to; `.env` points the GitHub URLs at the stand-in). `stage1/` is the finished code of `authorization-oauth` (run with `node --env-file=.env stage1/server.ts`), `src/` the finished code of `oauth-github`, `ex-moderator-src/` and `ex-next-src/` are copies of `src/` with the two exercise solutions applied, `ex/` holds `fake-github.ts` (run it first, port 4300), `pkce.ts` and `safe-next.ts`. The lesson code was embedded from these files by a script. Facts worth knowing: the seed makes admin (id 1), Ada (2), Bob (3) and 24 todos; a promoted user gets the new role on the next request with the same cookie, because `requireAuth` reads the role from the store each time; `404` for another user's todo is identical to `404` for a missing one; Zod drops a `role` sent at sign-up; the PKCE challenge of the RFC 7636 example verifier is `E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM`; `SameSite=Lax` cookies reach the OAuth callback (a top-level GET from another site); `new URL("/\\evil.com", base)` resolves to another origin, which the `safeNext` check catches; `res.clearCookie` with the same options removes the flow cookies; a GitHub-only user (`passwordHash: null`) fails password login through the dummy hash. GitHub facts from its docs: the code expires after 10 minutes, PKCE supports only `S256`, `state` and `redirect_uri` are strongly recommended, callback URLs must match exactly, new OAuth apps expire user tokens by default.
- `../fs-sandbox/security/` holds the code for `security` (cors 2.8.6, helmet 8.3.0, express-rate-limit 8.7.1, Express 5.3.0, Zod 4.6.7, Node 24.21; own `node_modules`; `src/` is the `oauth-github` API plus `middleware/cors.ts`, `requireTrustedOrigin.ts`, `rateLimit.ts` and `safePath.ts`, `ex/` holds `safe-join.ts`, `cors-mistakes.ts`, `cors-regex.ts`, `forgot.ts` and `trust-true.ts`). The lesson code was embedded from these files by a script. CORS and CSRF were also tried in the browser pane from two static pages (`localhost:5173` on the allowlist, `:5174` not). Facts worth knowing: `cors({ origin: [...] })` sends no `Access-Control-Allow-Origin` for an unlisted origin but still answers the preflight with `204`; Helmet's `Cross-Origin-Resource-Policy: same-origin` does not block CORS `fetch`; a cross-origin form `POST` from the unlisted page reached the server (and got `403` from the origin check); a `fetch` with `mode: "no-cors"` and credentials threw "Failed to fetch" in the page even though the server saw it; with three stacked limiters the `RateLimit` header is repeated once per limiter and `Retry-After` is set once; `skipSuccessfulRequests` counts a `400` as a failure; with `TRUST_PROXY=1` and no real proxy, eight failed logins with different `X-Forwarded-For` values were never limited, while `TRUST_PROXY=0` limited the sixth; `trust proxy` set to `true` makes the package log `ERR_ERL_PERMISSIVE_TRUST_PROXY` (a printed ValidationError, not a crash); `localhost:5173` and `localhost:4200` are the same site, so `SameSite=Lax` cookies travel between them.
- `../fs-sandbox/uploads-config-logging/` holds the code for `structured-logging` and `file-uploads` (multer 2.5.0, pino 10.4.0, pino-http 11.0.0, pino-pretty 13.2.0, Express 5.3.0, Node 24.21; own `node_modules`; `src/` is the `security` API plus `logger.ts`, `middleware/httpLogger.ts`, `middleware/upload.ts`, `imageType.ts`, `attachments.ts` and `routes/attachments.ts`; `ex/` holds the logging and exercise experiments, `fixtures/` a 1x1 PNG, a fake PNG, a 3 MB file and a PDF header). The lesson code was embedded from these files by a script. Facts worth knowing: when `destination` is a string multer creates the folder itself; multer strips folders from `originalname` (`../../evil.html` becomes `evil.html`); a file over `fileSize` is deleted by multer and answers `LIMIT_FILE_SIZE`; `res.attachment(name)` sets `Content-Type` from the name, so `res.type()` has to come after it; Helmet's default `Cross-Origin-Resource-Policy: same-origin` blocks an `<img>` from `localhost:5173` for an API on `:4200`, and `same-site` lets it load (tried in the browser pane, cookie included); a `FormData` `fetch` from the allowed origin works; pino-http's default serializers log every header, `customProps` runs once at the start (so `req.log` lines get the value from then) and again when the response finishes, and a `5xx` makes pino-http add its own `err` to the completion line besides the one from the error handler; pino redaction paths are exact (`passwd` stays visible); `LOG_LEVEL` from the environment hides lines below it; `sendFile` refuses a path that contains `..` unless a `root` is given.
- `../fs-sandbox/websockets/` holds the code for `websockets` and `realtime-chat` (socket.io and socket.io-client 4.8.4, ws 8.22, Express 5.3.0, Node 24.21; own `node_modules`; `src/` is the `file-uploads` API plus `src/realtime/` (`events.ts`, `io.ts`, `socketAuth.ts`, `chat.ts`), `ex/` the experiments and exercise solutions, `client/` a Vite + React 19 app with `socket.ts`, `useChatRoom.ts` and a small `App.tsx` (own `node_modules`, run with `npx vite --port 5173`)). The lesson code was embedded from these files by a script. Facts worth knowing: the Socket.IO client starts with long polling and upgrades to WebSocket within a second; CORS covers only the polling requests, so `allowRequest` must check `Origin`; `io.engine.use(cookieParser())` makes `req.cookies` available in the connection middleware; an event handler that calls a missing acknowledgement throws `ack is not a function` and ends the process; `disconnecting` still has `socket.rooms`, `disconnect` does not; after `socket.io.engine.close()` the client reconnects with a new socket id and is in no rooms until it joins again; `socket.timeout(ms).emitWithAck` rejects with `operation has timed out`; `localhost:5173` and `localhost:5174` share cookies; the curl handshake gives `101` and the RFC 6455 example accept key `s3pPLMBiTxaQ9kYGzzhZRbK+xOo=` for the example `Sec-WebSocket-Key`; Node 24 has a global `WebSocket` client.
- `../fs-sandbox/testing-apis/` holds the code for `testing-apis` and `testing-time-and-databases` (Vitest 5.0.5, Supertest 7.3.1, `@vitest/coverage-v8` 5.0.5, Express 5.3.0, Node 24.21; own `node_modules`; `src/` is the `realtime-chat` API plus `resetTodos`, `resetUsers`, `resetSessions` and the `RATE_LIMIT` switch, `test/` holds the suite (7 files, 33 tests, about 2 seconds), `ex/` the database-guard and rollback demos and `ex/exercises/` the exercise files, run with `npx vitest run --config ex/exercises.config.ts`). The lesson code was embedded from these files by a script, then formatted with Prettier. Facts worth knowing: a `request(app)` call without `await` passes the test whatever the route answers; with no reset between tests 10 of the 12 todo tests failed; `vi.useFakeTimers({ toFake: ["Date"] })` is enough for session expiry and leaves Supertest and argon2 working; `vi.stubEnv` after a static `import` is too late for `config.ts` (the test needs `vi.resetModules()` and `await import`); `VITEST_POOL_ID` was `1` and `2` for two files run together; `console.log` output from tests did not show in this terminal's reporter, so write to a file when checking worker ids; `npm pkg delete` on a dotted name like `socket.io-client` made a stray empty `socket` key in `package.json`; the first test run caught my wrong guess of an error code (`BAD_REQUEST`, not `VALIDATION_ERROR`). Mutation checks: making `canManageTodo` return `true` fails exactly one test, and dropping `exceptId` from the PUT conflict check fails exactly one.
- `../fs-sandbox/project-notes-api/` holds the code for `project-notes-api-1` and `-2` (Express 5.3.0, Zod 4.6.7, Vitest 5.0.5, Supertest 7.3.1, TypeScript 7.0.2, Node 24.21; `node_modules` is a symlink to `../testing-apis/node_modules`). `src/` is the finished API, `stage0/` and `stage1/` the code after Stages 1 and 3 (each typechecks and runs), `test/` the suite (38 tests, three files, about 0.3 seconds). The lesson code was embedded from these files by a script, so it is exactly what ran, and the project also typechecks and passes all 38 tests in a fresh folder installed from the lesson's commands (with `@types/node@24`; the unpinned install gave `@types/node` 26, which also compiled). Facts worth knowing: port 3000 was taken by the site's own dev server, so my first curl session talked to Next.js (the API defaults to 4000); `z.object` drops unknown keys, so a client `id` never reaches `{ id: randomUUID(), ...input }`, and `z.looseObject` makes the client's `id` win; `z.stringbool({ truthy, falsy, error })` takes a custom message; a text body with `express.json()` leaves `req.body` undefined, so the schema message `Send a JSON object` is what the client sees; Supertest worked with `vi.useFakeTimers({ toFake: ["Date"] })`. Mutation checks (11 changes): all were caught except removing the lowercase of the search text, which stayed green until the test searched for `MILK`; removing the pinned-first sort part was caught by one test only, since the pinned note was also the newest.
- `../fs-sandbox/project-auth-service/` holds the code for the three `project-auth-service` lessons (Express 5.3.0, Zod 4.6.7, argon2 0.45.1, cookie-parser 1.4.7, Vitest 5.0.5, Supertest 7.3.1, TypeScript 7.0.2, `@types/node` 24, Node 24.21; its own `node_modules`, installed with the lesson's commands). `src/` is the finished service, `stage0/`, `stage2/` and `stage1/` the code after Stage 1, after Stage 2 and after Stage 3 (sessions and login, before roles and passwords; each typechecks and runs), `test/` the suite (34 tests, four files, about 2 seconds, most of it argon2). The lesson code was embedded from these files by a script, so it is exactly what ran. Facts worth knowing: `npm install argon2` prints that its install scripts were not approved (`npm install-scripts approve`), but the package loaded and hashed without approval; a hash takes about 35 ms; the unknown-email path with the dummy hash took 33 ms against 35 ms for a wrong password; Zod drops a `role` sent at sign-up; a Supertest agent's cookie jar honours `Max-Age`, so under `vi.useFakeTimers({ toFake: ["Date"] })` it drops the expired cookie by itself and an expiry test with an agent stayed green with the server's expiry check removed (the lesson sends the `Cookie` header by hand); `--env-file-if-exists` exists in Node 24; the admin seeded from `ADMIN_EMAIL=Admin@Example.com` is stored lowercase. Mutation checks (14 changes): all were caught by at least one test, the expiry one only after the test was changed to send the cookie by hand. Not tested on purpose: the dummy hash timing and the `Secure` flag in production; the lesson says so.
- `../fs-sandbox/stretch-redis-queues/` holds the code for `stretch-redis-queues`, `stretch-redis-counters` and `stretch-background-jobs` (Redis 8.10.2 from Homebrew, ioredis 6.0.0, BullMQ 6.4.2, Express 5.3.0, Zod 4.6.7, Vitest 5.0.5, Supertest 7.3.1, Node 24.21; own `node_modules`). `stage1/` is the finished code of lesson 32 (13 tests), `stage2/` of lesson 33 (24 tests), `src/` and `test/` of lesson 34 (34 tests, plus the worker: `npm run worker`), `ex/` the experiments and `ex/exercises/` the exercise solutions. The lesson code was embedded from these files by a script (26 files, checked afterwards to be verbatim in the lessons). Run the tests with `TEST_REDIS_URL=redis://localhost:6379 npx vitest run` inside each folder; `test/setup.ts` refuses a URL that names a database and uses databases 10 to 15, one per worker. I ran a throwaway server with `redis-server --port 6390 --save "" --daemonize yes`. Facts worth knowing: a BullMQ custom `jobId` cannot contain `:` (`Custom Id cannot contain :`); `ioredis` without an `error` listener prints `[ioredis] Unhandled error event` and the process keeps running; `SET` on an existing key removes its TTL; `EXPIRE ... NX` needs Redis 7.0 and `GETEX` 6.2; the rate-limit counter keeps counting blocked requests (it read 6 after six PATCHes); `redis.keys()` is fine in a tiny test database and wrong in production; `worker.close()` waited 1.8 seconds for a 3-second job after `SIGTERM`; a worker killed with `kill -9` left its job stalled and a second worker ran it again from the start (`attemptsMade` stayed 1); `upsertJobScheduler` twice with one id gave one scheduler with the second call's data; the cron `0 8 * * *` with `tz: "UTC"` stored the next run as 2026-10-26 08:00 UTC; an `UnrecoverableError` fails the job after one attempt whatever `attempts` says; `queue.obliterate({ force: true })` empties a queue between tests. Mutation checks: all of them were caught except `INCR` and `EXPIRE` without `MULTI` (cannot be tested without a crash). Several mutants survived the first suites and led to new tests (jitter, expiry, `NX`, the user's session set, the digest subject, the queue defaults). Not tested on purpose: the crash between `INCR` and `EXPIRE`, and Redis persistence.
- Folder name `fs` is a Node core module name, so the npm package is `fullstack-learn`.
