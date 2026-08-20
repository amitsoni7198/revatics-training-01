import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Container } from '@/components/ui/container';
import { ArticleCard } from '@/components/ArticleCard';
import { Pagination } from '@/components/Pagination';
import { getAllArticles, ARTICLES_PER_PAGE } from '@/lib/content';

export const dynamicParams = false;

type PageProps = {
  params: Promise<{ page: string }>;
};

// Build a static page for 2, 3, ... up to the last page. Page 1 is /journal.
export function generateStaticParams() {
  const totalPages = Math.ceil(getAllArticles().length / ARTICLES_PER_PAGE);
  const params: { page: string }[] = [];
  for (let page = 2; page <= totalPages; page++) {
    params.push({ page: String(page) });
  }
  return params;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `Journal — page ${page}`,
    description: 'Walks, food and seasonal things to do along the coast.',
    alternates: { canonical: `/journal/page/${page}` },
  };
}

export default async function JournalPagedPage({ params }: PageProps) {
  const { page } = await params;
  const currentPage = Number(page);

  const articles = getAllArticles();
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);

  if (
    !Number.isInteger(currentPage) ||
    currentPage < 2 ||
    currentPage > totalPages
  ) {
    notFound();
  }

  const start = (currentPage - 1) * ARTICLES_PER_PAGE;
  const visibleArticles = articles.slice(start, start + ARTICLES_PER_PAGE);

  return (
    <Container className="py-12">
      <h1 className="text-display-mobile md:text-display font-semibold">
        Journal
      </h1>

      <p className="text-muted text-lead-mobile md:text-lead">
        Walks, food and seasonal things to do along the coast.
      </p>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleArticles.map((article) => (
          <li key={article.slug}>
            <ArticleCard article={article} as="h2" />
          </li>
        ))}
      </ul>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </Container>
  );
}
