const PINK = '#e91e8c';

function Bone({ w, h, radius = 6, style }: { w: string | number; h: string | number; radius?: number; style?: React.CSSProperties }) {
  return (
    <div
      className="skeleton-shine"
      style={{ width: w, height: h, borderRadius: radius, flexShrink: 0, ...style }}
    />
  );
}

function CartItemSkeleton() {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '14px',
        padding: '20px',
        border: '1.5px solid #f3e0ed',
        display: 'flex',
        gap: '20px',
        alignItems: 'flex-start',
      }}
    >
      {/* Product image */}
      <Bone w={110} h={110} radius={10} />

      {/* Info */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Bone w="70%" h={14} />
        <Bone w="45%" h={12} />

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
          <Bone w={52} h={22} radius={8} />
          <Bone w={60} h={12} />
          <Bone w={44} h={12} />
        </div>

        {/* Qty selector + action links */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '6px' }}>
          <Bone w={96} h={32} radius={8} />
          <Bone w={52} h={12} />
          <Bone w={64} h={12} />
        </div>
      </div>

      {/* Price block */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end', minWidth: '80px' }}>
        <Bone w={70} h={18} />
        <Bone w={50} h={12} />
      </div>
    </div>
  );
}

function PriceLineSkeleton() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Bone w="55%" h={12} />
      <Bone w="25%" h={12} />
    </div>
  );
}

export default function CartSkeleton() {
  return (
    <div style={{ minHeight: '100vh', background: '#fdf0f8', fontFamily: 'Inter, sans-serif' }}>

      {/* ── Header ── */}
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
            maxWidth: '1320px',
            margin: '0 auto',
            padding: '0 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <div
              style={{
                background: 'rgba(255,255,255,0.25)',
                borderRadius: '10px',
                width: '32px',
                height: '32px',
              }}
              className="skeleton-shine"
            />
            <div className="skeleton-shine" style={{ width: '72px', height: '16px', background: 'rgba(255,255,255,0.25)' }} />
          </div>

          {/* Search bar */}
          <div
            style={{
              background: 'rgba(255,255,255,0.18)',
              borderRadius: '8px',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flex: '0 0 420px',
              border: '1px solid rgba(255,255,255,0.3)',
              height: '38px',
            }}
          >
            <div className="skeleton-shine" style={{ width: '100%', height: '14px', background: 'rgba(255,255,255,0.2)' }} />
          </div>

          {/* Right controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <div className="skeleton-shine" style={{ width: '64px', height: '32px', borderRadius: '10px', background: 'rgba(255,255,255,0.2)' }} />
            <div className="skeleton-shine" style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(255,255,255,0.2)' }} />
            <div className="skeleton-shine" style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(255,255,255,0.2)' }} />
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '28px' }}>

        {/* Page title */}
        <div style={{ marginBottom: '20px' }}>
          <Bone w={140} h={22} radius={6} />
        </div>

        {/* Two-column grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 340px',
            gap: '20px',
            alignItems: 'start',
          }}
        >
          {/* ── Left: cart item rows ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <CartItemSkeleton />
            <CartItemSkeleton />
            <CartItemSkeleton />

            {/* Place order bar */}
            <div
              style={{
                background: '#fff',
                borderRadius: '14px',
                padding: '16px 20px',
                border: '1.5px solid #f3e0ed',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Bone w={140} h={44} radius={10} />
            </div>
          </div>

          {/* ── Right: order summary ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'sticky', top: '84px' }}>

            {/* Price details card */}
            <div
              style={{
                background: '#fff',
                borderRadius: '14px',
                padding: '20px',
                border: '1.5px solid #f3e0ed',
                boxShadow: '0 2px 12px rgba(233,30,140,0.06)',
              }}
            >
              {/* Heading */}
              <Bone w="50%" h={11} style={{ marginBottom: '20px' }} />

              {/* Price lines */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                <PriceLineSkeleton />
                <PriceLineSkeleton />
                <PriceLineSkeleton />
              </div>

              {/* Divider + total */}
              <div style={{ borderTop: '1.5px dashed #f0e0eb', paddingTop: '14px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Bone w="45%" h={15} />
                  <Bone w="30%" h={17} />
                </div>
              </div>

              {/* Savings banner */}
              <Bone w="100%" h={40} radius={8} style={{ marginBottom: '16px' }} />

              {/* CTA */}
              <Bone w="100%" h={46} radius={10} />
            </div>

            {/* Safe transaction banner */}
            <div
              style={{
                background: '#fff',
                borderRadius: '14px',
                padding: '14px 18px',
                border: '1.5px solid #f3e0ed',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <Bone w={36} h={36} radius={10} style={{ flexShrink: 0 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                <Bone w="65%" h={13} />
                <Bone w="85%" h={11} />
              </div>
            </div>

            {/* Offers card */}
            <div
              style={{
                background: '#fff',
                borderRadius: '14px',
                padding: '16px 18px',
                border: '1.5px solid #f3e0ed',
              }}
            >
              <Bone w="40%" h={11} style={{ marginBottom: '16px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <Bone w={18} h={18} radius={4} style={{ flexShrink: 0 }} />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <Bone w="90%" h={11} />
                      <Bone w="60%" h={11} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
