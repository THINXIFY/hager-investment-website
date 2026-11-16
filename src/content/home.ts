import type { StaticImageData } from "next/image";

import heroFilmPoster from "@/assets/images/hero-film-poster.jpg";
import heroGrowth from "@/assets/images/hero-growth.jpg";
import insightCorporate from "@/assets/images/insight-corporate.jpg";
import insightEnergy from "@/assets/images/insight-energy.jpg";
import insightMarkets from "@/assets/images/insight-markets.jpg";
import sectorAi from "@/assets/images/sector-ai.jpg";
import sectorEnergy from "@/assets/images/sector-energy.jpg";
import sectorHealthcare from "@/assets/images/sector-healthcare.jpg";
import sectorIndustrial from "@/assets/images/sector-industrial.jpg";
import sectorLogistics from "@/assets/images/sector-logistics.jpg";
import sectorTechnology from "@/assets/images/sector-technology.jpg";
import { tbc, type Copy } from "@/lib/content";

/* Homepage photography supplied by the company (public/media, 2026-11-16) */
import homeBuildingPerspective from "../../public/media/home-building-perspective.jpg";
import homeSlide2 from "../../public/media/home-slide-2.jpg";
import homeAboutTeam from "../../public/media/homepage-about.webp";
import homeAssetManagement from "../../public/media/expertise-home-asset-managementr.jpg";
import homeInvestmentStrategy from "../../public/media/expertise-home-investment-strategy.jpg";
import homeRealEstateDusk from "../../public/media/investment-homepage-real-estate.jpg";
import homeRealEstateRooftops from "../../public/media/investment-universe-home-real-estate.webp";

/* ==========================================================================
   Homepage content.

   VERIFIED (confirmed by HAGER Investment): Luxembourg-established, corporate
   history dating to 1993, company registration B44483.

   PROPOSED (content concepts pending company approval): investment sectors,
   services, process stages and brand principles. They are written as
   perspective, never as claims of activity, and carry a review-mode note.

   Every photograph is used exactly once on the page.
   ========================================================================== */

export type Photo = { src: StaticImageData; alt: string };
export type Link = { label: string; href: string };

/** Review-mode note shown on proposed content (hidden on the public site). */
const PENDING = (what: string) => tbc(`${what}: content concept pending company approval.`, "");

/* ---------- Verified corporate facts ---------- */
export const corporate = {
  established: "1993",
  country: "Luxembourg",
  registration: "B44483",
  legalForm: "société anonyme",
  /** Legal Entity Identifier, supplied by HAGER Investment (AB-01 brief). */
  lei: "5299000S19OU3ODKL056",
  summary: "HAGER INVESTMENT is a Luxembourg-established company with a corporate history dating to 1993.",
};

/* ---------- 01 Hero slider (proposed marketing language, not performance claims) ---------- */
export type HeroSlide = {
  id: string;
  /** Short label used by the slider navigation. */
  label: string;
  eyebrow: string;
  /** Exactly two lines; wrap words in *asterisks* for the lighter italic accent. */
  titleLines: [string, string];
  cta: Link;
  image: Photo;
  /** CSS object-position: keeps each photograph's subject framed on every screen size. */
  focus: string;
  /** Optional ambient film (muted loop) played over the image, which doubles as its poster. */
  video?: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "patient-capital",
    label: "Patient Capital",
    eyebrow: "Established in Luxembourg · 1993",
    titleLines: ["Patient Capital.", "*Enduring Perspective.*"],
    cta: { label: "Discover HAGER INVESTMENT", href: "#about" },
    image: { src: heroFilmPoster, alt: "Glass towers reflecting a golden evening sky, seen from below" },
    focus: "50% 50%",
    /** Supplied ambient film, compressed for the web (24 MB → 3.5 MB) and served from the site. */
    video: "/videos/home-hero.mp4",
  },
  {
    id: "perspectives",
    label: "Perspectives",
    eyebrow: "Investment Perspectives",
    titleLines: ["Looking Beyond", "*the Immediate.*"],
    cta: { label: "Explore Our Investment Universe", href: "/investment-universe" },
    image: { src: homeSlide2, alt: "Silhouettes of people in a bright office, overlaid with market charts and data" },
    focus: "56% 40%",
  },
  {
    id: "approach",
    label: "Our Approach",
    eyebrow: "Our Approach",
    titleLines: ["A Considered View", "*of What Comes Next.*"],
    cta: { label: "Discover Our Approach", href: "/approach" },
    image: { src: heroGrowth, alt: "A hand in a dark suit pointing to an illustrative rising bar chart" },
    focus: "72% 45%",
  },
];

/* ---------- 02 About ---------- */
export const about = {
  eyebrow: "About HAGER INVESTMENT",
  titleLead: "A Foundation of Experience.",
  titleEmphasis: "A Perspective on Tomorrow.",
  body: "HAGER INVESTMENT is a Luxembourg-established company with a corporate history dating to 1993.",
  detail: "Established 1993 · Luxembourg",
  cta: { label: "Discover Our Company", href: "/about" },
  /** Illustrative architecture only: no ownership or occupancy is implied. */
  image: { src: homeAboutTeam, alt: "Business professionals standing outside a contemporary glass and timber office building" },
};

/* ---------- 03 Investment universe (PROPOSED) ---------- */
export type Sector = {
  slug: string;
  name: string;
  summary: string;
  image: Photo;
};

export const sectors = {
  eyebrow: "Our Investment Universe",
  title: "Exploring Opportunities Across Industries.",
  intro: "A broad perspective on the sectors shaping tomorrow's economy, each viewed through the same long-term lens.",
  note: PENDING("Proposed investment sectors"),
  items: [
    {
      slug: "real-estate",
      name: "Real Estate",
      summary: "Well-located, well-managed real assets with the resilience to endure across market cycles.",
      image: { src: homeRealEstateDusk, alt: "A residential district beside a lake at sunset, its windows lit" },
    },
    {
      slug: "energy",
      name: "Energy",
      summary: "The infrastructure of the energy transition, from renewable generation to the grids that carry it.",
      image: { src: sectorEnergy, alt: "Wind turbines on rolling hills under a cloudy sky" },
    },
    {
      slug: "technology",
      name: "Technology",
      summary: "The platforms and infrastructure that underpin an increasingly digital economy.",
      image: { src: sectorTechnology, alt: "Close-up of a printed circuit board and processor" },
    },
    {
      slug: "artificial-intelligence",
      name: "Artificial Intelligence",
      summary: "Applied intelligence that is reshaping how industries operate, decide and grow.",
      image: { src: sectorAi, alt: "Abstract network of connected lines and nodes" },
    },
    {
      slug: "healthcare",
      name: "Healthcare",
      summary: "Innovation and capacity across care, life sciences and medical technology.",
      image: { src: sectorHealthcare, alt: "Laboratory pipette dispensing into a tray of sample tubes" },
    },
    {
      slug: "logistics",
      name: "Logistics",
      summary: "The networks, hubs and corridors that keep European trade moving.",
      image: { src: sectorLogistics, alt: "Aerial view of a container port with cranes and stacked containers" },
    },
    {
      slug: "industrial-development",
      name: "Industrial Development",
      summary: "Modern industrial capability, from advanced manufacturing to the sites that enable it.",
      image: { src: sectorIndustrial, alt: "Sparks from metalwork in an industrial workshop" },
    },
  ] satisfies Sector[],
};

/* ---------- 04 Expertise & services (PROPOSED capability descriptions) ---------- */
/**
 * Mosaic surface for each service:
 *  - "photo": photographic panel (2 large + 1 small across the gallery)
 *  - "paper": off-white typographic panel
 *  - "ink":   black typographic panel
 */
export type ServiceSurface = "photo" | "paper" | "ink";
export type Service = { slug: string; name: string; body: string; surface: ServiceSurface; image?: Photo };

export const expertise = {
  eyebrow: "Our Expertise & Services",
  title: "Expertise Guided by Strategic Perspective.",
  intro: "A considered perspective on capital, corporate development and opportunities for long-term value creation.",
  note: PENDING("Proposed capability descriptions, not verified regulated services"),
  cta: { label: "Explore Our Expertise", href: "/expertise" },
  items: [
    {
      slug: "investment-strategy",
      name: "Investment Strategy",
      body: "Understanding opportunities through research, market context and long-term thinking.",
      surface: "photo",
      image: { src: homeInvestmentStrategy, alt: "A team in a meeting room reviewing a chart presented on a screen" },
    },
    {
      slug: "asset-management",
      name: "Asset Management",
      body: "Perspectives on asset quality, oversight and sustainable value.",
      surface: "photo",
      image: { src: homeAssetManagement, alt: "Advisers around a table reviewing charts on a tablet and printed reports" },
    },
    {
      slug: "mergers-acquisitions",
      name: "Mergers & Acquisitions",
      body: "Examining strategic alignment, business combinations and corporate development.",
      surface: "ink",
    },
    {
      slug: "corporate-advisory",
      name: "Corporate Advisory",
      body: "Strategic perspectives on business direction, transformation and growth.",
      surface: "paper",
    },
    {
      slug: "private-equity",
      name: "Private Equity",
      body: "Exploring private-market opportunities through disciplined evaluation.",
      surface: "ink",
    },
    {
      slug: "real-estate-investment",
      name: "Real Estate Investment",
      body: "Considering location, asset fundamentals and enduring property value.",
      surface: "photo",
      image: { src: homeRealEstateRooftops, alt: "City rooftops and apartment buildings under a clear sky" },
    },
  ] satisfies Service[],
};

/* ---------- 05 Corporate statement ---------- */
export const statement = {
  titleLead: "Building Perspective.",
  titleEmphasis: "Creating Possibility.",
  body: "Every opportunity begins with a broader perspective on what matters today and what may endure tomorrow.",
  cta: { label: "Explore Our Approach", href: "/approach" },
  /** Illustrative architecture only: no ownership or occupancy is implied. */
  image: { src: homeBuildingPerspective, alt: "A curved glass tower and the sky framed by an oval opening, seen from below" },
};

/* ---------- 06 Approach (PROPOSED, conceptual) ---------- */
export const approach = {
  eyebrow: "Our Investment Approach",
  title: "A Considered Approach to Long‑Term Value.", // non-breaking hyphen keeps "Long-Term" together
  intro: "Four stages that describe how every opportunity is considered, from first understanding to lasting perspective.",
  note: PENDING("Conceptual process"),
  steps: [
    {
      title: "Understanding Opportunities",
      body: "Every opportunity begins with context: the market, the asset and the people behind it, understood on their own terms.",
    },
    {
      title: "Strategic Evaluation",
      body: "Rigorous analysis of fundamentals, risks and scenarios, testing whether an opportunity holds up under scrutiny.",
    },
    {
      title: "Disciplined Decisions",
      body: "Clear criteria, measured judgement and the willingness to walk away when the terms are not right.",
    },
    {
      title: "Long-Term Perspective",
      body: "Commitment that extends beyond the decision itself, with value measured over years rather than quarters.",
    },
  ],
};

/* ---------- 07 Corporate foundations (VERIFIED) ---------- */
export const foundations = {
  eyebrow: "Corporate Foundations",
  titleLead: "Established Roots.",
  titleEmphasis: "A Forward‑Looking Perspective.", // non-breaking hyphen
  description: "Established in 1993, HAGER INVESTMENT is a Luxembourg-registered société anonyme.",
  /** The monumental year carries "Established"; the ledger lists the other verified details. */
  yearLabel: "Established",
  facts: [
    { value: corporate.country, label: "Jurisdiction" },
    { value: "Société anonyme", label: "Legal form" },
    { value: corporate.registration, label: "Company Registration" },
  ],
};

/* ---------- 08 Philosophy (PROPOSED brand principles) ---------- */
export const philosophy = {
  eyebrow: "Our Investment Philosophy",
  titleLead: "Built on Perspective.",
  titleEmphasis: "Guided by Principles.",
  intro: "A long-term perspective is strengthened by thoughtful analysis, clarity of purpose and measured decisions.",
  note: PENDING("Proposed brand principles"),
  principles: [
    {
      numeral: "I",
      title: "Long-Term Thinking",
      body: "Looking beyond immediate market movements toward durable value and lasting relevance.",
    },
    {
      numeral: "II",
      title: "Strategic Discipline",
      body: "Applying clear thinking and considered evaluation to complex opportunities.",
    },
    {
      numeral: "III",
      title: "Responsible Decision-Making",
      body: "Considering broader implications when assessing long-term outcomes.",
    },
  ],
};

/* ---------- 09 Insights (SAMPLE, not published) ---------- */
export type Insight = {
  category: string;
  title: string;
  excerpt: string;
  /** Public label: these are sample articles, never presented as published. */
  status: Copy;
  href: string;
  image: Photo;
};

const SAMPLE = tbc("Sample article: not yet published. Replace with a real article before launch.", "Sample · Not yet published");

export const insights = {
  eyebrow: "Insights & Perspectives",
  title: "Perspectives on Markets, Industries and Opportunity.",
  cta: { label: "View All Insights", href: "/insights" },
  items: [
    {
      category: "Markets",
      title: "Long-Term Capital in a Changing Rate Environment",
      excerpt: "Why patience and discipline matter as the cost of capital evolves.",
      status: SAMPLE,
      href: "/insights",
      image: { src: insightMarkets, alt: "Financial market chart on a monitor" },
    },
    {
      category: "Energy",
      title: "The Infrastructure Behind Europe's Energy Transition",
      excerpt: "The evolving significance of generation, storage and power networks.",
      status: SAMPLE,
      href: "/insights",
      image: { src: insightEnergy, alt: "Aerial view of rows of solar panels across green fields" },
    },
    {
      category: "Perspective",
      title: "Why Perspective Remains an Advantage",
      excerpt: "The importance of considered decisions in changing markets.",
      status: SAMPLE,
      href: "/insights",
      image: { src: insightCorporate, alt: "Contemporary glass office building at dusk" },
    },
  ] satisfies Insight[],
};

/* ---------- 10 Closing (no contact form, no photography) ---------- */
export const closing = {
  eyebrow: "Begin a Conversation",
  titleLead: "A Conversation About",
  titleEmphasis: "What Comes Next.",
  body: "We welcome conversations grounded in shared perspective and long-term thinking.",
  cta: { label: "Get in Touch", href: "/contact" },
};

/* ---------- Footer ---------- */
export const legal = {
  disclaimer: tbc(
    "Legal Notice and Privacy Policy to be approved by HAGER Investment before launch.",
    "",
  ) as Copy,
};
