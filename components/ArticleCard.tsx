import Image from 'next/image';
import Link from 'next/link';
import type { ArticleWithSlug } from '@/lib/content';
import { FormattedDate } from '@/components/ui/FormattedDate';

const CARD_IMAGE_SIZES =
  '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px';

export function ArticleCard({
  article,
  as: Heading = 'h3',
}: {
  article: ArticleWithSlug;
  as?: 'h2' | 'h3';
}) {
  const href = `/journal/${article.slug}`;

  return (
    <article className="flex flex-col gap-2">
      <div className="bg-surface relative aspect-3/2 w-full overflow-hidden">
        {article.image && article.imageAlt && (
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            sizes={CARD_IMAGE_SIZES}
            className="object-cover"
          />
        )}
      </div>

      <FormattedDate date={article.date} className="text-small text-muted" />
      <Heading className="text-subheading font-semibold">
        <Link href={href} className="hover:text-accent">
          {article.title}
        </Link>
      </Heading>
      <p className="text-muted">{article.excerpt}</p>
    </article>
  );
}
