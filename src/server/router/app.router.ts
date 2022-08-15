import { pollRouter } from './poll.router';
import { voteRouter } from './vote.router';
import { createRouter } from '../context';

export const appRouter = createRouter()
  .merge('poll.', pollRouter)
  .merge('vote.', voteRouter);

export type AppRouter = typeof appRouter;
