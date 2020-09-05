import styles from './nav.module.scss'
import { useRouter } from 'next/router'
import { MENU } from 'lib/enums';
import Link from 'next/link'

export default function Nav({navData}) {
  const router = useRouter()
  const slugs = [''];
  if (router.query.slug){
    slugs.push(...router.query.slug);
  }
  const path = slugs.length > 1 ? slugs.join('/') : '/';

  const nav = navData.map(item => {
    if(item.path != '/'){
      const level = item.path.split('/').length -2;
      const upOneLevel = level > 0 ? item.path.split('/').slice(0, -1).join('/') : '/';
      const open = path.includes(item.path);
      const selected = path == item.path;
      const visible = path.includes(upOneLevel);
      const classes = [styles.navItem, styles[`level_${level}`]];
      if (open) {
        classes.push(styles.open);
      }
      if (selected) {
        classes.push(styles.selected);
      }
      if (!visible) {
        classes.push(styles.hidden);
      }
      const isOpenSubmenu = open && item.template == MENU.SUBMENU;
      const href = isOpenSubmenu ? upOneLevel : item.path;
      
      return (
        <li className={classes.join(' ')} key={item.path}>
          <Link href='[[...slug]]' as={href}>
            <a>{item.slug.replace('_', ' ').toUpperCase()}</a>
          </Link>
        </li>
      )
    }
  });

  return(
    <div className={styles.nav}> 
      <ul>
        {nav}
      </ul>
    </div>
  )

}
