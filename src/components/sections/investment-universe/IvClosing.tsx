import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";
import { SiteLink as Link } from "@/components/ui/SiteLink";
import { ivClosing } from "@/content/investment-universe";

const FURTHER = [
  { label: "How we think", name: "Our Approach", href: "/approach" },
  { label: "Who we are", name: "About Us", href: "/about" },
  { label: "Start a conversation", name: "Contact", href: "/contact" },
];

/**
 * Explore Further (Obsidian): a balanced split. A full-height architectural photograph bleeds
 * to the left edge and opens upward; on the right, the heading rises, the copy and primary
 * action follow, and three further paths run as a row of typographic links on a fine rule.
 * Meets the Petrol footer along a Silver Aqua seam.
 */
export function IvClosing() {
  return (
    <section aria-labelledby="iv-closing-title" className="tone-obsidian relative isolate overflow-hidden bg-obsidian">
      <div className="grid lg:min-h-[clamp(32rem,62svh,40rem)] lg:grid-cols-12">
        <div data-clip-reveal="up" className="relative min-h-[16rem] sm:min-h-[22rem] lg:col-span-5 lg:min-h-0">
          <Photo src={ivClosing.image.src} alt={ivClosing.image.alt} sizes="(min-width: 1024px) 42vw, 100vw" quality={85} parallax className="absolute inset-0" imageClassName="object-[55%_35%]" />
        </div>

        <div className="flex flex-col justify-between gap-12 px-(--spacing-gutter) py-[clamp(3.5rem,6vw,5rem)] lg:col-span-7 lg:pr-[max(var(--spacing-gutter),calc((100vw-var(--container))/2+var(--spacing-gutter)))] lg:pl-[clamp(3rem,6vw,6rem)]">
          <div>
            <Eyebrow data-reveal="" className="mb-7">
              {ivClosing.eyebrow}
            </Eyebrow>
            <h2 id="iv-closing-title" data-split="" className="max-w-[15ch] font-display text-[clamp(2.25rem,1.3rem+3.2vw,4rem)] leading-[1.02] font-normal tracking-[-0.045em] text-white">
              {ivClosing.title}
            </h2>
            <div data-reveal="" className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-6">
              <p className="max-w-[26rem] text-(--fg-muted)">{ivClosing.body}</p>
              <ButtonLink href={ivClosing.cta.href} variant="light" arrow>
                {ivClosing.cta.label}
              </ButtonLink>
            </div>
          </div>

          <nav aria-label="Explore further">
            <ul data-seq-group="0.12" className="grid border-t border-white/15 sm:grid-cols-3">
              {FURTHER.map((f, i) => (
                <li key={f.href} data-seq="" className={i > 0 ? "border-t border-white/15 sm:border-t-0 sm:border-l" : ""}>
                  <Link href={f.href} className={"group relative flex h-full items-end justify-between gap-4 py-5 " + (i > 0 ? "sm:pl-5" : "sm:pr-5")}>
                    <span>
                      <span className="block text-[0.6875rem] tracking-[0.16em] text-white/55 uppercase">{f.label}</span>
                      <span className="mt-1.5 block font-display text-[clamp(1.25rem,1.05rem+0.6vw,1.5rem)] tracking-[-0.02em] text-white transition-colors group-hover:text-silver">{f.name}</span>
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
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-silver/25" />
    </section>
  );
}
