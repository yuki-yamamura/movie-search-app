import createClient from 'openapi-fetch';

import type { paths } from '@/types/generated/tmdb-api';

if (!process.env.NEXT_PUBLIC_TMDB_API_BASE_URL) {
  throw new Error('TMDB_API_BASE_URL environment variable is not set');
}
if (!process.env.NEXT_PUBLIC_TMDB_API_ACCESS_TOKEN) {
  throw new Error('TMDB_API_ACCESS_TOKEN environment variable is not set');
}

export const tmdbClient = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_TMDB_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
});
