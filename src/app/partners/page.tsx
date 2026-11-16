import type { Metadata } from "next";

import { ScrollAnimations } from "@/components/motion/ScrollAnimations";
import { PtClosing, PtGallery, PtHero, PtRelationships } from "@/components/sections/partners/Partners";
import { sharedOpenGraph, siteConfig } from "@/config/site";
import { seo } from "@/content/seo";

export const metadata: Metadata = {
  title: seo.partners.title,
  description: seo.partners.description,
  alternates: { canonical: "/partners" },
  openGraph: { ...sharedOpenGraph, title: `${seo.partners.title} | ${siteConfig.name}`, description: seo.partners.description, url: "/partners" },
};

export default function PartnersPage() {
  return (
    <>
      <PtHero />
      <PtGallery />
      <PtRelationships />
      <PtClosing />
      <ScrollAnimations />
    </>
  );
}
