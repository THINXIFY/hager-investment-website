import type { CSSProperties } from "react";

import { HeroMembrane } from "@/components/sections/contact/HeroMembrane";
import { ButtonLink } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { SiteLink as Link } from "@/components/ui/SiteLink";
import { generalEmail, team, teamTiers, tmClosing, tmHero, tmMembers, type TeamMember } from "@/content/team";
import { cn } from "@/lib/cn";

import { MonogramTile } from "./MonogramTile";

const pad = (n: number) => String(n).padStart(2, "0");

function MailIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={cn("size-4 shrink-0", className)} fill="none" stroke="currentColor" strokeWidth="1.3">
      <rect x="1.5" y="3.5" width="13" height="9" rx="0.5" />
      <path d="m2 4 6 4.75L14 4" />
    </svg>
  );
}

/* ------------------------------------------------------------------ Hero */
export function TmHero() {
  const counts = teamTiers.map((t) => ({ ...t, n: team.filter((m) => m.tier === t.id).length }));
  return (
    <section id="top" data-header-overlay="" aria-labelledby="tm-hero-title" className="tone-obsidian relative isolate overflow-hidden bg-obsidian text-white">
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(110%_90%_at_80%_0%,rgb(16_44_53/0.95),rgb(9_11_13/0)_62%)]" />
        {/* The membrane mesh, kept quiet on this page */}
        <div className="absolute inset-0 opacity-40">
          <HeroMembrane />
        </div>
        <div className="ct-hero-glow absolute -bottom-1/2 left-[4%] size-[min(56rem,90vw)] rounded-full bg-[radial-gradient(circle,rgb(17_123_137/0.24),transparent_62%)]" />
      </div>

      <div className="container-site pt-[calc(var(--header-h)+clamp(2rem,6vw,4.5rem))]">
        <div data-hero-scroll="" className="max-w-[54rem] pb-14 sm:pb-0">
          <p className="ct-hero-fade text-eyebrow mb-6 flex items-center gap-3.5 text-white/85" style={{ "--i": 0 } as CSSProperties}>
            <span aria-hidden="true" className="h-px w-8 bg-teal" />
            {tmHero.eyebrow}
          </p>
          <h1 id="tm-hero-title" className="font-display text-[clamp(2.375rem,1.3rem+3.6vw,4.75rem)] leading-[1] font-normal tracking-[-0.045em]">
            {tmHero.titleLines.map((line, i) => (
              <span key={line} className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
                <span className={cn("ct-hero-line block", i === 1 && "text-white/72 italic")} style={{ "--i": i } as CSSProperties}>
                  {line}
                </span>
                {i < tmHero.titleLines.length - 1 ? " " : null}
              </span>
            ))}
          </h1>
          <p className="ct-hero-fade text-lede mt-5 max-w-[36rem] text-white/72 sm:mt-6" style={{ "--i": 1 } as CSSProperties}>
            {tmHero.description}
          </p>
          <div className="ct-hero-fade mt-7 flex flex-wrap gap-3 sm:mt-8 sm:gap-3.5" style={{ "--i": 2 } as CSSProperties}>
            <ButtonLink href="#team" variant="light" arrow>
              Meet the Team
            </ButtonLink>
            <ButtonLink href="#contact-team" variant="outline">
              Contact Us
            </ButtonLink>
          </div>
        </div>

        {/* Base bar: the shape of the team */}
        <dl className="ct-hero-fade mt-[clamp(2.25rem,5vw,3.5rem)] hidden grid-cols-3 border-t border-white/15 pt-5 pb-6 sm:grid sm:pb-9" style={{ "--i": 3 } as CSSProperties}>
          {counts.map((c) => (
            <div key={c.id} className="border-white/15 pr-3 [&:not(:first-child)]:border-l [&:not(:first-child)]:pl-4 sm:[&:not(:first-child)]:pl-6">
              <dt className="text-[0.625rem] font-medium tracking-[0.16em] text-silver uppercase sm:text-[0.6875rem]">{c.label}</dt>
              <dd className="mt-2 font-display text-[clamp(1.375rem,1.1rem+1vw,2rem)] leading-none tracking-[-0.03em] tabular-nums">{pad(c.n)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Cards */
function MemberCard({ m, n, featured = false }: { m: TeamMember; n: number; featured?: boolean }) {
  const tier = teamTiers.find((t) => t.id === m.tier);
  return (
    <article
      id={`member-${m.slug}`}
      aria-labelledby={`member-${m.slug}-name`}
      data-seq=""
      className={cn("tm-card group/card relative scroll-mt-28 rounded-[22px] bg-white p-2.5", featured ? "grid gap-2.5 md:grid-cols-12" : "flex flex-col gap-2.5")}
    >
      <MonogramTile
        initials={m.initials}
        label={tier?.short ?? ""}
        large={featured}
        className={cn("rounded-[16px]", featured ? "aspect-[16/10] md:col-span-5 md:aspect-auto md:min-h-[24rem]" : "aspect-[16/10]")}
      />
      <div className={cn("flex flex-1 flex-col px-[clamp(1rem,2.4vw,2rem)] pt-4 pb-3", featured && "md:col-span-7 md:justify-center md:px-[clamp(1.5rem,4vw,4rem)] md:py-8")}>
        <div className="flex items-center justify-between gap-3">
          <span className="tm-pill inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.75rem] font-medium tracking-[0.04em] text-petrol">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-teal" />
            {m.role}
          </span>
          <span aria-hidden="true" className="font-display text-[0.9375rem] text-(--fg-subtle) tabular-nums">{pad(n)}</span>
        </div>
        <h3 id={`member-${m.slug}-name`} className={cn("mt-5 font-display font-normal tracking-[-0.035em] text-obsidian", featured ? "text-[clamp(2.125rem,1.5rem+2.2vw,3.5rem)] leading-[1.02]" : "text-[clamp(1.75rem,1.4rem+1.1vw,2.375rem)] leading-[1.06]")}>
          {m.name}
        </h3>
        <span aria-hidden="true" className="tm-card-rule my-5 block h-px w-12 origin-left bg-teal" />
        <p className={cn("flex-1 text-(--fg-muted)", featured ? "max-w-[38rem] text-[clamp(1.0625rem,1rem+0.3vw,1.1875rem)] leading-[1.65]" : "text-[1rem] leading-[1.65]")}>{m.description}</p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 rounded-[14px] bg-porcelain/80 py-1 pr-2 pl-4">
          <a href={`mailto:${m.email}`} aria-label={`Email ${m.name}: ${m.email}`} className="group/mail inline-flex min-h-11 min-w-0 items-center gap-2.5 text-[0.875rem] text-petrol [overflow-wrap:anywhere] transition-colors duration-300 hover:text-teal">
            <MailIcon className="transition-transform duration-300 group-hover/mail:-translate-y-px" />
            <span>{m.email}</span>
          </a>
          <CopyButton value={m.email} label="Copy" ariaLabel={`Copy ${m.name}'s email address`} className="rounded-full px-3 text-(--fg-subtle) hover:bg-white hover:text-petrol" />
        </div>
      </div>
    </article>
  );
}

export function TmMembers() {
  const [lead, ...rest] = team;
  return (
    <Section id="team" tone="porcelain" aria-labelledby="tm-team-title" className="scroll-mt-20">
      <div className="container-site">
        <div className="mb-[clamp(2.5rem,5vw,4rem)] grid grid-cols-12 items-end gap-x-col gap-y-6">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow data-reveal="" className="mb-6">
              {tmMembers.eyebrow}
            </Eyebrow>
            <h2 id="tm-team-title" data-reveal="" className="font-display text-[clamp(2.25rem,1.3rem+3vw,4rem)] leading-[1.02] font-normal tracking-[-0.04em]">
              <span className="block">{tmMembers.title[0]}</span>
              <span className="block text-petrol/70 italic">{tmMembers.title[1]}</span>
            </h2>
          </div>
          <p data-reveal="" className="text-lede col-span-12 text-(--fg-muted) lg:col-span-4 lg:col-start-9">
            {tmMembers.intro}
          </p>
        </div>

        <div data-seq-group="0.12" className="grid gap-[clamp(1rem,2vw,1.5rem)] md:grid-cols-2">
          {lead ? (
            <div className="md:col-span-2">
              <MemberCard m={lead} n={1} featured />
            </div>
          ) : null}
          {rest.map((m) => (
            <MemberCard key={m.slug} m={m} n={team.indexOf(m) + 1} />
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ----------------------------------------------------------- Closing */
export function TmClosing() {
  return (
    <Section id="contact-team" tone="petrol" aria-labelledby="tm-closing-title" className="scroll-mt-20 overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute -top-1/2 right-[-10%] size-[min(56rem,100vw)] rounded-full bg-[radial-gradient(circle,rgb(17_123_137/0.22),transparent_62%)]" />
      <div className="container-site relative grid grid-cols-12 items-end gap-x-col gap-y-10">
        <div className="col-span-12 lg:col-span-6">
          <Eyebrow data-reveal="" className="mb-6">
            {tmClosing.eyebrow}
          </Eyebrow>
          <h2 id="tm-closing-title" data-reveal="" className="font-display text-[clamp(2.5rem,1.4rem+3.6vw,4.75rem)] leading-[1] font-normal tracking-[-0.045em] text-white">
            <span className="block">{tmClosing.title[0]}</span>
            <span className="block text-white/70 italic">{tmClosing.title[1]}</span>
          </h2>
          <p data-reveal="" className="text-lede mt-6 max-w-[32rem] text-white/72">
            {tmClosing.body}
          </p>
        </div>
        <div data-reveal="" className="col-span-12 lg:col-span-6 lg:justify-self-end">
          <p className="text-eyebrow text-silver">General enquiries</p>
          <a href={`mailto:${generalEmail}`} className="tm-big-mail group/big mt-3 inline-flex max-w-full items-baseline font-display text-[clamp(1.375rem,0.85rem+2.1vw,2.5rem)] leading-tight tracking-[-0.03em] text-white [overflow-wrap:anywhere] lg:whitespace-nowrap">
            <span className="relative">
              {generalEmail}
              <span aria-hidden="true" className="absolute -bottom-1 left-0 h-px w-full bg-white/25" />
              <span aria-hidden="true" className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-teal transition-transform duration-700 ease-premium group-hover/big:scale-x-100" />
            </span>
          </a>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <ButtonLink href={`mailto:${generalEmail}`} variant="light" arrow>
              Write to Us
            </ButtonLink>
            <ButtonLink href="/contact#enquiry" variant="outline">
              Send an Enquiry
            </ButtonLink>
            <CopyButton value={generalEmail} label="Copy email" className="text-white/70 hover:text-white" />
          </div>
          <p className="mt-7 border-t border-white/15 pt-5 text-[0.875rem] text-white/60">
            Corporate details are available on our{" "}
            <Link href="/contact" className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
              Contact page
            </Link>
            .
          </p>
        </div>
      </div>
    </Section>
  );
}
