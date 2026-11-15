import { Eyebrow } from "@/components/ui/Eyebrow";
import { SiteLink as Link } from "@/components/ui/SiteLink";
import { ctFaq } from "@/content/contact";

/**
 * Frequently asked (White): an exclusive accordion built on native <details> (works without
 * JavaScript, keyboard-accessible by default). Panels open with a smooth height transition
 * where supported; the plus turns into a minus and a teal rule draws under the open question.
 */
export function CtFaq() {
  return (
    <section id="faq" aria-labelledby="ct-faq-title" className="tone-white bg-white py-[clamp(4rem,8vw,6.5rem)]">
      <div className="container-site grid grid-cols-12 gap-x-col gap-y-10">
        <div className="col-span-12 lg:col-span-4">
          <Eyebrow data-reveal="" className="mb-7">
            {ctFaq.eyebrow}
          </Eyebrow>
          <h2 id="ct-faq-title" data-split="" className="font-display text-[clamp(2.25rem,1.4rem+2.6vw,3.5rem)] leading-[1.02] font-normal tracking-[-0.045em] text-obsidian">
            {ctFaq.title}
          </h2>
          <p data-reveal="" className="mt-5 max-w-[22rem] text-(--fg-muted)">
            Quick answers about contacting us, requesting documents and how your details are used.
          </p>
        </div>
        <div data-seq-group="0.08" className="ct-faq col-span-12 border-t border-(--line) lg:col-span-8">
          {ctFaq.items.map((item, i) => (
            <details key={item.q} name="ct-faq" open={i === 0} data-seq="" className="group relative border-b border-(--line)">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
                <span className="font-display text-[clamp(1.25rem,1.05rem+0.6vw,1.625rem)] leading-[1.25] tracking-[-0.02em] text-obsidian transition-colors duration-300 group-hover:text-petrol">{item.q}</span>
                <span aria-hidden="true" className="relative grid size-10 shrink-0 place-items-center rounded-full border border-petrol/20 transition-[background-color,border-color] duration-500 group-open:border-petrol group-open:bg-petrol">
                  <span className="absolute h-px w-3.5 bg-petrol transition-colors duration-500 group-open:bg-white" />
                  <span className="absolute h-3.5 w-px bg-petrol transition-transform duration-500 ease-premium group-open:scale-y-0" />
                </span>
              </summary>
              <div className="max-w-[44rem] pr-16 pb-7 text-[1.0625rem] leading-[1.65] text-(--fg-muted)">
                <p>{item.a}</p>
                {item.link ? (
                  <Link href={item.link.href} className="group/l mt-4 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-petrol hover:text-teal">
                    {item.link.label}
                    <span aria-hidden="true" className="transition-transform duration-500 ease-premium group-hover/l:translate-x-1">
                      →
                    </span>
                  </Link>
                ) : null}
              </div>
              <span aria-hidden="true" className="absolute -bottom-px left-0 h-px w-0 bg-teal transition-[width] duration-700 ease-premium group-open:w-full" />
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
