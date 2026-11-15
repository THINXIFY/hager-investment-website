"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { DESKTOP_QUERY, MOTION_OK_QUERY, ScrollTrigger, gsap } from "@/lib/gsap";

const BASELINE = 212;

/**
 * The footer's reveal (FT-02), scrubbed to scroll, transform/opacity/clip-path only, no pinning:
 *  1. The panel opens from a rounded inset on the Obsidian stage to full bleed.
 *  2. Its content travels up more slowly than the page, emerging from beneath the last section,
 *     as a veil lifts and the background light shifts.
 *  3. Near the end the HAGER letters rise one by one from the baseline while a band of light
 *     passes across them.
 * The footer keeps its natural height and position, so anchors, Back to top and keyboard
 * navigation are unaffected. Re-measured on every route change; nothing runs with reduced motion.
 */
export function FooterMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    // Pause the ambient CSS animation while the footer is off screen.
    const io = new IntersectionObserver(([e]) => footer.toggleAttribute("data-inview", !!e?.isIntersecting), { rootMargin: "120px 0px" });
    io.observe(footer);

    const mm = gsap.matchMedia();
    const raf = requestAnimationFrame(() => {
      mm.add({ motion: MOTION_OK_QUERY, desktop: DESKTOP_QUERY }, (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
        if (!motion) return;
        const curtain = footer.querySelector("[data-footer-curtain]");
        const veil = footer.querySelector("[data-footer-veil]");
        const mark = footer.querySelector("[data-footer-mark]");
        const sheen = footer.querySelector("[data-footer-sheen]");
        const letters = gsap.utils.toArray<SVGTSpanElement>(footer.querySelectorAll("[data-footer-letter]"));
        const light = footer.querySelectorAll("[data-footer-light]");
        const whole = { trigger: footer, start: "top bottom", end: "bottom bottom", scrub: 0.6, invalidateOnRefresh: true };

        // 1. Panel opens to full bleed
        gsap.fromTo(
          footer,
          { clipPath: desktop ? "inset(72px 4.5% 0% 4.5% round 36px)" : "inset(28px 3% 0% 3% round 20px)" },
          { clipPath: "inset(0px 0% 0% 0% round 0px)", ease: "none", scrollTrigger: { trigger: footer, start: "top bottom", end: desktop ? "top 15%" : "top 35%", scrub: 0.5, invalidateOnRefresh: true } },
        );
        // 2. Content emerges from beneath; veil lifts; light shifts
        if (curtain) gsap.fromTo(curtain, { y: () => -Math.min(window.innerHeight * (desktop ? 0.34 : 0.16), desktop ? 320 : 120) }, { y: 0, ease: "none", scrollTrigger: whole });
        if (veil) gsap.fromTo(veil, { opacity: 0.85 }, { opacity: 0, ease: "none", scrollTrigger: { ...whole, end: "top 30%" } });
        if (light.length) gsap.fromTo(light, { xPercent: -14, yPercent: 10 }, { xPercent: 10, yPercent: -6, ease: "none", scrollTrigger: whole });

        // 3. Letters rise in sequence; a band of light crosses the word
        if (mark && letters.length) {
          const half = letters.length / 2; // fill letters + matching sheen letters
          const tl = gsap.timeline({ scrollTrigger: { trigger: mark, start: "top bottom", end: "bottom bottom", scrub: 0.9, invalidateOnRefresh: true } });
          for (let i = 0; i < half; i++) {
            tl.fromTo([letters[i], letters[i + half]], { attr: { y: BASELINE + 230 } }, { attr: { y: BASELINE }, duration: 1, ease: "power3.out" }, i * 0.16);
          }
          if (sheen) tl.fromTo(sheen, { attr: { x1: -420, x2: -120 } }, { attr: { x1: 1120, x2: 1420 }, duration: 1.1, ease: "power1.inOut" }, 0.45);
        }
      });
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      mm.revert();
    };
  }, [pathname]);

  return null;
}
