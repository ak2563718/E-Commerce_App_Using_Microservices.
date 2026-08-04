'use client'
import { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Overview from './Overview'
import Orders from './Orders'
import Products from './Products'
import Analytics from './Analytics'
import Payouts from './Payouts'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { authCheckSession } from '@/redux/auth/auth.Action'
import { useRouter } from 'next/navigation'

export type NavItem = 'overview' | 'orders' | 'products' | 'analytics' | 'payouts'



export default function SellerDashboard() {
  const [active, setActive] = useState<NavItem>('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { user, loading } = useAppSelector((state)=>state.auth)
  const pages: Record<NavItem, React.ReactElement> = {
    overview: <Overview />,
    orders: <Orders />,
    products: <Products />,
    analytics: <Analytics />,
    payouts: <Payouts />,
  }
 
  if(!user){
    return router.replace('/seller/login')
  }

  useEffect(()=>{
    dispatch(authCheckSession())
  },[])
  console.log("user details",user)
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#f8f5ff', fontFamily: 'DM Sans, sans-serif' }}>
      <Sidebar
        active={active}
        setActive={setActive}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />
      <main className="flex-1 overflow-y-auto">
        {pages[active]}
      </main>
    </div>
  )
}
