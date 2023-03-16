/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, ReactNode } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { NextPage } from 'next';
import { QueryClientProvider } from 'react-query';

import queryClient from 'src/libs/queryClient';

import 'src/styles/globals.css';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement, data: any) => ReactNode;
  getProps?: (data: any) => any;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement, data: any) => page);
  const getProps = Component.getProps ?? ((data: any) => data);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <QueryClientProvider client={queryClient}>
        {getLayout(<Component {...getProps(pageProps)} />, getProps(pageProps))}
      </QueryClientProvider>
    </>
  );
}
