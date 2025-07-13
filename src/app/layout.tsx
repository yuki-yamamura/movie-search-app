import { Geist, Geist_Mono } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { SWRProvider } from '@/providers/swr-provider';

import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '映画検索アプリ',
  description: '映画を検索して、流行りの映画を見つけよう！',
};

type Props = PropsWithChildren;

const Layout = ({ children }: Props) => (
  <html>
    <body className={`${geistSans.variable} ${geistMono.variable}`}>
      <NuqsAdapter>
        <SWRProvider>{children}</SWRProvider>
      </NuqsAdapter>
    </body>
  </html>
);

export default Layout;
