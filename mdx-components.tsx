import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => (
      <h2
        className="text-heading-mobile md:text-heading mt-12 font-semibold text-ink"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="text-subheading-mobile md:text-subheading mt-8 font-semibold text-ink"
        {...props}
      />
    ),
    p: (props) => <p className="mt-4 text-ink" {...props} />,
    ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-6" {...props} />,
    ol: (props) => (
      <ol className="mt-4 list-decimal space-y-2 pl-6" {...props} />
    ),
    blockquote: (props) => (
      <blockquote
        className="text-subheading-mobile md:text-subheading my-8 border-l-4 border-accent pl-6 font-medium text-ink"
        {...props}
      />
    ),
    a: ({ href = "", ...props }) =>
      href.startsWith("/") ? (
        <Link
          href={href}
          className="text-accent underline hover:opacity-90"
          {...props}
        />
      ) : (
        <a
          href={href}
          className="text-accent underline hover:opacity-90"
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        />
      ),
    ...components,
  };
}
