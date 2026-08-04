"use client";

import { useEffect, useState } from "react";

const options: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
};

export function FormattedDate({
  date,
  className,
}: {
  date: string;
  className?: string;
}) {
  const [text, setText] = useState(() =>
    new Date(date).toLocaleDateString("en-GB", options),
  );

  useEffect(() => {
    const formatted = new Date(date).toLocaleDateString(undefined, options);
    const handle = requestAnimationFrame(() => {
      setText(formatted);
    });
    return () => cancelAnimationFrame(handle);
  }, [date]);

  return (
    <time dateTime={date} className={className}>
      {text}
    </time>
  );
}
