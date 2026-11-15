import type { CSSProperties } from "react";

import { CATEGORIES, inHero } from "@/content/insights";

const slugOf = (c: string) => c.toLowerCase().replace(/\s+/g, "-");

/**
 * Insights masthead (Warm Porcelain): set like the front of a publication. A fine top band
 * with the section name and a topic index (each opens the directory pre-filtered), a centred
 * title and standfirst, closed by a double hairline rule. No photograph.
 */
export function InMasthead() {
  return (
    <section id="top" aria-labelledby="in-hero-title" className="tone-porcelain relative bg-porcelain pt-(--header-h)">
      <div className="container-site">
        <div className="in-hero-fade flex flex-col gap-4 border-b border-(--line) py-5 sm:flex-row sm:items-center sm:justify-between" style={{ "--i": 0 } as CSSProperties}>
          <p className="text-eyebrow flex items-center gap-3.5 text-(--fg-subtle)">
            <span aria-hidden="true" className="h-px w-8 bg-teal" />
            {inHero.eyebrow}
          </p>
          <nav aria-label="Topics">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[0.8125rem] tracking-[0.02em]">
              {CATEGORIES.map((c) => (
                <li key={c}>
                  <a href={`#topic-${slugOf(c)}`} className="-my-3 inline-block py-3 text-obsidian/70 underline decoration-transparent underline-offset-4 transition-colors hover:text-teal hover:decoration-current">
                    {c}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="py-[clamp(3.5rem,8vw,6.5rem)] text-center">
          <h1 id="in-hero-title" className="mx-auto max-w-[17ch] font-display text-[clamp(2.625rem,1.3rem+4.6vw,5.5rem)] leading-[1] font-normal tracking-[-0.045em] text-obsidian">
            <span className="block overflow-hidden pb-[0.1em]">
              <span className="in-hero-line block">{inHero.title}</span>
            </span>
          </h1>
          <p className="in-hero-fade text-lede mx-auto mt-8 max-w-[36rem] text-(--fg-muted)" style={{ "--i": 1 } as CSSProperties}>
            {inHero.description}
          </p>
        </div>

        {/* Double hairline: the publication rule */}
        <div aria-hidden="true" className="grid gap-[3px]">
          <span className="block h-px bg-petrol/40" />
          <span className="block h-px bg-petrol/20" />
        </div>
      </div>
    </section>
  );
}
