import type { Metadata } from "next";

import { ScrollAnimations } from "@/components/motion/ScrollAnimations";
import { IvClosing } from "@/components/sections/investment-universe/IvClosing";
import { IvConnect } from "@/components/sections/investment-universe/IvConnect";
import { IvHero } from "@/components/sections/investment-universe/IvHero";
import { IvLongTerm } from "@/components/sections/investment-universe/IvLongTerm";
import { IvPerspective } from "@/components/sections/investment-universe/IvPerspective";
import { IvSectors } from "@/components/sections/investment-universe/IvSectors";
import { sharedOpenGraph, siteConfig } from "@/config/site";
import { seo } from "@/content/seo";
import { ivHero } from "@/content/investment-universe";

export const metadata: Metadata = {
  title: seo.investmentUniverse.title,
  description: seo.investmentUniverse.description,
  alternates: { canonical: "/investment-universe" },
  openGraph: { ...sharedOpenGraph, title: `${seo.investmentUniverse.title} | ${siteConfig.name}`, description: seo.investmentUniverse.description, url: "/investment-universe" },
};

/** Verified organisation facts only; sectors are described as page content, not as holdings. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Investment Universe",
  url: new URL("/investment-universe", siteConfig.url).toString(),
  description: ivHero.description,
  publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url, foundingDate: siteConfig.foundingYear },
};

export default function InvestmentUniversePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <IvHero />
      <IvPerspective />
      <IvSectors />
      <IvConnect />
      <IvLongTerm />
      <IvClosing />
      <ScrollAnimations />
    </>
  );
}
