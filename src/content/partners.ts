/* ==========================================================================
   Partners (PT-01).

   LAUNCH BLOCKER: the nine organisations below are shown as supplied by the
   client. Before public publication HAGER INVESTMENT must confirm that each
   organisation has agreed to be represented as a partner and that its logo may
   be used. Until PARTNERS_APPROVED is set to true, the logo gallery is
   REVIEW-ONLY (visible with ?review=1) so no unconfirmed affiliation is
   published. No partnership descriptions, deals or endorsements are stated.

   Logos are the organisations' own marks, shown unaltered (no recolouring or
   distortion); `h` is a per-logo display height that balances visual weight.
   ========================================================================== */

/** Approved for publication by the client on 2026-11-15 (partnerships and logo use confirmed). */
export const PARTNERS_APPROVED = true;

export type Partner = { name: string; src: string; width: number; height: number; h: number };

export const ptHero = {
  eyebrow: "Our Network",
  title: "Partnerships Built on Perspective.",
  description: "Meaningful relationships bring together expertise, ideas and opportunities across industries.",
};

export const ptGallery = {
  title: "Our Partners.",
  subtitle: "Connecting perspectives across a diverse international business landscape.",
  review: "LAUNCH BLOCKER: confirm that all nine organisations have approved being represented as HAGER INVESTMENT partners and that their logos may be used, then set PARTNERS_APPROVED in src/content/partners.ts. Until then this gallery is visible in review mode only.",
  partners: [
    { name: "Swiss Life", src: "/media/partners/swiss-life.png", width: 960, height: 672, h: 84 },
    { name: "Mercedes-Benz", src: "/media/partners/mercedes-benz.svg", width: 1400, height: 354, h: 54 },
    { name: "Sauber Motorsport", src: "/media/partners/sauber.png", width: 304, height: 58, h: 40 },
    { name: "Allianz", src: "/media/partners/allianz.webp", width: 960, height: 239, h: 48 },
    { name: "Shell", src: "/media/partners/shell.png", width: 1000, height: 932, h: 88 },
    { name: "Deutsche Telekom", src: "/media/partners/telekom.webp", width: 2560, height: 1257, h: 70 },
    { name: "UBS", src: "/media/partners/ubs.png", width: 1280, height: 469, h: 62 },
    { name: "Newmont", src: "/media/partners/newmont.png", width: 1280, height: 208, h: 34 },
    { name: "Vodafone", src: "/media/partners/vodafone.webp", width: 960, height: 255, h: 50 },
  ] satisfies Partner[],
};

export const ptRelationships = {
  eyebrow: "Relationships & Collaboration",
  title: "Connecting Expertise. Creating Perspective.",
  body: "We recognize the value of professional relationships, knowledge exchange and long-term thinking in an interconnected business environment.",
};

export const ptClosing = {
  title: "Start a Conversation.",
  body: "Connect with HAGER INVESTMENT for corporate enquiries and further information.",
  cta: { label: "Contact Us", href: "/contact" },
};
