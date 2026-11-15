import type { SVGProps } from "react";

import { cn } from "@/lib/cn";

type IconProps = SVGProps<SVGSVGElement>;

const base = "size-[1.125em] shrink-0 fill-none stroke-current [stroke-linecap:square] [stroke-width:1.5]";

export function ArrowRightIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false" className={cn(base, className)} {...props}>
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}

export function ArrowLeftIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false" className={cn(base, className)} {...props}>
      <path d="M16 10H4M9 5l-5 5 5 5" />
    </svg>
  );
}

export function PauseIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false" className={cn(base, className)} {...props}>
      <path d="M7 5v10M13 5v10" />
    </svg>
  );
}

export function PlayIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false" className={cn(base, className)} {...props}>
      <path d="M7 4.5v11l8.5-5.5z" className="[stroke-linecap:round] [stroke-linejoin:round]" />
    </svg>
  );
}
