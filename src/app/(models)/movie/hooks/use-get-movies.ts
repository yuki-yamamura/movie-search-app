import useSWR from 'swr';

import { getMovies } from '@/app/(models)/movie/logic/api';

import type { PopularMovieResponse } from '@/types/generated/movie-types';

export const useGetMovies = (
  page = 1,
): {
  movies: NonNullable<PopularMovieResponse['results']>;
  totalPages: PopularMovieResponse['total_pages'];
  totalResults: PopularMovieResponse['total_results'];
  currentPage: PopularMovieResponse['page'];
  isLoading: boolean;
  isError: boolean;
  error: Error | undefined;
  mutate: () => void;
} => {
  const { data, error, isLoading, mutate } = useSWR<PopularMovieResponse>(
    [`/movie/popular`, page],
    () => getMovies(page),
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
