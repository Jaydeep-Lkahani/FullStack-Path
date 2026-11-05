"use client";

import { useEffect } from "react";
import { getChecked, setChecked } from "@/lib/checklist";
import { recordVisit, type RecentLesson } from "@/lib/recent";
import { toast } from "@/components/ui/toast";

/**
 * Side effects for a lesson page that render nothing:
 * - remembers the visit (powers "Resume" and recent lessons in search),
 * - saves "Ready to move on?" checklist ticks,
 * - copies a section link when its heading anchor is clicked.
 */
export function LessonEffects({ lesson }: { lesson: Omit<RecentLesson, "at"> }) {
  const { module, slug, href, title, moduleTitle } = lesson;

  useEffect(() => {
    recordVisit({ module, slug, href, title, moduleTitle });
  }, [module, slug, href, title, moduleTitle]);

  useEffect(() => {
    const key = `${module}/${slug}`;
    const boxes = [
      ...document.querySelectorAll<HTMLInputElement>(
        ".lesson-prose li.task-list-item input[type='checkbox']",
      ),
    ];
    const saved = getChecked(key);
    const handlers = boxes.map((box, i) => {
      if (saved.has(i)) box.checked = true;
      const onChange = () => setChecked(key, i, box.checked);
      box.addEventListener("change", onChange);
      return () => box.removeEventListener("change", onChange);
    });
    return () => handlers.forEach((off) => off());
  }, [module, slug]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.(
        ".lesson-prose :is(h2, h3) > a[href^='#']",
      );
      if (!(link instanceof HTMLAnchorElement)) return;
      const url = `${location.origin}${location.pathname}${link.getAttribute("href")}`;
      navigator.clipboard?.writeText(url).then(
        () => toast("Link to this section copied"),
        () => {},
      );
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
