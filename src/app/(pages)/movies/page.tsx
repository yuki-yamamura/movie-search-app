'use client';

import { useState } from 'react';

import { MovieList } from '@/app/(models)/movie/components/movie-list';
import { useGetPopularMovies, useSearchMovies } from '@/app/(models)/movie/hooks/useGetMovies';

import styles from './page.module.css';

// TODO: do not use React Hooks
const Page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const popularMovies = useGetPopularMovies();
  const searchResults = useSearchMovies(searchQuery);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    setSearchQuery(query);
    setIsSearching(!!query);
  };

  const moviesData = isSearching ? searchResults : popularMovies;

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
          />
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </form>
      </div>

      <section className={styles.results}>
        <h2 className={styles.sectionTitle}>
          {isSearching ? `Search Results for "${searchQuery}"` : 'Popular Movies'}
        </h2>
        {isSearching && moviesData.totalResults > 0 && (
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

export default Page;
