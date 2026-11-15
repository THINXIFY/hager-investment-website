import { Section } from "@/components/ui/Section";
import { ReviewNote } from "@/components/ui/Typography";
import { inDirectory } from "@/content/insights";

import { InDirectory } from "./InDirectory";

/** Explore our latest perspectives (White): the filterable, searchable journal directory. */
export function InPerspectives() {
  return (
    <Section id="perspectives" tone="white" aria-labelledby="in-directory-title">
      <div className="container-site">
        <header className="mb-[clamp(2rem,4vw,3rem)] grid grid-cols-12 items-end gap-x-col gap-y-6">
          <h2 id="in-directory-title" data-fill="" className="col-span-12 max-w-[15ch] font-display text-[clamp(2.375rem,1.3rem+3.6vw,4.75rem)] leading-[1] font-normal tracking-[-0.04em] lg:col-span-8">
            {inDirectory.title}
          </h2>
          <div className="col-span-12 lg:col-span-4 lg:pb-2">
            <ReviewNote value={inDirectory.note} />
          </div>
        </header>
        <InDirectory articles={inDirectory.articles} />
      </div>
    </Section>
  );
}
