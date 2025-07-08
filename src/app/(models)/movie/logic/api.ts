import { tmdbClient } from '@/lib/tmdb-client';
import { TMDBError } from '@/types/generated/movie-types';

import type { PopularMovieResponse, SearchMovieResponse } from '@/types/generated/movie-types';

// Environment variables are validated in tmdb-client.ts

/**
 * Fetch popular movies from TMDB API
 *
 * @param page - Page number for pagination (default: 1)
 * @returns Promise resolving to popular movies response
 * @throws Error if API request fails
 *
 * @example
 * ```typescript
 * const movies = await getMovies(1);
 * console.log(`Found ${movies.results?.length} popular movies`);
 * ```
 */
export const getMovies = async (page: number = 1): Promise<PopularMovieResponse> => {
  const { data, error } = await tmdbClient.GET('/3/movie/popular', {
    params: {
      query: {
        page: page,
      },
    },
  });

  if (error) {
    throw new TMDBError(error);
  }

  return data;
};

/**
 * Search for movies by title
 *
 * @param params - Search parameters
 * @param params.query - Search query string
 * @param params.page - Page number for pagination
 * @returns Promise resolving to search results
 * @throws Error if API request fails
 *
 * @example
 * ```typescript
 * const results = await searchMovies({ query: "Inception", page: 1 });
 * console.log(`Found ${results.total_results} movies matching "Inception"`);
 * ```
 */
export const searchMovies = async ({
  query,
  page,
}: {
  query: string;
  page: number;
}): Promise<SearchMovieResponse> => {
  const { data, error } = await tmdbClient.GET('/3/search/movie', {
    params: {
      query: {
        query: query,
        page: page,
      },
    },
  });

  if (error) {
    throw new TMDBError(error);
  }

  return data;
};

/**
 * Generate TMDB image URL from path and size
 *
 * Constructs a full URL for TMDB images (posters, backdrops, etc.)
 * from the relative path returned by the API.
 *
 * @param params - Image URL parameters
 * @param params.path - Relative image path from TMDB API (e.g., "/abc123.jpg")
 * @param params.size - Image size variant
 * @returns Full image URL or placeholder if path is empty
 *
 * @example
 * ```typescript
 * const posterUrl = getImageUrl({
 *   path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
 *   size: "w500"
 * });
 * // Returns: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
 *
 * const fallback = getImageUrl({ path: null, size: "w500" });
 * // Returns: "/placeholder-movie.png"
 * ```
 */
export const getImageUrl = ({
  path,
  size,
}: {
  path: string | null | undefined;
  size: 'w200' | 'w500' | 'original';
}): string => {
  if (!process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL) {
    throw new Error('TMDB_IMAGE_BASE_URL environment variable is not set');
  }

  return !path
    ? '/placeholder-movie.png'
    : `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/${size}${path}`;
};
