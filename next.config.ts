import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";

const nextConfig: NextConfig = {
  // Let Next treat .mdx files as pages/components we can import.
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({
  options: {
    // Strip the `---` frontmatter block from the RENDERED body.
    // (We read the frontmatter separately with gray-matter — see below.)
    remarkPlugins: [remarkFrontmatter],
  },
});

export default withMDX(nextConfig);
