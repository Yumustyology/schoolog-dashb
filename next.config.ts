import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Required for static export
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
