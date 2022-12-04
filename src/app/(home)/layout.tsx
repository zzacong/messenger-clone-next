import { QueryProvider } from '$lib/query-provider';
import Header from './Header';

import { getServerAuthSession } from '$server/common/get-server-auth-session';
import { SessionProvider } from '$lib/auth-provider';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerAuthSession();

  return (
    <SessionProvider session={session}>
      <QueryProvider>
        <Header />
        {children}
      </QueryProvider>
    </SessionProvider>
  );
}
