'use client'
import {
  LayoutDashboard, ShoppingBag, Package, BarChart2, Wallet,
  Store, Bell, Settings, LogOut, ChevronLeft, ChevronRight,
  Star,
} from 'lucide-react'
import type { NavItem } from './SellerDashboard'
import { notifications } from './data'

interface Props {
  active: NavItem
  setActive: (n: NavItem) => void
  open: boolean
  setOpen: (v: boolean) => void
  onLogout: () => void
}

const NAV: { id: NavItem; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  { id: 'payouts', label: 'Payouts', icon: Wallet },
]

export default function Sidebar({ active, setActive, open, setOpen, onLogout }: Props) {
  return (
    <aside
      className="flex flex-col shrink-0 transition-all duration-300 relative"
      style={{
        width: open ? 220 : 68,
        background: 'linear-gradient(180deg, #1a0533 0%, #2d0a5e 100%)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full flex items-center justify-center z-10 transition-colors"
        style={{ background: '#7c3aed', border: '2px solid #f8f5ff' }}
      >
        {open ? <ChevronLeft className="w-3 h-3 text-white" /> : <ChevronRight className="w-3 h-3 text-white" />}
      </button>

      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(135deg, #e91e8c, #7c3aed)' }}
        >
          <Store className="w-5 h-5 text-white" />
        </div>
        {open && (
          <div className="overflow-hidden">
            <div className="text-white font-black text-base leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>ShopHub</div>
            <div className="text-xs font-bold tracking-widest uppercase" style={{ color: '#a855f7', letterSpacing: '0.15em' }}>Seller</div>
          </div>
        )}
      </div>

      {/* Seller profile */}
      {open && (
        <div className="mx-3 mt-4 mb-2 rounded-xl p-3 flex items-center gap-3" style={{ background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.2)' }}>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0"
            style={{ background: 'linear-gradient(135deg, #e91e8c, #a855f7)' }}
          >
            PS
          </div>
          <div className="overflow-hidden">
            <div className="text-white text-xs font-bold truncate">Priya Sharma</div>
            <div className="flex items-center gap-1 mt-0.5">
              <Star className="w-2.5 h-2.5" style={{ color: '#fbbf24', fill: '#fbbf24' }} />
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>4.9 · Top Seller</span>
            </div>
          </div>
        </div>
      )}
      {!open && (
        <div className="flex justify-center mt-4 mb-2">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm"
            style={{ background: 'linear-gradient(135deg, #e91e8c, #a855f7)' }}
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
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left"
              style={{
                background: isActive ? 'rgba(124,58,237,0.35)' : 'transparent',
                color: isActive ? '#fff' : 'rgba(255,255,255,0.45)',
                borderLeft: isActive ? '3px solid #a855f7' : '3px solid transparent',
              }}
              title={!open ? label : undefined}
            >
              <Icon className="w-4.5 h-4.5 shrink-0" style={{ width: 18, height: 18 }} />
              {open && <span className="text-sm font-semibold">{label}</span>}
            </button>
          )
        })}
      </nav>

      {/* Notifications badge */}
      {open && (
        <div className="mx-3 mb-3 rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Bell className="w-3.5 h-3.5" style={{ color: '#a855f7' }} />
              <span className="text-xs font-bold" style={{ color: 'rgba(255,255,255,0.6)' }}>Notifications</span>
            </div>
            <span className="w-4 h-4 rounded-full flex items-center justify-center text-white text-xs font-black" style={{ background: '#e91e8c', fontSize: 9 }}>{notifications.length}</span>
          </div>
          {notifications.slice(0, 2).map((n, i) => (
            <div key={i} className="text-xs py-1" style={{ color: 'rgba(255,255,255,0.38)', lineHeight: 1.4 }}>
              {n.msg.length > 38 ? n.msg.slice(0, 38) + '…' : n.msg}
            </div>
          ))}
        </div>
      )}

      {/* Bottom actions */}
      <div className="flex flex-col gap-1 px-2 pb-4 border-t pt-3" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
        <button
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          <Settings style={{ width: 18, height: 18, flexShrink: 0 }} />
          {open && <span className="text-sm font-medium">Settings</span>}
        </button>
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all hover:bg-red-500/10"
          style={{ color: 'rgba(255,100,100,0.6)' }}
        >
          <LogOut style={{ width: 18, height: 18, flexShrink: 0 }} />
          {open && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  )
}
