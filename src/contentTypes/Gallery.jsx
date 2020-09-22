import Base from './Base';
import Pagination from './Pagination';
import styles from './gallery.module.scss';
import { useEffect } from 'react';
import { isBrowser, isMobile } from 'react-device-detect';

export default function Gallery(props) {
  const {
    display_title: title,
    images,
    videos,
    description
  } = props.data;
  const hasImages = images.length > 0;
  const hasVideos = videos.length > 0;
  const slideLen = images.length + videos.length;

  const [slide, _setSlide] = React.useState(0);
  const [videoStyles, setVideoStyles] = React.useState({});
  const scrollRef = React.useRef();
  const currentSlide = React.useRef(slide);

  const setSlide = val => {
    currentSlide.current = val;
    _setSlide(val);
  }

  useEffect(() => {
    if (isMobile){
      let i = setInterval(onScrollEvent, 200);
      return () => {clearInterval(i)};      
    }
  }, [isMobile]);

  const handleImageLoaded = (i) =>{
    const {width, height} = i.currentTarget;    
    if (isMobile){
      setVideoStyles({ height: `${height / width * 100}vw` })
      scrollRef.current.scrollTo({ left: scrollRef.current.scrollLeft});
    }
  }

  const onScrollEvent = () => {
    const pos = scrollRef.current.scrollLeft / scrollRef.current.scrollWidth;
    const nextSlide = Math.round(pos * slideLen);
    if (currentSlide.current != nextSlide){
      setSlide(nextSlide);
    }
  }

  const tap = () => {
    if (isBrowser) {
      if (slide == slideLen - 1) {
        setSlide(0);
      } else {
        setSlide(slide + 1);
      }
    }
  }

  const getClassesFor = (imageNum, videoNum = 0) => {
    if(isMobile){
      return 'noTapActions';
    }
    const count = imageNum + videoNum;
    if (count != slide) {
      return styles.off;
    } else {
      return styles.on;
    }
  }

  return (
    <Base>
      <div className={styles.gallery}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.content}>
          <ul ref={scrollRef}  className={styles.stack}>
            {hasImages && images.map((image, imageNum) =>
              <li key={image} className={getClassesFor(imageNum)} onClick={tap}>
                <img src={image} alt="gallery image" onLoad={handleImageLoaded}/>
              </li>
            )}
            {hasVideos && videos.map((video, videoNum) =>
              <li key={video.vimeo_id} className={getClassesFor(images.length, videoNum)}>
                <iframe
                  className={styles.videoFrame}
                  src={`https://player.vimeo.com/video/${video.vimeo_id}?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=0&amp;loop=0`}
                  frameBorder="0"
                  webkitallowfullscreen="true"
                  mozallowfullscreen="true"
                  allowFullScreen 
                  style={videoStyles}/>
              </li>
            )}
          </ul>
        </div>
        <div className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />
        {slideLen > 1 &&
          <div className={styles.footer}>
            <Pagination page={slide} setPage={setSlide} pageCount={slideLen} />
          </div>
        }
      </div>
    </Base>
  )
}
