import Image from "next/image";
import type { CSSProperties } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { SiteLink as Link } from "@/components/ui/SiteLink";
import { exHero, exServices } from "@/content/expertise";

import { DisciplineRotator } from "./DisciplineRotator";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Expertise hero: a full-bleed, low-lit architectural interior where warm light glows through
 * a perforated screen. The photograph settles from a slow push-in and a light sweep crosses it
 * once; the headline rises from its mask and a single line cycles through the six disciplines.
 * On scroll-out the frame recedes into an inset panel, pushes in and darkens (data-hero-*).
 * A glass bar along the foot links the six discipline pages.
 */
export function ExHero() {
  const names = exServices.items.map((s) => s.name);
  return (
    <section
      id="top"
      data-header-overlay=""
      aria-labelledby="ex-hero-title"
      className="tone-obsidian relative isolate flex min-h-[max(100svh,44rem)] flex-col overflow-hidden bg-obsidian text-white"
    >
      <div data-hero-inset="" className="absolute inset-0 -z-10 overflow-hidden">
        <div data-hero-drift="" className="absolute inset-x-0 -top-[6%] -bottom-[6%]">
          <div data-hero-zoom="" className="absolute inset-0">
            <div className="ex-hero-settle absolute inset-0">
              <Image src={exHero.image.src} alt={exHero.image.alt} fill preload quality={85} placeholder="blur" sizes="100vw" className="photo-img object-cover object-[62%_50%]" />
            </div>
          </div>
        </div>
        {/* A single warm light sweep crosses the frame after load */}
        <div aria-hidden="true" className="ex-hero-sweep pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-[linear-gradient(100deg,rgb(255_214_160/0)_0%,rgb(255_214_160/0.14)_50%,rgb(255_214_160/0)_100%)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgb(9_11_13/0.82)_0%,rgb(9_11_13/0.45)_45%,rgb(9_11_13/0.05)_75%)]" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[40%] bg-[linear-gradient(to_top,rgb(9_11_13/0.85),rgb(9_11_13/0))]" />
        <div data-hero-veil="" aria-hidden="true" className="absolute inset-0 bg-obsidian opacity-0" />
      </div>

      <div className="container-site flex flex-1 flex-col justify-center pt-[calc(var(--header-h)+clamp(2rem,6vw,4rem))] pb-[clamp(2.5rem,5vw,3.5rem)]">
        <div data-hero-scroll="" className="max-w-[46rem]">
          <p className="ex-hero-fade text-eyebrow mb-7 flex items-center gap-3.5 text-white/85" style={{ "--i": 0 } as CSSProperties}>
            <span aria-hidden="true" className="h-px w-8 bg-teal" />
            {exHero.eyebrow}
          </p>
          <h1 id="ex-hero-title" className="font-display text-[clamp(2.75rem,1.3rem+4.6vw,5.5rem)] leading-[0.98] font-normal tracking-[-0.05em]">
            <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
              <span className="ex-hero-line block">{exHero.title}</span>
            </span>
          </h1>
          <p className="ex-hero-fade mt-7 flex items-center gap-4 font-display text-[clamp(1.25rem,1.05rem+0.7vw,1.75rem)] tracking-[-0.02em] text-white/60" style={{ "--i": 1 } as CSSProperties}>
            <span aria-hidden="true" className="h-px w-10 bg-teal" />
            <span className="sr-only">Six disciplines: {names.join(", ")}.</span>
            <DisciplineRotator names={names} />
          </p>
          <p className="ex-hero-fade text-lede mt-7 max-w-[32rem] text-white/85" style={{ "--i": 2 } as CSSProperties}>
            {exHero.description}
          </p>
          <div className="ex-hero-fade mt-10 flex flex-wrap items-center gap-x-8 gap-y-4" style={{ "--i": 3 } as CSSProperties}>
            <ButtonLink href={exHero.jump.href} variant="light" arrow>
              {exHero.jump.label}
            </ButtonLink>
            <Link href="/investment-universe" className="group inline-flex items-center gap-2.5 border-b border-white/30 pb-1 text-[0.9375rem] text-white transition-colors hover:border-white">
              Investment Universe
              <span aria-hidden="true" className="transition-transform duration-500 ease-premium group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>

      <nav aria-label="Disciplines" className="ex-hero-fade relative border-t border-white/15 bg-obsidian/35 backdrop-blur-md" style={{ "--i": 4 } as CSSProperties}>
        <ol className="container-site grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {exServices.items.map((s, i) => (
            <li key={s.slug} className="border-white/10 max-lg:border-b lg:border-l lg:first:border-l-0">
              <Link href={`/expertise/${s.slug}`} className={"group flex h-full flex-col gap-1.5 py-4 pr-3 transition-colors hover:bg-white/[0.04] lg:py-5 " + (i === 0 ? "lg:pr-4" : "lg:px-4")}>
                <span className="text-[0.6875rem] tracking-[0.14em] text-silver tabular-nums">{pad(i + 1)}</span>
                <span className="text-[0.875rem] leading-[1.3] text-white/85 transition-colors group-hover:text-white">{s.name}</span>
                <span aria-hidden="true" className="mt-1 block h-px w-6 bg-teal transition-[width] duration-500 ease-premium group-hover:w-12" />
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
}
