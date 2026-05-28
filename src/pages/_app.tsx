import type { AppProps } from 'next/app';

import { Toaster } from 'react-hot-toast';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#09090b',
            color: '#fff',
            border: '1px solid #27272a',
            padding: '14px 18px',
            borderRadius: '14px',
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
