/**
 * Content review mode.
 *
 * Placeholder markers (see src/lib/content.ts) are only visible when
 * <html data-review> is set. Two explicit ways to turn it on:
 *
 *  1. Build-time: NEXT_PUBLIC_REVIEW_MODE=true (e.g. a staging deployment).
 *  2. Per session: open any page with ?review=1 (turn off with ?review=0).
 *     The choice is kept in sessionStorage for that browser tab.
 *
 * Without either, the public site renders neutral fallback wording only.
 */
export const REVIEW_MODE_FORCED = process.env.NEXT_PUBLIC_REVIEW_MODE === "true";

const STORAGE_KEY = "hager-review-mode";

/** Runs in <head> before first paint, so there is no flash of the wrong mode. */
export const reviewModeScript = `(function(){try{var q=new URLSearchParams(location.search).get("review"),s=window.sessionStorage;if(q==="1")s.setItem("${STORAGE_KEY}","1");if(q==="0")s.removeItem("${STORAGE_KEY}");if(s.getItem("${STORAGE_KEY}")==="1")document.documentElement.setAttribute("data-review","")}catch(e){}})();`;
