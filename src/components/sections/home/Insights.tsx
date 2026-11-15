import { ArrowLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Photo } from "@/components/ui/Photo";
import { CopyText } from "@/components/ui/Placeholder";
import { Section } from "@/components/ui/Section";
import { SiteLink as Link } from "@/components/ui/SiteLink";
import { insights, type Insight } from "@/content/home";
import { cn } from "@/lib/cn";

/** Underline that draws beneath a headline on hover. */
const drawUnderline =
  "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-[position:0_100%] bg-no-repeat transition-[background-size] duration-700 ease-premium group-hover:bg-[length:100%_1px]";

function Meta({ item, stacked = false }: { item: Insight; stacked?: boolean }) {
  return (
    <p
      className={cn(
        "text-eyebrow flex tracking-[0.14em]",
        stacked ? "flex-col items-start gap-1.5" : "flex-wrap items-center gap-x-4 gap-y-2",
      )}
    >
      <span className="text-(--accent)">{item.category}</span>
      {stacked ? null : <span aria-hidden="true" className="h-3 w-px bg-(--line)" />}
      {/* Sample articles are always labelled as unpublished */}
      <span className="text-[0.625rem] text-(--fg-subtle)">
        <CopyText value={item.status} />
      </span>
    </p>
  );
}

function Featured({ item }: { item: Insight }) {
  return (
    <article data-reveal="">
      <Link href={item.href} className="group block">
        <div data-clip-reveal="">
        <Photo
          src={item.image.src}
          alt={item.image.alt}
          sizes="(min-width: 1024px) 56vw, 100vw"
          quality={85}
          className="aspect-[3/2]"
          imageClassName="transition-transform duration-[1600ms] ease-premium group-hover:scale-[1.04]"
        />
        </div>
        <div className="mt-7 grid gap-4 lg:mt-9">
          <Meta item={item} />
          <h3 className="max-w-[20ch] font-display text-[clamp(1.75rem,1.2rem+1.95vw,2.875rem)] leading-[1.08] font-normal tracking-[-0.03em]">
            <span className={drawUnderline}>{item.title}</span>
          </h3>
          <p className="text-lede max-w-[34rem] text-(--fg-muted)">{item.excerpt}</p>
          <span className="inline-flex items-center gap-3 text-sm font-medium tracking-[0.04em]">
            Read perspective
            <ArrowRightIcon className="transition-transform duration-450 ease-premium group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </article>
  );
}

function Secondary({ item }: { item: Insight }) {
  return (
    <article data-reveal="">
      <Link href={item.href} className="group grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-[clamp(1rem,2.5vw,2rem)]">
        <div className="grid gap-3.5">
          <Meta item={item} stacked />
          <h3 className="font-display text-[clamp(1.3rem,1.05rem+0.75vw,1.75rem)] leading-[1.15] font-normal tracking-[-0.02em]">
            <span className={drawUnderline}>{item.title}</span>
          </h3>
          <p className="text-(--fg-muted)">{item.excerpt}</p>
          <span className="inline-flex items-center gap-3 text-sm font-medium tracking-[0.04em]">
            Read perspective
            <ArrowRightIcon className="transition-transform duration-450 ease-premium group-hover:translate-x-1" />
          </span>
        </div>
        <div data-clip-reveal="x" className="mt-0.5">
        <Photo
          src={item.image.src}
          alt={item.image.alt}
          sizes="(min-width: 1024px) 12vw, 28vw"
          className="aspect-square w-[clamp(6.5rem,12vw,10.5rem)]"
          imageClassName="transition-transform duration-[1600ms] ease-premium group-hover:scale-[1.06]"
        />
        </div>
      </Link>
    </article>
  );
}

/** Insights: an institutional journal layout. Sample articles are labelled as unpublished. */
export function Insights() {
  const [featured, ...rest] = insights.items;
  return (
    <Section id="insights" tone="white" aria-labelledby="insights-title">
      <div className="container-site">
        {/* Masthead */}
        <header className="mb-12 grid grid-cols-12 items-end gap-x-col gap-y-8 border-b border-petrol pb-10 lg:mb-16 lg:pb-12">
          <div className="col-span-12 lg:col-span-9">
            <Eyebrow data-reveal="" className="mb-8">
              {insights.eyebrow}
            </Eyebrow>
            <h2 id="insights-title" data-fill="" className="text-section max-w-[20ch]">
              {insights.title}
            </h2>
          </div>
          <div data-reveal="" className="col-span-12 lg:col-span-3 lg:justify-self-end">
            <ArrowLink href={insights.cta.href}>{insights.cta.label}</ArrowLink>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-x-col gap-y-14">
          {featured ? (
            <div className="col-span-12 lg:col-span-7">
              <Featured item={featured} />
            </div>
          ) : null}
          <div className="tone-platinum col-span-12 px-6 py-9 sm:px-9 lg:col-span-5 lg:px-[clamp(1.75rem,3vw,3rem)] lg:py-[clamp(2.25rem,3vw,3rem)]">
            {rest.map((item, i) => (
              <div key={item.title} className={cn(i > 0 ? "mt-10 border-t border-(--line) pt-10" : "lg:pt-1")}>
                <Secondary item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
