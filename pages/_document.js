import Document, { Html, Head, Main, NextScript } from 'next/document'
import { Analytics } from '@vercel/analytics/next';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head >
          <link href='https://fonts.googleapis.com/css?family=Open+Sans:800,700,400' rel='stylesheet' type='text/css' />
        </Head>
        <body>
          <Main />
          <NextScript />
          <Analytics />
        </body>
      </Html>
    )
  }
}

export default MyDocument
