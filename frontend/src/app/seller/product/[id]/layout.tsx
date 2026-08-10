'use client'

import SellNavbar from '@/component/seller/SellNavbar'
import Sidebar from '@/component/seller/sellerdashboard/Sidebar'
import React, { useState } from 'react'

type Props = {
  children: React.ReactNode
}

function Layout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex min-h-screen flex-col" style={{ background: '#f8f5ff' }}>
      <div className="flex min-h-0 flex-1">
        <Sidebar
          active="products"
          setActive={() => undefined}
          open={sidebarOpen}
          setOpen={setSidebarOpen}
        />
        <main className="min-w-0 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
