import type { CSSProperties, ReactNode } from "react";

import { CopyText } from "@/components/ui/Placeholder";
import { SiteLink as Link } from "@/components/ui/SiteLink";
import { draftNote, legalDocs, type LegalBlock, type LegalDoc } from "@/content/legal";
import { isReviewOnly } from "@/lib/content";
import { cn } from "@/lib/cn";

import { LegalToc } from "./LegalToc";

/** Renders **bold** segments inside a paragraph string. */
function Rich({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return <>{parts.map((p, i) => (i % 2 === 1 ? <strong key={i} className="font-semibold text-petrol">{p}</strong> : p))}</>;
}

function ArrowOut({ external }: { external?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5 shrink-0 transition-transform duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="1.4">
      {external ? <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" /> : <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />}
    </svg>
  );
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p>
          <Rich text={block.text} />
        </p>
      );
    case "list":
      return (
        <ul className="legal-list grid gap-2.5">
          {block.items.map((item) => (
            <li key={item} className="relative pl-6">
              <span aria-hidden="true" className="absolute top-[0.72em] left-0 block h-px w-3 bg-teal" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "defs":
      return (
        <dl className="grid gap-5 border-l border-silver/70 pl-6">
          {block.items.map((d) => (
            <div key={d.term}>
              <dt className="font-semibold text-petrol">{d.term}</dt>
              <dd className="mt-1">{d.body}</dd>
            </div>
          ))}
        </dl>
      );
    case "facts":
      return (
        <figure className="legal-facts">
          <figcaption className="text-eyebrow mb-4 text-petrol/70">{block.caption}</figcaption>
          <dl className="border-y border-silver/70 bg-white/60">
            {block.rows.map((r) => (
              <div
                key={r.term}
                className={cn(
                  "grid gap-x-6 gap-y-1 border-t border-silver/50 px-[clamp(1rem,2vw,1.5rem)] py-3.5 first:border-t-0 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]",
                  isReviewOnly(r.value) && "review-only",
                )}
              >
                <dt className="text-[0.8125rem] font-medium tracking-[0.02em] text-petrol/75">{r.term}</dt>
                <dd className="text-obsidian [overflow-wrap:anywhere]">
                  <CopyText value={r.value} />
                </dd>
              </div>
            ))}
          </dl>
        </figure>
      );
    case "identity":
      return (
        <address className="border-l-2 border-teal py-1 pl-6 text-obsidian not-italic">
          {block.lines.map((line, i) => (
            <span key={i} className={cn("block", i === 0 && "font-display text-[1.25rem] tracking-[0.12em] text-petrol")}>
              <CopyText value={line} />
            </span>
          ))}
        </address>
      );
    case "note":
      return (
        <aside className="legal-note border-l-2 border-teal bg-platinum/55 px-[clamp(1.25rem,2.5vw,1.75rem)] py-5">
          <p className="text-eyebrow mb-2 text-teal">{block.label}</p>
          <p className="text-obsidian">{block.text}</p>
        </aside>
      );
    case "review":
      return (
        <p className={cn("review-only border border-dashed px-4 py-3 text-sm leading-[1.55]", block.blocker ? "border-error text-error" : "border-teal text-teal")}>
          <span className="mb-1 block text-[0.6875rem] font-semibold tracking-[0.14em] uppercase">{block.blocker ? "Launch blocker" : "Drafting note"}</span>
          {block.text.replace(/^LAUNCH BLOCKER:\s*/, "")}
        </p>
      );
    case "link":
      return block.external ? (
        <p>
          <a href={block.link.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2.5 border-b border-teal/40 pb-1 font-medium text-petrol transition-colors hover:border-teal hover:text-teal">
            {block.link.label}
            <span className="text-(--fg-muted)">({block.link.href.replace(/^https?:\/\//, "").replace(/\/$/, "")})</span>
            <ArrowOut external />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      ) : (
        <p>
          <Link href={block.link.href} className="group inline-flex items-center gap-2.5 border-b border-teal/40 pb-1 font-medium text-petrol transition-colors hover:border-teal hover:text-teal">
            {block.link.label}
            <ArrowOut />
          </Link>
        </p>
      );
  }
}

function Meta({ doc }: { doc: LegalDoc }) {
  return (
    <dl className="flex flex-wrap gap-x-10 gap-y-3 text-[0.8125rem]">
      {doc.meta.map((m) => (
        <div key={m.term} className={cn("flex items-baseline gap-2.5", isReviewOnly(m.value) && "review-only")}>
          <dt className="text-[0.6875rem] font-medium tracking-[0.16em] text-petrol/60 uppercase">{m.term}</dt>
          <dd className="text-obsidian">
            <CopyText value={m.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * The shared legal-document shell (LG-01): a compact Warm Porcelain hero with eyebrow, title,
 * introduction and a metadata line between double hairlines; then a sticky contents column
 * (desktop) or an expandable contents menu (mobile) beside a narrow reading column of
 * numbered sections; then cross-links to the other two documents. Restrained motion only:
 * the hero fades in and each section heading rises once.
 */
export function LegalPage({ doc, children }: { doc: LegalDoc; children?: ReactNode }) {
  const others = legalDocs.filter((d) => d.slug !== doc.slug);
  const toc = doc.sections.map((s, i) => ({ id: s.id, title: s.title, n: String(i + 1).padStart(2, "0") }));

  return (
    <div data-legal-doc={doc.slug} className="tone-porcelain bg-porcelain">
      {/* Hero */}
      <header id="top" className="relative pt-(--header-h)">
        <div className="container-site pt-[clamp(3rem,6vw,4.75rem)] pb-[clamp(2rem,4vw,2.75rem)]">
          <p className="legal-fade text-eyebrow mb-6 flex items-center gap-3.5 text-petrol" style={{ "--i": 0 } as CSSProperties}>
            <span aria-hidden="true" className="h-px w-8 bg-teal" />
            {doc.eyebrow}
          </p>
          <div className="grid grid-cols-12 items-end gap-x-col gap-y-6">
            <h1 className="legal-rise col-span-12 font-display text-[clamp(2.75rem,1.5rem+4.2vw,5.25rem)] leading-[0.98] font-normal tracking-[-0.05em] text-petrol lg:col-span-7">{doc.title}</h1>
            <p className="legal-fade text-lede col-span-12 max-w-[36rem] text-(--fg-muted) lg:col-span-5 lg:pb-2" style={{ "--i": 1 } as CSSProperties}>
              {doc.intro}
            </p>
          </div>
          <div className="legal-fade mt-[clamp(2rem,4vw,2.75rem)]" style={{ "--i": 2 } as CSSProperties}>
            <span aria-hidden="true" className="grid gap-[3px]">
              <span className="block h-px bg-petrol/30" />
              <span className="block h-px bg-silver/60" />
            </span>
            <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-4">
              <Meta doc={doc} />
              <p className="review-only border border-dashed border-error px-3 py-1 text-[0.6875rem] font-semibold tracking-[0.12em] text-error uppercase">{draftNote}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="container-site grid grid-cols-12 gap-x-col pb-[clamp(4rem,8vw,6.5rem)]">
        {/* Contents: sticky list on desktop, expandable menu on smaller screens */}
        <aside data-legal-toc="" className="col-span-12 lg:col-span-3">
          <details className="group border-y border-silver/70 lg:hidden">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 text-[0.9375rem] font-medium text-petrol [&::-webkit-details-marker]:hidden">
              Contents
              <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5 transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M3.5 6 8 10.5 12.5 6" />
              </svg>
            </summary>
            <ol className="grid pb-4">
              {toc.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className="flex gap-4 py-2 text-[0.9375rem] text-obsidian/80 hover:text-teal">
                    <span className="w-6 shrink-0 text-[0.75rem] text-teal tabular-nums">{t.n}</span>
                    {t.title}
                  </a>
                </li>
              ))}
            </ol>
          </details>
          <div className="hidden lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:block lg:pt-[clamp(2.5rem,4vw,3.5rem)]">
            <LegalToc items={toc} />
          </div>
        </aside>

        <article className="legal-article col-span-12 lg:col-span-8 lg:col-start-5 xl:col-span-7 xl:col-start-5">
          {doc.summary ? (
            <aside aria-label={doc.summary.label} className="legal-summary mt-[clamp(2.5rem,4vw,3.5rem)] border border-petrol/15 bg-white/70 px-[clamp(1.25rem,3vw,2rem)] py-6">
              <p className="text-eyebrow mb-4 text-teal">{doc.summary.label}</p>
              <ul className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {doc.summary.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.9375rem] text-obsidian">
                    <span aria-hidden="true" className="mt-[0.55em] block size-1.5 shrink-0 rotate-45 bg-teal" />
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}

          {doc.sections.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="legal-section scroll-mt-[calc(var(--header-h)+1.5rem)] border-b border-silver/60 py-[clamp(2.5rem,4vw,3.5rem)] last:border-b-0">
              <div data-reveal="" className="mb-6 flex items-baseline gap-5">
                <span aria-hidden="true" className="w-8 shrink-0 font-display text-[1rem] text-teal tabular-nums">{toc[i]?.n}</span>
                <h2 id={`${s.id}-title`} className="font-display text-[clamp(1.5rem,1.2rem+1vw,2.125rem)] leading-[1.12] font-normal tracking-[-0.03em] text-petrol">
                  <span className="sr-only">{toc[i]?.n}. </span>
                  {s.title}
                </h2>
              </div>
              <div className="legal-prose grid max-w-[40rem] gap-5 text-[1.0625rem] leading-[1.75] text-obsidian/85 sm:pl-[3.25rem]">
                {s.blocks.map((b, j) => (
                  <Block key={j} block={b} />
                ))}
              </div>
            </section>
          ))}
          {children}
        </article>
      </div>

      {/* Related documents */}
      <nav aria-label="Related legal documents" className="legal-related border-t border-silver/70 bg-white">
        <div className="container-site grid grid-cols-12 gap-x-col gap-y-6 py-[clamp(3rem,6vw,4.5rem)]">
          <p className="text-eyebrow col-span-12 text-petrol/70 lg:col-span-3">Legal collection</p>
          <ul className="col-span-12 grid gap-px bg-silver/60 sm:grid-cols-2 lg:col-span-9">
            {others.map((d) => (
              <li key={d.slug} className="bg-white">
                <Link href={d.href} className="group flex h-full items-end justify-between gap-6 py-6 pr-2 sm:px-6">
                  <span>
                    <span className="text-eyebrow block text-teal">{d.eyebrow}</span>
                    <span className="mt-2 block font-display text-[clamp(1.375rem,1.1rem+0.8vw,1.875rem)] leading-[1.15] tracking-[-0.03em] text-petrol transition-colors group-hover:text-teal">{d.title}</span>
                  </span>
                  <span className="mb-1.5 text-petrol/50 group-hover:text-teal">
                    <ArrowOut />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}
