import expertiseRealEstate from "@/assets/images/expertise-real-estate.jpg";
import sectorRealEstate from "@/assets/images/iv-sector-real-estate-facade.jpg";
import sectorAgriculture from "@/assets/images/iv-sector-agriculture.jpg";
import sectorAi from "@/assets/images/iv-sector-ai.jpg";
import sectorFinancial from "@/assets/images/iv-sector-financial.jpg";
import sectorInfrastructure from "@/assets/images/iv-sector-infrastructure.jpg";
import sectorLifeSciences from "@/assets/images/iv-sector-life-sciences.jpg";
import sectorEnergy from "@/assets/images/iv-sector-energy.jpg";
import sectorHealthcare from "@/assets/images/iv-sector-healthcare.jpg";
import sectorIndustrial from "@/assets/images/iv-sector-industrial.jpg";
import sectorLogistics from "@/assets/images/iv-sector-logistics.jpg";
import sectorTechnology from "@/assets/images/iv-sector-technology.jpg";
import { tbc } from "@/lib/content";

import type { Link, Photo } from "./home";

/* ==========================================================================
   Sector and service subpages (SD-01, IV-03): 11 Investment Universe sectors and
   6 Expertise & Services disciplines, rendered by one shared architecture
   (src/components/sections/subpage) in three layout variations:

     A  Editorial Split         two-column, divided compositions
     B  Institutional Minimal   typography-led, fine horizontal rules
     C  Architectural Accent    one restrained photograph OR a CSS line graphic

   Hero headings, introductions, focus areas and perspectives are as supplied
   by HAGER Investment. Overviews, discipline explanations and the expanded
   focus descriptions are proposed descriptive copy (review-mode notes). The
   six service descriptions are PROPOSED and pending approval. Nothing here
   describes holdings, transactions, clients, results or regulated
   permissions. Photography is illustrative only.
   ========================================================================== */

export type Layout = "A" | "B" | "C";
export type Graphic = "grid" | "arcs" | "rings";
export type FocusItem = { name: string; body: string };

type Base = {
  slug: string;
  href: string;
  /** Short name used in related links and previous/next. */
  name: string;
  layout: Layout;
  title: string;
  intro: string;
  /** Layout C: one photograph, or a CSS/SVG line composition. */
  image?: Photo;
  graphic?: Graphic;
  overview: { title: string; paragraphs: string[] };
  focus: FocusItem[];
};

export type SectorPage = Base & {
  kind: "sector";
  perspective: string;
  considerations: string[];
  related: string[];
  /** One related discipline, cross-linking into Expertise & Services. */
  relatedService?: string;
};

export type ServicePage = Base & {
  kind: "service";
  closing: string;
  related: string[];
  relatedSector?: string;
};

export const sectorPages: SectorPage[] = [
  {
    kind: "sector",
    slug: "real-estate",
    href: "/investment-universe/real-estate",
    name: "Real Estate",
    layout: "C",
    image: { src: sectorRealEstate, alt: "A dark facade of faceted, angled window bays repeating across the building" },
    title: "Real Estate & Enduring Value",
    intro: "Real estate remains an important component of the physical economy, connecting locations, infrastructure and the evolving needs of businesses and communities.",
    overview: {
      title: "Where Place Meets Purpose.",
      paragraphs: [
        "Buildings give economic activity a physical address. Homes, offices, retail space and mixed-use districts shape how people live and work, and how businesses reach their customers and employees.",
        "Because property is long-lived and tied to its location, its relevance depends on the wider setting: transport links, local employment, planning frameworks and the way occupier needs change over decades rather than seasons.",
      ],
    },
    focus: [
      { name: "Residential & Commercial Property", body: "Understanding demand, occupancy and location fundamentals, and how each shapes the use of a property over time." },
      { name: "Development & Redevelopment", body: "Examining asset improvement and the potential of evolving urban environments, from refurbishment to changes of use." },
      { name: "Long-Term Property Fundamentals", body: "Considering asset quality, market conditions and resilience across changing economic cycles." },
    ],
    perspective: "Location, demand, asset condition and regulatory context are important considerations when assessing long-term real estate relevance.",
    considerations: ["Location", "Demand", "Asset condition", "Regulatory context"],
    related: ["logistics", "industrial-development", "energy"],
    relatedService: "real-estate-investment",
  },
  {
    kind: "sector",
    slug: "energy",
    href: "/investment-universe/energy",
    name: "Energy",
    layout: "A",
    title: "Energy & Economic Transformation",
    intro: "Energy systems underpin economic activity and industrial progress. Changing technologies, infrastructure needs and consumption patterns are influencing the sector's development.",
    overview: {
      title: "The System Behind Every Sector.",
      paragraphs: [
        "Every part of the economy depends on reliable energy, from heating homes to powering factories, data centres and transport. Generation, networks and storage form an interconnected system in which each part affects the others.",
        "The sector is changing as new generation technologies mature, grids adapt to more variable supply and patterns of consumption shift. These changes unfold over long timeframes and require substantial, carefully planned infrastructure.",
      ],
    },
    focus: [
      { name: "Energy Infrastructure", body: "Generation, transmission and distribution assets that move energy reliably from source to user." },
      { name: "Renewable Energy", body: "Emerging capacity, technology and the infrastructure required to integrate it into existing systems." },
      { name: "Energy Market Development", body: "Demand, reliability and evolving market conditions that influence how energy is produced and priced." },
    ],
    perspective: "Energy-related decisions require consideration of capital intensity, operational resilience, market dynamics and regulatory change.",
    considerations: ["Capital intensity", "Operational resilience", "Market dynamics", "Regulatory change"],
    related: ["infrastructure", "industrial-development", "technology"],
    relatedService: "investment-strategy",
  },
  {
    kind: "sector",
    slug: "logistics",
    href: "/investment-universe/logistics",
    name: "Logistics",
    layout: "B",
    title: "Logistics & Global Connectivity",
    intro: "Logistics connects producers, businesses and consumers through transportation networks, distribution infrastructure and increasingly sophisticated supply chains.",
    overview: {
      title: "The Movement That Connects Markets.",
      paragraphs: [
        "Goods travel through a chain of ports, rail corridors, roads, warehouses and distribution centres before they reach a business or a household. The reliability of that chain affects costs, availability and the competitiveness of entire regions.",
        "Shifts in trade routes, consumer expectations and inventory practices continue to reshape where facilities are needed and how they operate, placing new emphasis on resilience as well as efficiency.",
      ],
    },
    focus: [
      { name: "Transport Infrastructure", body: "Networks supporting the movement of goods by sea, rail, road and air, and the connections between them." },
      { name: "Warehousing & Distribution", body: "Facilities and systems serving evolving supply chains, close to the markets and transport routes they serve." },
      { name: "Supply Chain Development", body: "Efficiency, resilience and changing commercial demand across increasingly complex flows of goods." },
    ],
    perspective: "Location, infrastructure capacity, operating efficiency and global trade conditions help shape the sector's long-term outlook.",
    considerations: ["Location", "Infrastructure capacity", "Operating efficiency", "Global trade conditions"],
    related: ["infrastructure", "industrial-development", "agriculture-food"],
    relatedService: "asset-management",
  },
  {
    kind: "sector",
    slug: "industrial-development",
    href: "/investment-universe/industrial-development",
    name: "Industrial Development",
    layout: "C",
    graphic: "grid",
    title: "The Future of Industry",
    intro: "Industrial development supports productive capacity, manufacturing capability and the infrastructure required for long-term economic activity.",
    overview: {
      title: "Capacity That Builds Economies.",
      paragraphs: [
        "Manufacturing and industrial activity turn materials, energy and skills into the products economies rely on. The facilities, equipment and supply relationships behind them represent long-term commitments of capital and expertise.",
        "Modern industry is being reshaped by automation, digital tools and changing supply strategies, making adaptability as important as scale when productive assets are planned and renewed.",
      ],
    },
    focus: [
      { name: "Manufacturing Infrastructure", body: "Facilities supporting production and industrial activity, and the services and connections they depend on." },
      { name: "Industrial Modernization", body: "Automation, efficiency and technology adoption that change how existing operations perform." },
      { name: "Productive Asset Development", body: "Infrastructure, capacity and operational requirements for new and expanding industrial activity." },
    ],
    perspective: "Industrial opportunities should be considered in relation to demand, competitiveness, capital requirements and technological change.",
    considerations: ["Demand", "Competitiveness", "Capital requirements", "Technological change"],
    related: ["energy", "infrastructure", "logistics"],
    relatedService: "private-equity",
  },
  {
    kind: "sector",
    slug: "infrastructure",
    href: "/investment-universe/infrastructure",
    name: "Infrastructure",
    layout: "A",
    title: "Infrastructure Supporting Modern Economies",
    intro: "Infrastructure connects communities, businesses and industries through essential physical and digital systems. Its quality, capacity and resilience influence long-term economic development.",
    overview: {
      title: "The Systems Everything Depends On.",
      paragraphs: [
        "Infrastructure encompasses a wide range of facilities and networks that support everyday economic activity. Investment considerations often involve substantial capital requirements, long operating horizons and changing public and private needs.",
      ],
    },
    focus: [
      { name: "Essential Infrastructure", body: "Utilities, water systems and facilities supporting economic activity." },
      { name: "Transport & Connectivity", body: "Core networks connecting businesses, people and regions." },
      { name: "Digital Infrastructure", body: "Communications networks and facilities supporting digital services." },
    ],
    perspective: "Infrastructure analysis requires consideration of demand, financing, operating requirements, regulatory conditions and long-term asset resilience.",
    considerations: ["Demand","Financing","Operating requirements","Regulatory conditions"],
    related: ["energy","logistics","technology"],
    relatedService: "asset-management",
  },
  {
    kind: "sector",
    slug: "agriculture-food",
    href: "/investment-universe/agriculture-food",
    name: "Agriculture & Food",
    layout: "B",
    title: "Agriculture, Food & Essential Resources",
    intro: "Agriculture and food systems form an essential part of the global economy, connecting agricultural production, processing, distribution and changing consumer needs.",
    overview: {
      title: "From Field to Market.",
      paragraphs: [
        "The sector encompasses primary production, food manufacturing, supply chains and technologies supporting productivity. Changing resource availability, demand and production methods continue to influence its development.",
      ],
    },
    focus: [
      { name: "Agricultural Production", body: "Farming systems, productive resources and operating fundamentals." },
      { name: "Food Processing & Distribution", body: "Facilities and processes connecting producers with markets." },
      { name: "Agricultural Technology", body: "Precision farming, automation and innovative production systems." },
    ],
    perspective: "Agriculture and food-related opportunities involve considerations including climate conditions, resource availability, commodity prices, operating efficiency and changing regulations.",
    considerations: ["Climate conditions","Resource availability","Commodity prices","Operating efficiency"],
    related: ["logistics","industrial-development","life-sciences"],
    relatedService: "private-equity",
  },
  {
    kind: "sector",
    slug: "technology",
    href: "/investment-universe/technology",
    name: "Technology",
    layout: "A",
    title: "Technology Shaping Tomorrow",
    intro: "Technology is transforming business operations, communication and the infrastructure that supports modern economic development.",
    overview: {
      title: "The Infrastructure of Modern Business.",
      paragraphs: [
        "Software, networks and computing capacity now sit beneath almost every commercial process, from finance and logistics to customer service and product design. Technology has become infrastructure in its own right.",
        "The sector moves quickly, but its most durable elements tend to be those that become embedded in how organizations operate: dependable systems, secure connectivity and tools that solve lasting problems.",
      ],
    },
    focus: [
      { name: "Digital Infrastructure", body: "Computing, connectivity and the supporting systems on which digital services depend." },
      { name: "Enterprise Technology", body: "Software and technologies serving business needs, from core operations to collaboration and analysis." },
      { name: "Innovation & Development", body: "Emerging capabilities and changing market requirements that shape the next generation of products." },
    ],
    perspective: "Technology markets call for attention to adoption, competitive differentiation, scalability and continuing innovation.",
    considerations: ["Adoption", "Competitive differentiation", "Scalability", "Continuing innovation"],
    related: ["artificial-intelligence", "financial-services", "infrastructure"],
    relatedService: "private-equity",
  },
  {
    kind: "sector",
    slug: "artificial-intelligence",
    href: "/investment-universe/artificial-intelligence",
    name: "Artificial Intelligence",
    layout: "B",
    title: "Artificial Intelligence & Innovation",
    intro: "Artificial intelligence is influencing how organizations analyze information, automate processes and develop new technological capabilities.",
    overview: {
      title: "From Information to Insight.",
      paragraphs: [
        "Artificial intelligence allows systems to recognize patterns, interpret language and support decisions at a scale that was previously impractical. Its applications range from routine automation to complex analysis.",
        "Its practical value depends on more than the models themselves: reliable data, computing infrastructure, integration with existing processes and responsible governance all determine whether a capability becomes genuinely useful.",
      ],
    },
    focus: [
      { name: "Intelligent Automation", body: "Systems supporting operational workflows and efficiency, reducing repetitive work and improving consistency." },
      { name: "AI Infrastructure", body: "Computing requirements and the supporting technology needed to develop and run AI systems." },
      { name: "Enterprise AI Applications", body: "Practical applications across business environments, from analysis and forecasting to customer service." },
    ],
    perspective: "AI-related developments require careful consideration of commercial adoption, infrastructure costs, technical limitations and governance.",
    considerations: ["Commercial adoption", "Infrastructure costs", "Technical limitations", "Governance"],
    related: ["technology", "financial-services", "life-sciences"],
    relatedService: "corporate-advisory",
  },
  {
    kind: "sector",
    slug: "financial-services",
    href: "/investment-universe/financial-services",
    name: "Financial Services & FinTech",
    layout: "A",
    title: "The Evolution of Financial Services",
    intro: "Financial services support economic activity through banking, payments, capital markets and financial infrastructure. Digital innovation continues to reshape how these systems operate and serve businesses and individuals.",
    overview: {
      title: "Where Finance Meets Technology.",
      paragraphs: [
        "The financial sector combines established institutions with rapidly evolving technology, regulatory frameworks and changing customer expectations. Understanding this landscape requires consideration of both financial fundamentals and technological transformation.",
      ],
    },
    focus: [
      { name: "Banking & Financial Infrastructure", body: "Institutions, systems and infrastructure supporting financial activity." },
      { name: "Payments & FinTech", body: "Digital payment networks, financial software and technology-enabled services." },
      { name: "Capital Markets Technology", body: "Platforms and systems supporting market connectivity and financial information." },
    ],
    perspective: "Financial-sector developments require careful consideration of regulation, operational resilience, market competition, cybersecurity and evolving customer requirements.",
    considerations: ["Regulation","Operational resilience","Market competition","Cybersecurity"],
    related: ["technology","artificial-intelligence","infrastructure"],
    relatedService: "corporate-advisory",
  },
  {
    kind: "sector",
    slug: "healthcare",
    href: "/investment-universe/healthcare",
    name: "Healthcare",
    layout: "C",
    graphic: "arcs",
    title: "Healthcare & Human Progress",
    intro: "Healthcare combines essential services, medical infrastructure and innovation to address the changing needs of individuals and communities.",
    overview: {
      title: "Essential Services, Lasting Need.",
      paragraphs: [
        "Healthcare spans hospitals and clinics, diagnostics, medical devices, research and the systems that coordinate care. It is among the most essential and most carefully regulated parts of any economy.",
        "Ageing populations, advances in medical science and the growing use of data are changing how care is delivered, and where and how healthcare infrastructure is needed.",
      ],
    },
    focus: [
      { name: "Healthcare Infrastructure", body: "Facilities and systems supporting care delivery, from hospitals to outpatient and specialist settings." },
      { name: "Medical Technology", body: "Devices, diagnostics and technological development that support clinical decisions and treatment." },
      { name: "Healthcare Innovation", body: "Emerging approaches to medical services and research, and how they move from development to practice." },
    ],
    perspective: "Healthcare evaluation involves patient needs, operational quality, scientific evidence, regulation and long-term demographic trends.",
    considerations: ["Patient needs", "Operational quality", "Scientific evidence", "Regulation", "Demographic trends"],
    related: ["life-sciences", "artificial-intelligence", "technology"],
    relatedService: "investment-strategy",
  },
  {
    kind: "sector",
    slug: "life-sciences",
    href: "/investment-universe/life-sciences",
    name: "Life Sciences & Biotechnology",
    layout: "B",
    title: "Advancing Life Sciences & Biotechnology",
    intro: "Life sciences and biotechnology contribute to scientific progress through biological research, medical innovation and technologies that expand the understanding of human health.",
    overview: {
      title: "Where Discovery Begins.",
      paragraphs: [
        "This research-intensive sector brings together scientific discovery, biotechnology platforms, medical development and specialized infrastructure. Its evolution depends on research capabilities, clinical evidence and complex regulatory processes.",
      ],
    },
    focus: [
      { name: "Biopharmaceutical Development", body: "Scientific and technological approaches to researching and developing therapeutics." },
      { name: "Biotechnology Platforms", body: "Technologies supporting biological analysis and development." },
      { name: "Research & Diagnostics", body: "Laboratory capabilities, testing systems and diagnostic innovation." },
    ],
    perspective: "Life sciences evaluation involves scientific uncertainty, development costs, regulatory pathways, intellectual property and potentially lengthy commercialization timelines.",
    considerations: ["Scientific uncertainty","Development costs","Regulatory pathways","Intellectual property"],
    related: ["healthcare","artificial-intelligence","technology"],
    relatedService: "investment-strategy",
  },
];

export const servicePages: ServicePage[] = [
  {
    kind: "service",
    slug: "investment-strategy",
    href: "/expertise/investment-strategy",
    name: "Investment Strategy",
    layout: "A",
    title: "Investment Strategy & Perspective",
    intro: "Investment strategy connects market understanding, analytical judgment and long-term objectives to the evaluation of potential opportunities.",
    overview: {
      title: "Context Before Conclusions.",
      paragraphs: [
        "Investment strategy is the discipline of deciding where attention and capital belong, and why. It draws together economic conditions, sector dynamics and the objectives an investor is trying to achieve.",
        "A sound strategy is explicit about its assumptions and time horizon, so that individual decisions can be tested against a consistent view rather than evaluated in isolation.",
      ],
    },
    focus: [
      { name: "Market Analysis", body: "Economic conditions and market developments that frame the environment for every decision." },
      { name: "Opportunity Evaluation", body: "Commercial fundamentals and strategic relevance, assessed against clearly stated objectives." },
      { name: "Long-Term Thinking", body: "Time horizons, resilience and risk considerations that extend beyond the immediate cycle." },
    ],
    closing: "A considered investment perspective begins with understanding the wider context of each decision.",
    related: ["asset-management", "private-equity", "corporate-advisory"],
    relatedSector: "energy",
  },
  {
    kind: "service",
    slug: "asset-management",
    href: "/expertise/asset-management",
    name: "Asset Management",
    layout: "B",
    title: "Asset Management & Long-Term Value",
    intro: "Asset management involves evaluating asset characteristics, operational performance and the considerations associated with preserving and developing value.",
    overview: {
      title: "Stewardship Over Time.",
      paragraphs: [
        "Asset management concerns what happens after an asset is acquired: how it performs, how it is maintained and how it responds to changing conditions in its market.",
        "It combines attention to operational detail with a longer view of an asset's role, so that decisions about improvement, repositioning or continued ownership rest on a clear understanding of its characteristics.",
      ],
    },
    focus: [
      { name: "Asset Quality", body: "Fundamentals, characteristics and relevance that determine how an asset is positioned in its market." },
      { name: "Performance Considerations", body: "Operational and financial factors that indicate how an asset is functioning today." },
      { name: "Long-Term Oversight", body: "Changing conditions, risk and resilience monitored over the full period of ownership." },
    ],
    closing: "Understanding the characteristics of an asset is central to evaluating its long-term potential.",
    related: ["real-estate-investment", "investment-strategy", "private-equity"],
    relatedSector: "logistics",
  },
  {
    kind: "service",
    slug: "mergers-acquisitions",
    href: "/expertise/mergers-acquisitions",
    name: "Mergers & Acquisitions",
    layout: "C",
    graphic: "rings",
    title: "Mergers & Acquisitions",
    intro: "Mergers and acquisitions involve complex strategic decisions, combining commercial analysis with corporate, financial and operational considerations.",
    overview: {
      title: "Combining Businesses with Clarity.",
      paragraphs: [
        "A merger or acquisition brings two organizations, or parts of them, together. The commercial logic may be clear, but realizing it depends on how well the businesses fit and how carefully the transaction is assessed.",
        "Strategic, financial, legal and operational questions all converge in a single decision, which makes a structured and well-documented evaluation essential.",
      ],
    },
    focus: [
      { name: "Strategic Alignment", body: "Business objectives and complementary capabilities that give a combination its rationale." },
      { name: "Transaction Evaluation", body: "Commercial fundamentals and potential risks examined before commitments are made." },
      { name: "Corporate Integration", body: "Organizational compatibility and transition considerations that shape the outcome after completion." },
    ],
    closing: "Successful strategic evaluation requires clarity about business fundamentals, transaction complexity and long-term objectives.",
    related: ["corporate-advisory", "private-equity", "investment-strategy"],
    relatedSector: "industrial-development",
  },
  {
    kind: "service",
    slug: "corporate-advisory",
    href: "/expertise/corporate-advisory",
    name: "Corporate Advisory",
    layout: "A",
    title: "Corporate Advisory & Development",
    intro: "Corporate advisory brings together strategic analysis, commercial understanding and business-development considerations to examine organizational challenges and opportunities.",
    overview: {
      title: "Perspective for Important Decisions.",
      paragraphs: [
        "Organizations regularly face decisions that shape their direction: entering new markets, reorganizing operations, forming partnerships or reconsidering their structure.",
        "Corporate advisory brings an independent, structured perspective to these questions, setting out the alternatives and their implications so that leadership can decide with greater clarity.",
      ],
    },
    focus: [
      { name: "Corporate Strategy", body: "Direction, positioning and objectives, and how they translate into practical priorities." },
      { name: "Business Development", body: "Commercial opportunities and changing markets that open or close avenues for growth." },
      { name: "Organizational Transformation", body: "Structure, operations and evolving requirements as an organization adapts to new conditions." },
    ],
    closing: "A clear strategic perspective helps organizations evaluate alternatives and understand the implications of important decisions.",
    related: ["mergers-acquisitions", "investment-strategy", "private-equity"],
    relatedSector: "artificial-intelligence",
  },
  {
    kind: "service",
    slug: "real-estate-investment",
    href: "/expertise/real-estate-investment",
    name: "Real Estate Investment",
    layout: "C",
    image: { src: expertiseRealEstate, alt: "Glass residential and office towers rising against a clear blue sky" },
    title: "Real Estate Investment Perspective",
    intro: "Real estate investment analysis considers property fundamentals, market conditions and the long-term relevance of physical assets.",
    overview: {
      title: "Reading a Property and Its Market.",
      paragraphs: [
        "Every property combines a specific building with a specific location. Investment analysis looks at both: the physical asset, with its condition and operating costs, and the market around it, with its demand and supply.",
        "Because property is held over long periods, the analysis also considers how use, regulation and occupier expectations may evolve during ownership.",
      ],
    },
    focus: [
      { name: "Property Fundamentals", body: "Location, condition and asset characteristics that define what a property can offer." },
      { name: "Market Evaluation", body: "Demand, supply and economic conditions in the market where the property competes." },
      { name: "Long-Term Considerations", body: "Resilience, operating costs and evolving use over the expected period of ownership." },
    ],
    closing: "Property decisions benefit from detailed consideration of both asset-level characteristics and the wider market environment.",
    related: ["asset-management", "investment-strategy", "private-equity"],
    relatedSector: "real-estate",
  },
  {
    kind: "service",
    slug: "private-equity",
    href: "/expertise/private-equity",
    name: "Private Equity",
    layout: "B",
    title: "Private Equity & Business Development",
    intro: "Private equity involves evaluating privately held businesses, their operating fundamentals and potential paths for long-term development.",
    overview: {
      title: "Understanding Private Businesses.",
      paragraphs: [
        "Privately held businesses are not priced daily by public markets, so understanding them relies on direct analysis of how they operate, compete and generate cash.",
        "Private equity considers both a company's current position and the realistic paths for its development, along with the capital, capabilities and time those paths would require.",
      ],
    },
    focus: [
      { name: "Business Fundamentals", body: "Commercial model, operating performance and market position as they stand today." },
      { name: "Growth Considerations", body: "Strategic development and business capabilities that could support the next stage." },
      { name: "Risk & Value Assessment", body: "Capital requirements, execution challenges and long-term relevance weighed together." },
    ],
    closing: "Evaluating private businesses requires understanding both their current fundamentals and the conditions influencing future development.",
    related: ["mergers-acquisitions", "corporate-advisory", "investment-strategy"],
    relatedSector: "technology",
  },
];

/** Review-mode notes. */
export const subpageNotes = {
  sector: tbc("Proposed descriptive content pending company approval: general sector information, not a description of holdings, transactions or mandates.", ""),
  service: tbc("Proposed service description pending company approval: not a statement of regulated services, permissions or mandates.", ""),
};

export const sectorBySlug = (slug: string) => sectorPages.find((p) => p.slug === slug);
export const serviceBySlug = (slug: string) => servicePages.find((p) => p.slug === slug);

/** Parent overview page of each subpage kind (structured data, related links). */
export const parents = {
  sector: { label: "Investment Universe", href: "/investment-universe" } satisfies Link,
  service: { label: "Expertise & Services", href: "/expertise" } satisfies Link,
};

/* ---------------------------------------------------------------------------
   Fifth section (SD-02). Sectors: three long-term drivers shaping the industry.
   Services: three guiding principles of the discipline. Both are PROPOSED
   descriptive content pending company approval (review-mode note); neither
   describes holdings, mandates or verified internal procedures.
   --------------------------------------------------------------------------- */

export const themeNotes = {
  sector: tbc("Proposed descriptive content pending company approval: general industry drivers, not investment views or holdings.", ""),
  service: tbc("Proposed principles pending company approval: a description of the discipline, not a verified internal procedure.", ""),
};

export const pageThemes: Record<string, FocusItem[]> = {
  "real-estate": [
    { name: "Urban Change", body: "Shifting patterns of where people live and work continue to reshape demand for space." },
    { name: "Building Performance", body: "Energy efficiency and adaptability increasingly define a building's long-term relevance." },
    { name: "Occupier Expectations", body: "Flexibility, quality and amenity influence how well a property retains its occupiers." },
  ],
  energy: [
    { name: "Electrification", body: "More activity relies on electricity, from transport and heating to industrial processes." },
    { name: "Grid Modernization", body: "Networks adapt to variable supply, storage and increasingly two-way flows of power." },
    { name: "Security of Supply", body: "Reliability and diversification remain central to how energy systems are planned." },
  ],
  logistics: [
    { name: "Changing Trade Routes", body: "Shifts in sourcing and trade relationships reshape where capacity is needed." },
    { name: "Proximity to Demand", body: "Faster delivery expectations draw distribution facilities closer to consumers." },
    { name: "Automation", body: "Technology is changing how warehouses, yards and transport networks operate." },
  ],
  "industrial-development": [
    { name: "Supply Chain Resilience", body: "Companies continue to reassess where, and how close to their markets, they produce." },
    { name: "Digital Production", body: "Automation and data make manufacturing more precise, connected and adaptable." },
    { name: "Energy Efficiency", body: "Energy use increasingly shapes the competitiveness of industrial operations." },
  ],
  technology: [
    { name: "Cloud & Connectivity", body: "Computing continues to move onto shared infrastructure and high-capacity networks." },
    { name: "Data as an Asset", body: "Organizations depend on information that is secure, reliable and well governed." },
    { name: "Security & Resilience", body: "Protecting systems has become a core operational requirement, not an afterthought." },
  ],
  "artificial-intelligence": [
    { name: "Computing Capacity", body: "Developing and running AI systems depends on specialised, energy-intensive infrastructure." },
    { name: "Practical Adoption", body: "Value emerges where AI is integrated into real workflows rather than used in isolation." },
    { name: "Responsible Governance", body: "Transparency, oversight and regulation increasingly shape how AI is deployed." },
  ],
  healthcare: [
    { name: "Demographic Change", body: "Ageing populations increase, and change the nature of, demand for care." },
    { name: "Medical Innovation", body: "Advances in diagnostics and treatment continue to change clinical practice." },
    { name: "Digital Health", body: "Data and connected tools influence how care is organised and delivered." },
  ],
  infrastructure: [
    { name: "Urban Development", body: "Expanding and modernizing essential infrastructure." },
    { name: "Infrastructure Renewal", body: "Maintenance, modernization and replacement of existing assets." },
    { name: "Digital Connectivity", body: "Growing reliance on reliable communications and supporting networks." },
  ],
  "agriculture-food": [
    { name: "Food Demand", body: "Changing population needs and consumption patterns." },
    { name: "Agricultural Innovation", body: "Technologies supporting productivity and resource efficiency." },
    { name: "Supply Chain Resilience", body: "Reliable production, storage and distribution systems." },
  ],
  "financial-services": [
    { name: "Digital Payments", body: "Evolving payment methods and transaction infrastructure." },
    { name: "Financial Technology", body: "New systems supporting financial operations and accessibility." },
    { name: "Regulatory Evolution", body: "Changing standards, oversight and compliance requirements." },
  ],
  "life-sciences": [
    { name: "Scientific Discovery", body: "Advances in biological knowledge and research technologies." },
    { name: "Biotechnology Innovation", body: "New platforms and methods for medical and industrial applications." },
    { name: "Research Infrastructure", body: "Specialized facilities, equipment and scientific capabilities." },
  ],
  "investment-strategy": [
    { name: "Context First", body: "Decisions are framed by economic and sector conditions before their individual merits." },
    { name: "Explicit Assumptions", body: "Stating assumptions clearly allows them to be tested and revisited over time." },
    { name: "Consistent Horizons", body: "Each decision is assessed against a clearly defined time frame and objective." },
  ],
  "asset-management": [
    { name: "Know the Asset", body: "Physical, operational and market characteristics are understood in detail." },
    { name: "Measured Improvement", body: "Changes are weighed against their cost, disruption and long-term benefit." },
    { name: "Continuous Review", body: "Assumptions are revisited as markets, regulation and occupier needs evolve." },
  ],
  "mergers-acquisitions": [
    { name: "Rationale Before Terms", body: "The strategic case is examined before the terms of any transaction." },
    { name: "Integrated Evaluation", body: "Commercial, financial, legal and operational questions are considered together." },
    { name: "Integration in View", body: "The realities after completion are considered from the very beginning." },
  ],
  "corporate-advisory": [
    { name: "Independent Perspective", body: "Questions are examined without a predetermined conclusion." },
    { name: "Clear Alternatives", body: "Options are set out side by side, with their implications made explicit." },
    { name: "Practical Outcomes", body: "Recommendations remain grounded in operational and commercial reality." },
  ],
  "real-estate-investment": [
    { name: "Asset and Market Together", body: "A property is assessed alongside the market in which it competes." },
    { name: "Long-Term Use", body: "Consideration is given to how a building may be used over decades, not years." },
    { name: "Cost Awareness", body: "Operating and capital costs are weighed alongside income potential." },
  ],
  "private-equity": [
    { name: "Fundamentals First", body: "A business is understood as it operates today before its potential is assessed." },
    { name: "Realistic Paths", body: "Development plans are tested against capabilities, capital and time." },
    { name: "Aligned Objectives", body: "The aims of owners, management and investors are considered together." },
  ],
};

/* ---------------------------------------------------------------------------
   Sector template (SD-03): one photograph per sector page, used in the hero
   panel. Illustrative only: no asset shown is owned by HAGER Investment.
   The position field sets the crop (the logistics crop avoids hull lettering).
   --------------------------------------------------------------------------- */
export const sectorPhotos: Record<string, Photo & { position: string }> = {
  "real-estate": { src: sectorRealEstate, alt: "A dark facade of faceted, angled window bays repeating across the building", position: "50% 40%" },
  energy: { src: sectorEnergy, alt: "Electricity transmission towers receding towards a low sun", position: "55% 50%" },
  logistics: { src: sectorLogistics, alt: "Container cranes over a working port at the water's edge", position: "72% 20%" },
  "industrial-development": { src: sectorIndustrial, alt: "Stainless steel pipework and machinery in a modern production hall", position: "40% 45%" },
  technology: { src: sectorTechnology, alt: "Server racks with ordered cabling in a darkened data hall", position: "45% 50%" },
  "artificial-intelligence": { src: sectorAi, alt: "Illuminated circuit traces glowing on a dark surface", position: "40% 50%" },
  healthcare: { src: sectorHealthcare, alt: "Researchers at work at a laboratory bench", position: "62% 45%" },
  infrastructure: { src: sectorInfrastructure, alt: "A motorway interchange seen from above, its slip roads looping between fields and woodland", position: "50% 50%" },
  "agriculture-food": { src: sectorAgriculture, alt: "Aerial view of cultivated fields in bands of green and brown, divided by a line of trees", position: "45% 50%" },
  "financial-services": { src: sectorFinancial, alt: "A candlestick price chart glowing on a dark screen", position: "60% 50%" },
  "life-sciences": { src: sectorLifeSciences, alt: "A gloved hand dispensing liquid from a glass pipette into a small vial", position: "42% 45%" },
};

/* ---------------------------------------------------------------------------
   Investment framing for the sector pages (SD-03). PROPOSED copy pending
   company approval: a long-term capital perspective on each sector and an
   invitation to discuss opportunities. It describes no holdings, transactions,
   returns, mandates or regulated services.
   --------------------------------------------------------------------------- */

export type SectorInvest = {
  /** Short investment label shown above the hero title. */
  label: string;
  rationaleTitle: string;
  rationale: [string, string];
  /** Who the closing invitation addresses. */
  audience: string;
};

export const investNote = tbc("Proposed investment framing and invitation pending company approval: no holdings, transactions, returns or regulated services are implied.", "");

export const sectorInvest: Record<string, SectorInvest> = {
  "real-estate": {
    label: "Real Assets",
    rationaleTitle: "Why Real Estate Endures in a Portfolio.",
    rationale: [
      "Property connects capital to the physical economy. Well-located, well-maintained buildings provide lasting utility to the people and businesses that occupy them, and that utility is the foundation of their long-term value.",
      "The opportunity lies in understanding where demand is structurally supported, how assets can be improved, and which locations will stay relevant as cities and working patterns change.",
    ],
    audience: "Property owners, developers and partners",
  },
  energy: {
    label: "Infrastructure & Energy",
    rationaleTitle: "Why Energy Is a Long-Term Capital Story.",
    rationale: [
      "The energy transition is one of the largest reallocations of capital in the modern economy. Generation, networks and storage all require sustained investment over long horizons.",
      "Opportunity follows the infrastructure: assets that strengthen reliability, integrate new capacity or meet rising electricity demand can play an essential role for decades.",
    ],
    audience: "Energy developers, operators and partners",
  },
  logistics: {
    label: "Infrastructure & Trade",
    rationaleTitle: "Why Logistics Underpins Modern Commerce.",
    rationale: [
      "Every product reaches its market through a network of ports, warehouses and transport links. As commerce becomes more complex, the assets that keep goods moving become more valuable.",
      "Investment attention centres on well-located capacity: facilities and networks that lower costs, shorten delivery times and add resilience to supply chains.",
    ],
    audience: "Logistics operators, developers and partners",
  },
  "industrial-development": {
    label: "Productive Capacity",
    rationaleTitle: "Why Industry Is Being Rebuilt.",
    rationale: [
      "Manufacturers are rethinking where and how they produce. Supply-chain resilience, automation and energy efficiency are prompting renewed investment in productive capacity.",
      "Modern industrial assets, designed for flexibility and efficiency, can support competitive operations for many years, which makes them a natural foundation for long-term capital.",
    ],
    audience: "Industrial businesses, manufacturers and partners",
  },
  technology: {
    label: "Digital Economy",
    rationaleTitle: "Why Technology Commands Long-Term Capital.",
    rationale: [
      "Software, data and connectivity now underpin almost every business. Technology that becomes embedded in daily operations can build durable, recurring relevance.",
      "The investment question is one of quality: which platforms, infrastructure and capabilities will remain essential as markets evolve and competition intensifies.",
    ],
    audience: "Technology companies, founders and partners",
  },
  "artificial-intelligence": {
    label: "Emerging Technology",
    rationaleTitle: "Why AI Demands a Considered View.",
    rationale: [
      "Artificial intelligence is attracting exceptional attention and capital. Its long-term value will be decided by practical adoption rather than expectation alone.",
      "A considered perspective separates durable capabilities, such as infrastructure, data and enterprise applications with clear use cases, from short-lived enthusiasm.",
    ],
    audience: "AI companies, technology teams and partners",
  },
  healthcare: {
    label: "Essential Services",
    rationaleTitle: "Why Healthcare Offers Enduring Demand.",
    rationale: [
      "Healthcare demand is shaped by long-term forces: ageing populations, medical progress and the growing importance of prevention and diagnostics.",
      "The sector combines essential services with innovation, from care infrastructure to medical technology, each with its own evidence, regulatory and operational considerations.",
    ],
    audience: "Healthcare providers, innovators and partners",
  },
  infrastructure: {
    label: "Essential Infrastructure",
    rationaleTitle: "Why Infrastructure Rewards a Long View.",
    rationale: [
      "Water, utilities, transport corridors and communications networks support every other part of the economy. Many existing assets now require renewal, while growing demand calls for new capacity.",
      "Long operating lives and an essential role give infrastructure a distinctive profile: substantial upfront capital, assessed over decades, with resilience as important as capacity.",
    ],
    audience: "Infrastructure developers, operators and partners",
  },
  "agriculture-food": {
    label: "Essential Resources",
    rationaleTitle: "Why Food Systems Matter for the Long Term.",
    rationale: [
      "Food is among the most fundamental forms of demand. Producing, processing and distributing it reliably depends on land, water, equipment and well-organised supply chains.",
      "Productivity, resource efficiency and resilient distribution are reshaping the sector, favouring operations that combine sound fundamentals with practical innovation.",
    ],
    audience: "Agricultural businesses, food producers and partners",
  },
  "financial-services": {
    label: "Financial Systems",
    rationaleTitle: "Why Financial Infrastructure Deserves Attention.",
    rationale: [
      "Payments, banking and capital markets form the operating fabric of the economy. As these systems move onto digital platforms, the infrastructure and software behind them grow in importance.",
      "A considered view weighs innovation against regulation, security and operational resilience, which shape what can endure in a closely supervised sector.",
    ],
    audience: "Financial institutions, FinTech companies and partners",
  },
  "life-sciences": {
    label: "Research & Innovation",
    rationaleTitle: "Why Life Sciences Call for Patience.",
    rationale: [
      "Biological research and biotechnology platforms are expanding what medicine and industry can achieve, building on specialised infrastructure, scientific talent and rigorous evidence.",
      "Because development paths are long and uncertain, a considered perspective focuses on scientific foundations, regulatory pathways and the time needed to move from discovery to application.",
    ],
    audience: "Life-science companies, research teams and partners",
  },
};

/* ---------------------------------------------------------------------------
   Sector films: an optional ambient film band shown after the rationale.
   Illustrative animation only; it depicts generic equipment and implies no
   operations, assets or relationships of HAGER INVESTMENT.
   --------------------------------------------------------------------------- */
export type SectorFilm = { src: string; poster: string; eyebrow: string; title: string; body: string };

export const sectorFilms: Record<string, SectorFilm> = {
  logistics: {
    src: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261023_081647_05682ad8-bfc0-41de-a226-997234fe04ee.mp4",
    poster: "/media/logistics-poster.jpg",
    eyebrow: "Logistics in Motion",
    title: "From Terminal to Road.",
    body: "Containers lifted, loaded and carried onward: each movement depends on equipment, infrastructure and coordination working as one connected system.",
  },
};
