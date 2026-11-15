import type { ReactNode } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { CopyText } from "@/components/ui/Placeholder";
import { SiteLink as Link } from "@/components/ui/SiteLink";
import { contactDetails, footerNav, legalNav, siteConfig } from "@/config/site";
import { corporate, expertise, legal } from "@/content/home";
import { ivSectorList } from "@/content/investment-universe";
import { cn } from "@/lib/cn";
import { isReviewOnly } from "@/lib/content";

import { CurrentYear } from "./CurrentYear";
import { FooterMotion } from "./FooterMotion";

/** Directory link: the underline draws in and a small arrow slides into view on hover/focus. */
function FooterLink({ href, children, prominent = false }: { href: string; children: string; prominent?: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "group/fl inline-flex items-baseline gap-2 py-1 transition-colors duration-300 hover:text-white focus-visible:text-white",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal",
        prominent ? "font-display text-[1.0625rem] tracking-[-0.01em] text-white/90 lg:text-[1.1875rem]" : "text-[0.9375rem] text-silver",
      )}
    >
      <span className="bg-[linear-gradient(var(--color-teal),var(--color-teal))] bg-[length:0%_1px] bg-[position:0_100%] bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-premium group-hover/fl:bg-[length:100%_1px] group-focus-visible/fl:bg-[length:100%_1px]">
        {children}
      </span>
      <ArrowRightIcon className="size-3 shrink-0 -translate-x-1.5 self-center text-teal opacity-0 transition-[opacity,translate] duration-500 ease-premium group-hover/fl:translate-x-0 group-hover/fl:opacity-100 group-focus-visible/fl:translate-x-0 group-focus-visible/fl:opacity-100" />
    </Link>
  );
}

function Column({ id, title, count, children, as = "nav" }: { id: string; title: string; count?: number; children: ReactNode; as?: "nav" | "div" }) {
  const Tag = as;
  return (
    <Tag data-seq="" aria-labelledby={id}>
      <h2 id={id} className="mb-5 flex items-baseline justify-between gap-4 border-b border-platinum/12 pb-3.5">
        <span className="text-eyebrow text-[0.6875rem] text-white">{title}</span>
        {count ? (
          <span aria-hidden="true" className="font-display text-[0.8125rem] text-teal tabular-nums">
            {String(count).padStart(2, "0")}
          </span>
        ) : null}
      </h2>
      {children}
    </Tag>
  );
}

const LETTERS = siteConfig.shortName.toUpperCase().split("");

function Wordmark({ fill, sheen = false }: { fill: string; sheen?: boolean }) {
  return (
    <text aria-hidden={sheen || undefined} x="0" y="212" textLength="1000" lengthAdjust="spacingAndGlyphs" fill={fill} className="font-display" fontSize="292">
      {LETTERS.map((l, i) => (
        <tspan key={i} data-footer-letter="" y="212">
          {l}
        </tspan>
      ))}
    </text>
  );
}

/**
 * FT-02 · The Grand Finale (concise). A Petrol-to-Obsidian closing scene on an Obsidian stage:
 * a short invitation, a four-column directory (Company, Investment Sectors, Expertise and the
 * verified corporate facts), the monumental HAGER wordmark across the full measure, and the
 * legal bar. FooterMotion stages the reveal: the panel opens from a rounded inset to full bleed,
 * its content emerges from beneath the page, and the wordmark's letters rise one by one under
 * a passing light. Without JavaScript or with reduced motion the footer is simply shown in full.
 */
export function SiteFooter() {
  return (
    <div data-footer-stage="" className="bg-obsidian">
      <footer id="site-footer" className="ft tone-petrol relative isolate overflow-hidden text-white">
        {/* Atmosphere */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#102c35_0%,#0d2229_50%,#090b0d_100%)]" />
          <div data-footer-light="" className="ft-wash absolute -top-[25%] left-[-15%] size-[70rem] max-w-[140vw] rounded-full bg-[radial-gradient(circle,rgb(17_123_137/0.24),transparent_60%)]" />
          <div data-footer-light="" className="ft-wash-alt absolute right-[-20%] bottom-[-10%] size-[60rem] max-w-[130vw] rounded-full bg-[radial-gradient(circle,rgb(169_193_197/0.08),transparent_60%)]" />
          <div className="ft-grid absolute inset-0" />
          <div data-footer-veil="" className="absolute inset-x-0 top-0 h-[60vh] bg-[linear-gradient(180deg,rgb(9_11_13/0.95),rgb(9_11_13/0))] opacity-0" />
        </div>

        <div data-footer-curtain="" className="will-change-transform">
          <div className="container-site">
            {/* Invitation */}
            <div data-seq-group="0.12" className="flex flex-col gap-7 pt-[clamp(3.5rem,7vw,6rem)] pb-[clamp(2.5rem,5vw,4rem)] lg:flex-row lg:items-end lg:justify-between">
              <div data-seq="">
                <p className="text-eyebrow mb-6 flex items-center gap-3.5 text-silver">
                  <span aria-hidden="true" className="h-px w-8 bg-teal" />
                  HAGER INVESTMENT · LUXEMBOURG
                </p>
                <p className="max-w-[18ch] font-display text-[clamp(2.25rem,1.3rem+3vw,4rem)] leading-[1] tracking-[-0.045em] text-white">A Broader Perspective on Investment.</p>
              </div>
              <div data-seq="" className="lg:max-w-[22rem] lg:pb-1.5">
                <p className="text-[1rem] leading-[1.6] text-silver">Explore the sectors, expertise and long-term perspectives presented across HAGER INVESTMENT.</p>
                <ButtonLink href="/expertise" variant="light" arrow className="mt-6">
                  Explore Our Expertise
                </ButtonLink>
              </div>
            </div>

            {/* Directory */}
            <div data-seq-group="0.09" className="grid grid-cols-1 gap-x-col gap-y-9 border-t border-platinum/12 pt-[clamp(2.25rem,4vw,3.5rem)] sm:grid-cols-2 lg:grid-cols-4">
              <Column id="footer-company" title="Company" count={footerNav.length}>
                <ul className="grid grid-cols-2 gap-x-6 sm:grid-cols-1">
                  {footerNav.map((item) => (
                    <li key={item.href}>
                      <FooterLink href={item.href} prominent>
                        {item.label}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </Column>
              <Column id="footer-sectors" title="Investment Sectors" count={ivSectorList.length}>
                <ul className="grid grid-cols-2 gap-x-6 sm:grid-cols-1">
                  {ivSectorList.map((s) => (
                    <li key={s.slug}>
                      <FooterLink href={`/investment-universe/${s.slug}`}>{s.name}</FooterLink>
                    </li>
                  ))}
                </ul>
              </Column>
              <Column id="footer-expertise" title="Expertise" count={expertise.items.length}>
                <ul className="grid grid-cols-2 gap-x-6 sm:grid-cols-1">
                  {expertise.items.map((s) => (
                    <li key={s.slug}>
                      <FooterLink href={`/expertise/${s.slug}`}>{s.name}</FooterLink>
                    </li>
                  ))}
                </ul>
              </Column>
              <Column id="footer-corporate" title="Corporate" as="div">
                <dl className="grid grid-cols-3 gap-x-4 gap-y-4 sm:grid-cols-1">
                  {[
                    ["Established", corporate.established],
                    ["Registered in", corporate.country],
                    ["Company Registration", corporate.registration],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-[0.625rem] font-medium tracking-[0.16em] text-silver uppercase">{label}</dt>
                      <dd className="mt-1 font-display text-[1.125rem] tracking-[-0.01em] text-white">{value}</dd>
                    </div>
                  ))}
                </dl>
                {contactDetails.email ? (
                  <div className="mt-6 border-t border-white/10 pt-5">
                    <p className="text-[0.625rem] font-medium tracking-[0.16em] text-silver uppercase">General enquiries</p>
                    <a href={`mailto:${contactDetails.email}`} className="mt-1 inline-flex font-display text-[1.125rem] tracking-[-0.01em] text-white [overflow-wrap:anywhere] transition-colors duration-300 hover:text-silver">
                      {contactDetails.email}
                    </a>
                  </div>
                ) : null}
              </Column>
            </div>

            {/* Monumental wordmark */}
            <div className="relative pt-[clamp(2.5rem,5vw,4rem)]">
              <div className="mb-[clamp(0.5rem,1.2vw,1rem)] flex items-end justify-between gap-6 text-[0.6875rem] tracking-[0.22em] uppercase">
                <span className="text-white">Investment</span>
                <span className="text-silver">
                  {corporate.country} · {corporate.established}
                </span>
              </div>
              <div className="relative">
                <div data-footer-light="" aria-hidden="true" className="ft-mark-light pointer-events-none absolute inset-y-[5%] left-[20%] w-[60%] rounded-full bg-[radial-gradient(ellipse,rgb(17_123_137/0.35),transparent_65%)] blur-2xl" />
                <svg data-footer-mark="" role="img" aria-label={siteConfig.name} viewBox="0 -10 1000 226" className="relative block h-auto w-full">
                  <defs>
                    <linearGradient id="ft-mark-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#ffffff" stopOpacity="0.94" />
                      <stop offset="1" stopColor="#a9c1c5" stopOpacity="0.72" />
                    </linearGradient>
                    {/* A soft band of light that sweeps across the letters as the footer settles */}
                    <linearGradient id="ft-mark-sheen" gradientUnits="userSpaceOnUse" x1="-420" y1="0" x2="-120" y2="0" data-footer-sheen="">
                      <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
                      <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.85" />
                      <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <Wordmark fill="url(#ft-mark-fill)" />
                  <Wordmark fill="url(#ft-mark-sheen)" sheen />
                </svg>
              </div>
            </div>

            {/* Legal bar */}
            <div className="mt-[clamp(1.75rem,3.5vw,2.75rem)] border-t border-platinum/12 py-6">
              <p className={cn("mb-5 max-w-[62rem] text-[0.8125rem] leading-relaxed text-silver", isReviewOnly(legal.disclaimer) && "review-only")}>
                <CopyText value={legal.disclaimer} block />
              </p>
              <div className="flex flex-col gap-5 text-[0.8125rem] lg:flex-row lg:items-center lg:justify-between">
                <p className="text-white/60">
                  © <CurrentYear /> HAGER INVESTMENT
                </p>
                <nav aria-label="Legal">
                  <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    {legalNav.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className="relative text-white/65 transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-teal after:transition-transform after:duration-500 hover:text-white hover:after:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                    <li className="lg:ml-4 lg:border-l lg:border-platinum/15 lg:pl-6">
                      <a href="#top" className="group inline-flex items-center gap-2.5 text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal">
                        Back to top
                        <span aria-hidden="true" className="grid size-7 place-items-center rounded-full border border-platinum/25 transition-[background-color,border-color] duration-500 group-hover:border-teal group-hover:bg-teal">
                          <ArrowRightIcon className="size-3 -rotate-90 transition-transform duration-500 ease-premium group-hover:-translate-y-0.5" />
                        </span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <FooterMotion />
      </footer>
    </div>
  );
}
