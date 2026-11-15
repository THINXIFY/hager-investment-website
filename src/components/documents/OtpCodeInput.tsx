"use client";

import { useRef, type ClipboardEvent, type KeyboardEvent } from "react";

import { cn } from "@/lib/cn";

interface OtpCodeInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  length?: number;
  /** Id of the element describing the code (hint or error), for screen readers. */
  describedBy?: string;
}

/**
 * Six segmented digit boxes on a light surface: auto-advance, backspace and arrow navigation,
 * paste of a whole code, and one-time-code autofill. The centre gap splits the code 3 + 3,
 * the way it is set in the email, so it is easy to compare at a glance.
 */
export function OtpCodeInput({ value, onChange, disabled = false, invalid = false, length = 6, describedBy }: OtpCodeInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  const setDigit = (i: number, d: string) => {
    const next = digits.slice();
    next[i] = d;
    onChange(next.join("").slice(0, length));
  };

  const onInput = (i: number, raw: string) => {
    const clean = raw.replace(/\D/g, "");
    if (clean.length > 1) {
      onChange(clean.slice(0, length));
      refs.current[Math.min(clean.length, length) - 1]?.focus();
      return;
    }
    setDigit(i, clean);
    if (clean && i < length - 1) refs.current[i + 1]?.focus();
  };

  const onKeyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      e.preventDefault();
      refs.current[i - 1]?.focus();
      setDigit(i - 1, "");
    } else if (e.key === "ArrowLeft" && i > 0) {
      e.preventDefault();
      refs.current[i - 1]?.focus();
    } else if (e.key === "ArrowRight" && i < length - 1) {
      e.preventDefault();
      refs.current[i + 1]?.focus();
    }
  };

  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;
    e.preventDefault();
    onChange(pasted.slice(0, length));
    refs.current[Math.max(Math.min(pasted.length, length) - 1, 0)]?.focus();
  };

  return (
    <div role="group" aria-label="Six-digit verification code" aria-describedby={describedBy} className={cn("flex items-center gap-1.5 min-[400px]:gap-2 sm:gap-2.5", invalid && "docs-shake")}>
      {digits.map((d, i) => (
        <span key={i} className={cn("contents")}>
          {i === length / 2 ? <span aria-hidden="true" className="mx-0.5 h-px w-2.5 shrink-0 bg-petrol/30 sm:mx-1 sm:w-3.5" /> : null}
          <input
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-otp-digit={i}
            data-filled={d ? "" : undefined}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete={i === 0 ? "one-time-code" : "off"}
            aria-label={`Digit ${i + 1} of ${length}`}
            aria-invalid={invalid || undefined}
            maxLength={i === 0 ? length : 1}
            value={d}
            disabled={disabled}
            onChange={(e) => onInput(i, e.target.value)}
            onKeyDown={(e) => onKeyDown(i, e)}
            onPaste={onPaste}
            onFocus={(e) => e.target.select()}
            className={cn(
              "h-14 w-0 min-w-0 flex-1 border bg-porcelain/70 text-center font-display text-[1.625rem] leading-none text-obsidian tabular-nums caret-teal outline-none sm:h-16 sm:text-[1.875rem]",
              "transition-[border-color,background-color,box-shadow] duration-300 ease-premium",
              "focus:border-teal focus:bg-white focus:shadow-[0_0_0_3px_rgba(17,123,137,0.16)] disabled:opacity-55",
              invalid ? "border-error/70 bg-error/[0.04]" : d ? "border-petrol/45 bg-white" : "border-petrol/15",
            )}
          />
        </span>
      ))}
    </div>
  );
}
