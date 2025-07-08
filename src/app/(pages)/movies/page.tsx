'use client';

import { useQueryStates } from 'nuqs';
import { Suspense } from 'react';

import { FilterStatus } from '@/app/(models)/movie/components/filter-status';
import { MovieList } from '@/app/(models)/movie/components/movie-list';
import { ReleaseYearFilter } from '@/app/(models)/movie/components/release-year-filter';
import { useDiscoverMovies } from '@/app/(models)/movie/hooks/use-discover-movies';
import { searchParamsSchema } from '@/app/(models)/movie/schemas/search-params';

import styles from './page.module.css';

const MoviesContent = () => {
  const [{ search, releaseYear }, setSearchParams] = useQueryStates(searchParamsSchema);

  const moviesData = useDiscoverMovies({
    query: search || undefined,
    year: releaseYear ? parseInt(releaseYear) : undefined,
  });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    setSearchParams({ search: query || null });
  };

  const hasFilters = search || releaseYear;
  const isSearching = !!search;

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
            defaultValue={search || ''}
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
          {isSearching ? `Search Results for "${search}"` : hasFilters ? 'Filtered Movies' : 'Popular Movies'}
        </h2>
        {moviesData.totalResults > 0 && (
          <p className={styles.resultCount}>Found {moviesData.totalResults} movies</p>
        )}
        <MovieList
          movies={moviesData.movies}
          isLoading={moviesData.isLoading}
          error={moviesData.error}
        />
      </section>
    </main>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MoviesContent />
    </Suspense>
  );
};

export default Page;
