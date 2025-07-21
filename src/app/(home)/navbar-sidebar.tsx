import React from 'react'

import Link from 'next/link'

import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

type NavbarItem = {
  href: string
  children: React.ReactNode
}

type NavbarSidebarProps = {
  items: NavbarItem[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const NavbarSidebar = ({
  items,
  open,
  onOpenChange,
}: NavbarSidebarProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transition-none">
        <SheetHeader className="border-b p-4">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex h-full flex-col overflow-y-auto pb-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex w-full items-center p-4 text-left text-base font-medium hover:bg-black hover:text-white"
            >
              {item.children}
            </Link>
          ))}
        </ScrollArea>
        <div className="border-t">
          <Link
            onClick={() => onOpenChange(false)}
            href="/sign-in"
            className="flex w-full items-center p-4 text-left text-base font-medium hover:bg-black hover:text-white"
          >
            Login
          </Link>
          <Link
            onClick={() => onOpenChange(false)}
            href="/sign-up"
            className="flex w-full items-center p-4 text-left text-base font-medium hover:bg-black hover:text-white"
          >
            Start selling
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
