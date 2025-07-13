'use client';

import { useQueryStates } from 'nuqs';

import { movieSearchParamsSchema } from '@/app/(models)/movie/schemas/movie-search-params';

import styles from './filter-status.module.css';

export const FilterStatus = () => {
  const [{ search, releaseYear }] = useQueryStates(movieSearchParamsSchema);
  const textList = [
    search && `キーワード「${search}」`,
    releaseYear && `リリース年「${releaseYear}年」`,
  ];
  const statusText = textList.filter(Boolean).join('、');

  if (!search && !releaseYear) {
    return null;
  }

  return (
    <div className={styles.base}>
      <span className={styles.label}>検索条件:</span>
      <span className={styles.conditions}>{statusText}</span>
    </div>
  );
};
