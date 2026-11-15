import Image, { type StaticImageData } from "next/image";

import { cn } from "@/lib/cn";

type PhotoProps = {
  src: StaticImageData;
  /** Empty string for decorative images. */
  alt?: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  preload?: boolean;
  /** Oversizes the image and lets ScrollAnimations drift it on scroll. */
  parallax?: boolean;
  quality?: 75 | 85;
  /** CSS object-position for the crop, e.g. "40% 50%". */
  objectPosition?: string;
};

/**
 * Brand photography: natural colour with one shared subtle grade (see .photo-img),
 * blur-up placeholder, responsive sizes. No tints or duotone effects.
 */
export function Photo({
  src,
  alt = "",
  sizes,
  className,
  imageClassName,
  preload = false,
  parallax = false,
  quality = 75,
  objectPosition,
}: PhotoProps) {
  return (
    <div className={cn("photo", className)}>
      <div
        className={cn("absolute inset-x-0", parallax ? "-inset-y-[9%]" : "inset-y-0")}
        {...(parallax ? { "data-parallax": "" } : {})}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={quality}
          placeholder="blur"
          preload={preload}
          className={cn("photo-img object-cover", imageClassName)}
          style={objectPosition ? { objectPosition } : undefined}
        />
      </div>
    </div>
  );
}
