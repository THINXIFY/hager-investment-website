import type { Metadata } from "next";

import { ScrollAnimations } from "@/components/motion/ScrollAnimations";
import { TmClosing, TmHero, TmMembers } from "@/components/sections/team/Team";
import { sharedOpenGraph, siteConfig } from "@/config/site";
import { team, tmHero } from "@/content/team";

export const metadata: Metadata = {
  title: "Our Team",
  description: tmHero.description,
  alternates: { canonical: "/team" },
  openGraph: { ...sharedOpenGraph, title: `Our Team | ${siteConfig.name}`, description: tmHero.description, url: "/team" },
};

/** Structured data: the supplied names, roles and email addresses only. */
const teamJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  employee: team.map((m) => ({ "@type": "Person", name: m.name, jobTitle: m.role, email: m.email })),
};

export default function TeamPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(teamJsonLd).replace(/</g, "\\u003c") }} />
      <TmHero />
      <TmMembers />
      <TmClosing />
      <ScrollAnimations />
    </>
  );
}
