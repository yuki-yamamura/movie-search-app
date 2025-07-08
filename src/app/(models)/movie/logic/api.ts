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
  const url = `${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/3/movie/popular?page=${page}`;
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
  const url = `${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/3/search/movie?query=${encodeURIComponent(query)}&page=${page}`;
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

export const discoverMovies = async ({
  query,
  year,
  page = 1,
}: {
  query?: string;
  year?: number;
  page?: number;
} = {}): Promise<MovieListResponse> => {
  // If we have a search query, use the search endpoint with year filter
  if (query) {
    const params = new URLSearchParams({
      query: encodeURIComponent(query),
      page: page.toString(),
      ...(year && { year: year.toString() }),
    });
    const url = `${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/3/search/movie?${params}`;
    
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
  }

  // Otherwise use discover endpoint for filtering
  const params = new URLSearchParams({
    page: page.toString(),
    sort_by: 'popularity.desc',
    ...(year && { primary_release_year: year.toString() }),
  });
  const url = `${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/3/discover/movie?${params}`;
  
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
