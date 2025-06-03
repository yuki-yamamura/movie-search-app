import type { MovieListResponse } from '@/app/(models)/movie/types/movie';

const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const tmdbApi = {
  getPopularMovies: async (page = 1): Promise<MovieListResponse> => {
    const response = await fetch(`${TMDB_API_BASE_URL}/movie/popular?page=${page}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    return response.json();
  },

  searchMovies: async (query: string, page = 1): Promise<MovieListResponse> => {
    const response = await fetch(
      `${TMDB_API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    return response.json();
  },

  getImageUrl: (path: string | null, size: 'w200' | 'w500' | 'original' = 'w500'): string => {
    if (!path) {
      return '/placeholder-movie.png'; // You'll need to add this placeholder image
    }
    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
  },
};
