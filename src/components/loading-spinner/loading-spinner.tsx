import styles from './loading-spinner.module.css';

export const LoadingSpinner = () => {
  return (
    <div className={styles.base} role="status" aria-label="読み込み中">
      <div className={styles.spinner} />
      <span className={styles.srOnly}>読み込み中です</span>
    </div>
  );
};
