import Navbar from '@/component/dashboard/Navbar'
import React, { ReactNode } from 'react'
type props={
 children:ReactNode,
}
function layout({children}:props) {
  return (
    <>
    <div>
        <Navbar/>
    </div>
    {children}
    </>
  )
}

export default layout