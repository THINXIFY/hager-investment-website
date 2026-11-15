import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

import { Eyebrow } from "./Eyebrow";

type SectionHeaderProps = {
  /** Optional label prefix (homepage sections use none). */
  index?: string;
  eyebrow: string;
  title: ReactNode;
  titleId: string;
  /** Supporting paragraph shown beside (desktop) or below (mobile) the title. */
  intro?: ReactNode;
  /** Element aligned to the end of the title row (e.g. an "All articles" link). */
  aside?: ReactNode;
  titleStyle?: "section" | "statement";
  className?: string;
};

/**
 * Shared editorial header: eyebrow in the 3-column label rail,
 * title (and optional intro/aside) in the 9-column main area.
 */
export function SectionHeader({
  index,
  eyebrow,
  title,
  titleId,
  intro,
  aside,
  titleStyle = "section",
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("grid grid-cols-12 gap-x-col gap-y-6 mb-14 lg:mb-24", className)}>
      <Eyebrow index={index} className="col-span-12 lg:col-span-3 lg:pt-3" data-reveal="">
        {eyebrow}
      </Eyebrow>

      <div
        className={cn(
          "col-span-12 lg:col-span-9",
          Boolean(intro) && "grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-end lg:gap-x-[clamp(2rem,5vw,6rem)]",
          Boolean(aside) && "flex flex-wrap items-end justify-between gap-6",
        )}
      >
        <h2
          id={titleId}
          data-fill=""
          className={cn(titleStyle === "section" ? "text-section" : "text-statement max-w-[24ch]")}
        >
          {title}
        </h2>
        {intro ? (
          <div data-reveal="" className="text-lede max-w-[34rem] text-(--fg-muted)">
            {intro}
          </div>
        ) : null}
        {aside ? <div data-reveal="">{aside}</div> : null}
      </div>
    </div>
  );
}
