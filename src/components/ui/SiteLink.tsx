import Link from "next/link";
import type { ComponentProps } from "react";

import { sectorPages, servicePages } from "@/content/subpages";

/**
 * Routes that exist today. Links to planned pages (About, Contact, Insights,
 * sector pages, legal pages) are still rendered, but are not prefetched, so
 * no 404 requests are made before those pages are built. Add a route here
 * once its page exists.
 */
const LIVE_ROUTES = new Set<string>([
  "/",
  "/about",
  "/investment-universe",
  "/expertise",
  "/approach",
  "/insights",
  "/contact",
  "/partners",
  "/team",
  "/legal-notice",
  "/privacy-policy",
  "/disclaimer",
  "/impressum",
  ...sectorPages.map((p) => p.href),
  ...servicePages.map((p) => p.href),
]);

const isPlanned = (href: ComponentProps<typeof Link>["href"]) => {
  if (typeof href !== "string") return false;
  if (href.startsWith("#") || /^[a-z]+:/i.test(href)) return false;
  const path = href.split(/[?#]/)[0] || "/";
  return !LIVE_ROUTES.has(path);
};

/** next/link with prefetching disabled for planned (not yet built) routes. */
export function SiteLink({ prefetch, ...props }: ComponentProps<typeof Link>) {
  return <Link prefetch={isPlanned(props.href) ? false : prefetch} {...props} />;
}
