'use client';

import { useQueryStates } from 'nuqs';

import { LoadMoreButton } from '@/app/(models)/movie/components/load-more-button';
import { MovieList } from '@/app/(models)/movie/components/movie-list';
import { useInfiniteMovies } from '@/app/(models)/movie/hooks/use-infinite-movies';
import { movieSearchParamsSchema } from '@/app/(models)/movie/schemas/movie-search-params';
import { LoadingSpinner } from '@/components/loading-spinner';

import type { DiscoverMovieResponse, SearchMovieResponse } from '@/app/(models)/movie/types';

type Props = {
  initialData?: DiscoverMovieResponse | SearchMovieResponse;
};

export const MovieGalleryPresenter = ({ initialData }: Props) => {
  const [{ search, releaseYear }] = useQueryStates(movieSearchParamsSchema);
  const { movies, isLoading, isLoadingMore, hasNextPage, totalMovies, loadNextPage, error } =
    useInfiniteMovies({
      search,
      releaseYear,
      initialData: initialData && [initialData],
    });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>映画の読み込みに失敗しました。</div>;
  }

  return (
    <div>
      <MovieList movies={movies} />
      {!isLoading && (
        <LoadMoreButton
          onLoadMore={loadNextPage}
          isLoading={isLoadingMore}
          hasMorePages={hasNextPage}
          totalMovies={totalMovies}
          currentCount={movies.length}
        />
      )}
    </div>
  );
};
