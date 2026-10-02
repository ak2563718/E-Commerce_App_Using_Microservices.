import SellerFooter from '@/component/seller/SellerFooter'
import SellNavbar from '@/component/seller/SellNavbar'
import React, { ReactNode } from 'react'

type props={
    children:ReactNode
}

export default function layout({children}:props) {
  return (
    <div>
        <SellNavbar/>
        <div>{children}</div>
        <SellerFooter/>
    </div>
  )
}
