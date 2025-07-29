import { SearchIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'

interface SearchInputProps {
  disabled?: boolean
}

// SearchInput - Input field with a search icon used to filter/search for products
export const SearchInput = ({ disabled }: SearchInputProps) => {
  return (
    <div className="flex w-full items-center gap-2">
      <div className="relative w-full">
        <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
        <Input placeholder="Search products" className="pl-8" />

        {/* TODO: Add categories "View All" button */}
        {/* TODO: Add library button */}
      </div>
    </div>
  )
}
