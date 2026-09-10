import Navbar from '@/component/dashboard/Navbar'
import Sidebar from '@/component/user/Sidebar'
import React, { ReactNode } from 'react'
type props={
 children:ReactNode,
}
function layout({children}:props) {
  return (
    <>
    <div>
        <Navbar/>
        <Sidebar/>
        <div className="flex-1 p-8 overflow-auto ml-[200px]">
          {children}
        </div>
    </div>
    </>
  )
}

export default layout