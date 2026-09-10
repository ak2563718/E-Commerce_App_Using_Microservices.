import SellNavbar from '@/component/seller/SellNavbar'
import Sidebar from '@/component/seller/sellerdashboard/Sidebar'
import React from 'react'
type Props ={
    children:React.ReactNode
}
function layout({ children}:Props) {
  return (
    <div>
       <SellNavbar/>
       <Sidebar /> 
       <div>{children}</div>
    </div>
  )
}

export default layout