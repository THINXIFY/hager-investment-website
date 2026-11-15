import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { aboutHeritage } from "@/content/about";

import { HeritageTimeline } from "./HeritageTimeline";

/**
 * Heritage & identity: the passage of time, measured rather than monumentalised.
 * Masthead type above a full-width chronological ruler whose cursor travels
 * from the founding year to today as the section scrolls.
 */
export function AboutHeritage() {
  return (
    <Section id="heritage" tone="platinum" aria-labelledby="heritage-title" className="overflow-hidden">
      <div className="container-site">
        <div className="grid grid-cols-12 items-end gap-x-col gap-y-10">
          <div className="col-span-12 lg:col-span-8">
            <Eyebrow data-reveal="" className="mb-10">
              {aboutHeritage.eyebrow}
            </Eyebrow>
            <h2
              data-fill=""
              id="heritage-title"
              className="font-display text-[clamp(2.5rem,1.3rem+4vw,5.5rem)] leading-[0.98] font-normal tracking-[-0.045em]"
            >
              <span className="block">
                {aboutHeritage.titleLead}
              </span>{" "}
              <span className="block text-petrol/65 italic">
                {aboutHeritage.titleEmphasis}
              </span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-8 lg:col-span-4 lg:pb-3">
            <span aria-hidden="true" className="relative mb-7 block h-px w-full bg-(--line)">
              <span data-draw-line="" className="absolute inset-0 block bg-teal" />
            </span>
            <p data-reveal="" className="text-lede text-(--fg-muted)">
              {aboutHeritage.body}
            </p>
          </div>
        </div>

        <div data-reveal="" className="mt-[clamp(4.5rem,9vw,8rem)]">
          <HeritageTimeline start={aboutHeritage.startYear} />
        </div>
      </div>
    </Section>
  );
}
