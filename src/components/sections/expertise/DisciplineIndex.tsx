"use client";

import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useState } from "react";

import { SiteLink as Link } from "@/components/ui/SiteLink";
import { cn } from "@/lib/cn";

export type Discipline = { slug: string; name: string; body: string; focus: string[] };

const pad = (n: number) => String(n).padStart(2, "0");
const EASE = [0.2, 0.7, 0.1, 1] as const;

/**
 * The six disciplines as an editorial index beside a sticky Imperial Petrol preview.
 * Hovering or focusing a row brings its discipline into the panel (number, name, description,
 * focus areas, link). Every row is itself a link to the discipline page and
 * carries its own description at every width, so nothing depends on the panel.
 */
export function DisciplineIndex({ items }: { items: Discipline[] }) {
  const [active, setActive] = useState(0);
  const current = items[active]!;
  return (
    <MotionConfig reducedMotion="user">
      <div className="mt-[clamp(2.5rem,5vw,3.75rem)] grid grid-cols-12 gap-x-col gap-y-10">
        <ol data-seq-group="0.08" className="col-span-12 border-b border-(--line) lg:col-span-7">
          {items.map((d, i) => {
            const on = i === active;
            return (
              <li key={d.slug} id={d.slug} data-seq="" className="scroll-mt-28 border-t border-(--line)">
                <Link
                  href={`/expertise/${d.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group relative grid grid-cols-[3rem_minmax(0,1fr)_auto] items-baseline gap-x-4 py-[clamp(1.25rem,2.4vw,1.75rem)] md:grid-cols-[4rem_minmax(0,1fr)_auto]"
                >
                  <span aria-hidden="true" className={cn("absolute inset-y-0 -left-px w-[2px] origin-top bg-teal transition-transform duration-500 ease-premium", on ? "scale-y-100" : "scale-y-0")} />
                  <span className={cn("text-[0.8125rem] tracking-[0.14em] tabular-nums transition-colors md:pl-4", on ? "text-teal" : "text-obsidian/40")}>{pad(i + 1)}</span>
                  <span>
                    <span className={cn("block font-display text-[clamp(1.5rem,1.15rem+1.2vw,2.375rem)] leading-[1.08] tracking-[-0.03em] transition-colors duration-300", on ? "text-petrol" : "text-obsidian/80 group-hover:text-obsidian")}>{d.name}</span>
                    <span className="mt-2 block max-w-[30rem] text-[0.9375rem] leading-[1.55] text-(--fg-muted)">{d.body}</span>
                  </span>
                  <span aria-hidden="true" className={cn("text-[1.25rem] transition-[transform,color] duration-500 ease-premium", on ? "translate-x-0 text-teal" : "-translate-x-2 text-obsidian/30 group-hover:translate-x-0")}>→</span>
                </Link>
              </li>
            );
          })}
        </ol>

        <aside aria-hidden="true" className="col-span-12 hidden lg:col-span-5 lg:block">
          <div data-reveal="" className="tone-petrol sticky top-[calc(var(--header-h)+2rem)] flex min-h-[28rem] flex-col justify-between overflow-hidden bg-petrol p-[clamp(1.75rem,3vw,2.5rem)]">
            {/* Fine architectural arcs */}
            <svg viewBox="0 0 400 400" fill="none" className="pointer-events-none absolute -right-24 -bottom-24 size-[22rem] text-silver/15">
              {[380, 300, 220].map((r) => (
                <path key={r} d={`M${400 - r} 400A${r} ${r} 0 0 1 400 ${400 - r}`} stroke="currentColor" strokeWidth="1" />
              ))}
            </svg>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={current.slug} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45, ease: EASE }} className="relative flex flex-1 flex-col justify-between gap-10">
                <div>
                  <p className="flex items-center justify-between text-[0.75rem] tracking-[0.16em] text-silver uppercase">
                    <span>Discipline</span>
                    <span className="tabular-nums">
                      {pad(active + 1)} / {pad(items.length)}
                    </span>
                  </p>
                  <p className="mt-8 font-display text-[clamp(2rem,1.4rem+1.6vw,2.875rem)] leading-[1.04] tracking-[-0.035em] text-white">{current.name}</p>
                  <p className="mt-4 max-w-[26rem] text-white/80">{current.body}</p>
                </div>
                <div>
                  <p className="text-eyebrow mb-3 text-silver">Areas of focus</p>
                  <ul className="border-t border-white/15">
                    {current.focus.map((f) => (
                      <li key={f} className="flex items-center gap-3 border-b border-white/15 py-2.5 text-[0.9375rem] text-white/90">
                        <span className="block size-1.5 shrink-0 rotate-45 bg-teal" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 inline-flex items-center gap-2 text-[0.875rem] font-medium text-white">
                    Open the discipline page
                    <span className="text-silver">→</span>
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </aside>
      </div>
    </MotionConfig>
  );
}
