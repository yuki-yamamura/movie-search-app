import styles from './loading-spinner.module.css';

export const LoadingSpinner = () => {
  return (
    <div className={styles.base} role="status" aria-label="Loading">
      <div className={styles.spinner}></div>
      <span className={styles.text}>Loading more movies...</span>
    </div>
  );
};