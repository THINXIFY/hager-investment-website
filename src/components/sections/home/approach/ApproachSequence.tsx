"use client";

import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/cn";
import { DESKTOP_QUERY, MOTION_OK_QUERY, gsap, useGSAP } from "@/lib/gsap";
import { useMediaQuery } from "@/lib/use-media-query";

/** Desktop with motion: progress segments follow the scroll position continuously. */
const SCRUB_QUERY = `${DESKTOP_QUERY} and ${MOTION_OK_QUERY}`;

type Step = { title: string; body: string };
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Scroll-driven sequence. Desktop: a sticky column shows the current stage
 * (large numeral, title, segmented progress) while the stages scroll past;
 * the stage nearest the viewport centre is active. Mobile: a simple
 * numbered sequence with every stage fully visible.
 */
export function ApproachSequence({ header, steps }: { header: ReactNode; steps: Step[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLLIElement | null>>([]);
  const fills = useRef<Array<HTMLSpanElement | null>>([]);
  const scrubbed = useMediaQuery(SCRUB_QUERY);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index ?? 0));
        }
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* Each segment fills while its stage crosses the viewport centre (the same line the active-stage observer uses). */
  useGSAP(
    () => {
      if (!scrubbed) return;
      refs.current.forEach((row, i) => {
        const fill = fills.current[i];
        if (!row || !fill) return;
        gsap.fromTo(
          fill,
          { scaleX: 0 },
          { scaleX: 1, ease: "none", scrollTrigger: { trigger: row, start: "top 52%", end: "bottom 52%", scrub: 0.4 } },
        );
      });
    },
    { dependencies: [scrubbed], revertOnUpdate: true },
  );

  const current = steps[active] ?? steps[0];

  return (
    <MotionConfig reducedMotion="user">
      <div className="grid grid-cols-12 gap-x-col gap-y-14">
        {/* Sticky stage indicator */}
        <div className="col-span-12 lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
            {header}

            <div aria-hidden="true" className="mt-12 hidden lg:block">
              <div className="flex items-end gap-6">
                <div className="relative h-[clamp(6rem,9vw,8.5rem)] w-[clamp(8.5rem,12vw,12rem)] overflow-hidden">
                  <AnimatePresence initial={false}>
                    <motion.span
                      key={active}
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "-100%" }}
                      transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
                      className="absolute inset-0 font-display text-[clamp(5rem,7.4vw,7rem)] leading-none font-normal tracking-[-0.04em] text-petrol tabular-nums"
                    >
                      {pad(active + 1)}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div className="pb-3">
                  <p className="text-eyebrow text-(--fg-subtle)">Stage {pad(active + 1)} of {pad(steps.length)}</p>
                  <div className="mt-2 overflow-hidden pb-[0.12em]">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.p
                        key={active}
                        initial={{ y: "110%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "-110%" }}
                        transition={{ duration: 0.42, ease: [0.65, 0, 0.35, 1] }}
                        className="font-display text-xl font-normal"
                      >
                        {current?.title}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-4 gap-2">
                {steps.map((s, i) => (
                  <span key={s.title} className="relative h-[2px] overflow-hidden bg-(--line)">
                    <span
                      ref={(el) => {
                        fills.current[i] = el;
                      }}
                      className={cn(
                        "absolute inset-0 origin-left bg-teal",
                        // Without scroll scrubbing (reduced motion), segments step with the active stage.
                        !scrubbed && "transition-transform duration-700 ease-premium",
                        !scrubbed && (i <= active ? "scale-x-100" : "scale-x-0"),
                      )}
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stages */}
        <ol data-progress-track="" data-seq-group="0.12" className="relative col-span-12 border-t border-(--line) lg:col-span-6 lg:col-start-7 lg:self-center">
          {/* Vertical rail (through the marker centres) that fills with scroll */}
          <span aria-hidden="true" className="absolute top-0 bottom-0 left-[18px] z-[1] w-px bg-(--line) lg:left-[calc(1.5rem+18px)]">
            <span data-progress="" className="absolute inset-0 block origin-top bg-teal" />
          </span>
          {steps.map((step, i) => (
            <li
              key={step.title}
              ref={(el) => {
                refs.current[i] = el;
              }}
              data-index={i}
              className={cn(
                "relative border-b border-(--line) py-8 pr-4 pl-[3.75rem] sm:pl-[4.75rem] lg:py-[clamp(2rem,3vw,2.75rem)] lg:pr-8 lg:pl-[calc(1.5rem+4.75rem)]",
                "transition-[opacity,background-color] duration-700 ease-premium",
                i === active ? "lg:bg-porcelain lg:opacity-100" : "lg:opacity-55",
              )}
            >
              {/* Numbered marker on the rail */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-8 left-0 z-[2] grid size-9 place-items-center rounded-full border text-[0.6875rem] font-medium tabular-nums transition-colors duration-500 lg:top-1/2 lg:left-6 lg:-translate-y-1/2",
                  i === active
                    ? "border-teal bg-teal text-white"
                    : i < active
                      ? "border-petrol bg-white text-petrol"
                      : "border-(--line) bg-white text-(--fg-subtle)",
                )}
              >
                {pad(i + 1)}
              </span>
              <div data-seq="">
                <p className="text-eyebrow mb-3 text-(--fg-subtle)">Stage {pad(i + 1)}</p>
                <h3 className={cn("text-title mb-3 transition-transform duration-700 ease-premium", i === active && "lg:translate-x-1.5")}>
                  {step.title}
                </h3>
                <p className="max-w-[32rem] text-(--fg-muted)">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </MotionConfig>
  );
}
