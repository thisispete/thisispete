import styles from '@PETE/bg.module.scss';
import { useEffect, useRef } from 'react';
import { isMobile } from 'react-device-detect';

export default function BG() {

  const bg = useRef();
  const newbg = useRef();
  var loading = useRef(false);

  useEffect(()=>{
    const i = setInterval(loadNext, 1000 * 20);
    return () => {clearInterval(i)}
  }, []);

  const loadNext = () => {
    if (loading.current == true || isMobile) {
      return;
    }
    loading.current = true;
    const newImg = new Image();
    newImg.onload = () => {
      newbg.current.style.backgroundImage = `url(${newImg.src})`;
      newbg.current.style.opacity = 1;
      setTimeout(() =>{
        bg.current.style.backgroundImage = newbg.current.style.backgroundImage;
        newbg.current.style.opacity = 0;
        loading.current = false;
      }, 800);
    };
    newImg.src = `/api/background?rnd=${Math.random()}`;
  }

  return(
    <>
      <div ref={bg} id={styles.bg} />
      <div ref={newbg} id={styles.newbg} onClick={loadNext}/>
    </>
  )
}