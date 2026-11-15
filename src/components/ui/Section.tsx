import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

/**
 * Section tones (BRAND-03). Light: white (editorial), porcelain (warm), platinum (cool feature).
 * Dark: petrol (institutional), obsidian (dramatic). Each sets the semantic tokens in globals.css.
 */
export type Tone = "white" | "porcelain" | "platinum" | "petrol" | "obsidian";

const toneClass: Record<Tone, string> = {
  white: "tone-white",
  porcelain: "tone-porcelain",
  platinum: "tone-platinum",
  petrol: "tone-petrol",
  obsidian: "tone-obsidian",
};

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tone?: Tone;
  /** Standard vertical rhythm. Disable for bespoke bands. */
  spaced?: boolean;
};

/** Page section with a light/dark tone scope (sets --bg, --fg, --line, --accent…). */
export function Section({ tone = "white", spaced = true, className, ...props }: SectionProps) {
  return (
    <section
      data-tone={tone}
      className={cn(toneClass[tone], spaced && "section-y", "relative", className)}
      {...props}
    />
  );
}
