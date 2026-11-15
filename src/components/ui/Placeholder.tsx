import type { ReactNode } from "react";

import { publicText, type Copy } from "@/lib/content";

type MarkerProps = {
  children: ReactNode;
  /** Block markers show a "Placeholder" tag above the text. */
  block?: boolean;
  label?: string;
};

/**
 * Review-mode marker for unconfirmed content. Always wrapped in `.review-only`
 * by CopyText, so it is never visible on the public site.
 */
function Marker({ children, block = false, label = "Placeholder" }: MarkerProps) {
  if (block) {
    return (
      <span className="tbc-block" data-placeholder="">
        <span className="tbc-label" aria-hidden="true">
          {label}
        </span>
        <span className="sr-only">{label}: </span>
        {children}
      </span>
    );
  }
  return (
    <span className="tbc" data-placeholder="" title="Placeholder: to be confirmed by HAGER Investment">
      <span className="sr-only">Placeholder: </span>
      {children}
    </span>
  );
}

/**
 * Renders confirmed copy as-is. Unconfirmed copy renders twice:
 *  - `.review-only`: the placeholder text with its marker (review mode only)
 *  - `.public-only`: the neutral fallback wording, or nothing
 * so unsupported content is never presented as fact on the public site.
 */
export function CopyText({ value, block = false }: { value: Copy; block?: boolean }) {
  if (typeof value === "string") return <>{value}</>;
  const fallback = publicText(value);
  return (
    <>
      <span className="review-only">
        <Marker block={block}>{value.tbc}</Marker>
      </span>
      {fallback ? <span className="public-only">{fallback}</span> : null}
    </>
  );
}
