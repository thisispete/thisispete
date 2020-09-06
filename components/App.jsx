import { Switch, Case, Default } from 'jsx-switch';
import Head from 'next/head'
import styles from './app.module.scss'
import { TYPES } from 'lib/enums'
import Nav from './Nav';
import Blog from './contentTypes/Blog';
import Gallery from './contentTypes/Gallery';
import Transition from './contentTypes/Transition';
import Contact from './contentTypes/Contact';
import Audio from './contentTypes/Audio';
import Resume from './contentTypes/Resume';


export default function App({ navData, pageData }) {
  const { template } = pageData;
  const idRoot = 'http://cms.thisispete.com/icons';

  return (
    <div className={styles.main} data-barba="wrapper">
      <Head>
        <title>THISISPETE</title>
        <meta httpEquiv='X-UA-Compatible' content='IE=edge,chrome=1,requiresActiveX=true' />
        <meta charSet='utf-8' />
        <meta name='description' content='portfolio website for Pete Schirmer: artist and creative engineer from Oakland CA.' />
        <meta name='author' content='thisispete' />
        <meta name='viewport' content='initial-scale=1, maximum-scale=1' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta property='og:title' content='THISISPETE' />
        <meta property='og:description' content='Pete Schirmer: artist and creative engineer from Oakland CA.' />
        <meta property='og:url' content='http://www.thisispete.com' />
        <meta property='og:type' content='website' />
        <meta property='og:image' content={`${idRoot}/thisispete_logo_share.jpg`} />
        <meta property='og:image:type' content='image/jpg' />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <link rel='dns-prefetch' href='//s3.amazonaws.com' />
        <link rel='icon' href={`${idRoot}/favicon.svg`} />
        <link rel='apple-touch-icon' href={`${idRoot}/apple-touch-icon.png`} />
        <link rel='icon' type='image/png' sizes='32x32' href={`${idRoot}/favicon-32x32.png`} />
        <link rel='icon' type='image/png' sizes='192x192' href={`${idRoot}/android-chrome-192x192.png`} />
        <link rel='icon' type='image/png' sizes='16x16' href={`${idRoot}/favicon-16x16.png`} />
        <link rel='manifest' href={`${idRoot}/site.webmanifest`} />
        <link rel='mask-icon' href={`${idRoot}/safari-pinned-tab.svg`} color='#ffffff' />
        <meta name='apple-mobile-web-app-title' content='PETE' />
        <meta name='application-name' content='PETE' />
        <meta name='msapplication-TileColor' content='#603cba' />
        <meta name='msapplication-config' content={`${idRoot}/browserconfig.xml`} />
        <meta name='theme-color' content='#ffffff' />
        <link href='http://fonts.googleapis.com/css?family=Open+Sans:800,700,400' rel='stylesheet' type='text/css' />
      </Head>
      <Nav navData={navData} />
      <Transition>
        <Switch>
          <Case expr={template == TYPES.BLOG}>
            <Blog data={pageData} />
          </Case>
          <Case expr={template == TYPES.GALLERY}>
            <Gallery data={pageData} />
          </Case>
          <Case expr={template == TYPES.AUDIO}>
            <Audio data={pageData} />
          </Case>
          <Case expr={template == TYPES.CONTACT}>
            <Contact data={pageData} />
          </Case>
          <Case expr={template == TYPES.RESUME}>
            <Resume data={pageData} />
          </Case>
          <Default><React.Fragment /></Default>
        </Switch>
      </Transition>
    </div>
  )
}
