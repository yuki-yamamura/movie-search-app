import { useState, useEffect, useCallback } from 'react';
import useSWR from 'swr';

import { discoverMovies } from '@/app/(models)/movie/logic/api';

import type { Movie, SearchMovieResponse, DiscoverMovieResponse } from '@/types/generated/movie-types';

type Props = {
  initialMovies: Movie[];
  searchQuery: string;
  releaseYear: string;
  currentPage: number;
  totalPages: number;
  totalResults: number;
};

export const useLoadMoreMovies = ({
  initialMovies,
  searchQuery,
  releaseYear,
  currentPage,
  totalPages: initialTotalPages,
  totalResults: initialTotalResults,
}: Props) => {
  const [accumulatedMovies, setAccumulatedMovies] = useState<Movie[]>(initialMovies);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // SWR for additional pages (page > 1)
  const { data, error } = useSWR<SearchMovieResponse | DiscoverMovieResponse>(
    currentPage > 1 ? ['discover-movies', searchQuery, releaseYear, currentPage] : null,
    () => discoverMovies({ 
      query: searchQuery || undefined, 
      year: releaseYear ? parseInt(releaseYear) : undefined, 
      page: currentPage 
    }),
    { 
      revalidateOnFocus: false, 
      revalidateOnReconnect: false 
    }
  );

  // Accumulate movies when new page data arrives
  useEffect(() => {
    if (data?.results && data.results.length > 0 && currentPage > 1) {
      setAccumulatedMovies(prev => [...prev, ...(data.results || [])]);
      setIsLoadingMore(false);
    }
  }, [data, currentPage]);

  // Reset accumulated movies when search/filter changes
  useEffect(() => {
    setAccumulatedMovies(initialMovies);
    setIsLoadingMore(false);
  }, [searchQuery, releaseYear, initialMovies]);

  const loadMore = useCallback(() => {
    setIsLoadingMore(true);
    // Page increment is handled by parent component via URL state
  }, []);

  const totalPages = data?.total_pages ?? initialTotalPages;
  const totalResults = data?.total_results ?? initialTotalResults;
  const hasMorePages = currentPage < totalPages;

  return {
    movies: accumulatedMovies,
    isLoadingMore,
    hasMorePages,
    totalResults,
    totalPages,
    currentPage,
    loadMore,
    error
  };
};