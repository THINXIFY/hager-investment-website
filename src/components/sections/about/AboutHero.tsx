import type { CSSProperties } from "react";

import { HeroMembrane } from "@/components/sections/contact/HeroMembrane";
import { aboutHero } from "@/content/about";

import { HeroFilm } from "./HeroFilm";

/**
 * About hero: one composition over a full-bleed background film.
 * The poster paints first and the film fades in beneath restrained shading; the headline
 * rises in two masked lines and the supporting copy follows. On scroll-out the film
 * recedes into an inset panel, pushes in and darkens while the copy lifts away
 * (ScrollAnimations: data-hero-inset/-zoom/-veil/-drift/-scroll). The film pauses off
 * screen, honours reduced motion and Save-Data, and has a visible pause control. Over the film
 * lies the interactive "membrane" mesh (HeroMembrane), receding and darkening with it.
 */
export function AboutHero() {
  return (
    <section
      id="top"
      data-header-overlay=""
      aria-labelledby="about-hero-title"
      className="tone-obsidian relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-obsidian text-white"
    >
      <HeroFilm src={aboutHero.film.src} poster={aboutHero.film.poster} overlay={<HeroMembrane focus="[data-membrane-focus]" />} />

      {/* Fact plaque: verified identity, fading in line by line */}
      <dl data-hero-scroll="" data-membrane-focus="" className="absolute top-[calc(var(--header-h)+clamp(2rem,5vw,3.5rem))] right-(--spacing-gutter) z-10 hidden text-right lg:block">
        {[
          ["Established", "1993"],
          ["Registered in", "Luxembourg"],
          ["Legal form", "Société Anonyme"],
        ].map(([term, value], i) => (
          <div key={term} className="about-hero-fade border-b border-white/20 py-3 first:pt-0" style={{ "--i": i + 2 } as CSSProperties}>
            <dt className="text-[0.625rem] tracking-[0.2em] text-white/65 uppercase">{term}</dt>
            <dd className="mt-1 font-display text-[1.125rem] tracking-[-0.01em] text-white">{value}</dd>
          </div>
        ))}
      </dl>

      {/* Type */}
      <div className="container-site relative z-10 pt-[calc(var(--header-h)+4rem)] pb-[clamp(5.5rem,10vw,6.5rem)] lg:min-h-[max(100svh,46rem)] lg:flex lg:flex-col lg:justify-end lg:pb-[clamp(4.5rem,6vw,5.5rem)]">
        <div data-hero-scroll="" data-membrane-focus="">
          <p
            className="about-hero-fade text-eyebrow mb-7 flex items-center gap-3.5 text-white/85 lg:mb-10"
            style={{ "--i": 0 } as CSSProperties}
          >
            <span aria-hidden="true" className="h-px w-8 bg-teal" />
            {aboutHero.eyebrow}
          </p>

          <h1
            id="about-hero-title"
            className="font-display text-[clamp(2.75rem,1.25rem+4.9vw,5.625rem)] leading-[0.98] font-normal tracking-[-0.045em]"
          >
            <span data-hero-split="left" className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
              <span className="about-hero-line block" style={{ "--i": 0 } as CSSProperties}>
                {aboutHero.titleLead}
              </span>{" "}
            </span>
            <span data-hero-split="right" className="-mb-[0.14em] block overflow-hidden pb-[0.14em] lg:pl-[17%]">
              <em className="about-hero-line block text-white/90 italic" style={{ "--i": 1 } as CSSProperties}>
                {aboutHero.titleEmphasis}
              </em>
            </span>
          </h1>

          <div className="mt-10 grid gap-10 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end lg:mt-14 lg:w-[48%] lg:border-t lg:border-silver/30 lg:pt-8">
            <p className="about-hero-fade text-lede max-w-[27rem] text-white/85" style={{ "--i": 1 } as CSSProperties}>
              {aboutHero.supporting}
            </p>
            {/* Subtle scroll cue */}
            <a
              href="#who-we-are"
              className="about-hero-fade group hidden items-center gap-4 text-[0.6875rem] font-medium tracking-[0.18em] text-white/75 uppercase transition-colors hover:text-white sm:inline-flex"
              style={{ "--i": 2 } as CSSProperties}
            >
              <span aria-hidden="true" className="relative block h-14 w-px overflow-hidden bg-silver/30">
                <span className="scroll-cue-line absolute inset-0 block bg-teal" />
              </span>
              Scroll
              <span className="sr-only">to Who We Are</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
