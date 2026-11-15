import { Photo } from "@/components/ui/Photo";
import { inFeatured, SAMPLE_LABEL } from "@/content/insights";

/**
 * Featured perspective, continuing the Porcelain front page: a large photograph with a
 * restrained hover settle, the story set to its right. Clearly marked as a sample.
 */
export function InFeatured() {
  const a = inFeatured;
  return (
    <section aria-labelledby="in-featured-title" className="tone-porcelain bg-porcelain pt-[clamp(2.5rem,5vw,4rem)] pb-[clamp(4.5rem,8vw,7rem)]">
      <div className="container-site">
        <p className="text-eyebrow mb-6 text-(--fg-subtle)">Featured Perspective</p>
        <article id={a.id} aria-labelledby="in-featured-title" className="group grid grid-cols-12 items-end gap-x-col gap-y-8">
          <div data-clip-reveal="x" className="col-span-12 lg:col-span-7">
            <Photo
              src={a.image.src}
              alt={a.image.alt}
              sizes="(min-width: 1024px) 58vw, 100vw"
              quality={85}
              preload
              className="aspect-[16/10]"
              imageClassName="transition-transform duration-[1600ms] ease-premium group-hover:scale-[1.03]"
            />
          </div>
          <div data-reveal="" className="col-span-12 lg:col-span-5 lg:pb-2 lg:pl-[clamp(0rem,2vw,1.5rem)]">
            <p className="flex flex-wrap items-center gap-x-4 gap-y-2 text-eyebrow">
              <span className="text-teal">{a.category}</span>
              <span aria-hidden="true" className="h-3 w-px bg-(--line)" />
              <span className="text-(--fg-subtle)">{SAMPLE_LABEL}</span>
            </p>
            <h2 id="in-featured-title" className="mt-6 font-display text-[clamp(2.25rem,1.3rem+2.8vw,4rem)] leading-[1.02] tracking-[-0.04em] text-obsidian">
              {a.title}
            </h2>
            <span aria-hidden="true" className="mt-7 block h-px w-12 bg-teal" />
            <p className="text-lede mt-7 max-w-[30rem] text-(--fg-muted)">{a.excerpt}</p>
            <p className="mt-6 text-sm text-(--fg-subtle)">Summary shown in full. The complete article will follow once approved.</p>
          </div>
        </article>
      </div>
    </section>
  );
}
