import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { ReviewNote } from "@/components/ui/Typography";
import { apStages } from "@/content/approach";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The process (Imperial Petrol): four stages as a stepper, all visible. On desktop the stages
 * sit side by side along a track whose teal line fills as the section scrolls through; on
 * smaller screens the same track runs vertically beside the stages.
 */
export function ApStages() {
  return (
    <Section id="process" tone="petrol" aria-labelledby="ap-stages-title">
      <div className="container-site">
        <div className="mb-[clamp(2.75rem,5vw,4rem)] grid grid-cols-12 items-end gap-x-col gap-y-6">
          <div className="col-span-12 lg:col-span-8">
            <Eyebrow data-reveal="" className="mb-8">
              {apStages.eyebrow}
            </Eyebrow>
            <h2 id="ap-stages-title" data-fill="" className="max-w-[16ch] font-display text-[clamp(2.375rem,1.3rem+3vw,4.25rem)] leading-[1.02] font-normal tracking-[-0.045em] text-white">
              {apStages.title}
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:pb-2">
            <ReviewNote value={apStages.note} />
          </div>
        </div>

        <ol data-progress-track="" data-seq-group="0.12" className="relative grid gap-y-10 pl-8 lg:grid-cols-4 lg:gap-x-col lg:pt-12 lg:pl-0">
          {/* Track: vertical on mobile, horizontal on desktop */}
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[5px] w-px bg-white/15 lg:top-[5px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto">
            <span data-progress="y" className="absolute inset-0 block origin-top bg-teal lg:hidden" />
            <span data-progress="x" className="absolute inset-0 hidden origin-left bg-teal lg:block" />
          </span>
          {apStages.stages.map((s, i) => (
            <li key={s.name} id={`stage-${i + 1}`} data-seq="" className="relative scroll-mt-[calc(var(--header-h)+2rem)]">
              <span aria-hidden="true" className="absolute top-1 -left-8 block size-[11px] rotate-45 border border-teal bg-petrol lg:-top-12 lg:left-0" />
              <p className="text-[0.75rem] tracking-[0.16em] text-silver tabular-nums">Stage {pad(i + 1)}</p>
              <h3 className="mt-3 font-display text-[clamp(1.375rem,1.15rem+0.7vw,1.75rem)] leading-[1.15] tracking-[-0.025em] text-white">{s.name}</h3>
              <p className="mt-3 max-w-[24rem] text-white/75">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
