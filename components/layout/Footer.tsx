import Link from 'next/link';
import { site } from '@/lib/site';
import { Container } from '@/components/ui/container';

const exploreLinks = [...site.nav, site.faqLink];

export function Footer() {
  return (
    <footer className="border-border bg-surface border-t">
      <Container className="py-8">
        <div className="grid gap-2.5 md:grid-cols-3 md:gap-12">
          <div>
            <p className="font-semibold">{site.footerName}</p>
            <p className="text-muted mt-2.5 hidden md:block">
              {site.footerDescription}
            </p>
          </div>

          <nav aria-label="Footer" className="text-small">
            <p className="hidden font-semibold md:block">
              {site.footer.exploreHeading}
            </p>
            <ul className="flex gap-x-3 md:mt-2.5 md:flex-col md:space-y-2">
              {exploreLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-small">
            <p className="hidden font-semibold md:block">
              {site.footer.contactHeading}
            </p>
            <ul className="text-muted flex gap-x-3 md:mt-2.5 md:flex-col md:space-y-2">
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="hover:text-accent"
                >
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.contact.phone.replace(/\s/g, '')}`}
                  className="hover:text-accent"
                >
                  {site.contact.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-micro text-muted mt-2.5 md:mt-8">
          © {site.footerName}
        </p>
      </Container>
    </footer>
  );
}
