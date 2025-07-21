import { PropsWithChildren } from 'react'

const HomeLayout = ({ children }: PropsWithChildren) => {
  return <div className="flex min-h-screen flex-col">{children}</div>
}

export default HomeLayout
