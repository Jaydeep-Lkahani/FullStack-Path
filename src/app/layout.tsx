import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppShell } from "@/components/AppShell";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getNav } from "@/lib/nav";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "FullStack Path", template: "%s · FullStack Path" },
  description:
    "Go from fundamentals to job-ready in React, Node.js and Next.js with curated videos, practice and interview prep.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const modules = getNav();
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AppShell modules={modules}>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
