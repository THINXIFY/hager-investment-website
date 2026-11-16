import type { Metadata } from "next";

import { ScrollAnimations } from "@/components/motion/ScrollAnimations";
import { CtCompany } from "@/components/sections/contact/CtCompany";
import { CtEnquiry } from "@/components/sections/contact/CtEnquiry";
import { CtFaq } from "@/components/sections/contact/CtFaq";
import { CtHero } from "@/components/sections/contact/CtHero";
import { CtOffice } from "@/components/sections/contact/CtOffice";
import { contactDetails, sharedOpenGraph, siteConfig } from "@/config/site";
import { seo } from "@/content/seo";
import { ctFaq, ctHero } from "@/content/contact";

export const metadata: Metadata = {
  title: seo.contact.title,
  description: seo.contact.description,
  alternates: { canonical: "/contact" },
  openGraph: { ...sharedOpenGraph, title: `${seo.contact.title} | ${siteConfig.name}`, description: seo.contact.description, url: "/contact" },
};

const [street, locality] = contactDetails.address ?? [];
const [postalCode, ...town] = (locality ?? "").replace(/^L-/, "").split(" ");

/** Verified organisation facts; email and telephone are included only once confirmed. */
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact HAGER INVESTMENT",
    url: new URL("/contact", siteConfig.url).toString(),
    description: ctHero.description,
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.name,
      legalName: "HAGER INVESTMENT",
      url: siteConfig.url,
      foundingDate: siteConfig.foundingYear,
      leiCode: siteConfig.lei,
      address: {
        "@type": "PostalAddress",
        addressCountry: siteConfig.country,
        ...(street ? { streetAddress: street, postalCode: `L-${postalCode}`, addressLocality: town.join(" ") } : {}),
      },
      ...(contactDetails.email ? { email: contactDetails.email } : {}),
      ...(contactDetails.phone ? { telephone: contactDetails.phone } : {}),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ctFaq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
];

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\u003c") }} />
      <CtHero />
      <CtEnquiry />
      <CtOffice />
      <CtCompany />
      <CtFaq />
      <ScrollAnimations />
    </>
  );
}
