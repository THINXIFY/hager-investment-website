import { Eyebrow } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";
import { ReviewNote } from "@/components/ui/Typography";
import { aboutPerspective } from "@/content/about";

/**
 * Our Perspective (Imperial Petrol): the philosophy as an architectural triptych.
 * The dark field widens from the heritage section (data-expand); the heading fills word by
 * word; then three tall photographs open upward in sequence, each a "window" onto one theme,
 * with the theme name, its definition and an "in practice" line beneath. On hover the
 * photograph eases closer and a teal rule runs across the column.
 * The themes and supporting copy are proposed brand concepts (review-mode note).
 */
export function AboutPerspective() {
  const p = aboutPerspective;
  return (
    <section id="perspective" aria-labelledby="perspective-title" className="tone-petrol relative isolate bg-platinum! section-y">
      {/* Light-to-dark transition */}
      <div data-expand="5" aria-hidden="true" className="absolute inset-0 -z-10 bg-petrol" />

      <div className="container-site">
        <div className="grid grid-cols-12 items-end gap-x-col gap-y-8">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow data-reveal="" className="mb-8">
              {p.eyebrow}
            </Eyebrow>
            <h2 id="perspective-title" data-fill="" className="max-w-[13ch] font-display text-[clamp(2.5rem,1.3rem+3.8vw,5.25rem)] leading-[0.98] font-normal tracking-[-0.045em]">
              {p.title}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-9 lg:col-span-4 lg:col-start-9 lg:pb-2">
            <p data-reveal="" className="text-lede text-white">
              {p.intro}
            </p>
            <p data-reveal="" className="mt-5 text-(--fg-muted)">
              {p.supporting}
            </p>
            <ReviewNote value={p.note} className="mt-5" />
          </div>
        </div>

        <span aria-hidden="true" className="relative mt-[clamp(3rem,6vw,4.5rem)] block h-px bg-white/12">
          <span data-draw-line="" className="absolute inset-0 block bg-silver/50" />
        </span>

        <ol data-seq-group="0.16" className="mt-[clamp(2.5rem,5vw,3.5rem)] grid gap-x-col gap-y-14 md:grid-cols-3">
          {p.themes.map((t, i) => (
            <li key={t.name} data-seq="" className="group relative">
              <div className="relative overflow-hidden">
                <div data-clip-reveal="up" className="overflow-hidden">
                  <Photo
                    src={t.image.src}
                    alt={t.image.alt}
                    sizes="(min-width: 768px) 31vw, 100vw"
                    quality={85}
                    objectPosition={t.image.position}
                    className="aspect-[4/3] md:aspect-[3/4]"
                    imageClassName="transition-transform duration-[1600ms] ease-premium group-hover:scale-[1.05]"
                  />
                </div>
                {/* Index numeral set on the photograph's lower edge */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end bg-[linear-gradient(to_top,rgb(9_11_13/0.62),rgb(9_11_13/0))] px-5 pt-16 pb-4">
                  <span className="font-display text-[0.9375rem] text-white/90 italic">{["i.", "ii.", "iii."][i]}</span>
                </div>
              </div>
              <div className="relative mt-7 border-t border-white/15 pt-6">
                <span aria-hidden="true" className="absolute -top-px left-0 h-px w-10 bg-teal transition-[width] duration-700 ease-premium group-hover:w-full" />
                <h3 className="font-display text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)] leading-[1.05] tracking-[-0.035em] text-white">{t.name}</h3>
                <p className="mt-4 max-w-[24rem] text-white/85">{t.body}</p>
                <p className="mt-5 max-w-[24rem] border-l border-silver/35 pl-4 text-[0.9375rem] leading-[1.6] text-(--fg-muted)">
                  <span className="mb-1 block text-[0.6875rem] font-medium tracking-[0.16em] text-silver uppercase">In practice</span>
                  {t.practice}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
