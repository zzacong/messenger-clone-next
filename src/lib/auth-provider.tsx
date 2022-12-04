'use client';

import { type Session } from 'next-auth';
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';

export function SessionProvider({
  session,
  children,
}: React.PropsWithChildren<{ session?: Session | null }>) {
  return <NextAuthSessionProvider session={session}>{children}</NextAuthSessionProvider>;
}
