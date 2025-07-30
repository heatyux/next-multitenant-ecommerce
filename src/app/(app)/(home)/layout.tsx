import { PropsWithChildren } from 'react'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Category } from '@/payload-types'

import { Footer } from './footer'
import { Navbar } from './navbar'
import { SearchFilter } from './search-filter'
import { CustomCategory } from './types'

const HomeLayout = async ({ children }: PropsWithChildren) => {
  // Initialize Payload CMS with config
  const payload = await getPayload({
    config: configPromise,
  })

  // Fetch all top-level categories (i.e., categories without a parent)
  const data = await payload.find({
    collection: 'categories',
    pagination: false, // Retrieve all categories without pagination
    depth: 1, // Also include subcategories one level deep
    where: {
      parent: {
        exists: false,
      },
    },
    sort: 'name',
  })

  // Format the data to flatten subcategories and remove nested sub-subcategories
  const formatedData: CustomCategory[] = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
      ...(doc as Category), // Cast to Category since depth: 1 ensures proper typing
      subcategories: undefined, // Prevent further nesting for simplicity
    })),
  }))

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top navigation bar */}
      <Navbar />

      {/* Search filter input */}
      <SearchFilter data={formatedData} />

      {/* Main content area */}
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>

      {/* Bottom Footer */}
      <Footer />
    </div>
  )
}

export default HomeLayout
