import { ArrowRightIcon } from "@/components/ui/Icons";
import { Photo } from "@/components/ui/Photo";
import { SiteLink as Link } from "@/components/ui/SiteLink";
import type { Service } from "@/content/home";
import { cn } from "@/lib/cn";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Placement in the asymmetric mosaic, by position in the content list.
 * lg: 12 columns x 4 rows (two large photo panels, four supporting panels).
 * md: 2 columns. base: one column, deliberately re-ordered for rhythm.
 */
const LAYOUT = [
  // 0 Investment Strategy: large photo, top-left, two rows
  { size: "large", cls: "order-1 md:col-span-2 lg:col-span-7 lg:col-start-1 lg:row-span-2 lg:row-start-1", media: "aspect-[4/5] md:aspect-[16/10] lg:aspect-auto" },
  // 1 Asset Management: small photo, top-right
  { size: "small", cls: "order-3 lg:col-span-5 lg:col-start-8 lg:row-start-1", media: "aspect-[16/11] md:aspect-auto md:min-h-[22rem] lg:min-h-0" },
  // 2 Mergers & Acquisitions: black, right
  { size: "small", cls: "order-2 lg:col-span-5 lg:col-start-8 lg:row-start-2", media: "min-h-[17rem] md:min-h-[22rem] lg:min-h-0" },
  // 3 Corporate Advisory: off-white, lower-left
  { size: "small", cls: "order-4 lg:col-span-5 lg:col-start-1 lg:row-start-3", media: "min-h-[17rem] md:min-h-[22rem] lg:min-h-0" },
  // 4 Private Equity: black, lower-left
  { size: "small", cls: "order-6 lg:col-span-5 lg:col-start-1 lg:row-start-4", media: "min-h-[17rem] md:min-h-[22rem] lg:min-h-0" },
  // 5 Real Estate Investment: large photo, lower-right, two rows
  { size: "large", cls: "order-5 md:col-span-2 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-3", media: "aspect-[4/5] md:aspect-[16/10] lg:aspect-auto" },
] as const;

function DirectionIcon({ tone }: { tone: "light" | "dark" }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-full border transition-[background-color,border-color,color] duration-500 ease-premium",
        tone === "light"
          ? "border-silver/50 text-white group-hover:border-teal group-hover:bg-teal group-hover:text-white group-focus-visible:border-teal group-focus-visible:bg-teal"
          : "border-petrol/25 text-petrol group-hover:border-teal group-hover:bg-teal group-hover:text-white group-focus-visible:border-teal group-focus-visible:bg-teal group-focus-visible:text-white",
      )}
    >
      <ArrowRightIcon className="transition-transform duration-500 ease-premium group-hover:-rotate-45 group-focus-visible:-rotate-45" />
    </span>
  );
}

function Panel({ item, index }: { item: Service; index: number }) {
  const layout = LAYOUT[index] ?? LAYOUT[1];
  const large = layout.size === "large";
  const isPhoto = item.surface === "photo" && item.image;
  const dark = item.surface !== "paper";

  const title = (
    <h3
      className={cn(
        "font-display font-normal tracking-[-0.03em] transition-transform duration-700 ease-premium group-hover:translate-x-1",
        large ? "text-[clamp(1.875rem,1.25rem+1.9vw,3.125rem)] leading-[1.04]" : "text-[clamp(1.5rem,1.15rem+1vw,2.125rem)] leading-[1.1]",
      )}
    >
      {item.name}
    </h3>
  );

  return (
    <li data-mosaic="" className={cn("relative", layout.cls)}>
      <Link
        href={`/expertise/${item.slug}`}
        aria-label={`${item.name}: ${item.body}`}
        className={cn(
          "group relative isolate flex h-full flex-col justify-between overflow-hidden p-[clamp(1.5rem,2.4vw,2.5rem)]",
          "focus-visible:outline-2 focus-visible:-outline-offset-4",
          layout.media,
          item.surface === "paper" && "bg-porcelain text-obsidian focus-visible:outline-white",
          item.surface === "ink" && "bg-obsidian text-white focus-visible:outline-white",
          isPhoto && "bg-obsidian text-white focus-visible:outline-white",
        )}
      >
        {/* Photographic surface: natural image, subtle drift on hover, black shading for legibility */}
        {isPhoto && item.image ? (
          <>
            <Photo
              src={item.image.src}
              alt=""
              sizes={large ? "(min-width: 1024px) 56vw, 100vw" : "(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"}
              quality={85}
              parallax
              className="absolute! inset-0 -z-10"
              imageClassName="transition-transform duration-[1800ms] ease-premium group-hover:scale-[1.06] group-focus-visible:scale-[1.06]"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(9_11_13/0.82)_0%,rgb(9_11_13/0.35)_45%,rgb(9_11_13/0.05)_72%,rgb(9_11_13/0.32)_100%)] transition-opacity duration-700 group-hover:opacity-90"
            />
          </>
        ) : null}

        {/* Black surface: restrained geometry */}
        {item.surface === "ink" ? (
          <svg
            aria-hidden="true"
            viewBox="0 0 200 200"
            fill="none"
            className="absolute -right-16 -bottom-16 -z-10 w-64 text-white opacity-[0.09] transition-transform duration-[1400ms] ease-premium group-hover:-translate-x-3 group-hover:-translate-y-3"
          >
            <circle cx="100" cy="100" r="99" stroke="currentColor" />
            <circle cx="100" cy="100" r="66" stroke="currentColor" />
          </svg>
        ) : null}

        {/* Off-white surface: fine corner marks */}
        {item.surface === "paper" ? (
          <span aria-hidden="true" className="absolute top-0 right-0 -z-10 h-16 w-16 border-t border-r border-teal/60 transition-[width,height] duration-700 ease-premium group-hover:h-24 group-hover:w-24" />
        ) : null}

        {/* Top row: index + directional icon */}
        <div data-mosaic-copy="" className="flex items-start justify-between gap-6">
          <span className={cn("text-xs font-medium tracking-[0.14em] tabular-nums", dark ? "text-white/70" : "text-petrol/75")}>
            {pad(index + 1)}
          </span>
          <DirectionIcon tone={dark ? "light" : "dark"} />
        </div>

        {/* Bottom: title + description */}
        <div data-mosaic-copy="" className="mt-10">
          <span
            aria-hidden="true"
            className={cn(
              "mb-5 block h-px w-10 origin-left transition-transform duration-700 ease-premium group-hover:scale-x-[2.2]",
              dark ? "bg-silver" : "bg-teal",
            )}
          />
          {title}
          {isPhoto ? (
            // Photo panels: description revealed on hover/focus (desktop); always shown on touch layouts
            <div className="grid grid-rows-[1fr] transition-[grid-template-rows,opacity] duration-700 ease-premium lg:grid-rows-[0fr] lg:opacity-0 lg:group-hover:grid-rows-[1fr] lg:group-hover:opacity-100 lg:group-focus-visible:grid-rows-[1fr] lg:group-focus-visible:opacity-100">
              <div className="overflow-hidden">
                <p className={cn("mt-4 text-white/80", large ? "max-w-[30rem] text-lede" : "max-w-[24rem]")}>{item.body}</p>
              </div>
            </div>
          ) : (
            <p className={cn("mt-4 max-w-[24rem]", dark ? "text-white/72" : "text-obsidian/65")}>{item.body}</p>
          )}
        </div>
      </Link>
    </li>
  );
}

/** Asymmetric architectural mosaic: all six services visible at once (server-rendered; CSS interactions). */
export function ExpertiseMosaic({ items }: { items: Service[] }) {
  return (
    <ul className="mosaic grid grid-cols-1 gap-px bg-white/15 md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[clamp(15rem,18.5vw,18.5rem)]">
      {items.map((item, i) => (
        <Panel key={item.slug} item={item} index={i} />
      ))}
    </ul>
  );
}
