import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ScrollAnimations } from "@/components/motion/ScrollAnimations";
import { Impressum } from "@/components/sections/impressum/Impressum";
import { IMPRESSUM_APPROVED, impressumVisible, siteConfig } from "@/config/site";
import { imHero } from "@/content/impressum";

export const metadata: Metadata = {
  title: imHero.title,
  description: imHero.description,
  alternates: { canonical: "/impressum" },
  openGraph: { title: `${imHero.title} | ${siteConfig.name}`, description: imHero.description, url: "/impressum" },
  /* Draft: never indexed before approval (and not served at all in production; see impressumVisible). */
  robots: IMPRESSUM_APPROVED ? undefined : { index: false, follow: false },
};

export default function ImpressumPage() {
  // Kept out of production until approved: 404 unless approved or draft preview is enabled.
  if (!impressumVisible) notFound();
  return (
    <>
      <Impressum />
      <ScrollAnimations />
    </>
  );
}
