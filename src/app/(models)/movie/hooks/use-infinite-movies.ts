import { useCallback } from 'react';
import useSWRInfinite from 'swr/infinite';

import { searchMovies } from '@/app/(models)/movie/api/client';
import { START_PAGE_INDEX } from '@/app/(models)/movie/constants';

import type { MovieSearchParams } from '@/app/(models)/movie/schemas/movie-search-params';
import type { DiscoverMovieResponse, SearchMovieResponse } from '@/app/(models)/movie/types';
import type { SWRInfiniteKeyLoader } from 'swr/infinite';

type UseInfiniteMoviesParams = Pick<MovieSearchParams, 'search' | 'releaseYear'> & {
  initialData?: (DiscoverMovieResponse | SearchMovieResponse)[];
};

export const useInfiniteMovies = ({
  search,
  releaseYear,
  initialData,
}: UseInfiniteMoviesParams) => {
  const getKey: SWRInfiniteKeyLoader = useCallback(
    (pageIndex: number, previousPageData: DiscoverMovieResponse | SearchMovieResponse | null) => {
      if (pageIndex === 0) {
        return ['movies', search, releaseYear, START_PAGE_INDEX];
      }

      if (previousPageData && !previousPageData.results?.length) {
        return null;
      }

      return ['movies', search, releaseYear, pageIndex + 1];
    },
    [search, releaseYear],
  );
  const shouldUseInitialData = !search && !releaseYear;

  const {
    data,
    error,
    size: currentPage,
    setSize,
    isLoading,
    isValidating,
  } = useSWRInfinite(getKey, fetcher, {
    fallbackData: shouldUseInitialData ? initialData : undefined,
  });

  const movies = data?.flatMap((page) => page.results)?.filter((movie) => !!movie) ?? [];
  const totalPages = data?.[0]?.total_pages || 0;
  const totalMovies = data?.[0]?.total_results || 0;
  const hasNextPage = currentPage < totalPages;
  const isLoadingMore = isValidating && !!data;

  const loadNextPage = () => {
    if (hasNextPage && !isValidating) {
      setSize(currentPage + 1);
    }
  };

  return {
    movies,
    isLoading,
    isLoadingMore,
    hasNextPage,
    totalMovies,
    loadNextPage,
    error,
  };
};

const fetcher = async (
  key: readonly [
    string,
    MovieSearchParams['search'],
    MovieSearchParams['releaseYear'],
    MovieSearchParams['page'],
  ],
) => {
  const [, search, releaseYear, page] = key;
  const params: MovieSearchParams = {
    search,
    releaseYear,
    page,
  };

  return searchMovies(params);
};
