import path from 'path';

import { TMDBError } from '@/app/(models)/movie/types';
import { tmdbClient } from '@/lib/tmdb';

import type { MovieSearchParams } from '@/app/(models)/movie/schemas/movie-search-params';

export const searchMovies = async ({ search, releaseYear, page }: MovieSearchParams) => {
  const result = search
    ? tmdbClient.GET('/3/search/movie', {
        params: {
          query: {
            page,
            query: search,
            ...(releaseYear && { year: releaseYear.toString() }),
          },
        },
      })
    : tmdbClient.GET('/3/discover/movie', {
        params: {
          query: {
            page,
            sort_by: 'popularity.desc',
            ...(releaseYear && { primary_release_year: releaseYear }),
          },
        },
      });
  const { data, error } = await result;

  if (error) {
    throw new TMDBError(error);
  }

  return data;
};

export const getImageUrl = ({
  imagePath,
  size = 'w500',
}: {
  imagePath?: string;
  size?: 'w200' | 'w500' | 'original';
}) => {
  if (!process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL) {
    throw new Error('TMDB_IMAGE_BASE_URL environment variable is not set');
  }

  return imagePath
    ? path.join(process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL, size, imagePath)
    : '/placeholder-movie.png';
};
