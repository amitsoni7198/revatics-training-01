import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  // Tell Turbopack this folder is the project root, so it never guesses the
  // wrong one when other lockfiles exist higher up the machine.
  turbopack: { root: import.meta.dirname },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [['remark-frontmatter']],
  },
});

export default withMDX(nextConfig);
