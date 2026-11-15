import type { CSSProperties } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { LoopVideo, VideoToggle } from "@/components/ui/LoopVideo";
import { apHero, apStages } from "@/content/approach";

const pad = (n: number) => String(n).padStart(2, "0");

/** Ambient film: a lone figure walks toward a tall doorway of light across a misted floor. */
const FILM = {
  src: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_112712_da9d53df-6d27-4b12-bdf6-aa9dc2622bdf.mp4",
  poster: "/media/approach-poster.jpg",
};

/**
 * Approach hero (Obsidian, cinematic): a full-bleed looping film of a figure walking toward a
 * doorway of light, the doorway set right of centre on desktop so the copy holds the dark left
 * field. Soft side and bottom fades dissolve the film into Obsidian. The headline rises line by
 * line beside two actions and the four-stage index. On scroll-out the film pushes in, drifts and
 * darkens (ScrollAnimations data-hero-*). The film pauses off screen, honours reduced motion and
 * Data Saver (poster only) and has a visible pause control.
 */
export function ApHero() {
  const [lead, ...rest] = apHero.title.split(" to ");
  return (
    <section
      id="top"
      data-header-overlay=""
      aria-labelledby="ap-hero-title"
      className="tone-obsidian relative isolate flex min-h-[max(100svh,42rem)] flex-col justify-end overflow-hidden bg-[#070809] text-white"
    >
      {/* Film plane */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div data-hero-drift="" className="absolute inset-x-0 -top-[6%] -bottom-[6%]">
          <div data-hero-zoom="" className="ap-film absolute inset-0 lg:left-[18%]">
            <LoopVideo id="approach-film" inlineControl={false} src={FILM.src} poster={FILM.poster} videoClassName="object-[50%_58%]" />
          </div>
        </div>
        {/* Fades: bottom dissolve into Obsidian, side letterbox, a quiet top shade for the header */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(7_8_9/0)_62%,rgb(7_8_9/0.45)_74%,rgb(7_8_9/0.85)_86%,#070809_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#070809_0%,rgb(7_8_9/0.9)_22%,rgb(7_8_9/0.35)_42%,rgb(7_8_9/0)_58%,rgb(7_8_9/0)_88%,rgb(7_8_9/0.7)_100%)] max-lg:bg-[linear-gradient(to_bottom,rgb(7_8_9/0.55)_0%,rgb(7_8_9/0.35)_22%,rgb(7_8_9/0.72)_42%,rgb(7_8_9/0.78)_70%,rgb(7_8_9/0.94)_88%,#070809_100%)]" />
        <div className="absolute inset-x-0 top-0 h-[22%] bg-[linear-gradient(to_bottom,rgb(7_8_9/0.6),rgb(7_8_9/0))]" />
        <div data-hero-veil="" className="absolute inset-0 bg-obsidian opacity-0" />
      </div>

      <div className="container-site relative z-10 pt-[calc(var(--header-h)+clamp(5rem,16vh,9rem))] pb-[clamp(2rem,4vw,3rem)]">
        <div data-hero-scroll="" className="max-w-[40rem]">
          <p className="ap-hero-fade text-eyebrow mb-7 flex items-center gap-3.5 text-white/85" style={{ "--i": 0 } as CSSProperties}>
            <span aria-hidden="true" className="h-px w-8 bg-teal" />
            {apHero.eyebrow}
          </p>
          <h1 id="ap-hero-title" className="font-display text-[clamp(2.75rem,1.3rem+4.4vw,5.5rem)] leading-[0.98] font-normal tracking-[-0.05em]">
            <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
              <span className="ap-hero-line block">{rest.length ? `${lead} to` : apHero.title}</span>
            </span>{" "}
            {rest.length ? (
              <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
                <em className="ap-hero-line block text-white/80 italic [animation-delay:600ms]">{rest.join(" to ")}</em>
              </span>
            ) : null}
          </h1>
          <p className="ap-hero-fade text-lede mt-7 max-w-[30rem] text-white/80" style={{ "--i": 1 } as CSSProperties}>
            {apHero.description}
          </p>
          <div className="ap-hero-fade mt-9 flex flex-wrap items-center gap-x-8 gap-y-4" style={{ "--i": 2 } as CSSProperties}>
            <ButtonLink href="/contact" variant="light" arrow>
              Discuss an Opportunity
            </ButtonLink>
            <a href="#process" className="group inline-flex items-center gap-2.5 border-b border-white/30 pb-1 text-[0.9375rem] text-white transition-colors hover:border-white">
              How we work
              <span aria-hidden="true" className="transition-transform duration-500 ease-premium group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
          </div>
        </div>

        <div className="ap-hero-fade mt-[clamp(2rem,5vh,3.5rem)] flex justify-end pb-4" style={{ "--i": 3 } as CSSProperties}>
          <VideoToggle id="approach-film" label="Approach film" />
        </div>
        <nav aria-label="Four stages" className="ap-hero-fade" style={{ "--i": 3 } as CSSProperties}>
          <ol className="grid grid-cols-2 border-t border-white/15 sm:grid-cols-4">
            {apStages.stages.map((s, i) => (
              <li key={s.name} className={i > 0 ? "sm:border-l sm:border-white/12" : ""}>
                <a href={`#stage-${i + 1}`} className={"group relative flex h-full flex-col gap-1.5 py-5 pr-3 " + (i > 0 ? "sm:pl-5" : "")}>
                  <span aria-hidden="true" className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-teal transition-transform duration-700 ease-premium group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                  <span className="text-[0.6875rem] tracking-[0.14em] text-silver tabular-nums">{pad(i + 1)}</span>
                  <span className="text-[0.875rem] leading-[1.35] text-white/80 transition-colors group-hover:text-white">{s.name}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}
