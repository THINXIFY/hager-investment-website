import { CopyButton } from "@/components/ui/CopyButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { contactDetails, ctEnquiry, mapsHref, officeAddress } from "@/content/contact";

import { EnquiryForm } from "./EnquiryForm";

const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

/**
 * Send an Enquiry (White): the page's working heart. Left, a sticky Imperial Petrol "desk" with
 * the heading, the confirmed contact points (registered office always; email and telephone once
 * confirmed) and what happens after sending. Right, the enquiry form on a quiet porcelain sheet.
 */
export function CtEnquiry() {
  const { email, phone } = contactDetails;
  return (
    <section id="enquiry" aria-labelledby="ct-enquiry-title" className="tone-white relative scroll-mt-(--header-h) bg-white py-[clamp(4rem,8vw,7rem)]">
      <div className="container-site grid grid-cols-12 gap-x-col gap-y-10">
        {/* Desk */}
        <aside className="col-span-12 lg:col-span-5 xl:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <Eyebrow data-reveal="" className="mb-7">
              {ctEnquiry.eyebrow}
            </Eyebrow>
            <h2 id="ct-enquiry-title" data-split="" className="font-display text-[clamp(2.375rem,1.4rem+3vw,4rem)] leading-[1] font-normal tracking-[-0.045em] text-obsidian">
              {ctEnquiry.title}
            </h2>
            <p data-reveal="" className="text-lede mt-6 max-w-[28rem] text-(--fg-muted)">
              {ctEnquiry.intro}
            </p>

            <div data-reveal="" className="tone-petrol relative mt-10 overflow-hidden bg-petrol p-[clamp(1.5rem,3vw,2.25rem)] text-white">
              <span aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-[radial-gradient(circle,rgb(17_123_137/0.45),transparent_65%)]" />
              <p className="text-eyebrow relative flex items-center gap-3 text-[0.6875rem] text-silver">
                <span aria-hidden="true" className="h-px w-6 bg-teal" />
                Contact Details
              </p>
              <dl className="relative mt-5 grid gap-5">
                <div>
                  <dt className="text-[0.75rem] tracking-[0.12em] text-white/60 uppercase">Registered Office</dt>
                  <dd className="mt-2">
                    <address className="font-display text-[1.25rem] leading-[1.35] tracking-[-0.015em] not-italic">
                      {officeAddress.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                    </address>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[0.8125rem]">
                      <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-white/80 transition-colors hover:text-white">
                        Open in Maps <span aria-hidden="true" className="text-teal transition-transform duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                      <CopyButton value={officeAddress.join(", ")} label="Copy address" ariaLabel="Copy registered office address" className="text-white/80 hover:text-white data-[state=copied]:text-silver" />
                    </div>
                  </dd>
                </div>
                {email ? (
                  <div className="border-t border-white/12 pt-5">
                    <dt className="text-[0.75rem] tracking-[0.12em] text-white/60 uppercase">Email</dt>
                    <dd className="mt-2 flex flex-wrap items-center justify-between gap-3">
                      <a href={`mailto:${email}`} className="font-display text-[1.25rem] tracking-[-0.015em] [overflow-wrap:anywhere] hover:text-silver">
                        {email}
                      </a>
                      <CopyButton value={email} label="Copy" ariaLabel="Copy email address" className="text-white/80 hover:text-white" />
                    </dd>
                  </div>
                ) : null}
                {phone ? (
                  <div className="border-t border-white/12 pt-5">
                    <dt className="text-[0.75rem] tracking-[0.12em] text-white/60 uppercase">Telephone</dt>
                    <dd className="mt-2">
                      <a href={telHref(phone)} className="font-display text-[1.25rem] tracking-[-0.015em] hover:text-silver">
                        {phone}
                      </a>
                    </dd>
                  </div>
                ) : null}
              </dl>
            </div>

            <ol data-seq-group="0.1" className="mt-10 grid gap-0">
              {ctEnquiry.next.map((s, i) => (
                <li key={s.name} data-seq="" className="relative flex gap-5 pb-6 last:pb-0">
                  {i < ctEnquiry.next.length - 1 ? <span aria-hidden="true" className="absolute top-9 bottom-1 left-[0.9375rem] w-px bg-petrol/15" /> : null}
                  <span className="grid size-[1.875rem] shrink-0 place-items-center rounded-full border border-petrol/25 font-display text-[0.875rem] text-petrol">{i + 1}</span>
                  <span className="pt-0.5">
                    <span className="block font-medium text-obsidian">{s.name}</span>
                    <span className="mt-0.5 block text-[0.9375rem] text-(--fg-muted)">{s.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </aside>

        {/* Form sheet */}
        <div className="col-span-12 lg:col-span-7 xl:col-span-7 xl:col-start-6">
          <div data-reveal="" className="relative border border-petrol/10 bg-porcelain p-[clamp(1.5rem,4vw,3.25rem)]">
            <span aria-hidden="true" className="absolute top-0 left-0 h-[2px] w-24 bg-teal" />
            <div className="mb-9 flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="font-display text-[clamp(1.5rem,1.25rem+0.8vw,2rem)] leading-[1.1] tracking-[-0.03em] text-obsidian">Enquiry Form</h3>
              <p className="text-[0.8125rem] text-(--fg-muted)">Takes about two minutes</p>
            </div>
            <EnquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}
