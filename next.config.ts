import type { NextConfig } from 'next';

const isDevelopment = process.env.NODE_ENV === 'development';
const isVercel = process.env.VERCEL === '1';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  ...(isDevelopment
    ? {
        async rewrites() {
          return [
            { source: '/index.html', destination: '/' },
            { source: '/:path*.html', destination: '/:path*' },
          ];
        },
      }
    : isVercel
      ? {}
      : { output: 'export' }),
};

export default nextConfig;
