import Image from "next/image";
import type { CSSProperties } from "react";

import { RequestDocumentsButton } from "@/components/documents/RequestDocumentsButton";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { ctHero, officeAddress } from "@/content/contact";

import { HeroMembrane } from "./HeroMembrane";
import { LuxClock } from "./LuxClock";

/**
 * Contact hero (Obsidian): a corporate front desk. A dark, double-height interior fills the
 * frame behind the copy; the headline rises line by line beside two actions (send an enquiry,
 * request private documents), over an interactive "membrane" mesh that ripples under the
 * cursor (HeroMembrane). Along the base runs a reception bar: registered office, live local
 * time in Luxembourg and the company register entry, each linking to its section below.
 */
export function CtHero() {
  const bar = [
    { label: "Registered Office", value: officeAddress.slice(1).join(", ") || officeAddress[0], href: "#office" },
    { label: "Local Time · Luxembourg", value: <LuxClock />, href: "#office" },
    { label: "Trade and Companies Register", value: `RCS ${siteConfig.registration}`, href: "#company" },
  ];
  return (
    <section id="top" data-header-overlay="" aria-labelledby="ct-hero-title" className="tone-obsidian relative isolate overflow-hidden bg-obsidian text-white">
      {/* Photograph */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <div data-hero-drift="" className="absolute inset-x-0 -top-[6%] -bottom-[6%]">
          <div className="iv-hero-settle absolute inset-0">
            <Image src={ctHero.image.src} alt="" fill preload quality={85} placeholder="blur" sizes="100vw" className="object-cover object-[30%_42%] opacity-70" />
          </div>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(9_11_13/0.94)_0%,rgb(9_11_13/0.72)_45%,rgb(9_11_13/0.25)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(9_11_13/0.95),rgb(9_11_13/0)_45%)]" />
        <HeroMembrane />
        <div className="ct-hero-glow absolute -bottom-1/3 left-[8%] size-[min(60rem,90vw)] rounded-full bg-[radial-gradient(circle,rgb(17_123_137/0.28),transparent_62%)]" />
      </div>

      <div className="container-site flex min-h-[max(78svh,38rem)] flex-col pt-[calc(var(--header-h)+clamp(3rem,8vw,6rem))]">
        <div data-hero-scroll="" className="max-w-[46rem]">
          <p className="ct-hero-fade text-eyebrow mb-7 flex items-center gap-3.5 text-white/85" style={{ "--i": 0 } as CSSProperties}>
            <span aria-hidden="true" className="h-px w-8 bg-teal" />
            {ctHero.eyebrow}
          </p>
          <h1 id="ct-hero-title" className="font-display text-[clamp(2.75rem,1.3rem+4.6vw,5.5rem)] leading-[0.98] font-normal tracking-[-0.05em]">
            {ctHero.titleLines.map((line, i) => (
              <span key={line} className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
                <span className="ct-hero-line block" style={{ "--i": i } as CSSProperties}>
                  {line}
                </span>
                {i < ctHero.titleLines.length - 1 ? " " : null}
              </span>
            ))}
          </h1>
          <p className="ct-hero-fade text-lede mt-7 max-w-[34rem] text-white/75" style={{ "--i": 1 } as CSSProperties}>
            {ctHero.description}
          </p>
          <div className="ct-hero-fade mt-9 flex flex-wrap gap-3.5" style={{ "--i": 2 } as CSSProperties}>
            <ButtonLink href="#enquiry" variant="light" arrow>
              Send an Enquiry
            </ButtonLink>
            <RequestDocumentsButton variant="outline" className="text-white" />
          </div>
        </div>

        {/* Reception bar */}
        <ul className="ct-hero-fade mt-auto grid border-t border-white/15 pt-0 sm:grid-cols-3" style={{ "--i": 3 } as CSSProperties}>
          {bar.map((b, i) => (
            <li key={b.label} className={i > 0 ? "border-t border-white/15 sm:border-t-0 sm:border-l" : ""}>
              <a href={b.href} className={"group relative flex h-full items-end justify-between gap-4 py-6 transition-colors duration-500 hover:bg-white/[0.03] sm:py-7 " + (i > 0 ? "sm:pl-[clamp(1.25rem,2.5vw,2rem)]" : "") + " sm:pr-[clamp(1rem,2vw,1.5rem)]"}>
                <span>
                  <span className="text-eyebrow block text-[0.6875rem] text-silver">{b.label}</span>
                  <span className="mt-2.5 block font-display text-[clamp(1.25rem,1.05rem+0.6vw,1.625rem)] leading-[1.15] tracking-[-0.02em] text-white">{b.value}</span>
                </span>
                <span aria-hidden="true" className="text-teal transition-transform duration-500 ease-premium group-hover:translate-y-1">
                  ↓
                </span>
                <span aria-hidden="true" className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-teal transition-transform duration-700 ease-premium group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
