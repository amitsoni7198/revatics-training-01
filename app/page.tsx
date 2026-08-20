import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import Image from 'next/image';
import heroWide01 from '@/public/images/hero-wide-01.jpg';
import { site } from '@/lib/site';
import { ButtonLink } from '@/components/ui/Button';
import { getAllArticles, getAllProperties } from '@/lib/content';
import { PropertyCard } from '@/components/PropertyCard';
import { ArticleCard } from '@/components/ArticleCard';

export const metadata: Metadata = {
  title: 'Coastal guesthouses on the south coast of England',
  description:
    'Harbourview Collective is six independently owned guesthouses between Rye and Salcombe. Browse the houses, read the journal, and book direct.',
  alternates: { canonical: '/' },
};

export default function Home() {
  const properties = getAllProperties();
  const articles = getAllArticles();

  return (
    <Container>
      <section className="py-6 md:py-14" id="hero">
        <div className="relative mb-4 aspect-4/3 w-full md:mb-8 md:aspect-3/1">
          <Image
            src={heroWide01}
            alt="Cliffs above the sea along the English south coast"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 768px) 1200px, 100vw"
          />
        </div>
        <div className="flex max-w-190 flex-col items-start justify-start gap-4">
          <h1 className="text-display-mobile md:text-display">
            {site.description}
          </h1>
          <p className="md:text-lead text-muted">
            Independently owned places to stay. Book direct.
          </p>
          <ButtonLink variant="primary" href="/properties">
            {' '}
            View properties
          </ButtonLink>
        </div>
      </section>
      <section className="py-6 md:py-14">
        <h2 className="text-heading-mobile md:text-heading">Our properties</h2>
        {properties.length === 0 ? (
          <p className="text-muted mt-6">No properties to show yet.</p>
        ) : (
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 md:mt-6 md:gap-6 lg:grid-cols-3">
            {properties.slice(0, 3).map((property) => (
              <li key={property.slug}>
                <PropertyCard property={property} description={true} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="py-6 md:py-14">
        <h2 className="text-heading-mobile md:text-heading">
          From the journal
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 md:mt-6 md:gap-6 lg:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <li key={article.slug}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
