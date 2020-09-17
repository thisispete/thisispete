import Base from './Base';
import styles from './text.module.scss';

export default function Text(props) {
	const {
		display_title: title,
		text
	} = props.data;

	const textreplacepdf = text.split('.pdf\"').join('.pdf\" download target="_blank"');

	return (
		<Base >
			<div className={styles.text} dangerouslySetInnerHTML={{ __html: textreplacepdf }} />
		</Base>
	)
}
