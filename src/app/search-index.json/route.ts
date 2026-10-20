import { getAllLessons, getModule } from "@/lib/content";

function plainText(md: string) {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`|\[\]()-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 6000);
}

export const dynamic = "force-static";

export function GET() {
  const entries = getAllLessons().map((l) => ({
    title: l.title,
    summary: l.summary,
    module: getModule(l.module)?.title ?? l.module,
    href: l.href,
    headings: l.headings.map((h) => h.text),
    text: plainText(l.body),
  }));
  return Response.json(entries);
}
