const MONTHLY = [
  { month: 'Jan', revenue: 68000, orders: 2100 },
  { month: 'Feb', revenue: 72000, orders: 2340 },
  { month: 'Mar', revenue: 85000, orders: 2780 },
  { month: 'Apr', revenue: 78000, orders: 2550 },
  { month: 'May', revenue: 92000, orders: 3010 },
  { month: 'Jun', revenue: 110000, orders: 3580 },
  { month: 'Jul', revenue: 105000, orders: 3420 },
  { month: 'Aug', revenue: 124830, orders: 3847 },
]

const CHANNELS = [
  { name: 'Organic Search', value: 38, color: '#7c3aed' },
  { name: 'Direct', value: 24, color: '#4338ca' },
  { name: 'Social Media', value: 21, color: '#a78bfa' },
  { name: 'Email', value: 11, color: '#c4b5fd' },
  { name: 'Referral', value: 6, color: '#312e81' },
]

const maxRev = Math.max(...MONTHLY.map((m) => m.revenue))

export default function Analytics() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Monthly revenue */}
      <div className="card" style={{ padding: '24px' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, color: '#e2d9f3', marginBottom: 4 }}>Monthly Revenue</div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#6b5fa0', marginBottom: 24 }}>Jan – Aug 2026</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 180 }}>
          {MONTHLY.map((m) => (
            <div key={m.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#8b7eb8' }}>
                ${(m.revenue / 1000).toFixed(0)}k
              </div>
              <div
                className="mini-bar"
                style={{
                  width: '100%', borderRadius: '4px 4px 0 0',
                  height: `${(m.revenue / maxRev) * 100}%`,
                  opacity: m.month === 'Aug' ? 1 : 0.55,
                }}
              />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#6b5fa0' }}>{m.month}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Traffic channels */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, color: '#e2d9f3', marginBottom: 4 }}>Traffic Channels</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#6b5fa0', marginBottom: 24 }}>Conversion sources this month</div>

          {/* Donut visual (CSS-based) */}
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <div style={{ position: 'relative', width: 120, height: 120, flexShrink: 0 }}>
              <svg viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
                {(() => {
                  let offset = 0
                  const r = 48
                  const circ = 2 * Math.PI * r
                  return CHANNELS.map((ch) => {
                    const dash = (ch.value / 100) * circ
                    const el = (
                      <circle
                        key={ch.name}
                        cx="60" cy="60" r={r}
                        fill="none"
                        stroke={ch.color}
                        strokeWidth="18"
                        strokeDasharray={`${dash} ${circ - dash}`}
                        strokeDashoffset={-offset}
                      />
                    )
                    offset += dash
                    return el
                  })
                })()}
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: '#f0eaff' }}>100</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#6b5fa0' }}>%</div>
              </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {CHANNELS.map((ch) => (
                <div key={ch.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: ch.color, flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#8b7eb8', flex: 1 }}>{ch.name}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#c4b5fd', fontWeight: 600 }}>{ch.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Orders trend */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, color: '#e2d9f3', marginBottom: 4 }}>Order Volume</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#6b5fa0', marginBottom: 24 }}>Monthly order count</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {MONTHLY.map((m) => {
              const maxO = Math.max(...MONTHLY.map((x) => x.orders))
              return (
                <div key={m.month} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#6b5fa0', width: 26, flexShrink: 0 }}>{m.month}</div>
                  <div style={{ flex: 1, height: 6, background: 'rgba(139,92,246,0.1)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${(m.orders / maxO) * 100}%`,
                      background: m.month === 'Aug' ? 'linear-gradient(90deg,#a78bfa,#7c3aed)' : 'linear-gradient(90deg,#4338ca,#312e81)',
                      borderRadius: 3,
                    }} />
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#8b7eb8', width: 40, textAlign: 'right', flexShrink: 0 }}>
                    {m.orders.toLocaleString()}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
