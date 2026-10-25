import type { MetadataRoute } from "next";
import { getModules } from "@/lib/content";
import { LEGAL_PAGES, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const modules = getModules().filter((m) => m.status === "available");
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    ...modules.map((m) => ({
      url: `${SITE_URL}/learn/${m.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...modules.flatMap((m) =>
      m.lessons.map((l) => ({
        url: `${SITE_URL}${l.href}`,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ),
    ...LEGAL_PAGES.map((p) => ({
      url: `${SITE_URL}${p.href}`,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
}
