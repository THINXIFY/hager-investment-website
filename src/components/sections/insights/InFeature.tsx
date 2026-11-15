import { Eyebrow } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";
import { inFeature } from "@/content/insights";

/**
 * Beyond the headlines (Obsidian, with a Porcelain text column): a magazine feature spread.
 * The headline runs across the top on Obsidian; the photograph spans the page and drifts
 * slowly; a Porcelain column overlaps its lower edge with the standfirst, like a sidebar.
 */
export function InFeature() {
  return (
    <section id="beyond-the-headlines" aria-labelledby="in-feature-title" className="tone-obsidian relative isolate overflow-hidden bg-obsidian pt-(--spacing-section) pb-[clamp(4rem,7vw,6rem)]">
      <div className="container-site">
        <Eyebrow data-reveal="" className="mb-8">
          {inFeature.eyebrow}
        </Eyebrow>
        <h2 id="in-feature-title" data-fill="" className="max-w-[18ch] font-display text-[clamp(2.375rem,1.3rem+3.8vw,5.25rem)] leading-[1] font-normal tracking-[-0.045em] text-white">
          {inFeature.title}
        </h2>
      </div>

      <div className="relative mt-[clamp(2.5rem,5vw,4rem)]">
        <div data-clip-reveal="up">
          <Photo src={inFeature.image.src} alt={inFeature.image.alt} sizes="100vw" quality={85} parallax className="aspect-[4/3] md:aspect-[16/8] lg:aspect-[21/9]" imageClassName="object-[50%_45%]" />
        </div>
        <div className="container-site relative -mt-[clamp(3rem,10vw,7rem)]">
          <div data-reveal="" className="tone-porcelain ml-auto w-full bg-porcelain p-[clamp(1.75rem,3.5vw,3rem)] md:w-[min(32rem,60%)]">
            <span aria-hidden="true" className="mb-6 block h-px w-12 bg-teal" />
            <p className="text-[clamp(1.125rem,1rem+0.45vw,1.375rem)] leading-[1.55] text-obsidian">{inFeature.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
