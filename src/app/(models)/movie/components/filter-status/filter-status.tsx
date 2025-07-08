'use client';

import { useQueryStates } from 'nuqs';

import { searchParamsSchema } from '../../schemas/search-params';

import styles from './filter-status.module.css';

export const FilterStatus = () => {
  const [{ search, releaseYear }] = useQueryStates(searchParamsSchema);

  const hasFilters = search || releaseYear;

  if (!hasFilters) {
    return null;
  }

  const filterParts: string[] = [];

  if (search) {
    filterParts.push(`キーワード「${search}」`);
  }

  if (releaseYear) {
    filterParts.push(`リリース年「${releaseYear}年」`);
  }

  return (
    <div className={styles.container}>
      <span className={styles.label}>検索条件:</span>
      <span className={styles.conditions}>{filterParts.join('、')}</span>
    </div>
  );
};