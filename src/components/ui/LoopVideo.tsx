"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

type NetworkInfo = { saveData?: boolean };

/**
 * A muted, looping ambient video (decorative). The poster paints first; the film fades in once it
 * can play. It plays only while on screen, never autoplays with reduced motion or Data Saver
 * (the poster stays), and always offers a visible pause/play control (WCAG 2.2.2).
 */
export function LoopVideo({
  id,
  src,
  poster,
  className,
  videoClassName,
  controlClassName,
  label = "background video",
  inlineControl = true,
}: {
  /** Pairs the film with an external <VideoToggle id>. */
  id?: string;
  /** Render the pause/play button here (false when a VideoToggle is placed elsewhere). */
  inlineControl?: boolean;
  src: string;
  poster: string;
  className?: string;
  videoClassName?: string;
  controlClassName?: string;
  /** Used in the control's accessible name, e.g. "Pause background video". */
  label?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  // Decide once on the client whether the film may load at all.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: NetworkInfo }).connection?.saveData;
    if (reduced || saveData) return;
    const id = requestAnimationFrame(() => setEnabled(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Play only while visible.
  useEffect(() => {
    const v = video.current;
    const el = wrap.current;
    if (!enabled || !v || !el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting && !userPaused.current) v.play().catch(() => setPlaying(false));
      else v.pause();
    }, { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, [enabled]);

  const toggle = useCallback(() => {
    // Not loaded yet (reduced motion / Data Saver): an explicit Play loads and starts the film.
    if (!enabled) {
      userPaused.current = false;
      setEnabled(true);
      return;
    }
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => setPlaying(false));
    } else {
      userPaused.current = true;
      v.pause();
    }
  }, [enabled]);

  // External control (VideoToggle) and state broadcast.
  useEffect(() => {
    if (!id) return;
    window.addEventListener(`loopvideo:toggle:${id}`, toggle);
    return () => window.removeEventListener(`loopvideo:toggle:${id}`, toggle);
  }, [id, toggle]);
  useEffect(() => {
    if (id) window.dispatchEvent(new CustomEvent(`loopvideo:state:${id}`, { detail: playing }));
  }, [id, playing]);

  return (
    <>
      <div ref={wrap} className={cn("absolute inset-0 overflow-hidden", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element -- static poster for an ambient video */}
        <img src={poster} alt="" aria-hidden="true" decoding="async" className={cn("absolute inset-0 size-full object-cover", videoClassName)} />
        {enabled ? (
          <video
            ref={video}
            src={src}
            poster={poster}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            aria-hidden="true"
            onCanPlay={() => setReady(true)}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            className={cn("loop-video absolute inset-0 size-full object-cover", ready ? "opacity-100" : "opacity-0", videoClassName)}
          />
        ) : null}
      </div>
      {inlineControl ? (
      <button
        type="button"
        onClick={toggle}
        aria-label={`${playing ? "Pause" : "Play"} ${label}`}
        aria-pressed={!playing}
        className={cn(
          "absolute z-20 inline-flex size-11 items-center justify-center rounded-full border border-white/30 bg-obsidian/30 text-white backdrop-blur-sm transition-colors duration-300 hover:border-white/70 hover:bg-obsidian/55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
          controlClassName,
        )}
      >
        {playing ? (
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
    </>
  );
}

/** A pause/play control for a LoopVideo rendered elsewhere (e.g. above a behind-content film). */
export function VideoToggle({ id, label = "background video", className }: { id: string; label?: string; className?: string }) {
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const on = (e: Event) => setPlaying(Boolean((e as CustomEvent<boolean>).detail));
    window.addEventListener(`loopvideo:state:${id}`, on);
    return () => window.removeEventListener(`loopvideo:state:${id}`, on);
  }, [id]);
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(`loopvideo:toggle:${id}`))}
      aria-label={`${playing ? "Pause" : "Play"} ${label}`}
      aria-pressed={!playing}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-full border border-white/30 bg-obsidian/30 text-white backdrop-blur-sm transition-colors duration-300 hover:border-white/70 hover:bg-obsidian/55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        className,
      )}
    >
      {playing ? (
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
  );
}
