import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { ReviewNote } from "@/components/ui/Typography";
import { apConsiderations } from "@/content/approach";

/**
 * Key considerations (Warm Porcelain), compact: the heading beside its note, then the four
 * considerations in one row on fine rules whose teal segment extends on hover.
 */
export function ApConsiderations() {
  return (
    <Section id="considerations" tone="porcelain" aria-labelledby="ap-considerations-title">
      <div className="container-site">
        <div className="mb-[clamp(2.5rem,4.5vw,3.5rem)] grid grid-cols-12 items-end gap-x-col gap-y-6">
          <div className="col-span-12 lg:col-span-8">
            <Eyebrow data-reveal="" className="mb-8">
              {apConsiderations.eyebrow}
            </Eyebrow>
            <h2 id="ap-considerations-title" data-split="" className="font-display text-[clamp(2.25rem,1.3rem+2.6vw,3.75rem)] leading-[1.02] font-normal tracking-[-0.045em] text-obsidian">
              {apConsiderations.title}
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:pb-2">
            <ReviewNote value={apConsiderations.note} />
          </div>
        </div>
        <ul data-seq-group="0.1" className="grid gap-x-col gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {apConsiderations.items.map((c) => (
            <li key={c.name} data-seq="" className="group relative border-t border-petrol/20 pt-6">
              <span aria-hidden="true" className="absolute -top-px left-0 h-px w-10 bg-teal transition-[width] duration-700 ease-premium group-hover:w-full" />
              <h3 className="font-display text-[clamp(1.375rem,1.15rem+0.6vw,1.75rem)] leading-[1.15] tracking-[-0.025em] text-obsidian">{c.name}</h3>
              <p className="mt-3 text-(--fg-muted)">{c.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
