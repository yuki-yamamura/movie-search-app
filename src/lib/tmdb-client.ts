/**
 * Type-safe TMDB API client using openapi-fetch
 */

import createClient from 'openapi-fetch';

import type { TMDBApiPaths } from '@/types/generated/movie-types';

if (!process.env.NEXT_PUBLIC_TMDB_API_BASE_URL) {
  throw new Error('TMDB_API_BASE_URL environment variable is not set');
}
if (!process.env.NEXT_PUBLIC_TMDB_API_ACCESS_TOKEN) {
  throw new Error('TMDB_API_ACCESS_TOKEN environment variable is not set');
}

// Create the type-safe API client
export const tmdbClient = createClient<TMDBApiPaths>({
  baseUrl: process.env.NEXT_PUBLIC_TMDB_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

// Export for convenience
export default tmdbClient;
