import { Fragment, type CSSProperties } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { statement } from "@/content/home";

import { StatementAperture } from "./StatementAperture";

/**
 * Homepage statement, "Aperture": a full-screen scroll moment. The photograph opens from an oval
 * aperture to full bleed with a slow depth zoom, two smog layers drift across them, a
 * giant outlined wordmark glides behind the copy, and the headline lights word by word; the
 * supporting line and action arrive once the photograph has opened. All of it follows the scroll
 * (and reverses with it); reduced motion shows the finished composition.
 */
export function Statement() {
  const lines = [statement.titleLead, statement.titleEmphasis];
  const words = lines.map((l) => l.split(" "));
  const total = words.flat().length;
  const offsets = words.map((_, li) => words.slice(0, li).flat().length);
  return (
    <StatementAperture words={total}>
      <div className="st-stage sticky top-0 h-svh min-h-[36rem] overflow-hidden bg-obsidian">
        {/* The photograph, opening from a window to full bleed */}
        <div aria-hidden="true" className="st-window absolute inset-0 overflow-hidden">
          <div className="st-zoom absolute inset-0">
            <Photo src={statement.image.src} alt="" sizes="100vw" quality={85} className="h-full w-full" />
          </div>
          {/* Smog drifting through the towers */}
          <div className="st-haze pointer-events-none absolute inset-0 overflow-hidden">
            <span className="hs-haze-layer hs-haze-a" />
            <span className="hs-haze-layer hs-haze-b" />
          </div>
          {/* Shading deepens as the window opens, so the headline stays legible */}
          <div className="st-shade absolute inset-0" />
        </div>

        {/* Rings tracing the aperture while it is still an oval */}
        <span aria-hidden="true" className="st-ring pointer-events-none absolute" />
        <span aria-hidden="true" className="st-ring st-ring-orbit pointer-events-none absolute" />

        {/* Giant outlined wordmark gliding behind the copy */}
        <p aria-hidden="true" className="st-mark pointer-events-none absolute bottom-[-0.12em] left-0 font-display leading-none tracking-[-0.06em] whitespace-nowrap select-none">
          HAGER INVESTMENT
        </p>

        {/* Copy */}
        <div className="container-site relative flex h-full flex-col justify-start pt-[14svh] pb-16 lg:justify-center lg:py-24">
          <p className="st-eyebrow text-eyebrow mb-8 flex items-center gap-3.5 text-white/75 lg:mb-10">
            <span aria-hidden="true" className="st-eyebrow-rule h-px w-10 origin-left bg-teal" />
            HAGER INVESTMENT
            <span aria-hidden="true" className="hidden text-white/40 sm:inline">· Luxembourg · Est. 1993</span>
          </p>
          <h2 id="statement-title" className="max-w-[16ch] font-display text-[clamp(2.75rem,1.2rem+5.4vw,7.25rem)] leading-[0.98] font-normal tracking-[-0.045em] text-white">
            {words.map((lineWords, li) => (
              <span key={li} className={li === 1 ? "block italic" : "block"}>
                {lineWords.map((word, k) => {
                  const w = offsets[li]! + k;
                  return (
                    <Fragment key={k}>
                      <span data-st-word="" className={li === 1 ? "st-word st-word-em" : "st-word"} style={{ "--i": w } as CSSProperties}>
                        {word}
                      </span>{" "}
                    </Fragment>
                  );
                })}
              </span>
            ))}
          </h2>

          <div className="st-copy mt-10 max-w-[34rem] border-t border-white/20 pt-7 lg:mt-14">
            <p className="text-lede text-white/75">{statement.body}</p>
            <div className="mt-8">
              <ButtonLink href={statement.cta.href} variant="light" arrow>
                {statement.cta.label}
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* Scroll progress, bottom right */}
        <div aria-hidden="true" className="st-progress absolute right-(--spacing-gutter) bottom-8 hidden h-24 w-px overflow-hidden bg-white/15 md:block">
          <span className="absolute inset-0 origin-top bg-teal" />
        </div>
      </div>
    </StatementAperture>
  );
}
