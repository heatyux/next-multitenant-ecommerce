import { categoriesRouter } from '@/modules/categories/server/procedures'

import { createTRPCRouter } from '../init'

// appRouter - Registers all feature routers into a single app router
export const appRouter = createTRPCRouter({
  categories: categoriesRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
