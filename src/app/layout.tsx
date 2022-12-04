import { Raleway, Noto_Sans_Mono } from '@next/font/google';
import clsx from 'clsx';

// import { getServerAuthSession } from '$server/common/get-server-auth-session';
import { QueryProvider } from '$lib/query-provider';
import Header from './Header';

import '$styles/globals.css';
import { getServerAuthSession } from '$server/common/get-server-auth-session';
import { SessionProvider } from '$lib/auth-provider';

// If loading a variable font, you don't need to specify the font weight
const raleway = Raleway({
  variable: '--font-raleway',
  subsets: ['latin'],
});

const notoSansMono = Noto_Sans_Mono({
  variable: '--font-noto-sans-mono',
  subsets: ['latin'],
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerAuthSession();

  return (
    <html lang="en" className={clsx(raleway.variable, notoSansMono.variable)}>
      <head />
      <body className="flex min-h-screen flex-col">
        <SessionProvider session={session}>
          <QueryProvider>
            <Header />
            {children}
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
