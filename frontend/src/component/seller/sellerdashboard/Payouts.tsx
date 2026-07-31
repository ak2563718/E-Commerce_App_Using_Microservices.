'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { Wallet, ArrowDownToLine, Clock, CheckCircle2, AlertCircle } from 'lucide-react'

const payoutHistory = [
  { id: 'PAY-2251', amount: 42500, date: 'Jul 28, 2025', status: 'completed', method: 'NEFT · HDFC ••4421' },
  { id: 'PAY-2239', amount: 38100, date: 'Jul 21, 2025', status: 'completed', method: 'NEFT · HDFC ••4421' },
  { id: 'PAY-2224', amount: 51200, date: 'Jul 14, 2025', status: 'completed', method: 'NEFT · HDFC ••4421' },
  { id: 'PAY-2210', amount: 29800, date: 'Jul 7, 2025', status: 'completed', method: 'NEFT · HDFC ••4421' },
  { id: 'PAY-2195', amount: 47600, date: 'Jun 30, 2025', status: 'completed', method: 'NEFT · HDFC ••4421' },
]

const monthlyPayouts = [
  { month: 'Feb', amount: 38200 },
  { month: 'Mar', amount: 49100 },
  { month: 'Apr', amount: 44800 },
  { month: 'May', amount: 61400 },
  { month: 'Jun', amount: 67200 },
  { month: 'Jul', amount: 89300 },
]

const KPI = [
  { label: 'Available Balance', value: '₹18,340', icon: Wallet, color: '#7c3aed', bg: '#f3e8ff' },
  { label: 'Pending Clearance', value: '₹24,700', icon: Clock, color: '#ca8a04', bg: '#fef9c3' },
  { label: 'Total Paid Out', value: '₹3,50,200', icon: CheckCircle2, color: '#16a34a', bg: '#dcfce7' },
  { label: 'On Hold', value: '₹2,100', icon: AlertCircle, color: '#dc2626', bg: '#fee2e2' },
]

export default function Payouts() {
  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>Payouts</h1>
          <p className="text-sm text-gray-500 mt-0.5">Next payout on Aug 4, 2025 · Weekly schedule</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>
          <ArrowDownToLine className="w-4 h-4" /> Request Payout
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {KPI.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="rounded-2xl p-5 flex flex-col gap-3" style={{ background: '#fff', border: '1px solid #f0ebff', boxShadow: '0 1px 8px rgba(124,58,237,0.06)' }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: bg }}>
              <Icon style={{ width: 18, height: 18, color }} />
            </div>
            <div>
              <div className="text-xl font-black text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>{value}</div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Payout chart */}
      <div className="rounded-2xl p-5 overflow-hidden" style={{ background: '#fff', border: '1px solid #f0ebff', boxShadow: '0 1px 8px rgba(124,58,237,0.06)' }}>
        <h2 className="font-black text-gray-800 text-base mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>Monthly Payouts</h2>
        <p className="text-xs text-gray-400 mb-5">Last 6 months</p>
        <BarChart width={760} height={200} data={monthlyPayouts} margin={{ top: 0, right: 4, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3e8ff" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
          <Tooltip formatter={(v: number) => [`₹${v.toLocaleString('en-IN')}`, 'Payout']} contentStyle={{ fontSize: 12, borderRadius: 10, border: '1px solid #e9d5ff', background: '#fff' }} />
          <Bar dataKey="amount" fill="#7c3aed" radius={[6, 6, 0, 0]} />
        </BarChart>
      </div>

      {/* Bank account */}
      <div className="rounded-2xl p-5 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #1a0533, #2d0a5e)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div>
          <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Linked Bank Account</p>
          <p className="text-white font-bold">HDFC Bank — Savings Account</p>
          <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>•••• •••• •••• 4421 · IFSC: HDFC0001234</p>
        </div>
        <button className="px-4 py-2 rounded-xl text-xs font-bold" style={{ background: 'rgba(168,85,247,0.25)', color: '#c084fc', border: '1px solid rgba(168,85,247,0.3)' }}>
          Change
        </button>
      </div>

      {/* Payout history */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #f0ebff', boxShadow: '0 1px 8px rgba(124,58,237,0.06)' }}>
        <div className="px-5 py-4 border-b" style={{ borderColor: '#f0ebff' }}>
          <h2 className="font-black text-gray-800 text-base" style={{ fontFamily: 'Outfit, sans-serif' }}>Payout History</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid #f0ebff', background: '#faf5ff' }}>
              {['Transaction ID', 'Amount', 'Method', 'Date', 'Status'].map(h => (
                <th key={h} className="text-left px-5 py-3 text-xs font-bold text-gray-400 tracking-wider uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payoutHistory.map((p, i) => (
              <tr key={p.id} className="hover:bg-purple-50/30 transition-colors" style={{ borderBottom: i < payoutHistory.length - 1 ? '1px solid #faf5ff' : 'none' }}>
                <td className="px-5 py-3.5 text-sm font-bold text-purple-700">{p.id}</td>
                <td className="px-5 py-3.5 text-sm font-black text-gray-800">₹{p.amount.toLocaleString('en-IN')}</td>
                <td className="px-5 py-3.5 text-sm text-gray-500">{p.method}</td>
                <td className="px-5 py-3.5 text-xs text-gray-400 font-medium">{p.date}</td>
                <td className="px-5 py-3.5">
                  <span className="flex items-center gap-1.5 text-xs font-bold" style={{ color: '#16a34a' }}>
                    <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
