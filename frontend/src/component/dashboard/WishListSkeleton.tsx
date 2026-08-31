const PINK = '#e91e8c'

function Shimmer({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={className}
      style={{
        background: 'linear-gradient(90deg, #f3e0ed 25%, #fce8f4 50%, #f3e0ed 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.6s infinite',
        borderRadius: '6px',
        ...style,
      }}
    />
  )
}

function GridCardSkeleton() {
  return (
    <div style={{
      background: '#fff',
      borderRadius: '16px',
      border: '1.5px solid #f3e0ed',
      overflow: 'hidden',
    }}>
      {/* Image area */}
      <Shimmer style={{ height: '180px', borderRadius: 0 }} />

      <div style={{ padding: '14px' }}>
        {/* Brand + badge */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
          <Shimmer style={{ width: '60px', height: '10px' }} />
          <Shimmer style={{ width: '40px', height: '10px' }} />
        </div>

        {/* Product name */}
        <Shimmer style={{ width: '100%', height: '13px', marginBottom: '5px' }} />
        <Shimmer style={{ width: '70%', height: '13px', marginBottom: '10px' }} />

        {/* Stars */}
        <Shimmer style={{ width: '90px', height: '10px', marginBottom: '10px' }} />

        {/* Price row */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline', marginBottom: '14px' }}>
          <Shimmer style={{ width: '64px', height: '18px' }} />
          <Shimmer style={{ width: '44px', height: '11px' }} />
          <Shimmer style={{ width: '36px', height: '11px' }} />
        </div>

        {/* CTA */}
        <Shimmer style={{ width: '100%', height: '36px', borderRadius: '10px', marginBottom: '8px' }} />

        {/* Secondary buttons */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <Shimmer style={{ flex: 1, height: '30px', borderRadius: '8px' }} />
          <Shimmer style={{ flex: 1, height: '30px', borderRadius: '8px' }} />
        </div>
      </div>
    </div>
  )
}

function ListRowSkeleton() {
  return (
    <div style={{
      background: '#fff',
      borderRadius: '16px',
      border: '1.5px solid #f3e0ed',
      display: 'flex',
      gap: '16px',
      padding: '16px 20px',
      alignItems: 'center',
    }}>
      {/* Thumbnail */}
      <Shimmer style={{ width: '100px', height: '100px', borderRadius: '12px', flexShrink: 0 }} />

      {/* Details */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
          <Shimmer style={{ width: '56px', height: '10px' }} />
          <Shimmer style={{ width: '36px', height: '10px' }} />
        </div>
        <Shimmer style={{ width: '60%', height: '14px', marginBottom: '8px' }} />
        <Shimmer style={{ width: '90px', height: '10px', marginBottom: '8px' }} />
        <div style={{ display: 'flex', gap: '8px' }}>
          <Shimmer style={{ width: '64px', height: '18px' }} />
          <Shimmer style={{ width: '44px', height: '11px' }} />
          <Shimmer style={{ width: '36px', height: '11px' }} />
        </div>
      </div>

      {/* Action column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0, width: '110px' }}>
        <Shimmer style={{ width: '100%', height: '36px', borderRadius: '9px' }} />
        <div style={{ display: 'flex', gap: '6px' }}>
          <Shimmer style={{ flex: 1, height: '30px', borderRadius: '8px' }} />
          <Shimmer style={{ flex: 1, height: '30px', borderRadius: '8px' }} />
        </div>
        <Shimmer style={{ width: '72px', height: '9px', margin: '0 auto' }} />
      </div>
    </div>
  )
}

export default function WishlistSkeleton({ viewMode = 'grid' }: { viewMode?: 'grid' | 'list' }) {
  return (
    <div style={{ minHeight: '100vh', background: '#fdf0f8', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${PINK} 0%, #c2006e 100%)`,
        padding: '14px 0',
        boxShadow: '0 3px 16px rgba(233,30,140,0.25)',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'rgba(255,255,255,0.25)', borderRadius: '10px', width: '32px', height: '32px' }} />
            <div style={{ width: '96px', height: '20px', background: 'rgba(255,255,255,0.3)', borderRadius: '5px' }} />
          </div>

          {/* Nav */}
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            {[52, 60, 36].map((w, i) => (
              <div key={i} style={{ width: w, height: '12px', background: 'rgba(255,255,255,0.25)', borderRadius: '4px' }} />
            ))}
            <div style={{ width: '96px', height: '30px', background: 'rgba(255,255,255,0.2)', borderRadius: '8px' }} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 28px 48px' }}>
        {/* Page header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{ width: '22px', height: '20px', background: '#f3e0ed', borderRadius: '4px' }} />
              <Shimmer style={{ width: '140px', height: '24px' }} />
            </div>
            <Shimmer style={{ width: '100px', height: '12px' }} />
          </div>

          {/* Stats pills */}
          <div style={{ display: 'flex', gap: '10px' }}>
            {['80px', '100px', '70px'].map((w, i) => (
              <div key={i} style={{ background: '#fff', border: '1.5px solid #f3e0ed', borderRadius: '12px', padding: '10px 16px', textAlign: 'center', minWidth: '72px' }}>
                <Shimmer style={{ width: w, height: '18px', marginBottom: '4px' }} />
                <Shimmer style={{ width: '48px', height: '9px', margin: '0 auto' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Toolbar */}
        <div style={{
          background: '#fff',
          borderRadius: '14px',
          border: '1.5px solid #f3e0ed',
          padding: '12px 18px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          flexWrap: 'wrap',
        }}>
          {/* Filter pills */}
          <div style={{ display: 'flex', gap: '6px', flex: 1, flexWrap: 'wrap' }}>
            {[48, 36, 64, 56, 52, 44].map((w, i) => (
              <Shimmer key={i} style={{ width: w, height: '28px', borderRadius: '20px' }} />
            ))}
          </div>

          {/* Sort select */}
          <Shimmer style={{ width: '112px', height: '32px', borderRadius: '8px' }} />

          {/* View toggle */}
          <Shimmer style={{ width: '64px', height: '32px', borderRadius: '8px' }} />

          {/* Select button */}
          <Shimmer style={{ width: '60px', height: '32px', borderRadius: '8px' }} />
        </div>

        {/* Cards */}
        {viewMode === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
            {Array.from({ length: 8 }).map((_, i) => <GridCardSkeleton key={i} />)}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {Array.from({ length: 5 }).map((_, i) => <ListRowSkeleton key={i} />)}
          </div>
        )}
      </div>
    </div>
  )
}
