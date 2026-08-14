import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Disable double-render in dev
  reactStrictMode: false,

  images: {
    unoptimized: true,
  },

  experimental: {
    // Reduce dev bundling cost for common libraries
    optimizePackageImports: [
      'lucide-react',
      'date-fns',
      'lodash',
      'react-icons',
    ],
  },

  // Skip checks during dev for speed
  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
