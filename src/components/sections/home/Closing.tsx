import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { SiteLink as Link } from "@/components/ui/SiteLink";
import { closing } from "@/content/home";

/** Small architectural corner mark (decorative). */
function Corner({ className }: { className: string }) {
  return <span aria-hidden="true" className={`absolute size-5 border-silver/60 ${className}`} />;
}

/**
 * Closing: the private invitation.
 * A Warm Porcelain invitation panel set asymmetrically across an Obsidian / Imperial Petrol
 * seam; the Petrol field flows straight into the Petrol footer. No photography, no form.
 */
export function Closing() {
  return (
    <section aria-labelledby="closing-title" className="tone-obsidian relative isolate overflow-hidden bg-[linear-gradient(to_bottom,var(--color-obsidian)_0_56%,var(--color-petrol)_56%)]">
      {/* Architectural guide line running the full height */}
      <div aria-hidden="true" className="container-site pointer-events-none absolute inset-0 -z-10 hidden lg:block">
        <span className="absolute inset-y-0 left-[calc(var(--spacing-gutter)+8.333%)] w-px bg-silver/[0.14]" />
      </div>

      <div className="container-site pt-[clamp(5rem,3.5rem+5vw,9rem)] pb-[clamp(3rem,2rem+3vw,5rem)]">
        <div className="relative lg:ml-[8.333%]">
          <Corner className="-top-3 -left-3 border-t border-l" />
          <Corner className="-top-3 -right-3 border-t border-r" />
          <Corner className="-bottom-3 -left-3 border-b border-l" />
          <Corner className="-right-3 -bottom-3 border-r border-b" />

          {/* Invitation panel */}
          <div data-clip-reveal="" className="tone-porcelain grid gap-x-col gap-y-12 px-[clamp(1.5rem,5vw,6rem)] py-[clamp(3rem,6vw,6.5rem)] lg:grid-cols-12">
            <div data-seq-group="" data-seq-delay="0.3" className="lg:col-span-8">
              <Eyebrow data-seq="" className="mb-10 text-obsidian/70">{closing.eyebrow}</Eyebrow>
              <h2
                id="closing-title"
                className="font-display text-[clamp(2.25rem,1.3rem+3.42vw,4.375rem)] leading-[1] font-normal tracking-[-0.045em] text-obsidian"
              >
                <span data-split="" data-split-delay="0.45" className="block">
                  {closing.titleLead}
                </span>
                <span data-split="" data-split-delay="0.6" className="block text-petrol/70 italic">
                  {closing.titleEmphasis}
                </span>
              </h2>
            </div>

            <div data-seq-group="0.14" data-seq-delay="0.7" className="flex flex-col justify-end lg:col-span-4">
              <span aria-hidden="true" className="relative mb-8 block h-px bg-(--line)">
                <span data-draw-line="" className="absolute inset-0 block bg-teal" />
              </span>
              <p data-seq="" className="text-lede text-obsidian/70">
                {closing.body}
              </p>

              {/* Signature CTA */}
              <Link
                href={closing.cta.href}
                data-seq=""
                className="group mt-10 inline-flex w-fit items-center gap-6 text-obsidian focus-visible:outline-offset-8"
              >
                <span className="relative font-display text-[clamp(1.5rem,1.2rem+0.9vw,2rem)] font-normal tracking-[-0.03em]">
                  {closing.cta.label}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-teal transition-transform duration-600 ease-premium group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </span>
                <span
                  aria-hidden="true"
                  data-pop=""
                  className="grid size-16 place-items-center rounded-full bg-petrol text-white transition-[background-color,scale] duration-500 ease-premium group-hover:scale-105 group-hover:bg-teal group-focus-visible:bg-teal"
                >
                  <ArrowRightIcon className="size-5 transition-transform duration-500 ease-premium group-hover:-rotate-45 group-focus-visible:-rotate-45" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
