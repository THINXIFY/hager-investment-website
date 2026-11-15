import type Lenis from "lenis";

/** The active Lenis instance (null when smooth scrolling is off, e.g. reduced motion). */
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;
