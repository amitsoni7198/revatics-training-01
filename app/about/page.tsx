import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import Image from 'next/image';

const title = 'About the collective';
const subtitle = 'Six independently owned guesthouses on the south coast.';
const heroImage = '/images/hero-wide-02.jpg';
const heroImageAlt = 'A weatherboarded guesthouse looking out over the harbour';

export const metadata: Metadata = {
  title: 'About',
  description: subtitle,
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <Container className="py-8 md:py-14">
      <header>
        <h1 className="text-display-mobile md:text-display font-semibold">
          {title}
        </h1>
        <p className="text-lead-mobile md:text-lead text-muted mt-2">
          {subtitle}
        </p>
      </header>

      <div className="bg-surface relative mt-6 mb-8 aspect-4/3 w-full md:mt-8 md:mb-10 md:aspect-3/1">
        <Image
          src={heroImage}
          alt={heroImageAlt}
          fill
          priority
          className="object-cover"
          sizes="(min-width: 768px) 1200px, 100vw"
        />
      </div>

      <div className="max-w-reading mx-auto">
        <p className="mt-4">
          Harbourview Collective is a group of six independently owned
          guesthouses along the south coast of England, between Rye and
          Salcombe. Each house is run by its own owners, in its own way.
        </p>
        <p className="mt-4">
          We share one website so guests can find the houses and book with them
          directly, rather than through a listing site that takes a cut of every
          booking.
        </p>
        <h2 className="text-heading-mobile md:text-heading mt-12 font-semibold">
          Our approach
        </h2>
        <p className="mt-4">
          We keep the houses small and the bookings direct. Each guesthouse
          keeps its own character; the collective handles only the parts that
          are easier together than apart, like this shared website and the
          journal.
        </p>
      </div>
    </Container>
  );
}
