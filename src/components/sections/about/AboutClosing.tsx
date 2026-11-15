import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SiteLink as Link } from "@/components/ui/SiteLink";
import { aboutClosing } from "@/content/about";

const CONTINUE = [
  { label: "Who leads us", name: "Our Team", href: "/team" },
  { label: "Where we look", name: "Investment Universe", href: "/investment-universe" },
  { label: "How we think", name: "Our Approach", href: "/approach" },
  { label: "What we offer", name: "Expertise & Services", href: "/expertise" },
];

/**
 * Connect With Us (Imperial Petrol), flowing into the Petrol footer.
 * Left: the invitation in two lines that rise in turn, a drawn rule, the supporting line
 * and the primary action. Right: "Continue exploring" as large typographic links that arrive
 * in sequence. Behind, three fine architectural arcs draw in from the corner.
 */
export function AboutClosing() {
  return (
    <section aria-labelledby="about-closing-title" className="tone-petrol relative isolate overflow-hidden bg-petrol">
      {/* Architectural detail: concentric arcs drawn on entry */}
      <svg aria-hidden="true" viewBox="0 0 600 600" fill="none" className="pointer-events-none absolute -right-[10rem] -bottom-[18rem] -z-10 size-[clamp(30rem,52vw,48rem)] text-silver/18">
        {[560, 460, 360].map((r) => (
          <path key={r} data-draw-path="" pathLength={1} d={`M${600 - r} 600A${r} ${r} 0 0 1 600 ${600 - r}`} stroke="currentColor" strokeWidth="1" />
        ))}
      </svg>

      <div className="container-site pt-[clamp(5rem,3.5rem+5vw,8.5rem)] pb-[clamp(4rem,3rem+4vw,6.5rem)]">
        <div className="grid grid-cols-12 items-end gap-x-col gap-y-14">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow data-reveal="" className="mb-9">
              {aboutClosing.eyebrow}
            </Eyebrow>
            <h2 id="about-closing-title" className="font-display text-[clamp(2.25rem,1.3rem+3.42vw,4.375rem)] leading-[1] font-normal tracking-[-0.045em] text-white">
              <span data-split="" className="block">
                {aboutClosing.titleLead}
              </span>{" "}
              <span data-split="" data-split-delay="0.14" className="block text-silver italic md:pl-[10%]">
                {aboutClosing.titleEmphasis}
              </span>
            </h2>
            <div className="mt-9 flex items-center gap-6 md:pl-[10%]">
              <span aria-hidden="true" className="relative hidden h-px w-16 shrink-0 bg-silver/30 sm:block">
                <span data-draw-line="" className="absolute inset-0 block bg-silver" />
              </span>
              <p data-reveal="" className="text-lede max-w-[28rem] text-(--fg-muted)">
                {aboutClosing.body}
              </p>
            </div>
            <div data-reveal="" className="mt-10 md:pl-[10%]">
              <ButtonLink href={aboutClosing.cta.href} variant="light" arrow>
                {aboutClosing.cta.label}
              </ButtonLink>
            </div>
          </div>

          <nav aria-label="Continue exploring" className="col-span-12 md:col-span-8 lg:col-span-4 lg:col-start-9">
            <p className="text-eyebrow mb-4 text-silver">Continue exploring</p>
            <ul data-seq-group="0.12" className="border-b border-white/15">
              {CONTINUE.map((c) => (
                <li key={c.href} data-seq="" className="border-t border-white/15">
                  <Link href={c.href} className="group relative flex items-end justify-between gap-4 py-5">
                    <span>
                      <span className="block text-[0.6875rem] tracking-[0.16em] text-white/60 uppercase">{c.label}</span>
                      <span className="mt-1.5 block font-display text-[clamp(1.375rem,1.15rem+0.7vw,1.75rem)] leading-[1.15] tracking-[-0.025em] text-white transition-colors group-hover:text-silver">{c.name}</span>
                    </span>
                    <span aria-hidden="true" className="mb-1 text-silver transition-transform duration-500 ease-premium group-hover:translate-x-1.5">→</span>
                    <span aria-hidden="true" className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-teal transition-transform duration-700 ease-premium group-hover:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
