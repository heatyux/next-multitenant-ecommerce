'use client'

import React from 'react'

import { Poppins } from 'next/font/google'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
})

// List of top-level navigation links
const navbarItems = [
  { href: '/', children: 'Home' },
  { href: '/about', children: 'About' },
  { href: '/features', children: 'Features' },
  { href: '/pricing', children: 'Pricing' },
  { href: '/contact', children: 'Contact' },
]

interface NavbarItemProps {
  href: string
  children: React.ReactNode
  isActive?: boolean
}

const NavbarItem = ({ href, children, isActive }: NavbarItemProps) => {
  return (
    <Button
      asChild
      variant="outline"
      className={cn(
        'hover:border-primary rounded-full border-transparent bg-transparent px-3.5 text-lg hover:bg-transparent',
        isActive && 'bg-black text-white hover:bg-black hover:text-white',
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  )
}

export const Navbar = () => {
  const pathname = usePathname()

  return (
    <nav className="flex h-20 justify-between border-b bg-white font-medium">
      <Link href="/" className="flex items-center pl-6">
        <span className={cn('text-5xl font-semibold', poppins.className)}>
          funroad
        </span>
      </Link>

      {/* Navigation Links - Visible on large screens */}
      <div className="hidden items-center gap-4 lg:flex">
        {navbarItems.map((item) => (
          <NavbarItem
            key={item.href}
            href={item.href}
            isActive={item.href === pathname}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>
    </nav>
  )
}
