import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head  from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Track</title>
        <meta
          name='description'
          content='personal lms for tracking learning and sharing proof with employers'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
