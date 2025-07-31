import { baseProcedure, createTRPCRouter } from '@/trpc/init'

// categoriesRouter - Defines category-related API procedures
export const categoriesRouter = createTRPCRouter({
  // getMany - Returns a placeholder list of categories
  getMany: baseProcedure.query(async () => {
    return [{ hello: 'world' }]
  }),
})
