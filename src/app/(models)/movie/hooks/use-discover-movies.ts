import useSWR from 'swr';

import { discoverMovies } from '@/app/(models)/movie/logic/api';

import type { MovieListResponse } from '@/app/(models)/movie/types/movie';

export const useDiscoverMovies = ({
  query,
  year,
  page = 1,
}: {
  query?: string;
  year?: number;
  page?: number;
} = {}): {
  movies: MovieListResponse['results'];
  totalPages: MovieListResponse['total_pages'];
  totalResults: MovieListResponse['total_results'];
  currentPage: MovieListResponse['page'];
  isLoading: boolean;
  isError: boolean;
  error: Error | undefined;
  mutate: () => void;
} => {
  const { data, error, isLoading, mutate } = useSWR<MovieListResponse>(
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