import type { CSSProperties } from "react";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { SiteLink as Link } from "@/components/ui/SiteLink";
import { ivConnect, ivSectorList } from "@/content/investment-universe";

const nameOf = (slug: string) => ivSectorList.find((s) => s.slug === slug)?.name ?? slug;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Connected Industries (Imperial Petrol): scroll-stacking cards. Each connection is a card
 * (photograph + statement + the two sectors it links) that sticks beneath the header; as the
 * next card arrives it slides over the previous one, which eases back and dims
 * (ScrollAnimations: data-stack-card). The conclusion follows the stack.
 * Sticky needs an unclipped scroll context, so the section clips with overflow-x: clip.
 */
export function IvConnect() {
  const total = ivConnect.links.length;
  return (
    <Section id="connections" tone="petrol" aria-labelledby="iv-connect-title" className="overflow-x-clip">
      <div className="container-site">
        <header className="mb-[clamp(2.5rem,5vw,4rem)] grid grid-cols-12 items-end gap-x-col gap-y-6">
          <div className="col-span-12 lg:col-span-8">
            <Eyebrow data-reveal="" className="mb-8">
              {ivConnect.eyebrow}
            </Eyebrow>
            <h2 id="iv-connect-title" data-fill="" className="max-w-[16ch] font-display text-[clamp(2.375rem,1.3rem+3vw,4.25rem)] leading-[1.02] font-normal tracking-[-0.045em] text-white">
              {ivConnect.title}
            </h2>
          </div>
          <p data-reveal="" className="col-span-12 text-(--fg-muted) lg:col-span-4 lg:pb-2">
            Industries do not develop in isolation. Scroll to see how three of them connect.
          </p>
        </header>

        <ol className="grid gap-[clamp(2.5rem,10vh,6rem)]">
          {ivConnect.links.map((l, i) => (
            <li key={l.text} className="sticky" style={{ top: `calc(var(--header-h) + 1.25rem + ${i * 1.25}rem)` } as CSSProperties}>
              <article data-stack-card="" className="grid origin-top overflow-hidden border border-white/10 bg-obsidian shadow-[0_-24px_48px_-24px_rgb(0_0_0/0.5)] lg:h-[clamp(24rem,62svh,32rem)] lg:grid-cols-12">
                <div className="relative min-h-[15rem] lg:col-span-7 lg:min-h-0">
                  <Photo src={l.image.src} alt={l.image.alt} sizes="(min-width: 1024px) 56vw, 100vw" quality={85} className="absolute inset-0" />
                </div>
                <div className="tone-obsidian flex flex-col justify-between gap-10 p-[clamp(1.5rem,3vw,2.75rem)] lg:col-span-5">
                  <p className="flex items-center justify-between text-[0.75rem] tracking-[0.16em] text-silver uppercase">
                    <span>Connection</span>
                    <span className="tabular-nums">
                      {pad(i + 1)} / {pad(total)}
                    </span>
                  </p>
                  <h3 className="font-display text-[clamp(1.875rem,1.3rem+1.9vw,3rem)] leading-[1.06] tracking-[-0.035em] text-white">{l.text}</h3>
                  <div>
                    <p className="text-eyebrow mb-3 text-silver">Connects</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <Link href={`/investment-universe/${l.from}`} className="border border-white/25 px-3.5 py-2 text-[0.875rem] text-white transition-colors hover:border-white">
                        {nameOf(l.from)}
                      </Link>
                      <span aria-hidden="true" className="h-px w-8 bg-teal" />
                      <Link href={`/investment-universe/${l.to}`} className="border border-white/25 px-3.5 py-2 text-[0.875rem] text-white transition-colors hover:border-white">
                        {nameOf(l.to)}
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>

        <p data-fill="" className="mt-[clamp(3.5rem,7vw,5.5rem)] ml-auto max-w-[30ch] font-display text-[clamp(1.5rem,1.15rem+1.1vw,2.25rem)] leading-[1.25] tracking-[-0.02em] text-white">
          {ivConnect.conclusion}
        </p>
      </div>
    </Section>
  );
}
