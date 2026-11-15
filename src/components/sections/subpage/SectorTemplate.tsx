import type { CSSProperties } from "react";

import { ScrollAnimations } from "@/components/motion/ScrollAnimations";
import { ButtonLink } from "@/components/ui/Button";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";
import { Section, type Tone } from "@/components/ui/Section";
import { SiteLink as Link } from "@/components/ui/SiteLink";
import { ReviewNote } from "@/components/ui/Typography";
import { investNote, parents, sectorBySlug, sectorFilms, sectorInvest, sectorPages, sectorPhotos, serviceBySlug, type SectorPage, type ServicePage } from "@/content/subpages";
import { cn } from "@/lib/cn";

import { SubThemes } from "./SubThemes";

const pad = (n: number) => String(n).padStart(2, "0");
const dark = (t: Tone) => t === "petrol" || t === "obsidian";

type Scheme = { hero: Tone; rationale: Tone; themes: Tone; focus: Tone; closing: Tone };
/** Three tonal rotations keep the eleven sector pages related but never identical. */
const SCHEMES: Record<"A" | "B" | "C", Scheme> = {
  A: { hero: "petrol", rationale: "white", themes: "obsidian", focus: "porcelain", closing: "petrol" },
  B: { hero: "obsidian", rationale: "porcelain", themes: "petrol", focus: "white", closing: "obsidian" },
  C: { hero: "porcelain", rationale: "white", themes: "petrol", focus: "platinum", closing: "obsidian" },
};

function Arrow({ className, dir = "right" }: { className?: string; dir?: "right" | "down" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={cn("size-3.5 shrink-0 transition-transform duration-500 ease-premium", className)} fill="none" stroke="currentColor" strokeWidth="1.4">
      {dir === "right" ? <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" /> : <path d="M8 2.5v11M3.5 9 8 13.5 12.5 9" />}
    </svg>
  );
}

/* ------------------------------------------------------------------ Hero */

/**
 * Cinematic investment hero: copy on the left of the site grid (investment
 * label, a title that rises from its mask, the introduction and two actions); a full-height
 * photograph bleeds to the right edge, opening upward and settling. A focus index runs along
 * the foot of the copy column as in-page navigation.
 */
function SectorHero({ page, tone }: { page: SectorPage; tone: Tone }) {
  const invest = sectorInvest[page.slug];
  const photo = sectorPhotos[page.slug];
  const onDark = dark(tone);
  return (
    <section id="top" className={cn(`tone-${tone}`, "relative isolate overflow-hidden pt-(--header-h)")}>
      <div className="grid lg:min-h-[clamp(34rem,calc(70svh-var(--header-h)),42rem)] lg:grid-cols-12">
        <div className="flex flex-col justify-between gap-10 px-(--spacing-gutter) pt-[clamp(2.5rem,5vw,3.5rem)] pb-[clamp(2rem,4vw,2.75rem)] lg:col-span-7 lg:pr-[clamp(2.5rem,5vw,5rem)] lg:pl-[max(var(--spacing-gutter),calc((100vw-var(--container))/2+var(--spacing-gutter)))]">
          <div>
            {invest ? (
              <p className="sub-fade text-eyebrow mb-5 flex items-center gap-3.5 text-(--fg-muted)" style={{ "--i": 1 } as CSSProperties}>
                <span aria-hidden="true" className="h-px w-8 bg-(--accent-ui)" />
                {invest.label}
              </p>
            ) : null}
            <h1 className={cn("font-display leading-[0.98] font-normal tracking-[-0.05em] text-(--fg)", page.title.length > 40 ? "text-[clamp(2.25rem,1.2rem+3vw,3.75rem)]" : page.title.length > 33 ? "text-[clamp(2.375rem,1.25rem+3.3vw,4.125rem)]" : "text-[clamp(2.625rem,1.35rem+4vw,5rem)]")}>
              <span className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
                <span className="sub-line block">{page.title}</span>
              </span>
            </h1>
            <p className="sub-fade text-lede mt-[clamp(1.5rem,2.5vw,2rem)] max-w-[36rem] text-(--fg-muted)" style={{ "--i": 2 } as CSSProperties}>
              {page.intro}
            </p>
            <div className="sub-fade mt-[clamp(1.75rem,3vw,2.25rem)] flex flex-wrap items-center gap-x-8 gap-y-4" style={{ "--i": 3 } as CSSProperties}>
              <ButtonLink href="/contact" variant={onDark ? "light" : "dark"} arrow>
                Discuss an Opportunity
              </ButtonLink>
              <a href="#focus" className="group inline-flex items-center gap-2.5 border-b border-(--line) pb-1 text-[0.9375rem] text-(--fg) transition-colors hover:border-(--accent) hover:text-(--accent)">
                Investment focus
                <Arrow dir="down" className="group-hover:translate-y-0.5" />
              </a>
            </div>
          </div>

          <nav aria-label="Focus areas" className="sub-fade hidden border-t border-(--line) pt-4 md:block" style={{ "--i": 4 } as CSSProperties}>
            <ol className="grid grid-cols-3 gap-x-6">
              {page.focus.map((f, i) => (
                <li key={f.name}>
                  <a href={`#focus-${i + 1}`} className="group flex items-baseline gap-3 text-[0.8125rem] leading-[1.35] text-(--fg-muted) transition-colors hover:text-(--fg)">
                    <span className="text-[0.6875rem] text-(--accent) tabular-nums">{pad(i + 1)}</span>
                    {f.name}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <div className="sub-frame relative min-h-[17rem] overflow-hidden bg-platinum sm:min-h-[24rem] lg:col-span-5 lg:min-h-0">
          {photo ? (
            <Photo src={photo.src} alt={photo.alt} sizes="(min-width: 1024px) 42vw, 100vw" quality={85} preload parallax className="absolute inset-0" objectPosition={photo.position} />
          ) : null}
          <span aria-hidden="true" className="absolute inset-y-0 left-0 hidden w-px bg-white/25 lg:block" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Rationale */

/**
 * Investment rationale: two fully used columns. Left: the heading, the supporting paragraph
 * and the review note. Right: the rationale statement, filling word by word as it is read,
 * then the considerations that matter in assessment set as a tinted two-column ledger.
 */
function SectorRationale({ page, tone }: { page: SectorPage; tone: Tone }) {
  const invest = sectorInvest[page.slug];
  if (!invest) return null;
  return (
    <Section id="rationale" tone={tone} spaced={false} aria-labelledby="sector-rationale-title" className="py-[clamp(3.5rem,6vw,5rem)]">
      <div className="container-site grid grid-cols-12 gap-x-col gap-y-10">
        <div className="col-span-12 flex flex-col lg:col-span-5">
          <Eyebrow data-reveal="" className="mb-6">
            Investment Rationale
          </Eyebrow>
          <h2 id="sector-rationale-title" data-split="" className="max-w-[16ch] font-display text-[clamp(1.875rem,1.25rem+2vw,3rem)] leading-[1.04] font-normal tracking-[-0.04em] text-(--fg)">
            {invest.rationaleTitle}
          </h2>
          <span aria-hidden="true" className="relative mt-[clamp(1.75rem,3vw,2.25rem)] block h-px w-full max-w-[28rem] bg-(--line)">
            <span data-draw-line="" className="absolute inset-0 block bg-(--accent-ui)" />
          </span>
          <p data-reveal="" className="mt-[clamp(1.5rem,2.5vw,2rem)] max-w-[30rem] text-(--fg-muted)">
            {invest.rationale[1]}
          </p>
          <div className="mt-6">
            <ReviewNote value={investNote} />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7 lg:col-start-6 lg:border-l lg:border-(--line) lg:pl-[clamp(2rem,4vw,3.5rem)]">
          <p data-fill="" className="font-display text-[clamp(1.375rem,1.05rem+1.1vw,2.125rem)] leading-[1.3] tracking-[-0.02em] text-(--fg)">
            {invest.rationale[0]}
          </p>
          <div data-reveal="" className="mt-[clamp(2rem,3.5vw,2.75rem)] bg-(--surface) px-[clamp(1.25rem,2.5vw,2rem)] py-[clamp(1.25rem,2.5vw,1.75rem)]">
            <p className="text-eyebrow mb-4 text-(--accent)">What matters in assessment</p>
            <ul className="grid gap-x-8 sm:grid-cols-2">
              {page.considerations.map((c) => (
                <li key={c} className="flex items-center gap-3 border-t border-(--line) py-3 text-[0.9375rem] text-(--fg)">
                  <span aria-hidden="true" className="block size-1.5 shrink-0 rotate-45 bg-(--accent-ui)" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ Focus */

/**
 * Investment focus ledger: three tall columns between fine rules, each headed by a large
 * outlined numeral that fills with teal on hover while the column's surface warms.
 */
function SectorFocus({ page, tone }: { page: SectorPage; tone: Tone }) {
  const onDark = dark(tone);
  return (
    <Section id="focus" tone={tone} spaced={false} aria-labelledby="sector-focus-title" className="py-[clamp(4rem,7vw,6rem)]">
      <div className="container-site">
        <div className="mb-[clamp(2.25rem,4vw,3.25rem)] flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow data-reveal="" className="mb-6">
              Investment Focus
            </Eyebrow>
            <h2 id="sector-focus-title" data-split="" className="font-display text-[clamp(1.875rem,1.25rem+2vw,3rem)] leading-[1.04] font-normal tracking-[-0.04em] text-(--fg)">
              Where Opportunity Takes Shape.
            </h2>
          </div>
        </div>
        <ol data-seq-group="" className="grid border-y border-(--line) md:grid-cols-3">
          {page.focus.map((f, i) => (
            <li
              key={f.name}
              id={`focus-${i + 1}`}
              data-seq=""
              className={cn(
                "group relative flex scroll-mt-[calc(var(--header-h)+1.5rem)] flex-col justify-between gap-10 py-8 transition-colors duration-700 ease-premium hover:bg-(--surface) md:min-h-[clamp(17rem,24vw,21rem)] md:px-[clamp(1.25rem,2.5vw,2.25rem)]",
                i > 0 && "border-t border-(--line) md:border-t-0 md:border-l",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "font-display text-[clamp(3.5rem,2.5rem+3vw,5.5rem)] leading-none tracking-[-0.05em] text-transparent tabular-nums transition-colors duration-700 ease-premium group-hover:text-(--accent-ui)",
                  onDark ? "[-webkit-text-stroke:1px_rgb(169_193_197/0.5)]" : "[-webkit-text-stroke:1px_rgb(16_44_53/0.35)]",
                )}
              >
                {pad(i + 1)}
              </span>
              <div>
                <h3 className="font-display text-[clamp(1.375rem,1.15rem+0.7vw,1.75rem)] leading-[1.15] tracking-[-0.025em] text-(--fg)">{f.name}</h3>
                <p className="mt-3 max-w-[24rem] text-(--fg-muted)">{f.body}</p>
              </div>
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-(--accent-ui) transition-transform duration-700 ease-premium group-hover:scale-x-100" />
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ Closing */

/**
 * Investment perspective and partnership: the perspective statement fills as it is read;
 * an invitation to business owners and partners leads to Contact. Related sectors and the
 * relevant discipline follow as large typographic links, then previous/next.
 */
function SectorClosing({ page, tone }: { page: SectorPage; tone: Tone }) {
  const invest = sectorInvest[page.slug];
  const i = sectorPages.findIndex((p) => p.slug === page.slug);
  const prev = sectorPages[i - 1];
  const next = sectorPages[i + 1];
  const related: { label: string; name: string; href: string }[] = [
    ...page.related.map((s) => sectorBySlug(s)).filter((s): s is SectorPage => !!s).map((s) => ({ label: "Related sector", name: s.name, href: s.href })),
    ...(page.relatedService ? [serviceBySlug(page.relatedService)].filter((s): s is ServicePage => !!s).map((s) => ({ label: "Expertise", name: s.name, href: s.href })) : []),
  ];
  return (
    <Section id="perspective" tone={tone} spaced={false} aria-labelledby="sector-closing-title" className="py-[clamp(4rem,7vw,6rem)]">
      <div className="container-site">
        <div className="grid grid-cols-12 items-end gap-x-col gap-y-10">
          <div className="col-span-12 lg:col-span-7">
            <h2 id="sector-closing-title" className="text-eyebrow mb-7 flex items-center gap-3.5 text-(--fg-muted)">
              <span aria-hidden="true" className="h-px w-7 bg-(--accent-ui)" />
              Investment Perspective
            </h2>
            <p data-fill="" className="max-w-[26ch] font-display text-[clamp(1.75rem,1.2rem+1.8vw,2.875rem)] leading-[1.12] tracking-[-0.03em] text-(--fg)">
              {page.perspective}
            </p>
          </div>
          <div data-reveal="" className="col-span-12 border-t border-(--line) pt-6 lg:col-span-4 lg:col-start-9 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            <p className="text-eyebrow mb-3 text-(--accent)">Partner With Us</p>
            <p className="text-(--fg-muted)">{invest?.audience ?? "Businesses and partners"} exploring opportunities in {page.name} are welcome to start a conversation with HAGER INVESTMENT.</p>
            <div className="mt-6">
              <ButtonLink href="/contact" variant={dark(tone) ? "light" : "dark"} arrow size="sm">
                Start a Conversation
              </ButtonLink>
            </div>
          </div>
        </div>

        <nav aria-label="Related sectors and expertise" className="mt-[clamp(3rem,6vw,4.5rem)]">
          <ul data-seq-group="" className="grid border-t border-(--line) sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r, k) => (
              <li key={r.href} data-seq="" className={cn("border-b border-(--line) lg:border-b-0", k > 0 && "lg:border-l", k % 2 === 1 && "sm:border-l")}>
                <Link href={r.href} className="group flex h-full items-end justify-between gap-4 py-6 sm:px-5 lg:first:pl-0">
                  <span>
                    <span className="text-eyebrow block text-(--fg-subtle)">{r.label}</span>
                    <span className="mt-2 block font-display text-[clamp(1.25rem,1.05rem+0.6vw,1.625rem)] leading-[1.15] tracking-[-0.02em] text-(--fg) transition-colors group-hover:text-(--accent)">{r.name}</span>
                  </span>
                  <Arrow className="mb-1.5 text-(--fg-subtle) group-hover:translate-x-1 group-hover:text-(--accent)" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Previous and next sector" className="mt-[clamp(2rem,4vw,3rem)] flex items-end justify-between gap-6">
          {prev ? (
            <Link href={prev.href} className="group flex flex-col gap-1.5">
              <span className="text-[0.6875rem] tracking-[0.16em] text-(--fg-subtle) uppercase">Previous sector</span>
              <span className="inline-flex items-center gap-2.5 font-display text-[clamp(1.125rem,1rem+0.4vw,1.375rem)] text-(--fg) transition-colors group-hover:text-(--accent)">
                <Arrow className="rotate-180 group-hover:-translate-x-1" />
                {prev.name}
              </span>
            </Link>
          ) : (
            <Link href={parents.sector.href} className="group flex flex-col gap-1.5">
              <span className="text-[0.6875rem] tracking-[0.16em] text-(--fg-subtle) uppercase">Overview</span>
              <span className="inline-flex items-center gap-2.5 font-display text-[clamp(1.125rem,1rem+0.4vw,1.375rem)] text-(--fg) transition-colors group-hover:text-(--accent)">
                <Arrow className="rotate-180 group-hover:-translate-x-1" />
                {parents.sector.label}
              </span>
            </Link>
          )}
          {next ? (
            <Link href={next.href} className="group flex flex-col items-end gap-1.5 text-right">
              <span className="text-[0.6875rem] tracking-[0.16em] text-(--fg-subtle) uppercase">Next sector</span>
              <span className="inline-flex items-center gap-2.5 font-display text-[clamp(1.125rem,1rem+0.4vw,1.375rem)] text-(--fg) transition-colors group-hover:text-(--accent)">
                {next.name}
                <Arrow className="group-hover:translate-x-1" />
              </span>
            </Link>
          ) : (
            <Link href={parents.sector.href} className="group flex flex-col items-end gap-1.5 text-right">
              <span className="text-[0.6875rem] tracking-[0.16em] text-(--fg-subtle) uppercase">Overview</span>
              <span className="inline-flex items-center gap-2.5 font-display text-[clamp(1.125rem,1rem+0.4vw,1.375rem)] text-(--fg) transition-colors group-hover:text-(--accent)">
                {parents.sector.label}
                <Arrow className="group-hover:translate-x-1" />
              </span>
            </Link>
          )}
        </nav>
      </div>
    </Section>
  );
}

/**
 * Optional film band (White): heading beside a short line, then a wide frame
 * whose white field merges with the section; the film opens with a clip reveal and loops while
 * on screen (poster only with reduced motion or Data Saver; visible pause control).
 */
function SectorFilmBand({ page }: { page: SectorPage }) {
  const film = sectorFilms[page.slug];
  if (!film) return null;
  return (
    <Section id="in-motion" tone="white" spaced={false} aria-labelledby="sector-film-title" className="py-[clamp(4rem,7vw,6rem)]">
      <div className="container-site">
        <div className="grid grid-cols-12 items-end gap-x-col gap-y-5">
          <div className="col-span-12 lg:col-span-6">
            <Eyebrow data-reveal="" className="mb-7">
              {film.eyebrow}
            </Eyebrow>
            <h2 id="sector-film-title" data-split="" className="font-display text-[clamp(2.25rem,1.4rem+2.6vw,3.75rem)] leading-[1.02] font-normal tracking-[-0.045em] text-obsidian">
              {film.title}
            </h2>
          </div>
          <p data-reveal="" className="col-span-12 max-w-[30rem] text-(--fg-muted) lg:col-span-5 lg:col-start-8 lg:pb-2">
            {film.body}
          </p>
        </div>
        <div className="mt-[clamp(2.25rem,4vw,3.25rem)]">
          <div data-clip-reveal="up" className="relative aspect-[16/9] max-h-[78vh] w-full overflow-hidden bg-white">
            <LoopVideo src={film.src} poster={film.poster} label={`${page.name} film`} controlClassName="right-4 bottom-4 sm:right-5 sm:bottom-5" />
          </div>
        </div>
      </div>
    </Section>
  );
}

/** A sector page (SD-03): hero, investment rationale, drivers, investment focus, perspective and partnership. */
export function SectorTemplate({ page }: { page: SectorPage }) {
  const s = SCHEMES[page.layout];
  return (
    <div data-subpage="sector" data-layout={page.layout}>
      <SectorHero page={page} tone={s.hero} />
      <SectorRationale page={page} tone={s.rationale} />
      <SectorFilmBand page={page} />
      <SubThemes page={page} tone={s.themes} />
      <SectorFocus page={page} tone={s.focus} />
      <SectorClosing page={page} tone={s.closing} />
      <ScrollAnimations />
    </div>
  );
}
