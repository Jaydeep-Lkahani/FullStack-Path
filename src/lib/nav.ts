import { getModules } from "./content";

export interface NavLesson {
  slug: string;
  title: string;
  href: string;
}

export interface NavModule {
  slug: string;
  title: string;
  phase: number;
  available: boolean;
  lessons: NavLesson[];
}

export function getNav(): NavModule[] {
  return getModules().map((m) => ({
    slug: m.slug,
    title: m.title,
    phase: m.phase,
    available: m.status === "available",
    lessons: m.lessons.map((l) => ({ slug: l.slug, title: l.title, href: l.href })),
  }));
}
