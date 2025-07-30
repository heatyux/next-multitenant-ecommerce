'use client'

import { useEffect, useRef, useState } from 'react'

import { ListFilterIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { CustomCategory } from '../types'
import { CategoryDropdown } from './category-dropdown'

type CategoriesProps = {
  data: CustomCategory[]
}

// Categories - Renders a list of categories dropdown buttons with responsive visibility
export const Categories = ({ data }: CategoriesProps) => {
  // Ref to the visible container that holds the dropdown and "View All" button
  const containerRef = useRef<HTMLDivElement>(null)

  // Ref to a hidden container used to measure total width of all dropdowns
  const measureRef = useRef<HTMLDivElement>(null)

  // Ref to the "View All" button used in width calculations
  const viewAllRef = useRef<HTMLDivElement>(null)

  // Number of categories to show based on available width
  const [visibleCount, setVisibleCount] = useState(data.length)

  // Tracks whether any category dropdown is currently hovered
  const [isAnyHovered, setIsAnyHovered] = useState(false)

  // TODO: Placeholder state to potentially toggle sidebar - not used currently
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // TODO: Hardcoded active category (can be replaced with real logic)
  const activeCategory = 'all'

  // Find the index of the active category in the data array
  const activeCategoryIndex = data.findIndex(
    (category) => category.slug === activeCategory,
  )

  // Determine if the active category is currently not visible in the container
  const isActiveCategoryHidden =
    activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1

  // Effect to calculate how many dropdown fit within the visible container
  useEffect(() => {
    const calculateVisible = () => {
      if (!containerRef.current || !measureRef.current || !viewAllRef.current) {
        return
      }

      const containerWidth = containerRef.current.offsetWidth
      const viewAllWidth = viewAllRef.current.offsetWidth
      const availableWidth = containerWidth - viewAllWidth

      // All category dropdown items inside the hidden measure container
      const items = Array.from(measureRef.current.children)

      let totalWidth = 0
      let visible = 0

      for (const item of items) {
        const width = item.getBoundingClientRect().width

        // Stop if adding the next item's width would overflow the visible container
        if (totalWidth + width > availableWidth) {
          break
        }

        totalWidth += width
        visible++
      }

      setVisibleCount(visible)
    }

    // Observe size changes on the containre to re-calculate on resize
    const resizeObserver = new ResizeObserver(calculateVisible)
    resizeObserver.observe(containerRef.current!)

    // clean up the observer on component unmount
    return () => {
      resizeObserver.disconnect()
    }
  }, [data.length])

  return (
    <div className="relative w-full">
      <div className="flex flex-nowrap items-center">
        {data.map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={false}
              isNavigationHovered={false}
            />
          </div>
        ))}

        {/* View All button - always visible and positioned at the end */}
        <div ref={viewAllRef} className="shrink-0">
          <Button
            className={cn(
              'hover:border-primary h-11 rounded-full border-transparent bg-transparent px-4 text-black hover:bg-white',
              isActiveCategoryHidden &&
                !isAnyHovered &&
                'border-primary bg-black',
            )}
          >
            View All <ListFilterIcon className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
