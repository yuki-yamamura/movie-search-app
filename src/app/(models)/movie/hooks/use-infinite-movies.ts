import { useCallback } from 'react';
import useSWRInfinite from 'swr/infinite';

import { searchMovies } from '@/app/(models)/movie/api';

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
    () =>
      (pageIndex: number, previousPageData: DiscoverMovieResponse | SearchMovieResponse | null) => {
        if (pageIndex === 0) {
          return ['movies', search, releaseYear, 1];
        }

        if (previousPageData && !previousPageData.results?.length) {
          return null;
        }

        return ['movies', search, releaseYear, pageIndex + 1];
      },
    [search, releaseYear],
  );

  const { data, error, size, setSize, isLoading, isValidating, mutate } = useSWRInfinite(
    getKey,
    fetcher,
    {
      initialData,
    },
  );

  // 全映画を統合
  const movies = data?.flatMap((page) => page.results || []) || [];

  // ページ情報
  const totalPages = data?.[0]?.total_pages || 0;
  const totalResults = data?.[0]?.total_results || 0;
  const currentPage = size;

  // 次のページがあるかチェック
  const hasMorePages = currentPage < totalPages;

  // Load more function
  const loadMore = () => {
    if (hasMorePages && !isValidating) {
      setSize(size + 1);
    }
  };

  // データをリセットする関数
  const resetData = () => {
    setSize(1);
    mutate();
  };

  return {
    movies,
    isLoading,
    isLoadingMore: isValidating && size > 0,
    hasMorePages,
    totalResults,
    totalPages,
    currentPage,
    loadMore,
    resetData,
    error,
  };
};

const fetcher = async ([_, search, releaseYear, page]: [
  string,
  MovieSearchParams['search'],
  MovieSearchParams['releaseYear'],
  MovieSearchParams['page'],
]) => {
  const params: MovieSearchParams = {
    search,
    releaseYear,
    page,
  };

  return searchMovies(params);
};
