import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { getAllProperties } from "@/lib/content";
import { site } from "@/lib/site";
export const metadata: Metadata = {
  title: "Contact",
  description: "Enquiries go direct to each property.",
  alternates: { canonical: "/contact" },
};
export default function ContactPage() {
  const properties = getAllProperties();
  const telHref = `tel:${site.contact.phone.replace(/\s+/g, "")}`;
  return (
    <Container className="py-8 md:py-14">
      <h1 className="text-display-mobile md:text-display font-semibold">
        Contact
      </h1>
      <p className="text-lead-mobile md:text-lead mt-2 text-muted">
        Enquiries go direct to each property.
      </p>
      <p className="text-small-mobile md:text-small mt-4 text-muted">
        Have a quick question? Read our{" "}
        <Link href="/faq" className="text-accent hover:underline">
          FAQ
        </Link>
        .
      </p>
      <section className="mt-10 md:mt-14">
        <h2 className="text-heading-mobile md:text-heading font-semibold">
          Enquiry hours
        </h2>
        <div className="mt-4 space-y-1 text-muted">
          {site.contact.enquiryHours.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </section>
      <section className="mt-10 md:mt-14">
        <h2 className="text-heading-mobile md:text-heading font-semibold">
          Property details
        </h2>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <li
              key={property.slug}
              className="border border-border bg-surface p-6"
            >
              <h3 className="text-subheading-mobile md:text-subheading font-semibold">
                {property.name}
              </h3>
              <p className="text-small-mobile md:text-small mt-3 text-muted">
                {property.town}, {property.county}
              </p>
              <p className="text-small-mobile md:text-small mt-3 text-muted">
                <a
                  href={`mailto:${site.contact.email}`}
                  className="hover:text-accent"
                >
                  {site.contact.email}
                </a>
                <br />
                <a href={telHref} className="hover:text-accent">
                  {site.contact.phone}
                </a>
              </p>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-10 md:mt-14">
        <h2 className="text-heading-mobile md:text-heading font-semibold">
          Where to find us
        </h2>
        <div className="relative mt-6 w-full aspect-35/22 bg-surface md:aspect-15/4" />
      </section>
    </Container>
  );
}
