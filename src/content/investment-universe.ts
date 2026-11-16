import connectAutomation from "@/assets/images/iv-connect-automation.jpg";
import connectFreightRail from "@/assets/images/iv-connect-freight-rail.jpg";
import connectReservoir from "@/assets/images/iv-connect-energy-reservoir.jpg";
import heroNight from "@/assets/images/iv-hero-night-corridor.jpg";
import sectorAgriculture from "@/assets/images/iv-sector-agriculture.jpg";
import sectorAi from "@/assets/images/iv-sector-ai.jpg";
import sectorFinancial from "@/assets/images/iv-sector-financial.jpg";
import sectorInfrastructure from "@/assets/images/iv-sector-infrastructure.jpg";
import sectorLifeSciences from "@/assets/images/iv-sector-life-sciences.jpg";
import sectorEnergy from "@/assets/images/iv-sector-energy.jpg";
import sectorHealthcare from "@/assets/images/iv-sector-healthcare.jpg";
import sectorIndustrial from "@/assets/images/iv-sector-industrial.jpg";
import sectorLogistics from "@/assets/images/iv-sector-logistics.jpg";
import sectorRealEstate from "@/assets/images/iv-sector-real-estate-facade.jpg";
import sectorTechnology from "@/assets/images/iv-sector-technology.jpg";
import { tbc } from "@/lib/content";

import type { Link, Photo } from "./home";

/* Investment Universe photography supplied by the company (public/media, 2026-11-16) */
import biggerPictureImage from "../../public/media/investment-universe page - The Bigger Picture.jpg";
import exploreFurtherImage from "../../public/media/investment universe Explore Further.jpg";

/* ==========================================================================
   Investment Universe (IV-02 redesign). Copy as supplied by HAGER Investment.

   PROPOSED: sector perspectives, groupings and long-term themes are content
   concepts subject to company approval (review-mode notes). They describe
   industries, not investments, holdings, mandates or regulated services.

   Photography is illustrative only: no asset, operator, facility or company
   shown is owned, financed or associated with HAGER Investment.
   ========================================================================== */

export const ivHero = {
  eyebrow: "Investment Universe",
  title: "Understanding the Industries Shaping Tomorrow.",
  description: "A considered view of the industries, technologies and infrastructure influencing the global economy.",
  image: { src: heroNight, alt: "Light trails from a highway sweeping through a dark valley towards a city glowing on the horizon at night" } satisfies Photo,
  cta: { label: "Explore the Sectors", href: "#sectors" } satisfies Link,
};

export const ivPerspective = {
  eyebrow: "The Bigger Picture",
  title: "A Broader View of Progress.",
  lead: "Industries are shaped by changing economic conditions, technological developments and evolving human needs.",
  body: "From physical infrastructure to intelligent systems, understanding these connections provides a clearer perspective on the forces influencing tomorrow's economy.",
  image: { src: biggerPictureImage, alt: "A hand holding a rising bar chart above a desk with reports, a laptop and a notebook" } satisfies Photo,
  /** The three forces named in the lead sentence. */
  forces: [
    { name: "Economic Conditions", body: "Growth, capital and demand set the context in which every industry operates." },
    { name: "Technological Developments", body: "New capabilities change how goods are made, moved and delivered." },
    { name: "Evolving Human Needs", body: "How people live, work and age shapes long-term demand." },
  ],
  note: tbc("Proposed descriptions of the three forces pending company approval.", ""),
};

export type SectorPerspective = { slug: string; name: string; body: string; image: Photo; focus?: string };
export type SectorGroup = { id: string; name: string; sectors: SectorPerspective[] };

export const ivSectors = {
  title: "Explore Our Sector Perspectives.",
  note: tbc("Proposed sector perspectives and groupings: subject to company approval. Not investment holdings or commitments.", ""),
  groups: [
    {
      id: "physical-economy",
      name: "The Physical Economy",
      sectors: [
        {
          slug: "real-estate",
          name: "Real Estate",
          body: "Architecture, location and asset fundamentals influence the long-term relevance of the built environment.",
          image: { src: sectorRealEstate, alt: "An angular, faceted facade of a contemporary building with deep-set blue windows" },
          focus: "50% 45%",
        },
        {
          slug: "energy",
          name: "Energy",
          body: "Power infrastructure, energy technologies and evolving demand remain central to industrial and economic development.",
          image: { src: sectorEnergy, alt: "High-voltage transmission towers silhouetted against a sunset" },
          focus: "55% 55%",
        },
        {
          slug: "logistics",
          name: "Logistics",
          body: "Global supply chains rely on transportation networks, distribution infrastructure and efficient connectivity.",
          image: { src: sectorLogistics, alt: "A container ship berthed beneath ship-to-shore cranes at a port" },
          focus: "55% 60%",
        },
        {
          slug: "industrial-development",
          name: "Industrial Development",
          body: "Manufacturing, engineering and productive infrastructure support the development of modern economies.",
          image: { src: sectorIndustrial, alt: "Stainless-steel process pipework and a motor in an industrial plant" },
          focus: "40% 50%",
        },
        {
          slug: "infrastructure",
          name: "Infrastructure",
          body: "Essential physical and digital systems connect communities, businesses and industries across modern economies.",
          image: { src: sectorInfrastructure, alt: "A motorway interchange seen from above, looping between fields and woodland" },
          focus: "50% 50%",
        },
        {
          slug: "agriculture-food",
          name: "Agriculture & Food",
          body: "Production, processing and distribution link agricultural resources with changing consumer needs.",
          image: { src: sectorAgriculture, alt: "Aerial view of cultivated fields in bands of green and brown" },
          focus: "45% 50%",
        },
      ],
    },
    {
      id: "digital-transformation",
      name: "Digital Transformation",
      sectors: [
        {
          slug: "technology",
          name: "Technology",
          body: "Digital infrastructure and software continue to transform business models, connectivity and operational capabilities.",
          image: { src: sectorTechnology, alt: "Rows of data-centre server racks with ordered cabling" },
        },
        {
          slug: "artificial-intelligence",
          name: "Artificial Intelligence",
          body: "Advances in intelligent systems, automation and computing are influencing industries and creating new technological possibilities.",
          image: { src: sectorAi, alt: "Illuminated circuit pathways on a dark computing surface" },
          focus: "45% 50%",
        },
        {
          slug: "financial-services",
          name: "Financial Services",
          body: "Banking, payments and capital markets continue to evolve through digital innovation and changing regulation.",
          image: { src: sectorFinancial, alt: "A candlestick price chart glowing on a dark screen" },
          focus: "60% 50%",
        },
      ],
    },
    {
      id: "health-innovation",
      name: "Health & Innovation",
      sectors: [
        {
          slug: "healthcare",
          name: "Healthcare",
          body: "Medical innovation, healthcare infrastructure and emerging technologies respond to evolving societal needs.",
          image: { src: sectorHealthcare, alt: "Researchers at work in a bright, contemporary laboratory" },
          focus: "60% 45%",
        },
        {
          slug: "life-sciences",
          name: "Life Sciences",
          body: "Biological research, biotechnology platforms and scientific infrastructure advance the understanding of human health.",
          image: { src: sectorLifeSciences, alt: "A gloved hand dispensing liquid from a glass pipette into a small vial" },
          focus: "42% 45%",
        },
      ],
    },
  ] satisfies SectorGroup[],
};

/** Flat list (navigation, footer links). */
export const ivSectorList = ivSectors.groups.flatMap((g) => g.sectors.map((s) => ({ ...s, group: g.name })));

export const ivConnect = {
  eyebrow: "Connected Industries",
  title: "The Industries Behind Modern Progress.",
  /* The three supplied sentences, each told with one photograph and the two sectors it links. */
  links: [
    { text: "Energy powers manufacturing.", from: "energy", to: "industrial-development", image: { src: connectReservoir, alt: "An upper reservoir of a pumped-storage power station set into wooded hills" } satisfies Photo },
    { text: "Logistics connects markets.", from: "logistics", to: "real-estate", image: { src: connectFreightRail, alt: "A freight train crossing farmland and greenhouses, seen from above" } satisfies Photo },
    { text: "Technology influences how industries operate.", from: "technology", to: "industrial-development", image: { src: connectAutomation, alt: "Orange robotic arms working along an automated production line" } satisfies Photo },
  ],
  conclusion: "These relationships demonstrate how progress in one sector can shape developments across others.",
};

export const ivLongTerm = {
  eyebrow: "A Long-Term View",
  title: "What Shapes Lasting Relevance.",
  intro: "Looking beyond immediate developments helps place industry change within a broader context.",
  note: tbc("Illustrative long-term themes: subject to company approval.", ""),
  themes: [
    { name: "Economic Fundamentals", body: "The underlying conditions influencing businesses, infrastructure and long-term sector development." },
    { name: "Structural Transformation", body: "Changes in technology, infrastructure and demand that reshape how industries evolve." },
    { name: "Adaptability & Resilience", body: "The ability of industries and systems to respond to changing economic and operational conditions." },
  ],
};

export const ivClosing = {
  eyebrow: "Explore Further",
  title: "Explore Our Broader Expertise.",
  body: "Continue exploring the perspectives and proposed capabilities presented across HAGER INVESTMENT.",
  cta: { label: "Discover Our Expertise", href: "/expertise" } satisfies Link,
  image: { src: exploreFurtherImage, alt: "A paper cut-out of a rising arrow held up against glass office towers and a blue sky" } satisfies Photo,
};
