# FullStack Path: UI/UX Design Spec

> Written as the lead front-end UI/UX engineer for the site. It covers the audit of what exists today, the design direction, every token (color, type, spacing, motion), icons, micro-interactions, the GSAP plan, a page-by-page blueprint, and a phased build plan.
>
> Audited on 3 Nov 2026 against the running site (Next.js 16.4, Tailwind 4, dark and light, 375 / 800 / 1440 px wide).

---

## 0. TL;DR

**Verdict:** the site is already above average. The base is solid: tokenized colors, dark mode, focus rings, reduced-motion handling, a ⌘K palette, a floating video player and scroll-driven reveals. What holds it back from looking **professional and elegant** is not missing polish. It is **too much decoration competing with the lessons.** Gradients, glows, dot grids, floating cards, marquees and animated gradient text are everywhere, so nothing stands out, and on a lesson page the reader has to scroll past a hero and a giant video before the first sentence.

**The direction (since 5 Nov 2026):** _a well-made programming book._ Warm oat paper, warm near-black ink, Bodoni Moda titles over Atkinson Hyperlegible, square 1px rules and one ink-blue signal. Motion is state only. The locked system is in `DESIGN.md`; the values are in `src/app/tokens.css`. The table below is the original audit and is kept for its history.

### The 12 changes that matter most (ranked)

| #   | Change                                                                                                                                                                                                                       | Why                                                                                                                                           | Effort |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 1   | **Compress the lesson header and make the video compact** so the first paragraph shows on the first screen                                                                                                                   | At 1440×900 the first lesson paragraph starts at **1,254 px**, below the fold. Readers see a title card and a meme thumbnail, not the lesson. | M      |
| 2   | **Cap the prose at ~68 characters per line** (code blocks may break out wider)                                                                                                                                               | Measured **~88 characters per line** at 1440 px. Comfortable reading is 65–75.                                                                | S      |
| 3   | **Gradient budget:** gradients only on (a) the home hero word, (b) the reading-progress bar, (c) the completion moment. Lesson H1s become solid text; exercise badges, takeaways border, h3 bars and the TOC button go flat. | Gradients are on ~12 elements. They read as "AI startup template" and dilute the brand.                                                       | S      |
| 4   | **Ambient-motion budget:** delete infinite animations that carry no meaning (gradient text pan, floating code card, marquee, aurora drift on inner pages).                                                                   | Animate 1–2 key elements per view. Infinite motion near text hurts focus and battery.                                                         | S      |
| 5   | **Rethink the consent wall**: blurred lessons plus a blocking legal modal is the first thing every new visitor sees on every lesson page.                                                                                    | Highest-friction moment on the site (see §8.10; needs your call because it's partly a legal question).                                        | S–M    |
| 6   | **"Continue" everywhere**: a resume pill in the header, a resume card on home for returning learners, and "Start learning" in the nav should resume rather than always opening Web Foundations.                              | A learning site's #1 job for returning users is "take me back to where I was".                                                                | M      |
| 7   | **Sidebar 2.0**: numbered lessons, real status icons (not a 9px "✓" text glyph), mini progress bar per module, collapsible phases, 44px rows on touch.                                                                       | Wayfinding is the backbone of a course site.                                                                                                  | M      |
| 8   | **Mobile pass**: nav is missing on the home header below 640px, code inside exercises is double-padded (forces horizontal scroll at 375px), drawer has no motion or focus trap, drawer rows are ~28px tall.                  | Seen directly at 375px.                                                                                                                       | M      |
| 9   | **Code blocks**: drop the macOS traffic-light dots, add file-name tabs, line highlight, diff (`+`/`-`) and focus lines via Shiki transformers, plus a copy confirmation that's announced to screen readers.                  | Code is half the content. It deserves the most care.                                                                                          | M      |
| 10  | **Quiz redesign**: proper radio group, 1–4 keyboard keys, icon + color + text feedback, explanation reveal, score ring, "review mistakes".                                                                                   | Quiz currently looks like a different, older product.                                                                                         | M      |
| 11  | **One icon system** (Lucide via `lucide-react`, or consolidate into `course/icons.tsx`) and no text glyphs (✓ ✗) as icons.                                                                                                   | Inline SVGs are duplicated across 6+ files with different stroke widths.                                                                      | S      |
| 12  | **Route transitions with React `<ViewTransition>`** (built into Next 16, zero dependencies), plus GSAP only on the home page for the hero headline and the roadmap path.                                                     | Spatial continuity between roadmap → module → lesson makes the site feel like one product.                                                    | M      |

---

## Redesign: Specimen (5 Nov 2026)

The site was redesigned with Hallmark (theme Specimen, editorial genre). `DESIGN.md` and `src/app/tokens.css` win over anything below; sections 2 to 4, 5.2, 6.4, 7.1, 7.3, 7.4, 8.1 to 8.4, 9, 11.2, 12 and 17 have been rewritten to match.

- **Replaced:** the indigo accent and Geist (framework defaults), gradient text, the aurora and glow, the dot grid, spotlight hovers, the count-up, the floating code card with its tab bar, the GSAP headline and roadmap animations, eyebrow and tracked-capital labels, middle-dot meta strings, rounded cards and shadows.
- **Kept:** every route, link, handler, localStorage key (`fs-learn-*-v1`), `data-track` hook and view transition; all token names, so every component still works.
- **New:** `src/app/tokens.css` (every colour and face), `src/lib/loop-trap.ts` and `components/home/LoopTrap.tsx` (the hero runs the lesson's loop-trap code), `components/home/Moments.tsx` (the four parts of a lesson, as screenshots in `public/home/`), `components/home/NextLesson.tsx`, a `paper` button variant, `.display`, `.display-sm`, `.section-head`, `.seg`, `.capture`, `.ledger-*`, `.colophon-line` and `.inline-list` classes, and `html.js` (set before paint in `returningScript`).
- **Deleted:** `HeroCode`, `HeroTitle`, `SpotlightCard` and `RoadmapMotion` (unused after the redesign), and the `gsap` and `@gsap/react` packages.
- **Screenshots** in `public/home/` are taken from the real lesson pages in both modes; retake them when the lesson UI changes.

## Implementation status (4 Nov 2026)

Everything in this spec is now built. Where the build differs from the text below, this list wins:

- **Token names.** Tailwind 4 already owns `--shadow-*` and `--radius-*`, so elevation tokens are `--elev-*` and radius tokens are `--r-*`. Easing tokens live in `@theme`, so Tailwind's `ease-out` / `ease-in` / `ease-in-out` utilities use the site curves, plus a new `ease-spring`. New tokens: `--raised` (card surface), `--accent-ink` (accent text on white), `--code-bg` / `--code-bar`, and `--shiki-*` (code colours).
- **Prose measure** is `36rem`, not `68ch`. Geist's "0" is wide, so `68ch` came out at ~80 characters per line; `36rem` gives ~70.
- **Consent (§8.10): option 1.** A one-time, non-blocking banner replaced the blocking wall. The Terms and Cookie Policy text now describe the banner, the new storage keys are listed, and `LEGAL_LAST_UPDATED` moved to 4 November 2026 (so returning visitors see the notice once more).
- **Hero word:** the static brand gradient. Instrument Serif was not added, because §8.2 says to pick one treatment.
- **"What's inside" chips** use subject-colour dots, not logos: Lucide has no brand logos and adding a logo set wasn't worth another dependency.
- **Roadmap path** draws with GSAP ScrollTrigger (`scaleY` on each rail segment) instead of DrawSVG: same effect, and it stays crisp on a stretched line.
- **Hero headline reveal** is skipped if the page hydrates after 2.5 s, so nobody sees the headline jump after they've started reading.
- **Quiz `why` field** already existed as `explanation`; no frontmatter change was needed.
- **Callouts** keep three types; no separate "Mac" type was added.
- **Lesson share images** (`opengraph-image.tsx`) render on demand instead of at build time, to keep the build fast.
- **Exercise difficulty** is an optional prop: `<Exercise title="…" level="easy|medium|hard">`.
- **Code blocks** support Shiki notation comments: `// [!code highlight]`, `// [!code ++]`, `// [!code --]`, `// [!code focus]`, `// [!code error]`. A first-line `// file.ts` comment becomes the file name in the bar.

---

## 1. Audit: what's there today

### 1.1 What's good (keep it)

- **Token foundation**: `--background/--foreground/--muted/--border/--surface/--accent/--success/--warning` with a dark set, exposed to Tailwind via `@theme inline`. Correct approach.
- **Contrast is already healthy**: muted text `#52525b` on `#fafafa` is 7.4:1, and the dark accent `#818cf8` on `#0b0b0f` passes AA.
- **Accessibility basics**: skip link, `aria-current`, `focus-visible` outlines on most controls, `inert` behind the consent gate, a `prefers-reduced-motion` block that covers most animations, `aria-pressed` on the complete button.
- **Lesson prose craft**: numbered H2 pills (`01`, `02`…), the anchor `#` on hover, link underline growing into a highlight, a styled inline `code`, tables with rounded borders, scroll-margin under the sticky header.
- **Clever, cheap motion**: CSS-only count-up using `@property`, scroll-driven `animation-timeline: view()` reveals behind `@supports`, `interpolate-size` for `<details>`. All progressive enhancement, no JS.
- **Floating video player** (drag, resize, keyboard) is a real differentiator.
- **⌘K search palette** with recent searches, skeletons and an empty state.
- **Large-screen scaling** (root font-size steps at 1920/2560/3200) so 4K isn't a thin strip.

### 1.2 What's wrong (with evidence)

**A. Content is pushed below the fold (critical for a learning site).**
On `/learn/javascript-core/scope-hoisting-closures` at 1440×900: lesson hero is 368 px tall, then the "Watch first" video is a full-width 16:9 player (~560 px), then docs chips, then a divider. The first paragraph starts at **y = 1254 px**. On 800×600 the reader sees no lesson text at all.

**B. Line length is too long.** Prose column measured **696 px at 17 px ≈ 88 characters per line**. `--prose-measure: 44rem` is defined in `globals.css` but never applied, because `.lesson-prose` uses `max-w-none`.

**C. Decoration overload.** Simultaneously present on the home page: an animated aurora (3 blurred blobs drifting forever), a dot grid, a gradient headline panning forever, a floating code card bobbing forever, a typing caret, a pinging dot, a count-up, an infinite marquee, spotlight hover glows, a shine sweep and a scroll reveal on every block. Lesson pages add more glow, a dot grid and a **forever-animating gradient title**. Each one is well made, but together they make a noisy page with no clear focal point.

**D. Gradients bypass the tokens.** Hard-coded `from-indigo-600 via-violet-600 to-sky-600`, `#4f46e5`, `#7c3aed`, `#a855f7`, `#38bdf8`, `shadow-indigo-500/25` appear in `page.tsx`, `CompleteButton.tsx`, `StartButton.tsx`, `Logo.tsx`, and `globals.css` (`.exercise-badge`, `.takeaways-badge`, `.toc-fab`, `.read-progress`, `h3::before`, `blockquote::before`, `.takeaways-inner`). Changing the brand later means hunting through ~15 places.

**E. Consent wall.** Every lesson URL (including links someone shares with a friend) opens blurred behind a legal modal with a required checkbox. It's the first impression of the product's core page, and "Not now" sends the visitor back to home.

**F. Mobile gaps (375 px).**

- Home header shows only logo + search + theme. "Roadmap" and "Start learning" are `hidden sm:flex`, and the hamburger only exists on `/learn`. Mobile visitors on home have no navigation.
- Exercises nest padding (card → `exercise-body` 1.3rem → code block), so code lines like `console.log(typeof hoisted, typeof notHoisted)` scroll sideways.
- The topic drawer appears instantly (no slide), has no focus trap, a small text "Close" button, and lesson rows are `py-1` (~28 px), below the 44 px touch minimum.

**G. Iconography is inconsistent.** Inline SVGs are re-declared in `AppShell`, `ThemeToggle`, `page.tsx`, `StartButton`, `Search`, with `strokeWidth` 1.8 / 2 / 2.2 / 2.4. The sidebar uses a text "✓" at 9 px, and the quiz uses "✓ Correct" / "✗ Not quite" glyphs.

**H. Quiz and consent look like a different product**: plain `bg-accent` buttons, `hover:opacity-90`, no focus ring on several buttons, no motion, no icons.

**I. Complete button copy**: "Completed — click to undo" is wordy and puts the undo instruction in the label.

**J. Code-block chrome**: macOS traffic lights are a cliché, take space, and only colorize on hover. No file names, no highlighted lines, no diff view (lessons often show "change this line").

**K. LCP risk**: the home `<h1>` and lesson `<h1>` start at `opacity: 0` (`.rise` with `animation-fill-mode: both`). On a slow device the largest text is invisible until the animation runs, which can delay Largest Contentful Paint.

**L. Housekeeping**: `src/components/home/HeroCode.tsx-E` is a stray macOS `sed -i -e` backup file and should be deleted.

---

## 2. Design direction

### 2.1 Personality

> **Quiet, confident, bookish, code-first, warm, precise.** A well-made programming book that happens to run its own examples.

| We are                                           | We are not                               |
| ------------------------------------------------ | ---------------------------------------- |
| Oat paper, ink type, 1px rules                   | Glow, blur, gradients, shadows           |
| One ink-blue signal (links, focus, you are here) | Colour for decoration                    |
| Big Bodoni titles, plain reading text            | Bold display type everywhere             |
| Real lesson code and real screens                | Mockups, drawn windows, invented numbers |
| Still pages; only state moves                    | Arrivals, scroll drawing, loops          |

### 2.2 Principles (use these to settle every debate)

1. **Content first.** On a lesson page the first paragraph is visible without scrolling at 1280×800 and above.
2. **Colour = meaning.** Ink blue means "interactive or you are here". Green means "done". Ochre means "careful". Track inks mean "which subject". Nothing is coloured to look nice.
3. **Show the real thing.** The home hero runs lesson code from the MDX; the lesson parts are screenshots of the real pages.
4. **Motion is state.** An underline thickens, a cell fills, a drawer slides. Nothing arrives, bobs or draws on scroll.
5. **Same thing, same look.** One button helper, one card, one rule weight, square corners.
6. **Accessible by default.** AA contrast in both themes, keyboard everything, reduced motion respected, 44px touch targets.

### 2.3 Style references

A printed technical book's type specimen: the hairline Didone title page, ruled tables, a few inks for code. Not a SaaS landing page.

---

## 3. Color system

### 3.1 Decision

Theme **Specimen**: warm oat paper, warm near-black ink, one ink-blue signal held under about 5% of any screen. Dark mode is derived, not inverted: a warm-black ground, oat ink, the blue lifted and calmed. All values are OKLCH and live only in `src/app/tokens.css`.

### 3.2 Core tokens

| Token                                       | Light                     | Dark                        | Use                                                         |
| ------------------------------------------- | ------------------------- | --------------------------- | ----------------------------------------------------------- |
| `--background`                              | oklch(96.5% 0.016 82)     | oklch(17.5% 0.01 65)        | Page paper                                                  |
| `--surface` / `--surface-2`                 | 94% / 91%                 | 21% / 24.5%                 | Paper wells: code, callouts, the open sidebar module        |
| `--surface-hover`                           | 93.2%                     | 22.5%                       | Row and button hover                                        |
| `--raised`                                  | 98.2%                     | 20%                         | Menus, inputs, quiz options (never darker than the page)    |
| `--foreground` / `--ink-2`                  | oklch(19% 0.012 60) / 30% | oklch(93.5% 0.016 82) / 84% | Text, primary fill                                          |
| `--muted` / `--subtle`                      | 45% / 51%                 | 74% / 65%                   | Secondary text (both pass 4.5:1 on paper and wells)         |
| `--border` / `--border-strong`              | 83% / 66%                 | 31% / 44%                   | Hairlines; the strong one for table heads and the band rule |
| `--accent`                                  | oklch(45% 0.18 262)       | oklch(74% 0.12 262)         | Links, focus, current item, progress                        |
| `--success` `--warning` `--danger` `--info` | L 47 to 50                | L 72 to 80                  | Status                                                      |

### 3.3 Track colors (wayfinding)

Ten quiet subject inks (`--track-foundations` … `--track-interview`), chroma 0.02 to 0.12. Use them for 2px rules and small marks only, never as fills or text blocks.

### 3.4 Gradient budget

None. `--brand-gradient` is kept as a token name but resolves to solid ink blue, so the reading-progress bar is one colour.

### 3.5 Elevation and shadow

No shadows. Depth is a 1px rule or a paper step. `--elev-xs/sm/md` are empty; `--elev-lg` (menus, palette, floating video) is a rule plus one short cast in light and a rule alone in dark.

---

## 4. Typography

### 4.1 Fonts (decision)

| Role                                                      | Font                                         | Why                                                                        |
| --------------------------------------------------------- | -------------------------------------------- | -------------------------------------------------------------------------- |
| Titles (`h1`, `.display`, `.section-head`, large figures) | **Bodoni Moda** 400, optical size 96         | The specimen voice: all the contrast lives inside the letters. Never bold. |
| Small titles (`.display-sm`: wordmark, item titles)       | Bodoni Moda, optical size following the size | Keeps hairlines readable under 32px                                        |
| Reading, UI, labels                                       | **Atkinson Hyperlegible Next**               | Built for legibility; warm and plain under the Didone                      |
| Code, compared figures, kbd                               | **Atkinson Hyperlegible Mono**               | Clear 0/O and 1/l/I for learners                                           |

Loaded with `next/font/google` in `layout.tsx` (`--font-bodoni`, `--font-atkinson`, `--font-atkinson-mono`) and mapped in `tokens.css` to `font-display`, `font-sans` and `font-mono`. Every `h1` on the site is set in Bodoni by one unlayered rule in `globals.css`.

### 4.2 Type scale

| Token               | Size at 1440                        | Use                                     |
| ------------------- | ----------------------------------- | --------------------------------------- |
| `--text-display`    | 88px, line-height 1.02              | Home hero                               |
| `--text-section`    | about 50px                          | Home section heads (`.section-head`)    |
| `--text-title`      | 25px                                | Item titles (phase names, lesson parts) |
| `--text-lead`       | 21px                                | The one line under a head               |
| lesson `h1`         | 40px Bodoni                         | Lesson and module titles                |
| lesson `h2`         | 30px Bodoni, numbered like a book   | Lesson sections                         |
| lesson `h3`         | 19px, Atkinson 700                  | Sub-sections                            |
| body / lesson prose | 16px / 17px                         | Reading                                 |
| label (`.kicker`)   | 13px, 600, sentence case, untracked | Meta, small labels                      |
| code                | 14px (17px in the home sample)      | Code blocks                             |

### 4.3 Reading rules

- **Measure:** `.lesson-prose > :is(p, ul, ol, h2, h3, blockquote, .callout)` → `max-width: var(--prose-measure)` (38rem, about 68 characters of Atkinson at 17px). Code blocks, tables, exercises and images use a wider **breakout** column (`max-width: min(100%, 52rem)`). This editorial pattern keeps text comfortable while giving code room.
- `text-wrap: pretty` on paragraphs, `text-wrap: balance` on headings (already partly done).
- Mobile body stays 17 px (don't shrink reading text), with line-height 1.7.
- Bold in prose is 700; labels 600.
- Never italicize long passages. Never underline non-links.
- Numbers in stats, progress and timers: `tabular-nums`.

---

## 5. Space, shape and layout

### 5.1 Spacing scale (4 px base)

`2 · 4 · 6 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96` px. Tailwind's default scale already maps to this. Use only these values; no `py-[0.95rem]` one-offs (several exist in `globals.css`: `0.95rem`, `1.05rem`, `1.3rem`. Normalize them).

Vertical rhythm in lessons: paragraph gap 20 px; before H2 64 px, after 16 px; before H3 40 px, after 12 px; code/callout/exercise blocks 28 px above and below.

### 5.2 Radius scale

Square. Every `--r-*` token and every Tailwind `--radius-*` resolves to 0, so `rounded-lg` and friends draw square corners. `rounded-full` stays for true circles (progress rings). Nested radius rules no longer apply.

### 5.3 Grid and breakpoints

| Name  | Min width | Layout                                                                      |
| ----- | --------- | --------------------------------------------------------------------------- |
| base  | 0         | Single column, 16 px gutters, bottom "Up next" bar on lessons               |
| `sm`  | 640       | 24 px gutters, header nav visible                                           |
| `md`  | 768       | Two-column card grids                                                       |
| `lg`  | 1024      | Sidebar (264 px) + content                                                  |
| `xl`  | 1280      | Sidebar + content + right TOC (220 px)                                      |
| `2xl` | 1536      | Same, wider gutters; existing root-font scaling continues at 1920/2560/3200 |

Lesson page at `xl`: `264px sidebar | 1fr content (prose 68ch, breakout 52rem) | 220px TOC`, with 48 px gaps.

### 5.4 Z-index scale

`base 0 · raised 10 · sticky header 40 · floating video 45 · drawer/sheet 50 · palette/modal 60 · toast 70`. Already roughly followed. Write it down as tokens and stop using ad-hoc `z-[60]`.

---

## 6. Iconography

### 6.1 Decision

**Lucide**, via `lucide-react` (needs your OK: it's a new site dependency). The hand-drawn paths in `src/components/course/icons.tsx` are already Lucide shapes, so the look won't change. You get 1,500+ consistent icons, and Next.js tree-shakes `lucide-react` imports automatically.
Zero-dependency alternative: keep `course/icons.tsx` as the **only** icon source and move every inline `<svg>` from `AppShell`, `ThemeToggle`, `page.tsx`, `StartButton` and `Search` into it.

### 6.2 Rules

| Size  | Stroke | Where                                     |
| ----- | ------ | ----------------------------------------- |
| 14 px | 2.25   | Inside chips and small meta               |
| 16 px | 2      | Buttons, inline with UI text, sidebar     |
| 20 px | 1.75   | Header actions, card icon tiles, callouts |
| 24 px | 1.5    | Empty states, feature tiles               |

- Icons sit in a **tile** when they represent a thing (feature, module, callout): 36–40 px square, `--r-sm`, `--accent-soft` (or `--track` at 12%) background.
- Decorative icon next to text → `aria-hidden`. Icon-only button → `aria-label` plus a tooltip on hover/focus.
- Never use emoji or text glyphs (✓ ✗ → ★) as icons.
- `currentColor` only; never hard-code an icon color.

### 6.3 Icon map

| Concept               | Lucide icon                                                                    |
| --------------------- | ------------------------------------------------------------------------------ |
| Lesson                | `BookOpen`                                                                     |
| Module                | `Layers`                                                                       |
| Phase                 | `Milestone`                                                                    |
| Video                 | `PlayCircle`                                                                   |
| Reading time          | `Clock`                                                                        |
| Exercise              | `Puzzle`                                                                       |
| Solution              | `Lightbulb` → `Eye` when open                                                  |
| Quiz                  | `ListChecks`                                                                   |
| Project               | `Hammer`                                                                       |
| Stretch goal          | `Rocket`                                                                       |
| Takeaways             | `Sparkles`                                                                     |
| Note / tip / warning  | `Info` / `Lightbulb` / `TriangleAlert`                                         |
| Mac-specific tip      | `Apple`, or `Laptop` (brand icons may not be in Lucide; fall back to `Laptop`) |
| Not started           | `Circle`                                                                       |
| In progress / current | `CircleDot`                                                                    |
| Completed             | `CircleCheck` (filled tile with success color)                                 |
| Locked / soon         | `Clock3` (not `Lock`; nothing is locked)                                       |
| Correct / wrong       | `CheckCircle2` / `XCircle`                                                     |
| Copy / copied         | `Copy` → `Check`                                                               |
| External doc          | `ArrowUpRight`                                                                 |
| Search                | `Search`                                                                       |
| Theme                 | `Sun` / `Moon` / `Monitor` (3-way)                                             |
| Menu / close          | `PanelLeft` / `X`                                                              |
| Resume                | `CornerDownRight` or `ArrowRight`                                              |
| Keyboard shortcuts    | `Keyboard`                                                                     |

### 6.4 Logo

A square of ink holding three paper layers that step up to the right, cut apart by hairline gaps. The layers are the full stack (front end, back end, database), the steps are the path up through the course's three phases, and the solid square against the hairline Bodoni wordmark repeats the site's thick-and-thin contrast. One colour pair (ink and paper, swapping in dark mode), readable at 16px. Source: `LogoMark` in `src/components/Logo.tsx`; `icon.svg`, `apple-icon.png`, `favicon.ico` and the share card in `src/lib/og.tsx` match it. The wordmark is "FullStack Path" in Bodoni Moda at its small optical size.

---

## 7. Components (one source of truth each)

Build these as small components in `src/components/ui/` and replace the scattered class strings.

### 7.1 Button

`buttonClass(variant, size)` in `src/components/ui/button.ts`; square, no shadow.

| Variant     | Rest                                                           | Hover                       | Active          | Disabled                            |
| ----------- | -------------------------------------------------------------- | --------------------------- | --------------- | ----------------------------------- |
| `primary`   | ink fill, paper text, 1px ink border                           | `--ink-2` fill              | translateY(1px) | opacity 0.55, `cursor: not-allowed` |
| `secondary` | transparent, 1px ink border, ink text                          | `--surface-hover` fill      | translateY(1px) | same                                |
| `ghost`     | transparent, `--muted`                                         | `--surface-hover`, ink text | translateY(1px) | same                                |
| `success`   | 1px success border, success text                               | 10% success fill            | translateY(1px) | same                                |
| `paper`     | paper fill on the ink band                                     | `--surface`                 | translateY(1px) | same                                |
| `gradient`  | kept as a name; now ink like `primary` (the completion button) | `--ink-2`                   | translateY(1px) | same                                |

Sizes: `sm` 32px, `md` 40px, `lg` 48px; coarse pointers get 44px. Focus: 2px ink-blue outline, offset 2px, instant. One filled primary per screen.

### 7.2 Chip / badge

Height 24 px (sm) or 28 px, `--radius-full` or `--r-xs`, 13 px/500 text, 14 px icon. Variants: `neutral` (surface + border + muted), `accent` (accent-soft + accent), `track` (track @ 12% + track text), `status` (success/warning/danger soft). Never wraps: `white-space: nowrap`.

### 7.3 Card

`.card`: `--raised` paper, 1px `--border`, square, no shadow. Interactive cards change only their border to `--border-strong` on hover; nothing lifts. Prefer rules over cards: the home roadmap is a ruled ledger, exercises are ruled blocks, callouts are paper wells with one 2px rule in their tone. The whole row is the link (`after:inset-0`), with nested controls above it (`relative z-10`).

### 7.4 Progress

- **Bar:** 3px tall, square, track `--border`, fill `--accent` (in progress) or `--success` (100%). Fill animates `transform: scaleX()` over `--dur-long`.
- **Ring:** 40px (rows) / 48px (home resume) / 72px (module header), butt-capped stroke on a `--border` track, number in the centre in the mono face. Turns success colour with a check at 100%.
- Always paired with text ("3 of 8 lessons"); color alone never conveys status.

### 7.5 Tooltip

For icon-only buttons and truncated text. 120 ms delay in, 0 ms out, 6 px offset, `--foreground` bg with `--background` text, 12 px/500, `--r-xs`. Shows on hover **and** keyboard focus, and hides on Escape.

### 7.6 Toast

For "Copied", "Progress saved", "Module complete". Bottom-center on mobile, bottom-right on desktop, auto-dismiss 2.5 s, `role="status"`, slides up 8 px + fades in 200 ms, out 150 ms. Max one visible.

### 7.7 Kbd

Exists in `Search.tsx`. Promote it to `ui/Kbd.tsx` and use it in tooltips ("Search ⌘K") and the shortcuts sheet.

---

## 8. Page-by-page blueprint

### 8.1 Header (all pages)

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ [≡] ■ FullStack Path   Roadmap  Learn       ↳ Resume: Closures   [⌕ Search ⌘K] [◐] │
└──────────────────────────────────────────────────────────────────────────────┘
  └ 1px hairline always; it darkens after 4px of scroll · 2px reading progress on lessons
```

- 60px tall (`--header-h` 3.75rem), solid `--background` (no glass blur), one hairline under it.
- Search-led: the search field with its `⌘K` key is the widest control in the bar.
- Nav links are text in one weight; the current one is underlined in ink blue.
- Mobile: hamburger, drawer on `--scrim`, ink rule on its edge.
- Footer: a colophon. The wordmark and the course's line on the left; Course, Resources and Legal as run-in labels with their links set as one line of text on the right; a credit line naming the faces.

### 8.2 Home (new visitor)

1. **Hero (Settled).** Left: "The full stack, after HTML and CSS." in Bodoni at `--text-display`, one line ("A free, self-paced path from JavaScript to React, Node.js and Next.js."), the primary "Start with Web Foundations" (the first live module's name) and the text link "See the roadmap". Right, the signature: the loop-trap code from Scope, Hoisting & Closures, read from its MDX, highlighted like a lesson code block, with a `var`/`let` switch (the swapped keyword outlined in `--guide`), a Run button, the real console output and the lesson's one-line explanation. No mockup, no window chrome.
2. **How a lesson works.** A segmented switch (Read, Watch, Practise, Check) over screenshots of the real lesson pages, light and dark, each with its title and one line. Without script all four show in order.
3. **What's inside.** A ruled spec sheet: lessons, modules live, curated videos and hours of reading as Bodoni figures (all computed from `content/`), then the technologies and what comes with each lesson.
4. **The roadmap** (`#roadmap`, see 8.4).
5. **Close.** An ink band: "Ready to build real things?", its line, the next lesson's title and the start button in `paper`.

### 8.3 Home (returning learner)

The hero's left column swaps before paint (`html[data-returning]`, set by `returningScript`): "Welcome back." in Bodoni, "Next up is <lesson>, lesson N of <module>, about M minutes.", the primary "Continue where you left off", "See the roadmap", then a 48px ring and "X of Y lessons done, a of b in <module>." The code sample stays on the right. "Last visited" comes from `fs-learn-last-v1`.

### 8.4 Roadmap (home section)

A ledger. Each phase opens under a 3px double rule: its number set huge in Bodoni (ink, ink blue with "You are here" when it holds the resume lesson, green with "Phase complete" when done), its title and goal on the left four columns. Modules are hairline-ruled rows on the right eight: the title (the whole row links, with the view-transition morph), description, "N lessons, about T", a progress ring and the "Show lessons" disclosure with the checklist. Coming-soon modules close the phase as one quiet row. Nothing animates on scroll.

### 8.5 Module page (`/learn/[module]`)

Already the most balanced page. Changes:

- Header panel: remove the moving glow, add the track-colored kicker ("PHASE 2 · REACT"), a **72 px progress ring** on the right, and a primary CTA **"Start module" / "Continue: <lesson>" / "Review"**.
- Curriculum list: number each lecture (`01`…), status icon on the left (Circle / CircleDot / CircleCheck), kind badge for project / stretch / quiz, reading time and video count on the right, and the existing section outline disclosure.
- Projects get a distinct row style (`Hammer` icon tile, "Project" badge), so the rhythm "lesson, lesson, lesson, **build**" is visible.

### 8.6 Lesson page (the most important page)

**Target:** at 1280×800 the breadcrumb, title, summary, meta and the **first paragraph** are visible without scrolling.

```text
 sidebar │  PHASE 1 · JAVASCRIPT CORE  ›  Lesson 2 of 3                │ On this page
         │  Scope, Hoisting & Closures                (h1, solid)       │ • The scope chain
         │  Where variables live, how JavaScript hoists…   (lead)       │ • Hoisting
         │  7 min read · 2 videos · 5 takeaways        [✓ Mark done]    │ • Closures
         │  ─────────────────────────────────────────────────────────── │ ─────────
         │  ┌ ▶ Watch first ─────────────────────────────────────────┐ │ Videos
         │  │ [thumb 160×90] 100 Seconds of Closures · Fireship · 2:10│ │ Docs
         │  │ [thumb 160×90] Closures explained · … · 14:32           │ │
         │  └─────────────────────────────────────────────────────────┘ │
         │  First paragraph of the lesson starts here…                  │
```

1. **Header:** no card, no glow, no dot grid. Plain text on the page background. Breadcrumb kicker in `label` style with the track color dot. H1 in solid `--foreground` (drop `text-gradient`). Lead summary. Meta as **inline text separated by middots** (chips are heavier than this info deserves). A small secondary **"Mark done"** button sits top-right, so a returning reader can tick it without scrolling to the end.
2. **Videos:** compact **media list** (thumbnail 160×90 + title + channel + duration). Clicking a row expands the player inline (16:9, full prose width) with a 320 ms height transition. The existing floating mini-player activates when that player scrolls out of view. That keeps the current feature, but the page starts with text.
3. **Docs:** move into the right TOC column under "Go deeper" on `xl`. Below `xl`, they're a single row of `doc-chip`s after the videos.
4. **Prose:** 68ch measure, breakout for code/tables/exercises (§4.3). Keep the numbered H2 pills. H3 bar becomes solid `--accent` at 60% opacity.
5. **Right TOC (`xl`):** sticky, scroll-spy (exists). Add a thin vertical progress track beside the list that fills as you read, and a **"Back to top"** link at the bottom. Below `xl`: the floating "On this page" button becomes a solid `--surface` pill with border (no gradient) at bottom-right, and opens the existing bottom sheet.
6. **End of lesson sequence:** Takeaways card → **Completion card** → "Up next" card.
   - Takeaways: solid `--surface` card, 1 px `--border`, a `Sparkles` tile. No gradient border.
   - Completion card: "Finished this lesson?" + primary gradient button **"Mark as complete"**. After completing, the button becomes `success` ("✓ Completed" with an `Undo` ghost link next to it), and the **Next card gets a highlighted state** ("Up next", accent border, arrow nudging once).
   - Pager: previous (secondary) and next (emphasized). On mobile, a sticky **bottom bar** shows `← Prev · Mark done · Next →` after the takeaways scroll into view.

### 8.7 Lesson content blocks

**Code blocks**

```text
┌─ counter.js ─────────────────────── JS ── [⧉ Copy] ┐
│  1  let count = 0;                                  │
│  2  function increment() {                          │
│  3▌   count++;                     ← highlighted    │
│  4  }                                                │
└─────────────────────────────────────────────────────┘
```

- Bar: file name (from the code-fence `title="…"` meta or the first-line comment) on the left, language as a small mono label on the right, Copy button. **Remove the traffic-light dots.**
- Background `--surface` (light) / `#0D0D14` (dark); 1 px `--border`; `--r-md`; no shadow (code is content, not a floating card).
- Add `@shikijs/transformers` (needs your OK) to support `// [!code highlight]`, `// [!code ++]` / `// [!code --]` (green/red line backgrounds with a `+`/`−` gutter), `// [!code focus]` (dims other lines), and `// [!code error]`. `rehype-pretty-code` accepts a `transformers` array, so this is a small change in `src/components/mdx.tsx`.
- Line numbers only for blocks over 8 lines (via `showLineNumbers` meta).
- Copy: icon swaps `Copy → Check`, label "Copied" for 1.5 s, `aria-live="polite"` announcement, success color.
- Output blocks (` ```text title="Output" `) get a distinct style: no line numbers, `--surface-2` background, a `Terminal` icon in the bar. Lessons follow "code → what it prints", so this pairing should look intentional.
- Mobile: code blocks bleed to the screen edges (negative margin = page gutter, radius 0, side borders removed) to win ~32 px of width.
- Shiki theme: keep `github-light` / `github-dark` now. Brand phase: a custom theme derived from the tokens (keywords `--accent`, strings `--success`, functions `--info`, comments `--subtle`), so code feels native to the site.

**Callouts** (`note` / `tip` / `warning`): keep the structure. Change: solid 3 px left rule, flat 6% tone background (no 135° gradient), 20 px icon in a 32 px tile, title 15 px/600. Max 3 per lesson (already a rule).

**Exercises**

- Header: `Puzzle` icon tile in **solid accent** (not gradient), kicker "EXERCISE 2", title. Optional difficulty chip (Easy / Medium / Hard) later, via an optional `level` prop on `<Exercise>`.
- Body padding 20 px; code blocks inside use the breakout and bleed rules so they're not double-padded.
- `Solution`: keep the `<details>` (works without JS). Summary: `Lightbulb` "Show solution" → `Eye` "Hide solution". A small "Try it yourself first" hint line in `--muted` sits above the summary for the first exercise only. Smooth open is already handled with `interpolate-size`.

**Tables:** keep. Add a sticky first column on mobile for wide comparison tables, and zebra rows in `--surface` at 50%.

**Ready-to-move-on checklists** (quiz pages): style checkboxes as 20 px rounded squares with an animated check (stroke-dashoffset 200 ms), and save their state like progress (`fs-learn-checklist-v1`).

### 8.8 Quiz

```text
 Question 3 of 10                                 ● ● ◉ ○ ○ ○ ○ ○ ○ ○
 What does this log?   (code block)
 ┌──────────────────────────────────────────────┐
 │ (A)  undefined                                │   ← radio, 52px tall
 │ (B)  ReferenceError                    ✓      │   ← correct: success tint + icon + "Correct"
 │ (C)  1                                 ✗      │   ← chosen wrong: danger tint + icon
 └──────────────────────────────────────────────┘
 Why: `let` is in the temporal dead zone until…   [ Next question → ]
```

- `role="radiogroup"` with arrow-key navigation, keys **1–4** select, **Enter** goes next.
- Feedback = icon + color + word (never color alone). The correct option always gets revealed.
- Explanation slides open (200 ms). Add an optional `why` field to the quiz frontmatter (needs a `Lesson` type + `check-content.mjs` update, per CLAUDE.md).
- Result screen: score ring (accent < 80%, success ≥ 80%), "Review mistakes" (filters to wrong answers), "Retake", and "Next module →".

### 8.9 Sidebar

- Phase headers become collapsible buttons (`label` style + chevron). The current phase is open by default; collapsed state is remembered per visitor in localStorage.
- Module row: track dot (8 px), title, and a 40 px-wide mini progress bar plus "3/8" in mono. Active module: `--accent-soft` background.
- Lesson rows: `01` number in mono `--subtle`, title, status icon on the right (`Circle` / `CircleDot` current / `CircleCheck` success). Active lesson: accent text plus a 2 px accent bar on the left edge. Row height 36 px (desktop) / 44 px (drawer).
- Auto-scroll the active lesson into view on load (`scrollIntoView({ block: "nearest" })`).
- "Soon" modules: one muted line per phase ("+3 coming soon").
- Mobile drawer: slides in from the left (`translateX(-100%) → 0`, 280 ms `--ease-out`; out 200 ms), backdrop fades, focus moves to the drawer and is trapped, Escape and backdrop click close it, and focus returns to the hamburger. Close is an `X` icon button (44 px) with `aria-label`.

### 8.10 Consent gate (needs your decision)

UX recommendation, from strongest to lightest:

1. **Remove the wall.** Show policies in the footer and a one-time, non-blocking bottom banner: "By using this site you agree to the Terms and Privacy Policy. Progress is saved only in your browser. [OK]". Lessons are readable immediately.
2. **Keep consent, drop the blur:** the same modal, but on the **first visit to any page**, not on every lesson URL, with no blur and no required checkbox (the "Accept" button is the agreement).
3. Keep it as is, but restyle (focus rings, button component, motion).

This is partly a legal question (the 13+ age line and the policies' wording). **Decision (4 Nov 2026): option 1, implemented.**

### 8.11 Search palette

Already strong. Polish: group results by module with track dots, show the matched heading ("in § Hoisting"), arrow-key hint row at the bottom (`↑↓ to move · ↵ to open · esc to close`), and recent lessons (not only recent queries) when the input is empty.

### 8.12 404, legal, empty states

- 404: a friendly illustration-free page: big mono "404", "This lesson doesn't exist (yet).", search field, and "Back to roadmap". It should use the same header/footer.
- Legal pages: `prose` at 68ch, sticky mini TOC on desktop, "Last updated" chip.
- Empty states (no search results, no progress): icon tile, one sentence, one action.

---

## 9. Motion system

### 9.1 Tokens

```css
:root {
  --dur-micro: 120ms; /* press, tick, colour (alias --dur-fast) */
  --dur-short: 220ms; /* hover, tooltip, menu (alias --dur-base) */
  --dur-long: 420ms; /* drawer, accordion, progress fill (alias --dur-slower) */
}
@theme {
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in: cubic-bezier(0.7, 0, 0.84, 0);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-spring: cubic-bezier(0.16, 1, 0.3, 1); /* name kept; no overshoot */
}
```

Rules:

- Only state moves. Animate `transform` and `opacity` only; never `width`, `height`, `top` or `left` (the floating video now snaps into place instead of animating its position).
- Exits run at about 70% of the enter.
- Nothing loops. No arrivals on load, no scroll-linked reveals, no count-ups.
- `prefers-reduced-motion: reduce` ends every animation and transition at once (one rule in `globals.css`).

### 9.2 The ambient-motion audit (5 Nov 2026)

Removed: gradient text, aurora and glow, the dot grid, the floating code card and its typing caret, the marquee, ping dots, the count-up, the button shine, spotlight cards, `.rise`, `.reveal` and `reveal-sm` scroll reveals, the GSAP headline split and the scroll-drawn roadmap, the wrong-answer shake, the up-next nudge. Kept as state: drawer, sheet, palette, menu and toast transitions, the details open/close, view transitions between pages, the completion confetti (off under reduced motion).

---

## 10. Micro-interactions catalogue

| Element            | Trigger          | Response                                                                                                                                                              | Timing                      |
| ------------------ | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| Any button         | Press            | `scale(.98)`                                                                                                                                                          | `--dur-instant`             |
| Primary button     | Hover            | bg → `--accent-hover`, −1 px lift, trailing arrow +3 px                                                                                                               | `--dur-fast` / `--ease-out` |
| Link in prose      | Hover            | Underline grows into highlight (exists)                                                                                                                               | 250 ms                      |
| Card (interactive) | Hover            | Border → strong, shadow sm → md, −2 px                                                                                                                                | `--dur-base`                |
| Sidebar lesson row | Hover / active   | bg fade; active bar slides between rows (shared `view-transition-name` or a moving indicator)                                                                         | `--dur-base`                |
| Heading anchor `#` | Hover / focus    | Fades in (exists); click copies the URL with a "Link copied" toast                                                                                                    | `--dur-fast`                |
| Copy code          | Click            | Icon morph Copy → Check, label "Copied", success color, revert after 1.5 s                                                                                            | 150 ms                      |
| Solution           | Toggle           | Height + opacity (exists), chevron rotates 180°, icon Lightbulb → Eye                                                                                                 | `--dur-slow`                |
| Video row          | Click            | Thumbnail expands into the player (height transition), play button scales out                                                                                         | `--dur-slow`                |
| Floating video     | Scroll away      | Slides into the corner (exists)                                                                                                                                       | 450 ms                      |
| TOC                | Scroll           | Active item indicator glides; progress track fills                                                                                                                    | `--dur-base`                |
| Reading progress   | Scroll           | `scaleX` (exists). Remove the glow `box-shadow`.                                                                                                                      | scroll-linked               |
| Mark complete      | Click            | Button morphs to success, check draws (stroke-dashoffset), 12-piece confetti, sidebar row icon pops, "Up next" card highlights, toast "Saved · 4 of 8 in this module" | 200–700 ms, sequenced       |
| Undo complete      | Click            | Reverse morph, no confetti                                                                                                                                            | `--dur-fast`                |
| Module complete    | Last lesson done | Progress ring fills to 100% and turns green, a "Module complete" banner slides in above the pager with "Next module →"                                                | 600 ms                      |
| Quiz option        | Select           | Correct: success tint + check pop (`--ease-spring`). Wrong: danger tint + 4 px horizontal shake ×2 (skip under reduced motion)                                        | 200–300 ms                  |
| Quiz result        | Finish           | Score ring fills, number counts up                                                                                                                                    | 800 ms                      |
| Theme switch       | Click            | View-transition circular reveal from the button (`clip-path: circle()`), falls back to instant                                                                        | 400 ms                      |
| Search palette     | ⌘K               | Backdrop fade + panel pop (exists); results stagger 20 ms each (max 8)                                                                                                | 150 / 200 ms                |
| Drawer             | Open / close     | Slide + backdrop fade, focus trap                                                                                                                                     | 280 / 200 ms                |
| Toast              | Show / hide      | Up 8 px + fade / fade                                                                                                                                                 | 200 / 150 ms                |
| Page navigation    | Route change     | See §11.1                                                                                                                                                             | 200–300 ms                  |

### Keyboard shortcuts (with a `?` sheet)

| Key                    | Action                                                     |
| ---------------------- | ---------------------------------------------------------- |
| `⌘K` `/`               | Search                                                     |
| `J` / `K` or `←` / `→` | Next / previous lesson (only when focus isn't in an input) |
| `M`                    | Mark lesson complete / undo                                |
| `T`                    | Toggle "On this page"                                      |
| `?`                    | Show shortcuts                                             |

---

## 11. Animation tech: View Transitions only

### 11.1 Route transitions with React `<ViewTransition>` (no dependency)

Next 16 + React 19.3 ship `<ViewTransition>`, and route navigations are already transitions (see `node_modules/next/dist/docs/01-app/02-guides/view-transitions.md`). Browsers without support simply don't animate.

1. **Shared element:** the module card title on the roadmap and the module page H1 share `name={"module-" + slug}`, so the title morphs into place. The same goes for the lecture title in the curriculum and the lesson H1.
2. **Directional slide between lessons:** "Next" slides content left (old out −24 px, new in from +24 px), "Previous" the reverse, using `addTransitionType("forward" | "back")`. 220 ms.
3. **Everything else crossfades** at 150 ms. Sidebar and header must **not** animate (give them their own `view-transition-name` so they stay put).
4. Under reduced motion: crossfade only.

### 11.2 GSAP (removed)

GSAP was removed in the Specimen redesign: the headline reveal and the scroll-drawn roadmap went because the theme keeps the page still, and the `gsap` and `@gsap/react` packages are uninstalled. Don't add it back to reading pages.

---

## 12. Dark mode specifics

- Default to **system**, with the 3-way theme menu.
- Derived, never inverted: ground oklch(17.5% 0.01 65), wells step lighter (+3.5% per level), oat ink oklch(93.5% 0.016 82), the blue lifted to L 74 and calmed to chroma 0.12. Hues never move between modes.
- No shadows in dark; floating layers get a 1px `--border-strong` ring.
- The ink band and ink buttons swap with the tokens: in dark they are oat with dark text.
- Home screenshots ship in both modes (`*-light.png`, `*-dark.png`) and swap with `dark:hidden` / `dark:block`.
- Check every new component in both themes before merging.

---

## 13. Accessibility checklist (must pass)

- [ ] Text contrast ≥ 4.5:1, large text and UI components ≥ 3:1, in both themes (tokens above are pre-verified).
- [ ] Every interactive element has a visible `:focus-visible` ring (2 px `--ring`, 2 px offset). Today the consent buttons, quiz options and sidebar links are missing one.
- [ ] Focus is never hidden under the sticky header: `scroll-padding-top: 4.5rem` on `html`.
- [ ] Drawer, sheet, palette and modal trap focus, close on Escape, and return focus to the trigger.
- [ ] Touch targets ≥ 44×44 px on coarse pointers.
- [ ] Status is never color-only (icons + text on progress, quiz, sidebar).
- [ ] `aria-live="polite"` for copy, save and quiz feedback.
- [ ] Headings in order (one H1; the exercise title is currently an `h4` under H2, which skips H3; use `h3`).
- [ ] Reduced motion honored by **every** new animation (CSS and View Transitions).
- [ ] Zoom to 200% without horizontal scroll (except code blocks and tables, which scroll inside themselves).
- [ ] Videos: `title` on iframes, play buttons labelled with the video title.
- [ ] Language tags on code blocks (`data-language`) read out by the bar label.

---

## 14. Performance budget

| Metric (mobile, 4G)          | Target             |
| ---------------------------- | ------------------ |
| LCP                          | < 2.0 s            |
| CLS                          | < 0.05             |
| INP                          | < 150 ms           |
| JS on lesson pages (gzipped) | < 120 KB           |
| Extra JS for home animations | < 50 KB, home only |

How:

- Don't fade in the LCP element (§9.2).
- YouTube: keep the lite-thumbnail-first approach (the player loads only on click). Thumbnails get `loading="lazy"` and explicit width/height.
- Blur filters are expensive: at most one `filter: blur()` glow per page, never animated.
- `backdrop-filter` only on the header and overlays (it's currently also on meta chips and stats).
- Remove `will-change` from elements that don't animate continuously.
- Fonts: `next/font` (already), `display: swap`, subset `latin`. Instrument Serif: load one weight (400 italic) only.

---

## 15. Microcopy and voice

Friendly, direct, second person, short. No hype words ("awesome", "blazing").

| Today                                                                              | Proposed                                                     |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| "Completed — click to undo"                                                        | **"Completed"** + separate "Undo" link                       |
| "Finished this lesson? Mark it complete to track your progress across the course." | "Finished? Mark it done to keep your place."                 |
| "Start learning" (nav, always Web Foundations)                                     | "Learn" → resumes                                            |
| "Watch first"                                                                      | "Watch (optional)" with total duration ("2 videos · 16 min") |
| "Go deeper — official docs"                                                        | "Official docs"                                              |
| "✓ Correct" / "✗ Not quite"                                                        | Icon + "Correct" / Icon + "Not quite. The answer is B."      |
| "Coming soon" card                                                                 | "+3 modules coming soon"                                     |
| Consent title "Before you start learning"                                          | (depends on §8.10)                                           |

---

## 16. Implementation plan

Each step is a PR-sized task. Run the project's definition of done after each (`check:content`, `lint`, `typecheck`, `build`, a light/dark/phone check in the `site` preview).

### Phase A: Foundation (no visual redesign yet; unblocks everything)

1. **Tokens:** replace the `:root` / `.dark` blocks in `globals.css` with §3 and §17 (colors, track hues, shadows, radius, motion), map them in `@theme inline`, and replace hard-coded indigo/violet/sky classes with tokens. Delete `HeroCode.tsx-E`.
2. **Icons:** pick Lucide or the consolidated `icons.tsx` (§6.1), replace all inline SVGs and text glyphs.
3. **UI primitives:** `ui/Button`, `ui/Chip`, `ui/Card`, `ui/Kbd`, `ui/Tooltip`, `ui/Toast`. Swap them into the quiz, consent and complete buttons first (they need it most).

### Phase B: Reading experience (biggest user impact)

4. **Lesson header + compact video list** (§8.6 1–3). Success check: first paragraph visible at 1280×800.
5. **Measure + breakout + mobile code bleed** (§4.3, §8.7).
6. **Code blocks:** file-name bar, no dots, Shiki transformers, output-block style.
7. **End-of-lesson sequence:** takeaways, completion, "Up next", mobile bottom bar.
8. **Motion clean-up:** apply the §9.2 table.

### Phase C: Navigation and progress

9. **Sidebar 2.0 + animated mobile drawer** with a focus trap (§8.9).
10. **Header:** resume pill, mobile menu on every page, 3-way theme menu (§8.1).
11. **Last-visited store** + home "Welcome back" panel (§8.3).
12. **Module page:** CTA, ring, numbered curriculum (§8.5).

### Phase D: Practice

13. **Quiz redesign** (§8.8) + optional `why` field.
14. **Checklist persistence** + exercise difficulty (optional).

### Phase E: Delight and brand (only after A–D)

15. **View Transitions** (§11.1).
16. ~~**GSAP on home** (§11.2)~~: built, then removed in the Specimen redesign.
17. **Roadmap path** + collapsed "coming soon".
18. **Logo refresh, OG images** (`opengraph-image.tsx` per lesson with title + track color), optional Instrument Serif accent, custom Shiki theme.
19. **Keyboard shortcuts + `?` sheet.**

### Definition of done for any UI change

- Both themes, 375 / 768 / 1280 / 1440 px checked in the `site` preview.
- Keyboard-only pass: tab through the page, every focus visible, nothing trapped by accident.
- Reduced motion on (macOS: System Settings → Accessibility → Display → Reduce motion): nothing moves except opacity.
- Lighthouse accessibility = 100, no CLS regressions.

---

## 17. Appendix: tokens

The token CSS now lives in `src/app/tokens.css` (light `:root`, `.dark`, the face and scale tokens, and the Tailwind `@theme` blocks). Read it there rather than copying values into components; `DESIGN.md` summarises the roles.

### Anti-patterns (reject in review)

- Any gradient, glow, blur or shadow outside `--elev-lg`.
- A rounded corner other than a true circle.
- Tracked capitals, an eyebrow label, or a middle-dot meta string.
- A bold Bodoni head.
- An animation with `infinite` that isn't a loading indicator.
- A raw hex or Tailwind palette color (`indigo-600`, `violet-500`) inside a component.
- An icon without `aria-hidden` (decorative) or a label (icon-only button).
- Text glyphs or emoji used as icons.
- `opacity: 0` start state on a page's H1.
- Touch targets under 44 px on mobile.
- A new radius, shadow or duration value that isn't a token.
