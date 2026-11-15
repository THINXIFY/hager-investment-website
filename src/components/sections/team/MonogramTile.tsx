"use client";

import { useRef, type PointerEvent } from "react";

import { cn } from "@/lib/cn";

/**
 * A portrait-format monogram tile (no photographs were supplied). A soft teal light follows the
 * pointer across the tile and the initials ease toward it; touch and reduced motion get a still tile.
 */
export function MonogramTile({ initials, label, className, large = false }: { initials: string; label: string; className?: string; large?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
    ref.current.style.setProperty("--my", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
  };
  const onLeave = () => {
    ref.current?.style.removeProperty("--mx");
    ref.current?.style.removeProperty("--my");
  };
  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} aria-hidden="true" className={cn("tm-tile relative isolate overflow-hidden text-white", className)}>
      <span className="tm-tile-grid absolute inset-0" />
      <span className="tm-tile-light absolute inset-0" />
      <span className={cn("tm-tile-initials absolute inset-0 grid place-items-center font-display tracking-[-0.06em]", large ? "text-[clamp(5rem,3rem+7vw,9.5rem)]" : "text-[clamp(4rem,2.5rem+5vw,7rem)]")}>
        {initials}
      </span>
      <span className="absolute inset-x-5 bottom-5 flex items-center justify-between text-[0.625rem] tracking-[0.22em] text-white/55 uppercase">
        <span className="flex items-center gap-2.5">
          <span className="h-px w-6 bg-teal" />
          {label}
        </span>
        <span>HAGER</span>
      </span>
    </div>
  );
}
