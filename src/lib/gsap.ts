"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// Register once, client-side only.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  gsap.defaults({ ease: "power3.out", duration: 1 });
}

/** Shared easing vocabulary, mirrored in CSS as --ease-premium / --ease-in-out-premium. */
export const EASE = {
  out: "expo.out",
  soft: "power3.out",
  inOut: "power2.inOut",
} as const;

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
export const MOTION_OK_QUERY = "(prefers-reduced-motion: no-preference)";

export const DESKTOP_QUERY = "(min-width: 1024px)";

export { gsap, ScrollTrigger, SplitText, useGSAP };
