import { Raleway, Noto_Sans_Mono } from '@next/font/google';
import clsx from 'clsx';

import '$styles/globals.css';

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
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
