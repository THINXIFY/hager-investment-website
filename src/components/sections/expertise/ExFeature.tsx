import { Eyebrow } from "@/components/ui/Eyebrow";
import { exFeature } from "@/content/expertise";

/**
 * Strategic Perspective (Obsidian), typographic only. Behind, the three ideas of the
 * statement (context, complexity, implications) are set as monumental outlined words that
 * drift sideways in opposite directions as the band passes; fine arcs draw in from a corner.
 * In front, the heading fills word by word and the statement follows on a teal rule.
 */
export function ExFeature() {
  const drift = ["5", "-6", "4"];
  return (
    <section id="perspective" aria-labelledby="ex-feature-title" className="tone-obsidian relative isolate overflow-hidden bg-obsidian py-[clamp(5rem,9vw,8rem)]">
      {/* Monumental outlined words (decorative) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 flex flex-col justify-center gap-[clamp(0.5rem,2vw,1.5rem)] overflow-hidden select-none">
        {exFeature.words.map((w, i) => (
          <p
            key={w}
            data-drift={drift[i]}
            className={"font-display text-[clamp(5rem,2.5rem+10vw,13rem)] leading-[0.9] tracking-[-0.05em] whitespace-nowrap text-transparent [-webkit-text-stroke:1px_rgb(169_193_197/0.16)] " + (i === 1 ? "pl-[18%]" : i === 2 ? "pl-[6%]" : "pl-[2%]")}
          >
            {w}
          </p>
        ))}
      </div>
      <svg aria-hidden="true" viewBox="0 0 600 600" fill="none" className="pointer-events-none absolute -right-[10rem] -bottom-[14rem] -z-10 size-[clamp(26rem,44vw,40rem)] text-teal/35">
        {[560, 460, 360].map((r) => (
          <path key={r} data-draw-path="" pathLength={1} d={`M${600 - r} 600A${r} ${r} 0 0 1 600 ${600 - r}`} stroke="currentColor" strokeWidth="1" />
        ))}
      </svg>

      <div className="container-site grid grid-cols-12 gap-x-col">
        <div className="col-span-12 md:col-span-10 lg:col-span-7 lg:col-start-4">
          <Eyebrow data-reveal="" className="mb-8">
            {exFeature.eyebrow}
          </Eyebrow>
          <h2 id="ex-feature-title" data-fill="" className="max-w-[15ch] font-display text-[clamp(2.5rem,1.3rem+3.8vw,5rem)] leading-[1] font-normal tracking-[-0.045em] text-white">
            {exFeature.title}
          </h2>
          <div data-reveal="" className="mt-[clamp(2rem,4vw,3rem)] max-w-[36rem] border-l border-teal pl-6">
            <p className="text-[clamp(1.125rem,1rem+0.5vw,1.375rem)] leading-[1.6] text-white/85">{exFeature.body}</p>
          </div>
          <ul data-seq-group="0.12" className="mt-[clamp(2.25rem,4vw,3rem)] flex flex-wrap gap-x-8 gap-y-3">
            {exFeature.words.map((w) => (
              <li key={w} data-seq="" className="flex items-center gap-3 text-[0.75rem] tracking-[0.18em] text-silver uppercase">
                <span aria-hidden="true" className="block size-1.5 rotate-45 bg-teal" />
                {w}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
