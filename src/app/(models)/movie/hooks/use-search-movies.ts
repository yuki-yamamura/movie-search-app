import useSWR from 'swr';

import { searchMovies } from '@/app/(models)/movie/logic/api';

import type { SearchMovieResponse } from '@/types/generated/movie-types';

export const useSearchMovies = (
  query: string,
  page = 1,
): {
  movies: NonNullable<SearchMovieResponse['results']>;
  totalPages: SearchMovieResponse['total_pages'];
  totalResults: SearchMovieResponse['total_results'];
  currentPage: SearchMovieResponse['page'];
  isLoading: boolean;
  isError: boolean;
  error: Error | undefined;
  mutate: () => void;
} => {
  const { data, error, isLoading, mutate } = useSWR<SearchMovieResponse>(
    query ? [`/search/movie`, query, page] : null,
    () => searchMovies({ query, page }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    movies: data?.results ?? [],
    totalPages: data?.total_pages ?? 0,
    totalResults: data?.total_results ?? 0,
    currentPage: data?.page ?? page,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
};
