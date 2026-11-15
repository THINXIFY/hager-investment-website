import heroInterior from "@/assets/images/ex-hero-glass-interior.jpg";
import { tbc } from "@/lib/content";

import type { Link, Photo } from "./home";

/* ==========================================================================
   Services & Expertise (EX-02 redesign). Copy as supplied by HAGER Investment.

   PROPOSED: the six services and the three principles are content concepts
   pending company approval (review-mode notes). They do not describe services
   currently offered, regulated activities, licences or authorisations; no
   service detail pages exist (each service has an in-page anchor only).

   Photography is illustrative only and implies no association with any
   building, structure or company shown.
   ========================================================================== */

export const exHero = {
  eyebrow: "Services & Expertise",
  title: "Expertise Across Capital and Business.",
  description: "Explore the disciplines that inform strategic thinking across capital, assets, transactions and corporate development.",
  jump: { label: "View the six disciplines", href: "#services" } satisfies Link,
  image: { src: heroInterior, alt: "A dark, glass-walled interior where warm light glows through a perforated metal screen" } satisfies Photo,
};

export type ServiceItem = { slug: string; name: string; body: string };

export const exServices = {
  title: "Explore Our Areas of Expertise.",
  intro: "Six interconnected disciplines offering different perspectives on investment and corporate development.",
  note: tbc("Proposed service areas pending company approval: not a statement of services currently offered or of regulatory authorisation.", ""),
  items: [
    { slug: "investment-strategy", name: "Investment Strategy", body: "Market context, opportunity evaluation and long-term capital decisions." },
    { slug: "asset-management", name: "Asset Management", body: "Asset quality, oversight and the factors influencing enduring value." },
    { slug: "mergers-acquisitions", name: "Mergers & Acquisitions", body: "Strategic transactions, corporate combinations and business alignment." },
    { slug: "corporate-advisory", name: "Corporate Advisory", body: "Business direction, organizational transformation and strategic growth." },
    { slug: "real-estate-investment", name: "Real Estate Investment", body: "Property fundamentals, location quality and the relevance of real assets." },
    { slug: "private-equity", name: "Private Equity", body: "Private-market opportunities, business development and long-term perspectives." },
  ] satisfies ServiceItem[],
};

export const exFeature = {
  eyebrow: "Strategic Perspective",
  title: "Clarity Through Strategic Perspective.",
  body: "Understanding context, evaluating complexity and considering long-term implications provide a broader framework for strategic decisions.",
  /** The three ideas in the statement, set large in the background. */
  words: ["Context", "Complexity", "Implications"],
};

export const exThinking = {
  eyebrow: "Our Thinking",
  title: "A Considered Approach to Opportunity.",
  note: tbc("Proposed editorial principles, not verified internal company procedures. Pending company approval.", ""),
  items: [
    { name: "Understanding Context", body: "Consider the economic, commercial and operational factors surrounding an opportunity." },
    { name: "Evaluating Complexity", body: "Examine the relationship between opportunities, uncertainty and strategic priorities." },
    { name: "Maintaining Perspective", body: "Balance immediate considerations with long-term consequences." },
  ],
};

export const exClosing = {
  eyebrow: "Explore Further",
  title: "Explore the Broader Investment Landscape.",
  body: "Discover the industries and developments shaping our investment perspectives.",
  cta: { label: "Explore Investment Universe", href: "/investment-universe" } satisfies Link,
};
