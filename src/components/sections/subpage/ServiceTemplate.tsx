import type { CSSProperties } from "react";

import { ScrollAnimations } from "@/components/motion/ScrollAnimations";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Section, type Tone } from "@/components/ui/Section";
import { SiteLink as Link } from "@/components/ui/SiteLink";
import { ReviewNote } from "@/components/ui/Typography";
import { parents, sectorBySlug, serviceBySlug, subpageNotes, type SectorPage, type ServicePage } from "@/content/subpages";
import { cn } from "@/lib/cn";

/* ==========================================================================
   THE INSTITUTIONAL ATELIER (EXD-02): the Expertise subpage system.
   Deliberately distinct from the sector template: four sections (signature hero,
   Understanding, a Focus Matrix with one prominent and two supporting areas, and a
   Strategic Perspective & Enquiry close); letter markers instead of numbering; no
   outlined mastheads, three-column bands or previous/next strip.
   ========================================================================== */

type Visual = "plate" | "plate-porcelain" | "lines" | "quote" | "photo";
type Variant = { hero: Tone; visual: Visual; understanding: Tone; focus: Tone; closing: Tone; mirror: boolean };

/** Controlled variation across the six pages. */
const VARIANTS: Record<string, Variant> = {
  "investment-strategy": { hero: "porcelain", visual: "plate", understanding: "white", focus: "platinum", closing: "petrol", mirror: false },
  "asset-management": { hero: "petrol", visual: "plate-porcelain", understanding: "porcelain", focus: "white", closing: "obsidian", mirror: true },
  "mergers-acquisitions": { hero: "obsidian", visual: "lines", understanding: "white", focus: "porcelain", closing: "petrol", mirror: false },
  "corporate-advisory": { hero: "porcelain", visual: "quote", understanding: "white", focus: "platinum", closing: "obsidian", mirror: true },
  "real-estate-investment": { hero: "porcelain", visual: "photo", understanding: "white", focus: "porcelain", closing: "petrol", mirror: false },
  "private-equity": { hero: "obsidian", visual: "quote", understanding: "porcelain", focus: "white", closing: "petrol", mirror: true },
};
const DEFAULT: Variant = { hero: "porcelain", visual: "plate", understanding: "white", focus: "platinum", closing: "petrol", mirror: false };
const dark = (t: Tone) => t === "petrol" || t === "obsidian";
const MARKERS = ["A", "B", "C"];

function Arrow({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={cn("size-3.5 shrink-0 transition-transform duration-500 ease-premium", className)} fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ 01 Hero *//* ------------------------------------------------------------------ 01 Hero */

function ServiceHero({ page, v }: { page: ServicePage; v: Variant }) {
  const onDark = dark(v.hero);
  return (
    <section id="top" aria-labelledby="svc-hero-title" className={cn(`tone-${v.hero}`, "relative isolate overflow-hidden pt-(--header-h)")}>
      <div className="container-site grid grid-cols-12 gap-x-col gap-y-10 py-[clamp(1.75rem,3.5vw,2.5rem)] lg:min-h-[clamp(18rem,calc(40svh-var(--header-h)),24rem)]">
        <div className="col-span-12 flex flex-col justify-center lg:col-span-7">
          <div>
            <p className="sub-fade text-eyebrow mb-5 flex items-center gap-3 text-(--fg-muted)" style={{ "--i": 1 } as CSSProperties}>
              <span aria-hidden="true" className="h-px w-8 bg-(--accent-ui)" />
              Expertise
            </p>
            <h1 id="svc-hero-title" className="font-display text-[clamp(2.5rem,1.35rem+3.6vw,4.375rem)] leading-[1] font-normal tracking-[-0.045em] text-(--fg)">
              <span className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
                <span className="sub-line block">{page.title}</span>
              </span>
            </h1>
            <p className="sub-fade text-lede mt-5 max-w-[36rem] text-(--fg-muted)" style={{ "--i": 2 } as CSSProperties}>
              {page.intro}
            </p>
          </div>
        </div>

        <div className="sub-fade col-span-12 lg:col-span-5" style={{ "--i": 3 } as CSSProperties}>
          {v.visual === "photo" && page.image ? (
            <div className="sub-frame h-full">
              <Photo src={page.image.src} alt={page.image.alt} sizes="(min-width: 1024px) 38vw, 100vw" quality={85} preload parallax className="aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[15rem]" />
            </div>
          ) : v.visual === "quote" ? (
            <figure className={cn("flex h-full flex-col justify-end border-l pl-[clamp(1.5rem,3vw,2.5rem)]", onDark ? "border-white/15" : "border-(--line)")}>
              <span aria-hidden="true" className="mb-6 block h-[2px] w-12 bg-teal" />
              <blockquote className="font-display text-[clamp(1.75rem,1.3rem+1.4vw,2.625rem)] leading-[1.15] tracking-[-0.03em] text-(--fg) italic">{page.overview.title}</blockquote>
              <figcaption className="mt-5 text-[0.75rem] tracking-[0.16em] text-(--fg-subtle) uppercase">{page.name}</figcaption>
            </figure>
          ) : (
            <nav
              aria-label={`${page.name}: areas of focus`}
              className={cn(
                "flex h-full flex-col justify-center p-[clamp(1.25rem,2.5vw,2rem)]",
                v.visual === "plate" && "bg-white",
                v.visual === "plate-porcelain" && "bg-porcelain",
                v.visual === "lines" && "border border-white/12",
              )}
            >
              <p className={cn("text-eyebrow mb-4", v.visual === "lines" ? "text-silver" : "text-petrol/70")}>In focus</p>
              <ol className={cn("border-t", v.visual === "lines" ? "border-white/12" : "border-petrol/15")}>
                {page.focus.map((f, i) => (
                  <li key={f.name} className={cn("border-b", v.visual === "lines" ? "border-white/12" : "border-petrol/15")}>
                    <a href={`#focus-${i + 1}`} className={cn("group flex items-center justify-between gap-4 py-3.5 transition-colors", v.visual === "lines" ? "text-white hover:text-silver" : "text-obsidian hover:text-teal")}>
                      <span className="flex items-baseline gap-4">
                        <span className="font-display text-[0.9375rem] text-teal">{MARKERS[i]}</span>
                        <span className="font-display text-[clamp(1.125rem,1rem+0.4vw,1.375rem)] tracking-[-0.015em]">{f.name}</span>
                      </span>
                      <span aria-hidden="true" className="transition-transform duration-500 ease-premium group-hover:translate-y-0.5">↓</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 02 Understanding */

function Understanding({ page, v }: { page: ServicePage; v: Variant }) {
  const [lead, support] = page.overview.paragraphs;
  return (
    <Section id="understanding" tone={v.understanding} spaced={false} aria-labelledby="svc-understanding-title" className="py-[clamp(3.75rem,6.5vw,5.5rem)]">
      <div className="container-site">
        <h2 id="svc-understanding-title" data-reveal="" className="text-eyebrow mb-[clamp(2rem,4vw,3rem)] flex items-center gap-3 text-(--fg-muted)">
          <span aria-hidden="true" className="relative block h-px w-16 bg-(--line)">
            <span data-draw-line="" className="absolute inset-0 block bg-(--accent-ui)" />
          </span>
          Understanding {page.name}
        </h2>
        <div className="grid grid-cols-12 gap-x-col gap-y-10">
          <div data-reveal="" className={cn("col-span-12 border-l-2 border-teal pl-[clamp(1.25rem,2.5vw,2rem)] lg:col-span-7", v.mirror && "lg:order-2 lg:col-start-6")}>
            <p className="font-display text-[clamp(1.5rem,1.15rem+1.15vw,2.375rem)] leading-[1.25] tracking-[-0.025em] text-(--fg)">{lead}</p>
          </div>
          <div data-reveal="" className={cn("col-span-12 lg:col-span-4", v.mirror ? "lg:order-1 lg:col-start-1" : "lg:col-start-9")}>
            {v.visual !== "quote" ? (
              <>
                <p className="font-display text-[1.375rem] leading-[1.25] tracking-[-0.02em] text-petrol italic">“{page.overview.title.replace(/\.$/, "")}.”</p>
                <span aria-hidden="true" className="my-5 block h-px w-10 bg-(--line)" />
              </>
            ) : null}
            <p className="text-(--fg-muted)">{support}</p>
            <ReviewNote value={subpageNotes.service} className="mt-5" />
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ 03 Focus Matrix */

/**
 * Areas of Strategic Focus: one prominent area and two supporting areas, all visible. Fine
 * dividers; on hover the area's surface warms and its teal rule extends. Mirrored on
 * alternate pages. Lettered A–C (not the sector pages' numbering).
 */
function FocusMatrix({ page, v }: { page: ServicePage; v: Variant }) {
  const [lead, ...rest] = page.focus;
  if (!lead) return null;
  return (
    <Section id="focus" tone={v.focus} spaced={false} aria-labelledby="svc-focus-title" className="py-[clamp(3.75rem,6.5vw,5.5rem)]">
      <div className="container-site">
        <div className="mb-[clamp(2rem,4vw,3rem)] flex flex-wrap items-end justify-between gap-4">
          <h2 id="svc-focus-title" data-split="" className="font-display text-[clamp(2rem,1.3rem+2.2vw,3.25rem)] leading-[1.02] font-normal tracking-[-0.04em] text-(--fg)">
            Areas of Strategic Focus
          </h2>
          <p data-reveal="" className="text-[0.75rem] tracking-[0.16em] text-(--fg-subtle) uppercase">
            {page.name} · Three areas
          </p>
        </div>

        <div data-seq-group="0.12" className="grid grid-cols-12 border-y border-(--line)">
          <article
            data-seq=""
            id="focus-1"
            className={cn(
              "group relative col-span-12 flex scroll-mt-[calc(var(--header-h)+1.5rem)] flex-col justify-center gap-6 py-[clamp(2rem,4vw,3rem)] transition-colors duration-700 ease-premium hover:bg-(--surface) lg:col-span-7 lg:px-[clamp(1.5rem,3vw,2.5rem)]",
              v.mirror ? "lg:order-2 lg:border-l lg:border-(--line)" : "lg:border-r lg:border-(--line)",
            )}
          >
            <span aria-hidden="true" className="absolute top-0 left-0 h-[2px] w-16 bg-teal transition-[width] duration-700 ease-premium group-hover:w-full" />
            <p className="flex items-center gap-3 text-[0.75rem] tracking-[0.16em] text-(--accent) uppercase">
              <span className="font-display text-[1rem] tracking-normal normal-case">{MARKERS[0]}</span>
              Principal focus
            </p>
            <span aria-hidden="true" className="block h-px w-10 bg-(--line)" />
            <div>
              <h3 className="font-display text-[clamp(1.875rem,1.35rem+1.6vw,3rem)] leading-[1.05] tracking-[-0.035em] text-(--fg)">{lead.name}</h3>
              <p className="mt-5 max-w-[30rem] text-[clamp(1.0625rem,1rem+0.3vw,1.25rem)] leading-[1.55] text-(--fg-muted)">{lead.body}</p>
            </div>
          </article>

          <div className={cn("col-span-12 grid lg:col-span-5", v.mirror && "lg:order-1")}>
            {rest.map((f, i) => (
              <article
                key={f.name}
                data-seq=""
                id={`focus-${i + 2}`}
                className="group relative flex scroll-mt-[calc(var(--header-h)+1.5rem)] flex-col gap-3 border-t border-(--line) py-[clamp(1.5rem,3vw,2.25rem)] transition-colors duration-700 ease-premium lg:px-[clamp(1.5rem,3vw,2.25rem)] lg:first:border-t-0 hover:bg-(--surface)"
              >
                <span aria-hidden="true" className="absolute top-0 left-0 h-[2px] w-0 bg-teal transition-[width] duration-700 ease-premium group-hover:w-full" />
                <p className="flex items-center gap-3 text-[0.6875rem] tracking-[0.16em] text-(--fg-subtle) uppercase">
                  <span className="font-display text-[0.9375rem] tracking-normal text-(--accent) normal-case">{MARKERS[i + 1]}</span>
                  Supporting focus
                </p>
                <h3 className="font-display text-[clamp(1.375rem,1.15rem+0.7vw,1.875rem)] leading-[1.12] tracking-[-0.025em] text-(--fg)">{f.name}</h3>
                <p className="max-w-[28rem] text-(--fg-muted)">{f.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ 04 Perspective & Enquiry */

function Enquiry({ page, v }: { page: ServicePage; v: Variant }) {
  const related: { label: string; name: string; href: string }[] = [
    ...page.related.map((s) => serviceBySlug(s)).filter((s): s is ServicePage => !!s).map((s) => ({ label: "Expertise", name: s.name, href: s.href })),
    ...(page.relatedSector ? [sectorBySlug(page.relatedSector)].filter((s): s is SectorPage => !!s).map((s) => ({ label: "Sector", name: s.name, href: s.href })) : []),
  ];
  return (
    <section aria-labelledby="svc-enquiry-title" className={cn(`tone-${v.closing}`, "relative isolate overflow-hidden")}>
      <div className="container-site grid grid-cols-12 gap-x-col gap-y-12 py-[clamp(4rem,7vw,6rem)]">
        <div className="col-span-12 lg:col-span-7">
          <h2 id="svc-enquiry-title" className="text-eyebrow mb-7 flex items-center gap-3 text-(--fg-muted)">
            <span aria-hidden="true" className="h-px w-8 bg-teal" />
            Strategic Perspective
          </h2>
          <p data-split="" className="max-w-[26ch] font-display text-[clamp(1.75rem,1.2rem+1.7vw,2.75rem)] leading-[1.14] tracking-[-0.03em] text-white">
            {page.closing}
          </p>
          <div data-reveal="" className="mt-[clamp(2rem,4vw,2.75rem)] flex flex-col gap-6 border-t border-white/12 pt-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[26rem] text-(--fg-muted)">Organisations considering questions of {page.name.toLowerCase()} are welcome to start a conversation with HAGER INVESTMENT.</p>
            <ButtonLink href="/contact" variant="light" arrow className="shrink-0">
              Contact HAGER INVESTMENT
            </ButtonLink>
          </div>
        </div>

        <nav aria-label="Related expertise" className="col-span-12 md:col-span-8 lg:col-span-4 lg:col-start-9">
          <p className="text-eyebrow mb-4 text-silver">Related</p>
          <ul data-seq-group="0.1" className="border-b border-white/12">
            {related.map((r) => (
              <li key={r.href} data-seq="" className="border-t border-white/12">
                <Link href={r.href} className="group relative flex items-center justify-between gap-4 py-3.5">
                  <span className="flex items-baseline gap-3">
                    <span className="w-16 text-[0.625rem] tracking-[0.16em] text-white/50 uppercase">{r.label}</span>
                    <span className="text-[1.0625rem] text-white transition-colors group-hover:text-silver">{r.name}</span>
                  </span>
                  <Arrow className="text-silver group-hover:translate-x-1" />
                  <span aria-hidden="true" className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-teal transition-transform duration-700 ease-premium group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
          <Link href={parents.service.href} className="group mt-5 inline-flex items-center gap-2 text-[0.875rem] text-white/75 transition-colors hover:text-white">
            All expertise
            <Arrow className="group-hover:translate-x-1" />
          </Link>
        </nav>
      </div>
    </section>
  );
}

/** An Expertise subpage (EXD-02): hero, Understanding, Focus Matrix, Strategic Perspective & Enquiry. */
export function ServiceTemplate({ page }: { page: ServicePage }) {
  const v = VARIANTS[page.slug] ?? DEFAULT;
  return (
    <div data-subpage="service" data-variant={v.visual}>
      <ServiceHero page={page} v={v} />
      <Understanding page={page} v={v} />
      <FocusMatrix page={page} v={v} />
      <Enquiry page={page} v={v} />
      <ScrollAnimations />
    </div>
  );
}
