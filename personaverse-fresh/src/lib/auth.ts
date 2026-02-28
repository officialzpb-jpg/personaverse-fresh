// lib/auth.ts - Placeholder auth configuration
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [],
  callbacks: {
    session: async ({ session, token }) => {
      return session;
    },
  },
};
