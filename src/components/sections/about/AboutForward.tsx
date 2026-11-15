import Image from "next/image";

import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { aboutForward } from "@/content/about";
import { cn } from "@/lib/cn";

/**
 * The forward view: the page's second signature moment.
 * Editorial masthead, then the photograph opens from a cropped editorial
 * window to a full-bleed cinematic frame as it scrolls into view
 * (data-frame-expand); three short statements rise over it once open.
 * The city view is illustrative and implies no asset or activity.
 */
export function AboutForward() {
  return (
    <section aria-labelledby="forward-title" className="tone-porcelain bg-porcelain relative isolate overflow-hidden pt-(--spacing-section)">
      <div className="container-site">
        <div className="grid grid-cols-12 items-end gap-x-col gap-y-10">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow data-reveal="" className="mb-10">
              {aboutForward.eyebrow}
            </Eyebrow>
            <h2
              id="forward-title"
              data-fill=""
              className="max-w-[14ch] font-display text-[clamp(2.5rem,1.3rem+4vw,5.5rem)] leading-[0.98] font-normal tracking-[-0.045em]"
            >
              {aboutForward.title}
            </h2>
          </div>
          <div data-seq-group="0.14" data-seq-delay="0.25" className="col-span-12 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:pb-3">
            <p data-seq="" className="text-lede text-(--fg-muted)">
              {aboutForward.body}
            </p>
            <div data-seq="" className="mt-9">
              <ButtonLink href={aboutForward.cta.href} variant="dark" arrow>
                {aboutForward.cta.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>

      {/* Expanding cinematic frame */}
      <figure
        data-frame-expand=""
        className="relative mt-[clamp(3.5rem,7vw,6rem)] h-[78svh] min-h-[30rem] overflow-hidden bg-obsidian md:h-[82svh] lg:max-h-[58rem]"
      >
        <div data-frame-media="" className="absolute inset-0">
          <Image
            src={aboutForward.image.src}
            alt={aboutForward.image.alt}
            fill
            sizes="100vw"
            quality={85}
            placeholder="blur"
            className="photo-img object-cover object-[50%_58%]"
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgb(9_11_13/0.86)_0%,rgb(9_11_13/0.55)_30%,rgb(9_11_13/0)_62%)]" />

        <figcaption className="container-site absolute inset-x-0 bottom-0 pb-[clamp(2.25rem,5vw,4.5rem)]">
          <p className="font-display text-[clamp(2.125rem,1.2rem+3.4vw,4.75rem)] leading-[1.02] font-normal tracking-[-0.045em] text-white">
            {aboutForward.statements.map((s, i) => (
              <span key={s} className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
                <span data-frame-line="" className={cn("block", i === 1 && "md:pl-[10%]", i === 2 && "text-white/78 italic md:pl-[20%]")}>
                  {s}
                </span>{" "}
              </span>
            ))}
          </p>
        </figcaption>
      </figure>
    </section>
  );
}
