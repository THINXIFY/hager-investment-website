import energyTurbine from "@/assets/images/in-energy-turbine.jpg";
import featureIndustrialHall from "@/assets/images/in-feature-industrial-hall.jpg";
import featuredMeetingRoom from "@/assets/images/in-featured-meeting-room.jpg";
import industryFreightYard from "@/assets/images/in-industry-freight-yard.jpg";
import marketsFacadeLines from "@/assets/images/in-markets-facade-lines.jpg";
import marketsInterchange from "@/assets/images/in-markets-interchange.jpg";
import realAssetsBalconies from "@/assets/images/in-real-assets-balconies.jpg";
import technologyFibre from "@/assets/images/in-technology-fibre.jpg";
import { tbc } from "@/lib/content";

import type { Link, Photo } from "./home";

/* ==========================================================================
   Insights & Perspectives (IN-01). Copy as supplied by HAGER Investment.

   SAMPLE CONTENT: every article is a sample concept, not published company
   research. Each is labelled "Sample · Not Published" on the public site and
   carries a review-mode note. No authors, publication dates, reading times or
   research findings are shown, and no article pages exist yet: each entry
   opens an accessible in-page summary instead of a link.

   Photography is illustrative only and implies no association with any
   building, operator or company shown.
   ========================================================================== */

export const SAMPLE_LABEL = "Sample · Not Published";

export const inHero = {
  eyebrow: "Insights & Perspectives",
  title: "Ideas, Industries and Perspectives.",
  description: "Exploring the developments, industries and broader considerations influencing today's economic landscape.",
};

export type Category = "Markets" | "Energy" | "Technology" | "Real Assets" | "Industry";
export const CATEGORIES: Category[] = ["Markets", "Energy", "Technology", "Real Assets", "Industry"];

export type Article = { id: string; category: Category; title: string; excerpt: string; image: Photo };

export const inFeatured: Article = {
  id: "long-term-capital-in-changing-markets",
  category: "Markets",
  title: "Long-Term Capital in Changing Markets",
  excerpt: "Changing financial conditions can influence investment decisions, capital allocation and the importance of long-term perspective.",
  image: { src: featuredMeetingRoom, alt: "A meeting room with long glass windows overlooking a dense city" },
};

export const inDirectory = {
  title: "Explore Our Latest Perspectives.",
  note: tbc("Sample article concepts, not published company research. Pending company approval; full articles to follow.", ""),
  articles: [
    {
      id: "energy-transition-infrastructure",
      category: "Energy",
      title: "The Infrastructure Behind Europe's Energy Transition",
      excerpt: "Generation, storage and distribution networks remain central to changing energy systems.",
      image: { src: energyTurbine, alt: "A wind turbine and its blades against a cloudy sky" },
    },
    {
      id: "digital-infrastructure",
      category: "Technology",
      title: "The Growing Importance of Digital Infrastructure",
      excerpt: "Connectivity, computing capacity and digital systems support modern business development.",
      image: { src: technologyFibre, alt: "Fibre-optic cables connected to a network switch" },
    },
    {
      id: "real-estate-lasting-relevance",
      category: "Real Assets",
      title: "What Gives Real Estate Lasting Relevance?",
      excerpt: "Location, demand and asset fundamentals remain important considerations across property markets.",
      image: { src: realAssetsBalconies, alt: "The repeating balconies of a large apartment building" },
    },
    {
      id: "evolving-supply-chains",
      category: "Industry",
      title: "How Global Supply Chains Continue to Evolve",
      excerpt: "Transport networks, logistics infrastructure and industrial connectivity shape international commerce.",
      image: { src: industryFreightYard, alt: "Rows of freight wagons in a rail yard, seen from above" },
    },
    {
      id: "structural-change-across-industries",
      category: "Markets",
      title: "Understanding Structural Change Across Industries",
      excerpt: "Economic transformation often reflects the interaction of technology, infrastructure and changing demand.",
      image: { src: marketsFacadeLines, alt: "A dark facade of repeating vertical lines in black and white" },
    },
    {
      id: "why-long-term-perspective-matters",
      category: "Markets",
      title: "Why Long-Term Perspective Still Matters",
      excerpt: "A considered view can help place short-term developments within a broader context.",
      image: { src: marketsInterchange, alt: "A city interchange at dusk with roads curving towards a skyline" },
    },
  ] satisfies Article[],
};

export const inFeature = {
  eyebrow: "A Broader Perspective",
  title: "Understanding Change Beyond the Headlines.",
  body: "Markets and industries evolve through interconnected developments. Looking beyond individual events can help reveal the wider forces influencing economic activity.",
  image: { src: featureIndustrialHall, alt: "A vast industrial hall with a long glazed roof, a single figure walking through it" } satisfies Photo,
};

export const inClosing = {
  title: "Explore the Wider Investment Landscape.",
  body: "Discover the sectors and strategic perspectives presented across HAGER INVESTMENT.",
  cta: { label: "Investment Universe", href: "/investment-universe" } satisfies Link,
};
