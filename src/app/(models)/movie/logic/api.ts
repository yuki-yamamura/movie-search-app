import type { MovieListResponse } from '@/app/(models)/movie/types/movie';

if (!process.env.NEXT_PUBLIC_TMDB_API_BASE_URL) {
  throw new Error('TMDB_API_BASE_URL environment variable is not set');
}
if (!process.env.NEXT_PUBLIC_TMDB_API_ACCESS_TOKEN) {
  throw new Error('TMDB_API_ACCESS_TOKEN environment variable is not set');
}
if (!process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL) {
  throw new Error('TMDB_IMAGE_BASE_URL environment variable is not set');
}

export const getMovies = async (page: number = 1): Promise<MovieListResponse> => {
  const url = `${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/movie/popular?page=${page}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }

  return response.json();
};

export const searchMovies = async ({
  query,
  page,
}: {
  query: string;
  page: number;
}): Promise<MovieListResponse> => {
  const url = `${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }

  return response.json();
};

export const getImageUrl = ({
  path,
  size,
}: {
  path: string | null;
  size: 'w200' | 'w500' | 'original';
}): string => {
  return !path
    ? '/placeholder-movie.png'
    : `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/${size}${path}`;
};
