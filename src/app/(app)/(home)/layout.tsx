import { PropsWithChildren } from 'react'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Footer } from './footer'
import { Navbar } from './navbar'
import { SearchFilter } from './search-filter'

const HomeLayout = async ({ children }: PropsWithChildren) => {
  // Initialize Payload CMS with config
  const payload = await getPayload({
    config: configPromise,
  })

  // Fetch all top-level categories (i.e., categories without a parent)
  const data = await payload.find({
    collection: 'categories',
    depth: 1, // Also fetch nested subcategories
    where: {
      parent: {
        exists: false,
      },
    },
  })

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top navigation bar */}
      <Navbar />

      {/* Search filter input */}
      <SearchFilter data={data} />

      {/* Main content area */}
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>

      {/* Bottom Footer */}
      <Footer />
    </div>
  )
}

export default HomeLayout
