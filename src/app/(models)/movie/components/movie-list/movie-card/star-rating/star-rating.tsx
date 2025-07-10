"use client";

import { Star } from "lucide-react";

import styles from "./star-rating.module.css";

type Props = {
  rating: number;
  maxStars?: number;
  className?: string;
  showRating?: boolean;
};

export const StarRating = ({ rating, maxStars = 10, className, showRating = false }: Props) => {
  // Clamp rating between 0 and maxStars
  const clampedRating = Math.max(0, Math.min(rating, maxStars));
  
  // Calculate stars display
  const fullStars = Math.floor(clampedRating);
  const hasPartialStar = clampedRating % 1 !== 0;
  const partialStarPercentage = clampedRating % 1;
  const emptyStars = maxStars - fullStars - (hasPartialStar ? 1 : 0);
  
  return (
    <div 
      className={`${styles.base} ${className || ""}`}
      role="img"
      aria-label={`Rating: ${rating} out of ${maxStars} stars`}
    >
      {/* Rating number */}
      {showRating && (
        <span className={styles.ratingNumber}>
          {rating.toFixed(1)}
        </span>
      )}
      
      {/* Stars container */}
      <div className={styles.starsContainer}>
        {/* Full stars */}
        {Array.from({ length: fullStars }, (_, index) => (
          <Star
            key={`full-${index}`}
            className={styles.starFilled}
            size={16}
            fill="currentColor"
          />
        ))}
        
        {/* Partial star */}
        {hasPartialStar && (
          <div className={styles.partialStarContainer}>
            <Star
              className={styles.starEmpty}
              size={16}
              fill="none"
            />
            <Star
              className={styles.starPartial}
              size={16}
              fill="currentColor"
              style={{ '--partial-width': `${partialStarPercentage * 100}%` } as React.CSSProperties}
            />
          </div>
        )}
        
        {/* Empty stars */}
        {Array.from({ length: emptyStars }, (_, index) => (
          <Star
            key={`empty-${index}`}
            className={styles.starEmpty}
            size={16}
            fill="none"
          />
        ))}
      </div>
    </div>
  );
};