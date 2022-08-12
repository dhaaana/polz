import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { unstable_getServerSession } from 'next-auth/next';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

// The app's context - is generated for each incoming request
export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
  if (!opts) return;
  const session = await unstable_getServerSession(
    opts.req,
    opts.res,
    authOptions
  );
  if (!session) {
    return { token: opts.req.cookies['poll-token'] };
  }
  return { token: session.user?.email };
}
type Context = trpc.inferAsyncReturnType<typeof createContext>;

// Helper function to create a router with your app's context
export function createRouter() {
  return trpc.router<Context>();
}
