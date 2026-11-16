import type { CSSProperties } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { CopyText } from "@/components/ui/Placeholder";
import { SiteLink as Link } from "@/components/ui/SiteLink";
import { siteConfig } from "@/config/site";
import { draftNote } from "@/content/legal";
import { imHero, imIdentity, imLegal, imPublisher, imReview, type ImRow } from "@/content/impressum";
import { isReviewOnly } from "@/lib/content";
import { cn } from "@/lib/cn";

function Arrow({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={cn("size-4 shrink-0 transition-transform duration-500 ease-premium", className)} fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

/** One directory row: label, value (review-aware), optional copy action and review-only note. */
function Row({ row, tone = "light" }: { row: ImRow; tone?: "light" | "panel" }) {
  const hidden = isReviewOnly(row.value);
  return (
    <div data-seq="" className={cn("im-row group relative grid gap-x-8 gap-y-1.5 py-[clamp(1.05rem,2vw,1.4rem)] sm:grid-cols-[minmax(0,13.5rem)_minmax(0,1fr)_auto] sm:items-baseline", hidden && "review-only")}>
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-platinum" />
      <span aria-hidden="true" data-draw-line="" className="absolute top-0 left-0 h-px w-full origin-left bg-petrol/25" />
      <span aria-hidden="true" className="absolute top-0 left-0 h-px w-0 bg-teal transition-[width] duration-700 ease-premium group-hover:w-full" />
      <dt className="text-[0.6875rem] font-medium tracking-[0.16em] text-petrol/65 uppercase">{row.term}</dt>
      <dd className={cn("text-obsidian [overflow-wrap:anywhere]", tone === "panel" ? "text-[1.0625rem]" : "font-display text-[clamp(1.1875rem,1.05rem+0.45vw,1.4375rem)] leading-[1.3] tracking-[-0.015em]")}>
        <CopyText value={row.value} />
        {row.note ? <span className="review-only mt-1.5 block font-sans text-[0.8125rem] leading-[1.5] tracking-normal text-teal">{row.note}</span> : null}
      </dd>
      <dd className="sm:justify-self-end">{row.copy ? <CopyButton value={row.copy} label="Copy" ariaLabel={`Copy ${row.term}`} className="text-petrol/70 hover:text-petrol" /> : null}</dd>
    </div>
  );
}

/** A typographic seal: verified facts set on a circle (decorative; the same facts appear as text). */
function Seal() {
  const text = `HAGER INVESTMENT · LUXEMBOURG · ESTABLISHED ${siteConfig.foundingYear} · RCS ${siteConfig.registration} · `;
  return (
    <svg aria-hidden="true" viewBox="0 0 200 200" className="im-seal size-[clamp(7.5rem,12vw,9.5rem)] text-petrol">
      <defs>
        <path id="im-seal-path" d="M100 100m-78 0a78 78 0 1 1 156 0a78 78 0 1 1 -156 0" />
      </defs>
      <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeOpacity="0.18" />
      <circle cx="100" cy="100" r="62" fill="none" stroke="currentColor" strokeOpacity="0.18" />
      <g className="im-seal-ring">
        <text fontSize="10.4" letterSpacing="2.2" fill="currentColor" fillOpacity="0.7">
          <textPath href="#im-seal-path">{text}</textPath>
        </text>
      </g>
      <text x="100" y="97" textAnchor="middle" fontSize="15" letterSpacing="5" fill="currentColor" className="font-display">
        HAGER
      </text>
      <line x1="84" x2="116" y1="106" y2="106" stroke="#117B89" />
      <text x="100" y="121" textAnchor="middle" fontSize="7" letterSpacing="3" fill="currentColor" fillOpacity="0.65">
        S.A. · {siteConfig.foundingYear}
      </text>
    </svg>
  );
}

/**
 * Impressum (IM-01): a compact corporate imprint in four parts. A Warm Porcelain editorial
 * hero with an oversized title; the official identification as a two-column
 * directory on White; publisher and contact information on Porcelain; and a Petrol closing
 * panel with the legal statement and four further-reading links. Everything is legible with
 * motion off; unconfirmed values appear in review mode only.
 */
export function Impressum() {
  return (
    <div data-legal-doc="impressum" className="bg-porcelain">
      {/* 01 · Hero */}
      <header id="top" className="tone-porcelain relative overflow-hidden bg-porcelain pt-(--header-h)">
        <div className="container-site flex min-h-[clamp(18rem,36vh,24rem)] flex-col justify-end pt-[clamp(2.5rem,5vw,3.5rem)] pb-[clamp(2rem,4vw,2.75rem)]">
          <p className="legal-fade text-eyebrow mb-5 flex items-center gap-3.5 text-petrol" style={{ "--i": 0 } as CSSProperties}>
            <span aria-hidden="true" className="h-px w-8 bg-teal" />
            {imHero.eyebrow}
          </p>
          <div className="grid grid-cols-12 items-end gap-x-col gap-y-5">
            <h1 className="legal-rise col-span-12 font-display text-[clamp(3.5rem,1.6rem+6.4vw,8rem)] leading-[0.9] font-normal tracking-[-0.055em] text-petrol lg:col-span-7">{imHero.title}</h1>
            <p className="legal-fade text-lede col-span-12 max-w-[30rem] text-(--fg-muted) lg:col-span-5 lg:justify-self-end lg:pb-3" style={{ "--i": 1 } as CSSProperties}>
              {imHero.description}
            </p>
          </div>
          <div className="legal-fade mt-[clamp(1.5rem,3vw,2rem)]" style={{ "--i": 2 } as CSSProperties}>
            <span aria-hidden="true" className="relative block h-px bg-petrol/20">
              <span className="im-accent absolute inset-y-0 left-0 block w-28 bg-teal" />
            </span>
            <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 pt-4 text-[0.75rem] tracking-[0.14em] text-petrol/65 uppercase">
              <p>
                Luxembourg <span className="mx-2 text-teal">·</span> RCS {siteConfig.registration} <span className="mx-2 text-teal">·</span> Société Anonyme
              </p>
              <p className="review-only border border-dashed border-error px-3 py-1 font-semibold tracking-[0.12em] text-error">{draftNote}</p>
            </div>
            <ul className="review-only mt-4 grid gap-1.5 border border-dashed border-error px-4 py-3 text-sm leading-[1.5] text-error normal-case">
              {imReview.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      {/* 02 · Official identification */}
      <section id="identification" aria-labelledby="im-identity-title" className="tone-white bg-white py-[clamp(3.5rem,7vw,5.5rem)]">
        <div className="container-site grid grid-cols-12 gap-x-col gap-y-10">
          <div className="col-span-12 lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <p data-reveal="" className="text-eyebrow mb-6 flex items-center gap-3 text-teal">
                <span className="font-display text-[0.9375rem] tracking-normal tabular-nums">01</span>
                <span aria-hidden="true" className="h-px w-6 bg-teal/50" />
                Official Identification
              </p>
              <h2 id="im-identity-title" data-reveal="" className="font-display text-[clamp(2rem,1.4rem+1.9vw,3rem)] leading-[1.02] font-normal tracking-[0.06em] text-petrol">
                {imIdentity.heading}
              </h2>
              <p data-reveal="" className="mt-5 max-w-[24rem] text-[1.0625rem] leading-[1.7] text-(--fg-muted)">
                {imIdentity.body}
              </p>
              <div data-reveal="" className="mt-9 hidden sm:block">
                <Seal />
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <p data-reveal="" className="text-eyebrow mb-3 text-petrol/60">
              {imIdentity.caption}
            </p>
            <dl data-seq-group="0.06" className="relative border-b border-platinum">
              {imIdentity.rows.map((r) => (
                <Row key={r.term} row={r} />
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 03 · Publisher & contact */}
      <section id="publisher" aria-labelledby="im-publisher-title" className="tone-porcelain bg-porcelain py-[clamp(3.5rem,7vw,5.5rem)]">
        <div className="container-site grid grid-cols-12 gap-x-col gap-y-10">
          <div className="col-span-12 lg:col-span-5">
            <p data-reveal="" className="text-eyebrow mb-6 flex items-center gap-3 text-teal">
              <span className="font-display text-[0.9375rem] tracking-normal tabular-nums">02</span>
              <span aria-hidden="true" className="h-px w-6 bg-teal/50" />
              {imPublisher.eyebrow}
            </p>
            <h2 id="im-publisher-title" data-split="" className="max-w-[14ch] font-display text-[clamp(2rem,1.4rem+1.9vw,3rem)] leading-[1.04] font-normal tracking-[-0.035em] text-obsidian">
              {imPublisher.heading}
            </h2>
            <div data-reveal="" className="mt-6 grid max-w-[30rem] gap-4 text-[1.0625rem] leading-[1.7] text-(--fg-muted)">
              {imPublisher.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <Link
              href="/contact"
              data-reveal=""
              className="group mt-9 flex max-w-[28rem] items-center justify-between gap-6 border-y border-petrol/20 py-5 text-petrol transition-colors duration-500 hover:border-teal"
            >
              <span>
                <span className="text-eyebrow block text-[0.6875rem] text-teal">Get in touch</span>
                <span className="mt-1.5 block font-display text-[clamp(1.375rem,1.15rem+0.6vw,1.75rem)] tracking-[-0.02em]">Contact HAGER INVESTMENT</span>
              </span>
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-petrol text-white transition-colors duration-500 group-hover:bg-teal">
                <Arrow className="group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <div data-reveal="" className="border border-platinum bg-white px-[clamp(1.25rem,3vw,2.25rem)] py-[clamp(0.75rem,1.5vw,1rem)]">
              <dl data-seq-group="0.06" className="[&>.im-row:first-child>span]:hidden">
                {imPublisher.rows.map((r) => (
                  <Row key={r.term} row={r} tone="panel" />
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* 04 · Legal information & further reading */}
      <section id="legal-information" aria-labelledby="im-legal-title" className="im-closing tone-petrol relative isolate overflow-hidden bg-petrol py-[clamp(3.5rem,7vw,5.5rem)] text-white">
        <span aria-hidden="true" className="pointer-events-none absolute -top-40 -right-40 -z-10 size-[34rem] rounded-full bg-[radial-gradient(circle,rgb(17_123_137/0.35),transparent_65%)]" />
        <div className="container-site grid grid-cols-12 gap-x-col gap-y-10">
          <div className="col-span-12 lg:col-span-6">
            <p data-reveal="" className="text-eyebrow mb-6 flex items-center gap-3 text-silver">
              <span className="font-display text-[0.9375rem] tracking-normal tabular-nums text-teal">03</span>
              <span aria-hidden="true" className="h-px w-6 bg-teal" />
              Transparency
            </p>
            <h2 id="im-legal-title" data-split="" className="max-w-[16ch] font-display text-[clamp(2rem,1.4rem+1.9vw,3rem)] leading-[1.04] font-normal tracking-[-0.035em]">
              {imLegal.heading}
            </h2>
            <div data-reveal="" className="mt-7 grid max-w-[34rem] gap-4 text-[1rem] leading-[1.7] text-white/75">
              {imLegal.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div data-reveal="" className="mt-9">
              <ButtonLink href={siteConfig.registerPdf} target="_blank" rel="noopener" variant="light" arrow>
                Company Register Extract (PDF)
                <span className="sr-only"> (opens in a new tab)</span>
              </ButtonLink>
            </div>
          </div>
          <nav aria-label="Further reading" className="col-span-12 self-end lg:col-span-5 lg:col-start-8">
            <ul data-seq-group="0.08" className="border-t border-white/15">
              {imLegal.links.map((l) => (
                <li key={l.href} data-seq="" className="border-b border-white/15">
                  <Link href={l.href} {...("external" in l && l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group relative flex items-center justify-between gap-6 py-5">
                    <span>
                      <span className="block font-display text-[clamp(1.25rem,1.1rem+0.5vw,1.5rem)] tracking-[-0.02em] text-white">{l.label}</span>
                      <span className="mt-1 block text-[0.8125rem] text-white/55 transition-colors duration-500 group-hover:text-silver">{l.note}</span>
                    </span>
                    <Arrow className="text-teal group-hover:translate-x-1.5 group-hover:text-white" />
                    <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-teal transition-transform duration-700 ease-premium group-hover:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </div>
  );
}
