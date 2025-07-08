'use client';

import { useQueryStates } from 'nuqs';

import { FilterStatus } from '@/app/(models)/movie/components/filter-status';
import { MovieList } from '@/app/(models)/movie/components/movie-list';
import { ReleaseYearFilter } from '@/app/(models)/movie/components/release-year-filter';
import { useLoadMoreMovies } from '@/app/(models)/movie/hooks/use-load-more-movies';
import { searchParamsSchema } from '@/app/(models)/movie/schemas/search-params';

import type { SearchMovieResponse, DiscoverMovieResponse } from '@/types/generated/movie-types';

import styles from './page.module.css';

type Props = {
  initialData: SearchMovieResponse | DiscoverMovieResponse;
  initialSearch: string;
  initialReleaseYear: string;
  initialPage: number;
};

export const ClientPage = ({ initialData, initialSearch, initialReleaseYear, initialPage }: Props) => {
  const [{ search, releaseYear, page }, setSearchParams] = useQueryStates(searchParamsSchema);

  // Use current search params or fallback to initial values
  const currentSearch = search ?? initialSearch;
  const currentReleaseYear = releaseYear ?? initialReleaseYear;
  const currentPage = page ?? initialPage;

  const loadMoreData = useLoadMoreMovies({
    initialMovies: initialData.results ?? [],
    searchQuery: currentSearch,
    releaseYear: currentReleaseYear,
    currentPage,
    totalPages: initialData.total_pages ?? 1,
    totalResults: initialData.total_results ?? 0,
  });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    setSearchParams({ search: query || null, page: 1 });
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setSearchParams({ page: nextPage });
    loadMoreData.loadMore();
  };

  const hasFilters = currentSearch || currentReleaseYear;
  const isSearching = !!currentSearch;

  return (
    <main className={styles.base}>
      <div className={styles.header}>
        <h1 className={styles.title}>Movies</h1>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="text"
            name="search"
            placeholder="Search movies..."
            className={styles.searchInput}
            defaultValue={currentSearch || ''}
          />
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
          <ReleaseYearFilter />
        </form>
      </div>

      <section className={styles.results}>
        <FilterStatus />
        <h2 className={styles.sectionTitle}>
          {isSearching ? `Search Results for "${currentSearch}"` : hasFilters ? 'Filtered Movies' : 'Popular Movies'}
        </h2>
        {loadMoreData.totalResults > 0 && (
          <p className={styles.resultCount}>Found {loadMoreData.totalResults} movies</p>
        )}
        <MovieList
          movies={loadMoreData.movies}
          isLoading={false}
          error={loadMoreData.error}
          onLoadMore={handleLoadMore}
          isLoadingMore={loadMoreData.isLoadingMore}
          hasMorePages={loadMoreData.hasMorePages}
          totalResults={loadMoreData.totalResults}
        />
      </section>
    </main>
  );
};