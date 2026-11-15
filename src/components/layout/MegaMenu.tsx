"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { SiteLink as Link } from "@/components/ui/SiteLink";
import { cn } from "@/lib/cn";
import { megaExpertise, megaInvestments, type MegaKey } from "@/content/navigation";

const EASE = [0.2, 0.7, 0.1, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

function Arrow({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={cn("size-3.5 shrink-0 transition-transform duration-500 ease-premium", className)} fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

/** Staggered entrance for a column of items (skipped with reduced motion). */
function useStagger(delay = 0.06) {
  const reduce = useReducedMotion();
  return {
    list: { initial: reduce ? false : ("hidden" as const), animate: "show" as const, variants: { show: { transition: { staggerChildren: 0.03, delayChildren: delay } } } },
    item: { variants: { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } } } },
    reduce,
  };
}

/* ------------------------------------------------------------- Investments */

function InvestmentsPanel({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname();
  const all = megaInvestments.groups.flatMap((g) => g.sectors.map((s) => ({ ...s, group: g.name })));
  const [active, setActive] = useState<string | null>(null);
  const current = all.find((s) => s.slug === active);
  const { list, item, reduce } = useStagger();
  return (
    <div className="grid grid-cols-12 gap-x-col">
      {/* Directory: three groups in three columns on fine dividers */}
      <div className="col-span-8 grid grid-cols-3">
        {megaInvestments.groups.map((g, gi) => (
          <motion.div key={g.id} role="group" aria-labelledby={`mega-g-${g.id}`} className={cn("pr-6", gi > 0 && "border-l border-petrol/10 pl-6")} {...list}>
            <motion.p {...item} id={`mega-g-${g.id}`} className="mb-4 flex items-baseline justify-between gap-3">
              <span className="text-eyebrow text-[0.625rem] text-petrol/65">{g.name}</span>
              <span className="text-[0.625rem] text-teal tabular-nums">{pad(g.sectors.length)}</span>
            </motion.p>
            <ul className="grid">
              {g.sectors.map((s) => {
                const n = all.findIndex((x) => x.slug === s.slug) + 1;
                const here = pathname === s.href;
                return (
                  <motion.li key={s.slug} {...item}>
                    <Link
                      href={s.href}
                      onClick={onNavigate}
                      onMouseEnter={() => setActive(s.slug)}
                      onFocus={() => setActive(s.slug)}
                      aria-current={here ? "page" : undefined}
                      className="mega-item group/m relative flex items-baseline gap-3 py-[0.5625rem] outline-offset-2"
                    >
                      <span className="w-5 shrink-0 text-[0.625rem] tracking-[0.06em] text-petrol/40 tabular-nums">{pad(n)}</span>
                      <span className="relative">
                        <span className={cn("mega-name block font-display text-[1.0625rem] leading-[1.25] tracking-[-0.01em] text-obsidian", here && "text-petrol")}>{s.name}</span>
                        <span aria-hidden="true" className="mega-rule absolute inset-x-0 -bottom-1 block h-px bg-teal" />
                      </span>
                      {here ? <span aria-hidden="true" className="ml-auto size-1.5 self-center rounded-full bg-teal" /> : null}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Editorial preview: photograph + caption, soft crossfade */}
      <motion.figure
        className="col-span-4 border-l border-petrol/10 pl-[clamp(1.25rem,2vw,2rem)]"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.14 }}
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] bg-platinum">
          <AnimatePresence initial={false}>
            <motion.div key={current?.slug ?? "overview"} className="absolute inset-0" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: EASE }}>
              <Image src={(current?.image ?? megaInvestments.image).src} alt="" fill sizes="30vw" quality={80} className="object-cover" style={{ objectPosition: current?.focus ?? "50% 50%" }} />
            </motion.div>
          </AnimatePresence>
        </div>
        <figcaption className="mt-4">
          <p className="text-eyebrow flex items-center gap-2.5 text-[0.625rem] text-teal">
            <span aria-hidden="true" className="h-px w-5 bg-teal" />
            {current?.group ?? megaInvestments.eyebrow}
          </p>
          <p className="mega-preview-title mt-2.5 font-display text-[1.375rem] leading-[1.15] tracking-[-0.02em] text-obsidian">{current?.name ?? megaInvestments.title}</p>
          <p className="mt-2 text-[0.8125rem] leading-[1.6] text-(--fg-muted)">{current?.body ?? megaInvestments.body}</p>
        </figcaption>
      </motion.figure>
    </div>
  );
}

/* --------------------------------------------------------------- Expertise */

function ExpertisePanel({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(null);
  const idx = megaExpertise.items.findIndex((s) => s.slug === active);
  const current = idx >= 0 ? megaExpertise.items[idx] : null;
  const { list, item, reduce } = useStagger();
  return (
    <div className="grid grid-cols-12 gap-x-col">
      <motion.ul className="col-span-8 grid grid-cols-2 border-t border-petrol/10" {...list}>
        {megaExpertise.items.map((s, i) => {
          const here = pathname === s.href;
          return (
            <motion.li key={s.slug} {...item} className={cn("border-b border-petrol/10", i % 2 === 1 ? "border-l pl-6" : "pr-6")}>
              <Link
                href={s.href}
                onClick={onNavigate}
                onMouseEnter={() => setActive(s.slug)}
                onFocus={() => setActive(s.slug)}
                aria-current={here ? "page" : undefined}
                className="mega-item group/m flex gap-4 py-4 outline-offset-2"
              >
                <span className="w-5 shrink-0 pt-1 text-[0.625rem] tracking-[0.06em] text-petrol/40 tabular-nums">{pad(i + 1)}</span>
                <span className="flex-1">
                  <span className="relative inline-block">
                    <span className={cn("mega-name block font-display text-[1.125rem] leading-[1.2] tracking-[-0.015em] text-obsidian", here && "text-petrol")}>{s.name}</span>
                    <span aria-hidden="true" className="mega-rule absolute inset-x-0 -bottom-1 block h-px bg-teal" />
                  </span>
                  <span className="mt-2 block text-[0.8125rem] leading-[1.55] text-(--fg-muted)">{s.body}</span>
                </span>
                {here ? <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-teal" /> : null}
              </Link>
            </motion.li>
          );
        })}
      </motion.ul>

      {/* Petrol preview: considered typography, no decorative numerals */}
      <motion.div className="col-span-4 border-l border-petrol/10 pl-[clamp(1.25rem,2vw,2rem)]" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: EASE, delay: 0.14 }}>
        <div className="tone-petrol relative isolate flex aspect-[16/10] flex-col justify-between overflow-hidden rounded-[3px] bg-petrol p-6 text-white">
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:linear-gradient(135deg,black,transparent_70%)]" />
          <span aria-hidden="true" className="pointer-events-none absolute -right-20 -bottom-24 -z-10 size-64 rounded-full bg-[radial-gradient(circle,rgb(17_123_137/0.4),transparent_65%)]" />
          <p className="flex items-center justify-between text-[0.625rem] tracking-[0.18em] text-silver uppercase">
            <span className="flex items-center gap-2.5">
              <span aria-hidden="true" className="h-px w-5 bg-teal" />
              {megaExpertise.eyebrow}
            </span>
            <span className="tabular-nums">{current ? `${pad(idx + 1)} / ${pad(megaExpertise.items.length)}` : pad(megaExpertise.items.length)}</span>
          </p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={current?.slug ?? "overview"}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: reduce ? 0 : 0.15 } }}
              transition={{ duration: 0.35, ease: EASE }}
              className="mega-preview-title font-display text-[clamp(1.5rem,1.2rem+0.6vw,1.875rem)] leading-[1.1] tracking-[-0.025em]"
            >
              {current?.name ?? megaExpertise.title}
            </motion.p>
          </AnimatePresence>
        </div>
        <p className="mt-4 text-[0.8125rem] leading-[1.6] text-(--fg-muted)">{current?.body ?? megaExpertise.body}</p>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------- Shell */

const STRIP: Record<MegaKey, { label: string; href: string }[]> = {
  investments: [
    { label: "Explore All Investments", href: megaInvestments.all.href },
    { label: "Contact HAGER INVESTMENT", href: "/contact" },
  ],
  expertise: [
    { label: "Explore Expertise & Services", href: megaExpertise.all.href },
    { label: "Contact HAGER INVESTMENT", href: "/contact" },
  ],
};

/**
 * Editorial Mega-Panel (HD-03, floating): one persistent white card, hanging just below the
 * floating header capsule and matching its width, that opens with a mask reveal.
 * Switching between Investments and Expertise crossfades the content inside the same shell
 * (both share one grid cell, so there is no close/reopen and no height jump). A bottom strip
 * carries the corporate line and the links relevant to the open panel.
 */
export function MegaPanel({ which, onNavigate, onMouseEnter }: { which: MegaKey; onNavigate: () => void; onMouseEnter?: () => void }) {
  const reduce = useReducedMotion();
  const data = which === "investments" ? megaInvestments : megaExpertise;
  return (
    <motion.div
      role="region"
      aria-label={`${data.eyebrow} menu`}
      onMouseEnter={onMouseEnter}
      className="mega-panel pointer-events-auto absolute inset-x-0 top-full hidden pt-2.5 pb-10 lg:block"
      initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { clipPath: "inset(0 0 100% 0)", transition: { duration: 0.32, ease: [0.65, 0, 0.35, 1] } }}
      transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
    >
      <div className="container-site">
        <div className="mega-card rounded-[28px] bg-white px-[clamp(1.75rem,3vw,2.75rem)] pt-9 pb-6 text-obsidian shadow-[0_0_0_1px_rgb(16_44_53/0.06),0_30px_60px_-28px_rgb(9_11_13/0.45)]">
        <div className="grid min-h-[24.25rem]">
          <AnimatePresence initial={false}>
            <motion.div
              key={which}
              id={data.id}
              className="[grid-area:1/1]"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: reduce ? 0 : 0.18 } }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {which === "investments" ? <InvestmentsPanel onNavigate={onNavigate} /> : <ExpertisePanel onNavigate={onNavigate} />}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-8 flex items-center justify-between gap-6 border-t border-petrol/10 pt-5">
          <p className="text-[0.625rem] tracking-[0.22em] text-petrol/55 uppercase">
            HAGER INVESTMENT <span className="mx-2 text-teal">·</span> Luxembourg <span className="mx-2 text-teal">·</span> 1993
          </p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={which} className="flex items-center gap-8" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: reduce ? 0 : 0.12 } }} transition={{ duration: 0.25 }}>
              {STRIP[which].map((l) => (
                <Link key={l.label} href={l.href} onClick={onNavigate} className="group inline-flex items-center gap-2.5 text-[0.8125rem] font-medium text-petrol transition-colors hover:text-teal">
                  {l.label}
                  <Arrow className="group-hover:translate-x-1" />
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        </div>
      </div>
    </motion.div>
  );
}
