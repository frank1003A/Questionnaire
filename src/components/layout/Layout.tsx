import React, { ReactNode } from 'react'
import Navbar from 'components/Navbar'
import Sidebar from 'components/Sidebar'

interface Props {
  children: ReactNode;
}
const Layout = ({children}:Props) => {
  return (
    <div className="layout">
        <Navbar/>
        <Sidebar/>
        <main>{children}</main>
    </div>
  )
}

export default Layout