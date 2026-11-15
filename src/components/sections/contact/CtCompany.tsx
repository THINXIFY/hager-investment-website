import { RequestDocumentsButton } from "@/components/documents/RequestDocumentsButton";
import { LockDocIcon } from "@/components/documents/DocumentsIcons";
import { CopyButton } from "@/components/ui/CopyButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SiteLink as Link } from "@/components/ui/SiteLink";
import { ctCompany } from "@/content/contact";

/**
 * Company Information (Warm Porcelain): a corporate register of verified facts on fine rules
 * (identifiers with copy actions), beside an Imperial Petrol panel for requesting the private
 * corporate documents.
 */
export function CtCompany() {
  const { documents } = ctCompany;
  return (
    <section id="company" aria-labelledby="ct-company-title" className="tone-porcelain scroll-mt-(--header-h) bg-porcelain py-[clamp(4rem,8vw,6.5rem)]">
      <div className="container-site grid grid-cols-12 gap-x-col gap-y-10">
        <div className="col-span-12 lg:col-span-7">
          <Eyebrow data-reveal="" className="mb-7">
            {ctCompany.eyebrow}
          </Eyebrow>
          <h2 id="ct-company-title" data-split="" className="font-display text-[clamp(2.25rem,1.4rem+2.6vw,3.5rem)] leading-[1.02] font-normal tracking-[-0.045em] text-obsidian">
            {ctCompany.title}
          </h2>
          <dl data-seq-group="0.07" className="mt-10 border-t border-(--line)">
            {ctCompany.facts.map((f) => (
              <div key={f.term} data-seq="" className="group relative grid gap-1 border-b border-(--line) py-5 sm:grid-cols-[minmax(0,15rem)_1fr_auto] sm:items-center sm:gap-6">
                <span aria-hidden="true" className="absolute -bottom-px left-0 h-px w-0 bg-teal transition-[width] duration-700 ease-premium group-hover:w-full" />
                <dt className="text-eyebrow text-[0.6875rem] text-(--fg-subtle)">{f.term}</dt>
                <dd className="font-display text-[clamp(1.25rem,1.1rem+0.5vw,1.5rem)] leading-[1.25] tracking-[-0.02em] text-obsidian [overflow-wrap:anywhere]">{f.value}</dd>
                <dd className="sm:justify-self-end">{f.copy ? <CopyButton value={f.copy} label="Copy" ariaLabel={`Copy ${f.term}`} className="text-petrol/70 hover:text-petrol" /> : null}</dd>
              </div>
            ))}
          </dl>
          <p data-reveal="" className="mt-6 text-[0.875rem] text-(--fg-muted)">
            Full corporate details are available in our{" "}
            <Link href="/legal-notice" className="text-petrol underline decoration-petrol/30 underline-offset-[3px] hover:decoration-teal">
              Legal Notice
            </Link>
            .
          </p>
        </div>

        <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:pt-[4.25rem]">
          <div data-reveal="" className="tone-petrol relative isolate flex h-full flex-col overflow-hidden bg-petrol p-[clamp(1.75rem,3vw,2.5rem)] text-white">
            <span aria-hidden="true" className="ct-doc-glow pointer-events-none absolute -right-24 -bottom-24 -z-10 size-72 rounded-full bg-[radial-gradient(circle,rgb(17_123_137/0.5),transparent_65%)]" />
            <span className="grid size-14 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-silver">
              <LockDocIcon className="size-6" />
            </span>
            <p className="text-eyebrow mt-8 text-[0.6875rem] text-silver">{documents.eyebrow}</p>
            <h3 className="mt-3 font-display text-[clamp(1.625rem,1.3rem+1vw,2.125rem)] leading-[1.1] tracking-[-0.03em]">{documents.title}</h3>
            <p className="mt-4 text-white/70">{documents.body}</p>
            <ul className="mt-6 grid gap-2 text-[0.8125rem] text-white/60">
              <li className="flex items-center gap-2.5">
                <span aria-hidden="true" className="size-1 rounded-full bg-teal" /> Single-use verification code
              </li>
              <li className="flex items-center gap-2.5">
                <span aria-hidden="true" className="size-1 rounded-full bg-teal" /> Delivered only to the verified address
              </li>
            </ul>
            <div className="mt-auto pt-9">
              <RequestDocumentsButton variant="light" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
