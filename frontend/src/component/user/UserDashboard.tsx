'use client'
import { useState } from 'react'
import { User, MapPin, ShoppingBag, Heart, Bell, LogOut, Store, Menu, X } from 'lucide-react'
import Profile from './Profile'
import Addresses from './Addressess'
import MyOrders from './MyOrders'
import Wishlist from './Wishlist'
import Notifications from './Notifications'
import { NOTIFICATIONS } from './userData'

export type UserNav = 'profile' | 'addresses' | 'orders' | 'wishlist' | 'notifications'



const NAV: { id: UserNav; label: string; icon: typeof User }[] = [
  { id: 'profile', label: 'My Profile', icon: User },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'orders', label: 'My Orders', icon: ShoppingBag },
  { id: 'wishlist', label: 'My Wishlist', icon: Heart },
  { id: 'notifications', label: 'Notifications', icon: Bell },
]

export default function UserDashboard() {
  const [active, setActive] = useState<UserNav>('profile')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const unread = NOTIFICATIONS.filter(n => !n.read).length

  const pages: Record<UserNav, React.ReactElement> = {
    profile: <Profile />,
    addresses: <Addresses />,
    orders: <MyOrders />,
    wishlist: <Wishlist />,
    notifications: <Notifications />,
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#f8f5ff', fontFamily: 'DM Sans, sans-serif' }}>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className="fixed md:sticky top-0 h-screen z-40 flex flex-col shrink-0 transition-transform duration-300"
        style={{
          width: 260,
          background: '#fff',
          borderRight: '1px solid #f0ebff',
          boxShadow: '2px 0 12px rgba(124,58,237,0.06)',
          transform: sidebarOpen ? 'translateX(0)' : undefined,
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: '#f0ebff' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #e91e8c, #7c3aed)' }}>
              <Store className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-gray-900 text-base" style={{ fontFamily: 'Outfit, sans-serif' }}>ShopHub</span>
          </div>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Avatar + name */}
        <div className="flex flex-col items-center gap-2 py-6 px-5 border-b" style={{ borderColor: '#f0ebff' }}>
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-xl"
            style={{ background: 'linear-gradient(135deg, #e91e8c, #a855f7)' }}
          >
            MK
          </div>
          <div className="text-center">
            <p className="font-bold text-gray-800 text-sm">Meera Kapoor</p>
            <p className="text-xs text-gray-400 mt-0.5">meera.kapoor@gmail.com</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 flex flex-col gap-1 px-3 py-4">
          {NAV.map(({ id, label, icon: Icon }) => {
            const isActive = active === id
            return (
              <button
                key={id}
                onClick={() => { setActive(id); setSidebarOpen(false) }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left relative"
                style={{
                  background: isActive ? '#f3e8ff' : 'transparent',
                  color: isActive ? '#7c3aed' : '#6b7280',
                }}
              >
                <Icon style={{ width: 18, height: 18, flexShrink: 0 }} />
                <span className="text-sm font-semibold">{label}</span>
                {id === 'notifications' && unread > 0 && (
                  <span
                    className="ml-auto w-5 h-5 rounded-full flex items-center justify-center text-white font-black"
                    style={{ background: '#e91e8c', fontSize: 10 }}
                  >
                    {unread}
                  </span>
                )}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full" style={{ background: '#7c3aed' }} />
                )}
              </button>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-5 border-t pt-3" style={{ borderColor: '#f0ebff' }}>
          <button
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full transition-all hover:bg-red-50"
            style={{ color: '#ef4444' }}
          >
            <LogOut style={{ width: 18, height: 18 }} />
            <span className="text-sm font-semibold">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b" style={{ borderColor: '#f0ebff' }}>
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <span className="font-black text-gray-800" style={{ fontFamily: 'Outfit, sans-serif' }}>ShopHub</span>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black" style={{ background: 'linear-gradient(135deg, #e91e8c, #a855f7)' }}>MK</div>
        </div>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {pages[active]}
        </main>
      </div>
    </div>
  )
}
