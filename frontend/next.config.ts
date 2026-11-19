import type { NextConfig } from 'next';

import { readFileSync } from 'fs';
const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_APP_VERSION: pkg.version,
  },
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    loader: 'custom',
    loaderFile: './src/lib/cloudinaryLoader.ts',
    formats: ['image/avif', 'image/webp'],
    qualities: [60, 75, 90, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tienda',
        destination: '/',
        permanent: false,
      },
      {
        source: '/tienda/:path*',
        destination: '/',
        permanent: false,
      },
      {
        source: '/checkout',
        destination: '/',
        permanent: false,
      },
      {
        source: '/checkout/:path*',
        destination: '/',
        permanent: false,
      },
      {
        source: '/cotizador',
        destination: '/arquitectura',
        permanent: true,
      },
      {
        source: '/cuenta',
        destination: '/',
        permanent: false,
      },
      {
        source: '/cuenta/:path*',
        destination: '/',
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/images/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/favicon/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  async rewrites() {
    const isDev = process.env.NODE_ENV !== 'production';
    const backendProxy =
      process.env.BACKEND_URL || (isDev ? 'http://127.0.0.1:3001' : 'http://backend:3001');
    return [
      {
        source: '/api/:path*',
        destination: `${backendProxy}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
