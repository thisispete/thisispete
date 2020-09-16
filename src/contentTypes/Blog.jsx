import Base from './Base';
import { Switch, Case } from 'jsx-logical-operators';
import { BLOG } from '@PETE/enums'

import styles from './blog.module.scss';

export default function Blog(props) {
  const {
    display_title: title,
    content,
    footer
  } = props.data

  return (
    <Base>
      <div className={styles.blog}>
        <h1>{title}</h1>
        {content.map((data, i) =>
          <Switch on={data.template} key={`${data.template}_${i}`}>
            <Case when={BLOG.TEXT_BLOCK}>
              <span  dangerouslySetInnerHTML={{ __html: data.html }} />
            </Case>
            <Case when={BLOG.IMAGE_BLOCK}>
              <img src={data.image} alt={data.alt_text} />
            </Case>
            <Case when={BLOG.VIDEO_BLOCK}>
              <iframe
                className={styles.videoFrame}
                src={`https://player.vimeo.com/video/${data.vimeo_id}?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=0&amp;loop=0`}
                frameBorder="0"
                webkitallowfullscreen="true"
                mozallowfullscreen="true"
                allowFullScreen />
            </Case>
          </Switch>
        )}
        {footer &&
          <p>{footer}</p>
        }
      </div>
    </Base>
  )
}
