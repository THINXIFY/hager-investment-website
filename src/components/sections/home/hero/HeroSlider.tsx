"use client";

import Image from "next/image";
import { Fragment, useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";

import { HeroMembrane } from "@/components/sections/contact/HeroMembrane";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { SiteLink as Link } from "@/components/ui/SiteLink";
import type { HeroSlide } from "@/content/home";
import { cn } from "@/lib/cn";
import { getLenis } from "@/lib/smooth-scroll";
import { usePrefersReducedMotion } from "@/lib/use-media-query";

/** Vertical panels the outgoing photograph splits into (an architectural façade rhythm). */
const STRIPS = 5;
/** Extra resting distance on the last chapter (fraction of one chapter's scroll) before About covers it. */
const TAIL = 0.3;
/** Part of each chapter's scroll distance spent resting before / after a transition. */
const HOLD = 0.14;
/** Delay between neighbouring panels in the shutter wave. */
const STAGGER = 0.07;

const pad = (n: number) => String(n).padStart(2, "0");
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
/** Local progress of `q` within [start, start + len], clamped to 0–1. */
const span = (q: number, start: number, len: number) => clamp((q - start) / len);
const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
const easeIn = (x: number) => x * x * x;

/** Splits a headline line into words (keeping *emphasis*) for the blur-to-sharp reveal. */
function renderWords(line: string, offset: number) {
  const nodes: ReactNode[] = [];
  let w = offset;
  line.split("*").forEach((part, i) => {
    part
      .split(" ")
      .filter(Boolean)
      .forEach((word, k) => {
        nodes.push(
          <Fragment key={`${i}-${k}`}>
            <span data-hero-word="" style={{ "--w": w } as CSSProperties} className={cn("inline-block", i % 2 === 1 && "text-white/72 italic")}>
              {word}
            </span>{" "}
          </Fragment>,
        );
        w += 1;
      });
  });
  return { nodes, next: w };
}

function LineArrow({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 44 12" aria-hidden="true" className={cn("h-3 w-9 fill-none stroke-current [stroke-width:1.25] lg:w-11", direction === "prev" && "rotate-180")}>
      <path d="M0 6h42M37 1l5 5-5 5" />
    </svg>
  );
}

const clearStyle = (el: HTMLElement, ...props: Array<"transform" | "filter" | "opacity" | "letterSpacing">) => props.forEach((p) => (el.style[p] = ""));
const show = (el: HTMLElement, on: boolean, z = 0) => {
  el.style.visibility = on ? "visible" : "hidden";
  el.style.opacity = on ? "1" : "0";
  el.style.zIndex = String(z);
};

type Props = { slides: HeroSlide[] };

/**
 * Homepage hero: an inset gallery frame with a chapter index rail.
 *
 * The hero is a tall scroll track with a sticky stage, and the scroll position drives every visual
 * directly (scrubbed, not triggered): stop half-way and the transition holds half-way; scroll back
 * and it reverses. Nothing hijacks the page: chapters and arrows simply scroll to a chapter, and
 * "Skip intro" jumps past.
 *
 *  - Horizon Shutter: the outgoing photograph splits into five vertical panels that slide away in a
 *    staggered wave (teal seams flash at the joints), revealing the next scene settling from a zoom.
 *  - Headline: each word leaves and arrives blurred-to-sharp, with a slight letter-spacing settle.
 *  - Odometer: the chapter number in the Porcelain notch rolls with the scroll.
 *  - Sheet Stack: after the last chapter the About section slides up over the pinned stage like
 *    a Porcelain sheet with rounded top corners, while the photograph eases back and dims beneath
 *    it, so there is never an empty screen between the hero and the page.
 *
 * The first chapter is server-rendered (H1 and its image ship as static HTML). With reduced motion
 * the hero is a normal single-screen section and the controls switch chapters instantly.
 */
export function HeroSlider({ slides }: Props) {
  const n = slides.length;
  const [active, setActive] = useState(0);
  const [hasChanged, setHasChanged] = useState(false);
  const reduced = usePrefersReducedMotion();

  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);
  const seamRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tabRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const odoRef = useRef<HTMLSpanElement>(null);
  const activeRef = useRef(0);

  /* ---------------------------------------------------- ambient film */
  // The film loads only without reduced motion / Data Saver (the poster image stays otherwise),
  // plays only while its chapter is showing, and always has a visible pause control (WCAG 2.2.2).
  const filmIndex = slides.findIndex((s) => s.video);
  const filmRef = useRef<HTMLVideoElement>(null);
  const filmUserPaused = useRef(false);
  const [filmOn, setFilmOn] = useState(false);
  const [filmReady, setFilmReady] = useState(false);
  const [filmPlaying, setFilmPlaying] = useState(false);

  useEffect(() => {
    if (filmIndex < 0 || reduced) return;
    if ((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData) return;
    const id = requestAnimationFrame(() => setFilmOn(true));
    return () => cancelAnimationFrame(id);
  }, [filmIndex, reduced]);

  useEffect(() => {
    const v = filmRef.current;
    if (!filmOn || !v) return;
    if (active === filmIndex && !filmUserPaused.current) v.play().catch(() => setFilmPlaying(false));
    else v.pause();
  }, [active, filmIndex, filmOn]);

  const toggleFilm = () => {
    if (!filmOn) {
      filmUserPaused.current = false;
      setFilmOn(true);
      return;
    }
    const v = filmRef.current;
    if (!v) return;
    if (v.paused) {
      filmUserPaused.current = false;
      v.play().catch(() => setFilmPlaying(false));
    } else {
      filmUserPaused.current = true;
      v.pause();
    }
  };

  /* ------------------------------------- reduced motion: instant chapters */
  useEffect(() => {
    if (!reduced) return;
    const stage = stageRef.current;
    layerRefs.current.slice(0, n).forEach((l, i) => {
      if (!l) return;
      show(l, i === active, i === active ? 1 : 0);
      l.querySelectorAll<HTMLElement>("[data-strip]").forEach((s) => clearStyle(s, "transform"));
      const z = l.querySelector<HTMLElement>("[data-zoom]");
      if (z) clearStyle(z, "transform");
    });
    contentRefs.current.slice(0, n).forEach((c, i) => {
      if (!c) return;
      show(c, i === active);
      c.querySelectorAll<HTMLElement>("[data-hero-word], [data-hero-fade]").forEach((w) => clearStyle(w, "transform", "filter", "opacity", "letterSpacing"));
    });
    seamRefs.current.forEach((s) => s && (s.style.opacity = "0"));
    ["--push", "--exit"].forEach((p) => stage?.style.removeProperty(p));
    if (odoRef.current) odoRef.current.style.transform = `translateY(${-active}em)`;
  }, [active, n, reduced]);

  /* ------------------------------------------- scroll → every visual */
  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (reduced || !root || !stage) return;
    const layers = layerRefs.current.slice(0, n).filter((l): l is HTMLDivElement => !!l);
    const contents = contentRefs.current.slice(0, n).filter((c): c is HTMLDivElement => !!c);
    const seams = seamRefs.current.slice(0, STRIPS - 1).filter((s): s is HTMLSpanElement => !!s);
    if (layers.length !== n || contents.length !== n) return;
    const strips = layers.map((l) => [...l.querySelectorAll<HTMLElement>("[data-strip]")]);
    const zooms = layers.map((l) => l.querySelector<HTMLElement>("[data-zoom]"));
    const words = contents.map((c) => [...c.querySelectorAll<HTMLElement>("[data-hero-word]")]);
    const fades = contents.map((c) => [...c.querySelectorAll<HTMLElement>("[data-hero-fade]")]);
    const run = 1 - STAGGER * (STRIPS - 1);

    let raf = 0;
    let started = false;
    let snapped = false;
    // Freeze the film's current frame into the shutter panels (drawn once per transition).
    const snap = () => {
      const v = filmRef.current;
      const layer = layers[filmIndex];
      if (!v || !layer || v.readyState < 2 || !v.videoWidth) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      layer.querySelectorAll<HTMLCanvasElement>("canvas[data-snap]").forEach((c) => {
        const W = c.offsetWidth;
        const Hc = c.offsetHeight;
        if (!W || !Hc) return;
        c.width = Math.round(W * dpr);
        c.height = Math.round(Hc * dpr);
        const scale = Math.max(W / v.videoWidth, Hc / v.videoHeight);
        const dw = v.videoWidth * scale;
        const dh = v.videoHeight * scale;
        try {
          c.getContext("2d")?.drawImage(v, ((W - dw) / 2) * dpr, ((Hc - dh) / 2) * dpr, dw * dpr, dh * dpr);
        } catch {
          /* the poster image beneath stands in */
        }
      });
    };
    const update = () => {
      raf = 0;
      const H = stage.offsetHeight;
      const seg = (root.offsetHeight - 2 * H) / (n - 1 + TAIL);
      if (seg <= 0) return;
      const y = -root.getBoundingClientRect().top;
      const t = clamp(y / seg, 0, n - 1);
      // Cover progress: 0 when About's top edge enters the viewport, 1 when it reaches the top
      const e = clamp((y - (n - 1 + TAIL) * seg) / H);

      // Which transition we are in and how far through it (resting at both ends)
      const from = Math.max(0, Math.min(Math.floor(t), n - 2));
      const to = Math.min(from + 1, n - 1);
      const q = n > 1 ? span(t - from, HOLD, 1 - 2 * HOLD) : 0;

      // Photographs: outgoing panels slide up in a staggered wave; the next scene settles from a zoom
      layers.forEach((l, i) => show(l, (i === from && q < 1) || (i === to && q > 0), i === from ? 2 : 1));
      strips.forEach((group, i) =>
        group.forEach((strip, k) => {
          const pct = i === from ? -101 * easeInOut(span(q, k * STAGGER, run)) : 0;
          strip.style.transform = pct ? `translate3d(0, ${pct.toFixed(3)}%, 0)` : "";
        }),
      );
      zooms.forEach((z, i) => z && (z.style.transform = i === to && q < 1 ? `scale(${(1.14 - 0.14 * easeOut(q)).toFixed(4)})` : ""));
      // A film chapter leaving: its live film hides behind a frozen frame split across the panels
      const film = filmRef.current;
      if (from === filmIndex && q > 0) {
        if (!snapped) {
          snap();
          snapped = true;
        }
        if (film) film.style.visibility = "hidden";
      } else {
        snapped = false;
        if (film) film.style.visibility = "";
      }
      seams.forEach((seam, k) => {
        const grow = easeOut(span(q, 0.02 + k * STAGGER, 0.4));
        const fade = 1 - span(q, 0.55 + k * 0.05, 0.25);
        seam.style.opacity = (q > 0 && q < 1 ? Math.min(grow * 4, 1) * fade : 0).toFixed(3);
        seam.style.transform = `scaleY(${grow.toFixed(3)})`;
      });

      // Copy: outgoing words lift and blur away; incoming words arrive blurred-to-sharp
      const outQ = span(q, 0, 0.42);
      const inQ = span(q, 0.5, 0.5);
      contents.forEach((c, i) => show(c, (i === from && q < 0.46) || (i === to && q >= 0.5)));
      words.forEach((group, i) => {
        if (i !== from && i !== to) return;
        const last = Math.max(1, group.length - 1);
        group.forEach((w, k) => {
          if (i === from) {
            const p = easeIn(span(outQ, (k / last) * 0.35, 0.65));
            if (p === 0) return clearStyle(w, "transform", "filter", "opacity", "letterSpacing");
            w.style.transform = `translate3d(0, ${(-0.45 * p).toFixed(3)}em, 0)`;
            w.style.filter = `blur(${(10 * p).toFixed(2)}px)`;
            w.style.opacity = (1 - p).toFixed(3);
            w.style.letterSpacing = "";
          } else {
            const p = easeOut(span(inQ, (k / last) * 0.4, 0.6));
            if (p === 1) return clearStyle(w, "transform", "filter", "opacity", "letterSpacing");
            w.style.transform = `translate3d(0, ${(0.55 * (1 - p)).toFixed(3)}em, 0)`;
            w.style.filter = `blur(${(12 * (1 - p)).toFixed(2)}px)`;
            w.style.opacity = p.toFixed(3);
            w.style.letterSpacing = `${(0.06 * (1 - p)).toFixed(4)}em`;
          }
        });
      });
      fades.forEach((group, i) => {
        if (i !== from && i !== to) return;
        group.forEach((f, k) => {
          const p = i === from ? 1 - span(outQ, 0, 0.6) : easeOut(span(inQ, 0.25 + k * 0.12, 0.5));
          if (p === 1) return clearStyle(f, "transform", "opacity");
          f.style.opacity = p.toFixed(3);
          f.style.transform = `translate3d(0, ${((i === from ? -10 : 16) * (1 - p)).toFixed(2)}px, 0)`;
        });
      });

      // Odometer and chapter rail follow the scroll continuously
      if (odoRef.current) odoRef.current.style.transform = `translateY(${(-(from + easeInOut(q))).toFixed(4)}em)`;
      tabRefs.current.forEach((bar, i) => bar?.style.setProperty("--progress", clamp(t - i + 1).toFixed(4)));

      // Depth push across the track; while About covers the stage the photograph eases back and dims
      stage.style.setProperty("--push", (1 + 0.07 * (t / Math.max(1, n - 1))).toFixed(4));
      stage.style.setProperty("--exit", e.toFixed(4));

      if (!started && t > 0.02) {
        started = true;
        setHasChanged(true);
      }
      const scene = q >= 0.5 ? to : from;
      if (scene !== activeRef.current) {
        activeRef.current = scene;
        setActive(scene);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [n, reduced, filmIndex]);

  /* ------------------------------------------------------- navigation */
  const goTo = useCallback(
    (i: number) => {
      const idx = clamp(i, 0, n - 1);
      const root = rootRef.current;
      if (!root) return;
      const stage = stageRef.current;
      const seg = stage ? (root.offsetHeight - 2 * stage.offsetHeight) / (n - 1 + TAIL) : 0;
      if (reduced || seg <= 0) {
        activeRef.current = idx;
        setActive(idx);
        setHasChanged(true);
        return;
      }
      const top = root.getBoundingClientRect().top + window.scrollY + idx * seg + (idx > 0 ? 1 : 0);
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(top, { duration: 1.6 });
      else window.scrollTo({ top, behavior: "smooth" });
    },
    [n, reduced],
  );

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).closest("input, textarea, select")) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(activeRef.current + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(activeRef.current - 1);
    }
  };

  return (
    <section
      ref={rootRef}
      id="top"
      data-header-overlay=""
      aria-roledescription="carousel"
      aria-label="Introduction"
      onKeyDown={onKeyDown}
      className={cn("hs-track relative bg-porcelain", reduced && "hs-static", !hasChanged && "hero-initial")}
      style={{ "--scenes": n } as CSSProperties}
    >
      <div ref={stageRef} className="hs-stage sticky top-0 h-svh min-h-[40rem] overflow-hidden bg-porcelain">
        {/* The gallery frame: the photograph sits inset on Porcelain with soft rounded corners */}
        <div ref={frameRef} className="hs-frame tone-obsidian absolute overflow-hidden text-white">
          <div aria-hidden="true" className="hs-depth absolute inset-0">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                ref={(node) => {
                  layerRefs.current[index] = node;
                }}
                data-hs-layer=""
                data-first={index === 0 ? "" : undefined}
                className="absolute inset-0"
              >
                <div data-zoom="" className={cn("absolute inset-0", index === 0 && !hasChanged && "hs-settle")}>
                  {Array.from({ length: STRIPS }, (_, s) => (
                    <div key={s} data-strip="" className="absolute inset-0 will-change-transform" style={{ clipPath: `inset(0 calc(${100 - ((s + 1) * 100) / STRIPS}% - 1px) 0 calc(${(s * 100) / STRIPS}% - 1px))` }}>
                      <Image
                        src={slide.image.src}
                        alt=""
                        fill
                        sizes="100vw"
                        quality={85}
                        placeholder="blur"
                        preload={index === 0 && s === 0}
                        loading={index === 0 ? undefined : "lazy"}
                        className="object-cover"
                        style={{ objectPosition: slide.focus }}
                      />
                      {/* Film chapters: the shutter splits a snapshot of the current film frame */}
                      {slide.video ? <canvas data-snap="" className="absolute inset-0 size-full" /> : null}
                    </div>
                  ))}
                  {slide.video && filmOn ? (
                    <video
                      ref={filmRef}
                      data-film=""
                      src={slide.video}
                      muted
                      loop
                      playsInline
                      autoPlay
                      preload="auto"
                      onCanPlay={() => setFilmReady(true)}
                      onPlay={() => setFilmPlaying(true)}
                      onPause={() => setFilmPlaying(false)}
                      className={cn("absolute inset-0 size-full object-cover transition-opacity duration-1000", filmReady ? "opacity-100" : "opacity-0")}
                      style={{ objectPosition: slide.focus }}
                    />
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          {/* Teal seams at the panel joints (they flash as the panels part) */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[3]">
            {Array.from({ length: STRIPS - 1 }, (_, s) => (
              <span
                key={s}
                ref={(node) => {
                  seamRefs.current[s] = node;
                }}
                className="absolute inset-y-0 w-px origin-bottom bg-teal/80 opacity-0"
                style={{ left: `${((s + 1) * 100) / STRIPS}%` }}
              />
            ))}
          </div>

          {/* Atmosphere: drifting haze (two layers at different speeds), then the grade and shading */}
          <div aria-hidden="true" className="hs-haze pointer-events-none absolute inset-0 z-[4] overflow-hidden">
            <span className="hs-haze-layer hs-haze-a" />
            <span className="hs-haze-layer hs-haze-b" />
          </div>
          <div aria-hidden="true" className="hs-grade pointer-events-none absolute inset-0 z-[4]" />
          {/* Interactive "membrane" mesh (same as the About and Contact heroes), above every chapter */}
          <div aria-hidden="true" className="hs-mesh pointer-events-none absolute inset-0 z-[5] opacity-45">
            <HeroMembrane scope=".hs-frame" focus="[data-hero-content] :is(h1,h2)" />
          </div>
          <div aria-hidden="true" className="hs-veil pointer-events-none absolute inset-0 z-[30] bg-obsidian" />

          {/* Copy: one chapter at a time */}
          <div className="hs-copy absolute inset-0 z-10">
            {slides.map((slide, index) => {
              const Title = index === 0 ? "h1" : "h2";
              let offset = 0;
              return (
                <div
                  key={slide.id}
                  ref={(node) => {
                    contentRefs.current[index] = node;
                  }}
                  data-hero-slide=""
                  data-hero-content=""
                  data-first={index === 0 ? "" : undefined}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${n}: ${slide.label}`}
                  aria-hidden={index !== active || undefined}
                  inert={index !== active}
                  className="absolute inset-0"
                >
                  <div className="hs-copy-inner flex h-full flex-col justify-end">
                    <div className="grid grid-cols-12 items-end gap-x-col gap-y-8">
                      <div className="col-span-12 lg:col-span-8">
                        <p data-hero-fade="" style={{ "--i": 0 } as CSSProperties} className="text-eyebrow mb-6 flex items-center gap-3.5 text-white/82 lg:mb-9">
                          <span aria-hidden="true" className="h-px w-8 bg-teal" />
                          {slide.eyebrow}
                        </p>
                        <Title className="font-display text-[clamp(2.5rem,1.2rem+4.6vw,5.375rem)] leading-[1.02] font-normal tracking-[-0.045em]">
                          {slide.titleLines.map((line, li) => {
                            const { nodes, next } = renderWords(line, offset);
                            offset = next;
                            return (
                              <span key={li} data-hero-line="" className="block">
                                {nodes}
                              </span>
                            );
                          })}
                        </Title>
                      </div>
                      <div className="col-span-12 lg:col-span-4 lg:justify-self-end">
                        <Link
                          href={slide.cta.href}
                          data-hero-fade=""
                          style={{ "--i": 2 } as CSSProperties}
                          className="group/cta inline-flex w-full items-center justify-between gap-6 rounded-full bg-white py-1.5 pr-1.5 pl-6 text-[0.9375rem] font-medium tracking-[0.01em] whitespace-nowrap text-obsidian transition-colors duration-500 hover:bg-porcelain sm:w-auto"
                        >
                          <span>{slide.cta.label}</span>
                          <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full bg-teal text-white transition-colors duration-500 group-hover/cta:bg-petrol">
                            <ArrowRightIcon className="transition-transform duration-500 ease-premium group-hover/cta:-rotate-45" />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Film pause / play (shown on the film chapter) */}
          {filmIndex >= 0 && !reduced ? (
            <button
              type="button"
              onClick={toggleFilm}
              aria-label={`${filmPlaying ? "Pause" : "Play"} background video`}
              aria-pressed={!filmPlaying}
              tabIndex={active === filmIndex ? undefined : -1}
              className={cn(
                "hs-film-toggle absolute top-[5.25rem] right-(--hs-pad) z-20 inline-flex size-11 items-center justify-center rounded-full border border-white/30 bg-obsidian/30 text-white backdrop-blur-sm transition-[opacity,background-color,border-color] duration-500 hover:border-white/70 hover:bg-obsidian/55 lg:top-[6.25rem]",
                active === filmIndex ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              {filmPlaying ? (
                <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5" fill="currentColor">
                  <rect x="3.5" y="2.5" width="3" height="11" rx="0.5" />
                  <rect x="9.5" y="2.5" width="3" height="11" rx="0.5" />
                </svg>
              ) : (
                <svg aria-hidden="true" viewBox="0 0 16 16" className="ml-0.5 size-3.5" fill="currentColor">
                  <path d="M4 2.5v11l9-5.5z" />
                </svg>
              )}
            </button>
          ) : null}

          {/* Scroll cue (desktop): mid-height on the right; fades once scrolling begins */}
          <div aria-hidden="true" className="hs-cue pointer-events-none absolute top-1/2 right-8 z-10 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
            <span className="text-[0.625rem] tracking-[0.22em] text-white/60 uppercase [writing-mode:vertical-rl]">Scroll to explore</span>
            <span className="relative block h-12 w-px overflow-hidden bg-white/20">
              <span className="scroll-cue-line absolute inset-0 block bg-teal" />
            </span>
          </div>

          {/* Bottom bar: the chapter index rail and the Porcelain notch */}
          <div className="hero-controls hs-controls absolute inset-x-0 bottom-0 z-20 flex items-stretch">
            <ol aria-label="Choose a slide" className="hs-rail flex min-w-0 flex-1 items-stretch">
              {slides.map((slide, i) => {
                const current = i === active;
                return (
                  <li key={slide.id} className="min-w-0 flex-1">
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={current ? "true" : undefined}
                      aria-label={`Slide ${i + 1} of ${n}: ${slide.label}`}
                      className="group relative flex h-full w-full flex-col justify-center gap-1.5 pr-3 text-left lg:pr-8"
                    >
                      <span className="absolute top-0 right-3 left-0 block h-px overflow-hidden bg-white/22 lg:right-8">
                        <span
                          ref={(node) => {
                            tabRefs.current[i] = node;
                          }}
                          className={cn("hero-progress absolute inset-0 bg-teal", i === 0 && "[--progress:1]", reduced && i <= active && "[--progress:1]")}
                        />
                      </span>
                      <span className={cn("flex min-w-0 items-baseline gap-2.5 transition-colors duration-500", current ? "text-white" : "text-white/48 group-hover:text-white/80")}>
                        <span className="font-display text-[0.9375rem] tracking-[-0.01em] tabular-nums lg:text-base">{pad(i + 1)}</span>
                        <span className="hidden truncate text-[0.6875rem] font-medium tracking-[0.16em] uppercase md:inline">{slide.label}</span>
                      </span>
                      <span className={cn("hidden truncate text-[0.8125rem] leading-snug transition-colors duration-500 xl:block", current ? "text-white/70" : "text-white/35 group-hover:text-white/55")}>
                        {slide.titleLines.join(" ").replace(/\*/g, "")}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="hs-notch relative flex flex-none items-center bg-porcelain text-obsidian">
              <p aria-hidden="true" className="flex items-baseline gap-2">
                <span className="hs-odo font-display text-[1.75rem] tracking-[-0.03em] tabular-nums lg:text-[2.375rem]">
                  <span>0</span>
                  <span className="hs-odo-window">
                    <span ref={odoRef} className="hs-odo-reel">
                      {slides.map((s, i) => (
                        <span key={s.id}>{i + 1}</span>
                      ))}
                    </span>
                  </span>
                </span>
                <span className="text-[0.6875rem] tracking-[0.14em] text-obsidian/50">/ {pad(n)}</span>
              </p>
              <span aria-hidden="true" className="mx-1.5 hidden h-8 w-px bg-obsidian/12 sm:block lg:mx-3" />
              <div className="flex items-center">
                <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous slide" className="group grid h-11 w-11 place-items-center text-obsidian/70 transition-colors hover:text-teal disabled:opacity-25 lg:w-14">
                  <span className="transition-transform duration-500 ease-premium group-hover:-translate-x-1">
                    <LineArrow direction="prev" />
                  </span>
                </button>
                <button type="button" onClick={() => goTo(active + 1)} disabled={active === n - 1} aria-label="Next slide" className="group grid h-11 w-11 place-items-center text-obsidian/70 transition-colors hover:text-teal disabled:opacity-25 lg:w-14">
                  <span className="transition-transform duration-500 ease-premium group-hover:translate-x-1">
                    <LineArrow direction="next" />
                  </span>
                </button>
              </div>
              <a href="#about" className="group ml-1 hidden h-11 items-center gap-2 pl-3 text-[0.6875rem] font-medium tracking-[0.16em] whitespace-nowrap text-obsidian/60 uppercase transition-colors hover:text-teal md:inline-flex">
                Skip intro
                <span aria-hidden="true" className="transition-transform duration-500 ease-premium group-hover:translate-y-0.5">
                  ↓
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <p aria-live="polite" className="sr-only">
        {`Slide ${active + 1} of ${n}: ${slides[active]?.label ?? ""}`}
      </p>
    </section>
  );
}
