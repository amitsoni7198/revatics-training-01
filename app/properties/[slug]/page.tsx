import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/Button";
import Link from "next/link";
import { getAllProperties, getProperty } from "@/lib/content";
import { notFound } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { env } from "@/lib/env";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  const properties = getAllProperties();
  return properties.map((property) => ({
    slug: property.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) {
    return {};
  }
  return {
    title: property.name,
    description: property.summary,
    alternates: { canonical: `/properties/${slug}` },
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: property.name,
    description: property.summary,
    address: {
      "@type": "PostalAddress",
      addressLocality: property.town,
      addressRegion: property.county,
    },
    image: `${env.NEXT_PUBLIC_SITE_URL}${property.heroImage}`,
    url: `${env.NEXT_PUBLIC_SITE_URL}/properties/${slug}`,
  };

  return (
    <Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="py-6 md:py-14">
        <div className="text-small-mobile md:text-small text-muted">
          <Link href="/properties">Properties</Link> / {property.name}
        </div>
        <h1 className="text-display-mobile md:text-display font-semibold">
          {property.name}
        </h1>
        <p className=" text-muted">
          {property.town}, {property.county}
        </p>
        <div className="relative w-full aspect-4/3 md:aspect-3/1 mb-2.5 md:mb-3 mt-4 md:mt-6">
          <Image
            src={property.heroImage}
            alt={property.heroImageAlt}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 1200px, 350px"
          />
        </div>
        {property.gallery.length > 0 && (
          <div className="grid grid-cols-3 gap-2 md:grid-cols-4 md:gap-4">
            {property.gallery.slice(0, 4).map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className={cn(
                  "relative w-full aspect-7/5 md:aspect-12/5 bg-surface",
                  index === 3 && "hidden md:block",
                )}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 290px, 110px"
                />
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="pb-10 md:grid md:grid-cols-3 md:gap-x-16 md:gap-y-7 md:pb-14">
        <aside className="md:col-start-3 md:row-start-1 md:row-span-2">
          <div className="flex flex-col gap-2.5 border border-border bg-surface p-4 md:p-7">
            <h2 className="text-subheading-mobile md:text-subheading font-semibold">
              Key facts
            </h2>
            <p className="text-small-mobile md:text-small text-muted">
              Check in from {property.checkIn} · Check out by{" "}
              {property.checkOut}
            </p>
            <p className="text-small-mobile md:text-small text-muted">
              {[
                `${property.rooms.length} rooms`,
                property.dogsAllowed && "Dogs welcome",
                property.parking && "Parking",
                property.wifi && "Wi-Fi",
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>
            <ButtonLink
              href={property.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              Book direct
            </ButtonLink>
          </div>
        </aside>

        <div className="mt-4 md:mt-0 md:col-span-2 md:col-start-1 md:row-start-1">
          <h2 className="text-heading-mobile md:text-heading font-semibold">
            About the property
          </h2>
          <p className="mt-5 md:mt-7 text-muted">{property.summary}</p>
        </div>

        <div className="mt-5 md:col-span-2 md:col-start-1 md:row-start-2 md:mt-0">
          <div>
            <h2 className="text-heading-mobile md:text-heading font-semibold">
              Rooms
            </h2>
            <ul className="mt-6 space-y-5 md:space-y-7">
              {property.rooms.map((room) => (
                <li
                  key={room.name}
                  className="flex flex-col gap-2 md:flex-row md:items-center md:gap-5 "
                >
                  <div className="relative w-full aspect-35/16 bg-surface md:w-40 md:shrink-0 md:aspect-16/11" />
                  <div>
                    <h3 className="text-subheading-mobile md:text-subheading font-semibold">
                      {room.name}
                    </h3>
                    <p className="mt-1 text-small-mobile md:text-small text-muted">
                      Sleeps {room.sleeps}
                      {room.ensuite && " · En suite"}
                      {room.features[0] && (
                        <span className="hidden md:inline">
                          {" · "}
                          {room.features[0]}
                        </span>
                      )}
                      <span className="md:hidden">
                        {" "}
                        · From £{room.priceFrom}
                      </span>
                    </p>
                    <p className="mt-1 hidden md:block font-medium">
                      From £{room.priceFrom} per night
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 md:mt-14">
            <h2 className="text-heading-mobile md:text-heading font-semibold">
              Facilities
            </h2>
            <ul className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
              {property.facilities.map((facility) => (
                <li
                  key={facility}
                  className="flex aspect-91/32 items-center justify-center bg-surface px-3 text-center text-small-mobile md:text-small text-muted"
                >
                  {facility}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="pb-12 md:pb-16">
        <h2 className="text-heading-mobile md:text-heading font-semibold">
          Location
        </h2>
        <div className="relative mt-6 w-full aspect-35/22 bg-surface md:aspect-15/4" />
      </section>
    </Container>
  );
}
