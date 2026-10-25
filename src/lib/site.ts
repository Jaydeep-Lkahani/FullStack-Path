/** Public production origin; used for canonical URLs, the sitemap and robots.txt. */
export const SITE_URL = "https://full-stack-path.vercel.app";

export const SITE_NAME = "FullStack Path";

export const SITE_DESCRIPTION =
  "Go from fundamentals to job-ready in React, Node.js and Next.js with curated videos, practice and interview prep.";

/** Date shown on the privacy, terms and cookie pages. Update it whenever any of them change. */
export const LEGAL_LAST_UPDATED = "25 October 2026";

export const LEGAL_PAGES = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms and Conditions" },
  { href: "/cookies", label: "Cookie Policy" },
] as const;
