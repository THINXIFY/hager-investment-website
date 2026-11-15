"use client";

import { useRef, useState } from "react";

import { buttonClasses, type ButtonVariant } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

import { LockDocIcon } from "./DocumentsIcons";
import { RequestDocumentsModal } from "./RequestDocumentsModal";

/**
 * "Request Private Documents": opens the email-verified document request dialog.
 * Uses the site's button language; the lock-document mark sits in the signature circle.
 */
export function RequestDocumentsButton({ variant = "dark", className, label = "Request Private Documents" }: { variant?: ButtonVariant; className?: string; label?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const circle = variant === "light" ? "bg-teal text-white group-hover/btn:bg-petrol" : variant === "dark" ? "bg-teal text-white group-hover/btn:bg-white group-hover/btn:text-obsidian" : "border border-current/40 group-hover/btn:bg-current/10";

  return (
    <>
      <button ref={ref} type="button" aria-haspopup="dialog" onClick={() => setOpen(true)} className={buttonClasses(variant, "md", cn("min-h-13 py-1.5 pr-1.5 pl-7", className), true)}>
        <span>{label}</span>
        <span aria-hidden="true" className={cn("grid size-10 shrink-0 place-items-center rounded-full transition-colors duration-500 ease-premium", circle)}>
          <LockDocIcon className="size-4.5" />
        </span>
      </button>
      {open ? (
        <RequestDocumentsModal
          onClose={() => {
            setOpen(false);
            requestAnimationFrame(() => ref.current?.focus());
          }}
        />
      ) : null}
    </>
  );
}
