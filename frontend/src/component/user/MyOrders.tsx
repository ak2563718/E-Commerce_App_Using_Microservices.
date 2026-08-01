'use client'
import { useState } from 'react'
import { Package, ChevronDown, ChevronUp, RotateCcw, Star } from 'lucide-react'
import { ORDERS } from './userData'

const STATUS: Record<string, { bg: string; color: string; label: string }> = {
  delivered: { bg: '#dcfce7', color: '#16a34a', label: 'Delivered' },
  shipped: { bg: '#dbeafe', color: '#2563eb', label: 'Shipped' },
  processing: { bg: '#fef9c3', color: '#ca8a04', label: 'Processing' },
  cancelled: { bg: '#fee2e2', color: '#dc2626', label: 'Cancelled' },
}

export default function MyOrders() {
  const [expanded, setExpanded] = useState<string | null>(ORDERS[0].id)

  return (
    <div className="max-w-2xl flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>My Orders</h1>
        <p className="text-sm text-gray-500 mt-0.5">{ORDERS.length} orders placed</p>
      </div>

      <div className="flex flex-col gap-4">
        {ORDERS.map(order => {
          const s = STATUS[order.status]
          const open = expanded === order.id
          return (
            <div
              key={order.id}
              className="rounded-2xl overflow-hidden transition-all"
              style={{ background: '#fff', border: '1px solid #f0ebff', boxShadow: '0 2px 8px rgba(124,58,237,0.05)' }}
            >
              {/* Header row */}
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                onClick={() => setExpanded(open ? null : order.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#f3e8ff' }}>
                    <Package className="w-4 h-4" style={{ color: '#7c3aed' }} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-purple-700">{order.id}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{order.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: s.bg, color: s.color }}>{s.label}</span>
                  <span className="text-sm font-black text-gray-800">₹{order.total.toLocaleString('en-IN')}</span>
                  {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </div>
              </button>

              {/* Expanded items */}
              {open && (
                <div className="px-5 pb-5 border-t flex flex-col gap-4 pt-4" style={{ borderColor: '#f3e8ff' }}>
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ background: '#f3e8ff' }}>
                        {item.img}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">Qty: {item.qty}</p>
                      </div>
                      <p className="text-sm font-bold text-gray-800 shrink-0">₹{item.price.toLocaleString('en-IN')}</p>
                    </div>
                  ))}

                  <div className="flex gap-2 pt-2 border-t" style={{ borderColor: '#f3e8ff' }}>
                    {order.status === 'delivered' && (
                      <>
                        <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all hover:bg-purple-50" style={{ border: '1px solid #e9d5ff', color: '#7c3aed' }}>
                          <RotateCcw className="w-3.5 h-3.5" /> Return
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all hover:bg-yellow-50" style={{ border: '1px solid #fde68a', color: '#ca8a04' }}>
                          <Star className="w-3.5 h-3.5" /> Rate Order
                        </button>
                      </>
                    )}
                    {order.status === 'shipped' && (
                      <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all" style={{ background: '#7c3aed', color: '#fff' }}>
                        Track Package
                      </button>
                    )}
                    {order.status === 'cancelled' && (
                      <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all hover:bg-purple-50" style={{ border: '1px solid #e9d5ff', color: '#7c3aed' }}>
                        Reorder
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
