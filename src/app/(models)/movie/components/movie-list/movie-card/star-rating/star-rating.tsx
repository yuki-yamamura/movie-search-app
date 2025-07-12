import { Star } from 'lucide-react';

import styles from './star-rating.module.css';

type Props = {
  rating: number;
};

export const StarRating = ({ rating }: Props) => {
  const fullStars = Math.floor(rating);
  const partialStarPercentage = rating % 1;
  const hasPartialStar = partialStarPercentage > 0;
  const maxStars = 10;
  const emptyStars = maxStars - fullStars - (hasPartialStar ? 1 : 0);
  const displayRating = rating.toFixed(1);

  return (
    <div className={styles.base} role="img" aria-label={`評価: ${rating} / ${maxStars}`}>
      <span className={styles.ratingNumber}>{displayRating}</span>

      <div className={styles.starsContainer}>
        {Array.from({ length: fullStars }, (_, index) => (
          <Star
            key={`full-star-${index}`}
            className={styles.starFilled}
            size={16}
            fill="currentColor"
          />
        ))}

        {hasPartialStar && (
          <div className={styles.partialStarContainer}>
            <Star className={styles.starEmpty} size={16} fill="none" />
            <Star
              className={styles.starPartial}
              size={16}
              fill="currentColor"
              style={
                { '--partial-width': `${partialStarPercentage * 100}%` } as React.CSSProperties
              }
            />
          </div>
        )}

        {Array.from({ length: emptyStars }, (_, index) => (
          <Star key={`empty-${index}`} className={styles.starEmpty} size={16} fill="none" />
        ))}
      </div>
    </div>
  );
};
