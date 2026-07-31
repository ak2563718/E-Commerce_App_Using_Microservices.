'use client'
import { TrendingUp, ShoppingBag, Package, IndianRupee, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts'
import { revenueData, categoryData, recentOrders, topProducts } from './data'

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  delivered: { bg: '#dcfce7', color: '#16a34a', label: 'Delivered' },
  shipped: { bg: '#dbeafe', color: '#2563eb', label: 'Shipped' },
  processing: { bg: '#fef9c3', color: '#ca8a04', label: 'Processing' },
  cancelled: { bg: '#fee2e2', color: '#dc2626', label: 'Cancelled' },
}

const KPI = [
  { label: 'Total Revenue', value: '₹3,72,400', change: '+18.4%', up: true, icon: IndianRupee, accent: '#7c3aed', bg: '#f3e8ff' },
  { label: 'Total Orders', value: '2,823', change: '+12.1%', up: true, icon: ShoppingBag, accent: '#2563eb', bg: '#dbeafe' },
  { label: 'Active Products', value: '148', change: '+4 this week', up: true, icon: Package, accent: '#16a34a', bg: '#dcfce7' },
  { label: 'Avg. Order Value', value: '₹1,319', change: '-2.3%', up: false, icon: TrendingUp, accent: '#e91e8c', bg: '#fce7f3' },
]

export default function Overview() {
  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Good morning, Priya 👋
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">Here's what's happening with your store today.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: '#f3e8ff', color: '#7c3aed' }}>
          <Clock className="w-3.5 h-3.5" />
          Jul 31, 2025
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {KPI.map(({ label, value, change, up, icon: Icon, accent, bg }) => (
          <div key={label} className="rounded-2xl p-5 flex flex-col gap-4" style={{ background: '#fff', border: '1px solid #f0ebff', boxShadow: '0 1px 8px rgba(124,58,237,0.06)' }}>
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                <Icon className="w-4.5 h-4.5" style={{ width: 18, height: 18, color: accent }} />
              </div>
              <span className="flex items-center gap-0.5 text-xs font-bold" style={{ color: up ? '#16a34a' : '#dc2626' }}>
                {up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {change}
              </span>
            </div>
            <div>
              <div className="text-xl font-black text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>{value}</div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Revenue chart */}
        <div className="col-span-2 rounded-2xl p-5 overflow-hidden" style={{ background: '#fff', border: '1px solid #f0ebff', boxShadow: '0 1px 8px rgba(124,58,237,0.06)' }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-black text-gray-800 text-base" style={{ fontFamily: 'Outfit, sans-serif' }}>Revenue Overview</h2>
              <p className="text-xs text-gray-400 mt-0.5">Last 6 months</p>
            </div>
            <span className="flex items-center gap-1.5 text-xs font-semibold">
              <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: '#7c3aed' }} />Revenue
            </span>
          </div>
          <AreaChart width={480} height={180} data={revenueData} margin={{ top: 0, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(v: number) => [`₹${v.toLocaleString('en-IN')}`, 'Revenue']} contentStyle={{ fontSize: 12, borderRadius: 10, border: '1px solid #e9d5ff', background: '#fff' }} />
            <Area type="monotone" dataKey="revenue" stroke="#7c3aed" strokeWidth={2.5} fill="url(#revenueGrad)" dot={{ r: 4, fill: '#7c3aed', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
          </AreaChart>
        </div>

        {/* Category pie */}
        <div className="rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #f0ebff', boxShadow: '0 1px 8px rgba(124,58,237,0.06)' }}>
          <h2 className="font-black text-gray-800 text-base mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>Sales by Category</h2>
          <p className="text-xs text-gray-400 mb-3">This month</p>
          <PieChart width={180} height={130}>
            <Pie data={categoryData} cx={90} cy={65} innerRadius={38} outerRadius={58} paddingAngle={3} dataKey="value">
              {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Pie>
            <Tooltip formatter={(v: number) => [`${v}%`, '']} contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e9d5ff' }} />
          </PieChart>
          <div className="flex flex-col gap-1.5 mt-1">
            {categoryData.map(({ name, value, color }) => (
              <div key={name} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full inline-block" style={{ background: color }} />
                  <span className="text-xs text-gray-600">{name}</span>
                </div>
                <span className="text-xs font-bold text-gray-800">{value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #f0ebff', boxShadow: '0 1px 8px rgba(124,58,237,0.06)' }}>
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: '#f0ebff' }}>
          <h2 className="font-black text-gray-800 text-base" style={{ fontFamily: 'Outfit, sans-serif' }}>Recent Orders</h2>
          <button className="text-xs font-bold px-3 py-1.5 rounded-lg transition-colors hover:bg-purple-50" style={{ color: '#7c3aed' }}>View all</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid #f9f5ff' }}>
                {['Order ID', 'Customer', 'Product', 'Amount', 'Status', 'Date'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-bold text-gray-400 tracking-wider uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, i) => {
                const s = STATUS_STYLES[order.status]
                return (
                  <tr key={order.id} className="transition-colors hover:bg-purple-50/30" style={{ borderBottom: i < recentOrders.length - 1 ? '1px solid #faf5ff' : 'none' }}>
                    <td className="px-5 py-3.5 text-sm font-bold text-purple-700">{order.id}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-700 font-medium">{order.customer}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-600">{order.product}</td>
                    <td className="px-5 py-3.5 text-sm font-bold text-gray-800">₹{order.amount.toLocaleString('en-IN')}</td>
                    <td className="px-5 py-3.5">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: s.bg, color: s.color }}>{s.label}</span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-gray-400 font-medium">{order.date}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Products */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #f0ebff', boxShadow: '0 1px 8px rgba(124,58,237,0.06)' }}>
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: '#f0ebff' }}>
          <h2 className="font-black text-gray-800 text-base" style={{ fontFamily: 'Outfit, sans-serif' }}>Top Products</h2>
          <button className="text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-purple-50 transition-colors" style={{ color: '#7c3aed' }}>Manage products</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid #f9f5ff' }}>
                {['Product', 'SKU', 'Stock', 'Units Sold', 'Revenue', 'Trend'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-bold text-gray-400 tracking-wider uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topProducts.map((p, i) => (
                <tr key={p.sku} className="transition-colors hover:bg-purple-50/30" style={{ borderBottom: i < topProducts.length - 1 ? '1px solid #faf5ff' : 'none' }}>
                  <td className="px-5 py-3.5 text-sm font-semibold text-gray-800">{p.name}</td>
                  <td className="px-5 py-3.5 text-xs text-gray-400 font-mono">{p.sku}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-bold" style={{ color: p.stock < 20 ? '#dc2626' : '#16a34a' }}>{p.stock}</span>
                    {p.stock < 20 && <span className="ml-1.5 text-xs text-red-500 font-semibold">Low</span>}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-700 font-medium">{p.sold.toLocaleString()}</td>
                  <td className="px-5 py-3.5 text-sm font-bold text-gray-800">₹{p.revenue.toLocaleString('en-IN')}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs font-bold" style={{ color: p.trend.startsWith('+') ? '#16a34a' : '#dc2626' }}>{p.trend}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
