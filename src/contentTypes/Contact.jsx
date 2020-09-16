import Base from './Base';
import styles from './contact.module.scss';

export default function Contact(props) {
  const { links } = props.data;

  return (
    <Base>
      <div className={styles.wrapper}>
        <ul className={styles.contact}>
          {links.map(link =>
            <li key={link.hover}>
              <a href={link.url} target='_blank'>
                <h3>{link.hover}</h3>
                <img src={link.icon} />
              </a>
            </li>
          )}
        </ul>
      </div>
    </Base>
  )
}
