'use client';

import useSWR from 'swr';

import { tmdbApi } from '@/app/(models)/movie/logic/api';

import type { MovieListResponse } from '@/app/(models)/movie/types/movie';

export const useGetPopularMovies = (page = 1) => {
  const { data, error, isLoading, mutate } = useSWR<MovieListResponse>(
    [`/movie/popular`, page],
    () => tmdbApi.getPopularMovies(page),
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

export const useSearchMovies = (query: string, page = 1) => {
  const { data, error, isLoading, mutate } = useSWR<MovieListResponse>(
    query ? [`/search/movie`, query, page] : null,
    () => tmdbApi.searchMovies(query, page),
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
