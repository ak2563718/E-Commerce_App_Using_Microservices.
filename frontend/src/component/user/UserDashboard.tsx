'use client'
import { useState } from 'react'
import Profile from './Profile'
import Orders from './MyOrders'
import Wishlist from './Wishlist'
import Notifications from './Notifications'
import Sidebar from './Sidebar'
import Addresses from './Addressess'

export type NavItem = 'profile' | 'orders' | 'wishlist' | 'notifications' | 'address'

export default function App() {
  const [active, setActive] = useState<NavItem>('profile')

  return (
    <div className="flex min-h-screen" style={{ background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 40%, #fbcfe8 100%)' }}>
      <Sidebar active={active} setActive={setActive} />
      <main className="flex-1 p-8 overflow-auto">
        {active === 'profile' && <Profile />}
        {active === 'orders' && <Orders />}
        {active === 'wishlist' && <Wishlist />}
        {active === 'notifications' && <Notifications />}
        {active === 'address' && <Addresses/>}
      </main>
    </div>
  )
}
