import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import { roadmap, type RoadmapModule } from "./roadmap";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface Video {
  title: string;
  channel: string;
  /** Human readable, e.g. "42:10" */
  duration: string;
  /** Any YouTube watch / youtu.be URL */
  url: string;
}

export interface DocLink {
  title: string;
  url: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  /** 0-based index into options */
  answer: number;
  explanation: string;
}

export interface Heading {
  id: string;
  text: string;
  depth: 2 | 3;
}

export interface Lesson {
  module: string;
  slug: string;
  href: string;
  title: string;
  summary: string;
  order: number;
  minutes: number;
  videos: Video[];
  docs: DocLink[];
  quiz: QuizQuestion[];
  takeaways: string[];
  body: string;
  headings: Heading[];
}

export interface ModuleWithLessons extends RoadmapModule {
  phase: number;
  lessons: Lesson[];
}

function readingMinutes(text: string) {
  return Math.max(1, Math.round(text.split(/\s+/).length / 200));
}

function extractHeadings(body: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  let inFence = false;
  for (const line of body.split("\n")) {
    if (/^\s*```/.test(line)) inFence = !inFence;
    if (inFence) continue;
    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;
    const text = match[2].replace(/[`*_]/g, "");
    headings.push({
      id: slugger.slug(text),
      text,
      depth: match[1].length as 2 | 3,
    });
  }
  return headings;
}

function readLesson(moduleSlug: string, file: string): Lesson {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, moduleSlug, file), "utf8");
  const { data, content } = matter(raw);
  const slug = file.replace(/\.mdx$/, "");
  return {
    module: moduleSlug,
    slug,
    href: `/learn/${moduleSlug}/${slug}`,
    title: String(data.title ?? slug),
    summary: String(data.summary ?? ""),
    order: Number(data.order ?? 0),
    minutes: Number(data.minutes ?? readingMinutes(content)),
    videos: (data.videos as Video[] | undefined) ?? [],
    docs: (data.docs as DocLink[] | undefined) ?? [],
    quiz: (data.quiz as QuizQuestion[] | undefined) ?? [],
    takeaways: (data.takeaways as string[] | undefined) ?? [],
    body: content,
    headings: extractHeadings(content),
  };
}

function readModuleLessons(moduleSlug: string): Lesson[] {
  const dir = path.join(CONTENT_DIR, moduleSlug);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => readLesson(moduleSlug, f))
    .sort((a, b) => a.order - b.order);
}

export function getModules(): ModuleWithLessons[] {
  return roadmap.flatMap((phase) =>
    phase.modules.map((m) => ({
      ...m,
      phase: phase.id,
      lessons: m.status === "available" ? readModuleLessons(m.slug) : [],
    })),
  );
}

export function getModule(slug: string) {
  return getModules().find((m) => m.slug === slug);
}

export function getLesson(moduleSlug: string, lessonSlug: string) {
  return getModule(moduleSlug)?.lessons.find((l) => l.slug === lessonSlug);
}

/** All available lessons in reading order across modules. */
export function getAllLessons() {
  return getModules().flatMap((m) => m.lessons);
}

export function getAdjacentLessons(moduleSlug: string, lessonSlug: string) {
  const all = getAllLessons();
  const i = all.findIndex((l) => l.module === moduleSlug && l.slug === lessonSlug);
  return { prev: all[i - 1] ?? null, next: all[i + 1] ?? null };
}
