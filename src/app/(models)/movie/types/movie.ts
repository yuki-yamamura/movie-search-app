/**
 * Movie type definitions
 * 
 * Re-exports from generated OpenAPI types for backward compatibility
 * and convenience. These types are automatically generated from the
 * TMDB OpenAPI schema and provide full type safety.
 * 
 * @fileoverview Movie types for TMDB API
 * @deprecated Use types from @/types/generated/movie-types directly
 */

// Re-export all types from generated files for backward compatibility
export type {
  Movie,
  MovieListResponse,
  SearchMovieResponse,
  PopularMovieResponse,
  DiscoverMovieResponse,
  Genre,
  TMDBError,
  TMDBApiError
} from '@/types/generated/movie-types';

// Re-export utility functions
export {
  hasValidPoster,
  hasValidBackdrop,
  isCompleteMovie,
  hasValidReleaseDate,
  hasGenres,
  getMovieYear,
  formatMovieRating,
  getSafeMovieTitle,
  getSafeMovieOverview,
  filterByMinRating,
  filterByGenres,
  sortByPopularity,
  sortByRating,
  sortByReleaseDate
} from '@/types/generated/movie-utils';