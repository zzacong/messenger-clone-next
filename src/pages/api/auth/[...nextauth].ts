import NextAuth, { type NextAuthOptions } from "next-auth";

import { env } from "../../../env/server.mjs";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  providers: [
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
