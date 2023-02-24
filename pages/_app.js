import Script from 'next/script';
import { AuthProvider } from '@/context/auth';
import { ToastContainer } from 'react-toastify';

import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { poppins } from '@/utils/fonts';

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false, // default: true
          },
        },
      })
  );
  return (
    <>
      {Component.requiresAuth && (
        <Script
          id='redirect-unauthorized'
          dangerouslySetInnerHTML={{
            __html: `if(!document.cookie || document.cookie.indexOf('token') === -1)
            {location.replace(
              "/login?next=" +
                encodeURIComponent(location.pathname + location.search)
            )}
            else {document.documentElement.classList.add("render")}`,
          }}
        />
      )}
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <main className={`${poppins.variable} font-poppins  bg-white `}>
            <Component {...pageProps} />
          </main>
        </AuthProvider>
        <ToastContainer
          position='bottom-right'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme='light'
        />
        <ReactQueryDevtools initialIsOpen='false' />
      </QueryClientProvider>
    </>
  );
}
