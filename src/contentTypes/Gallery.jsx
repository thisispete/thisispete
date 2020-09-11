import Base from './Base';
import Pagination from './Pagination';
import styles from './gallery.module.scss';

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

  const [slide, setSlide] = React.useState(0);

  // const throttle = (method, scope, time) => {
  //   clearTimeout(method._tId);
  //   method._tId = setTimeout(() => {
  //     method.call(scope);
  //   }, 100);
  // }

  // const t = this;
  // const scroll = (e => {
  //   throttle(() => {
  //     let lastCount = t.count;
  //     let p = t._stack.scrollLeft() / t._stack[0].scrollWidth;
  //     let nextCount = Math.round(p * t.total) + 1;
  //     if (lastCount != nextCount) {
  //       t.count = nextCount;
  //       t._currentDisp.html(nextCount);
  //       t._updateCallback(t.count);
  //     }
  //   }, this, 100);
  // });


  const tap = () => {
    if (slide == slideLen - 1) {
      setSlide(0);
    } else {
      setSlide(Math.min(slideLen - 1, slide + 1));
    }
  }
  const getClassesFor = (imageNum, videoNum = 0) => {
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
        <div className={styles.content}>
          <h1>{title}</h1>
          <ul className={styles.stack}>
            {hasImages && images.map((image, imageNum) =>
              <li key={image} className={getClassesFor(imageNum)} onClick={tap}>
                <img src={image} alt="gallery image" />
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
                  allowFullScreen />
              </li>
            )}
          </ul>
          <div className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />
        </div>
        {slideLen > 1 &&
          <div className={styles.footer}>
            <Pagination page={slide} setPage={setSlide} pageCount={slideLen} />
          </div>
        }
      </div>
    </Base>
  )
}
