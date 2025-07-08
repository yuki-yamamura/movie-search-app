import useSWR from 'swr';

import { discoverMovies } from '@/app/(models)/movie/logic/api';

import type { SearchMovieResponse, DiscoverMovieResponse } from '@/types/generated/movie-types';

export const useDiscoverMovies = ({
  query,
  year,
  page = 1,
}: {
  query?: string;
  year?: number;
  page?: number;
} = {}): {
  movies: NonNullable<SearchMovieResponse['results'] | DiscoverMovieResponse['results']>;
  totalPages: SearchMovieResponse['total_pages'] | DiscoverMovieResponse['total_pages'];
  totalResults: SearchMovieResponse['total_results'] | DiscoverMovieResponse['total_results'];
  currentPage: SearchMovieResponse['page'] | DiscoverMovieResponse['page'];
  isLoading: boolean;
  isError: boolean;
  error: Error | undefined;
  mutate: () => void;
} => {
  const { data, error, isLoading, mutate } = useSWR<SearchMovieResponse | DiscoverMovieResponse>(
    [`/discover/movie`, query, year, page],
    () => discoverMovies({ query, year, page }),
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