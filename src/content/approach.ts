import statementBridgeWorks from "@/assets/images/ap-statement-bridge-works.jpg";
import { tbc } from "@/lib/content";

import type { Link, Photo } from "./home";

/* ==========================================================================
   Our Approach & Philosophy (AP-02). Copy as supplied by HAGER Investment.

   PROPOSED: the philosophy, the four evaluation stages and the considerations
   describe a way of thinking and are pending company approval (review-mode
   notes). They are not verified internal procedures, services, mandates or
   regulated activities, and imply no investment results.

   Photography is illustrative only and implies no association with any
   building, structure or company shown.
   ========================================================================== */

export const apHero = {
  eyebrow: "Our Approach",
  title: "A Considered Approach to Opportunity.",
  description: "Understanding context, evaluating complexity and maintaining a long-term perspective.",
  /** In-page section links beneath the hero. */
  sections: [
    { label: "Our Philosophy", href: "#philosophy" },
    { label: "Four Stages", href: "#stages" },
    { label: "Key Considerations", href: "#considerations" },
    { label: "Long-Term Perspective", href: "#statement" },
  ] satisfies Link[],
};

export const apPhilosophy = {
  eyebrow: "Our Philosophy",
  title: "Clarity Begins with Understanding.",
  body: "Every opportunity exists within a wider economic, commercial and strategic context. A considered perspective examines these relationships before forming conclusions.",
};

export type Stage = { name: string; body: string };

export const apStages = {
  eyebrow: "Strategic Thinking",
  title: "Four Stages of Considered Evaluation.",
  note: tbc("Proposed approach pending company approval: an illustration of a way of thinking, not a verified internal procedure.", ""),
  stages: [
    { name: "Understanding Opportunities", body: "Consider market conditions, industry developments and the wider context surrounding an opportunity." },
    { name: "Strategic Evaluation", body: "Examine commercial fundamentals, potential challenges and alignment with long-term objectives." },
    { name: "Disciplined Decisions", body: "Bring clarity to competing considerations through measured judgment and careful analysis." },
    { name: "Long-Term Perspective", body: "Consider resilience, relevance and the factors influencing outcomes over time." },
  ] satisfies Stage[],
};

export const apConsiderations = {
  eyebrow: "Key Considerations",
  title: "Looking at the Wider Picture.",
  note: tbc("Proposed considerations pending company approval.", ""),
  items: [
    { name: "Market Context", body: "Economic conditions, sector developments and changing demand." },
    { name: "Asset Fundamentals", body: "Quality, characteristics and long-term relevance." },
    { name: "Risk Awareness", body: "Uncertainty, dependencies and potential limitations." },
    { name: "Enduring Value", body: "Factors contributing to resilience and lasting significance." },
  ],
};

export const apStatement = {
  title: "Perspective Beyond the Immediate.",
  body: "Long-term thinking brings context to the present and a wider understanding of what may shape the future.",
  image: { src: statementBridgeWorks, alt: "A long bridge under construction reaching across open ground beneath a pale sky" } satisfies Photo,
};

export const apClosing = {
  title: "Explore Our Areas of Expertise.",
  body: "Discover the disciplines and perspectives presented across HAGER INVESTMENT.",
  cta: { label: "Explore Our Expertise", href: "/expertise" } satisfies Link,
};

/* ---------------------------------------------------------------------------
   AP-03: working with HAGER INVESTMENT. Three routes for different visitors,
   each pointing to the existing page that serves them. PROPOSED copy pending
   company approval; it implies no specific services, mandates or terms.
   --------------------------------------------------------------------------- */
export const apPaths = {
  eyebrow: "Working With Us",
  title: "Find the Right Starting Point.",
  note: tbc("Proposed routes and wording pending company approval: no specific services, mandates or terms are implied.", ""),
  paths: [
    { audience: "Investors & partners", name: "Explore the sectors we follow", body: "Seven sectors across the physical economy, digital transformation and healthcare.", link: { label: "Investment Universe", href: "/investment-universe" } },
    { audience: "Businesses & owners", name: "Understand our disciplines", body: "Six disciplines spanning strategy, assets, transactions and corporate development.", link: { label: "Expertise & Services", href: "/expertise" } },
    { audience: "Corporate enquiries", name: "Start a conversation", body: "For corporate enquiries and further information about HAGER INVESTMENT.", link: { label: "Contact", href: "/contact" } },
  ] satisfies { audience: string; name: string; body: string; link: Link }[],
};
