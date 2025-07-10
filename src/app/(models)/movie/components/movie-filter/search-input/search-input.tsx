'use client';

import { useQueryStates } from 'nuqs';
import { useDebouncedCallback } from 'use-debounce';

import { START_PAGE_INDEX } from '@/app/(models)/movie/constants';
import { movieSearchParamsSchema } from '@/app/(models)/movie/schemas/search-params';

import styles from './search-input.module.css';

export const SearchInput = () => {
  const [{ search }, setSearchParams] = useQueryStates(movieSearchParamsSchema);
  const debouncedSearch = useDebouncedCallback((searchValue: string) => {
    setSearchParams({ search: searchValue || null, page: START_PAGE_INDEX });
  }, 500);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      debouncedSearch.flush();
    }
  };

  return (
    <input
      type="text"
      name="search"
      placeholder="Search movies..."
      className={styles.base}
      defaultValue={search ?? ''}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
    />
  );
};
