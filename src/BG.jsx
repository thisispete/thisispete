import styles from '@PETE/bg.module.scss';
import { useEffect, useRef } from 'react';

export default function BG({title}) {

  const bg = useRef();

  useEffect(() => {
    //load new bg on every page title change?
    bg.current.style.backgroundImage =`url("/api/background/?i=${Math.random()})`;
  }, [title]);


  return(
    <div ref={bg} id={styles.bg}></div>
  )
}