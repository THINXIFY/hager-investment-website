import type { Metadata } from "next";

import { ScrollAnimations } from "@/components/motion/ScrollAnimations";
import { InClosing } from "@/components/sections/insights/InClosing";
import { InFeature } from "@/components/sections/insights/InFeature";
import { InFeatured } from "@/components/sections/insights/InFeatured";
import { InMasthead } from "@/components/sections/insights/InMasthead";
import { InPerspectives } from "@/components/sections/insights/InPerspectives";
import { sharedOpenGraph, siteConfig } from "@/config/site";
import { inHero } from "@/content/insights";

export const metadata: Metadata = {
  title: "Insights & Perspectives",
  description: inHero.description,
  alternates: { canonical: "/insights" },
  /* Postponed section with sample content: kept out of search results until real articles are published. */
  robots: { index: false, follow: true },
  openGraph: { ...sharedOpenGraph, title: `Insights & Perspectives | ${siteConfig.name}`, description: inHero.description, url: "/insights" },
};

/** A collection page only: the sample perspectives are not published articles, so none are listed as such. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Insights & Perspectives",
  url: new URL("/insights", siteConfig.url).toString(),
  description: inHero.description,
  publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url, foundingDate: siteConfig.foundingYear },
};

export default function InsightsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <InMasthead />
      <InFeatured />
      <InPerspectives />
      <InFeature />
      <InClosing />
      <ScrollAnimations />
    </>
  );
}
