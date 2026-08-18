const PINK = '#e91e8c'

function Bone({ width = '100%', height = 16, radius = 8, style = {} }: {
  width?: number | string
  height?: number | string
  radius?: number
  style?: React.CSSProperties
}) {
  return (
    <div
      className="skeleton-bone"
      style={{
        width,
        height,
        borderRadius: radius,
        background: 'linear-gradient(90deg, #f3e0ed 0%, #fce8f3 40%, #f3e0ed 80%)',
        backgroundSize: '300% 100%',
        flexShrink: 0,
        ...style,
      }}
    />
  )
}

function SidebarSection({ rows = 4, hasHeader = true }: { rows?: number; hasHeader?: boolean }) {
  return (
    <div style={{ marginBottom: 22 }}>
      {hasHeader && <Bone width={80} height={13} style={{ marginBottom: 12 }} />}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Bone width={14} height={14} radius={3} />
            <Bone width={`${55 + (i % 3) * 15}%`} height={12} />
          </div>
        ))}
      </div>
    </div>
  )
}

function ProductCardSkeleton() {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 14,
        overflow: 'hidden',
        border: '1.5px solid #f3e0ed',
        boxShadow: '0 2px 12px rgba(233,30,140,0.05)',
      }}
    >
      {/* Image area */}
      <Bone width="100%" height={190} radius={0} />
      <div style={{ padding: '14px 14px 16px' }}>
        {/* Brand badge */}
        <Bone width={60} height={11} style={{ marginBottom: 8 }} />
        {/* Title */}
        <Bone width="90%" height={14} style={{ marginBottom: 6 }} />
        <Bone width="65%" height={14} style={{ marginBottom: 12 }} />
        {/* Rating row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <Bone width={52} height={20} radius={4} />
          <Bone width={44} height={12} />
        </div>
        {/* Price row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <Bone width={68} height={18} />
          <Bone width={48} height={13} />
          <Bone width={36} height={13} />
        </div>
        {/* Badge row */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
          <Bone width={80} height={20} radius={20} />
          <Bone width={72} height={20} radius={20} />
        </div>
        {/* Button */}
        <Bone width="100%" height={36} radius={10} />
      </div>
    </div>
  )
}

export default function SearchProductSkeleton() {
  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 100% 0 }
          100% { background-position: -100% 0 }
        }
        .skeleton-bone {
          animation: shimmer 1.6s ease-in-out infinite;
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#fdf0f8', fontFamily: 'Inter, sans-serif' }}>
        {/* Header skeleton */}
        <div
          style={{
            background: `linear-gradient(135deg, ${PINK} 0%, #c2185b 100%)`,
            padding: '14px 0',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            boxShadow: '0 3px 16px rgba(233,30,140,0.25)',
          }}
        >
          <div
            style={{
              maxWidth: 1320,
              margin: '0 auto',
              padding: '0 28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Bone width={32} height={32} radius={10} style={{ background: 'rgba(255,255,255,0.35)', backgroundSize: '300% 100%' }} />
              <Bone width={100} height={22} radius={6} style={{ background: 'rgba(255,255,255,0.35)', backgroundSize: '300% 100%' }} />
            </div>

            {/* Search bar */}
            <Bone
              width={420}
              height={38}
              radius={8}
              style={{ background: 'rgba(255,255,255,0.25)', backgroundSize: '300% 100%' }}
            />

            {/* Nav links */}
            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
              {[60, 36, 64].map((w, i) => (
                <Bone key={i} width={w} height={13} radius={4} style={{ background: 'rgba(255,255,255,0.35)', backgroundSize: '300% 100%' }} />
              ))}
            </div>
          </div>
        </div>

        {/* Body */}
        <div
          style={{
            maxWidth: 1320,
            margin: '0 auto',
            padding: '20px 28px',
            display: 'grid',
            gridTemplateColumns: '220px 1fr',
            gap: 20,
            alignItems: 'start',
          }}
        >
          {/* Sidebar skeleton */}
          <aside
            style={{
              background: '#fff',
              borderRadius: 14,
              padding: 18,
              position: 'sticky',
              top: 76,
              border: '1.5px solid #f3e0ed',
              boxShadow: '0 2px 12px rgba(233,30,140,0.06)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 16,
                paddingBottom: 12,
                borderBottom: '1.5px solid #f3e0ed',
              }}
            >
              <Bone width={60} height={15} radius={5} />
            </div>
            <SidebarSection rows={5} />
            <SidebarSection rows={4} />
            <SidebarSection rows={3} />
            <SidebarSection rows={4} />
            <SidebarSection rows={2} />
          </aside>

          {/* Main skeleton */}
          <main>
            {/* Product grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 14,
              }}
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
