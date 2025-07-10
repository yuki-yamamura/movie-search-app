/**
 * Movie-related types extracted from TMDB OpenAPI v3 schema
 *
 * This file provides convenient type aliases for the generated OpenAPI types,
 * making them easier to use throughout the application while maintaining
 * full type safety and IntelliSense support.
 *
 * @fileoverview Type definitions for TMDB (The Movie Database) API responses
 * @author Generated from OpenAPI schema with manual type mapping
 * @see https://developer.themoviedb.org/docs for API documentation
 */

import type { paths, operations } from './generated/tmdb-api';

// ============================================================================
// MOVIE LIST RESPONSE TYPES
// ============================================================================

/**
 * Response type for movie search endpoint (/3/search/movie)
 *
 * Used when searching for movies by title, returning a paginated list
 * of movies matching the search query.
 *
 * @example
 * ```typescript
 * const searchResponse: SearchMovieResponse = await searchMovies({ query: "Inception", page: 1 });
 * console.log(`Found ${searchResponse.total_results} movies`);
 * ```
 */
export type SearchMovieResponse =
  operations['search-movie']['responses']['200']['content']['application/json'];

/**
 * Individual movie object from search results
 *
 * Represents a single movie from the search endpoint response.
 * Note: Some fields may be optional as they come from the API.
 *
 * @example
 * ```typescript
 * const movie: SearchMovieResult = {
 *   id: 27205,
 *   title: "Inception",
 *   overview: "Cobb, a skilled thief...",
 *   poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
 *   release_date: "2010-07-16",
 *   vote_average: 8.4,
 *   // ... other properties
 * };
 * ```
 */
export type SearchMovieResult = NonNullable<SearchMovieResponse['results']>[0];

/**
 * Response type for popular movies endpoint (/3/movie/popular)
 *
 * Returns currently popular movies in a paginated format.
 * Used for displaying trending/popular movie content.
 *
 * @example
 * ```typescript
 * const popularResponse: PopularMovieResponse = await getMovies(1);
 * const movies = popularResponse.results || [];
 * ```
 */
export type PopularMovieResponse =
  operations['movie-popular-list']['responses']['200']['content']['application/json'];

/**
 * Individual movie object from popular movies response
 *
 * Represents a single movie from the popular movies endpoint.
 * Structure should be identical to SearchMovieResult.
 */
export type PopularMovieResult = NonNullable<PopularMovieResponse['results']>[0];

/**
 * Response type for movie discovery endpoint (/3/discover/movie)
 *
 * Used for advanced movie filtering and discovery with various
 * query parameters like genre, year, rating, etc.
 */
export type DiscoverMovieResponse =
  operations['discover-movie']['responses']['200']['content']['application/json'];

/**
 * Individual movie object from discover movies response
 *
 * Represents a single movie from the discovery endpoint.
 * Structure should be identical to other movie result types.
 */
export type DiscoverMovieResult = NonNullable<DiscoverMovieResponse['results']>[0];

// ============================================================================
// MOVIE DETAILS TYPES
// ============================================================================

/**
 * Response type for movie details endpoint (/3/movie/{movie_id})
 *
 * Provides comprehensive movie information including budget, revenue,
 * production companies, and other detailed metadata not available
 * in list endpoints.
 *
 * @example
 * ```typescript
 * const movieDetails: MovieDetailsResponse = await getMovieDetails(27205);
 * console.log(`Budget: $${movieDetails.budget?.toLocaleString()}`);
 * ```
 */
export type MovieDetailsResponse =
  operations['movie-details']['responses']['200']['content']['application/json'];

// ============================================================================
// GENRE TYPES
// ============================================================================

/**
 * Response type for genre list endpoint (/3/genre/movie/list)
 *
 * Returns the complete list of official movie genres used by TMDB.
 */
export type GenreListResponse =
  operations['genre-movie-list']['responses']['200']['content']['application/json'];

/**
 * Individual genre object
 *
 * Represents a single movie genre with ID and name.
 *
 * @example
 * ```typescript
 * const genre: Genre = {
 *   id: 28,
 *   name: "Action"
 * };
 * ```
 */
export type Genre = NonNullable<GenreListResponse['genres']>[0];

// ============================================================================
// CONVENIENCE UNION TYPES
// ============================================================================

/**
 * Union type for all movie result types
 *
 * This provides a single type that can represent any movie object
 * from search, popular, or discover endpoints. All these types
 * should have the same structure according to the TMDB API.
 *
 * @example
 * ```typescript
 * const renderMovie = (movie: Movie) => {
 *   return `${movie.title} (${movie.release_date?.split('-')[0]})`;
 * };
 * ```
 */
export type Movie = SearchMovieResult | PopularMovieResult | DiscoverMovieResult;

/**
 * Union type for all paginated movie list responses
 *
 * Useful for functions that can handle any type of movie list response.
 *
 * @example
 * ```typescript
 * const extractMovies = (response: MovieListResponse): Movie[] => {
 *   return response.results || [];
 * };
 * ```
 */
export type MovieListResponse = SearchMovieResponse | PopularMovieResponse | DiscoverMovieResponse;

// ============================================================================
// API CLIENT TYPES
// ============================================================================

/**
 * Complete paths type from the generated OpenAPI schema
 *
 * Used by openapi-fetch for type-safe API client creation.
 * Contains all available endpoints with their parameter and response types.
 */
export type TMDBApiPaths = paths;

/**
 * Complete operations type from the generated OpenAPI schema
 *
 * Used for extracting specific operation types for advanced use cases.
 */
export type TMDBApiOperations = operations;

// ============================================================================
// ERROR RESPONSE TYPES
// ============================================================================

/**
 * TMDB API error response structure
 *
 * Standard error format returned by TMDB API when requests fail.
 *
 * @example
 * ```typescript
 * // API returns this structure for errors
 * const errorResponse: TMDBApiError = {
 *   status_code: 34,
 *   status_message: "The resource you requested could not be found."
 * };
 * ```
 */
export interface TMDBApiError {
  /** Numeric error code from TMDB API */
  status_code?: number;
  /** Human-readable error message */
  status_message?: string;
  /** Additional error details (when available) */
  errors?: string[];
}

/**
 * Enhanced error class for TMDB API errors
 *
 * Provides structured error information with TMDB-specific details.
 *
 * @example
 * ```typescript
 * try {
 *   const movies = await getMovies(999999);
 * } catch (error) {
 *   if (error instanceof TMDBError) {
 *     console.log(`TMDB Error ${error.statusCode}: ${error.message}`);
 *   }
 * }
 * ```
 */
export class TMDBError extends Error {
  /** TMDB API status code */
  public readonly statusCode?: number;
  /** TMDB API status message */
  public readonly statusMessage?: string;
  /** Additional error details */
  public readonly errors?: string[];

  constructor(error: TMDBApiError, message?: string) {
    super(message || error.status_message || 'TMDB API Error');
    this.name = 'TMDBError';
    this.statusCode = error.status_code;
    this.statusMessage = error.status_message;
    this.errors = error.errors;
  }
}
