import { getServerAuthSession } from '$server/common/get-server-auth-session';
import { QueryProvider } from '$lib/query-provider';
import { SessionProvider } from '$lib/auth-provider';

import Header from './Header';

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
