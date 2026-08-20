const options: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
};

export function FormattedDate({
  date,
  className,
}: {
  date: string;
  className?: string;
}) {
  const text = new Date(date).toLocaleDateString('en-GB', options);

  return (
    <time dateTime={date} className={className}>
      {text}
    </time>
  );
}
