import type { Metadata } from "next";

import { ScrollAnimations } from "@/components/motion/ScrollAnimations";
import { ExClosing } from "@/components/sections/expertise/ExClosing";
import { ExDirectory } from "@/components/sections/expertise/ExDirectory";
import { ExFeature } from "@/components/sections/expertise/ExFeature";
import { ExHero } from "@/components/sections/expertise/ExHero";
import { ExThinking } from "@/components/sections/expertise/ExThinking";
import { sharedOpenGraph, siteConfig } from "@/config/site";
import { exHero } from "@/content/expertise";

export const metadata: Metadata = {
  title: "Services & Expertise",
  description: exHero.description,
  alternates: { canonical: "/expertise" },
  openGraph: { ...sharedOpenGraph, title: `Services & Expertise | ${siteConfig.name}`, description: exHero.description, url: "/expertise" },
};

/** Verified organisation facts only; capabilities are proposed page content, not regulated services. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Services & Expertise",
  url: new URL("/expertise", siteConfig.url).toString(),
  description: exHero.description,
  publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url, foundingDate: siteConfig.foundingYear },
};

export default function ExpertisePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <ExHero />
      <ExDirectory />
      <ExFeature />
      <ExThinking />
      <ExClosing />
      <ScrollAnimations />
    </>
  );
}
