"use client";

import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { SiteLink as Link } from "@/components/ui/SiteLink";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

import { Photo } from "@/components/ui/Photo";
import { ArrowRightIcon } from "@/components/ui/Icons";
import type { Sector } from "@/content/home";
import { cn } from "@/lib/cn";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/use-media-query";

const pad = (n: number) => String(n).padStart(2, "0");
/** Notched top-right corner: the shared geometric image mask. */
const NOTCH = "polygon(0 0, calc(100% - clamp(40px,5vw,72px)) 0, 100% clamp(40px,5vw,72px), 100% 100%, 0 100%)";

export function SectorExplorer({ items }: { items: Sector[] }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const reduced = usePrefersReducedMotion();
  const frames = useRef<Array<HTMLDivElement | null>>([]);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const zTop = useRef(items.length + 1);
  const first = useRef(true);

  /* New photo wipes in over the previous one (GSAP); z-order keeps the old one beneath. */
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const frame = frames.current[active];
    if (!frame) return;
    zTop.current += 1;
    frame.style.zIndex = String(zTop.current);
    if (reduced) return;
    gsap.fromTo(
      frame,
      { clipPath: "inset(0% 0% 0% 100%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "expo.inOut", overwrite: true },
    );
    const img = frame.querySelector("img");
    if (img) gsap.fromTo(img, { scale: 1.14 }, { scale: 1, duration: 1.6, ease: "expo.out", overwrite: true });
  }, [active, reduced]);

  const select = (i: number) => {
    if (i !== active) setActive(i);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const keys: Record<string, number> = {
      ArrowDown: i + 1,
      ArrowRight: i + 1,
      ArrowUp: i - 1,
      ArrowLeft: i - 1,
      Home: 0,
      End: items.length - 1,
    };
    const next = keys[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const target = (next + items.length) % items.length;
    select(target);
    tabs.current[target]?.focus();
  };

  const current = items[active] ?? items[0];
  if (!current) return null;

  return (
    <MotionConfig reducedMotion="user">
      <div className="grid grid-cols-12 gap-x-col gap-y-10 lg:gap-x-[clamp(2rem,4vw,4.5rem)]">
        {/* Category navigation */}
        <div
          role="tablist"
          aria-label="Investment sectors"
          aria-orientation="vertical"
          data-seq-group="0.07"
          className={cn(
            "col-span-12 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [mask-image:linear-gradient(to_right,transparent,#000_var(--spacing-gutter),#000_calc(100%-2.75rem),transparent)] lg:col-span-5 lg:[mask-image:none] lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-(--line) lg:pb-0",
            "-mx-(--spacing-gutter) px-(--spacing-gutter) lg:mx-0 lg:px-0",
          )}
        >
          {items.map((item, i) => {
            const selected = i === active;
            return (
              <button
                key={item.slug}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                id={`${baseId}-tab-${i}`}
                role="tab"
                type="button"
                data-seq=""
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(i)}
                onMouseEnter={() => select(i)}
                onFocus={() => select(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={cn(
                  "group relative shrink-0 text-left transition-colors duration-500",
                  // Mobile: chips
                  "border px-4 py-2.5 text-sm font-medium whitespace-nowrap",
                  selected ? "border-petrol bg-petrol text-white" : "border-(--line) bg-white text-petrol/80",
                  // Desktop: editorial index
                  "lg:flex lg:items-baseline lg:gap-6 lg:border-0 lg:border-b lg:border-(--line) lg:bg-transparent lg:px-0 lg:py-[clamp(1.05rem,1.6vw,1.5rem)] lg:whitespace-normal",
                  selected ? "lg:text-petrol" : "lg:text-petrol/65 lg:hover:text-petrol",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-0 bottom-0 -left-(--spacing-gutter) hidden w-[3px] origin-top bg-teal transition-transform duration-700 ease-premium lg:block xl:-left-6",
                    selected ? "scale-y-100" : "scale-y-0",
                  )}
                />
                <span
                  className={cn(
                    "hidden w-8 text-xs font-medium tracking-[0.12em] tabular-nums transition-colors lg:inline",
                    selected ? "text-petrol" : "text-petrol/75",
                  )}
                >
                  {pad(i + 1)}
                </span>
                <span className="lg:font-display lg:text-[clamp(1.4rem,1.05rem+1vw,2.0625rem)] lg:leading-tight lg:font-normal lg:tracking-[-0.02em]">
                  {item.name}
                </span>
                <ArrowRightIcon
                  className={cn(
                    "ml-auto hidden self-center transition-[opacity,translate] duration-500 lg:block",
                    selected ? "translate-x-0 text-teal opacity-100" : "-translate-x-2 opacity-0",
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* Stage */}
        <div className="col-span-12 lg:col-span-7">
          <div className="relative">
            <div data-clip-reveal="x-rev">
            <div
              aria-hidden="true"
              className="relative aspect-[4/3] overflow-hidden lg:aspect-[5/4]"
              style={{ clipPath: NOTCH }}
            >
              {items.map((item, i) => (
                <div
                  key={item.slug}
                  ref={(el) => {
                    frames.current[i] = el;
                  }}
                  className="absolute inset-0"
                  style={{ zIndex: i === 0 ? items.length + 1 : 1 }}
                >
                  <Photo
                    src={item.image.src}
                    alt=""
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    parallax
                    className="h-full w-full"
                  />
                </div>
              ))}
              {/* Soft black fade keeps the counter legible over natural photography */}
              <div className="pointer-events-none absolute inset-x-0 top-0 z-[999999] h-28 bg-[linear-gradient(to_bottom,rgb(9_11_13/0.38),rgb(9_11_13/0))]" />
              {/* z above any frame: frame z-indices grow with each selection */}
              <p className="text-eyebrow absolute top-6 left-6 z-[1000000] text-white/85 tabular-nums lg:top-8 lg:left-8">
                {pad(active + 1)} <span className="text-white/45">/ {pad(items.length)}</span>
              </p>
            </div>
            </div>

            {/* Overlapping caption panel */}
            <div
              id={`${baseId}-panel`}
              role="tabpanel"
              data-reveal=""
              aria-labelledby={`${baseId}-tab-${active}`}
              className="relative z-[61] -mt-16 ml-4 mr-0 bg-white p-6 shadow-[0_40px_80px_-40px_rgb(9_11_13/0.22)] sm:ml-10 sm:max-w-[30rem] sm:p-8 lg:absolute lg:bottom-[-3.5rem] lg:left-[-3rem] lg:mt-0 lg:ml-0 lg:p-9"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.slug}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: [0.2, 0.7, 0.1, 1] }}
                >
                  <p className="text-eyebrow mb-3 text-(--fg-subtle)">Sector {pad(active + 1)} of {pad(items.length)}</p>
                  <h3 className="text-title mb-3">{current.name}</h3>
                  <p className="mb-6 text-(--fg-muted)">{current.summary}</p>
                  <Link
                    href={`/investment-universe/${current.slug}`}
                    className="group/l inline-flex items-center gap-3 border-b border-petrol/30 pb-1.5 text-sm font-medium tracking-[0.04em] transition-colors hover:border-teal hover:text-teal"
                  >
                    Explore sector
                    <span className="sr-only">: {current.name}</span>
                    <ArrowRightIcon className="transition-transform duration-450 ease-premium group-hover/l:translate-x-1" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
