import { createReactQueryHooks } from '@trpc/react';
import { inferProcedureOutput } from '@trpc/server';

import { AppRouter } from '@/server/router/app.router';

export const trpc = createReactQueryHooks<AppRouter>();

/**
 * Enum containing all api query paths
 */
export type TQuery = keyof AppRouter['_def']['queries'];

export type InferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<
  AppRouter['_def']['queries'][TRouteKey]
>;
