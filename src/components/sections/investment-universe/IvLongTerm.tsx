import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { ReviewNote } from "@/components/ui/Typography";
import { ivLongTerm } from "@/content/investment-universe";
import { cn } from "@/lib/cn";

/* A rising staircase: each theme a step lower, the middle one on a White plate. */
const STEPS = [
  { offset: "", drift: "2", plate: false },
  { offset: "md:mt-[clamp(3rem,7vw,6rem)]", drift: "-2", plate: true },
  { offset: "md:mt-[clamp(6rem,14vw,12rem)]", drift: "3", plate: false },
];

/** A long-term view, on Platinum Mist with a White plate: three themes as a staircase. */
export function IvLongTerm() {
  return (
    <Section id="long-term" tone="platinum" aria-labelledby="iv-longterm-title" className="overflow-hidden">
      <div className="container-site">
        <header className="grid grid-cols-12 items-end gap-x-col gap-y-8">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow data-reveal="" className="mb-8">
              {ivLongTerm.eyebrow}
            </Eyebrow>
            <h2
              id="iv-longterm-title"
              data-fill=""
              className="max-w-[14ch] font-display text-[clamp(2.375rem,1.3rem+3.6vw,5rem)] leading-[1] font-normal tracking-[-0.04em]"
            >
              {ivLongTerm.title}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:pb-3">
            <p data-reveal="" className="text-lede text-(--fg-muted)">
              {ivLongTerm.intro}
            </p>
            <ReviewNote value={ivLongTerm.note} className="mt-5" />
          </div>
        </header>

        <ol className="mt-[clamp(3rem,6vw,5rem)] grid gap-6 md:grid-cols-3 md:gap-(--spacing-col)">
          {ivLongTerm.themes.map((t, i) => {
            const step = STEPS[i] ?? STEPS[0]!;
            return (
              <li key={t.name} className={step.offset}>
                <div data-drift={step.drift} data-drift-axis="y" className={cn("relative h-full p-[clamp(1.5rem,2.6vw,2.5rem)]", step.plate ? "bg-white" : "border border-petrol/15")}>
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 block h-[2px] overflow-hidden">
                    <span data-draw-line="" className="block h-full w-full bg-teal" />
                  </span>
                  <p className="font-display text-[clamp(3rem,2.2rem+2.4vw,4.5rem)] leading-none tracking-[-0.05em] text-petrol/20 tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-8 font-display text-[clamp(1.5rem,1.2rem+1vw,2.125rem)] leading-[1.1] tracking-[-0.025em] text-petrol">{t.name}</h3>
                  <p className="mt-4 text-(--fg-muted)">{t.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
