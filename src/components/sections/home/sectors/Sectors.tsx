import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ReviewNote } from "@/components/ui/Typography";
import { sectors } from "@/content/home";

import { SectorExplorer } from "./SectorExplorer";

/** 03 Investment universe: interactive sector showcase (proposed sectors). */
export function Sectors() {
  return (
    <Section id="sectors" tone="platinum" aria-labelledby="sectors-title" className="lg:pb-[calc(var(--spacing-section)+3.5rem)]">
      <div className="container-site">
        <SectionHeader
          eyebrow={sectors.eyebrow}
          title={sectors.title}
          titleId="sectors-title"
          intro={
            <>
              {sectors.intro}
              <ReviewNote value={sectors.note} className="mt-5" />
            </>
          }
        />
        <SectorExplorer items={sectors.items} />
      </div>
    </Section>
  );
}
