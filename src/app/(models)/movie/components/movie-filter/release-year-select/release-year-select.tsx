'use client';

import { useQueryState } from 'nuqs';

import { AVAILABLE_YEARS } from '../../../constants';
import { movieSearchParamsSchema } from '../../../schemas/search-params';

import type { MovieSearchParams } from '../../../schemas/search-params';

import styles from './release-year-select.module.css';

export const ReleaseYearSelect = () => {
  const [releaseYear, setReleaseYear] = useQueryState(
    'releaseYear',
    movieSearchParamsSchema.releaseYear,
  );

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setReleaseYear(value === '' ? null : (value as unknown as MovieSearchParams['releaseYear']));
  };

  return (
    <select
      value={releaseYear ?? ''}
      onChange={handleYearChange}
      className={styles.base}
      aria-label="リリース年で絞り込み"
    >
      <option value="">リリース年を選択</option>
      {AVAILABLE_YEARS.map((year) => (
        <option key={year} value={year.toString()}>
          {year}年
        </option>
      ))}
    </select>
  );
};
