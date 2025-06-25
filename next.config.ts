import path from 'path';

import type { NextConfig } from 'next';

if (!process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL) {
  throw new Error('NEXT_PUBLIC_TMDB_IMAGE_BASE_URL environment variable is not set');
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL(`${path.join(process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL, '**')}`)],
  },
};

export default nextConfig;
