'use client';

import { useQueryStates } from 'nuqs';

import { LoadMoreButton } from '@/app/(models)/movie/components/load-more-button';
import { MovieList } from '@/app/(models)/movie/components/movie-list';
import { useInfiniteMovies } from '@/app/(models)/movie/hooks/use-infinite-movies';
import { movieSearchParamsSchema } from '@/app/(models)/movie/schemas/movie-search-params';

import type { DiscoverMovieResponse, SearchMovieResponse } from '@/app/(models)/movie/types';

type Props = {
  initialMovies?: DiscoverMovieResponse | SearchMovieResponse;
};

export const MovieGalleryPresenter = ({ initialMovies }: Props) => {
  const [{ search, releaseYear }] = useQueryStates(movieSearchParamsSchema);
  const { movies, isLoadingMore, hasMorePages, totalResults, loadMore, error } = useInfiniteMovies({
    search,
    releaseYear,
    initialData: initialMovies ? [initialMovies] : undefined,
  });

  if (error) {
    return <div>映画の読み込みに失敗しました。</div>;
  }

  return (
    <div>
      <MovieList movies={movies} />
      <LoadMoreButton
        onLoadMore={loadMore}
        isLoading={isLoadingMore}
        hasMorePages={hasMorePages}
        totalResults={totalResults}
        currentCount={movies.length}
      />
    </div>
  );
};
