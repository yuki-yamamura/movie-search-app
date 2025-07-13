import { createLoader } from 'nuqs/server';

import { MovieFilter } from '@/app/(models)/movie/components/movie-filter/movie-filter';
import { MovieGallery } from '@/app/(models)/movie/components/movie-gallery';
import { movieSearchParamsSchema } from '@/app/(models)/movie/schemas/movie-search-params';

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
        <h1 className={styles.title}>映画を探す</h1>
        <MovieFilter />
      </div>
      <MovieGallery {...params} />
    </main>
  );
};

export default Page;
