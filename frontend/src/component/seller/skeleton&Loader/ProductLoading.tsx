export default function ProductLoading() {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: 28,
          gap: 20,
        }}
      >
        {/* Left: title + search */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* "Products" heading */}
          <div className="skel" style={{ width: 160, height: 32, borderRadius: 6 }} />
          {/* Search bar */}
          <div
            className="skel"
            style={{ width: 320, height: 40, borderRadius: 10 }}
          />
        </div>

        {/* Right: Add Product button */}
        <div className="skel" style={{ width: 140, height: 40, borderRadius: 10, flexShrink: 0 }} />
      </div>

      {/* 3x3 product card grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <ProductCardSkeleton key={i} delay={i * 50} />
        ))}
      </div>

      {/* Pagination area */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 28,
        }}
      >
        <div className="skel" style={{ width: 120, height: 14, borderRadius: 4, opacity: 0.5 }} />
        <div style={{ display: 'flex', gap: 8 }}>
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="skel" style={{ width: 34, height: 34, borderRadius: 8 }} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ProductCardSkeleton({ delay }: { delay: number }) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 14,
        border: '1px solid #e8edf2',
        overflow: 'hidden',
        animationDelay: `${delay}ms`,
      }}
    >
      {/* Product image */}
      <div className="skel" style={{ width: '100%', height: 180, borderRadius: 0 }} />

      <div style={{ padding: '16px' }}>
        {/* Category badge */}
        <div className="skel" style={{ width: 72, height: 22, borderRadius: 20, marginBottom: 12 }} />

        {/* Product name */}
        <div className="skel" style={{ width: '80%', height: 16, borderRadius: 4, marginBottom: 8 }} />
        {/* Description */}
        <div className="skel" style={{ width: '60%', height: 12, borderRadius: 4, marginBottom: 16, opacity: 0.6 }} />

        {/* Price + stock row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div className="skel" style={{ width: 64, height: 20, borderRadius: 4 }} />
          <div className="skel" style={{ width: 68, height: 22, borderRadius: 20 }} />
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 8 }}>
          <div className="skel" style={{ flex: 1, height: 36, borderRadius: 8 }} />
          <div className="skel" style={{ width: 36, height: 36, borderRadius: 8 }} />
        </div>
      </div>
    </div>
  )
}
