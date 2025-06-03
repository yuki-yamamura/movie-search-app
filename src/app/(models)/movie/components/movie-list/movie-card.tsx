import Image from 'next/image';

import { tmdbApi } from '@/app/(models)/movie/logic/api';

import type { Movie } from '@/app/(models)/movie/types/movie';

import styles from './index.module.css';

type Props = {
  movie: Movie;
};

export const MovieCard = ({ movie }: Props) => {
  const imageUrl = tmdbApi.getImageUrl(movie.poster_path, 'w500');
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  return (
    <article className={styles.movieCard}>
      <div className={styles.imageWrapper}>
        {movie.poster_path ? (
          <Image
            src={imageUrl}
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder}>
            <span>No Image</span>
          </div>
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{movie.title}</h3>
        <div className={styles.meta}>
          <span className={styles.year}>{releaseYear}</span>
          <span className={styles.rating}>★ {movie.vote_average.toFixed(1)}</span>
        </div>
        <p className={styles.overview}>{movie.overview}</p>
      </div>
    </article>
  );
};
