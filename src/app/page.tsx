import type { Metadata } from "next";
import Link from "next/link";
import { HeroCode } from "@/components/home/HeroCode";
import { LessonChecklist } from "@/components/home/LessonChecklist";
import { ProgressRing } from "@/components/home/ProgressRing";
import { SpotlightCard } from "@/components/home/SpotlightCard";
import { StartButton } from "@/components/home/StartButton";
import { getAllLessons, getModules } from "@/lib/content";
import { roadmap } from "@/lib/roadmap";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const TECH = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Express",
  "Next.js",
  "REST APIs",
  "Authentication",
  "WebSockets",
  "Testing",
  "PostgreSQL",
  "Prisma",
  "Git",
  "Docker",
];

const FEATURES = [
  {
    title: "Explained from scratch",
    text: "Every concept follows the same rhythm: a plain-English explanation, a small example you can run, and the mistake most people make.",
    className: "lg:col-span-2",
    icon: (
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5zM4 21.5V5.5M8 7h8M8 11h6" />
    ),
  },
  {
    title: "Curated videos",
    text: "Hand-picked, link-checked videos on every lesson, so you never hunt for a good tutorial.",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="m10 9.5 5 2.5-5 2.5z" />
      </>
    ),
  },
  {
    title: "Practice that sticks",
    text: "Exercises with full solutions and a quiz at the end of each module.",
    icon: <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />,
  },
  {
    title: "Progress you can see",
    text: "Tick lessons off and watch the rings fill. It is all saved in your browser, with no account needed.",
    className: "lg:col-span-2",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12.5 2.8 2.8L16.5 9" />
      </>
    ),
  },
];

function formatTime(minutes: number) {
  return minutes >= 90 ? `${Math.round(minutes / 60)} h` : `${minutes} min`;
}

export default function Home() {
  const modules = getModules();
  const all = getAllLessons();
  const links = all.map((l) => ({
    module: l.module,
    slug: l.slug,
    href: l.href,
    title: l.title,
  }));

  const stats = [
    { value: all.length, label: "Lessons" },
    { value: modules.filter((m) => m.lessons.length > 0).length, label: "Modules live" },
    { value: all.reduce((n, l) => n + l.videos.length, 0), label: "Curated videos" },
    {
      value: Math.round(all.reduce((n, l) => n + l.minutes, 0) / 60),
      label: "Hours of reading",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      {/* ---------- Hero ---------- */}
      <section className="relative isolate overflow-x-clip pt-6 pb-16 sm:pt-12">
        <div className="hero-aurora" aria-hidden>
          <i />
          <i />
          <i />
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div className="min-w-0">
            <p
              className="rise border-border bg-surface/80 text-muted inline-flex items-center gap-2 rounded-full border py-1 pr-3.5 pl-2.5 text-xs font-medium backdrop-blur"
              style={{ "--d": "0ms" } as React.CSSProperties}
            >
              <span
                className="ping-dot bg-success relative h-2 w-2 rounded-full"
                aria-hidden
              />
              Free · self-paced · React, Node.js &amp; Next.js
            </p>
            <h1
              className="rise mt-5 text-4xl leading-[1.08] font-bold tracking-tight text-balance sm:text-5xl lg:text-[3.5rem]"
              style={{ "--d": "80ms" } as React.CSSProperties}
            >
              From fundamentals to <span className="text-gradient">job-ready</span>, full
              stack.
            </h1>
            <p
              className="rise text-muted mt-5 max-w-xl text-lg text-pretty"
              style={{ "--d": "160ms" } as React.CSSProperties}
            >
              A structured path with detailed lessons, curated videos, exercises and
              interview prep. Pick up exactly where you left off.
            </p>
            <div
              className="rise mt-8 flex flex-wrap items-start gap-3"
              style={{ "--d": "240ms" } as React.CSSProperties}
            >
              <StartButton lessons={links} />
              <a
                href="#roadmap"
                className="group border-border bg-surface/70 hover:border-accent/60 hover:bg-surface-hover focus-visible:outline-accent inline-flex items-center gap-2 rounded-xl border px-6 py-3 font-semibold backdrop-blur transition duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98]"
              >
                See the roadmap
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-y-0.5"
                >
                  <path d="M12 5v14M6 13l6 6 6-6" />
                </svg>
              </a>
            </div>
          </div>

          <div className="rise min-w-0" style={{ "--d": "200ms" } as React.CSSProperties}>
            <div className="float">
              <HeroCode />
            </div>
          </div>
        </div>

        <dl
          className="rise border-border bg-surface/70 mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border backdrop-blur sm:grid-cols-4"
          style={{ "--d": "320ms" } as React.CSSProperties}
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-background/60 px-5 py-4">
              <dt className="text-muted text-xs font-medium tracking-wide uppercase">
                {s.label}
              </dt>
              <dd
                className="mt-1 text-3xl font-bold tracking-tight tabular-nums"
                aria-label={String(s.value)}
              >
                <span
                  className="count"
                  aria-hidden
                  style={{ "--to": s.value } as React.CSSProperties}
                />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------- Tech marquee ---------- */}
      <section aria-label="Topics covered" className="reveal pb-16">
        <div className="marquee">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1}
                className="flex shrink-0 gap-3 pr-3"
              >
                {TECH.map((t) => (
                  <li
                    key={t}
                    className="border-border bg-surface text-muted hover:border-accent/60 hover:text-foreground rounded-full border px-4 py-1.5 text-sm font-medium whitespace-nowrap transition-colors"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Features ---------- */}
      <section aria-labelledby="why" className="pb-20">
        <div className="reveal max-w-2xl">
          <p className="text-accent text-sm font-semibold">Why it works</p>
          <h2 id="why" className="mt-2 text-3xl font-bold tracking-tight text-balance">
            Built for people who learn by doing
          </h2>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <SpotlightCard
              key={f.title}
              className={`reveal border-border bg-surface rounded-2xl border p-6 ${f.className ?? ""}`}
            >
              <span className="bg-accent/10 text-accent grid h-10 w-10 place-items-center rounded-xl">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  {f.icon}
                </svg>
              </span>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="text-muted mt-1.5 text-pretty">{f.text}</p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* ---------- Roadmap ---------- */}
      <section aria-labelledby="roadmap" className="scroll-mt-20 pb-20">
        <div className="reveal max-w-2xl">
          <p className="text-accent text-sm font-semibold">The path</p>
          <h2
            id="roadmap"
            className="mt-2 text-3xl font-bold tracking-tight text-balance"
          >
            The roadmap
          </h2>
          <p className="text-muted mt-2">
            Work through the phases in order. Each module builds on the one before it.
          </p>
        </div>

        <div className="mt-10 space-y-14">
          {roadmap.map((phase) => (
            <div key={phase.id} className="relative pl-12 sm:pl-16">
              <span
                aria-hidden
                className="from-accent/60 absolute top-12 bottom-[-3.5rem] left-[1.15rem] w-px bg-gradient-to-b to-transparent sm:left-[1.4rem]"
              />
              <span
                aria-hidden
                className="bg-accent absolute top-0 left-0 grid h-10 w-10 place-items-center rounded-xl text-sm font-bold text-white shadow-lg shadow-indigo-500/30 sm:h-12 sm:w-12 sm:text-base dark:text-zinc-950"
              >
                {phase.id}
              </span>
              <div className="reveal">
                <h3 className="text-xl font-semibold tracking-tight">
                  Phase {phase.id} · {phase.title}
                </h3>
                <p className="text-muted mt-1 mb-5 text-sm">{phase.goal}</p>
              </div>
              <ol className="grid gap-4 md:grid-cols-2">
                {phase.modules.map((m) => {
                  const mod = modules.find((x) => x.slug === m.slug)!;
                  const available = m.status === "available" && mod.lessons.length > 0;
                  const minutes = mod.lessons.reduce((n, l) => n + l.minutes, 0);
                  return (
                    <li key={m.slug} className="reveal">
                      <SpotlightCard
                        className={`group border-border h-full rounded-2xl border p-5 ${available ? "bg-surface" : "bg-surface/50"}`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            {!available && (
                              <span className="border-border text-muted mb-2 inline-block rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase">
                                Coming soon
                              </span>
                            )}
                            <h4
                              className={`font-semibold ${available ? "" : "text-foreground/70"}`}
                            >
                              {available ? (
                                <Link
                                  href={`/learn/${m.slug}`}
                                  className="focus-visible:outline-accent after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2"
                                >
                                  {m.title}
                                </Link>
                              ) : (
                                m.title
                              )}
                            </h4>
                            <p className="text-muted mt-1 text-sm text-pretty">
                              {m.description}
                            </p>
                          </div>
                          {available ? (
                            <ProgressRing
                              lessons={mod.lessons}
                              label={`${m.title} progress`}
                            />
                          ) : null}
                        </div>

                        {available && (
                          <>
                            <div className="text-muted mt-4 flex items-center gap-3 text-xs">
                              <span>{mod.lessons.length} lessons</span>
                              <span aria-hidden>·</span>
                              <span>~{formatTime(minutes)}</span>
                              <span className="text-accent ml-auto inline-flex items-center gap-1 font-semibold">
                                Open
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.4"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  aria-hidden
                                  className="transition-transform duration-200 group-hover:translate-x-1"
                                >
                                  <path d="M5 12h14M13 6l6 6-6 6" />
                                </svg>
                              </span>
                            </div>
                            <details className="border-border relative z-10 mt-4 border-t pt-3">
                              <summary className="text-muted hover:text-foreground focus-visible:outline-accent flex cursor-pointer items-center justify-between rounded-md text-xs font-medium transition-colors select-none focus-visible:outline-2 focus-visible:outline-offset-2">
                                Show lessons
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.4"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  aria-hidden
                                  className="chev transition-transform duration-200"
                                >
                                  <path d="m6 9 6 6 6-6" />
                                </svg>
                              </summary>
                              <div className="mt-2">
                                <LessonChecklist
                                  lessons={mod.lessons.map((l) => ({
                                    module: l.module,
                                    slug: l.slug,
                                    href: l.href,
                                    title: l.title,
                                    label:
                                      l.quiz.length > 0
                                        ? l.title
                                        : `${l.order}. ${l.title}`,
                                  }))}
                                />
                              </div>
                            </details>
                          </>
                        )}
                      </SpotlightCard>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Final call to action ---------- */}
      <section
        aria-labelledby="cta"
        className="reveal relative isolate mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-sky-600 px-6 py-14 text-center text-white sm:px-12"
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-10 [background-image:radial-gradient(rgb(255_255_255/0.7)_1px,transparent_1.2px)] [mask-image:radial-gradient(ellipse_at_center,#000,transparent_75%)] [background-size:22px_22px] opacity-30"
        />
        <h2
          id="cta"
          className="text-3xl font-bold tracking-tight text-balance sm:text-4xl"
        >
          Ready to build real things?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-pretty text-white/85">
          Start at the beginning or jump straight to the module you need. Your progress is
          saved as you go.
        </p>
        <div className="mt-8 flex justify-center">
          <StartButton lessons={links} variant="light" />
        </div>
      </section>
    </div>
  );
}
