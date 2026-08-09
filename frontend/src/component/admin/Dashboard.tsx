'use client'
import { useState } from 'react'

const STATS = [
  { label: 'Total Revenue', value: '$124,830', delta: '+12.4%', up: true, sub: 'vs last month' },
  { label: 'Orders', value: '3,847', delta: '+8.1%', up: true, sub: 'vs last month' },
  { label: 'Customers', value: '21,409', delta: '+5.7%', up: true, sub: 'vs last month' },
  { label: 'Avg. Order Value', value: '$32.44', delta: '-2.3%', up: false, sub: 'vs last month' },
]

const MINI_BARS = [40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88]

const RECENT_ORDERS = [
  { id: '#ORD-7821', customer: 'Priya Nair', product: 'Wireless Earbuds Pro', amount: '$89.99', status: 'delivered', date: 'Aug 8' },
  { id: '#ORD-7820', customer: 'Marcus Webb', product: 'Standing Desk Kit', amount: '$349.00', status: 'shipped', date: 'Aug 8' },
  { id: '#ORD-7819', customer: 'Sofia Reyes', product: 'Mechanical Keyboard', amount: '$129.00', status: 'processing', date: 'Aug 7' },
  { id: '#ORD-7818', customer: 'James Okafor', product: 'USB-C Hub 7-in-1', amount: '$44.50', status: 'delivered', date: 'Aug 7' },
  { id: '#ORD-7817', customer: 'Nadia Kovács', product: 'Monitor Light Bar', amount: '$58.00', status: 'pending', date: 'Aug 6' },
]

const TOP_PRODUCTS = [
  { name: 'Wireless Earbuds Pro', sales: 842, revenue: '$75,736', pct: 88 },
  { name: 'Mechanical Keyboard', sales: 631, revenue: '$81,399', pct: 72 },
  { name: 'USB-C Hub 7-in-1', sales: 519, revenue: '$23,096', pct: 58 },
  { name: 'Standing Desk Kit', sales: 214, revenue: '$74,686', pct: 40 },
]

const STATUS_CLASS: Record<string, string> = {
  delivered: 'badge-success',
  shipped: 'badge-info',
  processing: 'badge-warning',
  pending: 'badge-danger',
}

export default function Dashboard() {
  const [chartPeriod, setChartPeriod] = useState<'7d' | '30d' | '90d'>('30d')

  const chartData = {
    '7d': [30, 45, 38, 60, 52, 70, 65],
    '30d': MINI_BARS,
    '90d': [55, 70, 48, 82, 63, 91, 74, 88, 66, 94, 78, 85, 72, 90, 68, 96, 80, 88, 74, 92],
  }[chartPeriod]

  const maxBar = Math.max(...chartData)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        {STATS.map((s) => (
          <div key={s.label} className="stat-card card-glow" style={{ padding: '20px 22px' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#8b7eb8', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
              {s.label}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: '#f0eaff', lineHeight: 1.1, marginBottom: 8 }}>
              {s.value}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: s.up ? '#34d399' : '#f87171' }}>
                {s.up ? '↑' : '↓'} {s.delta}
              </span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#6b5fa0' }}>{s.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Top products */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16 }}>
        {/* Revenue chart */}
        <div className="card" style={{ padding: '22px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, color: '#e2d9f3' }}>Revenue Overview</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#6b5fa0', marginTop: 2 }}>Total earnings over time</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
              {(['7d', '30d', '90d'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setChartPeriod(p)}
                  style={{
                    background: chartPeriod === p ? 'rgba(109,40,217,0.4)' : 'transparent',
                    border: '1px solid ' + (chartPeriod === p ? 'rgba(167,139,250,0.4)' : 'rgba(139,92,246,0.15)'),
                    color: chartPeriod === p ? '#c4b5fd' : '#6b5fa0',
                    borderRadius: 6, padding: '4px 10px',
                    fontFamily: 'var(--font-mono)', fontSize: 11,
                    cursor: 'pointer',
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          {/* Bar chart */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 140 }}>
            {chartData.map((v, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }}>
                <div
                  className="mini-bar"
                  style={{
                    width: '100%', borderRadius: 4,
                    height: `${(v / maxBar) * 100}%`,
                    opacity: i === chartData.length - 1 ? 1 : 0.6,
                    transition: 'height 0.3s ease',
                  }}
                />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#6b5fa0' }}>
              {chartPeriod === '7d' ? 'Mon' : 'Start'}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#6b5fa0' }}>Today</span>
          </div>
        </div>

        {/* Top products */}
        <div className="card" style={{ padding: '22px 24px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, color: '#e2d9f3', marginBottom: 4 }}>Top Products</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#6b5fa0', marginBottom: 20 }}>By revenue this month</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {TOP_PRODUCTS.map((p) => (
              <div key={p.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#c4b5fd', fontWeight: 500 }}>{p.name}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#8b7eb8' }}>{p.sales} sold</span>
                </div>
                <div style={{ height: 4, background: 'rgba(139,92,246,0.12)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${p.pct}%`, background: 'linear-gradient(90deg, #7c3aed, #4338ca)', borderRadius: 2 }} />
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#6b5fa0', marginTop: 4 }}>{p.revenue}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="card" style={{ padding: '22px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 24px', marginBottom: 16 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, color: '#e2d9f3' }}>Recent Orders</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#6b5fa0', marginTop: 2 }}>Latest 5 transactions</div>
          </div>
          <button className="btn-primary" style={{ marginLeft: 'auto' }}>View All</button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(139,92,246,0.12)' }}>
              {['Order', 'Customer', 'Product', 'Amount', 'Status', 'Date'].map((h) => (
                <th key={h} style={{ padding: '8px 24px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 11, color: '#6b5fa0', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RECENT_ORDERS.map((o) => (
              <tr key={o.id} className="table-row" style={{ borderBottom: '1px solid rgba(139,92,246,0.06)' }}>
                <td style={{ padding: '13px 24px', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#a78bfa' }}>{o.id}</td>
                <td style={{ padding: '13px 24px', fontFamily: 'var(--font-body)', fontSize: 13, color: '#e2d9f3' }}>{o.customer}</td>
                <td style={{ padding: '13px 24px', fontFamily: 'var(--font-body)', fontSize: 13, color: '#8b7eb8' }}>{o.product}</td>
                <td style={{ padding: '13px 24px', fontFamily: 'var(--font-mono)', fontSize: 13, color: '#c4b5fd', fontWeight: 500 }}>{o.amount}</td>
                <td style={{ padding: '13px 24px' }}>
                  <span className={`pill ${STATUS_CLASS[o.status]}`}>{o.status}</span>
                </td>
                <td style={{ padding: '13px 24px', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#6b5fa0' }}>{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
