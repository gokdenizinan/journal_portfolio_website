import type { NextConfig } from 'next';

const isDevelopment = process.env.NODE_ENV === 'development';

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
    : { output: 'export' }),
};

export default nextConfig;
