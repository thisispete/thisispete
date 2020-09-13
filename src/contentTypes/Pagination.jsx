import styles from './pagination.module.scss';

export default function Pagination(props) {

  const { page, setPage, pageCount } = props;

  const prev = () => {
    setPage(Math.max(0, page - 1));
  }
  const next = () => {
    setPage(Math.min(pageCount - 1, page + 1));
  }

  const prevClasses = [styles.prev];
  if (page == 0) {
    prevClasses.push(styles.disabled);
  }

  const nextClasses = [styles.next];
  if (page == pageCount - 1) {
    nextClasses.push(styles.disabled);
  }

  return (
    <div className={styles.pagination}>
      <button className={prevClasses.join(' ')} onClick={prev}>
        <span>prev</span>
        <svg version="1.1" width="7" height="11" >
          <path d="M5.805,0.228L0,4.89L0,6.107L5.804,10.771L7,9.811L7,1.187" />
        </svg>
      </button>
      <div className={styles.count}>
        <span>{page + 1}</span> / <span>{pageCount}</span>
      </div>
      <button className={nextClasses.join(' ')} onClick={next}>
        <span>next</span>
        <svg version="1.1" width="7" height="11" >
          <path d="M1.196,10.772L7,6.109L7,4.892L1.196,0.228L0,1.189L0,9.812" />
        </svg>
      </button>
    </div>
  )
}
