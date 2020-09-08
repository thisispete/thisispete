import Base from "./Base";
import styles from './text.module.scss';

export default function Text(props) {
	const {
		display_title: title,
		text
	} = props.data;

  return (
    <Base >
			<div className={styles.scroll} dangerouslySetInnerHTML={{__html:text}} />
    </Base>
  )
}


