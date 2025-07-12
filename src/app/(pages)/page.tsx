import { Link } from '@/components/link';
import { pathMap } from '@/utils/path-map';

import styles from './page.module.css';

const Page = () => (
  <div className={styles.base}>
    <main className={styles.main}>
      <h1 className={styles.title}>Movie Search App</h1>
      <p className={styles.description}>
        Discover and search for your favorite movies powered by TMDB
      </p>

      <div className={styles.ctas}>
        <Link href={pathMap['/movies'].get()}>Browse Movies</Link>
      </div>
    </main>
  </div>
);

export default Page;
