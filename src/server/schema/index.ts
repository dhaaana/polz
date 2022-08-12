import { z } from 'zod';

export const pollSchema = z.object({
  poll: z.object({
    body: z.string().min(2, 'Question must contain at least 2 character(s)'),
    expiresAt: z.string(),
  }),
  options: z
    .array(
      z.object({
        body: z.string().min(2, 'Option must contain at least 2 character(s)'),
      })
    )
    .min(2, 'Question must contain at least 2 option(s)')
    .max(10),
});

export type pollSchemaType = z.infer<typeof pollSchema>;
