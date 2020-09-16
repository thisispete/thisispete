import styles from './base.module.scss';

export default function Base({ children }) {
  return (
    <div className={styles.base}>
      {children}
    </div>
  )
}
