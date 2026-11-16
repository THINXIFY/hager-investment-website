import themeClarity from "@/assets/images/about-theme-clarity-glass.jpg";
import themeContinuity from "@/assets/images/about-theme-continuity-arches.jpg";
import themePerspective from "@/assets/images/about-theme-perspective-city.jpg";
import { tbc } from "@/lib/content";

import { corporate, type Link, type Photo } from "./home";

/* About photography supplied by the company (public/media, 2026-11-16) */
import whoWeAreImage from "../../public/media/about-page-who-we-are-img.jpg";
import widerViewImage from "../../public/media/about-page-wider-view-background.webp";

/* ==========================================================================
   About Us content (AB-01).

   VERIFIED: Luxembourg-registered société anonyme, corporate history dating
   to 1993, RCS B44483, LEI 5299000S19OU3ODKL056.

   PROPOSED: the three perspective themes are brand concepts pending company
   approval (review-mode note). No milestones, people, figures or affiliations.

   Photography is illustrative architecture: no building shown is owned,
   occupied or developed by HAGER Investment, and none is used elsewhere.
   ========================================================================== */

export const aboutHero = {
  eyebrow: "About HAGER INVESTMENT",
  titleLead: "Rooted in Experience.",
  titleEmphasis: "Looking Beyond Tomorrow.",
  supporting: "A Luxembourg-established company with a corporate history dating to 1993.",
  /** Background film (decorative, muted, looping). Illustrative footage: no association with any building shown. */
  film: {
    src: "/videos/about-hero.mp4",
    poster: "/videos/about-hero-poster.jpg",
  },
};

export const aboutCompany = {
  eyebrow: "Who We Are",
  titleLead: "Established Roots.",
  titleEmphasis: "Contemporary Outlook.",
  body: "HAGER INVESTMENT is a Luxembourg-registered société anonyme established in 1993. Its corporate history forms part of an identity grounded in continuity and an outlook toward the future.",
  image: {
    src: whoWeAreImage,
    alt: "Contemporary glass office buildings along a sunlit street under a clear blue sky",
  } satisfies Photo,
};

export const aboutHeritage = {
  eyebrow: "Our Foundations",
  titleLead: "Since 1993.",
  titleEmphasis: "Established in Luxembourg.",
  body: `Registered under ${corporate.registration}, HAGER INVESTMENT's history reaches back to 1993, reflecting more than three decades of corporate existence.`,
  startYear: Number(corporate.established),
};

/** A brand theme: name, short definition, an "in practice" line and one photograph. */
export type Theme = { name: string; body: string; practice: string; image: Photo & { position?: string } };

export const aboutPerspective = {
  eyebrow: "Our Perspective",
  title: "Thinking Beyond the Immediate.",
  intro:
    "Perspective begins with understanding the wider picture, appreciating complexity and recognizing the importance of time.",
  /** Proposed supporting copy (covered by the review note). */
  supporting: "Three ideas shape how HAGER INVESTMENT looks at information, opportunities and relationships: a wider view, clear thinking and a long horizon.",
  note: tbc("Proposed brand themes and supporting copy: content concept pending company approval.", ""),
  themes: [
    {
      name: "Perspective",
      body: "Looking beyond immediate developments to understand the broader context.",
      practice: "Each development is considered within its economic, sector and long-term setting before conclusions are drawn.",
      image: { src: themePerspective, alt: "An expansive city seen from height, stretching towards a distant horizon", position: "50% 60%" },
    },
    {
      name: "Clarity",
      body: "Bringing considered thinking to complex questions and possibilities.",
      practice: "Complex questions are reduced to their essential elements, so that decisions rest on what matters most.",
      image: { src: themeClarity, alt: "Daylight falling through a glass roof onto a sculpted white staircase", position: "62% 50%" },
    },
    {
      name: "Continuity",
      body: "Recognizing the relevance of lasting relationships and long-term considerations.",
      practice: "Relationships, commitments and decisions are viewed across years rather than individual moments.",
      image: { src: themeContinuity, alt: "A long colonnade of white arches receding into the distance", position: "50% 55%" },
    },
  ] satisfies Theme[],
};

export const aboutForward = {
  eyebrow: "Looking Ahead",
  title: "A Wider View of a Changing World.",
  /** The first three sentences become the cinematic statements over the image. */
  statements: ["Industries evolve.", "Markets transform.", "New possibilities emerge."],
  body: "Understanding these changes requires context, perspective and a thoughtful view of the future.",
  cta: { label: "Explore Our Investment Universe", href: "/investment-universe" } satisfies Link,
  image: {
    src: widerViewImage,
    alt: "Terracotta rooftops of a historic European city rising towards a cathedral",
  } satisfies Photo,
};

export const aboutCorporate = {
  eyebrow: "Company Information",
  title: "Our Corporate Foundations.",
  /** Copyable values carry `copy: true`. */
  details: [
    { label: "Company", value: "HAGER INVESTMENT" },
    { label: "Legal form", value: "Société Anonyme (S.A.)" },
    { label: "Jurisdiction", value: corporate.country },
    { label: "Established", value: corporate.established },
    { label: "Trade and Companies Register", value: `RCS ${corporate.registration}`, copy: true },
    { label: "Legal Entity Identifier (LEI)", value: corporate.lei, copy: true },
  ],
};

export const aboutClosing = {
  eyebrow: "Connect With Us",
  titleLead: "Perspective Begins",
  titleEmphasis: "with a Conversation.",
  body: "For corporate enquiries and further information, connect with HAGER INVESTMENT.",
  cta: { label: "Get in Touch", href: "/contact" } satisfies Link,
};
