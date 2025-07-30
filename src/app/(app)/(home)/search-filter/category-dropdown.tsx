'use client'

import { useRef, useState } from 'react'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { CustomCategory } from '../types'
import { SubcategoryMenu } from './subcategory-menu'
import { useDropdownPosition } from './use-dropdown-position'

type CategoryDropdownProps = {
  category: CustomCategory // The category object to render
  isActive?: boolean // Indicates if the current category is active
  isNavigationHovered?: boolean // Indicates if the navigation is currently hovered
}

// CategoryDropdown - Renders a stylized button for a category
export const CategoryDropdown = ({
  category,
  isActive,
  isNavigationHovered,
}: CategoryDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false) // Track if the dropdown is open (initially closed)
  const dropdownRef = useRef<HTMLDivElement>(null) // Ref of attach to the dropdown container for position calculation

  const { getDropdownPosition } = useDropdownPosition(dropdownRef) // Custom hook to calculate the dropdown's position based on viewport

  // Get the position for the dropdown using the custom hook
  const dropdownPosition = getDropdownPosition() // Fetch calculated position based on the dropdown's reference

  // Handle mouse enter event to open dropdown if subcategories exist
  const onMouseEnter = () => {
    if (category.subcategories) {
      setIsOpen(true)
    }
  }

  // Handle mouse leave event to close dropdown when the mouse leaves the area
  const onMouseLeave = () => {
    setIsOpen(false)
  }

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative">
        {/* Button component to display the category */}
        <Button
          variant="elevated"
          className={cn(
            'hover:border-primary h-11 rounded-full border-transparent bg-transparent px-4 text-black hover:bg-white',
            isActive && !isNavigationHovered && 'border-primary bg-white',
            isOpen &&
              'border-primary -translate-x-[4px] -translate-y-[4px] bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all',
          )}
        >
          <Link href={`/${category.slug === 'all' ? '' : category.slug}`}>
            {category.name}
          </Link>
        </Button>

        {/* Render a triangle indicator below the button to signal dropdown visibility */}
        {category.subcategories && category.subcategories?.length > 0 && (
          <div
            className={cn(
              'absolute -bottom-3 left-1/2 h-0 w-0 -translate-x-1/2 border-r-[10px] border-b-[10px] border-l-[10px] border-r-transparent border-b-black border-l-transparent opacity-0',
              isOpen && 'opacity-100',
            )}
          ></div>
        )}

        {/* Conditionally render the SubcategoryMenu based on dropdown state (open or closed) */}
        <SubcategoryMenu
          category={category}
          isOpen={isOpen}
          position={dropdownPosition}
        />
      </div>
    </div>
  )
}
