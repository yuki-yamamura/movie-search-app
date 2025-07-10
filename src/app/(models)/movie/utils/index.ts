/**
 * Type utility functions and guards for TMDB movie types
 *
 * This file provides runtime type checking and utility functions
 * for working with movie data from the TMDB API.
 *
 * @fileoverview Utility functions for TMDB movie types
 * @author Generated utilities for OpenAPI types
 */

import type { Movie } from '@/app/(models)/movie/types';

// ============================================================================
// TYPE GUARD FUNCTIONS
// ============================================================================

/**
 * Type guard to check if a movie has a valid poster image
 *
 * Ensures the movie has a non-empty poster_path string.
 * Useful for conditional rendering of movie posters.
 *
 * @param movie - Movie object to check
 * @returns True if movie has a valid poster path
 *
 * @example
 * ```typescript
 * const movie: Movie = getMovieData();
 *
 * if (hasValidPoster(movie)) {
 *   // TypeScript now knows movie.poster_path is string
 *   const posterUrl = getImageUrl({ path: movie.poster_path, size: 'w500' });
 * }
 * ```
 */
export const hasValidPoster = (movie: Movie): movie is Movie & { poster_path: string } => {
  return typeof movie.poster_path === 'string' && movie.poster_path.length > 0;
};

/**
 * Type guard to check if a movie has a valid backdrop image
 *
 * Ensures the movie has a non-empty backdrop_path string.
 * Useful for conditional rendering of movie backdrops.
 *
 * @param movie - Movie object to check
 * @returns True if movie has a valid backdrop path
 *
 * @example
 * ```typescript
 * if (hasValidBackdrop(movie)) {
 *   const backdropUrl = getImageUrl({ path: movie.backdrop_path, size: 'original' });
 * }
 * ```
 */
export const hasValidBackdrop = (movie: Movie): movie is Movie & { backdrop_path: string } => {
  return typeof movie.backdrop_path === 'string' && movie.backdrop_path.length > 0;
};

/**
 * Type guard to check if a movie has complete basic information
 *
 * Ensures the movie has both title and overview as non-empty strings.
 * Useful for filtering out incomplete movie data.
 *
 * @param movie - Movie object to check
 * @returns True if movie has complete basic information
 *
 * @example
 * ```typescript
 * const movies = movieList.filter(isCompleteMovie);
 * // Now all movies in the array have title and overview
 * ```
 */
export const isCompleteMovie = (
  movie: Movie,
): movie is Movie & Required<Pick<Movie, 'title' | 'overview'>> => {
  return (
    typeof movie.title === 'string' &&
    movie.title.length > 0 &&
    typeof movie.overview === 'string' &&
    movie.overview.length > 0
  );
};

/**
 * Type guard to check if a movie has a valid release date
 *
 * Ensures the movie has a release_date in YYYY-MM-DD format.
 *
 * @param movie - Movie object to check
 * @returns True if movie has a valid release date
 *
 * @example
 * ```typescript
 * if (hasValidReleaseDate(movie)) {
 *   const year = new Date(movie.release_date).getFullYear();
 * }
 * ```
 */
export const hasValidReleaseDate = (movie: Movie): movie is Movie & { release_date: string } => {
  if (typeof movie.release_date !== 'string' || movie.release_date.length === 0) {
    return false;
  }

  // Check for YYYY-MM-DD format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(movie.release_date);
};

/**
 * Type guard to check if a movie has genre information
 *
 * Ensures the movie has a non-empty genre_ids array.
 *
 * @param movie - Movie object to check
 * @returns True if movie has genre information
 *
 * @example
 * ```typescript
 * if (hasGenres(movie)) {
 *   console.log(`Movie has ${movie.genre_ids.length} genres`);
 * }
 * ```
 */
export const hasGenres = (movie: Movie): movie is Movie & { genre_ids: number[] } => {
  return Array.isArray(movie.genre_ids) && movie.genre_ids.length > 0;
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Extract the release year from a movie's release date
 *
 * Safely extracts the year from a movie's release_date field,
 * with fallback handling for invalid or missing dates.
 *
 * @param movie - Movie object
 * @returns Release year as number, or null if unavailable
 *
 * @example
 * ```typescript
 * const year = getMovieYear(movie);
 * const displayYear = year || 'Unknown';
 * ```
 */
export const getMovieYear = (movie: Movie): number | null => {
  if (!hasValidReleaseDate(movie)) {
    return null;
  }

  const year = parseInt(movie.release_date.split('-')[0], 10);
  return isNaN(year) ? null : year;
};

/**
 * Format movie rating for display
 *
 * Formats the vote_average to a fixed number of decimal places
 * with fallback handling.
 *
 * @param movie - Movie object
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted rating string
 *
 * @example
 * ```typescript
 * const rating = formatMovieRating(movie); // "8.5"
 * const preciseRating = formatMovieRating(movie, 2); // "8.52"
 * ```
 */
export const formatMovieRating = (movie: Movie, decimals: number = 1): string => {
  if (typeof movie.vote_average !== 'number' || isNaN(movie.vote_average)) {
    return 'N/A';
  }

  return movie.vote_average.toFixed(decimals);
};

/**
 * Get a safe display title for a movie
 *
 * Returns the movie title with fallback to original title or default text.
 *
 * @param movie - Movie object
 * @param fallback - Default text when no title is available
 * @returns Safe display title
 *
 * @example
 * ```typescript
 * const title = getSafeMovieTitle(movie, 'Untitled Movie');
 * ```
 */
export const getSafeMovieTitle = (movie: Movie, fallback: string = 'Unknown Title'): string => {
  if (typeof movie.title === 'string' && movie.title.length > 0) {
    return movie.title;
  }

  if (typeof movie.original_title === 'string' && movie.original_title.length > 0) {
    return movie.original_title;
  }

  return fallback;
};

/**
 * Get a safe display overview for a movie
 *
 * Returns the movie overview with fallback text if unavailable.
 *
 * @param movie - Movie object
 * @param fallback - Default text when no overview is available
 * @returns Safe display overview
 *
 * @example
 * ```typescript
 * const overview = getSafeMovieOverview(movie, 'No description available');
 * ```
 */
export const getSafeMovieOverview = (
  movie: Movie,
  fallback: string = 'No description available',
): string => {
  return typeof movie.overview === 'string' && movie.overview.length > 0
    ? movie.overview
    : fallback;
};

/**
 * Filter movies by minimum rating
 *
 * Returns a filter function that can be used with Array.filter()
 * to get movies with at least the specified rating.
 *
 * @param minRating - Minimum vote_average required
 * @returns Filter function for use with Array.filter()
 *
 * @example
 * ```typescript
 * const highRatedMovies = movies.filter(filterByMinRating(8.0));
 * const decentMovies = movies.filter(filterByMinRating(6.5));
 * ```
 */
export const filterByMinRating = (minRating: number) => {
  return (movie: Movie): boolean => {
    return typeof movie.vote_average === 'number' && movie.vote_average >= minRating;
  };
};

/**
 * Filter movies by genre IDs
 *
 * Returns a filter function that checks if a movie belongs to any
 * of the specified genres.
 *
 * @param genreIds - Array of genre IDs to match
 * @returns Filter function for use with Array.filter()
 *
 * @example
 * ```typescript
 * const actionMovies = movies.filter(filterByGenres([28])); // Action genre
 * const actionOrAdventure = movies.filter(filterByGenres([28, 12])); // Action or Adventure
 * ```
 */
export const filterByGenres = (genreIds: number[]) => {
  return (movie: Movie): boolean => {
    if (!hasGenres(movie)) {
      return false;
    }

    return movie.genre_ids.some((id) => genreIds.includes(id));
  };
};

/**
 * Sort movies by popularity (descending)
 *
 * Comparator function for Array.sort() to sort movies by popularity.
 *
 * @param a - First movie to compare
 * @param b - Second movie to compare
 * @returns Comparison result for sorting
 *
 * @example
 * ```typescript
 * const sortedMovies = movies.sort(sortByPopularity);
 * ```
 */
export const sortByPopularity = (a: Movie, b: Movie): number => {
  const popularityA = typeof a.popularity === 'number' ? a.popularity : 0;
  const popularityB = typeof b.popularity === 'number' ? b.popularity : 0;

  return popularityB - popularityA; // Descending order
};

/**
 * Sort movies by rating (descending)
 *
 * Comparator function for Array.sort() to sort movies by vote_average.
 *
 * @param a - First movie to compare
 * @param b - Second movie to compare
 * @returns Comparison result for sorting
 *
 * @example
 * ```typescript
 * const topRatedMovies = movies.sort(sortByRating);
 * ```
 */
export const sortByRating = (a: Movie, b: Movie): number => {
  const ratingA = typeof a.vote_average === 'number' ? a.vote_average : 0;
  const ratingB = typeof b.vote_average === 'number' ? b.vote_average : 0;

  return ratingB - ratingA; // Descending order
};

/**
 * Sort movies by release date (newest first)
 *
 * Comparator function for Array.sort() to sort movies by release date.
 *
 * @param a - First movie to compare
 * @param b - Second movie to compare
 * @returns Comparison result for sorting
 *
 * @example
 * ```typescript
 * const newestMovies = movies.sort(sortByReleaseDate);
 * ```
 */
export const sortByReleaseDate = (a: Movie, b: Movie): number => {
  const dateA = hasValidReleaseDate(a) ? new Date(a.release_date).getTime() : 0;
  const dateB = hasValidReleaseDate(b) ? new Date(b.release_date).getTime() : 0;

  return dateB - dateA; // Descending order (newest first)
};
