import type { Metadata } from "next";

import { ScrollAnimations } from "@/components/motion/ScrollAnimations";
import { LegalPage } from "@/components/sections/legal/LegalPage";
import { sharedOpenGraph, siteConfig } from "@/config/site";
import { LEGAL_APPROVED, privacyPolicy as doc } from "@/content/legal";

export const metadata: Metadata = {
  title: doc.title,
  description: doc.intro,
  alternates: { canonical: doc.href },
  openGraph: { ...sharedOpenGraph, title: doc.title + " | " + siteConfig.name, description: doc.intro, url: doc.href },
  /* Draft pending legal approval: not indexed until LEGAL_APPROVED is set. */
  robots: LEGAL_APPROVED ? undefined : { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <LegalPage doc={doc} />
      <ScrollAnimations />
    </>
  );
}
