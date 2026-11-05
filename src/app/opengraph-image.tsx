import { ogCard, OG_SIZE } from "@/lib/og";
import { SITE_DESCRIPTION } from "@/lib/site";

export const alt =
  "FullStack Path: React, Node.js and Next.js from fundamentals to job-ready";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    kicker: "Free and self-paced",
    title: "The full stack, after HTML and CSS.",
    subtitle: SITE_DESCRIPTION,
  });
}
