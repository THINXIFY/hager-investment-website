import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/cn";

type ContainerProps<T extends ElementType> = {
  as?: T;
  /** Applies the 12-column grid used across the site. */
  grid?: boolean;
} & ComponentPropsWithoutRef<T>;

export function Container<T extends ElementType = "div">({
  as,
  grid = false,
  className,
  ...props
}: ContainerProps<T>) {
  const Tag: ElementType = as ?? "div";
  return (
    <Tag
      className={cn("container-site", grid && "grid grid-cols-12 gap-x-col", className)}
      {...props}
    />
  );
}
