import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PropertyWithSlug } from "@/lib/content";

const CARD_IMAGE_SIZES = "(max-width: 768px) 350px, 384px";

export function PropertyCard({
  property,
  description = false
}: {
  property: PropertyWithSlug;
  description?: boolean;
}) {
  const href = `/properties/${property.slug}`;

  return (
    <article className="flex flex-col gap-2 md:gap-3">
      <Link
        href={href}
        className="relative block aspect-3/2 w-full overflow-hidden bg-surface"
      >
        <Image
          src={property.heroImage}
          alt={property.heroImageAlt}
          fill
          sizes={CARD_IMAGE_SIZES}
          className="object-cover"
        />
      </Link>

      <h3 className="text-subheading-mobile md:text-subheading font-semibold">
        <Link href={href} className="hover:text-accent">
          {property.name}
        </Link>
      </h3>
      <p className="text-small-mobile md:text-small text-muted">
        {property.town}, {property.county}
      </p>
      {description && <p className=" text-muted">{property.summary}</p>}

      <Link
        href={href}
        className="inline-flex items-center gap-1 font-medium text-accent hover:underline"
      >
        View property
        <span className="sr-only"> {property.name}</span>
        <ArrowRight aria-hidden className="size-4" />
      </Link>
    </article>
  );
}
