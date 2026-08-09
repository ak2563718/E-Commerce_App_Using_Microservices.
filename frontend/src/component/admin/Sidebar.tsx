import type { Page } from './AdminPage'

const NAV = [
  {
    label: 'Dashboard',
    page: 'dashboard' as Page,
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
  },
  {
    label: 'Orders',
    page: 'orders' as Page,
    badge: 14,
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Products',
    page: 'products' as Page,
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Customers',
    page: 'customers' as Page,
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Analytics',
    page: 'analytics' as Page,
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
        <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
]

const BOTTOM_NAV = [
  {
    label: 'Settings',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
  },
]

interface SidebarProps {
  collapsed: boolean
  activePage: Page
  onNavigate: (p: Page) => void
  onToggle: () => void
  width: number
}

export default function Sidebar({ collapsed, activePage, onNavigate, onToggle, width }: SidebarProps) {
  const mini = width < 80

  return (
    <div className="sidebar-gradient" style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Logo */}
      <div style={{ padding: mini ? '20px 0' : '20px 16px', display: 'flex', alignItems: 'center', gap: 10, minHeight: 64, justifyContent: mini ? 'center' : undefined }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8, flexShrink: 0,
          background: 'linear-gradient(135deg, #7c3aed, #4338ca)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="white" opacity="0.9"/>
          </svg>
        </div>
        {!mini && (
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700 }} className="logo-gradient">
            Nexus
          </span>
        )}
        {!mini && (
          <button
            onClick={onToggle}
            style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: '#8b7eb8', padding: 4, borderRadius: 6, display: 'flex' }}
            title="Collapse sidebar"
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
        {mini && (
          <button
            onClick={onToggle}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8b7eb8', padding: 0, display: 'flex' }}
            title="Expand sidebar"
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: mini ? '8px 4px' : '8px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV.map((item) => {
          const active = activePage === item.page
          return (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`nav-item ${active ? 'active' : ''}`}
              title={mini ? item.label : undefined}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: mini ? '10px' : '9px 12px',
                background: 'none', border: 'none',
                color: active ? '#c4b5fd' : '#8b7eb8',
                width: '100%', textAlign: 'left',
                justifyContent: mini ? 'center' : undefined,
                borderLeft: active ? '2px solid #a78bfa' : '2px solid transparent',
              }}
            >
              <span style={{ flexShrink: 0, display: 'flex' }}>{item.icon}</span>
              {!mini && (
                <>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: active ? 600 : 400, flex: 1 }}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="pill badge-info">{item.badge}</span>
                  )}
                </>
              )}
            </button>
          )
        })}
      </nav>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(139,92,246,0.12)', margin: mini ? '0 6px' : '0 14px' }} />

      {/* Bottom nav */}
      <div style={{ padding: mini ? '8px 4px' : '8px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {BOTTOM_NAV.map((item) => (
          <button
            key={item.label}
            className="nav-item"
            title={mini ? item.label : undefined}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: mini ? '10px' : '9px 12px',
              background: 'none', border: 'none',
              color: '#8b7eb8', width: '100%', textAlign: 'left',
              justifyContent: mini ? 'center' : undefined,
            }}
          >
            <span style={{ display: 'flex' }}>{item.icon}</span>
            {!mini && <span style={{ fontFamily: 'var(--font-body)', fontSize: 13.5 }}>{item.label}</span>}
          </button>
        ))}

        {/* User avatar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: mini ? '10px' : '10px 12px',
          marginTop: 4,
          justifyContent: mini ? 'center' : undefined,
        }}>
          <div style={{
            width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 600, color: 'white',
          }}>
            AM
          </div>
          {!mini && (
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500, color: '#e2d9f3', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Alex Morgan
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#6b5fa0', marginTop: 1 }}>
                Admin
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
