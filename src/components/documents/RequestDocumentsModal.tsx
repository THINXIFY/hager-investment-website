"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";

import { ArrowRightIcon } from "@/components/ui/Icons";
import { SiteLink as Link } from "@/components/ui/SiteLink";
import { cn } from "@/lib/cn";

import { AlertIcon, ArrowLeftSmall, CheckIcon, CloseIcon, KeyIcon, LockDocIcon, MailIcon, ShieldIcon, Spinner } from "./DocumentsIcons";
import { OtpCodeInput } from "./OtpCodeInput";

type View = "email" | "otp" | "success" | "failure" | "unavailable";
type Busy = null | "sending" | "verifying" | "resending" | "retrying";

interface ApiResult {
  ok: boolean;
  status: number;
  data: Record<string, unknown>;
  retryAfter: number;
}

async function post(path: string, body: Record<string, unknown>): Promise<ApiResult> {
  try {
    const res = await fetch(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), cache: "no-store" });
    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    return { ok: res.ok, status: res.status, data, retryAfter: Number(res.headers.get("Retry-After")) || 0 };
  } catch {
    return { ok: false, status: 0, data: { error: "network" }, retryAfter: 0 };
  }
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const waitText = (sec: number) => (sec >= 90 ? `${Math.ceil(sec / 60)} minutes` : `${Math.max(sec, 1)} seconds`);

function messageFor(error: unknown, retryAfter = 0): string {
  switch (error) {
    case "invalid_email":
      return "Please enter a valid email address.";
    case "rate_limited":
      return retryAfter ? `Too many requests. Please try again in ${waitText(retryAfter)}.` : "Too many requests. Please wait a moment and try again.";
    case "mail_failure":
      return "We could not send the email just now. Please try again shortly.";
    case "expired":
      return "This code has expired. Send a new code to continue.";
    case "too_many_attempts":
      return "Too many incorrect attempts. For your security, please request a new code.";
    case "not_found":
      return "This request is no longer valid. Please send a new code.";
    case "network":
      return "Connection problem. Please check your connection and try again.";
    default:
      return "Something went wrong. Please try again.";
  }
}

const STEPS = [
  { n: 1, label: "Email" },
  { n: 2, label: "Verify" },
  { n: 3, label: "Receive" },
] as const;

const stepOf = (view: View) => (view === "email" ? 1 : view === "otp" ? 2 : view === "unavailable" ? 0 : view === "success" ? 4 : 3);

/** Hide the page from assistive tech and lock scrolling (with scrollbar compensation) while open. */
function useDialogEnvironment() {
  useLayoutEffect(() => {
    const html = document.documentElement;
    const gap = window.innerWidth - html.clientWidth;
    const prev = { overflow: html.style.overflow, pad: document.body.style.paddingRight };
    html.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;
    const siblings = [...document.body.children].filter((el) => !el.hasAttribute("data-docs-portal") && !el.hasAttribute("inert"));
    siblings.forEach((el) => el.setAttribute("inert", ""));
    return () => {
      html.style.overflow = prev.overflow;
      document.body.style.paddingRight = prev.pad;
      siblings.forEach((el) => el.removeAttribute("inert"));
    };
  }, []);
}

/**
 * Request Private Documents: a compact, single-card dialog. A Petrol header carries the wordmark
 * and a three-step progress line under a slowly drifting light; an emblem on its edge changes with
 * each step; below, one short task at a time (email → six-digit code → confirmation). Server rules
 * (rate limits, expiry, attempts, delivery retries) are explained in plain language. Accessible:
 * labelled modal, focus trap, Escape, focus restored, live status, reduced motion respected.
 */
export function RequestDocumentsModal({ onClose }: { onClose: () => void }) {
  const uid = useId();
  const titleId = `${uid}-title`;
  const descId = `${uid}-desc`;
  const errorId = `${uid}-error`;
  const dialogRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const [view, setView] = useState<View>("email");
  const [busy, setBusy] = useState<Busy>(null);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [requestId, setRequestId] = useState("");
  const [error, setError] = useState("");
  const [codeError, setCodeError] = useState<{ text: string; restart?: boolean } | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const [notice, setNotice] = useState("");

  useDialogEnvironment();

  // Resend cooldown ticker.
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = window.setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => window.clearTimeout(t);
  }, [cooldown]);

  const close = useCallback(() => {
    if (busy === "verifying" || busy === "retrying") return; // never abandon a delivery mid-flight
    onClose();
  }, [busy, onClose]);

  // Escape + focus trap.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const items = [...dialogRef.current.querySelectorAll<HTMLElement>("a[href],button:not([disabled]),input:not([disabled]):not([tabindex='-1'])")].filter((el) => el.offsetParent !== null || el === document.activeElement);
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && (document.activeElement === first || !dialogRef.current.contains(document.activeElement))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close]);

  // Move focus to the primary control of each view.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const root = dialogRef.current;
      if (!root) return;
      if (view === "email") emailRef.current?.focus();
      else if (view === "otp") root.querySelector<HTMLInputElement>("[data-otp-digit='0']")?.focus();
      else root.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [view]);

  /* ------------------------------- actions ------------------------------- */

  const sendCode = async (e?: FormEvent) => {
    e?.preventDefault();
    if (busy) return;
    const value = email.trim();
    if (!EMAIL_PATTERN.test(value)) {
      setError("Please enter a valid email address.");
      emailRef.current?.focus();
      return;
    }
    setError("");
    setCodeError(null);
    setBusy(view === "otp" ? "resending" : "sending");
    const r = await post("/api/request-documents/start", { email: value, website: honeypotRef.current?.value ?? "" });
    setBusy(null);
    if (r.ok && typeof r.data.requestId === "string") {
      setRequestId(r.data.requestId);
      setCode("");
      setCooldown(Number(r.data.cooldownSeconds) || 60);
      setNotice(`A verification code has been sent to ${value}.`);
      setView("otp");
      return;
    }
    if (r.data.error === "not_configured" || r.data.error === "documents_unavailable") {
      setView("unavailable");
      return;
    }
    const msg = messageFor(r.data.error, r.retryAfter);
    if (view === "otp") setCodeError({ text: msg, restart: true });
    else setError(msg);
  };

  const resend = async () => {
    if (busy || cooldown > 0) return;
    setCodeError(null);
    setBusy("resending");
    const r = await post("/api/request-documents/resend", { requestId });
    setBusy(null);
    if (r.ok) {
      setCode("");
      setCooldown(Number(r.data.cooldownSeconds) || 60);
      setNotice(`A new code has been sent to ${email.trim()}. Earlier codes no longer work.`);
      dialogRef.current?.querySelector<HTMLInputElement>("[data-otp-digit='0']")?.focus();
      return;
    }
    if (r.data.error === "not_configured") return setView("unavailable");
    if (r.data.error === "rate_limited" && r.retryAfter && r.retryAfter <= 120) setCooldown(r.retryAfter);
    setCodeError({ text: messageFor(r.data.error, r.retryAfter), restart: r.data.error === "not_found" });
  };

  const verify = useCallback(
    async (value: string, mode: "verifying" | "retrying" = "verifying") => {
      if (busy && mode === "verifying") return;
      if (!/^\d{6}$/.test(value)) {
        setCodeError({ text: "Enter all six digits of the code." });
        return;
      }
      setCodeError(null);
      setBusy(mode);
      let r = await post("/api/request-documents/verify", { requestId, code: value });
      // Delivery already under way from another tab or a double submit: give it a moment, then ask again.
      for (let i = 0; i < 4 && r.data.error === "in_progress"; i++) {
        await new Promise((res) => setTimeout(res, 2500));
        r = await post("/api/request-documents/verify", { requestId, code: value });
      }
      setBusy(null);
      if (r.ok && r.data.status === "sent") {
        setNotice("Verified. Your documents have been sent.");
        return setView("success");
      }
      if (r.ok && r.data.status === "failed") return setView("failure");
      if (r.data.error === "not_configured") return setView("unavailable");
      if (r.data.error === "invalid_code") {
        const left = Number(r.data.attemptsLeft);
        setCode("");
        setCodeError({ text: `That code is not correct.${left ? ` ${left} attempt${left === 1 ? "" : "s"} remaining.` : ""}` });
        dialogRef.current?.querySelector<HTMLInputElement>("[data-otp-digit='0']")?.focus();
        return;
      }
      if (mode === "retrying") return setView("failure");
      setCodeError({ text: messageFor(r.data.error, r.retryAfter), restart: ["expired", "too_many_attempts", "not_found"].includes(String(r.data.error)) });
    },
    [busy, requestId],
  );

  const onCodeChange = (value: string) => {
    setCode(value);
    if (codeError && !codeError.restart) setCodeError(null);
    if (value.length === 6 && !busy) void verify(value);
  };

  const changeEmail = () => {
    setView("email");
    setCode("");
    setCodeError(null);
    setNotice("");
  };

  /* -------------------------------- render -------------------------------- */

  const step = stepOf(view);
  const locked = busy === "verifying" || busy === "retrying";
  const shown = email.trim();

  const dialog = (
    <div data-docs-portal="" data-lenis-prevent="" className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-6">
      <div aria-hidden="true" onClick={close} className="docs-overlay absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(16,44,53,0.72),rgba(9,11,13,0.9))] backdrop-blur-[8px]" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="docs-dialog relative flex max-h-[94dvh] w-full max-w-[30rem] flex-col overflow-hidden bg-white shadow-[0_50px_140px_-40px_rgba(0,0,0,0.75),0_0_0_1px_rgba(255,255,255,0.06)] sm:max-h-[calc(100dvh-3rem)]"
      >
        <Header step={step} onClose={close} locked={locked} />
        <div className="relative z-10 flex h-0 justify-center">
          <Medallion key={view} view={view} />
        </div>

        <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div key={view} className="docs-stagger flex flex-col items-center px-[clamp(1.5rem,6vw,2.75rem)] pt-[3.25rem] pb-[clamp(1.75rem,5vw,2.5rem)] text-center">

            {view === "email" ? (
              <form noValidate onSubmit={sendCode} className="contents">
                <Title id={titleId}>Request documents</Title>
                <Lead id={descId}>Enter your email to receive a one-time code. Once verified, the documents arrive in your inbox.</Lead>

                <div className="docs-item mt-7 w-full text-left">
                  <label htmlFor={`${uid}-email`} className="text-eyebrow block text-[0.6875rem] text-petrol/70">
                    Email address
                  </label>
                  <div className={cn("docs-field group relative mt-2.5 flex items-center gap-3 border bg-porcelain/70 px-4 transition-[border-color,background-color,box-shadow] duration-500 ease-premium focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(17,123,137,0.1)]", error ? "border-error/70" : "border-petrol/15 focus-within:border-teal")}>
                    <MailIcon className={cn("size-[1.125rem] shrink-0 transition-colors duration-300", error ? "text-error" : "text-petrol/40 group-focus-within:text-teal")} />
                    <input
                      ref={emailRef}
                      id={`${uid}-email`}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      spellCheck={false}
                      autoCapitalize="none"
                      required
                      maxLength={254}
                      placeholder="name@company.com"
                      value={email}
                      disabled={busy === "sending"}
                      aria-invalid={error ? true : undefined}
                      aria-describedby={error ? errorId : undefined}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                      }}
                      className="h-[3.25rem] min-w-0 flex-1 bg-transparent text-[1rem] text-obsidian outline-none placeholder:text-obsidian/30 disabled:opacity-60"
                    />
                    <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-teal transition-transform duration-700 ease-premium group-focus-within:scale-x-100" />
                  </div>
                  {error ? <ErrorLine id={errorId}>{error}</ErrorLine> : null}
                </div>

                {/* Honeypot: invisible to people, tempting to bots. */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label>
                    Website
                    <input ref={honeypotRef} type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
                  </label>
                </div>

                <div className="docs-item mt-6 w-full">
                  <PrimaryButton type="submit" busy={busy === "sending"} busyLabel="Sending code…">
                    Send code
                  </PrimaryButton>
                </div>
                <p className="docs-item mt-5 text-[0.75rem] leading-[1.5] text-obsidian/50">
                  Used only to deliver these documents ·{" "}
                  <Link href="/privacy-policy" className="text-petrol/80 underline decoration-petrol/25 underline-offset-[3px] transition-colors hover:text-teal hover:decoration-teal">
                    Privacy Policy
                  </Link>
                </p>
              </form>
            ) : null}

            {view === "otp" ? (
              <form
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  void verify(code);
                }}
                className="contents"
              >
                <Title id={titleId}>Enter your code</Title>
                <p id={descId} className="docs-item mt-3 text-[0.9375rem] leading-[1.55] text-obsidian/65">
                  Sent to <span className="font-medium text-obsidian [overflow-wrap:anywhere]">{shown}</span>
                  <button type="button" onClick={changeEmail} disabled={locked} className="ml-2 inline-flex items-center gap-1 align-baseline text-[0.8125rem] font-medium text-teal underline-offset-[3px] hover:underline disabled:opacity-40">
                    <ArrowLeftSmall className="size-3" /> Change
                  </button>
                </p>

                <div className="docs-item mt-7 w-full">
                  <OtpCodeInput value={code} onChange={onCodeChange} disabled={locked} invalid={Boolean(codeError)} describedBy={codeError ? errorId : `${uid}-code-hint`} />
                </div>

                <div className="docs-item min-h-[1.5rem] w-full text-left">
                  {codeError ? (
                    <ErrorLine id={errorId}>
                      {codeError.text}
                      {codeError.restart ? (
                        <>
                          {" "}
                          <button type="button" onClick={() => void sendCode()} disabled={Boolean(busy)} className="font-medium text-petrol underline underline-offset-[3px] hover:text-teal disabled:opacity-50">
                            Send a new code
                          </button>
                        </>
                      ) : null}
                    </ErrorLine>
                  ) : (
                    <p id={`${uid}-code-hint`} className="mt-3 text-center text-[0.75rem] leading-[1.5] text-obsidian/45">
                      Single-use · valid for a limited time
                    </p>
                  )}
                </div>

                <div className="docs-item mt-5 w-full">
                  <PrimaryButton type="submit" busy={locked} busyLabel="Verifying…" disabled={code.length < 6}>
                    Verify &amp; receive
                  </PrimaryButton>
                </div>
                <p className="docs-item mt-5 text-[0.8125rem] text-obsidian/50">
                  {cooldown > 0 ? (
                    <span className="tabular-nums">Resend available in 0:{String(cooldown).padStart(2, "0")}</span>
                  ) : (
                    <>
                      Didn&rsquo;t receive it?{" "}
                      <button type="button" onClick={() => void resend()} disabled={Boolean(busy)} className="inline-flex items-center gap-1.5 font-medium text-petrol underline-offset-[3px] hover:text-teal hover:underline disabled:opacity-50">
                        {busy === "resending" ? <Spinner className="size-3.5" /> : null}
                        Resend code
                      </button>
                    </>
                  )}
                </p>
              </form>
            ) : null}

            {view === "success" ? (
              <>
                <Title id={titleId}>Documents sent</Title>
                <Lead id={descId}>
                  They are on their way to <span className="font-medium text-obsidian [overflow-wrap:anywhere]">{shown}</span>. If they are not in your inbox within a few minutes, please check your spam folder.
                </Lead>
                <p className="docs-item mt-6 inline-flex items-center gap-2 border-y border-petrol/10 px-1 py-3 text-[0.75rem] tracking-[0.04em] text-obsidian/55">
                  <ShieldIcon className="size-4 text-teal" /> Confidential to you as the recipient
                </p>
                <div className="docs-item mt-6 w-full">
                  <PrimaryButton autoFocusMark onClick={onClose} plain>
                    Done
                  </PrimaryButton>
                </div>
              </>
            ) : null}

            {view === "failure" ? (
              <>
                <Title id={titleId}>Delivery did not complete</Title>
                <Lead id={descId}>Your email is verified, but the documents could not be sent. Please try again; no new code is needed.</Lead>
                <div className="docs-item mt-7 grid w-full gap-2.5">
                  <PrimaryButton autoFocusMark onClick={() => void verify(code, "retrying")} busy={busy === "retrying"} busyLabel="Sending again…" plain>
                    Try again
                  </PrimaryButton>
                  <GhostButton onClick={close} disabled={busy === "retrying"}>
                    Close
                  </GhostButton>
                </div>
              </>
            ) : null}

            {view === "unavailable" ? (
              <>
                <Title id={titleId}>Temporarily unavailable</Title>
                <Lead id={descId}>Documents cannot be requested online at the moment. Please contact HAGER INVESTMENT and we will assist you directly.</Lead>
                <div className="docs-item mt-7 grid w-full gap-2.5">
                  <Link data-autofocus="" href="/contact#enquiry" onClick={onClose} className="docs-sheen relative inline-flex min-h-[3.25rem] items-center justify-center overflow-hidden bg-petrol px-6 text-[0.9375rem] font-medium tracking-[0.02em] text-white transition-colors duration-500 hover:bg-obsidian">
                    Contact us
                  </Link>
                  <GhostButton onClick={onClose}>Close</GhostButton>
                </div>
              </>
            ) : null}
          </div>
        </div>

        <p aria-live="polite" role="status" className="sr-only">
          {busy === "sending" ? "Sending verification code." : busy === "verifying" ? "Verifying code and sending documents." : notice}
        </p>
      </div>
    </div>
  );

  // Rendered only after a click, so document is always available here.
  return createPortal(dialog, document.body);
}

/* ------------------------------ sub-components ------------------------------ */

function Title({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="docs-item font-display text-[clamp(1.625rem,1.3rem+1vw,2rem)] leading-[1.1] tracking-[-0.03em] text-obsidian">
      {children}
    </h2>
  );
}

function Lead({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="docs-item mt-3 max-w-[24rem] text-[0.9375rem] leading-[1.6] text-obsidian/65">
      {children}
    </p>
  );
}

function ErrorLine({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} role="alert" className="docs-error mt-3 flex items-start gap-2 text-[0.8125rem] leading-[1.45] text-error">
      <AlertIcon className="mt-px size-4 shrink-0" />
      <span>{children}</span>
    </p>
  );
}

function PrimaryButton({
  children,
  busy = false,
  busyLabel,
  plain = false,
  autoFocusMark = false,
  disabled,
  type = "button",
  onClick,
}: {
  children: ReactNode;
  busy?: boolean;
  busyLabel?: string;
  plain?: boolean;
  autoFocusMark?: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={busy || disabled}
      data-autofocus={autoFocusMark ? "" : undefined}
      data-busy={busy || undefined}
      className={cn(
        "docs-sheen group/btn relative flex min-h-[3.25rem] w-full items-center overflow-hidden bg-petrol text-[0.9375rem] font-medium tracking-[0.02em] text-white",
        "transition-[background-color,opacity] duration-500 ease-premium hover:bg-obsidian focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-teal",
        "disabled:cursor-not-allowed disabled:opacity-70 data-[busy]:cursor-wait data-[busy]:opacity-100",
        plain || busy ? "justify-center px-6" : "justify-between py-1.5 pr-1.5 pl-6",
      )}
    >
      {busy ? (
        <span className="flex items-center gap-3">
          <Spinner className="size-4" /> {busyLabel}
        </span>
      ) : (
        <>
          <span>{children}</span>
          {plain ? null : (
            <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-teal transition-[background-color,color] duration-500 ease-premium group-hover/btn:bg-white group-hover/btn:text-obsidian">
              <ArrowRightIcon className="transition-transform duration-500 ease-premium group-hover/btn:-rotate-45" />
            </span>
          )}
        </>
      )}
    </button>
  );
}

function GhostButton({ children, onClick, disabled }: { children: ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className="min-h-12 w-full border border-petrol/15 text-[0.9375rem] font-medium text-petrol transition-colors duration-500 hover:border-petrol/40 hover:bg-porcelain disabled:opacity-40">
      {children}
    </button>
  );
}

const MEDALLION: Record<View, { icon: (p: { className?: string }) => ReactNode; tone: string }> = {
  email: { icon: MailIcon, tone: "bg-white text-petrol" },
  otp: { icon: KeyIcon, tone: "bg-white text-petrol" },
  success: { icon: () => null, tone: "bg-teal text-white" },
  failure: { icon: AlertIcon, tone: "bg-white text-error" },
  unavailable: { icon: LockDocIcon, tone: "bg-white text-petrol" },
};

/** The emblem straddling the header edge: changes with each step; on success it draws a check. */
function Medallion({ view }: { view: View }) {
  const { icon: Icon, tone } = MEDALLION[view];
  return (
    <span className="relative grid size-[4.5rem] -translate-y-1/2 place-items-center">
      <span aria-hidden="true" className="docs-orbit absolute -inset-2 rounded-full border border-dashed border-teal/35" />
      {view === "success" ? (
        <>
          <span aria-hidden="true" className="docs-ring absolute inset-0 rounded-full border border-teal" />
          <span aria-hidden="true" className="docs-ring docs-ring-late absolute inset-0 rounded-full border border-teal" />
        </>
      ) : null}
      <span className={cn("docs-pop relative grid size-full place-items-center rounded-full shadow-[0_14px_34px_-12px_rgba(16,44,53,0.45),0_0_0_1px_rgba(16,44,53,0.08)]", tone)}>
        {view === "success" ? (
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-8">
            <path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" pathLength={1} className="docs-check" />
          </svg>
        ) : (
          <Icon className="size-7" />
        )}
      </span>
    </span>
  );
}

/** Petrol header: wordmark, close, and the three-step progress line under a slowly drifting light. */
function Header({ step, onClose, locked }: { step: number; onClose: () => void; locked: boolean }) {
  const fill = step === 0 ? 0 : Math.min(step, 3) / 3;
  return (
    <div className="relative isolate shrink-0 overflow-hidden bg-petrol px-[clamp(1.5rem,6vw,2.75rem)] pt-5 pb-14 text-white">
      <span aria-hidden="true" className="docs-aurora pointer-events-none absolute -top-24 -left-16 -z-10 size-72 rounded-full bg-[radial-gradient(circle,rgba(17,123,137,0.7),transparent_65%)] blur-xl" />
      <span aria-hidden="true" className="docs-aurora-alt pointer-events-none absolute -right-20 -bottom-32 -z-10 size-72 rounded-full bg-[radial-gradient(circle,rgba(169,193,197,0.22),transparent_65%)] blur-xl" />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:linear-gradient(180deg,black,transparent)]" />
      <span aria-hidden="true" className="docs-sweep pointer-events-none absolute inset-y-0 -left-1/2 -z-10 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2.5" aria-hidden="true">
          <span className="font-display text-[1rem] leading-none tracking-[0.3em]">HAGER</span>
          <span className="h-3.5 w-px bg-silver/50" />
          <span className="text-[0.5625rem] font-medium tracking-[0.32em] text-silver">INVESTMENT</span>
        </span>
        <button type="button" onClick={onClose} disabled={locked} aria-label="Close" className="-mr-2.5 grid size-10 place-items-center rounded-full text-white/75 transition-[background-color,color,transform] duration-500 ease-premium hover:rotate-90 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-silver disabled:opacity-40">
          <CloseIcon className="size-5" />
        </button>
      </div>

      <p className="text-eyebrow mt-6 text-[0.6875rem] text-silver">Private Documents</p>

      {step > 0 ? (
        <div className="mt-4" aria-hidden="true">
          <div className="relative h-px bg-white/15">
            <span className="absolute inset-y-0 left-0 block bg-gradient-to-r from-teal to-silver transition-[width] duration-[900ms] ease-premium" style={{ width: `${fill * 100}%` }} />
          </div>
          <ol className="mt-3 grid grid-cols-3 text-[0.6875rem] tracking-[0.08em] uppercase">
            {STEPS.map((s, i) => {
              const done = step > s.n;
              const current = step === s.n;
              return (
                <li key={s.n} className={cn("flex items-center gap-1.5 transition-colors duration-500", i === 1 && "justify-center", i === 2 && "justify-end", current ? "text-white" : done ? "text-silver" : "text-white/40")}>
                  {done ? <CheckIcon className="size-3 text-teal" /> : <span className={cn("size-1 rounded-full", current ? "docs-dot bg-white" : "bg-white/40")} />}
                  {s.label}
                </li>
              );
            })}
          </ol>
        </div>
      ) : null}
    </div>
  );
}
