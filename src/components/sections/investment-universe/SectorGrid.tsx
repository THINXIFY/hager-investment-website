"use client";

import { AnimatePresence, MotionConfig, motion } from "motion/react";
import type { StaticImageData } from "next/image";
import { useState } from "react";

import { Photo } from "@/components/ui/Photo";
import { SiteLink as Link } from "@/components/ui/SiteLink";
import { cn } from "@/lib/cn";

type Group = { id: string; name: string; slugs: string[] };
type Sector = { slug: string; name: string; body: string; image: { src: StaticImageData; alt: string }; focus?: string; groupId: string; groupName: string };

const pad = (n: number) => String(n).padStart(2, "0");
const EASE = [0.2, 0.7, 0.1, 1] as const;
/** The invitation tile fills the remaining cells of the last row. */
const SM_SPAN: Record<number, string> = { 1: "sm:col-span-1", 2: "sm:col-span-2" };
const LG_SPAN: Record<number, string> = { 1: "lg:col-span-1", 2: "lg:col-span-2", 3: "lg:col-span-3", 4: "lg:col-span-4" };

/**
 * The sector grid: filter buttons (aria-pressed) above a uniform grid of photographic tiles.
 * Each tile is one link: photograph (eases closer on hover), group label, number, name,
 * description and "Explore sector". Tiles re-flow smoothly when the filter changes; a Petrol
 * invitation tile completes the grid. All information is visible without interaction.
 */
export function SectorGrid({ groups, sectors }: { groups: Group[]; sectors: Sector[] }) {
  const [filter, setFilter] = useState<string>("all");
  const shown = filter === "all" ? sectors : sectors.filter((s) => s.groupId === filter);
  const index = (slug: string) => sectors.findIndex((s) => s.slug === slug) + 1;
  const options = [{ id: "all", name: "All sectors", count: sectors.length }, ...groups.map((g) => ({ id: g.id, name: g.name, count: g.slugs.length }))];

  return (
    <MotionConfig reducedMotion="user">
      <div className="mt-[clamp(2.5rem,5vw,3.5rem)] flex flex-col gap-4 border-y border-(--line) py-4 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Filter sectors by group" className="flex flex-wrap gap-2">
          {options.map((o) => {
            const on = filter === o.id;
            return (
              <button
                key={o.id}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(o.id)}
                className={cn(
                  "inline-flex min-h-10 items-center gap-2.5 border px-4 text-[0.875rem] transition-colors duration-300",
                  on ? "border-petrol bg-petrol text-white" : "border-(--line) text-obsidian/75 hover:border-petrol/50 hover:text-obsidian",
                )}
              >
                {o.name}
                <span className={cn("text-[0.6875rem] tabular-nums", on ? "text-silver" : "text-obsidian/45")}>{o.count}</span>
              </button>
            );
          })}
        </div>
        <p role="status" className="text-[0.8125rem] text-(--fg-subtle)">
          Showing {shown.length} of {sectors.length} sectors
        </p>
      </div>

      <ul className="mt-[clamp(2rem,4vw,3rem)] grid gap-x-[clamp(1rem,1.6vw,1.5rem)] gap-y-[clamp(1.25rem,2vw,1.75rem)] sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((s) => (
            <motion.li
              key={s.slug}
              id={s.slug}
              layout
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="scroll-mt-28"
            >
              <div data-seq="" className="h-full">
                <Link
                  href={`/investment-universe/${s.slug}`}
                  className="sector-card group flex h-full flex-col overflow-hidden rounded-[7px] border border-petrol/[0.07] bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
                >
                  <div className="relative overflow-hidden">
                    <Photo
                      src={s.image.src}
                      alt={s.image.alt}
                      sizes="(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 100vw"
                      objectPosition={s.focus}
                      className="aspect-[4/3]"
                      imageClassName="transition-transform duration-[1400ms] ease-premium group-hover:scale-[1.06]"
                    />
                    <span aria-hidden="true" className="absolute inset-x-0 top-0 flex items-start justify-between bg-[linear-gradient(to_bottom,rgb(9_11_13/0.55),rgb(9_11_13/0))] p-3.5 pb-8">
                      <span className="text-[0.625rem] tracking-[0.18em] text-white/90 uppercase">{s.groupName}</span>
                      <span className="text-[0.75rem] text-white/90 tabular-nums">{pad(index(s.slug))}</span>
                    </span>
                    <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-teal transition-transform duration-700 ease-premium group-hover:scale-x-100" />
                  </div>
                  <div className="flex flex-1 flex-col px-[clamp(1.125rem,1.5vw,1.375rem)] pt-[clamp(1rem,1.4vw,1.25rem)] pb-[clamp(1.125rem,1.5vw,1.375rem)]">
                    <h3 className="font-display text-[clamp(1.25rem,1.1rem+0.5vw,1.5rem)] leading-[1.15] tracking-[-0.025em] text-obsidian transition-colors group-hover:text-petrol">{s.name}</h3>
                    <p className="mt-2 text-[0.875rem] leading-[1.6] text-(--fg-muted)">{s.body}</p>
                    <span className="mt-auto inline-flex items-center gap-2 self-start border-b border-petrol/25 pt-4 pb-1 text-[0.8125rem] font-medium tracking-[0.02em] text-petrol transition-colors group-hover:border-teal group-hover:text-teal">
                      Explore sector
                      <span aria-hidden="true" className="transition-transform duration-500 ease-premium group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
              </div>
            </motion.li>
          ))}
          <motion.li key="invite" layout transition={{ duration: 0.5, ease: EASE }} className={cn(SM_SPAN[shown.length % 2 === 0 ? 2 : 1], LG_SPAN[shown.length % 4 === 0 ? 4 : 4 - (shown.length % 4)])}>
            <Link href="/contact" className="sector-card group tone-petrol flex h-full min-h-[16rem] flex-col justify-between overflow-hidden rounded-[7px] bg-petrol p-6 text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal">
              <span className="text-eyebrow flex items-center gap-3 text-silver">
                <span aria-hidden="true" className="h-px w-6 bg-teal" />
                Partner with us
              </span>
              <span>
                <span className="block font-display text-[clamp(1.5rem,1.2rem+0.9vw,2rem)] leading-[1.12] tracking-[-0.025em]">Discuss an opportunity in any sector.</span>
                <span className="mt-5 inline-flex items-center gap-2 border-b border-white/30 pb-1 text-[0.8125rem] font-medium tracking-[0.02em] transition-colors group-hover:border-white">
                  Contact HAGER INVESTMENT
                  <span aria-hidden="true" className="transition-transform duration-500 ease-premium group-hover:translate-x-1">→</span>
                </span>
              </span>
            </Link>
          </motion.li>
        </AnimatePresence>
      </ul>
    </MotionConfig>
  );
}
