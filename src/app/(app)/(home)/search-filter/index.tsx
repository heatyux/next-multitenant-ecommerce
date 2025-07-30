import { CustomCategory } from '../types'
import { Categories } from './categories'
import { SearchInput } from './search-input'

type SearchFilterProps = {
  data: CustomCategory[]
}

// SearchFilter - Renders a search input and filter data section
export const SearchFilter = ({ data }: SearchFilterProps) => {
  return (
    <div className="flex w-full flex-col gap-4 border-b px-4 py-8 lg:px-12">
      {/* Search bar input field */}
      <SearchInput data={data} />

      {/* Categories filter section (only visible on large screens) */}
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
    </div>
  )
}
