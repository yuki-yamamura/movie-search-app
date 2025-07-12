'use client';

import { Search } from 'lucide-react';
import { useQueryStates } from 'nuqs';
import { useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { START_PAGE_INDEX } from '@/app/(models)/movie/constants';
import { movieSearchParamsSchema } from '@/app/(models)/movie/schemas/search-params';

import styles from './search-input.module.css';

export const SearchInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [{ search }, setSearchParams] = useQueryStates(movieSearchParamsSchema);
  const debouncedSearch = useDebouncedCallback((searchValue: string) => {
    setSearchParams({ search: searchValue || null, page: START_PAGE_INDEX });
  }, 500);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      debouncedSearch.flush();
    }
  };

  const handleIconClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className={styles.base}>
      <Search className={styles.icon} size={20} onClick={handleIconClick} />
      <input
        ref={inputRef}
        type="text"
        name="search"
        placeholder="タイトルで検索"
        defaultValue={search ?? ''}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={styles.input}
      />
    </div>
  );
};
