import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { ArticleCard } from '@/components/ArticleCard';
import { getAllArticles, getArticle } from '@/lib/content';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FormattedDate } from '@/components/ui/FormattedDate';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) {
    return {};
  }
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/journal/${slug}` },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) {
    notFound();
  }

  const { default: ArticleBody } = await import(
    `@/content/journal/${slug}.mdx`
  );

  const moreArticles = getAllArticles()
    .filter((other) => other.slug !== slug)
    .slice(0, 3);

  return (
    <Container className="py-8 md:py-14">
      <article>
        <div className="max-w-reading mx-auto">
          <div className="text-small-mobile md:text-small text-muted">
            <Link href="/journal">Journal</Link> / {article.title}
          </div>
          <h1 className="text-display-mobile md:text-display mt-2 font-semibold">
            {article.title}
          </h1>
          <p className="text-small-mobile md:text-small text-muted mt-3">
            <FormattedDate date={article.date} /> · Written by {article.author}
          </p>
        </div>

        <div className="bg-surface relative mt-6 mb-8 aspect-4/3 w-full md:mt-8 md:mb-10 md:aspect-3/1">
          {article.image && article.imageAlt && (
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 768px) 1200px, 100vw"
            />
          )}
        </div>

        <div className="max-w-reading mx-auto">
          <ArticleBody />
        </div>
      </article>

      {moreArticles.length > 0 && (
        <section className="mt-10 md:mt-14">
          <h2 className="text-heading-mobile md:text-heading font-semibold">
            More from the journal
          </h2>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {moreArticles.map((other) => (
              <li key={other.slug}>
                <ArticleCard article={other} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </Container>
  );
}
