import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { statement } from "@/content/home";

/**
 * Immersive architectural statement (brand campaign moment).
 * Desktop: a tall photographic panel bleeds off the right edge while an
 * oversized headline crosses onto it. Mobile: image above, type below.
 */
export function Statement() {
  return (
    <section aria-labelledby="statement-title" className="tone-obsidian relative isolate overflow-hidden">
      {/* Tall bleeding photograph (desktop) / framed image (mobile) */}
      <div data-clip-reveal="x-rev" className="relative h-[min(78vh,34rem)] overflow-hidden md:h-[36rem] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[42%]">
        <Photo src={statement.image.src} alt={statement.image.alt} sizes="(min-width: 1024px) 42vw, 100vw" quality={85} parallax className="h-full w-full" />
        {/* Restrained black shading only where the headline crosses the image */}
        <div aria-hidden="true" className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgb(9_11_13/0.92)_0%,rgb(9_11_13/0.7)_22%,rgb(9_11_13/0.28)_42%,rgb(9_11_13/0)_62%)] lg:block" />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgb(9_11_13/0.9)_0%,rgb(9_11_13/0)_45%)] lg:hidden" />
        {/* Fine rule marking the image edge */}
        <span aria-hidden="true" className="absolute inset-y-0 left-0 hidden w-px bg-white/30 lg:block" />
      </div>

      <div className="container-site relative py-[clamp(4rem,3rem+5vw,10rem)] lg:flex lg:min-h-[clamp(40rem,94vh,60rem)] lg:items-center">
        <div className="w-full">
          <p data-reveal="" className="text-eyebrow mb-10 flex items-center gap-3.5 text-(--fg-muted)">
            <span aria-hidden="true" className="h-px w-7 bg-current opacity-60" />
            HAGER INVESTMENT
          </p>
          <h2
            data-fill=""
            id="statement-title"
            className="font-display text-[clamp(2.75rem,1.2rem+5.4vw,7.25rem)] leading-[0.98] font-normal tracking-[-0.045em] text-white [text-shadow:0_2px_30px_rgb(9_11_13/0.35)] lg:max-w-[72%]"
          >
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="block">
                {statement.titleLead}
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="block text-white/70 italic">
                {statement.titleEmphasis}
              </span>
            </span>
          </h2>

          <div data-reveal="" className="mt-12 max-w-[34rem] border-t border-(--line) pt-8 lg:mt-16">
            <p className="text-lede text-(--fg-muted)">{statement.body}</p>
            <div className="mt-10">
              <ButtonLink href={statement.cta.href} variant="outline" arrow className="text-white">
                {statement.cta.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
