import type { inferRouterOutputs } from '@trpc/server'

import type { AppRouter } from '@/trpc/routers/_app'

// CategoriesGetManyOutput - Inferred output type of the categories.getMany procedure
export type CategoriesGetManyOutput =
  inferRouterOutputs<AppRouter>['categories']['getMany']
