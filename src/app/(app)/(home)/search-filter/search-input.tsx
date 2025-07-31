'use client'

import { useState } from 'react'

import { ListFilterIcon, SearchIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { CategoriesSidebar } from './categories-sidebar'

interface SearchInputProps {
  disabled?: boolean
}

// SearchInput - Input field with a search icon used to filter/search for products
export const SearchInput = ({ disabled }: SearchInputProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex w-full items-center gap-2">
      {/* Sidebar for category filters (mobile only) */}
      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />

      <div className="relative w-full">
        <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
        <Input
          disabled={disabled}
          placeholder="Search products"
          className="pl-8"
        />
      </div>

      {/* Toggle button for category sidebar (mobile only) */}
      <Button
        variant="elevated"
        className="flex size-12 shrink-0 lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <ListFilterIcon />
      </Button>

      {/* TODO: Add library button */}
    </div>
  )
}
