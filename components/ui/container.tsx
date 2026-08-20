import { cn } from '@/lib/cn';

export function Container({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('max-w-content mx-auto w-full px-5 xl:px-0', className)}
      {...props}
    />
  );
}
