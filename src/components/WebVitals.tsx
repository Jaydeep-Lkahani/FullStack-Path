"use client";

import { SpeedInsights } from "@vercel/speed-insights/next";

/** Reports Core Web Vitals (LCP, INP, CLS, FCP, TTFB) to Vercel Speed Insights. */
export function WebVitals() {
  return <SpeedInsights />;
}
