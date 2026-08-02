'use client'
import { useState } from 'react'
import {
  User, ShoppingBag, Heart, Bell, LogOut,
  ChevronLeft, ChevronRight, Settings, Star, ShoppingCart,
} from 'lucide-react'
import type { NavItem } from './UserDashboard'

const NAV: { id: NavItem; label: string; icon: typeof User }[] = [
  { id: 'profile',       label: 'My Profile',     icon: User },
  { id: 'orders',        label: 'My Orders',       icon: ShoppingBag },
  { id: 'wishlist',      label: 'Wishlist',        icon: Heart },
  { id: 'notifications', label: 'Notifications',   icon: Bell },
]

const NOTIFS = [
  { msg: 'Your order #ORD-8754 has shipped!' },
  { msg: 'Flash sale — 40% off ends tonight.' },
  { msg: 'Price drop on your wishlist item.' },
]

interface Props {
  active: NavItem
  setActive: (n: NavItem) => void
}

export default function Sidebar({ active, setActive }: Props) {
  const [open, setOpen] = useState(true)
  const unread = NOTIFS.length

  return (
    <aside
      className="flex flex-col shrink-0 h-full relative transition-all duration-300"
      style={{
        width: open ? 228 : 68,
        background: 'linear-gradient(180deg, #4a0020 0%, #7f1d4a 40%, #9d174d 75%, #be185d 100%)',
        borderRight: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '4px 0 32px rgba(159,18,57,0.25)',
      }}
    >
      {/* Collapse toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full flex items-center justify-center z-10 transition-colors cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, #db2777, #ec4899)',
          border: '2px solid #fff',
          boxShadow: '0 2px 8px rgba(219,39,119,0.4)',
        }}
      >
        {open
          ? <ChevronLeft className="w-3 h-3 text-white" />
          : <ChevronRight className="w-3 h-3 text-white" />
        }
      </button>

      {/* Logo */}
      <div
        className="flex items-center gap-3 px-4 py-5 shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-lg"
          style={{ background: 'linear-gradient(135deg, #fb7185, #ec4899, #db2777)' }}
        >
          <ShoppingCart className="w-5 h-5 text-white" />
        </div>
        {open && (
          <div className="overflow-hidden">
            <div
              className="text-white font-black text-base leading-tight"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Blushop
            </div>
            <div
              className="text-xs font-700 tracking-widest uppercase"
              style={{ color: '#f9a8d4', letterSpacing: '0.15em', fontFamily: 'Outfit, sans-serif' }}
            >
              My Account
            </div>
          </div>
        )}
      </div>

      {/* Profile card */}
      {open ? (
        <div
          className="mx-3 mt-4 mb-2 rounded-xl p-3 flex items-center gap-3"
          style={{
            background: 'rgba(251,207,232,0.12)',
            border: '1px solid rgba(249,168,212,0.2)',
          }}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0"
            style={{ background: 'linear-gradient(135deg, #fb7185, #ec4899)' }}
          >
            PS
          </div>
          <div className="overflow-hidden">
            <div
              className="text-white text-xs font-700 truncate"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Priya Sharma
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <Star className="w-2.5 h-2.5" style={{ color: '#fbbf24', fill: '#fbbf24' }} />
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Outfit, sans-serif' }}>
                Premium Member
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-4 mb-2">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm"
            style={{ background: 'linear-gradient(135deg, #fb7185, #ec4899)' }}
          >
            PS
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-1 px-2 py-3">
        {NAV.map(({ id, label, icon: Icon }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              onClick={() => setActive(id)}
              title={!open ? label : undefined}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-left cursor-pointer w-full"
              style={{
                background: isActive ? 'rgba(251,207,232,0.18)' : 'transparent',
                color: isActive ? '#fff' : 'rgba(255,255,255,0.45)',
                borderLeft: isActive ? '3px solid #f9a8d4' : '3px solid transparent',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  ;(e.currentTarget as HTMLButtonElement).style.background = 'rgba(251,207,232,0.08)'
                  ;(e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.75)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                  ;(e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.45)'
                }
              }}
            >
              <Icon style={{ width: 18, height: 18, flexShrink: 0 }} />
              {open && (
                <span className="text-sm font-600" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {label}
                </span>
              )}
              {open && id === 'notifications' && unread > 0 && (
                <span
                  className="ml-auto w-5 h-5 rounded-full flex items-center justify-center text-white font-800"
                  style={{ background: 'linear-gradient(135deg, #fb7185, #ec4899)', fontSize: 9 }}
                >
                  {unread}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Notifications mini-panel */}
      {open && (
        <div
          className="mx-3 mb-3 rounded-xl p-3"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Bell className="w-3.5 h-3.5" style={{ color: '#f9a8d4' }} />
              <span
                className="text-xs font-700"
                style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Outfit, sans-serif' }}
              >
                Notifications
              </span>
            </div>
            <span
              className="w-4 h-4 rounded-full flex items-center justify-center text-white font-black"
              style={{ background: 'linear-gradient(135deg, #fb7185, #ec4899)', fontSize: 9 }}
            >
              {unread}
            </span>
          </div>
          {NOTIFS.slice(0, 2).map((n, i) => (
            <div
              key={i}
              className="text-xs py-1"
              style={{ color: 'rgba(255,255,255,0.38)', lineHeight: 1.4, fontFamily: 'Outfit, sans-serif' }}
            >
              {n.msg.length > 36 ? n.msg.slice(0, 36) + '…' : n.msg}
            </div>
          ))}
        </div>
      )}

      {/* Bottom actions */}
      <div
        className="flex flex-col gap-1 px-2 pb-4 pt-3 shrink-0"
        style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
      >
        <button
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer w-full"
          style={{ color: 'rgba(255,255,255,0.35)' }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.background = 'rgba(251,207,232,0.08)'
            ;(e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.65)'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
            ;(e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.35)'
          }}
        >
          <Settings style={{ width: 18, height: 18, flexShrink: 0 }} />
          {open && (
            <span className="text-sm font-500" style={{ fontFamily: 'Outfit, sans-serif' }}>Settings</span>
          )}
        </button>
        <button
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer w-full"
          style={{ color: 'rgba(251,113,133,0.6)' }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.background = 'rgba(251,113,133,0.12)'
            ;(e.currentTarget as HTMLButtonElement).style.color = '#fb7185'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
            ;(e.currentTarget as HTMLButtonElement).style.color = 'rgba(251,113,133,0.6)'
          }}
        >
          <LogOut style={{ width: 18, height: 18, flexShrink: 0 }} />
          {open && (
            <span className="text-sm font-500" style={{ fontFamily: 'Outfit, sans-serif' }}>Logout</span>
          )}
        </button>
      </div>
    </aside>
  )
}
