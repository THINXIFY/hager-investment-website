import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { ReviewNote } from "@/components/ui/Typography";
import { philosophy } from "@/content/home";

/**
 * Investment philosophy: contemporary institutional editorial.
 * Asymmetric typographic introduction with restrained geometry, followed by
 * three principle panels with refined hover/focus reveals. Text is always
 * fully readable; motion only adds emphasis.
 */
export function Philosophy() {
  return (
    <Section id="philosophy" tone="petrol" aria-labelledby="philosophy-title" className="overflow-hidden">
      {/* Restrained geometry: two intersecting circles */}
      <svg
        aria-hidden="true"
        data-drift="7"
        data-drift-axis="y"
        className="pointer-events-none absolute top-[-6rem] right-[-10rem] w-[44rem] text-silver opacity-[0.14] lg:right-[-4rem]"
        viewBox="0 0 700 520"
        fill="none"
      >
        <circle cx="260" cy="260" r="259" stroke="currentColor" />
        <circle cx="440" cy="260" r="259" stroke="currentColor" />
      </svg>

      <div className="container-site relative">
        {/* Typographic introduction */}
        <div className="grid grid-cols-12 gap-x-col gap-y-10 lg:items-end">
          <div className="col-span-12 lg:col-span-8">
            <Eyebrow data-reveal="" className="mb-10">
              {philosophy.eyebrow}
            </Eyebrow>
            <h2
              data-fill=""
              id="philosophy-title"
              className="font-display text-[clamp(2.375rem,1.3rem+3.7vw,5.125rem)] leading-[0.98] font-normal tracking-[-0.035em]"
            >
              <span className="block">
                {philosophy.titleLead}
              </span>
              <span className="block text-silver italic lg:pl-[8%]">
                {philosophy.titleEmphasis}
              </span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-8 lg:col-span-3 lg:col-start-10 lg:pb-3">
            <span aria-hidden="true" className="mb-6 block h-px w-12 bg-silver" />
            <p data-reveal="" className="text-lede text-(--fg-muted)">
              {philosophy.intro}
            </p>
            <ReviewNote value={philosophy.note} className="mt-5" />
          </div>
        </div>

        {/* Principles */}
        <ol data-seq-group="0.16" data-seq-delay="0.3" className="relative mt-[clamp(4rem,8vw,7rem)] grid lg:grid-cols-3">
          {/* Dividers that draw across as the principles arrive */}
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px">
            <span data-draw-line="" className="absolute inset-0 block bg-(--line)" />
          </span>
          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px">
            <span data-draw-line="" className="absolute inset-0 block bg-(--line)" />
          </span>
          {philosophy.principles.map((p) => (
            <li
              key={p.title}
              data-seq=""
              className="group relative isolate flex flex-col border-(--line) py-10 not-first:border-t lg:min-h-[23rem] lg:px-[clamp(1.5rem,2.6vw,2.75rem)] lg:py-12 lg:not-first:border-t-0 lg:not-first:border-l"
            >
              {/* Rising soft-grey field (decorative hover; content is always fully visible) */}
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 hidden origin-bottom scale-y-0 bg-white/[0.05] transition-transform duration-700 ease-premium group-hover:scale-y-100 lg:block"
              />
              {/* Top rule that draws across */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-[-1px] h-px origin-left scale-x-0 bg-silver transition-transform duration-700 ease-premium group-hover:scale-x-100"
              />

              <span
                aria-hidden="true"
                className="mb-10 grid size-14 place-items-center rounded-full border border-silver/45 font-display text-lg text-white italic transition-colors duration-500 group-hover:border-silver group-hover:bg-silver group-hover:text-petrol lg:mb-auto"
              >
                {p.numeral}
              </span>
              <div className="lg:pt-16">
                <p className="text-eyebrow mb-4 text-(--fg-subtle)">
                  Principle {p.numeral}
                  <span className="sr-only"> of {philosophy.principles.length}</span>
                </p>
                <h3 className="text-title mb-4 transition-transform duration-600 ease-premium lg:group-hover:translate-x-1">
                  {p.title}
                </h3>
                <p className="max-w-[24rem] text-(--fg-muted)">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
