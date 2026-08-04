import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { ArticleCard } from "@/components/ArticleCard";
import { ButtonLink } from "@/components/ui/Button";
import { getAllArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Journal",
  description: "Walks, food and seasonal things to do along the coast.",
  alternates: { canonical: "/journal" },
};

type PageProps = {
  searchParams: Promise<{
    show?: string;
  }>;
};

export default async function JournalPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const articles = getAllArticles();

  const showAll = params.show === "all";

  const visibleArticles = showAll ? articles : articles.slice(0, 3);

  return (
    <Container className="py-12">
      <h1 className="text-display-mobile md:text-display font-semibold">
        Journal
      </h1>

      <p className="text-muted text-lead-mobile md:text-lead">
        Walks, food and seasonal things to do along the coast.
      </p>

      {visibleArticles.length === 0 ? (
        <p className="mt-6 text-muted">No articles to show yet.</p>
      ) : (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleArticles.map((article) => (
            <li key={article.slug}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      )}

      {!showAll && (
        <div className="mt-8 flex justify-center">
          <ButtonLink href="/journal?show=all">Load more articles</ButtonLink>
        </div>
      )}
    </Container>
  );
}
