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

  /**
   * NOTE:
   *  TMDB API (`/3/search/movie`) の `year` フィールドでリリース年を指定しても、なぜかそれ以外の映画もレスポンスに含まれる。
   *  そのため、API側での対応は困難と判断して、プログラム上でリリース年の絞り込みを行うことにした。
   */
  if (!releaseYear) {
    return data;
  }
  const filteredMovies = data.results?.filter((movie) => {
    return movie.release_date && movie.release_date.startsWith(releaseYear.toString());
  });

  return {
    ...data,
    results: filteredMovies,
  };
};
