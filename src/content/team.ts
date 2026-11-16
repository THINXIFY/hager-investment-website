import { contactDetails } from "@/config/site";

/**
 * Team (TM-01). Names, roles, descriptions and email addresses exactly as supplied by the company
 * on 2026-11-15. No photographs were supplied: each member is shown with a monogram tile.
 * Nothing beyond the supplied text may be added (no biographies, tenures, credentials or photos).
 */
export type TeamTier = "leadership" | "directors" | "management";

export type TeamMember = {
  slug: string;
  name: string;
  /** Two-letter monogram. */
  initials: string;
  role: string;
  tier: TeamTier;
  description: string;
  email: string;
};

export const teamTiers: { id: TeamTier; label: string; short: string }[] = [
  { id: "leadership", label: "Executive Leadership", short: "Leadership" },
  { id: "directors", label: "Co-Directors", short: "Directors" },
  { id: "management", label: "Management", short: "Management" },
];

export const team: TeamMember[] = [
  {
    /* Placeholder until the CEO's name is announced (company request, 2026-11-16). */
    slug: "ceo",
    name: "Coming Soon",
    initials: "CEO",
    role: "Chief Executive Officer (CEO)",
    tier: "leadership",
    description:
      "As Chief Executive Officer, the CEO provides overall leadership and strategic direction, supporting thoughtful decision making, organizational coordination, and a clear focus on the company’s long term corporate priorities.",
    email: "ceoname@hager-investment.com",
  },
  {
    slug: "raphael-varga",
    name: "Raphael Varga",
    initials: "RV",
    role: "Co-Director",
    tier: "directors",
    description:
      "As Co-Director, Raphael contributes to corporate oversight and strategic discussions, helping align business priorities, governance considerations, and collaborative decision making with the company’s broader long term investment perspective.",
    email: "raphael.varga@hager-investment.com",
  },
  {
    slug: "eugenio-pietro-varga",
    name: "Eugenio Pietro Varga",
    initials: "EV",
    role: "Co-Director",
    tier: "directors",
    description:
      "As Co-Director, Eugenio supports strategic planning and organizational coordination, bringing a considered approach to corporate matters, collaborative leadership, and the evaluation of long term business priorities and opportunities.",
    email: "eugenio.p@hager-investment.com",
  },
  {
    slug: "joseph-friedman",
    name: "Joseph Friedman",
    initials: "JF",
    role: "Manager",
    tier: "management",
    description:
      "As Manager, Joseph supports operational coordination and day to day business activities, helping maintain clear communication, organized processes, and practical alignment with the company’s strategic and operational objectives.",
    email: "joseph.friedman@hager-investment.com",
  },
  {
    slug: "baisodrime-fal",
    name: "Baisodrime Fal",
    initials: "BF",
    role: "Manager",
    tier: "management",
    description:
      "As Manager, Baisodrime contributes to business administration and internal coordination, supporting efficient workflows, constructive communication, and a professional approach to everyday responsibilities across the company's wider business operations.",
    email: "baisodrime.fal@hager-investment.com",
  },
];

export const generalEmail = contactDetails.email ?? "info@hager-investment.com";

export const tmHero = {
  eyebrow: "Our Team",
  titleLines: ["The People Behind", "HAGER INVESTMENT."],
  description:
    "Meet the leadership and management of HAGER INVESTMENT, a Luxembourg-established company with a corporate history dating to 1993.",
};

export const tmMembers = {
  eyebrow: "Leadership & Management",
  title: ["The People Who", "Guide the Company."],
  intro: "Five people, one long-term perspective. Each member of the team can be contacted directly.",
};

export const tmClosing = {
  eyebrow: "Get in Touch",
  title: ["Start a", "Conversation."],
  body: "For general enquiries, write to our team. For a specific matter, you can contact a team member directly using the addresses above.",
};
