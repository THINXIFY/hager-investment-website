"use client";

import { useEffect, useId, useMemo, useState } from "react";

import { Photo } from "@/components/ui/Photo";
import { CATEGORIES, SAMPLE_LABEL, type Article, type Category } from "@/content/insights";
import { cn } from "@/lib/cn";

const slugOf = (c: string) => c.toLowerCase().replace(/\s+/g, "-");
type Filter = "All" | Category;

function Meta({ a }: { a: Article }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-eyebrow">
      <span className="text-teal">{a.category}</span>
      <span aria-hidden="true" className="h-3 w-px bg-(--line)" />
      <span className="text-(--fg-subtle)">{SAMPLE_LABEL}</span>
    </p>
  );
}

/**
 * The directory: topic filters + keyword search over the sample perspectives. Results are
 * set like a magazine page (a lead story, then a three-column run with dividers). Every
 * preview shows its full summary; there are no article links until articles exist.
 */
export function InDirectory({ articles }: { articles: Article[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");
  const searchId = useId();

  /* Topic links in the masthead (#topic-energy …) open the directory pre-filtered. */
  useEffect(() => {
    const fromHash = () => {
      const m = decodeURIComponent(location.hash).match(/^#topic-(.+)$/);
      const c = m && CATEGORIES.find((x) => slugOf(x) === m[1]);
      if (c) {
        setFilter(c);
        setQuery("");
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => (filter === "All" || a.category === filter) && (!q || `${a.title} ${a.excerpt} ${a.category}`.toLowerCase().includes(q)));
  }, [articles, filter, query]);

  const [lead, ...rest] = results;
  const filters: Filter[] = ["All", ...CATEGORIES];

  return (
    <div>
      {/* Topic anchors for the masthead index */}
      {CATEGORIES.map((c) => (
        <span key={c} id={`topic-${slugOf(c)}`} aria-hidden="true" className="block h-0 w-0" />
      ))}

      {/* Controls */}
      <div className="flex flex-col gap-6 border-y border-(--line) py-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const on = filter === f;
            const count = f === "All" ? articles.length : articles.filter((a) => a.category === f).length;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(f)}
                className={cn(
                  "inline-flex items-center gap-2 border px-4 py-2 text-sm transition-colors duration-300",
                  on ? "border-petrol bg-petrol text-white" : "border-(--line) bg-white text-obsidian/75 hover:border-petrol/50 hover:text-obsidian",
                )}
              >
                {f}
                <span className={cn("text-[0.6875rem] tabular-nums", on ? "text-silver" : "text-obsidian/45")}>{count}</span>
              </button>
            );
          })}
        </div>
        <div className="relative w-full lg:w-[19rem]">
          <label htmlFor={searchId} className="sr-only">
            Search perspectives
          </label>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search perspectives"
            className="w-full border-b border-(--line) bg-transparent py-2.5 pr-8 text-base text-obsidian lg:text-[0.9375rem] placeholder:text-obsidian/50 focus:border-teal focus:outline-none"
          />
          <svg aria-hidden="true" viewBox="0 0 24 24" className="pointer-events-none absolute top-1/2 right-1 size-4 -translate-y-1/2 text-obsidian/50" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4.5 4.5" />
          </svg>
        </div>
      </div>

      <p role="status" className="sr-only">
        {results.length === 1 ? "1 perspective shown" : `${results.length} perspectives shown`}
      </p>

      {lead ? (
        <>
          {/* Lead story */}
          <article id={lead.id} aria-labelledby={`${lead.id}-t`} className="group grid grid-cols-12 items-center gap-x-col gap-y-6 border-b border-(--line) py-[clamp(2.25rem,4vw,3.5rem)]">
            <div className="col-span-12 md:col-span-6 lg:col-span-7">
              <Photo src={lead.image.src} alt={lead.image.alt} sizes="(min-width: 1024px) 56vw, (min-width: 768px) 48vw, 100vw" quality={85} className="aspect-[16/10]" imageClassName="transition-transform duration-[1400ms] ease-premium group-hover:scale-[1.035]" />
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-5">
              <Meta a={lead} />
              <h3 id={`${lead.id}-t`} className="mt-5 font-display text-[clamp(1.75rem,1.25rem+1.6vw,2.75rem)] leading-[1.06] tracking-[-0.035em] text-obsidian">
                {lead.title}
              </h3>
              <p className="mt-5 max-w-[30rem] text-(--fg-muted)">{lead.excerpt}</p>
            </div>
          </article>

          {/* The run */}
          {rest.length ? (
            <ul className="grid md:grid-cols-2 lg:grid-cols-6">
              {rest.map((a, i) => {
                /* Desktop rows of three; an incomplete last row is set as two halves so no cell sits empty. */
                const tail = rest.length % 3;
                const half = rest.length > 1 && ((tail === 2 && i >= rest.length - 2) || (tail === 1 && i >= rest.length - 4));
                const fullRows = tail === 1 ? rest.length - 4 : rest.length - tail;
                /* Tablet: an odd last item spans both columns as a horizontal card. */
                const wide = rest.length % 2 === 1 && i === rest.length - 1 && rest.length > 1;
                const rowStart = i < fullRows ? i % 3 === 0 : (i - fullRows) % 2 === 0;
                return (
                  <li
                    key={a.id}
                    className={cn(
                      "border-b border-(--line) py-[clamp(2rem,3.5vw,2.75rem)] md:px-[clamp(1rem,2vw,1.75rem)]",
                      i % 2 === 0 ? "md:pl-0" : "md:border-l",
                      wide && "md:col-span-2",
                      half ? "lg:col-span-3" : "lg:col-span-2",
                      rowStart ? "lg:border-l-0 lg:pl-0" : "lg:border-l lg:pl-[clamp(1rem,2vw,1.75rem)]",
                    )}
                  >
                  <article id={a.id} aria-labelledby={`${a.id}-t`} className={cn("group", wide && "md:grid md:grid-cols-2 md:items-center md:gap-x-[clamp(1.5rem,3vw,2.5rem)] lg:block")}>
                    <Photo src={a.image.src} alt={a.image.alt} sizes={half ? "(min-width: 1024px) 42vw, (min-width: 768px) 44vw, 100vw" : "(min-width: 1024px) 28vw, (min-width: 768px) 44vw, 100vw"} quality={75} className="aspect-[4/3] md:aspect-auto md:h-[clamp(14rem,30vw,19rem)] lg:h-[clamp(14rem,19vw,18.5rem)]" imageClassName="transition-transform duration-[1400ms] ease-premium group-hover:scale-[1.04]" />
                    <div className={cn("mt-6", wide && "md:mt-0 lg:mt-6")}>
                      <Meta a={a} />
                      <h3 id={`${a.id}-t`} className="mt-4 font-display text-[clamp(1.375rem,1.15rem+0.7vw,1.75rem)] leading-[1.12] tracking-[-0.025em] text-obsidian">
                        <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-[position:0_100%] bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">{a.title}</span>
                      </h3>
                      <p className="mt-3 text-(--fg-muted)">{a.excerpt}</p>
                    </div>
                  </article>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </>
      ) : (
        <div className="border-b border-(--line) py-16 text-center">
          <p className="font-display text-[1.5rem] tracking-[-0.02em] text-obsidian">No perspectives match your search.</p>
          <button type="button" onClick={() => { setFilter("All"); setQuery(""); }} className="mt-5 text-sm text-teal underline underline-offset-4">
            Show all perspectives
          </button>
        </div>
      )}
    </div>
  );
}
