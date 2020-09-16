import { useRouter } from 'next/router'
import Link from 'next/link'
import { MENU } from '@PETE/enums';

import styles from '@PETE/nav.module.scss'

export default function Nav({ navData, postRef }) {
  const router = useRouter()
  const slugs = [''];
  if (router.query.slug) {
    slugs.push(...router.query.slug);
  }
  const path = slugs.length > 1 ? slugs.join('/') : '/';

  let countLevel;
  let delay = 0;
  let counting = false;
  const nav = navData.map(item => {
    if (item.path != '/') {
      const level = item.path.split('/').length - 2;
      const upOneLevel = level > 0 ? item.path.split('/').slice(0, -1).join('/') : '/';
      const open = path.indexOf(item.path) == 0;
      const selected = path == item.path;
      const visible = path.indexOf(upOneLevel) == 0;
      const classes = [styles.navItem, styles[`level-${level}`]];
      if (open) {
        classes.push(styles.open);
      }
      if (visible && counting && level < countLevel) {
        counting = false;
        delay = 0;
      }
      if (selected) {
        classes.push(styles.selected);
        counting = true;
        countLevel = level + 1;
      }
      if (!visible) {
        classes.push(styles.hidden);
      }
      if (visible && counting && level == countLevel) {
        delay++;
        classes.push(styles[`delay-${delay}`])
      }
      const isOpenSubmenu = open && item.template == MENU.SUBMENU;
      const href = isOpenSubmenu ? upOneLevel : item.path;

      return (
        <li className={classes.join(' ')} key={item.path}>
          <Link href='[[...slug]]' as={href} >
            <a>{item.slug.split('_').join(' ').toUpperCase()}</a>
          </Link>
        </li>
      )
    }
  });



  return (
    <div id={styles.nav}>
      <ul>
        {nav}
      </ul>
    </div>
  )

}
