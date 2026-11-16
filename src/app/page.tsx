import { ScrollAnimations } from "@/components/motion/ScrollAnimations";
import { About } from "@/components/sections/home/About";
import { Approach } from "@/components/sections/home/approach/Approach";
import { Closing } from "@/components/sections/home/Closing";
import { Expertise } from "@/components/sections/home/expertise/Expertise";
import { Foundations } from "@/components/sections/home/Foundations";
import { Hero } from "@/components/sections/home/hero/Hero";
import { Philosophy } from "@/components/sections/home/Philosophy";
import { Sectors } from "@/components/sections/home/sectors/Sectors";
import { Statement } from "@/components/sections/home/Statement";
import { contactDetails, shareImage, siteConfig } from "@/config/site";
import { seo } from "@/content/seo";

/** Verified facts only (company register, public LEI record, company-supplied contact). */
const organisationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      legalName: "HAGER INVESTMENT",
      url: siteConfig.url,
      logo: new URL("/icon.png", siteConfig.url).toString(),
      image: new URL(shareImage.url, siteConfig.url).toString(),
      description: seo.home.description,
      foundingDate: siteConfig.foundingYear,
      email: contactDetails.email ?? undefined,
      address: {
        "@type": "PostalAddress",
        streetAddress: "1 Rue de Turi",
        postalCode: "L-3378",
        addressLocality: "Livange",
        addressCountry: siteConfig.country,
      },
      leiCode: siteConfig.lei,
      identifier: { "@type": "PropertyValue", propertyID: "RCS Luxembourg", value: siteConfig.registration },
      sameAs: [siteConfig.registerUrl],
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
      inLanguage: "en",
      publisher: { "@id": `${siteConfig.url}/#organization` },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd).replace(/</g, "\\u003c") }}
      />
      {/* 01 */}
      <Hero />
      {/* 02 */}
      <About />
      {/* 03 */}
      <Sectors />
      {/* 04 */}
      <Expertise />
      {/* 05 */}
      <Approach />
      {/* 06: dark statement between two light sections */}
      <Statement />
      {/* 07 */}
      <Foundations />
      {/* 08 */}
      <Philosophy />
      {/* 09 */}
      <Closing />
      <ScrollAnimations />
    </>
  );
}
