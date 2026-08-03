import Link from "next/link";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";

const exploreLinks = [...site.nav];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-8">
        <div className="grid gap-2.5 md:gap-12 md:grid-cols-3">
          <div>
            <p className="font-semibold">{site.footerName}</p>
            <p className="mt-2.5 text-muted hidden md:block">{site.footerDescription}</p>
          </div>

          <nav aria-label="Footer" className="text-small">
            <p className="font-semibold hidden md:block">
              {site.footer.exploreHeading}
            </p>
            <ul className="flex md:flex-col md:mt-2.5 md:space-y-2">
              {exploreLinks.map((item, index) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted hover:text-accent"
                  >
                    {item.label}
                    {index !== exploreLinks.length - 1 && (
                      <span className="inline-block md:hidden px-1 ">·</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-small">
            <p className="font-semibold hidden md:block">
              {site.footer.contactHeading}
            </p>
            <ul className="flex md:flex-col md:mt-2.5 md:space-y-2 text-muted">
              <li>
                <a href={`mailto:${site.contact.email}`} className="hover:text-accent">
                  {site.contact.email}
                </a>
              </li>
              <span className="inline-block md:hidden px-1">·</span>
              <li>
                <a
                  href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                  className="hover:text-accent"
                >
                  {site.contact.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-micro mt-2.5 md:mt-8 text-muted">© {site.footerName}</p>
      </Container>
    </footer>
  );
}
