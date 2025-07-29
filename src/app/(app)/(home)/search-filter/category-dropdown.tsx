import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Category } from '@/payload-types'

type CategoryDropdownProps = {
  category: Category // The category object to render
  isActive?: boolean // Indicates if the current category is active
  isNavigationHovered?: boolean // Indicates if the navigation is currently hovered
}

// CategoryDropdown - Renders a stylized button for a category
// TODO: Dropdown functionality is not implemented yet - only the button in rendered
export const CategoryDropdown = ({
  category,
  isActive,
  isNavigationHovered,
}: CategoryDropdownProps) => {
  return (
    <Button
      variant="elevated"
      className={cn(
        'text-balck hover:border-primary h-11 rounded-full border-transparent bg-transparent px-4 hover:bg-white',
        isActive && !isNavigationHovered && 'border-primary bg-white',
      )}
    >
      {category.name}
    </Button>
  )
}
