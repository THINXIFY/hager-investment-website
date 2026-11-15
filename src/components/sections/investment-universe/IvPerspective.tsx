import { Eyebrow } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { ReviewNote } from "@/components/ui/Typography";
import { ivPerspective } from "@/content/investment-universe";

const NUMERALS = ["i.", "ii.", "iii."];

/**
 * The Bigger Picture (Warm Porcelain): a balanced split. Left, the heading rises, the lead
 * statement fills word by word and the body follows. Right, one architectural photograph opens
 * upward; an Imperial Petrol ledger overlaps its foot, naming the three forces from the lead
 * (economic conditions, technological developments, evolving human needs), arriving in turn.
 */
export function IvPerspective() {
  const p = ivPerspective;
  return (
    <Section id="bigger-picture" tone="porcelain" aria-labelledby="iv-perspective-title" className="overflow-hidden">
      <div className="container-site grid grid-cols-12 items-center gap-x-col gap-y-14">
        <div className="col-span-12 lg:col-span-5">
          <Eyebrow data-reveal="" className="mb-8">
            {p.eyebrow}
          </Eyebrow>
          <h2 id="iv-perspective-title" data-split="" className="max-w-[12ch] font-display text-[clamp(2.375rem,1.3rem+3vw,4.25rem)] leading-[1.02] font-normal tracking-[-0.045em] text-obsidian">
            {p.title}
          </h2>
          <span aria-hidden="true" className="relative mt-[clamp(2rem,3.5vw,2.75rem)] block h-px max-w-[26rem] bg-(--line)">
            <span data-draw-line="" className="absolute inset-0 block bg-teal" />
          </span>
          <p data-fill="" className="mt-[clamp(1.5rem,2.5vw,2rem)] max-w-[30rem] font-display text-[clamp(1.25rem,1.05rem+0.7vw,1.75rem)] leading-[1.35] tracking-[-0.02em] text-obsidian">
            {p.lead}
          </p>
          <p data-reveal="" className="mt-6 max-w-[30rem] text-(--fg-muted)">
            {p.body}
          </p>
        </div>

        <figure className="relative col-span-12 lg:col-span-7 lg:col-start-6">
          <div data-clip-reveal="up">
            <Photo src={p.image.src} alt={p.image.alt} sizes="(min-width: 1024px) 55vw, 100vw" quality={85} parallax className="aspect-[4/3] lg:aspect-[5/4]" />
          </div>
          <ol data-seq-group="0.12" className="tone-petrol relative grid bg-petrol sm:grid-cols-3 lg:absolute lg:inset-x-0 lg:bottom-0 lg:-mb-px">
            {p.forces.map((f, i) => (
              <li key={f.name} data-seq="" className={i > 0 ? "border-t border-white/12 p-6 sm:border-t-0 sm:border-l" : "p-6"}>
                <span aria-hidden="true" className="font-display text-[0.9375rem] text-silver italic">
                  {NUMERALS[i]}
                </span>
                <h3 className="mt-2 font-display text-[1.25rem] leading-[1.15] tracking-[-0.02em] text-white">{f.name}</h3>
                <p className="mt-2 text-[0.875rem] leading-[1.55] text-white/75">{f.body}</p>
              </li>
            ))}
          </ol>
          <ReviewNote value={p.note} className="mt-4" />
        </figure>
      </div>
    </Section>
  );
}
