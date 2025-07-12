import { createSerializer } from 'nuqs';

import { movieSearchParamsSchema } from '@/app/(models)/movie/schemas/movie-search-params';
import { pathMap } from '@/utils/path-map';

import type { MovieSearchParams } from '@/app/(models)/movie/schemas/movie-search-params';

export const searchMovies = async ({ search, releaseYear, page }: MovieSearchParams) => {
  const serialize = createSerializer(movieSearchParamsSchema);
  const searchParams = serialize({ search, releaseYear, page });

  const queryString = searchParams.toString();
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const url = queryString
    ? `${baseUrl}${pathMap['/api/movies'].get()}?${queryString}`
    : `${baseUrl}${pathMap['/api/movies'].get()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('映画の検索に失敗しました。');
  }

  return response.json();
};
