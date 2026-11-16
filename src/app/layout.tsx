import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { REVIEW_MODE_FORCED, reviewModeScript } from "@/config/review";
import { shareImage, sharedOpenGraph, siteConfig } from "@/config/site";

import "./globals.css";

// Self-hosted at build time by next/font: no requests to Google from visitors (GDPR-friendly).
// Headings: Inter (light weights, tight tracking). Body: Inter Tight.
const inter = Inter({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name}: Patient Capital, Enduring Value`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    ...sharedOpenGraph,
    title: siteConfig.name,
    description: siteConfig.tagline,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: siteConfig.name, description: siteConfig.tagline, images: [shareImage] },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#090b0d",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable}`}
      data-review={REVIEW_MODE_FORCED ? "" : undefined}
      // The review-mode script may add data-review before hydration.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: reviewModeScript }} />
      </head>
      <body suppressHydrationWarning>
        <p
          role="note"
          className="review-only fixed bottom-4 left-4 z-[90] border border-dashed border-teal bg-white px-3 py-1.5 text-[0.6875rem] font-semibold tracking-[0.14em] text-teal uppercase shadow-sm"
        >
          Review mode · placeholders visible
        </p>
        <a
          href="#main"
          className="fixed top-3 left-3 z-[100] -translate-y-[160%] bg-obsidian px-5 py-3 text-sm text-white transition-transform duration-300 focus:translate-y-0"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <SmoothScroll />
      </body>
    </html>
  );
}
