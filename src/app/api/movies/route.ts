import { NextResponse } from 'next/server';
import { createSearchParamsCache } from 'nuqs/server';

import { searchMovies } from '@/app/(models)/movie/api/server';
import { movieSearchParamsSchema } from '@/app/(models)/movie/schemas/movie-search-params';

import type { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    const searchParamsCache = createSearchParamsCache(movieSearchParamsSchema);
    const { searchParams } = new URL(request.url);
    const { search, releaseYear, page } = searchParamsCache.parse(
      Object.fromEntries(searchParams.entries()),
    );

    const data = await searchMovies({ search, releaseYear, page });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Movies API error:', error);

    return NextResponse.json({ error: '映画の検索に失敗しました。' }, { status: 500 });
  }
};
