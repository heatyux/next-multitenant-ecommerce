import { PropsWithChildren, Suspense } from 'react'

import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import { getQueryClient, trpc } from '@/trpc/server'

import { Footer } from './footer'
import { Navbar } from './navbar'
import { SearchFilter, SearchFiltersSkeleton } from './search-filter'

const HomeLayout = async ({ children }: PropsWithChildren) => {
  // Initializa a new React Query Client for managing cached queries
  const queryClient = getQueryClient()

  // Prefetch category data on the server using React Query and tRPC before hydration
  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions())

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top navigation bar */}
      <Navbar />

      {/* Wrap the SearchFilters with HydrationBoundary to hydrate server-side fetched data for React Query */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* Use Suspense to display a fallback skeleton while SearchFilters is loading */}
        <Suspense fallback={<SearchFiltersSkeleton />}>
          {/* Search filter input */}
          <SearchFilter />
        </Suspense>
      </HydrationBoundary>

      {/* Main content area */}
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>

      {/* Bottom Footer */}
      <Footer />
    </div>
  )
}

export default HomeLayout
