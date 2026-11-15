"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";

import { AlertIcon, Spinner } from "@/components/documents/DocumentsIcons";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { SiteLink as Link } from "@/components/ui/SiteLink";
import { ENQUIRY_TYPES, LIMITS, validateEnquiry, type EnquiryErrors, type EnquiryType } from "@/lib/contact/enquiry";
import { cn } from "@/lib/cn";

type Values = { type: EnquiryType | ""; name: string; company: string; email: string; phone: string; message: string; consent: boolean };
const EMPTY: Values = { type: "", name: "", company: "", email: "", phone: "", message: "", consent: false };
type Status = "idle" | "sending" | "sent" | "error" | "unavailable";
const ORDER = ["type", "name", "email", "phone", "message", "consent"] as const;

/**
 * Enquiry form: the nature of the enquiry as selectable tiles, then underlined fields with
 * floating labels that draw a teal rule on focus, a message with a live character count and a
 * consent line. Validates on blur and on submit (focus moves to the first problem), protects
 * against bots (honeypot + time trap) and ends in a calm confirmation with a reference.
 */
export function EnquiryForm() {
  const uid = useId();
  const [v, setV] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState("");
  const [reference, setReference] = useState("");
  const startedAt = useRef(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status === "sent") doneRef.current?.focus();
  }, [status]);

  const errorsFor = (next: Values) => validateEnquiry({ ...next, type: next.type || undefined }).errors;

  const set = <K extends keyof Values>(k: K, value: Values[K]) => {
    const next = { ...v, [k]: value };
    setV(next);
    if (touched[k] || errors[k as keyof EnquiryErrors]) setErrors((e) => ({ ...e, [k]: errorsFor(next)[k as keyof EnquiryErrors] }));
  };
  const blur = (k: keyof Values) => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors((e) => ({ ...e, [k]: errorsFor(v)[k as keyof EnquiryErrors] }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    const found = errorsFor(v);
    setErrors(found);
    setTouched(Object.fromEntries(ORDER.map((k) => [k, true])));
    const first = ORDER.find((k) => found[k]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    setServerMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...v, website: honeypot.current?.value ?? "", startedAt: startedAt.current }),
        cache: "no-store",
      });
      const data = (await res.json().catch(() => ({}))) as { reference?: string; error?: string; fields?: EnquiryErrors };
      if (res.ok) {
        setReference(data.reference ?? "");
        setStatus("sent");
        return;
      }
      if (data.error === "not_configured") return setStatus("unavailable");
      if (data.error === "invalid" && data.fields) {
        setErrors(data.fields);
        setStatus("idle");
        return;
      }
      setServerMsg(
        data.error === "rate_limited"
          ? "You have sent several enquiries in a short time. Please try again a little later."
          : "We could not send your enquiry just now. Please try again in a moment.",
      );
      setStatus("error");
    } catch {
      setServerMsg("Connection problem. Please check your connection and try again.");
      setStatus("error");
    }
  };

  const reset = () => {
    setV(EMPTY);
    setErrors({});
    setTouched({});
    setReference("");
    setStatus("idle");
  };

  if (status === "sent") {
    const first = v.name.trim().split(/\s+/)[0];
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className="ct-form-done flex min-h-[32rem] flex-col items-start justify-center outline-none">
        <span className="relative grid size-16 place-items-center rounded-full bg-teal text-white">
          <span aria-hidden="true" className="docs-ring absolute inset-0 rounded-full border border-teal" />
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-8">
            <path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" pathLength={1} className="docs-check" />
          </svg>
        </span>
        <p className="text-eyebrow mt-9 text-teal">Enquiry sent{reference && reference !== "HI-RECEIVED" ? ` · ${reference}` : ""}</p>
        <h3 className="mt-4 font-display text-[clamp(2rem,1.5rem+1.6vw,3rem)] leading-[1.05] tracking-[-0.035em] text-obsidian">Thank you{first ? `, ${first}` : ""}.</h3>
        <p className="mt-4 max-w-[30rem] text-[1.0625rem] leading-[1.6] text-(--fg-muted)">
          Your enquiry has been received. A confirmation is on its way to <span className="font-medium text-obsidian [overflow-wrap:anywhere]">{v.email}</span>, and we will reply to you directly where appropriate.
        </p>
        <button type="button" onClick={reset} className="group mt-9 inline-flex items-center gap-3 border-b border-petrol/25 pb-1.5 text-[0.9375rem] font-medium text-petrol transition-colors hover:border-teal hover:text-teal">
          Send another enquiry
          <ArrowRightIcon className="transition-transform duration-500 ease-premium group-hover:translate-x-1" />
        </button>
      </div>
    );
  }

  const disabled = status === "sending";
  const msgLeft = LIMITS.message - v.message.length;

  return (
    <form ref={formRef} noValidate onSubmit={submit} aria-describedby={`${uid}-req`} className="relative">
      <fieldset disabled={disabled} className="contents">
        {/* Nature of enquiry */}
        <div role="radiogroup" aria-labelledby={`${uid}-type`} aria-describedby={errors.type ? `${uid}-type-err` : undefined} aria-invalid={errors.type ? true : undefined}>
          <p id={`${uid}-type`} className="text-eyebrow text-petrol">
            Nature of your enquiry <Req />
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            {ENQUIRY_TYPES.map((t, i) => {
              const on = v.type === t.id;
              return (
                <label key={t.id} className={cn("ct-chip group relative flex cursor-pointer select-none sm:block", on && "is-on")}>
                  <input
                    type="radio"
                    name="type"
                    value={t.id}
                    checked={on}
                    data-field={i === 0 ? "type" : undefined}
                    onChange={() => set("type", t.id)}
                    className="peer sr-only"
                  />
                  <span
                    className={cn(
                      "flex min-h-11 w-full items-center gap-2.5 border px-3.5 py-2 text-[0.875rem] leading-snug transition-[background-color,border-color,color] duration-400 sm:inline-flex sm:w-auto sm:px-4 sm:py-0 ease-premium",
                      "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-teal",
                      on ? "border-petrol bg-petrol text-white" : "border-petrol/18 text-obsidian/80 hover:border-petrol/50 hover:text-obsidian",
                    )}
                  >
                    <span aria-hidden="true" className={cn("grid size-3.5 shrink-0 place-items-center rounded-full border transition-colors duration-300", on ? "border-teal bg-teal" : "border-petrol/30")}>
                      <span className={cn("size-1.5 rounded-full bg-white transition-transform duration-300", on ? "scale-100" : "scale-0")} />
                    </span>
                    {t.label}
                  </span>
                </label>
              );
            })}
          </div>
          <p className="mt-3 min-h-[1.25rem] text-[0.8125rem] text-(--fg-muted)" aria-live="polite">
            {errors.type ? (
              <span id={`${uid}-type-err`} className="text-error">
                {errors.type}
              </span>
            ) : (
              (ENQUIRY_TYPES.find((t) => t.id === v.type)?.hint ?? "")
            )}
          </p>
        </div>

        <div className="mt-6 grid gap-x-8 gap-y-2 sm:grid-cols-2">
          <Field id={`${uid}-name`} name="name" label="Full name" required autoComplete="name" value={v.name} max={LIMITS.name} error={errors.name} onChange={(x) => set("name", x)} onBlur={() => blur("name")} />
          <Field id={`${uid}-company`} name="company" label="Company or organisation" autoComplete="organization" value={v.company} max={LIMITS.company} onChange={(x) => set("company", x)} onBlur={() => blur("company")} />
          <Field id={`${uid}-email`} name="email" type="email" label="Email address" required autoComplete="email" value={v.email} max={LIMITS.email} error={errors.email} onChange={(x) => set("email", x)} onBlur={() => blur("email")} />
          <Field id={`${uid}-phone`} name="phone" type="tel" label="Telephone (optional)" autoComplete="tel" value={v.phone} max={LIMITS.phone} error={errors.phone} onChange={(x) => set("phone", x)} onBlur={() => blur("phone")} />
        </div>

        <Field
          id={`${uid}-message`}
          name="message"
          label="Your message"
          required
          multiline
          value={v.message}
          max={LIMITS.message}
          error={errors.message}
          onChange={(x) => set("message", x)}
          onBlur={() => blur("message")}
          aside={<span className={cn("tabular-nums transition-colors", msgLeft < 200 ? "text-teal" : "")}>{v.message.length.toLocaleString("en-GB")} / {LIMITS.message.toLocaleString("en-GB")}</span>}
        />

        {/* Honeypot */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Website
            <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
          </label>
        </div>

        <div className="mt-7">
          <label className="group flex cursor-pointer items-start gap-3.5 text-[0.875rem] leading-[1.55] text-(--fg-muted)">
            <input
              type="checkbox"
              data-field="consent"
              checked={v.consent}
              onChange={(e) => set("consent", e.target.checked)}
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? `${uid}-consent-err` : undefined}
              className="peer sr-only"
            />
            <span
              aria-hidden="true"
              className={cn(
                "mt-0.5 grid size-5 shrink-0 place-items-center border transition-colors duration-300 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-teal",
                v.consent ? "border-petrol bg-petrol text-white" : errors.consent ? "border-error" : "border-petrol/30 group-hover:border-petrol/60",
              )}
            >
              <svg viewBox="0 0 24 24" className={cn("size-3.5 transition-transform duration-300 ease-premium", v.consent ? "scale-100" : "scale-0")} fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
            </span>
            <span>
              I agree that HAGER INVESTMENT may use the details I provide to respond to this enquiry, as described in the{" "}
              <Link href="/privacy-policy" className="text-petrol underline decoration-petrol/30 underline-offset-[3px] hover:decoration-teal">
                Privacy Policy
              </Link>
              . <Req />
            </span>
          </label>
          {errors.consent ? <ErrorText id={`${uid}-consent-err`}>{errors.consent}</ErrorText> : null}
        </div>

        <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p id={`${uid}-req`} className="text-[0.8125rem] text-(--fg-muted)">
            <Req /> Required fields
          </p>
          <button
            type="submit"
            className="docs-sheen group/btn relative inline-flex min-h-14 items-center justify-between gap-10 overflow-hidden bg-petrol py-1.5 pr-1.5 pl-7 text-[0.9375rem] font-medium tracking-[0.02em] text-white transition-colors duration-500 ease-premium hover:bg-obsidian focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-teal disabled:cursor-wait"
          >
            <span>{disabled ? "Sending enquiry…" : "Send Enquiry"}</span>
            <span aria-hidden="true" className="grid size-11 place-items-center rounded-full bg-teal transition-colors duration-500 group-hover/btn:bg-white group-hover/btn:text-obsidian">
              {disabled ? <Spinner className="size-4" /> : <ArrowRightIcon className="transition-transform duration-500 ease-premium group-hover/btn:-rotate-45" />}
            </span>
          </button>
        </div>

        <div aria-live="assertive">
          {status === "error" ? (
            <p className="docs-error mt-6 flex items-start gap-2.5 border-l-2 border-error bg-error/[0.04] px-4 py-3 text-[0.875rem] text-error">
              <AlertIcon className="mt-0.5 size-4 shrink-0" />
              {serverMsg}
            </p>
          ) : null}
          {status === "unavailable" ? (
            <p className="docs-error mt-6 flex items-start gap-2.5 border-l-2 border-teal bg-platinum/50 px-4 py-3 text-[0.875rem] text-petrol">
              <AlertIcon className="mt-0.5 size-4 shrink-0" />
              Our enquiry service is temporarily unavailable. Please try again later.
            </p>
          ) : null}
        </div>
      </fieldset>
    </form>
  );
}

function Req() {
  return (
    <span aria-hidden="true" className="text-teal">
      *
    </span>
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="docs-error mt-2 flex items-start gap-2 text-[0.8125rem] leading-[1.45] text-error">
      <AlertIcon className="mt-px size-3.5 shrink-0" />
      {children}
    </p>
  );
}

function Field({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  required,
  type = "text",
  autoComplete,
  multiline,
  max,
  aside,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
  max: number;
  aside?: ReactNode;
}) {
  const shared = {
    id,
    name,
    "data-field": name,
    value,
    maxLength: max,
    placeholder: " ",
    required,
    "aria-required": required || undefined,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-err` : undefined,
    onBlur,
    className: cn(
      "peer block w-full bg-transparent pt-7 pb-2.5 text-[1.0625rem] text-obsidian outline-none placeholder:text-transparent",
      multiline && "min-h-[9.5rem] resize-y leading-[1.6]",
    ),
  };
  return (
    <div className={cn("ct-field group relative", multiline && "mt-4")}>
      <div className={cn("relative border-b transition-colors duration-300", error ? "border-error/70" : "border-petrol/20 hover:border-petrol/45")}>
        {multiline ? (
          <textarea {...shared} rows={5} onChange={(e) => onChange(e.target.value)} />
        ) : (
          <input {...shared} type={type} autoComplete={autoComplete} spellCheck={type === "email" ? false : undefined} onChange={(e) => onChange(e.target.value)} />
        )}
        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute top-6 left-0 origin-left text-[1.0625rem] transition-[transform,color] duration-400 ease-premium",
            "peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.76] peer-focus:text-teal peer-[:not(:placeholder-shown)]:-translate-y-[1.15rem] peer-[:not(:placeholder-shown)]:scale-[0.76]",
            error ? "text-error" : "text-obsidian/50",
          )}
        >
          {label}
          {required ? <span className="text-teal"> *</span> : null}
        </label>
        <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-teal transition-transform duration-700 ease-premium peer-focus:scale-x-100" />
      </div>
      <div className="flex min-h-[1.75rem] items-start justify-between gap-4">
        {error ? <ErrorText id={`${id}-err`}>{error}</ErrorText> : <span />}
        {aside ? <span className="mt-2 text-[0.75rem] text-(--fg-muted)">{aside}</span> : null}
      </div>
    </div>
  );
}
