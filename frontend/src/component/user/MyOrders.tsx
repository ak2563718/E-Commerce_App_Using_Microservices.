'use client'
import { useState } from 'react'

const ORDERS = [
  { id: '#ORD-8821', item: 'Floral Midi Dress', category: 'Fashion', date: 'Jul 28, 2026', status: 'Delivered', price: 2499, qty: 1, img: '👗' },
  { id: '#ORD-8754', item: 'Pearl Stud Earrings', category: 'Jewellery', date: 'Jul 20, 2026', status: 'Shipped', price: 899, qty: 2, img: '💎' },
  { id: '#ORD-8690', item: 'Rose Gold Watch', category: 'Accessories', date: 'Jul 12, 2026', status: 'Processing', price: 5999, qty: 1, img: '⌚' },
  { id: '#ORD-8601', item: 'Silk Kurti Set', category: 'Fashion', date: 'Jun 30, 2026', status: 'Delivered', price: 1799, qty: 1, img: '👘' },
  { id: '#ORD-8540', item: 'Moisturiser SPF 50', category: 'Beauty', date: 'Jun 18, 2026', status: 'Delivered', price: 649, qty: 3, img: '🧴' },
  { id: '#ORD-8499', item: 'Boho Tote Bag', category: 'Bags', date: 'Jun 5, 2026', status: 'Cancelled', price: 1299, qty: 1, img: '👜' },
]

const statusStyles: Record<string, { bg: string; color: string; dot: string }> = {
  Delivered: { bg: '#f0fdf4', color: '#15803d', dot: '#22c55e' },
  Shipped:   { bg: '#eff6ff', color: '#1d4ed8', dot: '#3b82f6' },
  Processing:{ bg: '#fefce8', color: '#a16207', dot: '#eab308' },
  Cancelled: { bg: '#fff1f2', color: '#be123c', dot: '#fb7185' },
}

const filters = ['All', 'Delivered', 'Shipped', 'Processing', 'Cancelled']

export default function MyOrders() {
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? ORDERS : ORDERS.filter((o) => o.status === filter)

  return (
    <div className="h-full flex flex-col" style={{ background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)' }}>
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-8 py-5 flex-shrink-0"
        style={{ background: '#fff', borderBottom: '1px solid #fbcfe8', boxShadow: '0 1px 8px rgba(190,24,93,0.05)' }}
      >
        <div>
          <h1 className="text-2xl font-900 text-pink-900" style={{ fontFamily: 'Outfit, sans-serif' }}>My Orders</h1>
          <p className="text-sm font-500 mt-0.5" style={{ color: '#f472b6' }}>
            {ORDERS.length} orders · {ORDERS.filter((o) => o.status === 'Delivered').length} delivered
          </p>
        </div>
        {/* Filter tabs */}
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: '#fdf2f8', border: '1px solid #fbcfe8' }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-3 py-1.5 rounded-lg text-xs font-600 transition-all duration-200 cursor-pointer"
              style={
                filter === f
                  ? { background: 'linear-gradient(135deg, #be185d, #ec4899)', color: '#fff', fontFamily: 'Outfit, sans-serif' }
                  : { color: '#be185d', fontFamily: 'Outfit, sans-serif' }
              }
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="flex-shrink-0 px-8 pt-6 pb-2">
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Total Spent', val: '₹13,144', icon: '💳' },
            { label: 'Orders Placed', val: '6', icon: '📦' },
            { label: 'Delivered', val: '4', icon: '✅' },
            { label: 'Pending', val: '1', icon: '🕐' },
          ].map(({ label, val, icon }) => (
            <div
              key={label}
              className="rounded-2xl p-5 flex items-center gap-4"
              style={{ background: '#fff', border: '1px solid #fbcfe8', boxShadow: '0 2px 12px rgba(190,24,93,0.06)' }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #fce7f3, #fbcfe8)' }}
              >
                {icon}
              </div>
              <div>
                <div className="text-xl font-900 text-pink-900" style={{ fontFamily: 'Outfit, sans-serif' }}>{val}</div>
                <div className="text-xs font-500 mt-0.5" style={{ color: '#f472b6' }}>{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-8 py-4">
        <div className="flex flex-col gap-3">
          {filtered.map((o) => {
            const s = statusStyles[o.status]
            return (
              <div
                key={o.id}
                className="rounded-2xl p-5 flex items-center gap-5 group transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                style={{ background: '#fff', border: '1px solid #fbcfe8', boxShadow: '0 1px 8px rgba(190,24,93,0.05)' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(190,24,93,0.12)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 8px rgba(190,24,93,0.05)')}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #fdf2f8, #fbcfe8)' }}
                >
                  {o.img}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-700 text-pink-900 text-sm truncate" style={{ fontFamily: 'Outfit, sans-serif' }}>{o.item}</p>
                  <p className="text-xs mt-0.5 font-500" style={{ color: '#f9a8d4' }}>{o.id} · {o.category} · Qty {o.qty}</p>
                </div>
                <div className="text-right flex-shrink-0 mr-2">
                  <p className="font-800 text-pink-900 text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>₹{o.price.toLocaleString('en-IN')}</p>
                  <p className="text-xs mt-0.5 font-400" style={{ color: '#f9a8d4' }}>{o.date}</p>
                </div>
                <span
                  className="flex items-center gap-1.5 text-xs font-700 px-3 py-1.5 rounded-full flex-shrink-0"
                  style={{ background: s.bg, color: s.color, fontFamily: 'Outfit, sans-serif' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.dot }} />
                  {o.status}
                </span>
                <button
                  className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-600 transition-all duration-200 flex-shrink-0"
                  style={{ background: '#fdf2f8', color: '#be185d', border: '1px solid #fbcfe8' }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  Track
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
