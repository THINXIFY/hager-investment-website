import type { ElementType, ReactNode } from "react";

import { CopyText } from "@/components/ui/Placeholder";
import type { Copy } from "@/lib/content";
import { cn } from "@/lib/cn";

type TwoPartTitleProps = {
  lead: ReactNode;
  emphasis: ReactNode;
  as?: ElementType;
  id?: string;
  className?: string;
  /** Put the emphasised sentence on its own line. */
  stacked?: boolean;
  emphasisClassName?: string;
};

/** Editorial headline: a plain lead sentence followed by an italic emphasis. */
export function TwoPartTitle({
  lead,
  emphasis,
  as: Tag = "h2",
  id,
  className,
  stacked = true,
  emphasisClassName,
}: TwoPartTitleProps) {
  return (
    <Tag id={id} className={className}>
      {lead}
      {stacked ? <br /> : " "}
      <em className={cn("italic", emphasisClassName)}>{emphasis}</em>
    </Tag>
  );
}

/** Review-mode note for proposed content (renders nothing on the public site). */
export function ReviewNote({ value, className }: { value: Copy; className?: string }) {
  return (
    <p className={cn("review-only text-sm", className)}>
      <CopyText value={value} block />
    </p>
  );
}
