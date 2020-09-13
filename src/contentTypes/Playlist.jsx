import Base from './Base';
import styles from './playlist.module.scss';

export default function Playlist(props) {
  const {
    display_title: title,
    video_list: videos,
    description
  } = props.data;

  const [vid, setVid] = React.useState(videos[0].vimeo_id);

  return (
    <Base>
      <div className={styles.playlist}>
        <div className={styles.wrapper}>

          <h1>{title}</h1>
          <iframe
            className={styles.videoFrame}
            src={`http://player.vimeo.com/video/${vid}?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=0&amp;loop=0`}
            frameBorder="0"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
            allowFullScreen>
          </iframe>
          <div className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />
          <h3>Track List <span>(click to play)</span></h3>
          <ul>
            {videos.map(video =>
              <li key={video.vimeo_id} className={vid == video.vimeo_id ? styles.selected : ''}>
                <a href='#' onClick={e => {
                  e.preventDefault()
                  setVid(video.vimeo_id)
                }}>{video.title}</a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </Base>
  )
}
