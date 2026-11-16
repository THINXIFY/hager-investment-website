import { contactDetails, siteConfig } from "@/config/site";
import { tbc, type Copy } from "@/lib/content";

import type { Link } from "./home";

/* ==========================================================================
   Legal collection (LG-01): Legal Notice and Privacy Policy (the Investment Disclaimer was retired at the company's request).

   ALL TEXT IS DRAFT COPY supplied by HAGER Investment for company and legal
   review before publication. Review mode (?review=1) marks each document as a
   draft and shows every internal drafting instruction and launch blocker as a
   dashed note. Unconfirmed values (registered office, email, telephone,
   VAT / business permit, effective date) never appear on the public site.

   Inline **bold** in paragraph strings is rendered as <strong>.
   ========================================================================== */

export type LegalBlock =
  /** Paragraph (public). */
  | { type: "p"; text: string }
  /** Bold lead-in label followed by text, e.g. a data category. */
  | { type: "defs"; items: { term: string; body: string }[] }
  /** Bulleted list. */
  | { type: "list"; items: string[] }
  /** Corporate information table; rows whose value is review-only are hidden publicly. */
  | { type: "facts"; caption: string; rows: { term: string; value: Copy }[] }
  /** Restrained informational callout (public). */
  | { type: "note"; label: string; text: string }
  /** Internal drafting instruction or launch blocker (review mode only). */
  | { type: "review"; text: string; blocker?: boolean }
  /** Controller-style identity block. */
  | { type: "identity"; lines: Copy[] }
  /** Closing action link. */
  | { type: "link"; link: Link; external?: boolean };

export type LegalSection = { id: string; title: string; blocks: LegalBlock[] };

export type LegalDoc = {
  slug: "legal-notice" | "privacy-policy";
  href: string;
  /** Footer and cross-link label. */
  label: string;
  eyebrow: string;
  title: string;
  intro: string;
  /** Metadata line shown under the hero. */
  meta: { term: string; value: Copy }[];
  /** Optional summary callout shown above the first section. */
  summary?: { label: string; items: string[] };
  sections: LegalSection[];
};

/**
 * Set to true once HAGER Investment and its legal advisers approve the two documents.
 * Until then the pages are noindex and kept out of the sitemap (they remain linked in the footer).
 */
export const LEGAL_APPROVED = false;

const pending = (what: string) => tbc(`[${what}]`, "");

const DRAFT = "Draft for company and legal review. Not yet approved for publication.";
export const draftNote = DRAFT;

const emailValue: Copy = contactDetails.email ?? pending("Company confirmation required");
const phoneValue: Copy = contactDetails.phone ?? pending("Company confirmation required, if applicable");

/* ---------------------------------------------------------------- Legal Notice */

export const legalNotice: LegalDoc = {
  slug: "legal-notice",
  href: "/legal-notice",
  label: "Legal Notice",
  eyebrow: "Corporate Information",
  title: "Legal Notice",
  intro: "Corporate information, website ownership and important terms concerning the use of HAGER INVESTMENT's official website.",
  meta: [
    { term: "Document", value: "Legal Notice" },
    { term: "Jurisdiction", value: "Luxembourg" },
    { term: "Last updated", value: pending("Date of approval") },
  ],
  sections: [
    {
      id: "company-identification",
      title: "Company Identification",
      blocks: [
        { type: "p", text: "HAGER INVESTMENT is a Luxembourg-based investment company established in 1993 and incorporated as a société anonyme (S.A.) under Luxembourg law." },
        {
          type: "facts",
          caption: "Corporate details",
          rows: [
            { term: "Legal Name", value: "HAGER INVESTMENT" },
            { term: "Legal Form", value: "Société Anonyme (S.A.)" },
            { term: "Country of Incorporation", value: "Grand Duchy of Luxembourg" },
            { term: "Trade and Companies Register", value: `RCS Luxembourg ${siteConfig.registration}` },
            { term: "Legal Entity Identifier", value: "5299000S19OU3ODKL056" },
            { term: "Established", value: siteConfig.foundingYear },
            { term: "Registered Office", value: "Rue de Turi 1, L-3378 Livange, Luxembourg" },
            { term: "Official Email", value: emailValue },
            { term: "Telephone", value: phoneValue },
            { term: "Business Permit / VAT", value: pending("Verify applicability and details") },
          ],
        },
        { type: "review", blocker: true, text: "LAUNCH BLOCKER: confirm the registered office, official email, telephone (if applicable) and business permit / VAT details against current corporate records. Unconfirmed fields stay hidden publicly." },
      ],
    },
    {
      id: "about",
      title: "About HAGER INVESTMENT",
      blocks: [
        { type: "p", text: "HAGER INVESTMENT is an investment company established in Luxembourg in 1993 and incorporated as a société anonyme (S.A.)." },
        { type: "p", text: "The company invests across a broad range of sectors and offers investment opportunities to investors and partners who share its long-term perspective." },
        { type: "p", text: "Prospective investors and partners are welcome to contact HAGER INVESTMENT directly to discuss current opportunities." },
      ],
    },
    {
      id: "website-information",
      title: "Website Information",
      blocks: [
        { type: "p", text: "This is the official website of HAGER INVESTMENT. It presents the company, its investment activities and the opportunities it offers." },
        { type: "p", text: "HAGER INVESTMENT may revise or update website materials where appropriate." },
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property",
      blocks: [
        { type: "p", text: "Unless otherwise indicated, original text, design elements, graphics and other proprietary materials published on this website are protected by applicable intellectual property laws." },
        { type: "p", text: "Unauthorised reproduction, redistribution or commercial exploitation of protected materials is not permitted without appropriate authorization. Third-party materials remain subject to the rights of their respective owners." },
      ],
    },
    {
      id: "accuracy",
      title: "Accuracy of Information",
      blocks: [
        { type: "p", text: "HAGER INVESTMENT seeks to present information clearly and responsibly. However, corporate information, market conditions and other website materials may change." },
        { type: "p", text: "For full details of any investment opportunity, please contact HAGER INVESTMENT directly." },
      ],
    },
    {
      id: "external-websites",
      title: "External Websites",
      blocks: [
        { type: "p", text: "This website may include links to third-party websites for additional information or convenience." },
        { type: "p", text: "Unless expressly stated otherwise, such links do not constitute endorsement of third-party content, products or services. HAGER INVESTMENT does not control the content or availability of independent external websites." },
      ],
    },
    {
      id: "applicable-law",
      title: "Applicable Law",
      blocks: [{ type: "p", text: "This website and its legal notices are intended to be interpreted in accordance with applicable Luxembourg law, without prejudice to mandatory legal provisions that may apply in other jurisdictions." }],
    },
    {
      id: "further-information",
      title: "Further Information",
      blocks: [
        { type: "p", text: "For corporate enquiries or questions concerning this website, please use the official contact information published on our Contact page." },
        { type: "link", link: { label: "Contact HAGER INVESTMENT", href: "/contact" } },
      ],
    },
  ],
};

/* -------------------------------------------------------------- Privacy Policy */

export const privacyPolicy: LegalDoc = {
  slug: "privacy-policy",
  href: "/privacy-policy",
  label: "Privacy Policy",
  eyebrow: "Data Protection",
  title: "Privacy Policy",
  intro: "Information about how personal data may be collected, processed and protected in connection with the HAGER INVESTMENT website.",
  meta: [
    { term: "Document", value: "Privacy Policy" },
    { term: "Framework", value: "GDPR · Luxembourg" },
    { term: "Effective date", value: pending("Date of approval") },
  ],
  sections: [
    {
      id: "introduction",
      title: "Introduction",
      blocks: [
        { type: "p", text: "HAGER INVESTMENT respects the privacy of individuals who visit its website or communicate with the company." },
        { type: "p", text: "This Privacy Policy explains the principal categories of personal data that may be processed, the purposes of processing and the rights available to individuals under applicable data protection law, including the EU General Data Protection Regulation (GDPR)." },
      ],
    },
    {
      id: "data-controller",
      title: "Data Controller",
      blocks: [
        { type: "p", text: "The controller responsible for personal data processed in connection with this website is:" },
        { type: "identity", lines: ["HAGER INVESTMENT", "Société Anonyme (S.A.)", `RCS Luxembourg ${siteConfig.registration}`, "Luxembourg"] },
        {
          type: "facts",
          caption: "Privacy contact",
          rows: [{ term: "Privacy contact", value: contactDetails.email ?? pending("Verified company email required") }],
        },
        { type: "review", blocker: true, text: "LAUNCH BLOCKER: insert the confirmed registered office and any mandatory data protection officer contact details where applicable." },
      ],
    },
    {
      id: "personal-data",
      title: "Personal Data and Sources",
      blocks: [
        { type: "p", text: "Depending on how an individual interacts with the website, relevant personal data may include:" },
        {
          type: "defs",
          items: [
            { term: "Website and technical information", body: "Internet Protocol (IP) address, browser or device information, access timestamps, requested pages and security-related technical records, where collected by the actual hosting infrastructure." },
            { term: "Correspondence information", body: "Name, business contact details, email address and information voluntarily supplied when an individual contacts HAGER INVESTMENT." },
            { term: "Preference information", body: "Cookie or website preferences, where applicable." },
          ],
        },
        { type: "review", text: "Reconcile these categories with the production website's actual data processing. Do not imply that data is collected when it is not." },
      ],
    },
    {
      id: "purposes",
      title: "Purposes and Legal Bases",
      blocks: [
        { type: "p", text: "Personal data may be processed, where applicable, for the following purposes:" },
        {
          type: "defs",
          items: [
            { term: "Responding to correspondence", body: "Handling enquiries and maintaining appropriate business communications." },
            { term: "Website operation and security", body: "Providing the website, maintaining technical stability, investigating errors and protecting against misuse." },
            { term: "Compliance obligations", body: "Meeting applicable legal and regulatory requirements where necessary." },
            { term: "Optional website functionality", body: "Providing features or measurement tools only where enabled and supported by an appropriate lawful basis." },
          ],
        },
        { type: "p", text: "Depending on the specific activity, processing may rely on legitimate interests, legal obligations, consent or steps requested before entering into a contract." },
        { type: "review", blocker: true, text: "LAUNCH BLOCKER: document the actual lawful basis for each implemented processing activity before publication." },
      ],
    },
    {
      id: "sharing",
      title: "Sharing of Personal Data",
      blocks: [
        { type: "p", text: "Where necessary, personal data may be made available to authorized service providers supporting website hosting, email delivery, information technology, security or other relevant operations." },
        { type: "p", text: "Personal data may also be disclosed where required by applicable law or to protect legitimate legal interests." },
        { type: "review", blocker: true, text: "LAUNCH BLOCKER: identify actual service-provider categories and recipients before final publication. Do not claim the use of providers that are not installed or contracted." },
      ],
    },
    {
      id: "international-transfers",
      title: "International Data Transfers",
      blocks: [
        { type: "p", text: "If personal data is transferred outside the European Economic Area, HAGER INVESTMENT will assess the applicable legal requirements and implement appropriate safeguards where required." },
        { type: "review", blocker: true, text: "LAUNCH BLOCKER: disclose any actual international transfers and the safeguards relied upon, following a production infrastructure and vendor review." },
      ],
    },
    {
      id: "retention",
      title: "Data Retention",
      blocks: [
        { type: "p", text: "Personal data should be retained only for periods appropriate to the relevant processing purpose and applicable legal obligations." },
        { type: "review", blocker: true, text: "LAUNCH BLOCKER: before publication, insert the actual retention periods or objective retention criteria for correspondence, website logs, security records and any other collected information. Do not invent retention periods or present this section as complete until the company's retention policy is confirmed." },
      ],
    },
    {
      id: "cookies",
      title: "Cookies and Similar Technologies",
      blocks: [
        { type: "p", text: "The website may use essential technologies required for normal operation and remembering necessary preferences." },
        { type: "p", text: "Any optional analytics, advertising or other non-essential tracking technologies must be identified and implemented in accordance with applicable consent requirements." },
        { type: "review", blocker: true, text: "LAUNCH BLOCKER: audit the actual production website and list relevant technologies, purposes, providers and retention periods. Do not claim that tracking is absent without verification." },
      ],
    },
    {
      id: "your-rights",
      title: "Your Data Protection Rights",
      blocks: [
        { type: "p", text: "Subject to applicable law, individuals may have the right to:" },
        {
          type: "list",
          items: [
            "Request access to their personal data.",
            "Request correction of inaccurate information.",
            "Request erasure in appropriate circumstances.",
            "Request restriction of certain processing.",
            "Object to processing where applicable.",
            "Request data portability where available.",
            "Withdraw consent where processing relies on consent.",
          ],
        },
        { type: "p", text: "Individuals may also lodge complaints with a competent supervisory authority, including Luxembourg's **Commission nationale pour la protection des données (CNPD)**." },
        { type: "link", link: { label: "Official CNPD website", href: "https://cnpd.public.lu/" }, external: true },
      ],
    },
    {
      id: "security",
      title: "Information Security",
      blocks: [
        { type: "p", text: "HAGER INVESTMENT recognizes the importance of appropriate technical and organizational safeguards for personal data." },
        { type: "p", text: "Specific security measures should reflect the nature of the information processed and the risks associated with the relevant processing activities." },
        { type: "review", text: "Do not describe particular certifications, encryption controls or security guarantees unless verified." },
      ],
    },
    {
      id: "updates",
      title: "Updates to This Policy",
      blocks: [
        { type: "p", text: "This Privacy Policy may be updated to reflect changes in website operations, data processing practices or applicable law." },
        { type: "p", text: "The effective date displayed at the top of this page should be updated when a revised policy is approved." },
      ],
    },
    {
      id: "privacy-enquiries",
      title: "Privacy Enquiries",
      blocks: [
        { type: "p", text: "Questions concerning this Privacy Policy or requests relating to personal data may be directed to HAGER INVESTMENT using its confirmed privacy contact details." },
        { type: "link", link: { label: "Contact Us", href: "/contact" } },
      ],
    },
  ],
};

export const legalDocs = [legalNotice, privacyPolicy] as const;
