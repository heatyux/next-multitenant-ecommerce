'use client'

import { useSuspenseQuery } from '@tanstack/react-query'

import { useTRPC } from '@/trpc/client'

import { Categories } from './categories'
import { SearchInput } from './search-input'

// SearchFilter - Renders a search input and filter data section
export const SearchFilter = () => {
  const trpc = useTRPC() // Access the tRPC client
  // Fetch categories data with suspense-enabled query
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions())

  return (
    <div
      className="flex w-full flex-col gap-4 border-b px-4 py-8 lg:px-12"
      style={{ backgroundColor: '#F5F5F5' }}
    >
      {/* Search bar input field */}
      <SearchInput />

      {/* Categories filter section (only visible on large screens) */}
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
    </div>
  )
}

// SearchFiltersSkeleton - Fallback skeleton UI shown while filters are loading
export const SearchFiltersSkeleton = () => {
  return (
    <div
      className="flex w-full flex-col gap-4 border-b px-4 py-8 lg:px-12"
      style={{ backgroundColor: '#F5F5F5' }}
    >
      {/* Disabled search input as placeholder */}
      <SearchInput disabled />
      <div className="hidden lg:block">
        {/* Empty space simulating categories list */}
        <div className="h-11"></div>
      </div>
    </div>
  )
}
