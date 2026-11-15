"use client";

import { useSyncExternalStore } from "react";

const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Luxembourg", hour: "2-digit", minute: "2-digit", hour12: false });
const zone = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Luxembourg", timeZoneName: "short" });

const subscribe = (cb: () => void) => {
  const id = window.setInterval(cb, 15_000);
  return () => window.clearInterval(id);
};
const snapshot = () => {
  const now = new Date();
  const tz = zone.formatToParts(now).find((p) => p.type === "timeZoneName")?.value ?? "";
  return `${fmt.format(now)}|${tz}`;
};

/** Current local time in Luxembourg, with a softly pulsing separator. Server render shows a neutral placeholder. */
export function LuxClock() {
  const value = useSyncExternalStore(subscribe, snapshot, () => "");
  const [time = "", tz = ""] = value.split("|");
  const [h = "--", m = "--"] = time ? time.split(":") : [];
  return (
    <span className="inline-flex items-baseline gap-2">
      <time suppressHydrationWarning className="font-display tabular-nums">
        {h}
        <span aria-hidden="true" className="ct-colon mx-px">
          :
        </span>
        <span className="sr-only">:</span>
        {m}
      </time>
      {tz ? <span className="text-[0.75rem] tracking-[0.12em] text-silver uppercase">{tz}</span> : null}
    </span>
  );
}
