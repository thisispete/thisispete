import Base from './Base';
import styles from './audio.module.scss';
import Player from 'react-hooks-player';

export default function Audio(props) {
	const {
		display_title: title,
		description,
		url,
		cover
	} = props.data;

	return (
		<Base>
			<div className={styles.audio}>
				<div className={styles.wrapper}>

					<h1>{title}</h1>
					<img className={styles.cover} src={cover} alt='album art' />
					<Player
						url={url}
						title=''
						color='#fff'
						background='rgba(255,255,255,0.05)'
						volumeControls={true}
						height={30}
					/>
					<div className={styles.copy} dangerouslySetInnerHTML={{ __html: description }} />
					<a className={styles.download} href={url} target='_blank' download>Download</a>
				</div>
			</div>
		</Base>
	)
}
