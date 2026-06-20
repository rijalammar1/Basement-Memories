import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Basement Memories</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Toaster
        position="top-center"
        gutter={8}
        containerStyle={{
          top: 16,
          left: 16,
          right: 16,
        }}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#09090b',
            color: '#fff',
            border: '1px solid #27272a',
            padding: '14px 18px',
            borderRadius: '14px',
            maxWidth: '500px',
            width: '100%',
          },
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      <Component {...pageProps} />
    </>
  );
}
