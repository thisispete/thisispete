import Router from 'next/router';
import withGA from 'next-ga';

import '../node_modules/normalize.scss/normalize.scss';
import '@PETE/global.scss';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
export default withGA(process.env.NEXT_STATIC_GA, Router)(MyApp);
