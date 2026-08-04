import type { MetadataRoute } from "next";
import { env } from "@/lib/env";
import { getAllProperties, getAllArticles } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = env.NEXT_PUBLIC_SITE_URL;

  const pages = ["", "/properties", "/journal", "/about", "/contact", "/faq"];
  const staticRoutes = pages.map((path) => ({ url: `${base}${path}` }));

  const properties = getAllProperties().map((property) => ({
    url: `${base}/properties/${property.slug}`,
  }));

  const articles = getAllArticles().map((article) => ({
    url: `${base}/journal/${article.slug}`,
  }));

  return [...staticRoutes, ...properties, ...articles];
}
