import { MovieCard } from './movie-card';

import type { Movie } from '@/app/(models)/movie/types/movie';

import styles from './movie-list.module.css';

type Props = {
  movies: Movie[];
  isLoading?: boolean;
  error?: Error;
};

export const MovieList = ({ movies, isLoading, error }: Props) => {
  if (isLoading) {
    return <div className={styles.loading}>Loading movies...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error loading movies: {error.message}</div>;
  }

  if (movies.length === 0) {
    return <div className={styles.empty}>No movies found</div>;
  }

  return (
    <div className={styles.base}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
