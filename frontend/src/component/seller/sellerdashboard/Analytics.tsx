'use client'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  CartesianGrid, Legend,
} from 'recharts'
import { revenueData, categoryData } from './data'

const weeklyData = [
  { day: 'Mon', orders: 87, returns: 4 },
  { day: 'Tue', orders: 102, returns: 7 },
  { day: 'Wed', orders: 94, returns: 3 },
  { day: 'Thu', orders: 138, returns: 9 },
  { day: 'Fri', orders: 165, returns: 11 },
  { day: 'Sat', orders: 201, returns: 14 },
  { day: 'Sun', orders: 178, returns: 8 },
]

const conversionData = [
  { month: 'Feb', visitors: 18400, conversions: 312 },
  { month: 'Mar', visitors: 24100, conversions: 401 },
  { month: 'Apr', visitors: 21800, conversions: 367 },
  { month: 'May', visitors: 29600, conversions: 512 },
  { month: 'Jun', visitors: 31200, conversions: 548 },
  { month: 'Jul', visitors: 38900, conversions: 683 },
]

const METRICS = [
  { label: 'Conversion Rate', value: '1.76%', change: '+0.12%', up: true },
  { label: 'Avg. Session Duration', value: '3m 42s', change: '+18s', up: true },
  { label: 'Return Rate', value: '4.2%', change: '-0.8%', up: true },
  { label: 'Repeat Customers', value: '38%', change: '+5%', up: true },
]

const tooltipStyle = { fontSize: 12, borderRadius: 10, border: '1px solid #e9d5ff', background: '#fff' }

export default function Analytics() {
  return (
    <div className="p-6 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>Analytics</h1>
        <p className="text-sm text-gray-500 mt-0.5">Deep dive into your store performance</p>
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {METRICS.map(({ label, value, change, up }) => (
          <div key={label} className="rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #f0ebff', boxShadow: '0 1px 8px rgba(124,58,237,0.06)' }}>
            <p className="text-xs text-gray-400 font-semibold mb-2">{label}</p>
            <p className="text-xl font-black text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>{value}</p>
            <p className="text-xs font-bold mt-1" style={{ color: up ? '#16a34a' : '#dc2626' }}>{change} vs last month</p>
          </div>
        ))}
      </div>

      {/* Revenue trend */}
      <div className="rounded-2xl p-5 overflow-hidden" style={{ background: '#fff', border: '1px solid #f0ebff', boxShadow: '0 1px 8px rgba(124,58,237,0.06)' }}>
        <h2 className="font-black text-gray-800 text-base mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>Revenue Trend</h2>
        <p className="text-xs text-gray-400 mb-5">6-month cumulative performance</p>
        <AreaChart width={760} height={200} data={revenueData} margin={{ top: 0, right: 4, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="rev2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.18} />
              <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="ord2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#e91e8c" stopOpacity={0.14} />
              <stop offset="95%" stopColor="#e91e8c" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3e8ff" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis yAxisId="left" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
          <Area yAxisId="left" type="monotone" dataKey="revenue" name="Revenue (₹)" stroke="#7c3aed" strokeWidth={2.5} fill="url(#rev2)" dot={false} />
          <Area yAxisId="right" type="monotone" dataKey="orders" name="Orders" stroke="#e91e8c" strokeWidth={2} fill="url(#ord2)" dot={false} />
        </AreaChart>
      </div>

      {/* Two charts row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl p-5 overflow-hidden" style={{ background: '#fff', border: '1px solid #f0ebff', boxShadow: '0 1px 8px rgba(124,58,237,0.06)' }}>
          <h2 className="font-black text-gray-800 text-base mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>Weekly Orders vs Returns</h2>
          <p className="text-xs text-gray-400 mb-5">This week</p>
          <BarChart width={360} height={180} data={weeklyData} margin={{ top: 0, right: 4, left: -20, bottom: 0 }} barGap={3}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3e8ff" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="orders" name="Orders" fill="#7c3aed" radius={[4, 4, 0, 0]} />
            <Bar dataKey="returns" name="Returns" fill="#f472b6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </div>

        <div className="rounded-2xl p-5 overflow-hidden" style={{ background: '#fff', border: '1px solid #f0ebff', boxShadow: '0 1px 8px rgba(124,58,237,0.06)' }}>
          <h2 className="font-black text-gray-800 text-base mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>Visitors vs Conversions</h2>
          <p className="text-xs text-gray-400 mb-5">6-month store traffic</p>
          <BarChart width={360} height={180} data={conversionData} margin={{ top: 0, right: 4, left: -20, bottom: 0 }} barGap={3}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3e8ff" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="visitors" name="Visitors" fill="#ede9fe" radius={[4, 4, 0, 0]} />
            <Bar dataKey="conversions" name="Conversions" fill="#7c3aed" radius={[4, 4, 0, 0]} />
          </BarChart>
        </div>
      </div>

      {/* Category breakdown */}
      <div className="rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #f0ebff', boxShadow: '0 1px 8px rgba(124,58,237,0.06)' }}>
        <h2 className="font-black text-gray-800 text-base mb-5" style={{ fontFamily: 'Outfit, sans-serif' }}>Sales by Category</h2>
        <div className="flex flex-col gap-4">
          {categoryData.map(({ name, value, color }) => (
            <div key={name}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-gray-700">{name}</span>
                <span className="text-sm font-bold text-gray-800">{value}%</span>
              </div>
              <div className="h-2 rounded-full" style={{ background: '#f3e8ff' }}>
                <div className="h-2 rounded-full transition-all" style={{ width: `${value}%`, background: color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
