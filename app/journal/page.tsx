import type { Metadata } from 'next';

import { Container } from '@/components/ui/container';
import { ArticleCard } from '@/components/ArticleCard';
import { Pagination } from '@/components/Pagination';
import { getAllArticles, ARTICLES_PER_PAGE } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Walks, food and seasonal things to do along the coast.',
  alternates: { canonical: '/journal' },
};

export default function JournalPage() {
  const articles = getAllArticles();
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const visibleArticles = articles.slice(0, ARTICLES_PER_PAGE);

  return (
    <Container className="py-12">
      <h1 className="text-display-mobile md:text-display font-semibold">
        Journal
      </h1>

      <p className="text-muted text-lead-mobile md:text-lead">
        Walks, food and seasonal things to do along the coast.
      </p>

      {visibleArticles.length === 0 ? (
        <p className="text-muted mt-6">No articles to show yet.</p>
      ) : (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleArticles.map((article) => (
            <li key={article.slug}>
              <ArticleCard article={article} as="h2" />
            </li>
          ))}
        </ul>
      )}

      <Pagination currentPage={1} totalPages={totalPages} />
    </Container>
  );
}
