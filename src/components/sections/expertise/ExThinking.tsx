import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { ReviewNote } from "@/components/ui/Typography";
import { exThinking } from "@/content/expertise";

/**
 * Our thinking (Platinum Mist). The heading holds a narrow left column; the three principles
 * are set as typographic rows on the right, each fully visible, with a quiet hover emphasis
 * (a White field slides in behind the row and its teal marker extends).
 */
export function ExThinking() {
  return (
    <Section id="thinking" tone="platinum" aria-labelledby="ex-thinking-title" className="overflow-hidden">
      <div className="container-site grid grid-cols-12 gap-x-col gap-y-12">
        <div className="col-span-12 lg:col-span-4">
          <Eyebrow data-reveal="" className="mb-8">
            {exThinking.eyebrow}
          </Eyebrow>
          <h2 id="ex-thinking-title" data-fill="" className="max-w-[13ch] font-display text-[clamp(2.25rem,1.3rem+3vw,4rem)] leading-[1.02] font-normal tracking-[-0.04em]">
            {exThinking.title}
          </h2>
          <ReviewNote value={exThinking.note} className="mt-6" />
        </div>

        <ol data-seq-group="0.12" className="col-span-12 border-t border-(--line) lg:col-span-7 lg:col-start-6">
          {exThinking.items.map((p, i) => (
            <li key={p.name} data-seq="" className="group relative isolate grid gap-x-8 gap-y-3 border-b border-(--line) py-[clamp(1.75rem,3vw,2.5rem)] sm:grid-cols-[3rem_minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <span aria-hidden="true" className="absolute inset-y-0 -right-4 -left-4 -z-10 origin-left scale-x-0 bg-white transition-transform duration-700 ease-premium group-hover:scale-x-100" />
              <span aria-hidden="true" className="absolute top-[-1px] left-0 h-[2px] w-10 bg-teal transition-[width] duration-700 ease-premium group-hover:w-24" />
              <span className="text-xs tracking-[0.16em] text-petrol/75 tabular-nums sm:pt-2">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-[clamp(1.5rem,1.2rem+0.9vw,2rem)] leading-[1.1] tracking-[-0.025em] text-petrol">{p.name}</h3>
              <p className="text-(--fg-muted) sm:pt-1.5">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
