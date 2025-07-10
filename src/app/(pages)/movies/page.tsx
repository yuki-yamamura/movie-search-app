import { createLoader } from 'nuqs';

import { MovieFilter } from '@/app/(models)/movie/components/movie-filter/movie-filter';
import { MovieList } from '@/app/(models)/movie/components/movie-list';
import { discoverMovies } from '@/app/(models)/movie/logic/api';
import { movieSearchParamsSchema } from '@/app/(models)/movie/schemas/search-params';

import type { SearchParams } from 'nuqs';

import styles from './page.module.css';

type Props = {
  searchParams: Promise<SearchParams>;
};

const Page = async ({ searchParams }: Props) => {
  const { search, releaseYear, page } = await createLoader(movieSearchParamsSchema)(searchParams);

  // TODO: remove undefined
  const initialData = await discoverMovies({
    query: search || undefined,
    year: releaseYear || undefined,
    page,
  });

  return (
    <main className={styles.base}>
      <div className={styles.header}>
        <h1 className={styles.title}>Movies</h1>
        <MovieFilter />
      </div>

      <section className={styles.results}>
        <h2 className={styles.sectionTitle}>
          {isSearching
            ? `Search Results for "${currentSearch}"`
            : hasFilters
              ? 'Filtered Movies'
              : 'Popular Movies'}
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

export default Page;
