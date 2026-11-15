"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

/** Small, restrained copy-to-clipboard control for registry identifiers. */
export function CopyValue({ value, label, dark = false }: { value: string; label: string; dark?: boolean }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Clipboard unavailable (permissions or insecure context): the value remains selectable text.
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${label}`}
        className={cn(
          "inline-flex h-9 items-center gap-2 border px-3 text-[0.6875rem] font-medium tracking-[0.14em] uppercase transition-colors duration-300",
          copied ? "border-teal bg-teal text-white" : dark ? "border-white/30 text-white hover:border-white" : "border-petrol/25 text-petrol hover:border-teal hover:text-teal",
        )}
      >
        <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5 fill-none stroke-current [stroke-width:1.25]">
          {copied ? <path d="M3 8.5l3 3 7-7" /> : <path d="M5.5 5.5V3h7.5v7.5h-2.5M3 5.5h7.5V13H3z" />}
        </svg>
        {copied ? "Copied" : "Copy"}
      </button>
      <span role="status" className="sr-only">
        {copied ? `${label} copied` : ""}
      </span>
    </>
  );
}
