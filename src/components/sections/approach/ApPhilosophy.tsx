import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { apPhilosophy, apStatement } from "@/content/approach";

/**
 * Our philosophy (White), concise: the heading and statement on the left; on the right, the
 * long-term perspective set as a pull quote on a teal rule (merging the former statement band).
 */
export function ApPhilosophy() {
  return (
    <Section id="philosophy" tone="white" aria-labelledby="ap-philosophy-title">
      <div className="container-site grid grid-cols-12 gap-x-col gap-y-12">
        <div className="col-span-12 lg:col-span-7">
          <Eyebrow data-reveal="" className="mb-8">
            {apPhilosophy.eyebrow}
          </Eyebrow>
          <h2 id="ap-philosophy-title" data-split="" className="max-w-[14ch] font-display text-[clamp(2.375rem,1.3rem+3vw,4.25rem)] leading-[1.02] font-normal tracking-[-0.045em] text-obsidian">
            {apPhilosophy.title}
          </h2>
          <p data-reveal="" className="mt-[clamp(1.75rem,3vw,2.5rem)] max-w-[34rem] text-[clamp(1.125rem,1rem+0.45vw,1.375rem)] leading-[1.55] text-obsidian/85">
            {apPhilosophy.body}
          </p>
        </div>
        <figure data-reveal="" className="col-span-12 self-end border-l-2 border-teal pl-[clamp(1.25rem,2.5vw,2rem)] lg:col-span-4 lg:col-start-9">
          <blockquote className="font-display text-[clamp(1.5rem,1.2rem+1vw,2.125rem)] leading-[1.18] tracking-[-0.025em] text-petrol italic">{apStatement.title}</blockquote>
          <figcaption className="mt-4 text-(--fg-muted)">{apStatement.body}</figcaption>
        </figure>
      </div>
    </Section>
  );
}
