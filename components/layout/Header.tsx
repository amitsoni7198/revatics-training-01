import Link from 'next/link';
import { site } from '@/lib/site';
import { Container } from '@/components/ui/container';

export function Header() {
  return (
    <header className="border-border bg-canvas sticky top-0 z-40 border-b">
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-4">
        <Link href="/" className="text-lead font-semibold">
          {site.name}
        </Link>

        <nav aria-label="Primary">
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-accent hover:text-muted font-medium"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
