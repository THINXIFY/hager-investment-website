import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { ReviewNote } from "@/components/ui/Typography";
import { ivSectors } from "@/content/investment-universe";

import { SectorGrid } from "./SectorGrid";

/**
 * Explore Our Sector Perspectives (White): every sector visible at once in one clear grid,
 * filterable by group. Each tile opens its sector page.
 */
export function IvSectors() {
  const groups = ivSectors.groups.map((g) => ({ id: g.id, name: g.name, slugs: g.sectors.map((s) => s.slug) }));
  const sectors = ivSectors.groups.flatMap((g) =>
    g.sectors.map((s) => ({ slug: s.slug, name: s.name, body: s.body, image: s.image, focus: s.focus, groupId: g.id, groupName: g.name })),
  );
  return (
    <Section id="sectors" tone="white" aria-labelledby="iv-sectors-title">
      <div className="container-site">
        <div className="grid grid-cols-12 items-end gap-x-col gap-y-6">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow data-reveal="" className="mb-8">
              Sector Perspectives
            </Eyebrow>
            <h2 id="iv-sectors-title" data-fill="" className="max-w-[16ch] font-display text-[clamp(2.375rem,1.3rem+3vw,4.25rem)] leading-[1.02] font-normal tracking-[-0.045em] text-obsidian">
              {ivSectors.title}
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:pb-2">
            <p data-reveal="" className="text-(--fg-muted)">
              Eleven sectors across three groups. Filter by group, or open any sector for its investment perspective.
            </p>
            <ReviewNote value={ivSectors.note} className="mt-4" />
          </div>
        </div>
        <SectorGrid groups={groups} sectors={sectors} />
      </div>
    </Section>
  );
}
