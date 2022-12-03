import { Raleway, Noto_Sans_Mono } from '@next/font/google';

import Header from './Header';

import '$styles/globals.css';
import clsx from 'clsx';
import { ClientProvider } from '$lib/query-client';

// If loading a variable font, you don't need to specify the font weight
const raleway = Raleway({
  variable: '--font-raleway',
  subsets: ['latin'],
});

const notoSansMono = Noto_Sans_Mono({
  variable: '--font-noto-sans-mono',
  subsets: ['latin'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={clsx(raleway.variable, notoSansMono.variable)}>
      <head />
      <body>
        <ClientProvider>
          <Header />
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
