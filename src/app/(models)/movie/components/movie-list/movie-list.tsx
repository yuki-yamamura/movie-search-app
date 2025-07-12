import { MovieCard } from './movie-card';

import type { DiscoverMovieResponse } from '@/app/(models)/movie/types';

import styles from './movie-list.module.css';

type Props = DiscoverMovieResponse;

export const MovieList = ({ results }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.base}>
        {results?.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};
