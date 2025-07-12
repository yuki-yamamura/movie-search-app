import { cx } from 'class-variance-authority';

import { LoadingSpinner } from '@/components/loading-spinner/loading-spinner';

import styles from './load-more-button.module.css';

type Props = {
  onLoadMore: () => void;
  isLoading: boolean;
  hasMorePages: boolean;
  totalResults: number;
  currentCount: number;
};

export const LoadMoreButton = ({
  onLoadMore,
  isLoading,
  hasMorePages,
  totalResults,
  currentCount,
}: Props) => {
  if (!hasMorePages) return null;

  return (
    <div className={styles.base}>
      <button
        className={cx(styles.button, isLoading && styles.buttonDisabled)}
        onClick={onLoadMore}
        disabled={isLoading}
        type="button"
      >
        {isLoading ? 'Loading...' : 'Load More Movies'}
      </button>
      {isLoading && <LoadingSpinner />}
      <p className={styles.info}>
        Showing {currentCount} of {totalResults} movies
      </p>
    </div>
  );
};
