import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SiteLink as Link } from "@/components/ui/SiteLink";
import { ReviewNote } from "@/components/ui/Typography";
import { apClosing, apPaths } from "@/content/approach";

/**
 * Working with HAGER INVESTMENT (Obsidian), closing the page: three routes for different
 * visitors, each a large link to the page that serves them, beside the closing invitation and
 * its two actions. Flows into the Petrol footer.
 */
export function ApClosing() {
  return (
    <section aria-labelledby="ap-paths-title" className="tone-obsidian relative isolate overflow-hidden bg-obsidian">
      <div className="container-site py-[clamp(4.5rem,8vw,7rem)]">
        <div className="grid grid-cols-12 items-end gap-x-col gap-y-6">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow data-reveal="" className="mb-8">
              {apPaths.eyebrow}
            </Eyebrow>
            <h2 id="ap-paths-title" data-split="" className="max-w-[16ch] font-display text-[clamp(2.25rem,1.3rem+3vw,4rem)] leading-[1.02] font-normal tracking-[-0.045em] text-white">
              {apPaths.title}
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:pb-2">
            <ReviewNote value={apPaths.note} />
          </div>
        </div>

        <ul data-seq-group="0.12" className="mt-[clamp(2.5rem,5vw,3.5rem)] grid border-y border-white/12 md:grid-cols-3">
          {apPaths.paths.map((p, i) => (
            <li key={p.audience} data-seq="" className={i > 0 ? "border-t border-white/12 md:border-t-0 md:border-l" : ""}>
              <Link href={p.link.href} className={"group relative flex h-full flex-col justify-between gap-8 py-8 transition-colors duration-500 hover:bg-white/[0.03] md:px-[clamp(1.25rem,2.5vw,2rem)] " + (i === 0 ? "md:pl-0" : "")}>
                <span>
                  <span className="text-eyebrow block text-silver">{p.audience}</span>
                  <span className="mt-4 block font-display text-[clamp(1.5rem,1.2rem+0.9vw,2.125rem)] leading-[1.1] tracking-[-0.03em] text-white">{p.name}</span>
                  <span className="mt-3 block max-w-[22rem] text-white/70">{p.body}</span>
                </span>
                <span className="inline-flex items-center gap-2 text-[0.875rem] font-medium text-white">
                  {p.link.label}
                  <span aria-hidden="true" className="text-teal transition-transform duration-500 ease-premium group-hover:translate-x-1.5">→</span>
                </span>
                <span aria-hidden="true" className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-teal transition-transform duration-700 ease-premium group-hover:scale-x-100" />
              </Link>
            </li>
          ))}
        </ul>

        <div data-reveal="" className="mt-[clamp(3rem,6vw,4.5rem)] flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-[clamp(1.5rem,1.2rem+0.9vw,2.125rem)] leading-[1.15] tracking-[-0.025em] text-white">{apClosing.title}</p>
            <p className="mt-2 text-white/70">{apClosing.body}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href={apClosing.cta.href} variant="light" arrow>
              {apClosing.cta.label}
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Contact Us
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
