import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { parents, sectorBySlug, serviceBySlug, type SectorPage, type ServicePage } from "@/content/subpages";

import { SectorTemplate } from "./SectorTemplate";
import { ServiceTemplate } from "./ServiceTemplate";

/**
 * Route helpers for the 13 subpages. Each subpage has its own static route file
 * (app/investment-universe/<slug>/page.tsx, app/expertise/<slug>/page.tsx) that resolves its
 * content here, so every page is prerendered and any unknown slug is a genuine 404.
 */
export function sectorRoute(slug: string): SectorPage {
  const page = sectorBySlug(slug);
  if (!page) throw new Error(`Unknown sector subpage: ${slug}`);
  return page;
}

export function serviceRoute(slug: string): ServicePage {
  const page = serviceBySlug(slug);
  if (!page) throw new Error(`Unknown service subpage: ${slug}`);
  return page;
}

export function subpageMetadata(page: SectorPage | ServicePage): Metadata {
  const parent = parents[page.kind];
  return {
    title: `${page.name} | ${parent.label}`,
    description: page.intro,
    alternates: { canonical: page.href },
    openGraph: { title: `${page.title} | ${siteConfig.name}`, description: page.intro, url: page.href },
  };
}

/** The page body plus WebPage structured data (no breadcrumbs anywhere on the site). */
export function SubpageRoute({ page }: { page: SectorPage | ServicePage }) {
  const parent = parents[page.kind];
  const url = (path: string) => new URL(path, siteConfig.url).toString();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    url: url(page.href),
    description: page.intro,
    isPartOf: { "@type": "WebPage", name: parent.label, url: url(parent.href) },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      {page.kind === "sector" ? <SectorTemplate page={page} /> : <ServiceTemplate page={page} />}
    </>
  );
}
