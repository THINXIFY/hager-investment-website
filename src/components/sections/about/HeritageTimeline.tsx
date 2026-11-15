"use client";

import { useRef, useSyncExternalStore } from "react";

import { cn } from "@/lib/cn";
import { MOTION_OK_QUERY, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";

const subscribe = () => () => {};
/** Prerender cannot read the clock (Cache Components); the client corrects it on hydration. */
const FALLBACK_YEAR = 2026;

function useYear() {
  return useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => FALLBACK_YEAR,
  );
}

/**
 * The passage of time as an architectural ruler: one tick per year from the
 * founding year to today, decade columns rising above it, and a teal cursor
 * whose year readout travels with the scroll. Purely chronological: no
 * milestones or events are implied. Static (complete) without motion.
 */
export function HeritageTimeline({ start }: { start: number }) {
  const end = Math.max(useYear(), start + 1);
  const years = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  const pos = (year: number) => ((year - start) / (end - start)) * 100;
  const decades = years.filter((y) => (y - start) % 10 === 0 && y !== start);

  const root = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLSpanElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const ticks = useRef<Array<HTMLSpanElement | null>>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK_QUERY, () => {
        const track = root.current;
        if (!track || !cursor.current || !readout.current || !fill.current) return;
        let shown = -1;
        const render = (p: number) => {
          // The carriage spans the track, so xPercent maps 1:1 to progress (transform only).
          gsap.set(cursor.current, { x: 0, xPercent: p * 100 });
          gsap.set(readout.current, { x: 0, xPercent: -p * 100 });
          gsap.set(fill.current, { scaleX: p });
          const year = Math.round(start + p * (end - start));
          if (year === shown) return;
          shown = year;
          if (readout.current) readout.current.textContent = String(year);
          ticks.current.forEach((t, i) => t?.toggleAttribute("data-on", start + i <= year));
        };
        render(0);
        const st = ScrollTrigger.create({
          trigger: track,
          start: "top 82%",
          end: "top 22%",
          scrub: 0.6,
          onUpdate: (self) => render(self.progress),
        });
        render(st.progress);
        return () => render(1);
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [start, end], revertOnUpdate: true },
  );

  return (
    <div ref={root} className="relative select-none">
      <p className="sr-only">
        A timeline from {start} to today, one mark per year.
      </p>

      <div aria-hidden="true" className="relative h-[clamp(11rem,18vw,16rem)]">
        {/* Decade columns: architectural verticals */}
        {[start, ...decades].map((y) => (
          <div key={y} className="absolute bottom-0 h-full" style={{ left: `${pos(y)}%` }}>
            <span className="absolute bottom-0 left-0 h-full w-px bg-petrol/15" />
            <span className="absolute top-0 left-2.5 text-[0.6875rem] font-medium tracking-[0.14em] text-petrol/70 tabular-nums">
              {y}
            </span>
          </div>
        ))}

        {/* Travelling cursor with year readout */}
        <div ref={cursor} className="pointer-events-none absolute inset-x-0 bottom-0 h-[64%]" style={{ transform: "translateX(100%)" }}>
          <span className="absolute bottom-0 left-0 h-full w-[2px] -translate-x-1/2 bg-teal" />
          <span className="absolute top-0 left-0 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal" />
          <span
            ref={readout}
            className="absolute bottom-[calc(100%+0.85rem)] left-0 block font-display text-[clamp(2rem,1.4rem+2.4vw,3.75rem)] leading-none font-normal tracking-[-0.04em] whitespace-nowrap text-petrol tabular-nums"
            style={{ transform: "translateX(-100%)" }}
          >
            {end}
          </span>
        </div>
      </div>

      {/* Ruler */}
      <div aria-hidden="true" className="relative h-6">
        <span className="absolute inset-x-0 top-0 h-px bg-petrol/20" />
        <span ref={fill} className="absolute inset-x-0 top-0 block h-px origin-left bg-teal" />
        {years.map((y, i) => {
          const decade = (y - start) % 10 === 0;
          return (
            <span
              key={y}
              ref={(el) => {
                ticks.current[i] = el;
              }}
              data-on=""
              className={cn(
                "absolute top-0 w-px bg-petrol/25 transition-colors duration-300 data-on:bg-teal",
                decade ? "h-5" : "h-2.5",
              )}
              style={{ left: `${pos(y)}%` }}
            />
          );
        })}
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-6 text-eyebrow">
        <span className="text-petrol">
          {start} <span className="text-(--fg-subtle)">· Established</span>
        </span>
        <span className="text-(--fg-subtle)">Today</span>
      </div>
    </div>
  );
}
