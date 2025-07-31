import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { CategoriesGetManyOutput } from '@/modules/categories/types'
import { useTRPC } from '@/trpc/client'

type CategoriesSidebarProps = {
  open: boolean // Whether the sidebar is currently open
  onOpenChange: (open: boolean) => void // Callback to toggle sidebar visibility
}

// CategoriesSidebar - Displays a sliding sidebar to navigate categories and subcategories
export const CategoriesSidebar = ({
  open,
  onOpenChange,
}: CategoriesSidebarProps) => {
  const trpc = useTRPC() // Access the tRPC client
  const { data } = useQuery(trpc.categories.getMany.queryOptions()) // Fetch all categories from the API

  const router = useRouter()

  // State to track current parent category view (null = top-level categories)
  const [parentCategory, setParentCategory] =
    useState<CategoriesGetManyOutput | null>(null)

  // State to track the currently selected category (used for back navigation and styling)
  const [selectedCategory, setSelectedCategory] = useState<
    CategoriesGetManyOutput[1] | null
  >(null)

  // Use subcategories if navigating into a parent category, else use top-level data
  const currentCategories = parentCategory ?? data ?? []

  // Dynamically style sidebar based on selected category's color
  const backgroundColor = selectedCategory?.color ?? 'white'

  // Reset state and notify parent when sidebar open/close state changes
  const handleOpenChange = (open: boolean) => {
    setParentCategory(null)
    setSelectedCategory(null)
    onOpenChange(open)
  }

  // Handle a category click (navigate into subcategories or redirect to category page)
  const handleCategoryClick = (category: CategoriesGetManyOutput[1]) => {
    if (category.subcategories && category.subcategories.length > 0) {
      // If the category has subcategories, show them
      setParentCategory(category.subcategories as CategoriesGetManyOutput)
      setSelectedCategory(category)
    } else {
      // If leaf category, construct redirect path based on slug
      if (parentCategory && selectedCategory) {
        router.push(`/${selectedCategory.slug}/${category.slug}`)
      } else {
        router.push(category.slug === 'all' ? '/' : `/${category.slug}`)
      }
      // Close sidebar after navigation
      onOpenChange(false)
    }
  }

  // Navigate back to the previous category level (i.e., from subcategories to top-level)
  const handleBackClick = () => {
    if (parentCategory) {
      setParentCategory(null)
      setSelectedCategory(null)
    }
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        className="transition-none"
        style={{ backgroundColor }}
      >
        <SheetHeader className="border-b">
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex h-full flex-col overflow-y-auto pb-2">
          {/* Show back button when inside subcategory view */}
          {parentCategory && (
            <button
              onClick={handleBackClick}
              className="flex w-full cursor-pointer items-center p-4 font-medium hover:bg-black hover:text-white"
            >
              <ChevronLeftIcon className="mr-2 size-4" />
              Back
            </button>
          )}

          {/* Render each visible category/subcategory button */}
          {currentCategories.map((category) => (
            <button
              key={category.slug}
              onClick={() => handleCategoryClick(category)}
              className="flex w-full cursor-pointer items-center justify-between p-4 font-medium hover:bg-black hover:text-white"
            >
              {category.name}

              {/* Chevron if category has children */}
              {category.subcategories && category.subcategories.length > 0 && (
                <ChevronRightIcon className="size-4" />
              )}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
