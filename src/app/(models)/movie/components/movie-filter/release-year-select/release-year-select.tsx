'use client';

import { ChevronDown } from 'lucide-react';
import { useQueryState } from 'nuqs';

import { AVAILABLE_YEARS } from '@/app/(models)/movie/constants';
import { movieSearchParamsSchema } from '@/app/(models)/movie/schemas/search-params';

import type { MovieSearchParams } from '@/app/(models)/movie/schemas/search-params';

import styles from './release-year-select.module.css';

export const ReleaseYearSelect = () => {
  const [releaseYear, setReleaseYear] = useQueryState(
    'releaseYear',
    movieSearchParamsSchema.releaseYear,
  );

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value === 'all' ? null : event.target.value;
    setReleaseYear(value as unknown as MovieSearchParams['releaseYear']);
  };

  return (
    <div className={styles.base}>
      <select
        aria-label="リリース年で絞り込み"
        onChange={handleChange}
        className={styles.select}
        defaultValue={releaseYear?.toString() || 'all'}
      >
        <option value="all">リリース年を選択</option>
        {AVAILABLE_YEARS.map((year) => (
          <option key={year} value={year.toString()}>
            {year}年
          </option>
        ))}
      </select>
      <ChevronDown size={20} className={styles.icon} />
    </div>
  );
};
