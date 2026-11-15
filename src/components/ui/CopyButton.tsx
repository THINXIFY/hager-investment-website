"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

type Props = {
  /** Text placed on the clipboard. */
  value: string;
  /** Visible label, e.g. "Copy email". */
  label: string;
  /** Accessible name when the visible label is not specific enough. */
  ariaLabel?: string;
  className?: string;
};

async function writeClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    /* Fallback for browsers or contexts without the async clipboard API */
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.cssText = "position:fixed;top:0;left:0;opacity:0";
    document.body.append(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  }
}

/**
 * Copies a value with visible and announced feedback ("Copied" / "Copy failed").
 * The label swaps in place; a polite live region repeats it for screen readers.
 */
export function CopyButton({ value, label, ariaLabel, className }: Props) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    const ok = await writeClipboard(value);
    setState(ok ? "copied" : "failed");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2600);
  };

  const text = state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : label;

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={state === "idle" ? ariaLabel : undefined}
        data-state={state}
        className={cn(
          "group/copy inline-flex min-h-11 items-center gap-2.5 text-[0.8125rem] font-medium tracking-[0.04em] transition-colors duration-300",
          className,
        )}
      >
        <span aria-hidden="true" className="relative grid size-4 place-items-center">
          {state === "copied" ? (
            <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="m3 8.5 3.2 3L13 4.5" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" className="size-4 transition-transform duration-300 group-hover/copy:-translate-y-px" fill="none" stroke="currentColor" strokeWidth="1.3">
              <rect x="5.5" y="5.5" width="8" height="8" rx="0.5" />
              <path d="M10.5 5.5v-3h-8v8h3" />
            </svg>
          )}
        </span>
        <span>{text}</span>
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {state === "copied" ? `${value} copied to clipboard` : state === "failed" ? "Copy failed" : ""}
      </span>
    </>
  );
}
