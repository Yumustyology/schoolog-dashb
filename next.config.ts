import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Required for static export
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
