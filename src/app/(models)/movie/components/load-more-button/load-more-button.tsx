import { cx } from 'class-variance-authority';
import { ArrowRight } from 'lucide-react';

import { LoadingSpinner } from '@/components/loading-spinner/loading-spinner';

import styles from './load-more-button.module.css';

type Props = {
  onLoadMore: () => void;
  isLoading: boolean;
  hasMorePages: boolean;
  totalMovies: number;
  currentCount: number;
};

export const LoadMoreButton = ({
  onLoadMore,
  isLoading,
  hasMorePages,
  totalMovies,
  currentCount,
}: Props) => {
  if (!hasMorePages) {
    return null;
  }

  return (
    <div className={styles.base}>
      <button
        type="button"
        disabled={isLoading}
        aria-disabled={isLoading}
        onClick={onLoadMore}
        className={cx(styles.button, isLoading && styles.buttonDisabled)}
      >
        {isLoading ? (
          '読み込み中...'
        ) : (
          <div>
            <span>さらに読み込む</span>
            <ArrowRight size={16} />
          </div>
        )}
      </button>
      {isLoading && <LoadingSpinner />}
      <p className={styles.info}>
        {`${currentCount.toLocaleString()}件 / ${totalMovies.toLocaleString()}件`}
      </p>
    </div>
  );
};
