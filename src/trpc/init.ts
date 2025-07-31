import { cache } from 'react'

import { initTRPC } from '@trpc/server'

export const createTRPCContext = cache(() => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return { userId: 'user_123' }
})

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
})

/**
 * Base router and procedure helpers
 */
export const createTRPCRouter = t.router
export const createCallerFactory = t.createCallerFactory
export const baseProcedure = t.procedure
