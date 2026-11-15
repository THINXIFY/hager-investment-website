"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Reads the clock only in the browser: Cache Components forbids `new Date()`
 * during prerender. The server snapshot is empty and fills in on hydration.
 */
export function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => null,
  );
  return <span>{year}</span>;
}
