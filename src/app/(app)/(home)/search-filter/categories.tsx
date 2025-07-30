import { CustomCategory } from '../types'
import { CategoryDropdown } from './category-dropdown'

type CategoriesProps = {
  data: CustomCategory[]
}

// Categories - Renders a list of categories dropdown buttons for filtering
export const Categories = ({ data }: CategoriesProps) => {
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
      </div>
    </div>
  )
}
