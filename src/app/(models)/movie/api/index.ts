import { TMDBError } from '@/app/(models)/movie/types';
import { tmdbClient } from '@/lib/tmdb';

import type { MovieSearchParams } from '../schemas/movie-search-params';
import type { DiscoverMovieResponse } from '@/app/(models)/movie/types';

export const searchMovies = async ({
  search,
  releaseYear,
  page,
}: MovieSearchParams): Promise<DiscoverMovieResponse> => {
  if (search) {
    const { data, error } = await tmdbClient.GET('/3/search/movie', {
      params: {
        query: {
          query: search,
          page,
          ...(releaseYear && { year: releaseYear.toString() }),
        },
      },
    });

    if (error) {
      throw new TMDBError(error);
    }

    return data;
  }

  const { data, error } = await tmdbClient.GET('/3/discover/movie', {
    params: {
      query: {
        page,
        sort_by: 'popularity.desc',
        ...(releaseYear && { primary_release_year: releaseYear }),
      },
    },
  });

  if (error) {
    throw new TMDBError(error);
  }

  return data;
};

export const getImageUrl = ({
  path,
  size,
}: {
  path: string | null | undefined;
  size: 'w200' | 'w500' | 'original';
}): string => {
  if (!process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL) {
    throw new Error('TMDB_IMAGE_BASE_URL environment variable is not set');
  }

  return !path
    ? '/placeholder-movie.png'
    : `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/${size}${path}`;
};
