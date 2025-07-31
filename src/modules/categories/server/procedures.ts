import { Category } from '@/payload-types'
import { baseProcedure, createTRPCRouter } from '@/trpc/init'

// categoriesRouter - Defines category-related API procedures
export const categoriesRouter = createTRPCRouter({
  // getMany - Fetches all top-level categories with their subcategories
  getMany: baseProcedure.query(async ({ ctx }) => {
    // Fetch all categories that do not have a parent (top-level only)
    const data = await ctx.db.find({
      collection: 'categories',
      pagination: false, // Retrieve all categories without pagination
      depth: 1, // Include subcategories (1 level deep)
      where: {
        parent: {
          exists: false,
        },
      },
      sort: 'name', // Sort categories by name
    })

    // Flatten subcategories and remove further nesting
    const formatedData = data.docs.map((doc) => ({
      ...doc,
      subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
        ...(doc as Category),
        subcategories: undefined, // Prevent deeper nesting
      })),
    }))

    return formatedData
  }),
})
