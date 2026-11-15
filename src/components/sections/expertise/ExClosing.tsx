import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SiteLink as Link } from "@/components/ui/SiteLink";
import { exClosing } from "@/content/expertise";
import { ivSectorList } from "@/content/investment-universe";

/**
 * Explore Further (Imperial Petrol): the heading rises, the copy and action follow, then a
 * slow ticker of the eleven sectors runs across the band, each name a link to its page
 * (outlined, filling on hover; the ticker pauses on hover or focus). The second copy that
 * makes the loop seamless is hidden from assistive technology and the tab order.
 */
export function ExClosing() {
  const run = (hidden: boolean) =>
    ivSectorList.map((s) => (
      <li key={`${hidden ? "b" : "a"}-${s.slug}`} className="flex shrink-0 items-center gap-[clamp(1.5rem,3vw,2.75rem)] pr-[clamp(1.5rem,3vw,2.75rem)]">
        <Link
          href={`/investment-universe/${s.slug}`}
          tabIndex={hidden ? -1 : undefined}
          className="font-display text-[clamp(2.25rem,1.4rem+3vw,4.5rem)] leading-none tracking-[-0.04em] whitespace-nowrap text-transparent transition-colors duration-500 [-webkit-text-stroke:1px_rgb(169_193_197/0.55)] hover:text-white hover:[-webkit-text-stroke:1px_transparent] focus-visible:text-white"
        >
          {s.name}
        </Link>
        <span aria-hidden="true" className="block size-2 rotate-45 bg-teal" />
      </li>
    ));
  return (
    <section aria-labelledby="ex-closing-title" className="tone-petrol relative isolate overflow-hidden bg-petrol">
      <div className="container-site grid grid-cols-12 items-end gap-x-col gap-y-8 pt-[clamp(4.5rem,8vw,7rem)] pb-[clamp(2.5rem,5vw,3.5rem)]">
        <div className="col-span-12 lg:col-span-7">
          <Eyebrow data-reveal="" className="mb-7">
            {exClosing.eyebrow}
          </Eyebrow>
          <h2 id="ex-closing-title" data-split="" className="max-w-[16ch] font-display text-[clamp(2.25rem,1.3rem+3.2vw,4.25rem)] leading-[1.02] font-normal tracking-[-0.045em] text-white">
            {exClosing.title}
          </h2>
        </div>
        <div data-reveal="" className="col-span-12 lg:col-span-4 lg:col-start-9 lg:pb-2">
          <p className="text-(--fg-muted)">{exClosing.body}</p>
          <div className="mt-6">
            <ButtonLink href={exClosing.cta.href} variant="light" arrow>
              {exClosing.cta.label}
            </ButtonLink>
          </div>
        </div>
      </div>

      <nav aria-label="Sectors to explore" className="ex-ticker group/ticker relative border-y border-white/12 py-[clamp(1.5rem,3vw,2.25rem)]">
        <div className="ex-ticker-track flex w-max group-hover/ticker:[animation-play-state:paused] group-focus-within/ticker:[animation-play-state:paused]">
          <ul className="flex">{run(false)}</ul>
          <ul aria-hidden="true" className="flex">
            {run(true)}
          </ul>
        </div>
      </nav>
      <div className="h-[clamp(3rem,5vw,4rem)]" />
    </section>
  );
}
