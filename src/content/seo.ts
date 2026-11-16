/**
 * Search titles and descriptions (what Google shows in results), kept in one place.
 * Titles: under ~60 characters including the " | HAGER INVESTMENT" suffix added by the layout template.
 * Descriptions: ~140–160 characters. Verified facts only (Luxembourg, 1993, RCS B44483); never claim
 * licences, regulatory status, returns or figures.
 */
export type PageSeo = { title: string; description: string };

export const seo = {
  home: {
    /* Absolute title (no suffix) on the homepage. */
    title: "HAGER INVESTMENT | Investment Company in Luxembourg Since 1993",
    description:
      "HAGER INVESTMENT is a Luxembourg investment company with a corporate history dating to 1993, offering investment opportunities to investors and partners.",
  },
  about: {
    title: "About Us: Luxembourg Investment Company",
    description:
      "About HAGER INVESTMENT, a Luxembourg-established investment company (société anonyme, RCS B44483) with a corporate history dating to 1993.",
  },
  team: {
    title: "Our Team: Leadership & Management",
    description:
      "Meet Daniel Hager (CEO), the Co-Directors and the management team of HAGER INVESTMENT, an investment company established in Luxembourg in 1993.",
  },
  investmentUniverse: {
    title: "Investment Universe: Sectors & Industries",
    description:
      "The sectors that shape HAGER INVESTMENT's perspective: real estate, energy, infrastructure, logistics, technology, artificial intelligence, healthcare and more.",
  },
  expertise: {
    title: "Investment Services & Expertise",
    description:
      "Investment strategy, asset management, mergers & acquisitions, corporate advisory, real estate investment and private equity at HAGER INVESTMENT, Luxembourg.",
  },
  approach: {
    title: "Our Investment Approach",
    description:
      "How HAGER INVESTMENT approaches investment: understanding context, evaluating complexity and keeping a long-term perspective, in Luxembourg since 1993.",
  },
  partners: {
    title: "Our Partners",
    description:
      "The partners of HAGER INVESTMENT: relationships that bring together expertise, ideas and investment opportunities across industries.",
  },
  contact: {
    title: "Contact Us",
    description:
      "Contact HAGER INVESTMENT in Livange, Luxembourg, about investment opportunities, partnerships and corporate enquiries. Email info@hager-investment.com.",
  },
} satisfies Record<string, PageSeo>;
