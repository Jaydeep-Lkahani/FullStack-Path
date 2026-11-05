import { getLesson, getModule } from "@/lib/content";
import { ogCard, OG_SIZE } from "@/lib/og";

export const alt = "Lesson preview";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ module: string; lesson: string }>;
}) {
  const { module, lesson } = await params;
  const mod = getModule(module);
  const l = getLesson(module, lesson);
  return ogCard({
    kicker: mod ? `Phase ${mod.phase}, ${mod.title}` : "Lesson",
    title: l?.title ?? "Lesson",
    subtitle: l?.summary,
    track: mod?.track,
  });
}
