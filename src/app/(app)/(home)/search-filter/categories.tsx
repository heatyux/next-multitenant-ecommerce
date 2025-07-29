import { Category } from '@/payload-types'

import { CategoryDropdown } from './category-dropdown'

type CategoriesProps = {
  data: any
}

// Categories - Renders a list of categories dropdown buttons for filtering
export const Categories = ({ data }: CategoriesProps) => {
  return (
    <div>
      {data.map((category: Category) => (
        <div key={category.id}>
          <CategoryDropdown
            category={category}
            isActive={false}
            isNavigationHovered={false}
          />
        </div>
      ))}
    </div>
  )
}
