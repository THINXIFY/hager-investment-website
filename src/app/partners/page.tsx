import type { Metadata } from "next";

import { ScrollAnimations } from "@/components/motion/ScrollAnimations";
import { PtClosing, PtGallery, PtHero, PtRelationships } from "@/components/sections/partners/Partners";
import { siteConfig } from "@/config/site";
import { ptHero } from "@/content/partners";

export const metadata: Metadata = {
  title: "Partners",
  description: ptHero.description,
  alternates: { canonical: "/partners" },
  openGraph: { title: `Partners | ${siteConfig.name}`, description: ptHero.description, url: "/partners" },
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
