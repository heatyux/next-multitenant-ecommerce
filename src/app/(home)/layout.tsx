import { PropsWithChildren } from 'react'

import { Navbar } from './navbar'

const HomeLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {children}
    </div>
  )
}

export default HomeLayout
