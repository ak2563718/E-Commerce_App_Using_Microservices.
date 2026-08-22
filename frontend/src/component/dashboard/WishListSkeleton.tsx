'use client'
const PINK = '#e91e8c'
const PINK_DARK = '#c2185b'
const PINK_LIGHT = '#fce4f3'
function Bone({ w, h, r = 6, style = {} }: { w: string | number; h: string | number; r?: number; style?: React.CSSProperties }) {
  return (
    <div
      className="shimmer"
      style={{ width: w, height: h, borderRadius: r, flexShrink: 0, ...style }}
    />
  )
}

/* ── Header skeleton ── */
function HeaderSkeleton() {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${PINK} 0%, ${PINK_DARK} 100%)`,
      padding: '14px 0',
      boxShadow: '0 3px 16px rgba(233,30,140,0.25)',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo area */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(255,255,255,0.3)' }} />
          <div style={{ width: '100px', height: '22px', borderRadius: '6px', background: 'rgba(255,255,255,0.3)' }} />
        </div>
        {/* Nav links */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          {[60, 68, 52].map((w, i) => (
            <div key={i} style={{ width: w, height: '14px', borderRadius: '4px', background: 'rgba(255,255,255,0.25)' }} />
          ))}
          <div style={{ width: '100px', height: '30px', borderRadius: '8px', background: 'rgba(255,255,255,0.2)' }} />
        </div>
      </div>
    </div>
  )
}

/* ── Page title + stats skeleton ── */
function TitleSkeleton() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Bone w={22} h={20} r={4} />
          <Bone w={160} h={28} r={8} />
        </div>
        <Bone w={200} h={14} r={4} />
      </div>
      {/* Stat pills */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{
            background: '#fff', border: '1.5px solid #f3e0ed',
            borderRadius: '12px', padding: '10px 20px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
          }}>
            <Bone w={48} h={22} r={5} />
            <Bone w={56} h={10} r={3} />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Toolbar skeleton ── */
function ToolbarSkeleton() {
  return (
    <div style={{
      background: '#fff', borderRadius: '14px', border: '1.5px solid #f3e0ed',
      padding: '12px 18px', marginBottom: '16px',
      display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap',
    }}>
      {/* Category pills */}
      <div style={{ display: 'flex', gap: '6px', flex: 1, flexWrap: 'wrap' }}>
        {[48, 100, 110, 96].map((w, i) => (
          <Bone key={i} w={w} h={30} r={20} />
        ))}
      </div>
      {/* Sort + view + select */}
      <Bone w={140} h={30} r={8} />
      <Bone w={64} h={30} r={8} />
      <Bone w={64} h={30} r={8} />
    </div>
  )
}

/* ── Single grid card skeleton ── */
function CardSkeleton() {
  return (
    <div style={{
      background: '#fff', borderRadius: '16px',
      border: '1.5px solid #f3e0ed', overflow: 'hidden',
    }}>
      {/* Image area */}
      <div style={{ height: '200px', background: '#fdf4fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Bone w={140} h={140} r={10} />
      </div>

      {/* Info */}
      <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Brand */}
        <Bone w={60} h={11} r={3} />
        {/* Name — two lines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <Bone w="100%" h={13} r={4} />
          <Bone w="75%" h={13} r={4} />
        </div>
        {/* Rating + assured */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Bone w={42} h={20} r={4} />
          <Bone w={70} h={12} r={3} />
          <Bone w={64} h={12} r={3} />
        </div>
        {/* Price row */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
          <Bone w={80} h={20} r={5} />
          <Bone w={56} h={13} r={3} />
          <Bone w={48} h={13} r={3} />
        </div>
        {/* Delivery */}
        <Bone w={90} h={12} r={3} />
        {/* Date */}
        <Bone w={110} h={10} r={3} />
        {/* Buttons */}
        <div style={{ display: 'flex', gap: '6px', marginTop: '2px' }}>
          <Bone w="calc(100% - 42px)" h={36} r={9} />
          <Bone w={36} h={36} r={9} />
        </div>
      </div>
    </div>
  )
}

/* ── Single list row skeleton ── */
function ListRowSkeleton() {
  return (
    <div style={{
      background: '#fff', borderRadius: '16px', border: '1.5px solid #f3e0ed',
      display: 'flex', gap: '16px', padding: '16px 20px', alignItems: 'center',
    }}>
      {/* Thumbnail */}
      <Bone w={100} h={100} r={12} />

      {/* Text */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <Bone w={48} h={11} r={3} />
          <Bone w={64} h={11} r={20} />
        </div>
        <Bone w="80%" h={14} r={4} />
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Bone w={42} h={20} r={4} />
          <Bone w={72} h={12} r={3} />
          <Bone w={60} h={12} r={3} />
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
          <Bone w={80} h={20} r={5} />
          <Bone w={52} h={13} r={3} />
          <Bone w={48} h={13} r={3} />
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0, width: '120px' }}>
        <Bone w="100%" h={36} r={9} />
        <div style={{ display: 'flex', gap: '6px' }}>
          <Bone w="48%" h={30} r={8} />
          <Bone w="48%" h={30} r={8} />
        </div>
        <Bone w="70%" h={10} r={3} style={{ alignSelf: 'center' }} />
      </div>
    </div>
  )
}

/* ── Full skeleton layout ── */
export default function WishlistSkeleton({ view }: { view: 'grid' | 'list' }) {
  return (
    <div style={{ minHeight: '100vh', background: '#fdf0f8', fontFamily: 'Inter, sans-serif' }}>
      <HeaderSkeleton />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 28px 48px' }}>
        <TitleSkeleton />
        <ToolbarSkeleton />

        {view === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
            {Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
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