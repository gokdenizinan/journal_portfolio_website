import type { NextConfig } from 'next';

const isDevelopment = process.env.NODE_ENV === 'development';
const isVercel = process.env.VERCEL === '1';
const supportsLegacyRewrites = isDevelopment || isVercel;

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  ...(supportsLegacyRewrites
    ? {
        async rewrites() {
          return [
            { source: '/index.html', destination: '/' },
            { source: '/:path*.html', destination: '/:path*' },
          ];
        },
      }
    : { output: 'export' }),
};

export default nextConfig;
