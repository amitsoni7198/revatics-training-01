import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { PropertyCard } from '@/components/PropertyCard';
import { getAllProperties } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Properties',
  description: 'All six Harbourview Collective guesthouses on the south coast.',
  alternates: { canonical: '/properties' },
};

export default function PropertiesPage() {
  const properties = getAllProperties();

  return (
    <Container className="py-12">
      <h1 className="text-display-mobile md:text-display font-semibold">
        Our properties
      </h1>
      {properties.length === 0 ? (
        <p className="text-muted mt-6">No properties to show yet.</p>
      ) : (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <li key={property.slug}>
              <PropertyCard property={property} as="h2" />
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
