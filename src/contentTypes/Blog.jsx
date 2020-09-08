import Base from "./Base";
import { Switch, Case, Default } from 'jsx-switch';
import { BLOG } from '../enums';

import styles from './blog.module.scss';

export default function Blog(props) {
  const {
    display_title: title,
    content,
    footer
  } = props.data
  console.dir(content)

  return (
    <Base>
      <div className={styles.blog}>
        <h1>{title}</h1>
        {content.map(data => 
          <Switch>
            <Case expr={data.template == BLOG.TEXT_BLOCK}>
              <p>text</p>
            </Case>
            <Case expr={data.template == BLOG.IMAGE_BLOCK}>
              <p>image</p>
            </Case>
            <Case expr={data.template == BLOG.VIDEO_BLOCK}>
              <p>video</p>
            </Case>
          </Switch>
        )}
      </div>
    </Base>
  )
}
