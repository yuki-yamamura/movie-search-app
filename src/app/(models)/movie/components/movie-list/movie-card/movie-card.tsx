import Image from 'next/image';

import { getImageUrl } from '@/app/(models)/movie/api';

import { StarRating } from './star-rating';

import type { Movie } from '@/app/(models)/movie/types';

import styles from './movie-card.module.css';

type Props = {
  movie: Movie;
};

export const MovieCard = ({
  movie: { poster_path, release_date, title, vote_average, overview },
}: Props) => {
  const imageUrl = getImageUrl({ imagePath: poster_path });
  const releaseYear = release_date ? new Date(release_date).getFullYear() : undefined;

  return (
    <article className={styles.base}>
      <div className={styles.imageWrapper}>
        {poster_path ? (
          <Image 
            src={imageUrl} 
            alt={title ?? 'ポスター画像'} 
            fill 
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className={styles.image} 
          />
        ) : (
          <div className={styles.placeholder}>
            <span>No Image</span>
          </div>
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title || '不明なタイトル'}</h3>
        <div className={styles.meta}>
          {releaseYear && <span className={styles.year}>{releaseYear}</span>}
          <StarRating rating={vote_average} />
        </div>
        {overview && <p className={styles.overview}>{overview}</p>}
      </div>
    </article>
  );
};
