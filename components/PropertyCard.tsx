import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { PropertyWithSlug } from '@/lib/content';

const CARD_IMAGE_SIZES =
  '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px';

export function PropertyCard({
  property,
  description = false,
  as: Heading = 'h3',
}: {
  property: PropertyWithSlug;
  description?: boolean;
  as?: 'h2' | 'h3';
}) {
  const href = `/properties/${property.slug}`;

  return (
    <article className="flex flex-col gap-2 md:gap-3">
      <Link
        href={href}
        className="bg-surface relative block aspect-3/2 w-full overflow-hidden"
      >
        <Image
          src={property.heroImage}
          alt={property.heroImageAlt}
          fill
          sizes={CARD_IMAGE_SIZES}
          className="object-cover"
        />
      </Link>

      <Heading className="text-subheading-mobile md:text-subheading font-semibold">
        <Link href={href} className="hover:text-accent">
          {property.name}
        </Link>
      </Heading>
      <p className="text-small-mobile md:text-small text-muted">
        {property.town}, {property.county}
      </p>
      {description && <p className="text-muted">{property.summary}</p>}

      <Link
        href={href}
        className="text-accent inline-flex items-center gap-1 font-medium hover:underline"
      >
        View property
        <span className="sr-only"> {property.name}</span>
        <ArrowRight aria-hidden className="size-4" />
      </Link>
    </article>
  );
}
