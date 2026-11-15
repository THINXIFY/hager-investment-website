import { ButtonLink } from "@/components/ui/Button";
import { inClosing } from "@/content/insights";

/**
 * Closing (Warm Porcelain): a centred end-of-issue composition between the publication's
 * double hairlines; it differs from every other closing on the site and meets the Petrol footer.
 */
export function InClosing() {
  return (
    <section aria-labelledby="in-closing-title" className="tone-porcelain relative bg-porcelain">
      <div className="container-site py-[clamp(4rem,7vw,6rem)]">
        <div aria-hidden="true" className="grid gap-[3px]">
          <span className="block h-px bg-petrol/40" />
          <span className="block h-px bg-petrol/20" />
        </div>
        <div className="mx-auto max-w-[44rem] py-[clamp(3rem,6vw,4.5rem)] text-center">
          <span aria-hidden="true" className="mx-auto mb-8 block size-2 rotate-45 bg-teal" />
          <h2 id="in-closing-title" data-split="" className="font-display text-[clamp(2rem,1.25rem+2.6vw,3.75rem)] leading-[1.04] font-normal tracking-[-0.04em] text-obsidian">
            {inClosing.title}
          </h2>
          <p data-reveal="" className="text-lede mx-auto mt-6 max-w-[32rem] text-(--fg-muted)">
            {inClosing.body}
          </p>
          <div data-reveal="" className="mt-9 flex justify-center">
            <ButtonLink href={inClosing.cta.href} variant="dark" arrow>
              {inClosing.cta.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
