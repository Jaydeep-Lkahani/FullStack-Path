import { getModules, type Lesson } from "./content";
import { roadmap, type TrackId } from "./roadmap";

export type LessonKind = "lesson" | "quiz" | "project" | "stretch";

export function lessonKind(l: Pick<Lesson, "quiz" | "slug">): LessonKind {
  if (l.quiz.length > 0) return "quiz";
  if (l.slug.startsWith("project")) return "project";
  if (l.slug.startsWith("stretch")) return "stretch";
  return "lesson";
}

export interface NavLesson {
  module: string;
  slug: string;
  title: string;
  href: string;
  kind: LessonKind;
}

export interface NavModule {
  slug: string;
  title: string;
  phase: number;
  phaseTitle: string;
  track: TrackId;
  available: boolean;
  lessons: NavLesson[];
}

export function getNav(): NavModule[] {
  return getModules().map((m) => ({
    slug: m.slug,
    title: m.title,
    phase: m.phase,
    phaseTitle: roadmap.find((p) => p.id === m.phase)?.title ?? "",
    track: m.track,
    available: m.status === "available",
    lessons: m.lessons.map((l) => ({
      module: l.module,
      slug: l.slug,
      title: l.title,
      href: l.href,
      kind: lessonKind(l),
    })),
  }));
}
