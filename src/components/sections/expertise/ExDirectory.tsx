import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { ReviewNote } from "@/components/ui/Typography";
import { exServices } from "@/content/expertise";
import { serviceBySlug } from "@/content/subpages";

import { DisciplineIndex } from "./DisciplineIndex";

/**
 * Explore Our Areas of Expertise (White): the heading fills word by word beside the
 * introduction; then the interactive discipline index with its sticky preview panel.
 */
export function ExDirectory() {
  const items = exServices.items.map((s) => ({ slug: s.slug, name: s.name, body: s.body, focus: serviceBySlug(s.slug)?.focus.map((f) => f.name) ?? [] }));
  return (
    <Section id="services" tone="white" aria-labelledby="ex-services-title">
      <div className="container-site">
        <div className="grid grid-cols-12 items-end gap-x-col gap-y-6">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow data-reveal="" className="mb-8">
              Areas of Expertise
            </Eyebrow>
            <h2 id="ex-services-title" data-fill="" className="max-w-[14ch] font-display text-[clamp(2.375rem,1.3rem+3vw,4.25rem)] leading-[1.02] font-normal tracking-[-0.045em] text-obsidian">
              {exServices.title}
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:pb-2">
            <p data-reveal="" className="text-lede text-(--fg-muted)">
              {exServices.intro}
            </p>
            <ReviewNote value={exServices.note} className="mt-4" />
          </div>
        </div>
        <DisciplineIndex items={items} />
      </div>
    </Section>
  );
}
