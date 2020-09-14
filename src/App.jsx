import Head from 'next/head';
import { animateScroll } from 'react-scroll';
import { isMobile } from 'react-device-detect';
import { Switch, Case, Default } from 'jsx-logical-operators';
import { TYPES } from '@PETE/enums'
import Nav from '@PETE/Nav';
import PETE from '@PETE/PETE'
import Transition from '@PETE/Transition';
import {
  Audio,
  Blog,
  Contact,
  Gallery,
  Text,
  Playlist
} from '@PETE/contentTypes/';

import styles from '@PETE/app.module.scss'
import { useEffect, useState } from 'react';

export default function App({ navData, pageData }) {
  const { template } = pageData;
  const idRoot = 'http://aws.thisispete.com/icons';

  const [vh, setVh] = useState(0);

  const onresize = () => {
    var visviewh;
    if (window.visualViewport) {
      visviewh = window.visualViewport.height;
    } else {
      visviewh = window.innerHeight;
    }
    const winviewh = window.innerHeight;
    let newVH = Math.min(visviewh, winviewh) * 0.01
    setVh(newVH);
    document.documentElement.style.setProperty('--vh', `${newVH}px`);
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
      onresize();
    });
    onresize();
  }, [])

  const scrollToContent = () => {
    animateScroll.scrollTo(vh * 100, {
      duration: 400,
      delay: 100,
      smooth: true});
  }

  if (isMobile){
    useEffect(() => {
      setTimeout(scrollToContent, 300)
    }, [pageData.title]);
  }



  return (
    <div id={styles.app}>
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
      <div id={styles.main}>
        <PETE />
        <Nav navData={navData} />
        <div id={styles.content} >
          <Transition>
            <Switch on={template}>
              <Case when={TYPES.BLOG}>
                <Blog data={pageData} />
              </Case>
              <Case when={TYPES.GALLERY}>
                <Gallery data={pageData} />
              </Case>
              <Case when={TYPES.AUDIO}>
                <Audio data={pageData} />
              </Case>
              <Case when={TYPES.CONTACT}>
                <Contact data={pageData} />
              </Case>
              <Case when={TYPES.PLAYLIST}>
                <Playlist data={pageData} />
              </Case>
              <Case when={TYPES.TEXT}>
                <Text data={pageData} />
              </Case>
              <Default><React.Fragment /></Default>
            </Switch>
          </Transition>
        </div>
      </div>
      <div id={styles.bg}></div>
    </div>
  )
}
