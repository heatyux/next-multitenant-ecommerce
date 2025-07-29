import Link from 'next/link'

import { Category } from '@/payload-types'

type SubcategoryMenuProps = {
  category: Category // The category object containing the subcategories to be displayed
  isOpen: boolean // Indicates whether the dropdown menu is open or closed
  position: { top: number; left: number } // Position where the menu should be rendered (top and left coordinates)
}

// SubcategoryMenu - Component to render the subcategory dropdown menu
export const SubcategoryMenu = ({
  category,
  isOpen,
  position,
}: SubcategoryMenuProps) => {
  // Exit early if dropdown is not open or there are no subcategories to show
  if (
    !isOpen ||
    !category.subcategories ||
    category.subcategories.length === 0
  ) {
    return null
  }

  // Use category's color if provided, fallback to light gray
  const backgroundColor = category.color || '#F5F5F5'

  return (
    <div
      className="fixed z-100"
      style={{ top: position.top, left: position.left }}
    >
      {/* Invisible hover bridge to maintain dropdown on hover */}
      <div className="h-3 w-60" />

      {/* Dropdown content container */}
      <div
        style={{ backgroundColor }}
        className="text-balck w-60 -translate-x-[2px] -translate-y-[2px] overflow-hidden rounded-md border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      >
        <div>
          {category.subcategories.map((subcategory: Category) => (
            <Link
              key={subcategory.slug}
              href={'/'}
              className="flex w-full items-center justify-between p-4 text-left font-medium underline hover:bg-black hover:text-white"
            >
              {subcategory.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
