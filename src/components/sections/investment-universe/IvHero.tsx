import type { CSSProperties } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { SiteLink as Link } from "@/components/ui/SiteLink";
import { ivHero, ivSectorList } from "@/content/investment-universe";

import { HeroBackground, HeroPreviewProvider, HeroSectorBar } from "./IvHeroStage";

/**
 * Investment Universe hero: a full-bleed night photograph of light trails crossing a valley
 * toward a city on the horizon. On load the image settles from a slow push-in while the
 * headline rises from its mask; teal trails trace the roads toward the city, stars shimmer and
 * the city glow breathes (IvHeroStage). Hovering or focusing a sector in the glass bar
 * cross-fades the hero to that sector's photograph with a caption; on scroll-out the frame recedes into an inset panel, pushes in
 * and darkens while the copy lifts away (ScrollAnimations: data-hero-*). A glass index of the
 * eleven sectors runs along the foot (with a link to the full directory), each linking to its sector page.
 */
export function IvHero() {
  const sectors = ivSectorList.map((s) => ({ slug: s.slug, name: s.name, body: s.body, image: s.image, focus: s.focus }));
  return (
    <section
      id="top"
      data-header-overlay=""
      aria-labelledby="iv-hero-title"
      className="tone-obsidian relative isolate flex min-h-[max(100svh,44rem)] flex-col overflow-hidden bg-obsidian text-white"
    >
      <HeroPreviewProvider sectors={sectors}>
      {/* Photographic field */}
      <div data-hero-inset="" className="absolute inset-0 -z-10 overflow-hidden">
        <div data-hero-drift="" className="absolute inset-x-0 -top-[6%] -bottom-[6%]">
          <div data-hero-zoom="" className="absolute inset-0">
            <HeroBackground image={ivHero.image} />
          </div>
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgb(9_11_13/0.72)_0%,rgb(9_11_13/0.3)_45%,rgb(9_11_13/0)_70%)]" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[45%] bg-[linear-gradient(to_top,rgb(9_11_13/0.85),rgb(9_11_13/0))]" />
        <div data-hero-veil="" aria-hidden="true" className="absolute inset-0 bg-obsidian opacity-0" />
      </div>

      {/* Copy */}
      <div className="container-site flex flex-1 flex-col justify-center pt-[calc(var(--header-h)+clamp(2rem,6vw,4rem))] pb-[clamp(2.5rem,5vw,3.5rem)]">
        <div data-hero-scroll="" className="max-w-[46rem]">
          <p className="iv-hero-fade text-eyebrow mb-7 flex items-center gap-3.5 text-white/85" style={{ "--i": 0 } as CSSProperties}>
            <span aria-hidden="true" className="h-px w-8 bg-teal" />
            {ivHero.eyebrow}
          </p>
          <h1 id="iv-hero-title" className="font-display text-[clamp(2.75rem,1.3rem+4.6vw,5.5rem)] leading-[0.98] font-normal tracking-[-0.05em]">
            <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
              <span className="iv-hero-line block" style={{ "--i": 0 } as CSSProperties}>
                {ivHero.title}
              </span>
            </span>
          </h1>
          <p className="iv-hero-fade text-lede mt-8 max-w-[32rem] text-white/85" style={{ "--i": 1 } as CSSProperties}>
            {ivHero.description}
          </p>
          <div className="iv-hero-fade mt-10 flex flex-wrap items-center gap-x-8 gap-y-4" style={{ "--i": 2 } as CSSProperties}>
            <ButtonLink href={ivHero.cta.href} variant="light" arrow>
              {ivHero.cta.label}
            </ButtonLink>
            <Link href="/approach" className="group inline-flex items-center gap-2.5 border-b border-white/30 pb-1 text-[0.9375rem] text-white transition-colors hover:border-white">
              Our approach
              <span aria-hidden="true" className="transition-transform duration-500 ease-premium group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Glass sector index: hover/focus previews each sector behind the hero */}
      <HeroSectorBar style={{ "--i": 3 } as CSSProperties} />
      </HeroPreviewProvider>
    </section>
  );
}
