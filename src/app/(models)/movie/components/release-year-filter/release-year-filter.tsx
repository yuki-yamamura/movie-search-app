'use client';

import { useQueryState } from 'nuqs';

import { AVAILABLE_YEARS } from '../../constants/years';
import { searchParamsSchema } from '../../schemas/search-params';

import styles from './release-year-filter.module.css';

export const ReleaseYearFilter = () => {
  const [releaseYear, setReleaseYear] = useQueryState(
    'releaseYear',
    searchParamsSchema.releaseYear
  );

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setReleaseYear(value === '' ? null : value);
  };

  return (
    <select
      value={releaseYear ?? ''}
      onChange={handleYearChange}
      className={styles.select}
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