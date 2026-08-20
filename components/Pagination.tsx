import Link from 'next/link';

// Page 1 lives at /journal; later pages at /journal/page/2, /journal/page/3, ...
function pageHref(page: number) {
  return page === 1 ? '/journal' : `/journal/page/${page}`;
}

export function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      aria-label="Journal pages"
      className="mt-10 flex flex-wrap justify-center gap-2"
    >
      {currentPage > 1 && (
        <Link
          href={pageHref(currentPage - 1)}
          className="text-accent px-3 py-2 font-medium hover:underline"
        >
          Previous
        </Link>
      )}

      {pages.map((page) =>
        page === currentPage ? (
          <span
            key={page}
            aria-current="page"
            className="bg-accent text-canvas rounded px-3 py-2 font-medium"
          >
            {page}
          </span>
        ) : (
          <Link
            key={page}
            href={pageHref(page)}
            className="text-accent px-3 py-2 font-medium hover:underline"
          >
            {page}
          </Link>
        ),
      )}

      {currentPage < totalPages && (
        <Link
          href={pageHref(currentPage + 1)}
          className="text-accent px-3 py-2 font-medium hover:underline"
        >
          Next
        </Link>
      )}
    </nav>
  );
}
