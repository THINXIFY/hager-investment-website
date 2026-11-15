import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { about, corporate } from "@/content/home";

/**
 * About: architectural editorial.
 * Full-width headline, one wide architectural photograph and an
 * architect's dimension line that carries the founding year.
 */
export function About() {
  return (
    <Section id="about" tone="porcelain" aria-labelledby="about-title" className="overflow-hidden">
      <div className="container-site">
        {/* Headline */}
        <div className="grid grid-cols-12 gap-x-col">
          <Eyebrow data-reveal="" className="col-span-12 mb-10">
            {about.eyebrow}
          </Eyebrow>
          <h2
            data-fill=""
            id="about-title"
            className="col-span-12 font-display text-[clamp(2.375rem,1.3rem+3.6vw,5rem)] leading-[1.02] font-normal tracking-[-0.04em] lg:col-span-11"
          >
            <span className="block">
              {about.titleLead}
            </span>
            <span className="block text-petrol/70 italic md:pl-[12%]">
              {about.titleEmphasis}
            </span>
          </h2>
        </div>

        {/* Photograph + copy */}
        <div className="mt-[clamp(3rem,6vw,5.5rem)] grid grid-cols-12 items-end gap-x-col gap-y-12">
          <figure className="col-span-12 lg:col-span-8">
            <div data-clip-reveal="" className="relative">
              <Photo
                src={about.image.src}
                alt={about.image.alt}
                sizes="(min-width: 1024px) 64vw, 100vw"
                quality={85}
                parallax
                className="aspect-[4/3] md:aspect-[16/9]"
              />
            </div>

            {/* Dimension line: the founding year, measured like architecture */}
            <figcaption className="mt-6 flex items-center gap-4 text-petrol" aria-label={`Established ${corporate.established}, ${corporate.country}`}>
              <span aria-hidden="true" className="h-3 w-px bg-petrol" />
              <span aria-hidden="true" className="relative h-px flex-1 bg-(--line)">
                <span data-draw-line="" className="absolute inset-0 block bg-teal" />
              </span>
              <span className="text-eyebrow flex items-baseline gap-3 whitespace-nowrap">
                <span className="text-(--fg-subtle)">Est.</span>
                <span className="font-display text-[clamp(1.5rem,1.2rem+1vw,2.125rem)] font-normal tracking-[-0.03em] normal-case">
                  {corporate.established}
                </span>
                <span className="text-(--fg-subtle)">· {corporate.country}</span>
              </span>
              <span aria-hidden="true" className="relative h-px w-[12%] bg-(--line)">
                <span data-draw-line="" className="absolute inset-0 block bg-teal" />
              </span>
              <span aria-hidden="true" className="h-3 w-px bg-petrol" />
            </figcaption>
          </figure>

          <div className="col-span-12 border-(--line) lg:col-span-4 lg:border-l lg:pb-[4.25rem] lg:pl-[clamp(1.5rem,2.6vw,2.75rem)]">
            <p data-reveal="" className="text-[clamp(1.25rem,1.1rem+0.55vw,1.625rem)] leading-[1.45] tracking-[-0.01em] text-obsidian">
              {about.body}
            </p>
            <p data-reveal="" className="text-eyebrow mt-8 text-(--fg-subtle)">
              {about.detail}
            </p>
            <div data-reveal="" className="mt-10">
              <ButtonLink href={about.cta.href} variant="dark" arrow>
                {about.cta.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
