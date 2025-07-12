import { createLoader } from 'nuqs/server';

import { MovieFilter } from '@/app/(models)/movie/components/movie-filter/movie-filter';
import { MovieGallery } from '@/app/(models)/movie/components/movie-gallery/movie-gallery';
import { movieSearchParamsSchema } from '@/app/(models)/movie/schemas/search-params';

import type { SearchParams } from 'nuqs';

import styles from './page.module.css';

type Props = {
  searchParams: Promise<SearchParams>;
};

const Page = async ({ searchParams }: Props) => {
  const params = await createLoader(movieSearchParamsSchema)(searchParams);

  return (
    <main className={styles.base}>
      <div className={styles.header}>
        <h1 className={styles.title}>Movies</h1>
        <MovieFilter />
      </div>

      <section className={styles.results}>
        <h2 className={styles.sectionTitle}>Search Results</h2>
        <MovieGallery {...params} />
      </section>
    </main>
  );
};

export default Page;
