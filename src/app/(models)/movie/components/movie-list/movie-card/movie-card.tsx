import Image from 'next/image';

import { GenreBadge } from '@/app/(models)/movie/components/genre-badge';
import { GenreEnumOptions } from '@/app/(models)/movie/constants';
import { getImageUrl } from '@/app/(models)/movie/utils/image';

import { StarRating } from './star-rating';

import type { GenreId } from '@/app/(models)/movie/constants';
import type { Movie } from '@/app/(models)/movie/types';

import styles from './movie-card.module.css';

type Props = {
  movie: Movie;
};

export const MovieCard = ({
  movie: { poster_path, release_date, title, vote_average, overview, genre_ids },
}: Props) => {
  const imageUrl = getImageUrl({ imagePath: poster_path });
  const releaseYear = release_date ? new Date(release_date).getFullYear() : undefined;
  const genreIds = genre_ids?.filter((id): id is GenreId => id in GenreEnumOptions) ?? [];

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
        {genreIds.length > 0 && (
          <div className={styles.genres}>
            {genreIds.map((genreId) => (
              <GenreBadge key={genreId} genreId={genreId} />
            ))}
          </div>
        )}
        {overview && <p className={styles.overview}>{overview}</p>}
      </div>
    </article>
  );
};
