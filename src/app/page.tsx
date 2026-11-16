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
import { siteConfig } from "@/config/site";

/** Verified facts only. */
const organisationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: new URL("/brand/hager-investment-logo.png", siteConfig.url).toString(),
  description: siteConfig.description,
  foundingDate: siteConfig.foundingYear,
  address: { "@type": "PostalAddress", addressCountry: siteConfig.country },
  identifier: siteConfig.registration,
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
