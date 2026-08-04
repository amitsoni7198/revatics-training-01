"use client";

import { useSyncExternalStore } from "react";

// Publication dates are calendar dates (no time-of-day), so format in UTC to
// keep the stored day stable across timezones; the locale is left to the
// viewer's runtime (RV-G02 / RV-G03).
const formatDate = (iso: string) =>
  new Intl.DateTimeFormat(undefined, {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(iso));

const emptySubscribe = () => () => {};

export function FormattedDate({
  date,
  className,
}: {
  date: string;
  className?: string;
}) {
  // getServerSnapshot renders the build-time locale into the HTML; getSnapshot
  // re-formats in the viewer's actual locale on the client. useSyncExternalStore
  // makes this mismatch hydration-safe (returned strings compare by value).
  const formatted = useSyncExternalStore(
    emptySubscribe,
    () => formatDate(date),
    () => formatDate(date),
  );

  return (
    <time dateTime={date} className={className} suppressHydrationWarning>
      {formatted}
    </time>
  );
}
