'use server';

import { TMDBError } from '@/app/(models)/movie/types';
import { tmdbClient } from '@/lib/tmdb';

import type { MovieSearchParams } from '@/app/(models)/movie/schemas/movie-search-params';

export const searchMovies = async ({ search, releaseYear, page }: MovieSearchParams) => {
  const result = !!search
    ? tmdbClient.GET('/3/search/movie', {
        params: {
          query: {
            page,
            query: search,
            ...(releaseYear && { primary_release_year: releaseYear.toString() }),
          },
        },
      })
    : tmdbClient.GET('/3/discover/movie', {
        params: {
          query: {
            page,
            ...(releaseYear && { primary_release_year: releaseYear }),
          },
        },
      });
  const { data, error } = await result;

  if (error) {
    throw new TMDBError(error);
  }

  if (!releaseYear) {
    return data;
  }

  /**
   * NOTE:
   *  TMDB API (`/3/search/movie`) の `year` フィールドでリリース年を指定しても、なぜかそれ以外の映画もレスポンスに含まれる。
   *  そのため、API側での対応は困難と判断して、プログラム上でリリース年の絞り込みを行うことにした。
   */
  const filteredMovies = data.results?.filter(
    (movie) => movie.release_date && movie.release_date.startsWith(releaseYear.toString()),
  );

  const filteredCount = filteredMovies?.length ?? 0;
  const currentPageFilteredRatio = filteredCount / (data.results?.length ?? 1);
  const totalResults = Math.round((data.total_results ?? 0) * currentPageFilteredRatio);

  return {
    ...data,
    results: filteredMovies,
    total_results: totalResults,
    total_pages: data.total_pages,
  };
};
