import SellNavbar from '@/component/seller/SellNavbar'
import SellerFooter from '@/component/seller/SellerFooter'
import React, { ReactNode } from 'react'

type props={
    children:ReactNode
}
function Layout({children}:props) {
    
  return (
    <div>
        <SellNavbar/>
        <div>{children}</div>
        <SellerFooter/>
    </div>
  )
}

export default Layout