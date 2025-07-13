import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/button';
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
      <Button
        type="button"
        variant="secondary"
        size="large"
        disabled={isLoading}
        aria-disabled={isLoading}
        onClick={onLoadMore}
      >
        {isLoading ? (
          '読み込み中...'
        ) : (
          <>
            <span>さらに読み込む</span>
            <ArrowRight size={16} />
          </>
        )}
      </Button>
      {isLoading && <LoadingSpinner />}
      <p className={styles.info}>
        {`${currentCount.toLocaleString()}件 / ${totalMovies.toLocaleString()}件`}
      </p>
    </div>
  );
};
