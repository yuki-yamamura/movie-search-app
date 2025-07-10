import createClient from 'openapi-fetch';

import type { TMDBApiPaths } from '@/app/(models)/movie/types';

if (!process.env.NEXT_PUBLIC_TMDB_API_BASE_URL) {
  throw new Error('TMDB_API_BASE_URL environment variable is not set');
}
if (!process.env.NEXT_PUBLIC_TMDB_API_ACCESS_TOKEN) {
  throw new Error('TMDB_API_ACCESS_TOKEN environment variable is not set');
}

export const tmdbClient = createClient<TMDBApiPaths>({
  baseUrl: process.env.NEXT_PUBLIC_TMDB_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
});
