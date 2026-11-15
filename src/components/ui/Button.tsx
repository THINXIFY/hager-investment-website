import { SiteLink as Link } from "@/components/ui/SiteLink";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/cn";

import { ArrowRightIcon } from "./Icons";

export type ButtonVariant = "light" | "dark" | "outline";
export type ButtonSize = "md" | "sm";

/**
 * One button language across the site. With `arrow`, buttons carry the
 * signature inset circle whose arrow turns on hover (matching the hero CTA).
 */
const variants: Record<ButtonVariant, { base: string; circle: string }> = {
  /** On dark tones: white button, teal signature circle. */
  light: {
    base: "border-transparent bg-white text-obsidian hover:bg-porcelain",
    circle: "bg-teal text-white group-hover/btn:bg-petrol",
  },
  /** On light tones: Imperial Petrol, deepening to Obsidian; teal signature circle. */
  dark: {
    base: "border-transparent bg-petrol text-white hover:bg-obsidian",
    circle: "bg-teal text-white group-hover/btn:bg-white group-hover/btn:text-obsidian",
  },
  /** Inherits the current text colour: works on light and dark tones. */
  outline: {
    base: "border-current/30 text-current hover:border-current",
    circle: "border border-current/40 group-hover/btn:bg-current/10",
  },
};

const sizes: Record<ButtonSize, { plain: string; arrow: string }> = {
  md: { plain: "min-h-13 px-7 py-3.5 text-[0.9375rem]", arrow: "min-h-13 py-1.5 pr-1.5 pl-7 text-[0.9375rem]" },
  sm: { plain: "min-h-10 px-4.5 py-2 text-[0.8125rem]", arrow: "min-h-10 py-1 pr-1 pl-4.5 text-[0.8125rem]" },
};

export function buttonClasses(
  variant: ButtonVariant = "dark",
  size: ButtonSize = "md",
  className?: string,
  arrow = false,
) {
  return cn(
    "group/btn inline-flex max-w-full items-center justify-between gap-5 text-left border sm:gap-8 sm:whitespace-nowrap font-medium leading-tight tracking-[0.02em]",
    "transition-[background-color,color,border-color] duration-500 ease-premium",
    variants[variant].base,
    arrow ? sizes[size].arrow : sizes[size].plain,
    className,
  );
}

type Common = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Show the signature circular arrow. */
  arrow?: boolean;
  children: ReactNode;
};

function Inner({ children, arrow, variant = "dark", size = "md" }: { children: ReactNode; arrow?: boolean; variant?: ButtonVariant; size?: ButtonSize }) {
  return (
    <>
      <span>{children}</span>
      {arrow ? (
        <span
          aria-hidden="true"
          className={cn(
            "grid shrink-0 place-items-center rounded-full transition-colors duration-500 ease-premium",
            size === "md" ? "size-10" : "size-8",
            variants[variant].circle,
          )}
        >
          <ArrowRightIcon className="transition-transform duration-500 ease-premium group-hover/btn:-rotate-45" />
        </span>
      ) : null}
    </>
  );
}

export function ButtonLink({
  variant,
  size,
  arrow = false,
  className,
  children,
  ...props
}: Common & Omit<ComponentPropsWithoutRef<typeof Link>, "children">) {
  return (
    <Link className={buttonClasses(variant, size, className, arrow)} {...props}>
      <Inner arrow={arrow} variant={variant} size={size}>
        {children}
      </Inner>
    </Link>
  );
}

export function Button({
  variant,
  size,
  arrow = false,
  className,
  children,
  type = "button",
  ...props
}: Common & Omit<ComponentPropsWithoutRef<"button">, "children">) {
  return (
    <button type={type} className={buttonClasses(variant, size, className, arrow)} {...props}>
      <Inner arrow={arrow} variant={variant} size={size}>
        {children}
      </Inner>
    </button>
  );
}

/** Text link with an underline rule and sliding arrow. */
export function ArrowLink({
  className,
  children,
  ...props
}: { children: ReactNode } & Omit<ComponentPropsWithoutRef<typeof Link>, "children">) {
  return (
    <Link
      className={cn(
        "group/link inline-flex items-center gap-3 border-b border-(--line) pb-1.5 text-[0.9375rem] font-medium tracking-[0.02em]",
        "transition-colors duration-300 hover:border-(--accent) hover:text-(--accent)",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      <ArrowRightIcon className="transition-transform duration-450 ease-premium group-hover/link:translate-x-1" />
    </Link>
  );
}
