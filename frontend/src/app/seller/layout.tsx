import Sidebar from '@/component/seller/sellerdashboard/Sidebar'
import SellNavbar from '@/component/seller/SellNavbar'
import React from 'react'
type Props={
children:React.ReactNode
}
export default function layout({children}:Props) {
  return (
    <div className="min-h-screen bg-gray-50">
  {/* Top Navbar */}
  <SellNavbar />

  {/* Dashboard Area */}
  <div className="flex">
    {/* Sidebar */}
      <div className='h-screen '><Sidebar /></div>

    {/* Main Content */}
    <main className="min-w-0 flex-1 overflow-y-auto">
      {children}
    </main>
  </div>
</div>
  )
}
