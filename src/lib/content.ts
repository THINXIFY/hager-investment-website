/**
 * Content primitives.
 *
 * Any copy that has NOT been confirmed by HAGER Investment (figures, offices,
 * services, quotes, regulatory text…) must be authored with `tbc()`.
 *
 * - Review mode (see src/config/review.ts) shows the placeholder text with a
 *   visible dashed marker.
 * - Public mode never presents it as fact: it shows the neutral `fallback`
 *   wording instead, or nothing at all when the fallback is "".
 *
 * Search for `tbc(` to find every item still awaiting confirmation.
 */

export type Placeholder = {
  readonly tbc: string;
  /** Neutral public wording. "" hides the item outside review mode. Omit to show `tbc` text. */
  readonly fallback?: string;
};

/** Confirmed copy is a plain string; unconfirmed copy is a Placeholder. */
export type Copy = string | Placeholder;

/** Mark a piece of copy as a placeholder awaiting client confirmation. */
export const tbc = (text: string, fallback?: string): Placeholder =>
  fallback === undefined ? { tbc: text } : { tbc: text, fallback };

export const isPlaceholder = (value: Copy): value is Placeholder => typeof value !== "string";

/** Plain-text form of any copy (for aria labels, alt text, metadata). */
export const plainText = (value: Copy): string => (typeof value === "string" ? value : value.tbc);

/** Public (non-review) text of any copy. */
export const publicText = (value: Copy): string =>
  typeof value === "string" ? value : (value.fallback ?? value.tbc);

/** True when every item is a placeholder that is hidden outside review mode. */
export const isReviewOnly = (...values: Copy[]): boolean =>
  values.every((v) => isPlaceholder(v) && v.fallback === "");
