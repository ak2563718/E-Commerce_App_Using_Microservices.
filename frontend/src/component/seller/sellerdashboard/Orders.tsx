'use client'
import { useState } from 'react'
import { Search, Filter, Download } from 'lucide-react'
import { recentOrders } from './data'

const ALL_STATUSES = ['all', 'delivered', 'shipped', 'processing', 'cancelled']

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  delivered: { bg: '#dcfce7', color: '#16a34a', label: 'Delivered' },
  shipped: { bg: '#dbeafe', color: '#2563eb', label: 'Shipped' },
  processing: { bg: '#fef9c3', color: '#ca8a04', label: 'Processing' },
  cancelled: { bg: '#fee2e2', color: '#dc2626', label: 'Cancelled' },
}

// Extend with more mock orders
const ALL_ORDERS = [
  ...recentOrders,
  { id: '#ORD-8815', customer: 'Kiran Patel', product: 'Smart Watch Series 5', amount: 5999, status: 'shipped', date: 'Jul 28, 2025' },
  { id: '#ORD-8814', customer: 'Divya Menon', product: 'Wireless Earbuds Pro', amount: 2499, status: 'delivered', date: 'Jul 28, 2025' },
  { id: '#ORD-8813', customer: 'Aditya Kumar', product: 'USB-C Hub 7-in-1', amount: 2199, status: 'processing', date: 'Jul 27, 2025' },
  { id: '#ORD-8812', customer: 'Neha Gupta', product: 'Leather Crossbody Bag', amount: 1899, status: 'delivered', date: 'Jul 27, 2025' },
]

export default function Orders() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')

  const filtered = ALL_ORDERS.filter(o => {
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase())
    const matchStatus = status === 'all' || o.status === status
    return matchSearch && matchStatus
  })

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>Orders</h1>
          <p className="text-sm text-gray-500 mt-0.5">{ALL_ORDERS.length} total orders · {ALL_ORDERS.filter(o => o.status === 'processing').length} pending</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl flex-1 min-w-[220px]" style={{ background: '#fff', border: '1px solid #e9d5ff' }}>
          <Search className="w-4 h-4 text-gray-400" />
          <input
            className="flex-1 text-sm outline-none bg-transparent text-gray-700"
            placeholder="Search orders, customers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <div className="flex gap-1">
            {ALL_STATUSES.map(s => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all"
                style={
                  status === s
                    ? { background: '#7c3aed', color: '#fff' }
                    : { background: '#fff', color: '#6b7280', border: '1px solid #e9d5ff' }
                }
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #f0ebff', boxShadow: '0 1px 8px rgba(124,58,237,0.06)' }}>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid #f0ebff', background: '#faf5ff' }}>
              {['Order ID', 'Customer', 'Product', 'Amount', 'Status', 'Date', 'Action'].map(h => (
                <th key={h} className="text-left px-5 py-3 text-xs font-bold text-gray-400 tracking-wider uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center text-sm text-gray-400">No orders found</td>
              </tr>
            ) : filtered.map((order, i) => {
              const s = STATUS_STYLES[order.status]
              return (
                <tr key={order.id} className="transition-colors hover:bg-purple-50/30" style={{ borderBottom: i < filtered.length - 1 ? '1px solid #faf5ff' : 'none' }}>
                  <td className="px-5 py-3.5 text-sm font-bold text-purple-700">{order.id}</td>
                  <td className="px-5 py-3.5 text-sm font-medium text-gray-700">{order.customer}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-600">{order.product}</td>
                  <td className="px-5 py-3.5 text-sm font-bold text-gray-800">₹{order.amount.toLocaleString('en-IN')}</td>
                  <td className="px-5 py-3.5">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: s.bg, color: s.color }}>{s.label}</span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-gray-400 font-medium">{order.date}</td>
                  <td className="px-5 py-3.5">
                    <button className="text-xs font-bold px-2.5 py-1 rounded-lg hover:bg-purple-50 transition-colors" style={{ color: '#7c3aed' }}>View</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
