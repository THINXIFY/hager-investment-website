import type { Metadata } from "next";

import { ScrollAnimations } from "@/components/motion/ScrollAnimations";
import { AboutClosing } from "@/components/sections/about/AboutClosing";
import { AboutCompany } from "@/components/sections/about/AboutCompany";
import { AboutCorporate } from "@/components/sections/about/AboutCorporate";
import { AboutForward } from "@/components/sections/about/AboutForward";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutHeritage } from "@/components/sections/about/AboutHeritage";
import { AboutPerspective } from "@/components/sections/about/AboutPerspective";
import { sharedOpenGraph, siteConfig } from "@/config/site";
import { aboutHero } from "@/content/about";
import { corporate } from "@/content/home";

export const metadata: Metadata = {
  title: "About Us",
  description: aboutHero.supporting,
  alternates: { canonical: "/about" },
  openGraph: { ...sharedOpenGraph, title: `About ${siteConfig.name}`, description: aboutHero.supporting, url: "/about" },
};

/** Verified facts only. */
const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: new URL("/about", siteConfig.url).toString(),
  mainEntity: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    foundingDate: siteConfig.foundingYear,
    address: { "@type": "PostalAddress", addressCountry: siteConfig.country },
    identifier: siteConfig.registration,
    leiCode: corporate.lei,
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd).replace(/</g, "\\u003c") }}
      />
      <AboutHero />
      <AboutCompany />
      <AboutHeritage />
      <AboutPerspective />
      <AboutForward />
      <AboutCorporate />
      <AboutClosing />
      <ScrollAnimations />
    </>
  );
}
