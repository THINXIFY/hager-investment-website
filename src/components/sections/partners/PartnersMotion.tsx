"use client";

import { useEffect } from "react";

import { MOTION_OK_QUERY, ScrollTrigger, gsap } from "@/lib/gsap";

/**
 * Partner logo choreography (motion-safe only):
 *  1. Mask unveil with ink-in. Rows reveal as they enter: each tile opens top to bottom in a
 *     left-to-right wave, and its logo inks in from soft grey to its true brand colours.
 *     Inline styles are cleared afterwards so hover effects and shadows stay intact.
 *  2. Parallax depth (3-column desktop only). While scrolling, the outer columns drift a little
 *     further than the middle one, giving the grid a quiet sense of depth.
 *  3. Spotlight. The row nearest the middle of the viewport is fully crisp; rows above and below
 *     ease to slightly muted and smaller, guiding the eye row by row.
 * With reduced motion nothing is hidden or moved: the gallery simply appears.
 */
export function PartnersMotion({ gridId }: { gridId: string }) {
  useEffect(() => {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    const mm = gsap.matchMedia();
    const raf = requestAnimationFrame(() => {
      mm.add(MOTION_OK_QUERY, () => {
        const items = [...grid.querySelectorAll<HTMLElement>(":scope > li")];
        const cols = getComputedStyle(grid).gridTemplateColumns.split(" ").length;

        // Group tiles into visual rows (by their top edge).
        const rows = new Map<number, HTMLElement[]>();
        items.forEach((li) => {
          const top = Math.round(li.offsetTop);
          rows.set(top, [...(rows.get(top) ?? []), li]);
        });

        // 1. Mask unveil + ink-in, row by row
        items.forEach((li) => {
          gsap.set(li.querySelector("figure"), { clipPath: "inset(0% 0% 100% 0%)" });
          gsap.set(li.querySelector("img"), { opacity: 0.2, filter: "grayscale(1) contrast(0.8)" });
        });
        [...rows.values()].forEach((row) => {
          ScrollTrigger.create({
            trigger: row[0],
            start: "top 88%",
            once: true,
            onEnter: () =>
              row.forEach((li, c) => {
                const fig = li.querySelector("figure");
                const img = li.querySelector("img");
                const delay = c * 0.12;
                gsap.to(fig, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.95, ease: "power3.inOut", delay, onComplete: () => gsap.set(fig, { clearProps: "clipPath" }) });
                gsap.to(img, { opacity: 1, filter: "grayscale(0) contrast(1)", duration: 1.1, ease: "power2.out", delay: delay + 0.35, onComplete: () => gsap.set(img, { clearProps: "opacity,filter" }) });
              }),
          });
        });

        // 3. Spotlight: the row nearest the middle of the viewport is fully crisp; rows further
        //    away ease to slightly muted and a touch smaller (smoothed with quickTo).
        const rowList = [...rows.values()];
        const setters = rowList.map((row) => ({
          row,
          opacity: row.map((li) => gsap.quickTo(li, "opacity", { duration: 0.45, ease: "power2.out" })),
          scaleX: row.map((li) => gsap.quickTo(li, "scaleX", { duration: 0.45, ease: "power2.out" })),
          scaleY: row.map((li) => gsap.quickTo(li, "scaleY", { duration: 0.45, ease: "power2.out" })),
        }));
        const spotlight = () => {
          const mid = window.innerHeight / 2;
          const reach = window.innerHeight * 0.55;
          setters.forEach(({ row, opacity, scaleX, scaleY }) => {
            const r = row[0]?.getBoundingClientRect();
            if (!r) return;
            const d = Math.min(1, Math.abs(r.top + r.height / 2 - mid) / reach);
            const k = Math.pow(d, 1.4);
            opacity.forEach((set) => set(1 - 0.5 * k));
            scaleX.forEach((set) => set(1 - 0.04 * k));
            scaleY.forEach((set) => set(1 - 0.04 * k));
          });
        };
        spotlight();
        ScrollTrigger.create({ trigger: grid, start: "top bottom", end: "bottom top", onUpdate: spotlight, onRefresh: spotlight });

        // 2. Parallax depth: three columns only
        if (cols === 3) {
          const drift = [36, 12, 36];
          items.forEach((li, i) => {
            const d = drift[i % 3] ?? 0;
            gsap.fromTo(li, { y: d }, { y: -d, ease: "none", scrollTrigger: { trigger: grid, start: "top bottom", end: "bottom top", scrub: 0.8 } });
          });
        }
      });
      ScrollTrigger.refresh();
    });
    return () => {
      cancelAnimationFrame(raf);
      mm.revert();
    };
  }, [gridId]);
  return null;
}
