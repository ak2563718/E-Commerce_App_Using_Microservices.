import SellNavbar from '@/component/seller/SellNavbar'
import React from 'react'
type props={
    children:React.ReactNode
}
function layout({children}:props) {
  return (
    <div>
        <SellNavbar/>
        {children}
    </div>
  )
}

export default layout