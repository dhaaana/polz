import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import prisma from '@/lib/prisma';

import { createRouter } from '../context';
import { pollSchema } from '../../schema/app.schema';

export const pollRouter = createRouter()
  .query('all', {
    async resolve() {
      const polls = await prisma.poll.findMany();
      return polls;
    },
  })
  .mutation('create', {
    input: pollSchema,
    async resolve({ input, ctx }) {
      const { poll: pollData, options: optionsData } = input;
      const poll = await prisma.poll.create({
        data: {
          body: pollData.body,
          expiresAt: pollData.expiresAt || new Date(),
          ownerToken: ctx?.token || 'No token',
          options: {
            create: optionsData,
          },
        },
        select: { id: true },
      });

      return poll;
    },
  })
  .query('by-id', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      const poll = await prisma.poll.findUnique({
        where: { id: input.id },
        select: {
          id: true,
          body: true,
          ownerToken: true,
          isPublic: true,
          options: {
            include: {
              _count: {
                select: { votes: true },
              },
            },
          },
        },
      });

      const vote = await prisma.vote.findFirst({
        where: {
          voterToken: ctx?.token || 'No token',
          option: {
            poll: {
              id: poll?.id,
            },
          },
        },
      });

      if (!poll) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Poll not found`,
        });
      }
      if (poll.ownerToken === ctx?.token) {
        return { poll, isOwner: true };
      }
      if (vote) {
        return { poll, isOwner: false, isVoted: true };
      }

      return { poll, isOwner: false, isVoted: false };
    },
  })
  .mutation('vote-on-poll', {
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
