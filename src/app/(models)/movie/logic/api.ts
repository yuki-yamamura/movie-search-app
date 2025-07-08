/**
 * TMDB API client implementation using openapi-fetch
 * 
 * This module provides type-safe API client functions for The Movie Database (TMDB) API.
 * All functions use openapi-fetch for automatic type inference and runtime validation.
 * 
 * @fileoverview TMDB API client with generated types
 * @author Claude Code
 * @see https://developer.themoviedb.org/docs for API documentation
 */

import createClient from 'openapi-fetch';

import { TMDBError } from '@/types/generated/movie-types';

import type { 
  TMDBApiPaths, 
  PopularMovieResponse,
  SearchMovieResponse, 
  DiscoverMovieResponse
} from '@/types/generated/movie-types';

// ============================================================================
// API CLIENT SETUP
// ============================================================================

// Validate required environment variables
if (!process.env.NEXT_PUBLIC_TMDB_API_BASE_URL) {
  throw new Error('TMDB_API_BASE_URL environment variable is not set');
}
if (!process.env.NEXT_PUBLIC_TMDB_API_ACCESS_TOKEN) {
  throw new Error('TMDB_API_ACCESS_TOKEN environment variable is not set');
}
if (!process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL) {
  throw new Error('TMDB_IMAGE_BASE_URL environment variable is not set');
}

/**
 * Type-safe TMDB API client
 * 
 * Created using openapi-fetch with auto-generated types from the OpenAPI schema.
 * Provides compile-time type checking and IntelliSense support for all endpoints.
 */
const client = createClient<TMDBApiPaths>({
  baseUrl: process.env.NEXT_PUBLIC_TMDB_API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

// ============================================================================
// API FUNCTIONS
// ============================================================================

/**
 * Get popular movies from TMDB
 *
 * Fetches the current list of popular movies with pagination support.
 * Results are sorted by popularity in descending order.
 *
 * @param page - Page number for pagination (default: 1)
 * @returns Promise resolving to popular movies response
 * @throws TMDBError if API request fails
 *
 * @example
 * ```typescript
 * const popularMovies = await getMovies(1);
 * console.log(`Found ${popularMovies.total_results} popular movies`);
 * const movies = popularMovies.results || [];
 * ```
 */
export const getMovies = async (page: number = 1): Promise<PopularMovieResponse> => {
  const { data, error } = await client.GET('/3/movie/popular', {
    params: {
      query: { page }
    }
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
 * @throws TMDBError if API request fails
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
  const { data, error } = await client.GET('/3/search/movie', {
    params: {
      query: { 
        query, 
        page 
      }
    }
  });

  if (error) {
    throw new TMDBError(error);
  }

  return data;
};

/**
 * Discover movies with advanced filtering
 *
 * Uses TMDB's discover endpoint to find movies with various filters.
 * Supports both text search (via search endpoint) and filtering (via discover endpoint).
 *
 * @param params - Discovery parameters
 * @param params.query - Optional search query (uses search endpoint when provided)
 * @param params.year - Optional release year filter
 * @param params.page - Page number for pagination
 * @returns Promise resolving to discovery results
 * @throws TMDBError if API request fails
 *
 * @example
 * ```typescript
 * // Discover movies from 2023
 * const movies2023 = await discoverMovies({ year: 2023, page: 1 });
 * 
 * // Search for Batman movies from 2022
 * const batmanMovies = await discoverMovies({ 
 *   query: "Batman", 
 *   year: 2022, 
 *   page: 1 
 * });
 * ```
 */
export const discoverMovies = async ({
  query,
  year,
  page = 1,
}: {
  query?: string;
  year?: number;
  page?: number;
} = {}): Promise<SearchMovieResponse | DiscoverMovieResponse> => {
  // If we have a search query, use the search endpoint with year filter
  if (query) {
    const { data, error } = await client.GET('/3/search/movie', {
      params: {
        query: {
          query,
          page,
          ...(year && { year: year.toString() })
        }
      }
    });

    if (error) {
      throw new TMDBError(error);
    }

    return data;
  }

  // Otherwise use discover endpoint for filtering
  const { data, error } = await client.GET('/3/discover/movie', {
    params: {
      query: {
        page,
        sort_by: 'popularity.desc',
        ...(year && { primary_release_year: year })
      }
    }
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