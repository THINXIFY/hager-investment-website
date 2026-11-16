export type NavItem = { label: string; href: string };

export const siteConfig = {
  name: "HAGER Investment",
  shortName: "HAGER",
  tagline: "Patient capital for enduring value.",
  description:
    "HAGER INVESTMENT is a Luxembourg-established company with a corporate history dating to 1993.",
  /** Canonical production domain (www redirects here). NEXT_PUBLIC_SITE_URL overrides it, e.g. for staging. */
  url: process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://hager-investment.com",
  locale: "en_GB",
  /** Confirmed by HAGER Investment. */
  foundingYear: "1993",
  country: "LU",
  registration: "B44483",
  /** Legal Entity Identifier (public GLEIF record). */
  lei: "5299000S19OU3ODKL056",
  /** Public company-register record (RCS B44483) on Pappers.lu; supplied by the company. */
  registerUrl: "https://www.pappers.lu/en/company/hager-investment-B44483",
  /** Company register extract (PDF, Pappers.lu, 2026-11-15); supplied by the company for public download. */
  registerPdf: "/document/hager-investment-register-extract-B44483.pdf",
} as const;

/** Every primary navigation item is its own page. Insights & Perspectives is postponed (HD-03) and kept out of public navigation. */
export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Investments", href: "/investment-universe" },
  { label: "Expertise", href: "/expertise" },
  { label: "Approach", href: "/approach" },
  { label: "Partners", href: "/partners" },
];

/** The Contact page (there is no contact form anywhere on the site). */
export const contactNavItem: NavItem = { label: "Contact", href: "/contact" };

/**
 * Official contact details, shown on /contact only once set.
 *
 * LAUNCH BLOCKER: HAGER Investment has not yet confirmed an email address, telephone number
 * or office address. Until a value is set, the Contact page shows neutral wording publicly and
 * a dashed launch-blocker note in review mode (?review=1); it never displays a placeholder as
 * a real detail. Email and telephone can be set in code here or at deployment through
 * NEXT_PUBLIC_CONTACT_EMAIL / NEXT_PUBLIC_CONTACT_PHONE (telephone in international format,
 * e.g. "+352 …"). Do NOT reuse the legacy static-site placeholders (Zürich/Frankfurt offices,
 * info@…, +41 00 …): none of them are verified.
 */
export const contactDetails: {
  email: string | null;
  phone: string | null;
  /** Postal address lines. */
  address: readonly string[] | null;
} = {
  /* Official general enquiries address supplied by the company (2026-11-15). */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "info@hager-investment.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || null,
  /* Registered office per the public LEI record; publication approved by the user on 2026-11-15
     (still to be confirmed against current RCS records before launch). */
  address: ["Rue de Turi 1", "L-3378 Livange", "Luxembourg"],
};

/** Footer "Company" column (FT-02). Insights & Perspectives is postponed and kept out of the footer. */
export const footerNav: NavItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/team" },
  { label: "Investment Universe", href: "/investment-universe" },
  { label: "Expertise & Services", href: "/expertise" },
  { label: "Our Approach", href: "/approach" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
];

/**
 * Impressum (IM-01) is kept out of production until approved: while IMPRESSUM_APPROVED is false the
 * route returns 404 and is not linked, unless NEXT_PUBLIC_SHOW_DRAFTS=1 is set (local / staging preview).
 */
/* Published at the company's request (2026-11-16). */
export const IMPRESSUM_APPROVED = true;
export const impressumVisible = IMPRESSUM_APPROVED || process.env.NEXT_PUBLIC_SHOW_DRAFTS === "1";

/** The legal collection: linked in the footer only, never the header. */
export const legalNav: NavItem[] = [
  { label: "Legal Notice", href: "/legal-notice" },
  ...(impressumVisible ? [{ label: "Impressum", href: "/impressum" }] : []),
  { label: "Privacy Policy", href: "/privacy-policy" },
];
