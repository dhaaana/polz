import prisma from '@/lib/prisma';

import { createRouter } from '../context';

export const appRouter = createRouter().query('hello', {
  async resolve() {
    const questions = await prisma.question.findMany();
    return questions;
  },
});

export type AppRouter = typeof appRouter;
