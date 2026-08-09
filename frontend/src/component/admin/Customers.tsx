const CUSTOMERS = [
  { name: 'Priya Nair', email: 'priya@email.com', orders: 12, spent: '$1,087', joined: 'Jan 2025', tier: 'Gold', avatar: 'PN' },
  { name: 'Marcus Webb', email: 'marcus@email.com', orders: 7, spent: '$2,441', joined: 'Mar 2025', tier: 'Platinum', avatar: 'MW' },
  { name: 'Sofia Reyes', email: 'sofia@email.com', orders: 4, spent: '$516', joined: 'Jun 2025', tier: 'Silver', avatar: 'SR' },
  { name: 'James Okafor', email: 'james@email.com', orders: 19, spent: '$845', joined: 'Dec 2024', tier: 'Gold', avatar: 'JO' },
  { name: 'Nadia Kovács', email: 'nadia@email.com', orders: 2, spent: '$116', joined: 'Jul 2026', tier: 'Bronze', avatar: 'NK' },
  { name: 'Chen Zhao', email: 'chen@email.com', orders: 8, spent: '$599', joined: 'Feb 2025', tier: 'Silver', avatar: 'CZ' },
  { name: 'Isabella Müller', email: 'isabella@email.com', orders: 23, spent: '$5,047', joined: 'Oct 2024', tier: 'Platinum', avatar: 'IM' },
  { name: 'Raj Patel', email: 'raj@email.com', orders: 5, spent: '$325', joined: 'May 2026', tier: 'Bronze', avatar: 'RP' },
]

const TIER: Record<string, { cls: string; color: string }> = {
  Platinum: { cls: 'badge-info', color: '#a78bfa' },
  Gold: { cls: 'badge-warning', color: '#fbbf24' },
  Silver: { cls: '', color: '#9ca3af' },
  Bronze: { cls: '', color: '#d97706' },
}

const AVATAR_COLORS = [
  'linear-gradient(135deg,#7c3aed,#2563eb)',
  'linear-gradient(135deg,#059669,#0891b2)',
  'linear-gradient(135deg,#dc2626,#9333ea)',
  'linear-gradient(135deg,#d97706,#7c3aed)',
]

export default function Customers() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {CUSTOMERS.map((c, i) => (
          <div key={c.email} className="card card-glow" style={{ padding: '18px 20px', display: 'flex', gap: 14, cursor: 'pointer', alignItems: 'flex-start' }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
              background: AVATAR_COLORS[i % AVATAR_COLORS.length],
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700, color: 'white', fontFamily: 'var(--font-display)',
            }}>
              {c.avatar}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600, color: '#e2d9f3' }}>{c.name}</span>
                <span
                  className="pill"
                  style={{
                    background: 'rgba(139,92,246,0.1)',
                    color: TIER[c.tier].color,
                    border: `1px solid ${TIER[c.tier].color}33`,
                  }}
                >
                  {c.tier}
                </span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#6b5fa0', marginBottom: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {c.email}
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: '#c4b5fd' }}>{c.orders}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#6b5fa0' }}>orders</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: '#c4b5fd' }}>{c.spent}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#6b5fa0' }}>total spent</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: '#8b7eb8' }}>{c.joined}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#6b5fa0' }}>joined</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
