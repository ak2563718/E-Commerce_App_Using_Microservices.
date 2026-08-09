import { useState } from 'react'

const ALL_ORDERS = [
  { id: '#ORD-7821', customer: 'Priya Nair', product: 'Wireless Earbuds Pro', amount: '$89.99', status: 'delivered', date: 'Aug 8, 2026', items: 1 },
  { id: '#ORD-7820', customer: 'Marcus Webb', product: 'Standing Desk Kit', amount: '$349.00', status: 'shipped', date: 'Aug 8, 2026', items: 2 },
  { id: '#ORD-7819', customer: 'Sofia Reyes', product: 'Mechanical Keyboard', amount: '$129.00', status: 'processing', date: 'Aug 7, 2026', items: 1 },
  { id: '#ORD-7818', customer: 'James Okafor', product: 'USB-C Hub 7-in-1', amount: '$44.50', status: 'delivered', date: 'Aug 7, 2026', items: 3 },
  { id: '#ORD-7817', customer: 'Nadia Kovács', product: 'Monitor Light Bar', amount: '$58.00', status: 'pending', date: 'Aug 6, 2026', items: 1 },
  { id: '#ORD-7816', customer: 'Chen Zhao', product: 'Laptop Stand Aluminium', amount: '$74.99', status: 'shipped', date: 'Aug 6, 2026', items: 2 },
  { id: '#ORD-7815', customer: 'Isabella Müller', product: 'Noise-Cancelling Headset', amount: '$219.00', status: 'delivered', date: 'Aug 5, 2026', items: 1 },
  { id: '#ORD-7814', customer: 'Raj Patel', product: 'Ergonomic Mouse', amount: '$65.00', status: 'processing', date: 'Aug 5, 2026', items: 1 },
  { id: '#ORD-7813', customer: 'Amara Diallo', product: 'Portable SSD 1TB', amount: '$109.00', status: 'delivered', date: 'Aug 4, 2026', items: 1 },
  { id: '#ORD-7812', customer: 'Lucas Fontaine', product: 'Smart Webcam 4K', amount: '$149.00', status: 'pending', date: 'Aug 4, 2026', items: 1 },
]

const STATUS_CLASS: Record<string, string> = {
  delivered: 'badge-success',
  shipped: 'badge-info',
  processing: 'badge-warning',
  pending: 'badge-danger',
}

const FILTERS = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered']

export default function Orders() {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = ALL_ORDERS.filter((o) => {
    const matchFilter = filter === 'All' || o.status === filter.toLowerCase()
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.includes(search)
    return matchFilter && matchSearch
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Filters */}
        <div style={{ display: 'flex', gap: 6 }}>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                background: filter === f ? 'rgba(109,40,217,0.4)' : 'rgba(139,92,246,0.06)',
                border: '1px solid ' + (filter === f ? 'rgba(167,139,250,0.4)' : 'rgba(139,92,246,0.15)'),
                color: filter === f ? '#c4b5fd' : '#8b7eb8',
                borderRadius: 7, padding: '6px 14px',
                fontFamily: 'var(--font-body)', fontSize: 13,
                cursor: 'pointer',
              }}
            >
              {f}
            </button>
          ))}
        </div>
        <div style={{ marginLeft: 'auto', position: 'relative', display: 'flex', alignItems: 'center' }}>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" style={{ position: 'absolute', left: 10, color: '#6b5fa0' }}>
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders..."
            style={{
              background: 'rgba(139,92,246,0.08)',
              border: '1px solid rgba(139,92,246,0.18)',
              borderRadius: 8, padding: '7px 12px 7px 30px',
              fontFamily: 'var(--font-body)', fontSize: 13, color: '#c4b5fd', outline: 'none', width: 220,
            }}
          />
        </div>
      </div>

      <div className="card" style={{ padding: '0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(139,92,246,0.12)' }}>
              {['Order ID', 'Customer', 'Product', 'Items', 'Amount', 'Status', 'Date'].map((h) => (
                <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 11, color: '#6b5fa0', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id} className="table-row" style={{ borderBottom: '1px solid rgba(139,92,246,0.06)', cursor: 'pointer' }}>
                <td style={{ padding: '14px 20px', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#a78bfa' }}>{o.id}</td>
                <td style={{ padding: '14px 20px', fontFamily: 'var(--font-body)', fontSize: 13, color: '#e2d9f3', fontWeight: 500 }}>{o.customer}</td>
                <td style={{ padding: '14px 20px', fontFamily: 'var(--font-body)', fontSize: 13, color: '#8b7eb8' }}>{o.product}</td>
                <td style={{ padding: '14px 20px', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#8b7eb8' }}>{o.items}</td>
                <td style={{ padding: '14px 20px', fontFamily: 'var(--font-mono)', fontSize: 13, color: '#c4b5fd', fontWeight: 600 }}>{o.amount}</td>
                <td style={{ padding: '14px 20px' }}>
                  <span className={`pill ${STATUS_CLASS[o.status]}`}>{o.status}</span>
                </td>
                <td style={{ padding: '14px 20px', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#6b5fa0' }}>{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ padding: 40, textAlign: 'center', color: '#6b5fa0', fontFamily: 'var(--font-body)', fontSize: 14 }}>
            No orders match your filter.
          </div>
        )}
      </div>
    </div>
  )
}
