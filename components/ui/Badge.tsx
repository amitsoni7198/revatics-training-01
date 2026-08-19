import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const badgeVariants = cva(
  "text-small inline-flex items-center rounded px-3 py-1",
  {
    variants: {
      variant: {
        outline: "border border-border text-ink",
        muted: "bg-surface text-muted",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  },
);

type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
