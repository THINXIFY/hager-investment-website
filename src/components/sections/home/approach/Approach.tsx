import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { ReviewNote } from "@/components/ui/Typography";
import { approach } from "@/content/home";

import { ApproachSequence } from "./ApproachSequence";

/** 06 Investment approach: scroll-driven four-stage sequence (conceptual). */
export function Approach() {
  return (
    <Section id="approach" tone="white" aria-labelledby="approach-title">
      <div className="container-site">
        <ApproachSequence
          steps={approach.steps}
          header={
            <>
              <Eyebrow data-reveal="" className="mb-8">
                {approach.eyebrow}
              </Eyebrow>
              <h2
                id="approach-title"
                data-fill=""
                className="mb-7 max-w-[17ch] font-display text-[clamp(2rem,1.3rem+2.1vw,3.25rem)] leading-[1.06] font-normal tracking-[-0.025em] text-balance"
              >
                {approach.title}
              </h2>
              <p data-reveal="" className="text-lede max-w-[30rem] text-(--fg-muted)">
                {approach.intro}
              </p>
              <ReviewNote value={approach.note} className="mt-5" />
            </>
          }
        />
      </div>
    </Section>
  );
}
