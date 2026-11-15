import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { ReviewNote } from "@/components/ui/Typography";
import { expertise } from "@/content/home";

import { ExpertiseMosaic } from "./ExpertiseMosaic";

/** Expertise & services on forest green: an asymmetric architectural gallery (proposed capabilities). */
export function Expertise() {
  return (
    <Section id="expertise" tone="petrol" aria-labelledby="expertise-title">
      <div className="container-site">
        <div className="mb-14 grid grid-cols-12 items-end gap-x-col gap-y-8 lg:mb-20">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow data-reveal="" className="mb-8">
              {expertise.eyebrow}
            </Eyebrow>
            <h2 id="expertise-title" data-fill="" className="text-section max-w-[18ch] text-white">
              {expertise.title}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-8 lg:col-span-4 lg:col-start-9">
            <p data-reveal="" className="text-lede text-(--fg-muted)">
              {expertise.intro}
            </p>
            <ReviewNote value={expertise.note} className="mt-5" />
          </div>
        </div>

        <ExpertiseMosaic items={expertise.items} />

        <div data-reveal="" className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-(--line-soft) pt-10 lg:mt-14">
          <p className="max-w-[30rem] text-sm text-(--fg-subtle)">
            Six areas of perspective, each approached with the same long-term discipline.
          </p>
          <ButtonLink href={expertise.cta.href} variant="light" arrow>
            {expertise.cta.label}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
