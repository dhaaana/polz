import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import prisma from '@/lib/prisma';

import { createRouter } from '../context';

export const voteRouter = createRouter().mutation('add', {
  input: z.object({
    optionId: z.string(),
  }),
  async resolve({ input, ctx }) {
    const { optionId } = input;
    const vote = await prisma.vote.create({
      data: {
        optionId,
        voterToken: ctx?.token || 'No token',
      },
    });
    return vote;
  },
});
