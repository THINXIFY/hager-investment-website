"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

type Item = { id: string; title: string; n: string };

/**
 * Sticky desktop contents for a legal document. The section currently being read is
 * highlighted (aria-current="location") by tracking which section heading most recently
 * crossed the upper third of the viewport. Links are plain in-page anchors, so they work
 * without JavaScript and with the site's smooth-scroll anchor handling.
 */
export function LegalToc({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter((s): s is HTMLElement => !!s && s.checkVisibility());
    if (!sections.length) return;
    const update = () => {
      const line = window.innerHeight * 0.32;
      let current = sections[0]!.id;
      for (const s of sections) if (s.getBoundingClientRect().top <= line) current = s.id;
      /* At the very end of the page, the last section is the one being read */
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = sections[sections.length - 1]!.id;
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  return (
    <nav aria-label="Contents">
      <p className="text-eyebrow mb-5 text-petrol/70">Contents</p>
      <ol className="border-l border-silver/70">
        {items.map((t) => {
          const on = t.id === active;
          return (
            <li key={t.id}>
              <a
                href={`#${t.id}`}
                aria-current={on ? "location" : undefined}
                className={cn(
                  "relative -ml-px flex gap-3.5 border-l py-2 pl-5 text-[0.875rem] leading-[1.4] transition-colors duration-300",
                  on ? "border-teal text-petrol" : "border-transparent text-obsidian/60 hover:text-petrol",
                )}
              >
                <span className={cn("w-5 shrink-0 text-[0.75rem] tabular-nums", on ? "text-teal" : "text-obsidian/40")}>{t.n}</span>
                {t.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
