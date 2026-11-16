"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

import { usePrefersReducedMotion } from "@/lib/use-media-query";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const span = (p: number, start: number, len: number) => clamp((p - start) / len);
const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);

/**
 * Scroll driver for the homepage statement ("Aperture"). The section is a tall track with a
 * sticky stage; progress 0 → 1 through the track sets CSS variables that open the photograph
 * from a narrow window to full bleed, deepen the shading, drift the outlined wordmark and light
 * the headline word by word. Reduced motion: the final state, no track.
 */
export function StatementAperture({ children, words }: { children: ReactNode; words: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const stage = root.querySelector<HTMLElement>(".st-stage");
    const wordEls = [...root.querySelectorAll<HTMLElement>("[data-st-word]")];
    if (!stage) return;

    if (reduced) {
      stage.style.setProperty("--open", "1");
      stage.style.setProperty("--zoom", "1");
      stage.style.setProperty("--copy", "1");
      stage.style.setProperty("--drift", "0");
      wordEls.forEach((w) => w.style.setProperty("--lit", "1"));
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = root.getBoundingClientRect();
      const travel = Math.max(1, root.offsetHeight - window.innerHeight);
      const p = clamp(-r.top / travel);
      const open = easeInOut(span(p, 0.04, 0.5));
      stage.style.setProperty("--p", p.toFixed(4));
      stage.style.setProperty("--open", open.toFixed(4));
      stage.style.setProperty("--zoom", (1.28 - 0.22 * easeOut(span(p, 0, 0.8))).toFixed(4));
      stage.style.setProperty("--drift", p.toFixed(4));
      stage.style.setProperty("--copy", easeOut(span(p, 0.6, 0.22)).toFixed(4));
      const n = Math.max(1, words);
      wordEls.forEach((w, i) => {
        const lit = easeOut(span(p, 0.14 + (i / n) * 0.42, 0.14));
        w.style.setProperty("--lit", lit.toFixed(4));
        // Blur only while a word is lighting up; a settled word carries no filter (cheaper to paint)
        w.style.filter = lit > 0.001 && lit < 0.999 ? `blur(${((1 - lit) * 6).toFixed(2)}px)` : lit <= 0.001 ? "blur(6px)" : "";
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced, words]);

  return (
    <section ref={ref} aria-labelledby="statement-title" className={reduced ? "st-track st-static tone-obsidian relative" : "st-track tone-obsidian relative"} style={{ "--words": words } as CSSProperties}>
      {children}
    </section>
  );
}
