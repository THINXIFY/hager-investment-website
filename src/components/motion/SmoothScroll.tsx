"use client";

import Lenis from "lenis";
import { useEffect } from "react";

import { REDUCED_MOTION_QUERY, ScrollTrigger, gsap } from "@/lib/gsap";
import { setLenis } from "@/lib/smooth-scroll";

/**
 * Site-wide smooth scrolling (Lenis), driven by the GSAP ticker so ScrollTrigger
 * stays in lockstep. The page still scrolls natively (sticky, keyboard, scrollbar,
 * touch all work); Lenis only eases wheel input. Off when the user prefers reduced motion, and
 * on touch-primary devices, where it does not smooth touch anyway: phones and tablets keep fully
 * native scrolling and momentum, without an extra per-frame loop.
 *
 * Same-page anchor links are handled here: focus moves to the target at once (so the
 * skip link and keyboard users land correctly), the page glides there, then the URL updates.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia(REDUCED_MOTION_QUERY);
    const touch = window.matchMedia("(hover: none) and (pointer: coarse)");
    let lenis: Lenis | null = null;
    const tick = (time: number) => lenis?.raf(time * 1000);

    const onClick = (event: MouseEvent) => {
      if (!lenis || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href*='#']");
      if (!link || link.target === "_blank") return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      // The previous route may still be in the DOM (hidden), so ids can repeat: take the rendered one.
      const id = CSS.escape(decodeURIComponent(url.hash.slice(1)));
      const target = Array.from(document.querySelectorAll<HTMLElement>(`[id="${id}"]`)).find((el) => el.checkVisibility());
      if (!target) return;

      event.preventDefault();
      if (location.hash !== url.hash) {
        history.pushState(null, "", url.hash);
        // pushState does not fire hashchange; components that react to the hash (atlas) need it.
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      }

      const go = () => {
        if (!lenis) return;
        if (!target.matches("a, button, input, select, textarea, [tabindex]")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        // Re-measure first: late layout changes (fonts, lazy media) can leave Lenis with a stale
        // scroll limit that stops the scroll short of the target. Then verify the landing.
        lenis.resize();
        lenis.scrollTo(target, {
          duration: 1.2,
          onComplete: () => {
            if (!lenis) return;
            const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
            const miss = target.getBoundingClientRect().top - offset;
            const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
            if (Math.abs(miss) > 8 && !(miss > 0 && atBottom)) {
              lenis.resize();
              lenis.scrollTo(target, { duration: 0.6 });
            }
          },
        });
      };
      // A mobile-menu link: Lenis is paused and the page inert until the menu closes,
      // so wait for that (a few frames) before moving focus and scrolling.
      let frames = 0;
      const whenReady = () => {
        if (!lenis) return;
        if ((lenis.isStopped || target.closest("[inert]")) && frames++ < 90) requestAnimationFrame(whenReady);
        else go();
      };
      whenReady();
    };

    const start = () => {
      if (lenis) return;
      lenis = new Lenis({ autoRaf: false, lerp: 0.1, smoothWheel: true, syncTouch: false });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      // Capture phase on window: runs before React, so next/link (which skips navigation for a
      // default-prevented click) leaves the jump to Lenis while its own onClick handlers still run.
      window.addEventListener("click", onClick, true);
      setLenis(lenis);
    };
    const stop = () => {
      if (!lenis) return;
      window.removeEventListener("click", onClick, true);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      lenis = null;
      setLenis(null);
    };
    const sync = () => (reduced.matches || touch.matches ? stop() : start());

    sync();
    reduced.addEventListener("change", sync);
    touch.addEventListener("change", sync);
    return () => {
      reduced.removeEventListener("change", sync);
      touch.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return null;
}
