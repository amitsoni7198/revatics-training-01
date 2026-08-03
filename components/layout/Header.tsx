import Link from "next/link";
import { Menu } from "lucide-react";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-canvas">
      <Container className="flex items-center justify-between">
        <Link href="/" className="text-body md:text-lead font-semibold md:py-6">
          {site.name}
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex gap-8">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className=" text-accent font-medium hover:text-muted">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <details className="relative md:hidden">
          <summary className="flex cursor-pointer items-center rounded px-4 py-4">
            <div className="py-2 text-micro bg-accent h-8 w-11 flex items-center justify-center text-canvas">{site.menuLabel}</div>
          </summary>
          <nav
            aria-label="Primary"
            className="absolute -right-4 z-50  w-screen bg-canvas pt-2 pb-4 px-5 shadow-lg border-t border-border"
          >
            <ul className="flex flex-col divide-solid divide-b divide-border">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block text-accent text-lead font-medium py-3 border-b border-border hover:bg-surface "
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </Container>
    </header>
  );
}
