import Base from "./Base";
import { Switch, Case } from 'jsx-logical-operators';
import { BLOG } from '@PETE/enums'

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
          <Switch on={data.template} >
            <Case when={BLOG.TEXT_BLOCK}>
              <span dangerouslySetInnerHTML={{__html: data.html}} />
            </Case>
            <Case when={BLOG.IMAGE_BLOCK}>
              <img src={data.image} alt={data.alt_text}/>
            </Case>
            <Case when={BLOG.VIDEO_BLOCK}>
              <p>video</p>
            </Case>
          </Switch>
        )}
      </div>
    </Base>
  )
}
