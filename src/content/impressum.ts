import { contactDetails, siteConfig } from "@/config/site";
import { tbc, type Copy } from "@/lib/content";

/* ==========================================================================
   Impressum (IM-01). Draft pending company and legal approval.

   Kept out of production until IMPRESSUM_APPROVED (src/config/site.ts) is set:
   the route returns 404 and is not linked unless NEXT_PUBLIC_SHOW_DRAFTS=1.
   Only verified values are shown publicly; anything unconfirmed is authored
   with tbc(…, "") so it appears in review mode (?review=1) only.
   This page is a corporate imprint and does not evidence any regulatory
   authorisation.
   ========================================================================== */

const pending = (what: string) => tbc(`[${what}]`, "");

export type ImRow = { term: string; value: Copy; copy?: string; note?: string };

export const imHero = {
  eyebrow: "Corporate Information",
  title: "Impressum",
  description: "Corporate identification, publisher information and legal details concerning the HAGER INVESTMENT website.",
};

export const imIdentity = {
  heading: "HAGER INVESTMENT",
  body: "HAGER INVESTMENT is a Luxembourg-based investment company incorporated as a société anonyme (S.A.) under the laws of the Grand Duchy of Luxembourg.",
  caption: "Corporate Information",
  rows: [
    { term: "Legal Name", value: "HAGER INVESTMENT" },
    { term: "Legal Form", value: "Société Anonyme (S.A.)" },
    { term: "Jurisdiction", value: "Grand Duchy of Luxembourg" },
    { term: "Year of Establishment", value: siteConfig.foundingYear },
    { term: "Trade and Companies Register", value: `Luxembourg RCS ${siteConfig.registration}`, copy: siteConfig.registration },
    { term: "Legal Entity Identifier (LEI)", value: siteConfig.lei, copy: siteConfig.lei },
    {
      term: "Registered Office",
      value: (contactDetails.address ?? []).join(", ") || pending("Registered office: company confirmation required"),
      note: "Source: public LEI record. Publication approved on 2026-11-15; confirm against current RCS records before launch.",
    },
    { term: "Business Permit", value: pending("Display verified details if applicable") },
    { term: "VAT Identification Number", value: pending("Display verified details if applicable") },
  ] satisfies ImRow[],
};

const siteUrlConfirmed = Boolean(process.env.NEXT_PUBLIC_SITE_URL);

export const imPublisher = {
  eyebrow: "Website Publisher",
  heading: "Corporate & Website Information.",
  body: [
    "This website is published by HAGER INVESTMENT, a company established in Luxembourg.",
    "It provides general information concerning the company's corporate identity, investment-related perspectives, areas of interest and published website materials.",
  ],
  rows: [
    { term: "Responsible Entity", value: "HAGER INVESTMENT" },
    { term: "Registered Jurisdiction", value: "Luxembourg" },
    { term: "Official Email", value: contactDetails.email ?? pending("Official corporate email: company confirmation required") },
    { term: "Telephone", value: contactDetails.phone ?? pending("Display only if officially verified") },
    { term: "Website", value: siteUrlConfirmed ? siteConfig.url.replace(/^https?:\/\//, "").replace(/\/$/, "") : pending("Production website URL to be confirmed (NEXT_PUBLIC_SITE_URL)") },
    { term: "Editorial Responsibility", value: "HAGER INVESTMENT", note: "Add a named responsible representative only if legally required and verified." },
    { term: "Technical Hosting", value: pending("Hosting provider's verified legal identity, if required by applicable law") },
  ] satisfies ImRow[],
};

export const imLegal = {
  heading: "Legal Information & Transparency.",
  body: [
    "HAGER INVESTMENT is an investment company established in Luxembourg in 1993 and incorporated as a société anonyme (S.A.).",
    "The company offers investment opportunities to investors and partners. Prospective investors are welcome to contact us directly.",
    "For further information about the website's legal conditions and personal data processing, please consult the documents below.",
  ],
  links: [
    { label: "Legal Notice", href: "/legal-notice", note: "Website ownership and terms of use" },
    { label: "Privacy Policy", href: "/privacy-policy", note: "How personal data is processed" },
    { label: "Contact HAGER INVESTMENT", href: "/contact", note: "Enquiries and correspondence" },
  ],
};

/** Review-mode launch checklist (never shown publicly). */
export const imReview = [
  "LAUNCH BLOCKER: confirm the registered office against current RCS records.",
  "Confirm all mandatory Luxembourg corporate disclosures, and whether business-permit, VAT, hosting or regulated-activity information applies.",
  "Use verified contact details only; do not imply CSSF supervision unless independently established.",
  "Set IMPRESSUM_APPROVED in src/config/site.ts once approved, to publish the page, link it and add it to the sitemap.",
];
