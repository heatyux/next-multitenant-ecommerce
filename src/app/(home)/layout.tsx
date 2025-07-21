import { PropsWithChildren } from 'react'

import { Footer } from './footer'
import { Navbar } from './navbar'

const HomeLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1 bg-[#F4F4F0]">{children}</div>

      <Footer />
    </div>
  )
}

export default HomeLayout
