import type { NextApiRequest, NextApiResponse } from 'next';

import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '$pages/api/auth/[...nextauth]';

/**
 * Wrapper for unstable_getServerSession https://next-auth.js.org/configuration/nextjs
 * See example usage in trpc createContext or the restricted API route
 */
export const getServerAuthSession = async (req?: NextApiRequest, res?: NextApiResponse) => {
  if (req && res) return await unstable_getServerSession(req, res, authOptions);
  return await unstable_getServerSession(authOptions);
};
