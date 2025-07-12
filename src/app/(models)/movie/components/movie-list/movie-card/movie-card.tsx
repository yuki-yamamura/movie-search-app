import Image from 'next/image';

import { getImageUrl } from '@/app/(models)/movie/api';

import { StarRating } from './star-rating';

import type { Movie } from '@/app/(models)/movie/types';

import styles from './movie-card.module.css';

type Props = {
  movie: Movie;
};

export const MovieCard = ({ movie }: Props) => {
  const imageUrl = getImageUrl({ imagePath: movie.poster_path, size: 'w500' });
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  return (
    <article className={styles.base}>
      <div className={styles.imageWrapper}>
        {movie.poster_path ? (
          <Image
            src={imageUrl}
            alt={movie.title || 'Movie poster'}
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
        <h3 className={styles.title}>{movie.title || 'Unknown Title'}</h3>
        <div className={styles.meta}>
          <span className={styles.year}>{releaseYear}</span>
          <StarRating rating={movie.vote_average} className={styles.rating} showRating />
        </div>
        <p className={styles.overview}>{movie.overview || 'No description available'}</p>
      </div>
    </article>
  );
};
