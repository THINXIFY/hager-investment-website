"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  src: string;
  poster: string;
  /** Rendered above the film's shading and below the scroll veil (e.g. the interactive mesh). */
  overlay?: ReactNode;
};

type NetworkInfo = { saveData?: boolean; effectiveType?: string };

/**
 * Decorative background film for the About hero: muted, looping, inline, hidden from
 * assistive technology. The poster paints first; the film only loads when motion is welcome
 * (no reduced-motion preference) and the connection allows it (no Save-Data, not 2G). It pauses
 * while the hero is off screen, and a visible control pauses or plays it at any time
 * (WCAG 2.2.2, moving content longer than five seconds).
 */
export function HeroFilm({ src, poster, overlay }: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const progress = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);

  /* Decide once on mount whether to load the film automatically */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const net = (navigator as Navigator & { connection?: NetworkInfo }).connection;
    const constrained = !!net?.saveData || /(^|-)2g$/.test(net?.effectiveType ?? "");
    if (reduce || constrained) {
      userPaused.current = true;
      return;
    }
    const id = requestAnimationFrame(() => setEnabled(true));
    return () => cancelAnimationFrame(id);
  }, []);

  /* Play while the hero is visible (unless the visitor paused it); pause when it scrolls away */
  useEffect(() => {
    const v = video.current;
    if (!v || !enabled) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && !userPaused.current) v.play().catch(() => setPlaying(false));
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, [enabled]);

  /* A fine progress line tracks the film; written directly to the DOM each frame */
  useEffect(() => {
    const v = video.current;
    const bar = progress.current;
    if (!v || !bar || !enabled) return;
    let raf = 0;
    const tick = () => {
      if (v.duration) bar.style.transform = `scaleX(${v.currentTime / v.duration})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled]);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (!enabled) setEnabled(true);
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => setPlaying(false));
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  return (
    <>
      {/* Film layer. Scroll-out (ScrollAnimations): the frame recedes into an inset panel,
          the film drifts and pushes in, and an Obsidian veil deepens. */}
      <div data-hero-inset="" className="absolute inset-0 overflow-hidden">
        <div data-hero-drift="" className="absolute inset-x-0 -top-[8%] -bottom-[8%]">
          <div data-hero-zoom="" className="absolute inset-0">
            <video
              ref={video}
              aria-hidden="true"
              tabIndex={-1}
              className="about-hero-film-media absolute inset-0 size-full object-cover object-[50%_40%]"
              poster={poster}
              src={enabled ? src : undefined}
              muted
              loop
              playsInline
              preload={enabled ? "auto" : "none"}
              disablePictureInPicture
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            />
          </div>
        </div>
        {/* Restrained shading only where type and navigation meet the film */}
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[28%] bg-[linear-gradient(to_bottom,rgb(9_11_13/0.55),rgb(9_11_13/0))]" />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgb(9_11_13/0.9)_0%,rgb(9_11_13/0.45)_38%,rgb(9_11_13/0)_70%)] lg:bg-[linear-gradient(90deg,rgb(9_11_13/0.78)_0%,rgb(9_11_13/0.38)_42%,rgb(9_11_13/0)_70%)]" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 hidden h-[60%] bg-[linear-gradient(to_top,rgb(9_11_13/0.7),rgb(9_11_13/0.25)_60%,rgb(9_11_13/0))] lg:block" />
        {overlay}
        <div data-hero-veil="" aria-hidden="true" className="absolute inset-0 bg-obsidian opacity-0" />
        {/* Cinematic opening: letterbox bars part on load */}
        <span aria-hidden="true" className="about-letterbox-top absolute inset-x-0 top-0 h-1/2 bg-obsidian" />
        <span aria-hidden="true" className="about-letterbox-bottom absolute inset-x-0 bottom-0 h-1/2 bg-obsidian" />
        {/* Film progress */}
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-white/15">
          <span ref={progress} className="absolute inset-0 block origin-left scale-x-0 bg-teal" />
        </span>
      </div>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause background video" : "Play background video"}
        className="group absolute right-(--spacing-gutter) bottom-[clamp(1.25rem,3vw,2rem)] z-20 inline-flex size-11 items-center justify-center rounded-full border border-white/30 bg-obsidian/30 text-white backdrop-blur-sm transition-colors duration-300 hover:border-white/70 hover:bg-obsidian/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {playing ? (
          <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5" fill="currentColor">
            <rect x="3.5" y="2.5" width="3" height="11" rx="0.5" />
            <rect x="9.5" y="2.5" width="3" height="11" rx="0.5" />
          </svg>
        ) : (
          <svg aria-hidden="true" viewBox="0 0 16 16" className="ml-0.5 size-3.5" fill="currentColor">
            <path d="M4.5 2.6v10.8a.6.6 0 0 0 .9.5l8.6-5.4a.6.6 0 0 0 0-1L5.4 2.1a.6.6 0 0 0-.9.5Z" />
          </svg>
        )}
      </button>
    </>
  );
}
