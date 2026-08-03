import Image from "next/image";
import Link from "next/link";
import type { ArticleWithSlug } from "@/lib/content";

const CARD_IMAGE_SIZES =
  "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px";

const dateFormatter = new Intl.DateTimeFormat("en-GB", { dateStyle: "long" });

export function ArticleCard({ article }: { article: ArticleWithSlug }) {
  const href = `/journal/${article.slug}`;

  return (
    <article className="flex flex-col gap-2">
      <div className="relative aspect-3/2 w-full overflow-hidden bg-surface">
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

      <p className="text-small text-muted">
        {dateFormatter.format(new Date(article.date))}
      </p>
      <h3 className="text-subheading font-semibold">
        <Link href={href} className="hover:text-accent">
          {article.title}
        </Link>
      </h3>
      <p className=" text-muted">{article.excerpt}</p>
    </article>
  );
}
