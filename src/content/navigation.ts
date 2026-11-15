import { expertise } from "./home";
import { ivHero, ivSectors } from "./investment-universe";

/* ==========================================================================
   Header mega-panels (Editorial Mega-Panel). Derived from the existing sector
   and expertise content so navigation never drifts from the pages themselves.
   ========================================================================== */

export const megaInvestments = {
  id: "mega-investments",
  href: "/investment-universe",
  eyebrow: "Investment Universe",
  title: "Understanding the Industries Shaping Tomorrow.",
  body: "Eleven sectors across three perspectives, each with its long-term drivers and investment focus.",
  image: ivHero.image,
  groups: ivSectors.groups.map((g) => ({
    id: g.id,
    name: g.name,
    sectors: g.sectors.map((s) => ({ slug: s.slug, name: s.name, body: s.body, image: s.image, focus: s.focus, href: `/investment-universe/${s.slug}` })),
  })),
  all: { label: `Explore all ${ivSectors.groups.reduce((n, g) => n + g.sectors.length, 0)} sectors`, href: "/investment-universe#sectors" },
};

export const megaExpertise = {
  id: "mega-expertise",
  href: "/expertise",
  eyebrow: "Expertise & Services",
  title: "Six Interconnected Disciplines.",
  body: "Different perspectives on investment and corporate development, from strategy to private markets.",
  items: expertise.items.map((s) => ({ slug: s.slug, name: s.name, body: s.body, href: `/expertise/${s.slug}` })),
  all: { label: "Explore Expertise & Services", href: "/expertise" },
};

/** Primary-nav routes that open a mega-panel. */
export const megaFor = (href: string) => (href === megaInvestments.href ? "investments" : href === megaExpertise.href ? "expertise" : null);
export type MegaKey = "investments" | "expertise";
