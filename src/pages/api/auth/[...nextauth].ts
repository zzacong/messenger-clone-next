import NextAuth, { type NextAuthOptions } from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';

import { env } from '$env/server.mjs';

export const authOptions: NextAuthOptions = {
  // Include token.sub on session (jwt strategy way)
  callbacks: {
    session({ session, token }) {
      if (session.user) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        session.user.id = token.sub!;
      }
      return session;
    },
  },

  // Configure one or more authentication providers
  providers: [
    FacebookProvider({
      clientId: env.FACEBOOK_CLIENT_ID,
      clientSecret: env.FACEBOOK_CLIENT_SECRET,
    }),
  ],

  pages: {
    signIn: '/auth/signin',
  },
};

export default NextAuth(authOptions);
