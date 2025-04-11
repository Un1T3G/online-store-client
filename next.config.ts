import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  env: {
    SERVER_URL: process.env.SERVER_URL,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.SERVER_URL}/api/:path*`,
      },
      {
        source: '/uploads/:path*',
        destination: `${process.env.SERVER_URL}/uploads/:path*`,
      },
    ]
  },
}

export default nextConfig
