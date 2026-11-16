import { RequestDocumentsButton } from "@/components/documents/RequestDocumentsButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { SiteLink as Link } from "@/components/ui/SiteLink";
import { siteConfig } from "@/config/site";
import { aboutCorporate } from "@/content/about";

import { CopyValue } from "./CopyValue";

/**
 * Company Information (White): an institutional register in two parts.
 * Left, the corporate identity as a 2×2 grid of facts on fine rules (each with a teal marker
 * that extends on hover); right, an Imperial Petrol panel holding the registration
 * identifiers with copy actions and links to the Legal Notice and Contact. Verified details only.
 */
export function AboutCorporate() {
  const identity = aboutCorporate.details.filter((d) => !d.copy);
  const identifiers = aboutCorporate.details.filter((d) => d.copy);
  return (
    <Section id="company-information" tone="white" aria-labelledby="corporate-title">
      <div className="container-site">
        <div className="grid grid-cols-12 items-end gap-x-col gap-y-6">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow data-reveal="" className="mb-8">
              {aboutCorporate.eyebrow}
            </Eyebrow>
            <h2 id="corporate-title" data-fill="" className="max-w-[14ch] font-display text-[clamp(2.25rem,1.4rem+2.8vw,4rem)] leading-[1.02] font-normal tracking-[-0.04em]">
              {aboutCorporate.title}
            </h2>
          </div>
          <p data-reveal="" className="text-lede col-span-12 max-w-[30rem] text-(--fg-muted) lg:col-span-4 lg:col-start-9 lg:pb-2">
            The verified corporate details of HAGER INVESTMENT, a société anonyme established in Luxembourg.
          </p>
        </div>

        <div className="mt-[clamp(2.75rem,5vw,4rem)] grid grid-cols-12 gap-x-col gap-y-8">
          {/* Identity: 2×2 register */}
          <dl data-seq-group="0.1" className="col-span-12 grid border-t border-(--line) sm:grid-cols-2 lg:col-span-7">
            {identity.map((d, i) => (
              <div
                key={d.label}
                data-seq=""
                className={[
                  "group relative border-b border-(--line) py-[clamp(1.5rem,3vw,2.25rem)] sm:pr-6",
                  i % 2 === 1 ? "sm:border-l sm:pl-[clamp(1.25rem,2.5vw,2rem)]" : "",
                ].join(" ")}
              >
                <span aria-hidden="true" className={"absolute top-0 left-0 h-[2px] w-8 -translate-y-px bg-teal transition-[width] duration-700 ease-premium group-hover:w-24" + (i % 2 === 1 ? " sm:left-[clamp(1.25rem,2.5vw,2rem)]" : "")} />
                <dt className="text-eyebrow text-(--fg-subtle)">{d.label}</dt>
                <dd className="mt-3 font-display text-[clamp(1.5rem,1.15rem+1.1vw,2.375rem)] leading-[1.08] tracking-[-0.03em] text-obsidian">{d.value}</dd>
              </div>
            ))}
          </dl>

          {/* Identifiers: Imperial Petrol panel */}
          <div data-reveal="" className="tone-petrol col-span-12 flex flex-col justify-between gap-8 bg-petrol p-[clamp(1.5rem,3vw,2.5rem)] lg:col-span-5">
            <div>
              <p className="text-eyebrow mb-2 flex items-center gap-3 text-silver">
                <span aria-hidden="true" className="h-px w-6 bg-teal" />
                Registration identifiers
              </p>
              <dl>
                {identifiers.map((d) => (
                  <div key={d.label} className="border-b border-white/12 py-5 last:border-b-0">
                    <dt className="text-[0.75rem] tracking-[0.12em] text-white/70 uppercase">{d.label}</dt>
                    <dd className="mt-2 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
                      <span className="font-display text-[clamp(1.375rem,1.1rem+0.9vw,1.875rem)] leading-[1.15] tracking-[-0.02em] text-white [overflow-wrap:anywhere]">{d.value}</span>
                      <CopyValue value={d.value} label={d.label} dark />
                    </dd>
                  </div>
                ))}
              </dl>
              <ButtonLink href={siteConfig.registerUrl} target="_blank" rel="noopener noreferrer" variant="outline" arrow className="mt-6 w-full text-white sm:w-auto">
                View Company Register Record
                <span className="sr-only"> (opens Pappers.lu in a new tab)</span>
              </ButtonLink>
            </div>
            <div className="border-t border-white/12 pt-6">
              <p className="text-[0.875rem] leading-[1.55] text-white/70">Private documents are available by email after a quick verification.</p>
              <RequestDocumentsButton variant="light" className="mt-5 w-full sm:w-auto" />
            </div>
            <div className="flex flex-wrap gap-x-7 gap-y-3 border-t border-white/12 pt-5 text-[0.875rem]">
              <Link href="/legal-notice" className="group inline-flex items-center gap-2 text-white/85 transition-colors hover:text-white">
                Legal Notice
                <span aria-hidden="true" className="transition-transform duration-500 ease-premium group-hover:translate-x-1">→</span>
              </Link>
              <Link href="/contact" className="group inline-flex items-center gap-2 text-white/85 transition-colors hover:text-white">
                Contact
                <span aria-hidden="true" className="transition-transform duration-500 ease-premium group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
