import { CopyButton } from "@/components/ui/CopyButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ctOffice, mapsHref, officeAddress } from "@/content/contact";

/**
 * Registered Office (Obsidian): heading and corporate line on the left; the address set large
 * on the right between drawn rules, with actions to open it in Google Maps (new tab) or copy it.
 */
export function CtOffice() {
  return (
    <section id="office" aria-labelledby="ct-office-title" className="tone-obsidian relative isolate scroll-mt-(--header-h) overflow-hidden bg-obsidian py-[clamp(4rem,7vw,6rem)] text-white">
      <span aria-hidden="true" className="ct-hero-glow pointer-events-none absolute -top-1/2 right-[-10%] -z-10 size-[min(48rem,90vw)] rounded-full bg-[radial-gradient(circle,rgb(17_123_137/0.22),transparent_62%)]" />
      <div className="container-site grid grid-cols-12 items-end gap-x-col gap-y-10">
        <div className="col-span-12 lg:col-span-5">
          <Eyebrow data-reveal="" className="mb-8">
            {ctOffice.eyebrow}
          </Eyebrow>
          <h2 id="ct-office-title" data-split="" className="max-w-[12ch] font-display text-[clamp(2.375rem,1.4rem+3vw,4rem)] leading-[1] font-normal tracking-[-0.045em]">
            {ctOffice.title}
          </h2>
          <p data-reveal="" className="mt-6 max-w-[30rem] text-white/70">
            {ctOffice.body}
          </p>
        </div>

        <div data-reveal="" className="col-span-12 lg:col-span-6 lg:col-start-7">
          <span aria-hidden="true" className="relative block h-px bg-white/15">
            <span data-draw-line="" className="absolute inset-y-0 left-0 block w-full origin-left bg-teal/70" />
          </span>
          <div className="flex flex-col gap-8 py-[clamp(1.75rem,3vw,2.5rem)] sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-eyebrow text-[0.6875rem] text-silver">{ctOffice.locality}</p>
              <address className="mt-4 font-display text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)] leading-[1.15] tracking-[-0.03em] not-italic">
                {officeAddress.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
            </div>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-3 sm:flex-col sm:items-end">
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-12 items-center gap-3 border border-white/25 px-5 text-[0.9375rem] font-medium tracking-[0.02em] transition-colors duration-500 hover:border-white hover:bg-white hover:text-obsidian"
              >
                Open in Google Maps
                <span aria-hidden="true" className="text-teal transition-transform duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <CopyButton value={officeAddress.join(", ")} label="Copy address" ariaLabel="Copy registered office address" className="text-white/80 hover:text-white data-[state=copied]:text-silver" />
            </div>
          </div>
          <span aria-hidden="true" className="block h-px bg-white/15" />
        </div>
      </div>
    </section>
  );
}
