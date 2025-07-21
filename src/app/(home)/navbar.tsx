import { Poppins } from 'next/font/google'
import Link from 'next/link'

import { cn } from '@/lib/utils'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
})

export const Navbar = () => {
  return (
    <nav className="flex h-20 justify-between border-b bg-white font-medium">
      <Link href="/" className="flex items-center pl-6">
        <span className={cn('text-5xl font-semibold', poppins.className)}>
          funroad
        </span>
      </Link>
    </nav>
  )
}
