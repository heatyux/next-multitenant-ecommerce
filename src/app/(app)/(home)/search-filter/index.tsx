import { Categories } from './categories'
import { SearchInput } from './search-input'

type SearchFilterProps = {
  data: any // TODO: Data used for rendering filter options (e.g., categories, tags, etc.)
}

// SearchFilter - Renders a search input and filter data section
export const SearchFilter = ({ data }: SearchFilterProps) => {
  return (
    <div className="flex w-full flex-col gap-4 border-b px-4 py-8 lg:px-12">
      {/* Search bar input field */}
      <SearchInput />

      {/* Categories filter section */}
      <Categories data={data} />
    </div>
  )
}
