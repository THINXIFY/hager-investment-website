import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section, type Tone } from "@/components/ui/Section";
import { ReviewNote } from "@/components/ui/Typography";
import { pageThemes, themeNotes, type SectorPage, type ServicePage } from "@/content/subpages";
import { cn } from "@/lib/cn";

const NUMERALS = ["i.", "ii.", "iii."];

/**
 * Fifth section, a feature band between the overview and the focus areas.
 * Sectors: Long-Term Drivers. Services: Guiding Principles.
 * A monumental outlined masthead of the page name drifts slowly sideways as the band
 * passes; beneath it the heading fills in and three columns follow on fine rules that
 * draw in, each introduced by a small italic numeral. Dark or Platinum tone by layout.
 */
export function SubThemes({ page, tone }: { page: SectorPage | ServicePage; tone: Tone }) {
  const sector = page.kind === "sector";
  const items = pageThemes[page.slug] ?? [];
  const dark = tone === "petrol" || tone === "obsidian";
  if (!items.length) return null;
  return (
    <Section id="themes" tone={tone} spaced={false} aria-labelledby="sub-themes-title" className="overflow-hidden pt-[clamp(2.5rem,5vw,4rem)] pb-[clamp(3.5rem,6.5vw,5.5rem)]">
      {/* Monumental outlined masthead (decorative) */}
      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden">
        <p
          data-drift="5"
          className={cn(
            "font-display text-[clamp(4.5rem,2.2rem+8.5vw,10.5rem)] leading-[0.9] tracking-[-0.05em] whitespace-nowrap text-transparent",
            dark ? "[-webkit-text-stroke:1px_rgb(169_193_197/0.28)]" : "[-webkit-text-stroke:1px_rgb(16_44_53/0.16)]",
          )}
        >
          {page.name}
        </p>
      </div>

      <div className="container-site relative mt-[clamp(1.5rem,3vw,2.5rem)]">
        <div className="grid grid-cols-12 items-end gap-x-col gap-y-6">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow data-reveal="" className="mb-6">
              {sector ? "Long-Term Drivers" : "Guiding Principles"}
            </Eyebrow>
            <h2 id="sub-themes-title" data-fill="" className="max-w-[18ch] font-display text-[clamp(2rem,1.3rem+2.2vw,3.25rem)] leading-[1.02] font-normal tracking-[-0.04em] text-(--fg)">
              {sector ? "Forces Creating Opportunity." : "Principles of the Discipline."}
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:pb-1.5">
            <ReviewNote value={sector ? themeNotes.sector : themeNotes.service} />
          </div>
        </div>

        <ol data-seq-group="" className="mt-[clamp(2.25rem,4vw,3.25rem)] grid md:grid-cols-3">
          {items.map((t, i) => (
            <li key={t.name} data-seq="" className={cn("relative pt-7 pb-2 md:px-[clamp(1.25rem,2.5vw,2.25rem)] md:first:pl-0", i > 0 && "mt-8 md:mt-0 md:border-l md:border-(--line)")}>
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-(--line)">
                <span data-draw-line="" className="absolute inset-0 block bg-(--accent-ui)" />
              </span>
              <span aria-hidden="true" className="font-display text-[1.125rem] text-(--accent) italic">
                {NUMERALS[i]}
              </span>
              <h3 className="mt-3 font-display text-[clamp(1.375rem,1.15rem+0.7vw,1.75rem)] leading-[1.15] tracking-[-0.025em] text-(--fg)">{t.name}</h3>
              <p className="mt-3 max-w-[24rem] text-(--fg-muted)">{t.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
