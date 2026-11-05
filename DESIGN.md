# Design: FullStack Path

The locked system. Every page and every Hallmark run reads this first. Change it on purpose; this file is the rule. `src/app/tokens.css` holds the values, `src/app/globals.css` the shared classes, and `UI-UX.md` the page-by-page detail.

## System

- Genre: editorial
- Shape of the home page: Workbench (the product shown at work: real code in the hero, screenshots of real lessons below)
- Theme: Specimen. Warm oat paper, warm near-black ink, Bodoni Moda titles over a plain reading face, square 1px rules, one ink-blue signal.
- Axes: light/high-contrast-serif/cool · posture: restrained · modes: light and a derived warm-black dark
- Vibe: quiet, confident, bookish, code-first, warm, precise. A well-made programming book, not a startup landing page.

## Tokens

The project's own token names carry the theme's roles, so every component keeps working:

| Role                           | Token                                       | Light                     | Dark                        |
| ------------------------------ | ------------------------------------------- | ------------------------- | --------------------------- |
| Paper                          | `--background`                              | oklch(96.5% 0.016 82)     | oklch(17.5% 0.01 65)        |
| Paper well                     | `--surface` / `--surface-2`                 | 94% / 91%                 | 21% / 24.5%                 |
| Lifted surface (menus, inputs) | `--raised`                                  | 98.2%                     | 20%                         |
| Ink                            | `--foreground` / `--ink-2`                  | oklch(19% 0.012 60) / 30% | oklch(93.5% 0.016 82) / 84% |
| Quiet text                     | `--muted` / `--subtle`                      | 45% / 51%                 | 74% / 65%                   |
| Rules                          | `--border` / `--border-strong`              | 83% / 66%                 | 31% / 44%                   |
| Signal                         | `--accent`                                  | oklch(45% 0.18 262)       | oklch(74% 0.12 262)         |
| Focus                          | `--ring`                                    | oklch(50% 0.18 262)       | oklch(74% 0.12 262)         |
| Status                         | `--success` `--warning` `--danger` `--info` | L 47 to 50                | L 72 to 80                  |

- **Faces:** Bodoni Moda 400 (`font-display`, `h1`, `.display`, `.display-sm`, `.section-head`) for titles and large figures; Atkinson Hyperlegible Next for everything read (`font-sans`); Atkinson Hyperlegible Mono for code and compared figures (`font-mono`). Display at optical size 96 from 32px up; `.display-sm` lets the optical size follow the size below that.
- **Scale:** `--text-display` (88px at 1440), `--text-section` (about 50px), `--text-title` (25px), `--text-lead` (21px), body 16px, lesson prose 17px, labels 13 to 14px.
- **Space:** `--space-3xs` 2px to `--space-4xl` 144px; sections part by `--section-gap-s` 96, `--section-gap` 128, `--section-gap-l` 160.
- **Shape:** every Tailwind radius and `--r-*` is 0; `rounded-full` stays for circles only. No shadows; depth is a 1px rule. Floating layers (menus, the floating video, the palette) take `--elev-lg`: a rule plus one short cast in light, a rule alone in dark.
- **Tracks:** ten quiet subject inks (`--track-*`), for small marks and 2px rules only.

## Logo

- **Mark:** a square of ink holding three paper layers that step up to the right (`LogoMark`, `MARK_LAYERS` in `src/components/Logo.tsx`). The layers are the full stack (front end, back end, database); the steps are the path up through the three phases. The hairline gaps between layers are the Didone thick-and-thin.
- **Wordmark:** "FullStack Path" in Bodoni Moda at its small optical size, 23px, tracking -0.015em, 12px from the mark.
- **Colour:** one pair only, ink and paper, swapping in dark mode. No blue in the mark.
- **Files kept in sync:** `src/app/icon.svg`, `src/app/apple-icon.png` (180px), `src/app/favicon.ico` (16, 32, 48), and the share card in `src/lib/og.tsx`.

## Controls

- Primary: ink fill, paper text, square, 48px (`buttonClass("primary", "lg")`). One per screen.
- Secondary: 1px ink outline, transparent, same height and edges.
- On the ink band: `buttonClass("paper")`.
- Links: ink text with a 1px ink-blue underline that thickens to 2px on hover. The current nav item is underlined in ink blue.
- A choice between a few: `.seg`, square cells inside one ink hairline, the pressed one filled ink.
- Labels: the body face a step smaller, sentence case, never tracked capitals (`.kicker` is now sentence case).

## Motion

- Character: still. Only state moves (an underline thickens, a cell fills, a drawer slides, the page cross-fades on navigation). No arrivals, no scroll-driven drawing, no loops.
- `--dur-micro` 120ms, `--dur-short` 220ms, `--dur-long` 420ms, `--ease-out` cubic-bezier(0.16, 1, 0.3, 1). No overshoot.
- Under `prefers-reduced-motion: reduce` everything ends at once.

## Signature

The home hero runs the "classic loop trap" from Scope, Hoisting & Closures: the code is read from the lesson's MDX at build time (`src/lib/loop-trap.ts`), highlighted with the lesson's own Shiki theme, switched between `var` and `let`, and executed by a Run button that prints the real console output and the lesson's one-line explanation.

## Never

Gradient text or fills, aurora or glow, dot grids, glass headers, floating or bobbing cards, marquees, eyebrow labels, tracked-capital labels, middle-dot meta strings, emoji icons, drawn browser or OS windows around code, invented numbers or quotes.

## Exports

`src/app/tokens.css` in this project (plain custom properties plus Tailwind `@theme` blocks). Other formats are added here on request.
