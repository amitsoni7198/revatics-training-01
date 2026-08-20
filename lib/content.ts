import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { z } from 'zod';
import {
  articleSchema,
  propertySchema,
  type Article,
  type Property,
} from './schemas';

const CONTENT_DIR = join(process.cwd(), 'content');

// How many journal articles to show per page (matches the 3x3 wireframe grid).
export const ARTICLES_PER_PAGE = 9;

export type PropertyWithSlug = Property & { slug: string };
export type ArticleWithSlug = Article & { slug: string };

function readCollection<T extends object>(
  folder: string,
  schema: z.ZodType<T>,
): (T & { slug: string })[] {
  const dir = join(CONTENT_DIR, folder);

  return readdirSync(dir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const raw = readFileSync(join(dir, file), 'utf8');
      const { data } = matter(raw);

      const result = schema.safeParse(data);
      if (!result.success) {
        throw new Error(
          `Invalid content in ${folder}/${file}:\n${z.prettifyError(result.error)}`,
        );
      }

      return { ...result.data, slug: file.replace(/\.mdx$/, '') };
    });
}

export function getAllProperties(): PropertyWithSlug[] {
  return readCollection('properties', propertySchema).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}

export function getProperty(slug: string): PropertyWithSlug | undefined {
  return getAllProperties().find((property) => property.slug === slug);
}

export function getAllArticles(): ArticleWithSlug[] {
  return readCollection('journal', articleSchema)
    .filter((article) => !article.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticle(slug: string): ArticleWithSlug | undefined {
  return getAllArticles().find((article) => article.slug === slug);
}
