'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import ProfileDropdown from './ProfileDropdown'
import { authCheckSession } from '@/redux/auth/auth.Action'

interface NavbarProps {
  onLoginClick?: () => void
  onCartClick?: () => void
  cartCount?: number
  notificationCount?: number
}

export default function Navbar({
  onLoginClick,
  onCartClick,
  cartCount = 3,
  notificationCount = 5,
}: NavbarProps) {
  const [search, setSearch] = useState('')
  const [moreOpen, setMoreOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const moreRef = useRef<HTMLDivElement>(null)
  const notifRef = useRef<HTMLDivElement>(null)
  const { islogin } = useAppSelector((state)=>state.auth)
  const dispatch = useAppDispatch()
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false)
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const router = useRouter()

  const notifications = [
    { id: 1, icon: '🛍️', text: 'Your order #4821 has been shipped!', time: '2m ago', unread: true },
    { id: 2, icon: '💰', text: 'Flash sale! Up to 60% off today only.', time: '1h ago', unread: true },
    { id: 3, icon: '✅', text: 'Payment confirmed for order #4820.', time: '3h ago', unread: false },
    { id: 4, icon: '⭐', text: 'Rate your recent purchase from TechStore.', time: '1d ago', unread: false },
  ]

  const handleClick =()=>{
    setMoreOpen(false)
    router.replace('/seller/information')
  }


  return (
    <nav
      className="w-full sticky top-0 z-50"
      style={{ background: '#fff', boxShadow: '0 2px 16px rgba(233,30,140,0.10)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-4 h-18" style={{ height: '68px' }}>

        {/* Logo + Brand */}
        <a href="/" className="flex items-center gap-2 shrink-0 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-base shadow-sm transition-transform duration-150 group-hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)' }}
          >
            S
          </div>
          <span
            className="font-extrabold text-xl tracking-tight hidden sm:block"
            style={{ color: '#e91e8c' }}
          >
            ShopHub
          </span>
        </a>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-2 sm:mx-4">
          <div className="relative group">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-150"
              style={{ color: '#d1d5db' }}
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search products, brands & more…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-10 py-2 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 outline-none transition-all duration-150 bg-gray-50"
              onFocus={e => {
                e.currentTarget.style.borderColor = '#e91e8c'
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(233,30,140,0.10)'
                e.currentTarget.style.background = '#fff'
              }}
              onBlur={e => {
                e.currentTarget.style.borderColor = '#e5e7eb'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.background = '#f9fafb'
              }}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-pink-400 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 shrink-0">

          {/* Login Button */}
          {!islogin 
          ? (
            <button
            onClick={()=>router.push('/auth/login')}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all duration-150 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)',
              boxShadow: '0 3px 10px rgba(233,30,140,0.30)',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 5px 16px rgba(233,30,140,0.45)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 3px 10px rgba(233,30,140,0.30)' }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Login
          </button>
          )
          :(
            <ProfileDropdown/>
          )}
          

          {/* More Dropdown */}
          <div className="relative" ref={moreRef}>
            <button
              onClick={() => { setMoreOpen(v => !v); setNotifOpen(false) }}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${moreOpen ? 'text-pink-500 bg-pink-50' : 'text-gray-500 hover:text-pink-500 hover:bg-pink-50'}`}
            >
              More
              <svg
                width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                className="transition-transform duration-200"
                style={{ transform: moreOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {moreOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl py-2 z-50 overflow-hidden"
                style={{ boxShadow: '0 12px 40px rgba(233,30,140,0.14)', border: '1px solid rgba(233,30,140,0.08)' }}
              >
                {/* Become a Seller */}
                <button
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-100 group"
                  onClick={handleClick}
                >
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-100 group-hover:bg-pink-100"
                    style={{ background: 'rgba(233,30,140,0.07)' }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                      stroke="#e91e8c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </span>
                  <div className="text-left">
                    <p className="font-semibold text-[13px]">Become a Seller</p>
                    <p className="text-xs text-gray-400">Start selling on ShopHub</p>
                  </div>
                </button>

                <div className="mx-4 h-px bg-gray-100" />

                {/* 24x7 Customer Support */}
                <button
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-100 group"
                  onClick={() => setMoreOpen(false)}
                >
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-100 group-hover:bg-pink-100"
                    style={{ background: 'rgba(233,30,140,0.07)' }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                      stroke="#e91e8c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 1.2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9A16 16 0 0 0 15 16.09l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </span>
                  <div className="text-left">
                    <p className="font-semibold text-[13px]">24×7 Customer Support</p>
                    <p className="text-xs text-gray-400">We're always here to help</p>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Bell / Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => { setNotifOpen(v => !v); setMoreOpen(false) }}
              className={`relative w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-150 ${notifOpen ? 'bg-pink-50 text-pink-500' : 'text-gray-400 hover:bg-pink-50 hover:text-pink-500'}`}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              {notificationCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center text-white rounded-full font-black"
                  style={{ background: '#e91e8c', fontSize: '9px' }}
                >
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl overflow-hidden z-50"
                style={{ boxShadow: '0 12px 40px rgba(233,30,140,0.14)', border: '1px solid rgba(233,30,140,0.08)' }}
              >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <span className="font-black text-sm text-gray-800">Notifications</span>
                  <button className="text-xs font-semibold transition-colors" style={{ color: '#e91e8c' }}>
                    Mark all read
                  </button>
                </div>

                {/* Items */}
                <div className="flex flex-col">
                  {notifications.map(n => (
                    <button
                      key={n.id}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-pink-50 transition-colors duration-100 text-left"
                    >
                      <span className="text-lg shrink-0 mt-0.5">{n.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className={`text-[13px] leading-snug ${n.unread ? 'font-semibold text-gray-800' : 'text-gray-500'}`}>
                          {n.text}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                      </div>
                      {n.unread && (
                        <span
                          className="w-2 h-2 rounded-full shrink-0 mt-1.5"
                          style={{ background: '#e91e8c' }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-4 py-2.5 border-t border-gray-100">
                  <button
                    className="w-full text-xs font-bold py-1.5 rounded-lg transition-colors hover:bg-pink-50"
                    style={{ color: '#e91e8c' }}
                  >
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Cart */}
          <button
            onClick={onCartClick}
            className="relative w-11 h-11 flex items-center justify-center rounded-xl text-gray-400 hover:bg-pink-50 hover:text-pink-500 transition-all duration-150"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center text-white rounded-full font-black"
                style={{ background: '#e91e8c', fontSize: '9px' }}
              >
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>

        </div>
      </div>
    </nav>
  )
}