import Image from "next/image";

import logoDark from "@/assets/brand/hager-logo-dark.png";
import logoLight from "@/assets/brand/hager-logo-light.png";
import { SiteLink as Link } from "@/components/ui/SiteLink";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

type WordmarkProps = {
  /** "light" = Platinum lettering for dark backgrounds (default); "dark" = Obsidian lettering for light backgrounds. */
  variant?: "light" | "dark";
  className?: string;
  label?: string;
};

/**
 * The official HAGER INVESTMENT logo (supplied artwork, trimmed and optimised; original
 * proportions preserved; ~30 KB, served as-is so it stays exact and sharp at any pixel density).
 * Height is set by CSS; width follows the logo's aspect ratio.
 */
export function Wordmark({ variant = "light", className, label = `${siteConfig.name}, home` }: WordmarkProps) {
  const src = variant === "light" ? logoLight : logoDark;
  return (
    <Link href="/" aria-label={label} className={cn("inline-flex shrink-0 items-center leading-none", className)}>
      <Image src={src} alt="HAGER INVESTMENT" priority unoptimized className="h-[18px] w-auto lg:h-[22px]" />
    </Link>
  );
}
