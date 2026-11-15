"use client";

import {
  DESKTOP_QUERY,
  EASE,
  MOTION_OK_QUERY,
  REDUCED_MOTION_QUERY,
  ScrollTrigger,
  SplitText,
  gsap,
  useGSAP,
} from "@/lib/gsap";
import { getLenis } from "@/lib/smooth-scroll";

/**
 * Declarative scroll choreography. Server Components opt in with attributes:
 *
 *   data-reveal                  fade/rise into view (batched + staggered)
 *   data-seq-group="0.14"        container whose [data-seq] children enter in sequence
 *     data-seq-delay="0.4"       (on the group) delay before the first child
 *   data-split                   heading lines rise from a mask (SplitText, reverted afterwards)
 *     data-split-delay="0.2"
 *   data-fill                    words fill from pale to full strength with scroll (scrubbed)
 *   data-clip-reveal="up|x|x-rev"  frame wipes open; its photo settles from a slight scale
 *   data-mosaic                  desktop: panel unmasks in a staggered gallery entrance
 *   data-parallax                slow vertical drift (inside an overflow-hidden frame)
 *   data-drift="4"               scroll-linked horizontal type movement (xPercent ±n)
 *     data-drift-axis="y"
 *   data-draw-line               rule draws from the left
 *   data-pop                     small circular control settles into place
 *   data-rise-group/data-rise    monumental characters rise from a mask
 *   data-scrub-scale, data-progress(-track), data-count
 *   data-hero-drift / data-hero-scroll   hero image depth and copy lift on scroll-out
 *   data-hero-zoom / -veil / -inset      hero film pushes in, darkens and recedes into a panel
 *   data-hero-split="left|right"         hero headline lines drift apart on scroll-out
 *   data-stack-card              stacked sticky cards: the covered card eases back and dims
 *   data-draw-path               SVG stroke draws on entry (give the shape pathLength="1")
 *   data-expand="6"              dark field widens from side insets to full bleed (scrubbed)
 *   data-frame-expand            image frame opens to full bleed (scrubbed); children:
 *     data-frame-media           scales 1.2 → 1 with the frame
 *     data-frame-line            masked statement lines rise once the frame is open
 *
 * Only transform, opacity and clip-path are animated. Content is fully
 * visible without JavaScript; hidden states are applied here at mount and
 * never when the user prefers reduced motion. Render once per page.
 */
/** True once any page has mounted the engine (later mounts are client navigations). */
let hasMounted = false;

export function ScrollAnimations() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    /*
     * Rendered elements only. With Cache Components, Next keeps the previous route in the DOM
     * (hidden by React <Activity>) after a client navigation; animating those zero-size nodes
     * corrupts ScrollTrigger's refresh and crashes the new page.
     */
    const rendered = (el: Element) => (typeof el.checkVisibility === "function" ? el.checkVisibility() : true);
    const $ = <T extends Element = HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel).filter(rendered);

    const setup = () =>
    mm.add({ motion: MOTION_OK_QUERY, reduced: REDUCED_MOTION_QUERY, desktop: DESKTOP_QUERY }, (ctx) => {
      const { reduced, desktop } = ctx.conditions as { reduced: boolean; desktop: boolean };

      if (reduced) {
        // Static, readable composition: nothing hidden, nothing moving.
        gsap.set("[data-reveal], [data-seq], [data-mosaic], [data-clip-reveal], [data-scrub-scale], [data-rise], [data-pop], [data-frame-line]", {
          clearProps: "all",
        });
        gsap.set("[data-progress]", { scaleX: 1, scaleY: 1 });
        return;
      }

      /* Entrance helper. Opacity only (never visibility:hidden), so unrevealed content stays focusable. */
      const show = (targets: Element[] | Element, stagger = 0.09, delay = 0) =>
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: 1.15,
          ease: EASE.out,
          stagger,
          delay,
          overwrite: true,
          clearProps: "transform,opacity",
        });

      /*
       * Entrances play once, but without ScrollTrigger's `once: true`: that kills the trigger from
       * inside ScrollTrigger's refresh loop, and a trigger created at the same moment (resize,
       * late component) can then read a removed entry and crash ("reading 'end'").
       */
      const PLAY_ONCE = "play none none none";
      const firstTime = (fn: () => void) => {
        let done = false;
        return () => {
          if (done) return;
          done = true;
          fn();
        };
      };
      const shown = new WeakSet<Element>();
      const fresh = (batch: Element[]) => {
        const next = batch.filter((el) => !shown.has(el));
        next.forEach((el) => shown.add(el));
        return next;
      };

      /**
       * Batched entrances. After a long jump (anchor link, End key) every skipped element
       * arrives in one batch: those already above the viewport settle instantly, and the
       * stagger is shared across what is actually visible so it never queues for seconds.
       */
      const showBatch = (batch: Element[], each = 0.09) => {
        const above = batch.filter((el) => el.getBoundingClientRect().bottom <= 0);
        const visible = batch.filter((el) => el.getBoundingClientRect().bottom > 0);
        if (above.length) gsap.set(above, { opacity: 1, y: 0, overwrite: true, clearProps: "transform,opacity" });
        if (visible.length) show(visible, Math.min(each, 0.6 / visible.length));
      };

      /* Reveal (batched) */
      const reveals = $("[data-reveal]");
      gsap.set(reveals, { opacity: 0, y: 28 });
      ScrollTrigger.batch(reveals, { start: "top 90%", onEnter: (batch) => showBatch(fresh(batch)) });

      /* Sequenced groups: children enter one after another once the group arrives */
      $("[data-seq-group]").forEach((group) => {
        const items = Array.from(group.querySelectorAll<HTMLElement>("[data-seq]"));
        if (!items.length) return;
        gsap.set(items, { opacity: 0, y: 24 });
        const stagger = Number.parseFloat(group.dataset.seqGroup || "") || 0.12;
        const delay = Number.parseFloat(group.dataset.seqDelay || "") || 0;
        ScrollTrigger.create({ trigger: group, start: "top 86%", onEnter: firstTime(() => show(items, stagger, delay)) });
      });

      /* Expertise gallery: desktop unmasks panel by panel; smaller screens use a simple rise */
      const panels = $("[data-mosaic]");
      const firstPanel = panels[0];
      if (firstPanel) {
        if (desktop) {
          const grid = firstPanel.parentElement ?? firstPanel;
          gsap.set(panels, { clipPath: "inset(100% 0% 0% 0%)" });
          const tl = gsap.timeline({ scrollTrigger: { trigger: grid, start: "top 78%", toggleActions: PLAY_ONCE } });
          // The hairline grid (the list's background) arrives with the panels instead of waiting as a flat slab.
          if (grid !== firstPanel) tl.from(grid, { backgroundColor: "rgba(255,255,255,0)", duration: 1.6, ease: EASE.inOut, clearProps: "backgroundColor" }, 0.2);
          panels.forEach((panel, i) => {
            const at = i * 0.12;
            tl.to(panel, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.25, ease: "expo.inOut", clearProps: "clipPath" }, at);
            const media = panel.querySelector(".photo > div");
            if (media) tl.fromTo(media, { scale: 1.16 }, { scale: 1, duration: 1.8, ease: EASE.out }, at);
            const copy = panel.querySelectorAll("[data-mosaic-copy]");
            if (copy.length) tl.fromTo(copy, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1, ease: EASE.out, stagger: 0.08, clearProps: "transform,opacity" }, at + 0.55);
          });
        } else {
          gsap.set(panels, { opacity: 0, y: 28 });
          ScrollTrigger.batch(panels, { start: "top 90%", onEnter: (batch) => showBatch(fresh(batch), 0.1) });
        }
      }

      // Keyboard users can tab ahead of the scroll position: a focused control (and every
      // animated wrapper around it) is shown at once, never mid-fade.
      const HOSTS = "[data-reveal], [data-seq], [data-mosaic]";
      const onFocusIn = (e: FocusEvent) => {
        const host = (e.target as Element | null)?.closest?.(HOSTS) ?? null;
        for (let n: Element | null = host; n; n = n.parentElement?.closest(HOSTS) ?? null) {
          gsap.set(n, { opacity: 1, y: 0, overwrite: true, clearProps: "transform,opacity,clipPath" });
        }
      };
      document.addEventListener("focusin", onFocusIn);

      /* Masked line rise for headings (split after fonts settle; DOM restored once complete) */
      $("[data-split]").forEach((el) => {
        let done = false;
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          aria: "none",
          autoSplit: true,
          onSplit(self) {
            if (done) return;
            return gsap.from(self.lines, {
              yPercent: 112,
              duration: 1.35,
              ease: EASE.out,
              stagger: 0.1,
              delay: Number.parseFloat(el.dataset.splitDelay || "") || 0,
              scrollTrigger: { trigger: el, start: "top 88%", toggleActions: PLAY_ONCE },
              onComplete: () => {
                done = true;
                self.revert();
              },
            });
          },
        });
      });

      /*
       * Scroll text fill: words start pale and reach full strength in reading order,
       * tied to scroll position (scrubbed both ways). Overlapping words give a soft
       * leading edge. Opacity only; nested spans (italic emphasis) keep their colour.
       */
      $("[data-fill]").forEach((el) => {
        const split = SplitText.create(el, { type: "words", wordsClass: "fill-word", aria: "none" });
        gsap.fromTo(
          split.words,
          { opacity: 0.18 },
          {
            opacity: 1,
            ease: "none",
            duration: 1,
            stagger: 0.32,
            // Complete once the heading top reaches reading position (multi-line headings included).
            scrollTrigger: { trigger: el, start: desktop ? "top 90%" : "top 92%", end: desktop ? "top 55%" : "top 60%", scrub: 0.6 },
          },
        );
      });

      /* Parallax */
      $("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -6 },
          { yPercent: 6, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });

      /* Scroll-linked type movement */
      $("[data-drift]").forEach((el) => {
        const amount = (Number.parseFloat(el.dataset.drift || "") || 4) * (desktop ? 1 : 0.5);
        const prop = el.dataset.driftAxis === "y" ? "yPercent" : "xPercent";
        gsap.fromTo(
          el,
          { [prop]: amount },
          { [prop]: -amount, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 } },
        );
      });

      /* Rules that draw in */
      $("[data-draw-line]").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 1.8, ease: EASE.inOut, scrollTrigger: { trigger: el, start: "top 88%", toggleActions: PLAY_ONCE } },
        );
      });

      /* SVG strokes that draw on entry (elements carry pathLength="1") */
      $<SVGGeometryElement>("[data-draw-path]").forEach((el) => {
        gsap.fromTo(
          el,
          { strokeDasharray: 1, strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 2, ease: EASE.inOut, delay: 0.2, scrollTrigger: { trigger: el, start: "top 90%", toggleActions: PLAY_ONCE } },
        );
      });

      /* Stacking cards: as the next card slides over, the one beneath eases back and dims */
      const stack = $("[data-stack-card]");
      stack.forEach((card, i) => {
        const next = stack[i + 1];
        if (!next) return;
        gsap.fromTo(
          card,
          // Brightness (not opacity) dims the covered card, so a card never turns see-through.
          { scale: 1, filter: "brightness(1)" },
          { scale: 0.94, filter: "brightness(0.42)", ease: "none", scrollTrigger: { trigger: next, start: "top 85%", end: "top 20%", scrub: 0.4 } },
        );
      });

      /* Light-to-dark curtain: a dark field widens to full bleed as its section arrives */
      $("[data-expand]").forEach((el) => {
        const side = (Number.parseFloat(el.dataset.expand || "") || 6) * (desktop ? 1 : 0.5);
        gsap.fromTo(
          el,
          { clipPath: `inset(0% ${side}% 0% ${side}%)` },
          { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "top 35%", scrub: 0.5 } },
        );
      });

      /* Expanding cinematic frame: the image opens from an editorial crop to full bleed */
      $("[data-frame-expand]").forEach((frame) => {
        const inset = desktop ? "12% 19% 12% 19%" : "5% 6% 5% 6%";
        const tl = gsap.timeline({ scrollTrigger: { trigger: frame, start: "top 92%", end: "center 60%", scrub: 0.6 } });
        tl.fromTo(frame, { clipPath: `inset(${inset})` }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none" }, 0);
        const media = frame.querySelector("[data-frame-media]");
        if (media) tl.fromTo(media, { scale: 1.2 }, { scale: 1, ease: "none" }, 0);
        const lines = frame.querySelectorAll("[data-frame-line]");
        if (lines.length) {
          gsap.set(lines, { yPercent: 112 });
          ScrollTrigger.create({
            trigger: frame,
            start: "center 62%",
            onEnter: firstTime(() => gsap.to(lines, { yPercent: 0, duration: 1.4, ease: EASE.out, stagger: 0.16 })),
          });
        }
      });

      /* Circular controls settle into place */
      $("[data-pop]").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.6, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.1, delay: 0.5, ease: EASE.out, clearProps: "transform,opacity", scrollTrigger: { trigger: el, start: "top 92%", toggleActions: PLAY_ONCE } },
        );
      });

      /* Monumental type: children of [data-rise-group] rise from an overflow mask in sequence */
      $("[data-rise-group]").forEach((group) => {
        const parts = group.querySelectorAll("[data-rise]");
        if (!parts.length) return;
        gsap.fromTo(
          parts,
          { yPercent: 108 },
          { yPercent: 0, duration: 1.5, ease: EASE.out, stagger: 0.09, scrollTrigger: { trigger: group, start: "top 88%", toggleActions: PLAY_ONCE } },
        );
      });

      /* Masked frame reveal: the frame wipes open while the photo settles from a slight scale */
      const CLIP_FROM: Record<string, string> = {
        up: "inset(100% 0% 0% 0%)",
        x: "inset(0% 100% 0% 0%)",
        "x-rev": "inset(0% 0% 0% 100%)",
      };
      $("[data-clip-reveal]").forEach((el) => {
        const from = CLIP_FROM[el.dataset.clipReveal || "up"] ?? CLIP_FROM.up;
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", toggleActions: PLAY_ONCE } });
        tl.fromTo(el, { clipPath: from }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut", clearProps: "clipPath" });
        // Scale the photo's inner layer (not the <img>, which may carry CSS hover transitions).
        const media = el.querySelector(".photo > div");
        if (media) tl.fromTo(media, { scale: 1.16 }, { scale: 1, duration: 1.9, ease: EASE.out }, 0);
      });

      /* Cinematic scale tied to scroll position (inside an overflow-hidden frame) */
      $("[data-scrub-scale]").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 1.16 },
          { scale: 1, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });

      /* Hero scroll-out: imagery recedes slowly, copy lifts and fades (controls untouched) */
      const hero = $("[data-header-overlay]")[0];
      if (hero) {
        const scroll = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
        const drift = hero.querySelectorAll("[data-hero-drift]");
        if (drift.length) gsap.fromTo(drift, { yPercent: 0 }, { yPercent: 7, ease: "none", scrollTrigger: scroll });
        const copy = hero.querySelectorAll("[data-hero-scroll]");
        if (copy.length) gsap.fromTo(copy, { y: 0, opacity: 1 }, { y: -72, opacity: 0.1, ease: "none", scrollTrigger: { ...scroll, end: "bottom 15%" } });
        /* Background film: it pushes in slowly, a veil deepens and the frame recedes into an inset panel */
        const zoom = hero.querySelectorAll("[data-hero-zoom]");
        if (zoom.length) gsap.fromTo(zoom, { scale: 1 }, { scale: 1.14, ease: "none", scrollTrigger: scroll });
        const veil = hero.querySelectorAll("[data-hero-veil]");
        if (veil.length) gsap.fromTo(veil, { opacity: 0 }, { opacity: 0.7, ease: "none", scrollTrigger: scroll });
        hero.querySelectorAll<HTMLElement>("[data-hero-split]").forEach((line) => {
          const dir = line.dataset.heroSplit === "right" ? 1 : -1;
          gsap.fromTo(line, { x: 0 }, { x: () => dir * window.innerWidth * (desktop ? 0.07 : 0.04), ease: "none", scrollTrigger: { ...scroll, invalidateOnRefresh: true } });
        });
        const inset = hero.querySelectorAll("[data-hero-inset]");
        if (inset.length) gsap.fromTo(inset, { clipPath: "inset(0% 0% 0% 0%)" }, { clipPath: "inset(0% 3.5% 9% 3.5%)", ease: "none", scrollTrigger: scroll });
      }

      /* Progress rules that fill as their track scrolls through the viewport */
      $("[data-progress]").forEach((el) => {
        const axis = el.dataset.progress === "x" ? "scaleX" : "scaleY";
        gsap.fromTo(
          el,
          { [axis]: 0 },
          {
            [axis]: 1,
            ease: "none",
            transformOrigin: axis === "scaleX" ? "left center" : "center top",
            scrollTrigger: { trigger: el.closest("[data-progress-track]") ?? el.parentElement ?? el, start: "top 60%", end: "bottom 60%", scrub: true },
          },
        );
      });

      /* Counters */
      $("[data-count]").forEach((el) => {
        const target = Number.parseFloat(el.dataset.count ?? "");
        if (!Number.isFinite(target)) return;
        const decimals = Number.parseInt(el.dataset.decimals ?? "0", 10);
        const format = new Intl.NumberFormat("en-GB", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
        const state = { value: 0 };
        el.textContent = format.format(0);
        gsap.to(state, {
          value: target,
          duration: 1.8,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: PLAY_ONCE },
          onUpdate: () => {
            el.textContent = format.format(state.value);
          },
        });
      });

      return () => document.removeEventListener("focusin", onFocusIn);
    });

    /*
     * First load: set up at once (hidden states land before first paint). After a client
     * navigation, wait one frame so the outgoing route has been hidden and the new page laid out;
     * the frame runs before the next paint, so nothing flashes.
     */
    /*
     * Measure every trigger straight away. Until the first full refresh, triggers have no
     * start/end; a ScrollTrigger created later by a component (Approach progress, Heritage
     * timeline) would then refresh them one by one, and a passed `once` trigger killing itself
     * inside that loop crashes ScrollTrigger ("reading 'end'").
     */
    const run = () => {
      setup();
      ScrollTrigger.refresh();
    };
    /*
     * After a client navigation to a URL with a hash (e.g. a footer sector link), the refresh
     * above restores the pre-navigation scroll position and cancels the browser's smooth jump
     * to the target; land on the target directly once the page is set up.
     */
    const runAfterNavigation = () => {
      run();
      const id = decodeURIComponent(location.hash.slice(1));
      const target = id ? Array.from(document.querySelectorAll<HTMLElement>(`[id="${CSS.escape(id)}"]`)).find((el) => el.checkVisibility()) : undefined;
      if (!target) return;
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(target, { immediate: true, force: true });
      else target.scrollIntoView({ behavior: "instant", block: "start" });
    };
    let frame = 0;
    if (hasMounted) frame = requestAnimationFrame(runAfterNavigation);
    else run();
    hasMounted = true;

    // Fonts and images can shift layout after mount.
    const refresh = () => ScrollTrigger.refresh();
    void document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh, { once: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  });

  return null;
}
