import { FilterStatus } from './filter-status';
import { ReleaseYearSelect } from './release-year-select';
import { SearchInput } from './search-input';

import styles from './movie-filter.module.css';

export const MovieFilter = () => (
  <div className={styles.base}>
    <div className={styles.input}>
      <SearchInput />
      <ReleaseYearSelect />
    </div>

    <FilterStatus />
  </div>
);
