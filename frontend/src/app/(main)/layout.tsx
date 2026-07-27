import Navbar from '@/component/dashboard/Navbar'
import React, { ReactNode } from 'react'
type props={
    children:ReactNode
}
function Layout({children}:props) {

  return (
    <div>
        <Navbar/>
        <div>{children}</div>
    </div>
  )
}

export default Layout