import Navbar from '@/component/dashboard/Navbar'
import SubNavbar from '@/component/dashboard/SubNavbar'
import React, { ReactNode } from 'react'
type props={
    children:ReactNode
}
function Layout({children}:props) {

  return (
    <div>
        <Navbar/>
        <SubNavbar/>
        <div>{children}</div>
    </div>
  )
}

export default Layout