import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { corporate, foundations } from "@/content/home";

/**
 * Corporate foundations: institutional heritage.
 * Monumental "1993" (digits rise from a mask on scroll) above a forest-green
 * ledger of the three verified details. No statistics, seals or counters.
 */
export function Foundations() {
  const digits = corporate.established.split("");

  return (
    <Section id="foundations" tone="porcelain" aria-labelledby="foundations-title" className="overflow-hidden">
      <div className="container-site">
        {/* Masthead */}
        <div className="grid grid-cols-12 items-end gap-x-col gap-y-8">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow data-reveal="" className="mb-8">
              {foundations.eyebrow}
            </Eyebrow>
            <h2 id="foundations-title" data-fill="" className="text-section max-w-[19ch] text-petrol">
              {foundations.titleLead} <em className="text-petrol/65 italic">{foundations.titleEmphasis}</em>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-8 lg:col-span-4 lg:col-start-9">
            <span aria-hidden="true" className="mb-6 block h-px w-12 bg-teal" />
            <p data-reveal="" className="text-lede text-petrol/80">
              {foundations.description}
            </p>
          </div>
        </div>

        {/* Monumental year */}
        <div data-drift="3" className="mt-[clamp(3rem,6vw,5rem)] flex flex-wrap items-end gap-x-[clamp(1.5rem,4vw,4rem)] gap-y-6">
          <p
            data-rise-group=""
            aria-label={`Established ${corporate.established}`}
            className="flex font-display text-[clamp(6rem,1.8rem+15.5vw,18rem)] leading-[0.8] font-normal tracking-[-0.065em] text-petrol"
          >
            {digits.map((d, i) => (
              <span key={i} aria-hidden="true" className="block overflow-hidden pb-[0.04em]">
                <span data-rise="" className="block">
                  {d}
                </span>
              </span>
            ))}
          </p>
          <p data-reveal="" className="flex items-center gap-3 pb-[1.4vw] text-eyebrow text-petrol">
            <span aria-hidden="true" className="h-px w-10 bg-teal" />
            {foundations.yearLabel}
          </p>
        </div>

        {/* Verified ledger on forest green */}
        <dl data-clip-reveal="x" data-seq-group="0.16" data-seq-delay="0.55" className="tone-platinum relative mt-[clamp(2rem,4vw,3.5rem)] grid sm:grid-cols-3">
          <span aria-hidden="true" data-draw-line="" className="absolute inset-x-0 top-0 h-[2px] bg-teal" />
          {foundations.facts.map((fact) => (
            <div
              key={fact.label}
              data-seq=""
              className="flex flex-col-reverse gap-4 border-(--line) px-[clamp(1.5rem,2.6vw,2.75rem)] py-[clamp(2rem,3.4vw,3rem)] not-first:border-t sm:not-first:border-t-0 sm:not-first:border-l"
            >
              <dt className="text-eyebrow flex items-center gap-3 text-(--fg-muted)">
                <span aria-hidden="true" className="h-px w-6 bg-teal" />
                {fact.label}
              </dt>
              <dd className="font-display text-[clamp(1.75rem,1.2rem+1.55vw,2.5rem)] leading-none font-normal tracking-[-0.035em] whitespace-nowrap text-petrol">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
