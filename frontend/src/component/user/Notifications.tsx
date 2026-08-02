'use client'
import { useState } from 'react'

const INIT = [
  { id: 1, type: 'order', icon: '📦', title: 'Order Shipped!', body: 'Your Pearl Stud Earrings are on their way. Expected by Aug 3.', time: '2h ago', read: false },
  { id: 2, type: 'promo', icon: '💸', title: 'Flash Sale — 40% Off', body: 'Ends tonight at midnight! Shop your saved items before they sell out.', time: '5h ago', read: false },
  { id: 3, type: 'order', icon: '✅', title: 'Order Delivered', body: 'Floral Midi Dress has been successfully delivered to your address.', time: 'Yesterday', read: true },
  { id: 4, type: 'review', icon: '⭐', title: 'Share Your Experience', body: 'How did you like the Silk Kurti Set? Leave a review and earn 50 coins.', time: '2 days ago', read: true },
  { id: 5, type: 'promo', icon: '🎁', title: 'Birthday Treat!', body: 'Happy Birthday Priya! Enjoy ₹200 off on your next order, valid till Aug 10.', time: '3 days ago', read: true },
  { id: 6, type: 'wishlist', icon: '🔖', title: 'Price Drop Alert', body: 'Rose Quartz Face Roller in your wishlist is now 30% cheaper!', time: '4 days ago', read: true },
]

const typeLabels: Record<string, string> = { order: 'Order', promo: 'Promotion', review: 'Review', wishlist: 'Wishlist' }
const typeColors: Record<string, string> = {
  order: '#1d4ed8', promo: '#be185d', review: '#92400e', wishlist: '#15803d',
}
const typeBg: Record<string, string> = {
  order: '#eff6ff', promo: '#fdf2f8', review: '#fefce8', wishlist: '#f0fdf4',
}

export default function Notifications() {
  const [items, setItems] = useState(INIT)
  const [filter, setFilter] = useState('All')

  const unread = items.filter((n) => !n.read).length
  const tabs = ['All', 'Unread', 'Orders', 'Promotions']

  const filtered = items.filter((n) => {
    if (filter === 'Unread') return !n.read
    if (filter === 'Orders') return n.type === 'order'
    if (filter === 'Promotions') return n.type === 'promo'
    return true
  })

  const markAll = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })))
  const markOne = (id: number) => setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  const remove = (id: number) => setItems((prev) => prev.filter((n) => n.id !== id))

  return (
    <div className="h-full flex flex-col" style={{ background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)' }}>
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-8 py-5 flex-shrink-0"
        style={{ background: '#fff', borderBottom: '1px solid #fbcfe8', boxShadow: '0 1px 8px rgba(190,24,93,0.05)' }}
      >
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-900 text-pink-900" style={{ fontFamily: 'Outfit, sans-serif' }}>Notifications</h1>
            <p className="text-sm font-500 mt-0.5" style={{ color: '#f472b6' }}>{unread} unread</p>
          </div>
          {unread > 0 && (
            <span
              className="text-xs font-800 w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #be185d, #ec4899)', color: '#fff', fontFamily: 'Outfit, sans-serif' }}
            >
              {unread}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {unread > 0 && (
            <button
              onClick={markAll}
              className="text-sm font-600 transition-colors cursor-pointer"
              style={{ color: '#db2777', fontFamily: 'Outfit, sans-serif' }}
            >
              Mark all as read
            </button>
          )}
          {/* Filter tabs */}
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: '#fdf2f8', border: '1px solid #fbcfe8' }}>
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className="px-3 py-1.5 rounded-lg text-xs font-600 transition-all duration-200 cursor-pointer"
                style={
                  filter === t
                    ? { background: 'linear-gradient(135deg, #be185d, #ec4899)', color: '#fff', fontFamily: 'Outfit, sans-serif' }
                    : { color: '#be185d', fontFamily: 'Outfit, sans-serif' }
                }
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="flex flex-col gap-3 max-w-3xl mx-auto">
          {filtered.map((n) => (
            <div
              key={n.id}
              onClick={() => markOne(n.id)}
              className="rounded-2xl p-5 flex items-start gap-4 cursor-pointer group transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: n.read ? '#fff' : 'linear-gradient(135deg, #fdf2f8, #fce7f3)',
                border: `1.5px solid ${n.read ? '#fbcfe8' : '#f9a8d4'}`,
                boxShadow: n.read ? '0 1px 8px rgba(190,24,93,0.04)' : '0 2px 16px rgba(190,24,93,0.1)',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(190,24,93,0.12)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.boxShadow = n.read ? '0 1px 8px rgba(190,24,93,0.04)' : '0 2px 16px rgba(190,24,93,0.1)')}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: n.read ? '#fdf2f8' : 'linear-gradient(135deg, #fbcfe8, #f9a8d4)' }}
              >
                {n.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-xs font-700 px-2 py-0.5 rounded-md"
                    style={{ background: typeBg[n.type], color: typeColors[n.type], fontFamily: 'Outfit, sans-serif' }}
                  >
                    {typeLabels[n.type]}
                  </span>
                  {!n.read && (
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#ec4899' }} />
                  )}
                  <span className="ml-auto text-xs font-500 flex-shrink-0" style={{ color: '#f9a8d4' }}>{n.time}</span>
                </div>
                <p className="font-700 text-pink-900 text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>{n.title}</p>
                <p className="text-xs mt-1 font-400 leading-relaxed" style={{ color: '#db2777', opacity: 0.7 }}>{n.body}</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); remove(n.id) }}
                className="w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 flex-shrink-0"
                style={{ color: '#f9a8d4' }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLButtonElement).style.background = '#fdf2f8'
                  ;(e.currentTarget as HTMLButtonElement).style.color = '#be185d'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                  ;(e.currentTarget as HTMLButtonElement).style.color = '#f9a8d4'
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔔</div>
              <p className="font-700 text-pink-300" style={{ fontFamily: 'Outfit, sans-serif' }}>No notifications here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
