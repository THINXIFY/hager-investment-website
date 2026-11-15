import { Eyebrow } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { aboutCompany } from "@/content/about";
import { corporate } from "@/content/home";

const FACTS = [
  { term: "Registered in", value: corporate.country },
  { term: "Established", value: corporate.established },
  { term: "Legal form", value: "Société Anonyme" },
];

/**
 * Who We Are (Warm Porcelain): a balanced editorial split.
 * Left: the heading fills word by word, the description, a three-fact register on fine rules
 * and a link to the foundations timeline. Right: one tall architectural photograph that opens
 * upward and drifts gently, with a small Imperial Petrol statement panel overlapping its
 * lower corner. Verified facts only.
 */
export function AboutCompany() {
  return (
    <Section id="who-we-are" tone="porcelain" aria-labelledby="company-title" className="overflow-hidden">
      <div className="container-site grid grid-cols-12 items-center gap-x-col gap-y-14">
        <div className="col-span-12 lg:col-span-6">
          <Eyebrow data-reveal="" className="mb-8">
            {aboutCompany.eyebrow}
          </Eyebrow>
          <h2 id="company-title" data-fill="" className="font-display text-[clamp(2.25rem,1.25rem+2.7vw,3.625rem)] leading-[1.04] whitespace-nowrap max-sm:whitespace-normal font-normal tracking-[-0.045em]">
            <span className="block">{aboutCompany.titleLead}</span>{" "}
            <span className="block text-petrol/70 italic">{aboutCompany.titleEmphasis}</span>
          </h2>
          <span aria-hidden="true" className="relative mt-[clamp(2rem,3.5vw,2.75rem)] block h-px max-w-[26rem] bg-(--line)">
            <span data-draw-line="" className="absolute inset-0 block bg-teal" />
          </span>
          <p data-reveal="" className="mt-[clamp(1.5rem,2.5vw,2rem)] max-w-[30rem] text-[clamp(1.125rem,1rem+0.45vw,1.375rem)] leading-[1.55] tracking-[-0.01em] text-obsidian">
            {aboutCompany.body}
          </p>

          <dl data-seq-group="0.1" className="mt-[clamp(2rem,3.5vw,2.75rem)] grid grid-cols-3 border-y border-(--line)">
            {FACTS.map((f, i) => (
              <div key={f.term} data-seq="" className={i > 0 ? "border-l border-(--line) py-4 pl-4" : "py-4 pr-4"}>
                <dt className="text-[0.625rem] tracking-[0.18em] text-(--fg-subtle) uppercase">{f.term}</dt>
                <dd className="mt-1.5 font-display text-[clamp(1rem,0.9rem+0.4vw,1.25rem)] leading-[1.2] tracking-[-0.01em] text-obsidian">{f.value}</dd>
              </div>
            ))}
          </dl>

          <a href="#heritage" data-reveal="" className="group mt-8 inline-flex items-center gap-3 border-b border-petrol/25 pb-1.5 text-[0.9375rem] font-medium tracking-[0.02em] text-petrol transition-colors hover:border-teal hover:text-teal">
            Our foundations
            <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5 transition-transform duration-500 ease-premium group-hover:translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M8 2.5v11M3.5 9 8 13.5 12.5 9" />
            </svg>
          </a>
        </div>

        <figure className="relative col-span-12 lg:col-span-5 lg:col-start-8">
          <div data-clip-reveal="up">
            <Photo
              src={aboutCompany.image.src}
              alt={aboutCompany.image.alt}
              sizes="(min-width: 1024px) 40vw, 100vw"
              quality={85}
              parallax
              objectPosition="45% 50%"
              className="aspect-[4/3] lg:aspect-[4/5]"
            />
          </div>
          {/* Statement panel overlapping the photograph's lower corner */}
          <div data-reveal="" className="tone-petrol relative -mt-14 ml-6 max-w-[19rem] bg-petrol p-6 sm:absolute sm:bottom-[clamp(1.25rem,3vw,2rem)] sm:-left-[clamp(1.5rem,4vw,3.5rem)] sm:mt-0 sm:ml-0">
            <span aria-hidden="true" className="mb-4 block h-px w-10 bg-teal" />
            <p className="font-display text-[1.25rem] leading-[1.3] tracking-[-0.015em] text-white">Grounded in continuity, with an outlook toward the future.</p>
          </div>
        </figure>
      </div>
    </Section>
  );
}
