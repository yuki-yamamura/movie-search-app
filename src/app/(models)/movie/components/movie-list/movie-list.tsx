import { MovieCard } from './movie-card';

import type { Movie } from '@/app/(models)/movie/types';

import styles from './movie-list.module.css';

type Props = {
  movies?: Movie[];
};

export const MovieList = ({ movies }: Props) => {
  if (!movies || movies.length === 0) {
    return <div className={styles.base}>映画が見つかりませんでした。</div>;
  }

  return (
    <div className={styles.base}>
      <div className={styles.container}>
        {movies?.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};
