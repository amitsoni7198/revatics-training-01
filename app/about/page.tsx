import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import Image from "next/image";

const title = "About the collective";
const subtitle = "How six independent guesthouses came to work together.";
const heroImage = "/images/hero-wide-02.jpg";
const heroImageAlt = "A weatherboarded guesthouse looking out over the harbour";

const people = [
  {
    name: "Ellen Marsh",
    role: "Founder",
    property: "The Salt House",
    portrait: "/images/square-01.jpg",
    portraitAlt: "Portrait of Ellen Marsh",
  },
  {
    name: "Mark Reeve",
    role: "Innkeeper",
    property: "Fern and Anchor",
    portrait: "/images/square-02.jpg",
    portraitAlt: "Portrait of Mark Reeve",
  },
  {
    name: "Priya Nair",
    role: "Innkeeper",
    property: "The Herring House",
    portrait: "/images/square-01.jpg",
    portraitAlt: "Portrait of Priya Nair",
  },
  {
    name: "Tomas Beck",
    role: "Innkeeper",
    property: "Gullswick",
    portrait: "/images/square-02.jpg",
    portraitAlt: "Portrait of Tomas Beck",
  },
];

export const metadata: Metadata = {
  title: "About",
  description: subtitle,
};

export default function AboutPage() {
  return (
    <Container className="py-8 md:py-14">
      <header>
        <h1 className="text-display-mobile md:text-display font-semibold">
          {title}
        </h1>
        <p className="text-lead-mobile md:text-lead mt-2 text-muted">
          {subtitle}
        </p>
      </header>

      <div className="relative mt-6 mb-8 w-full aspect-4/3 bg-surface md:mt-8 md:mb-10 md:aspect-3/1">
        <Image
          src={heroImage}
          alt={heroImageAlt}
          fill
          priority
          className="object-cover"
          sizes="(min-width: 768px) 1200px, 100vw"
        />
      </div>

      <div className="mx-auto max-w-reading">
        <p className="mt-4">
          Harbourview began as a conversation between two innkeepers who kept
          sending each other guests. Six houses later, we still run each one
          independently — but we share what we have learned about looking after
          people on this stretch of coast.
        </p>
        <p className="mt-4">
          Every property is owner-run. The people who greet you are the people
          who make the decisions, and that is the whole point.
        </p>
        <h2 className="text-heading-mobile md:text-heading mt-12 font-semibold">
          Our approach
        </h2>
        <p className="mt-4">
          We keep the houses small, the breakfasts local and the bookings
          direct. There is no central call centre and no house style imposed
          from above — each guesthouse keeps its own character, and we handle
          the parts that are easier together than apart.
        </p>
      </div>

      <section className="mt-10 md:mt-14">
        <h2 className="text-heading-mobile md:text-heading font-semibold">
          The people
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {people.map((person) => (
            <li key={person.name} className="flex flex-col gap-2">
              <div className="relative aspect-141/140 w-full bg-surface">
                <Image
                  src={person.portrait}
                  alt={person.portraitAlt}
                  fill
                  sizes="(min-width: 1024px) 288px, 50vw"
                  className="object-cover"
                />
              </div>
              <h3 className="text-body mt-2 font-semibold">{person.name}</h3>
              <p className="text-small-mobile md:text-small text-muted">
                {person.role}, {person.property}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
