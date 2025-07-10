import { FilterStatus } from './filter-status';
import { ReleaseYearSelect } from './release-year-select';
import { SearchInput } from './search-input';

import styles from './movie-filter.module.css';

export const MovieFilter = () => {
  return (
    <div>
      <div className={styles.searchForm}>
        <SearchInput />
        <ReleaseYearSelect />
      </div>

      <FilterStatus />
    </div>
  );
};
