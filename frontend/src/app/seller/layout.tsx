import SellNavbar from '@/component/seller/SellNavbar'
import React, { ReactNode } from 'react'

type props={
    children:ReactNode
}
function Layout({children}:props) {
    
  return (
    <div>
        <SellNavbar/>
        <div>{children}</div>
    </div>
  )
}

export default Layout