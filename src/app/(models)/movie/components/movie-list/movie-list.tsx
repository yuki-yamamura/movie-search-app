import { LoadMoreButton } from '@/app/(models)/movie/components/load-more-button';

import { MovieCard } from './movie-card';

import type { MovieListResponse } from '@/types/generated/movie-types';

import styles from './movie-list.module.css';

type Props = {
  movies: MovieListResponse['results'];
  isLoading?: boolean;
  error?: Error;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
  hasMorePages?: boolean;
  totalResults?: number;
};

export const MovieList = ({ 
  movies, 
  isLoading, 
  error, 
  onLoadMore,
  isLoadingMore = false,
  hasMorePages = false,
  totalResults = 0
}: Props) => {
  // Show loading only for initial load (not for Load More)
  if (isLoading && (!movies || movies.length === 0)) {
    return <div className={styles.loading}>Loading movies...</div>;
  }

  if (error && (!movies || movies.length === 0)) {
    return <div className={styles.error}>Error loading movies: {error.message}</div>;
  }

  if (!movies || movies.length === 0) {
    return <div className={styles.empty}>No movies found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.base}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {onLoadMore && (
        <LoadMoreButton
          onLoadMore={onLoadMore}
          isLoading={isLoadingMore}
          hasMorePages={hasMorePages}
          totalResults={totalResults}
          currentCount={movies.length}
        />
      )}
    </div>
  );
};
