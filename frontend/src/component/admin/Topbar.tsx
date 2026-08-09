import type { Page } from './AdminPage'

const TITLES: Record<Page, string> = {
  dashboard: 'Dashboard',
  orders: 'Orders',
  products: 'Products',
  customers: 'Customers',
  analytics: 'Analytics',
}

export default function Topbar({ page }: { page: Page }) {
  return (
    <div className="topbar-gradient" style={{ height: 56, display: 'flex', alignItems: 'center', padding: '0 24px', gap: 16, flexShrink: 0 }}>
      <div style={{ flex: 1 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, color: '#f0eaff', margin: 0 }}>
          {TITLES[page]}
        </h1>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" style={{ position: 'absolute', left: 10, color: '#6b5fa0' }}>
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
          <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <input
          type="text"
          placeholder="Search..."
          style={{
            background: 'rgba(139,92,246,0.08)',
            border: '1px solid rgba(139,92,246,0.18)',
            borderRadius: 8,
            padding: '6px 12px 6px 30px',
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            color: '#c4b5fd',
            outline: 'none',
            width: 200,
          }}
        />
      </div>

      {/* Notif */}
      <button style={{
        background: 'rgba(139,92,246,0.1)',
        border: '1px solid rgba(139,92,246,0.18)',
        borderRadius: 8, padding: '6px 8px',
        cursor: 'pointer', color: '#8b7eb8', position: 'relative', display: 'flex',
      }}>
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span style={{ position: 'absolute', top: 5, right: 5, width: 6, height: 6, borderRadius: '50%', background: '#a78bfa' }} />
      </button>

      {/* Date */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#6b5fa0' }}>
        {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
      </div>
    </div>
  )
}
