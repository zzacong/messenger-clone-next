import NextAuth, { type NextAuthOptions } from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import EmailProvider from 'next-auth/providers/email';

import { env } from '$env/server.mjs';

import { UpstashRedisAdapter } from '@next-auth/upstash-redis-adapter';
import { redis } from '$server/db/redis';

export const authOptions: NextAuthOptions = {
  adapter: UpstashRedisAdapter(redis),

  session: {
    strategy: 'jwt',
  },

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

    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],

  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request', // (used for check email message)
  },
};

export default NextAuth(authOptions);
