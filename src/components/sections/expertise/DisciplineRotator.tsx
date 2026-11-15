"use client";

import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * A single line that cycles through the six disciplines (decorative; the full list is in the
 * sector bar and the directory). Pauses under reduced motion and while the page is hidden.
 */
export function DisciplineRotator({ names }: { names: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setI((n) => (n + 1) % names.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, [names.length]);

  return (
    <MotionConfig reducedMotion="user">
      <span aria-hidden="true" className="relative inline-flex h-[1.4em] min-w-[16ch] overflow-hidden align-bottom">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={names[i]}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.7, 0.1, 1] }}
            className="absolute inset-x-0 top-0 whitespace-nowrap text-white"
          >
            {names[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </MotionConfig>
  );
}
