import type { Metadata } from "next";
import {
  Atkinson_Hyperlegible_Mono,
  Atkinson_Hyperlegible_Next,
  Bodoni_Moda,
} from "next/font/google";
import Script from "next/script";
import { AppShell } from "@/components/AppShell";
import { ThemeProvider } from "@/components/ThemeProvider";
import { WebVitals } from "@/components/WebVitals";
import { getNav } from "@/lib/nav";
import { returningScript } from "@/lib/returning";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

// Faces (DESIGN.md § Type): Bodoni Moda for titles, Atkinson Hyperlegible for reading and code.
const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
});
// next/font has no fallback metrics for Atkinson yet, so skip the generated fallback.
const atkinson = Atkinson_Hyperlegible_Next({
  variable: "--font-atkinson",
  subsets: ["latin"],
  weight: "variable",
  adjustFontFallback: false,
});
const atkinsonMono = Atkinson_Hyperlegible_Mono({
  variable: "--font-atkinson-mono",
  subsets: ["latin"],
  weight: "variable",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s · ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const modules = getNav();
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bodoni.variable} ${atkinson.variable} ${atkinsonMono.variable} antialiased`}
    >
      <body>
        <Script id="returning-flag" strategy="beforeInteractive">
          {returningScript}
        </Script>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AppShell modules={modules}>{children}</AppShell>
        </ThemeProvider>
        <WebVitals />
      </body>
    </html>
  );
}
