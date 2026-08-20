import type { MetadataRoute } from 'next';
import { env } from '@/lib/env';
import {
  getAllProperties,
  getAllArticles,
  ARTICLES_PER_PAGE,
} from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = env.NEXT_PUBLIC_SITE_URL;

  const pages = ['', '/properties', '/journal', '/about', '/contact', '/faq'];
  const staticRoutes = pages.map((path) => ({ url: `${base}${path}` }));

  const properties = getAllProperties().map((property) => ({
    url: `${base}/properties/${property.slug}`,
  }));

  const articles = getAllArticles();
  const articleRoutes = articles.map((article) => ({
    url: `${base}/journal/${article.slug}`,
  }));

  // Extra journal list pages (page one is /journal, already added above).
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const journalPages = [];
  for (let page = 2; page <= totalPages; page++) {
    journalPages.push({ url: `${base}/journal/page/${page}` });
  }

  return [...staticRoutes, ...properties, ...articleRoutes, ...journalPages];
}
