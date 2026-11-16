import type { MetadataRoute } from "next";

import { IMPRESSUM_APPROVED, siteConfig } from "@/config/site";
import { LEGAL_APPROVED, legalDocs } from "@/content/legal";
import { sectorPages, servicePages } from "@/content/subpages";

/** Add future routes here (or generate them from the CMS). */
/* Insights is postponed (sample content only), so it stays out of the sitemap and is noindex. */
const routes = ["/", "/about", "/team", "/investment-universe", "/expertise", "/approach", "/partners", "/contact"];
/* Legal documents join the sitemap only once approved. */
const legalRoutes = [...(LEGAL_APPROVED ? legalDocs.map((d) => d.href) : []), ...(IMPRESSUM_APPROVED ? ["/impressum"] : [])];

export default function sitemap(): MetadataRoute.Sitemap {
  const subpages = [...sectorPages, ...servicePages].map((p) => p.href);
  return [...routes, ...subpages, ...legalRoutes].map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : routes.includes(route) ? 0.8 : 0.6,
  }));
}
