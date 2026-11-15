import type { CSSProperties } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";
import { PartnersMotion } from "./PartnersMotion";
import { PARTNERS_APPROVED, ptClosing, ptGallery, ptHero, ptRelationships } from "@/content/partners";

const pad = (n: number) => String(n).padStart(2, "0");

/** Hero (Warm Porcelain): compact editorial opening, the headline rising line by line. */
export function PtHero() {
  const words = ptHero.title.split(" ");
  const lines = [words.slice(0, 1).join(" "), words.slice(1).join(" ")];
  return (
    <section id="top" aria-labelledby="pt-hero-title" className="tone-porcelain relative overflow-hidden bg-porcelain pt-(--header-h)">
      <div className="container-site pt-[clamp(3.5rem,8vw,6rem)] pb-[clamp(2.75rem,5vw,4rem)]">
        <p className="ct-hero-fade text-eyebrow mb-7 flex items-center gap-3.5 text-petrol" style={{ "--i": 0 } as CSSProperties}>
          <span aria-hidden="true" className="h-px w-8 bg-teal" />
          {ptHero.eyebrow}
        </p>
        <div className="grid grid-cols-12 items-end gap-x-col gap-y-7">
          <h1 id="pt-hero-title" className="col-span-12 font-display text-[clamp(2.75rem,1.4rem+4.4vw,5.5rem)] leading-[0.98] font-normal tracking-[-0.05em] text-obsidian lg:col-span-8">
            {lines.map((line, i) => (
              <span key={line} className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
                <span className={cn("ct-hero-line block", i === 1 && "text-petrol")} style={{ "--i": i } as CSSProperties}>
                  {line}
                </span>{" "}
              </span>
            ))}
          </h1>
          <div className="ct-hero-fade col-span-12 lg:col-span-4 lg:pb-3" style={{ "--i": 1 } as CSSProperties}>
            <span aria-hidden="true" className="mb-5 block h-px w-12 bg-teal" />
            <p className="text-lede max-w-[26rem] text-(--fg-muted)">{ptHero.description}</p>
          </div>
        </div>
        <div className="ct-hero-fade mt-[clamp(2.5rem,5vw,3.5rem)] flex items-center justify-between gap-6 border-t border-petrol/12 pt-4 text-[0.6875rem] tracking-[0.18em] text-petrol/60 uppercase" style={{ "--i": 2 } as CSSProperties}>
          <span>HAGER INVESTMENT · Luxembourg</span>
          <span>Since 1993</span>
        </div>
      </div>
    </section>
  );
}

/**
 * Partner logos (White): a balanced 3 × 3 grid of quiet tiles. Each mark is shown in its own
 * colours at a per-logo height that evens out visual weight; hover lifts the tile, draws a teal
 * line and gently emphasises the logo. REVIEW-ONLY until PARTNERS_APPROVED (see content file).
 */
export function PtGallery() {
  return (
    <section id="partners" aria-labelledby="pt-gallery-title" className={cn("tone-white bg-white py-[clamp(4rem,7vw,6rem)]", !PARTNERS_APPROVED && "review-only")}>
      <div className="container-site">
        <div className="grid grid-cols-12 items-end gap-x-col gap-y-5">
          <div className="col-span-12 lg:col-span-6">
            <Eyebrow data-reveal="" className="mb-7">
              Partners
            </Eyebrow>
            <h2 id="pt-gallery-title" data-split="" className="font-display text-[clamp(2.25rem,1.4rem+2.6vw,3.75rem)] leading-[1.02] font-normal tracking-[-0.045em] text-obsidian">
              {ptGallery.title}
            </h2>
          </div>
          <p data-reveal="" className="text-lede col-span-12 max-w-[28rem] text-(--fg-muted) lg:col-span-5 lg:col-start-8 lg:pb-2">
            {ptGallery.subtitle}
          </p>
        </div>

        {!PARTNERS_APPROVED ? (
          <p className="review-only mt-8 border border-dashed border-error px-4 py-3 text-sm leading-[1.55] text-error">
            <span className="mb-1 block text-[0.6875rem] font-semibold tracking-[0.14em] uppercase">Launch blocker</span>
            {ptGallery.review.replace(/^LAUNCH BLOCKER:\s*/, "")}
          </p>
        ) : null}

        <ul id="partner-grid" className="mt-[clamp(2.25rem,4vw,3.25rem)] grid grid-cols-2 gap-[clamp(0.625rem,1.4vw,1.25rem)] lg:grid-cols-3">
          {ptGallery.partners.map((p, i) => (
            <li key={p.name} className="max-lg:last:col-span-2">
              <figure className="pt-tile group relative grid aspect-[16/10] place-items-center max-lg:[li:last-child>&]:aspect-[32/10] overflow-hidden rounded-[7px] border border-petrol/[0.08] bg-white">
                <span aria-hidden="true" className="absolute top-3.5 left-4 text-[0.625rem] tracking-[0.14em] text-petrol/35 tabular-nums">{pad(i + 1)}</span>
                {/* eslint-disable-next-line @next/next/no-img-element -- brand marks shown as supplied (incl. SVG), never re-encoded */}
                <img
                  src={p.src}
                  alt={`${p.name} logo`}
                  width={p.width}
                  height={p.height}
                  loading="lazy"
                  decoding="async"
                  className="pt-logo object-contain"
                  style={{ "--logo-h": `${p.h}px` } as CSSProperties}
                />
                <figcaption className="sr-only">{p.name}</figcaption>
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-teal transition-transform duration-700 ease-premium group-hover:scale-x-100" />
              </figure>
            </li>
          ))}
        </ul>
        <PartnersMotion gridId="partner-grid" />
      </div>
    </section>
  );
}

/** Relationships (Imperial Petrol): compact editorial statement over slow, drifting light. */
export function PtRelationships() {
  return (
    <section aria-labelledby="pt-rel-title" className="tone-petrol relative isolate overflow-hidden bg-petrol py-[clamp(4.5rem,8vw,6.5rem)] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="pt-drift absolute -top-1/3 -left-[10%] size-[56rem] max-w-[120vw] rounded-full bg-[radial-gradient(circle,rgb(17_123_137/0.32),transparent_62%)]" />
        <div className="pt-drift-alt absolute -right-[15%] -bottom-1/2 size-[48rem] max-w-[110vw] rounded-full bg-[radial-gradient(circle,rgb(169_193_197/0.1),transparent_62%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgb(218_232_234/0.04)_1px,transparent_1px),linear-gradient(90deg,rgb(218_232_234/0.04)_1px,transparent_1px)] bg-[size:88px_88px] [mask-image:radial-gradient(ellipse_70%_80%_at_30%_40%,black,transparent_75%)]" />
      </div>
      <div className="container-site grid grid-cols-12 items-end gap-x-col gap-y-8">
        <div className="col-span-12 lg:col-span-7">
          <Eyebrow data-reveal="" className="mb-8">
            {ptRelationships.eyebrow}
          </Eyebrow>
          <h2 id="pt-rel-title" data-split="" className="max-w-[16ch] font-display text-[clamp(2.375rem,1.4rem+3vw,4.25rem)] leading-[1] font-normal tracking-[-0.045em]">
            {ptRelationships.title}
          </h2>
        </div>
        <div data-reveal="" className="col-span-12 lg:col-span-4 lg:col-start-9 lg:pb-2">
          <span aria-hidden="true" className="relative mb-6 block h-px bg-white/15">
            <span data-draw-line="" className="absolute inset-y-0 left-0 block w-full origin-left bg-teal" />
          </span>
          <p className="text-lede text-white/80">{ptRelationships.body}</p>
        </div>
      </div>
    </section>
  );
}

/** Closing (Warm Porcelain): a compact invitation that hands over to the footer. */
export function PtClosing() {
  return (
    <section aria-labelledby="pt-closing-title" className="tone-porcelain bg-porcelain py-[clamp(3.5rem,6vw,5rem)]">
      <div className="container-site flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 id="pt-closing-title" data-split="" className="font-display text-[clamp(2rem,1.3rem+2.2vw,3.25rem)] leading-[1.04] font-normal tracking-[-0.04em] text-obsidian">
            {ptClosing.title}
          </h2>
          <p data-reveal="" className="mt-4 max-w-[30rem] text-(--fg-muted)">
            {ptClosing.body}
          </p>
        </div>
        <div data-reveal="">
          <ButtonLink href={ptClosing.cta.href} variant="dark" arrow>
            {ptClosing.cta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
