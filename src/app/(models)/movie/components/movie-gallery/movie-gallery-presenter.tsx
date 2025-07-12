'use client';

import { useQueryStates } from 'nuqs';

import { LoadMoreButton } from '@/app/(models)/movie/components/load-more-button';
import { MovieList } from '@/app/(models)/movie/components/movie-list';
import { useInfiniteMovies } from '@/app/(models)/movie/hooks/use-infinite-movies';
import { movieSearchParamsSchema } from '@/app/(models)/movie/schemas/movie-search-params';

export const MovieGalleryPresenter = () => {
  const [{ search, releaseYear }] = useQueryStates(movieSearchParamsSchema);
  const { movies, isValidating, hasNextPage, totalMovies, loadNextPage, error } = useInfiniteMovies(
    {
      search,
      releaseYear,
    },
  );

  if (error) {
    return <div>映画の読み込みに失敗しました。</div>;
  }

  return (
    <div>
      <MovieList movies={movies} />
      <LoadMoreButton
        onLoadMore={loadNextPage}
        isLoading={isValidating}
        hasMorePages={hasNextPage}
        totalMovies={totalMovies}
        currentCount={movies.length}
      />
    </div>
  );
};
