import type { Metadata } from "next";

import { ScrollAnimations } from "@/components/motion/ScrollAnimations";
import { ApClosing } from "@/components/sections/approach/ApClosing";
import { ApConsiderations } from "@/components/sections/approach/ApConsiderations";
import { ApHero } from "@/components/sections/approach/ApHero";
import { ApPhilosophy } from "@/components/sections/approach/ApPhilosophy";
import { ApStages } from "@/components/sections/approach/ApStages";
import { sharedOpenGraph, siteConfig } from "@/config/site";
import { apHero } from "@/content/approach";

export const metadata: Metadata = {
  title: "Our Approach",
  description: apHero.description,
  alternates: { canonical: "/approach" },
  openGraph: { ...sharedOpenGraph, title: `Our Approach | ${siteConfig.name}`, description: apHero.description, url: "/approach" },
};

/** Verified organisation facts only; the approach is proposed page content. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Our Approach & Philosophy",
  url: new URL("/approach", siteConfig.url).toString(),
  description: apHero.description,
  publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url, foundingDate: siteConfig.foundingYear },
};

export default function ApproachPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <ApHero />
      <ApPhilosophy />
      <ApStages />
      <ApConsiderations />
      <ApClosing />
      <ScrollAnimations />
    </>
  );
}
