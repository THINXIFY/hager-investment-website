"use client";

import Image, { type StaticImageData } from "next/image";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import { SiteLink as Link } from "@/components/ui/SiteLink";
import { cn } from "@/lib/cn";

export type PreviewSector = { slug: string; name: string; body: string; image: { src: StaticImageData; alt: string }; focus?: string };

type Ctx = { sectors: PreviewSector[]; active: string | null; setActive: (slug: string | null) => void; mounted: Set<string>; mount: (slug: string) => void };
const PreviewContext = createContext<Ctx | null>(null);
const usePreview = () => {
  const ctx = useContext(PreviewContext);
  if (!ctx) throw new Error("IvHeroStage parts must be inside <HeroPreviewProvider>");
  return ctx;
};

/** Shared hover/focus state for the hero background and the sector bar. */
export function HeroPreviewProvider({ sectors, children }: { sectors: PreviewSector[]; children: ReactNode }) {
  const [active, setActive] = useState<string | null>(null);
  const [mounted, setMounted] = useState<Set<string>>(() => new Set());
  const mount = (slug: string) => setMounted((m) => (m.has(slug) ? m : new Set(m).add(slug)));

  /* Load the preview photographs quietly once the page has settled, so hovers are instant */
  useEffect(() => {
    const all = () => setMounted(new Set(sectors.map((s) => s.slug)));
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    const t = window.setTimeout(() => (w.requestIdleCallback ? w.requestIdleCallback(all) : all()), 2500);
    return () => window.clearTimeout(t);
  }, [sectors]);

  return <PreviewContext.Provider value={{ sectors, active, setActive, mounted, mount }}>{children}</PreviewContext.Provider>;
}

/* ------------------------------------------------------------------ Night sky + light trails */

/** Deterministic star field (same on server and client). */
const STARS = (() => {
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  return Array.from({ length: 46 }, () => ({ x: Math.round(rnd() * 2400), y: Math.round(rnd() * 620), r: +(0.9 + rnd() * 1.6).toFixed(2), d: +(rnd() * 6).toFixed(2), t: +(3 + rnd() * 4).toFixed(2) }));
})();

/* Light-trail paths traced in the photograph's own coordinates (2400 × 1600). */
const TRAILS = [
  "M40 1300 C 180 1252, 300 1262, 560 1278 S 1150 1236, 1420 1140 S 1760 980, 2100 952",
  "M210 1238 C 330 1170, 470 1090, 640 1010 S 960 860, 1130 820",
  "M160 1196 C 230 1110, 262 1010, 256 940 S 250 905, 300 895",
];
const CITY = { x: 1195, y: 870 };

/**
 * Decorative overlays aligned to the hero photograph (same viewBox and slice crop):
 * shimmering stars, a breathing city glow, and teal light trails that draw in on load and
 * then carry small travelling glints toward the city. Hidden while a sector preview shows.
 */
function NightOverlay() {
  return (
    <svg aria-hidden="true" viewBox="0 0 2400 1600" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 size-full">
      <defs>
        <radialGradient id="iv-city-glow">
          <stop offset="0%" stopColor="rgb(255 214 160)" stopOpacity="0.55" />
          <stop offset="55%" stopColor="rgb(255 190 120)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="rgb(255 190 120)" stopOpacity="0" />
        </radialGradient>
        <filter id="iv-trail-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {STARS.map((s, i) => (
        <circle key={i} className="iv-star" cx={s.x} cy={s.y} r={s.r} fill="white" style={{ animationDelay: `${s.d}s`, animationDuration: `${s.t}s` }} />
      ))}

      <ellipse className="iv-city-glow" cx={CITY.x} cy={CITY.y} rx="640" ry="190" fill="url(#iv-city-glow)" />

      <g filter="url(#iv-trail-glow)" fill="none" strokeLinecap="round">
        {TRAILS.map((d, i) => (
          <path key={`t${i}`} className="iv-trail" d={d} pathLength={1} stroke="rgb(17 123 137)" strokeWidth="3" style={{ animationDelay: `${1.1 + i * 0.35}s` }} />
        ))}
        {TRAILS.map((d, i) => (
          <path key={`g${i}`} className="iv-glint" d={d} pathLength={1} stroke="rgb(169 236 244)" strokeWidth="4" style={{ animationDelay: `${3.2 + i * 1.4}s` }} />
        ))}
      </g>
      <circle className="iv-converge" cx={CITY.x} cy={CITY.y} r="7" fill="rgb(169 236 244)" />
    </svg>
  );
}

/* ------------------------------------------------------------------ Background */

/** The hero photograph with its night overlay, plus the sector previews that cross-fade in on hover. */
export function HeroBackground({ image }: { image: { src: StaticImageData; alt: string } }) {
  const { sectors, active, mounted } = usePreview();
  return (
    <div className="absolute inset-0">
      <div className={cn("iv-hero-settle absolute inset-0 transition-opacity duration-[1100ms] ease-premium", active ? "opacity-0" : "opacity-100")}>
        <Image src={image.src} alt={image.alt} fill preload quality={85} placeholder="blur" sizes="100vw" className="photo-img object-cover object-center" />
        <NightOverlay />
      </div>
      {sectors.map((s) =>
        mounted.has(s.slug) ? (
          <div key={s.slug} aria-hidden="true" className={cn("absolute inset-0 transition-[opacity,transform] duration-[1100ms] ease-premium", active === s.slug ? "scale-100 opacity-100" : "scale-[1.05] opacity-0")}>
            <Image src={s.image.src} alt="" fill quality={80} sizes="100vw" className="photo-img object-cover" style={s.focus ? { objectPosition: s.focus } : undefined} />
          </div>
        ) : null,
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ Sector bar */

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Glass sector index along the hero's foot. Hovering or focusing a sector previews it behind
 * the hero (photograph + caption); leaving the bar returns to the night scene. Each item
 * links to its sector page.
 */
export function HeroSectorBar({ style }: { style?: React.CSSProperties }) {
  const { sectors, active, setActive, mount } = usePreview();
  const current = sectors.find((s) => s.slug === active);
  const preview = (slug: string) => {
    mount(slug);
    setActive(slug);
  };
  return (
    <nav
      aria-label="Sectors"
      className="iv-hero-fade relative border-t border-white/15 bg-obsidian/35 backdrop-blur-md"
      style={style}
      onMouseLeave={() => setActive(null)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setActive(null);
      }}
    >
      {/* Preview caption (desktop): mirrors the focused/hovered link, so hidden from AT */}
      <div aria-hidden="true" className="container-site pointer-events-none absolute inset-x-0 bottom-full hidden pb-8 lg:block">
        <div className={cn("ml-auto max-w-[24rem] transition-[opacity,transform] duration-700 ease-premium", current ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0")}>
          <p className="text-eyebrow mb-3 flex items-center gap-3 text-silver">
            <span className="h-px w-6 bg-teal" />
            Sector preview
          </p>
          <p className="font-display text-[2rem] leading-[1.08] tracking-[-0.03em] text-white">{current?.name ?? " "}</p>
          <p className="mt-3 text-[0.9375rem] leading-[1.55] text-white/80">{current?.body ?? " "}</p>
        </div>
      </div>

      <ol className="container-site grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6">
        {sectors.map((s, i) => (
          <li key={s.slug} className="border-b border-white/10 sm:border-l sm:nth-[4n+1]:border-l-0 lg:nth-[4n+1]:border-l lg:nth-[6n+1]:border-l-0 lg:nth-[n+7]:border-b-0">
            <Link
              href={`/investment-universe/${s.slug}`}
              onMouseEnter={() => preview(s.slug)}
              onFocus={() => preview(s.slug)}
              className={cn("group flex h-full flex-col gap-1 py-3 pr-3 transition-colors sm:px-4 lg:py-3.5", i % 4 === 0 && "sm:pl-0", i % 4 === 0 && i % 6 !== 0 && "lg:pl-4", i % 6 === 0 && "lg:pl-0", active === s.slug && "bg-white/[0.06]")}
            >
              <span className="text-[0.6875rem] tracking-[0.14em] text-silver tabular-nums">{pad(i + 1)}</span>
              <span className={cn("text-[0.875rem] leading-[1.3] transition-colors group-hover:text-white", active === s.slug ? "text-white" : "text-white/85")}>{s.name}</span>
              <span aria-hidden="true" className={cn("mt-1 block h-px bg-teal transition-[width] duration-500 ease-premium group-hover:w-12", active === s.slug ? "w-12" : "w-6")} />
            </Link>
          </li>
        ))}
        <li className="border-b border-white/10 sm:border-l lg:border-b-0">
          <a href="#sectors" className="group flex h-full flex-col justify-between gap-1 py-3 pr-3 sm:px-4 lg:py-3.5">
            <span className="text-[0.6875rem] tracking-[0.14em] text-silver">All</span>
            <span className="inline-flex items-center gap-2 text-[0.875rem] leading-[1.3] text-white/85 transition-colors group-hover:text-white">
              All sectors
              <span aria-hidden="true" className="text-teal transition-transform duration-500 ease-premium group-hover:translate-y-0.5">↓</span>
            </span>
            <span aria-hidden="true" className="mt-1 block h-px w-6 bg-white/30 transition-[width] duration-500 ease-premium group-hover:w-12" />
          </a>
        </li>
      </ol>
    </nav>
  );
}
