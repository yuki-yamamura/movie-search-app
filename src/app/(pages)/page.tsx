import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/button';
import { Link } from '@/components/link';
import { pathMap } from '@/utils/path-map';

import styles from './page.module.css';

const Page = () => (
  <div className={styles.base}>
    <main className={styles.main}>
      <h1 className={styles.title}>映画検索アプリ</h1>
      <p className={styles.description}>人気の映画をリリース年やキーワードで検索できます。</p>

      <div className={styles.ctas}>
        <Button variant="secondary" size="large" asChild>
          <Link href={pathMap['/movies'].get()}>
            <span>映画を探す</span>
            <ArrowRight size={16} />
          </Link>
        </Button>
      </div>
    </main>
  </div>
);

export default Page;
