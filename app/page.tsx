import { Container } from "@/components/ui/container";
import Image from "next/image";
import heroWide01 from "@/public/images/hero-wide-01.jpg";
import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { getAllArticles, getAllProperties } from "@/lib/content";
import { PropertyCard } from "@/components/PropertyCard";
import { ArticleCard } from "@/components/ArticleCard";

export default function Home() {
  const properties = getAllProperties();
  const articles = getAllArticles();

  return (
    <Container>
      <section className="py-6 md:py-14" id="hero">
        <div className="relative w-full aspect-4/3 md:aspect-3/1 mb-4 md:mb-8">
          <Image
            src={heroWide01}
            alt="English coastline"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 1200px, 350px"
          />
        </div>
        <div className="flex flex-col items-start justify-start gap-4 max-w-190">
          <h1 className="text-display-mobile md:text-display">
            {site.description}
          </h1>
          <p className="md:text-lead text-muted">
            Independently owned places to stay. Book direct.
          </p>
          <ButtonLink variant="primary" href="/properties">
            {" "}
            View properties
          </ButtonLink>
        </div>
      </section>
      <section className="py-6 md:py-14">
        <h2 className="text-heading-mobile md:text-heading">Our properties</h2>
        {properties.length === 0 ? (
          <p className="mt-6 text-muted">No properties to show yet.</p>
        ) : (
          <ul className="mt-4 md:mt-6 grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
        <ul className="mt-4 md:mt-6 grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
