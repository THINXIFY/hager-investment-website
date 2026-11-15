import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type EyebrowProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  /** Optional prefix rendered as an italic serif index. Omit for a fine rule instead. */
  index?: string;
  as?: "p" | "span" | "div";
};

/** Section label: a fine hairline (or optional index) followed by small caps. */
export function Eyebrow({ children, index, className, as: Tag = "p", ...props }: EyebrowProps) {
  return (
    <Tag className={cn("text-eyebrow flex items-center gap-3.5 text-(--fg-muted)", className)} {...props}>
      {index ? (
        <span className="font-display text-[0.9375rem] font-normal italic tracking-normal normal-case text-(--accent)">
          {index}
        </span>
      ) : (
        <span aria-hidden="true" className="h-px w-7 shrink-0 bg-(--accent-ui,currentColor)" />
      )}
      <span>{children}</span>
    </Tag>
  );
}
