import '../node_modules/normalize.scss/normalize.scss';
import '@PETE/global.scss';
import Router from "next/router";
import withGA from "next-ga";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default withGA(process.env.GA, Router)(MyApp);
