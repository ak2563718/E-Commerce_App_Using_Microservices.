const PINK = "#e91e8c";

function Bone({ width, height, rounded = "8px", style = {} }: { width?: string; height: string; rounded?: string; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        width: width ?? "100%",
        height,
        borderRadius: rounded,
        background: "linear-gradient(90deg, #fce7f5 0%, #fdf0f8 40%, #fce7f5 80%)",
        backgroundSize: "400% 100%",
        animation: "shimmer 1.6s ease-in-out infinite",
        flexShrink: 0,
        ...style,
      }}
    />
  );
}

function Circle({ size }: { size: string }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "linear-gradient(90deg, #fce7f5 0%, #fdf0f8 40%, #fce7f5 80%)",
        backgroundSize: "400% 100%",
        animation: "shimmer 1.6s ease-in-out infinite",
        flexShrink: 0,
      }}
    />
  );
}

export default function ProductPageSkeleton() {
  return (
    <div style={{ minHeight: "100vh", background: "#fdf0f8", fontFamily: "Inter, sans-serif" }}>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
      `}</style>

      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${PINK} 0%, #c2136e 100%)`,
          padding: "14px 0",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 3px 16px rgba(233,30,140,0.25)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ background: "#fff", borderRadius: "10px", width: "32px", height: "32px", flexShrink: 0 }} />
            <div style={{ width: "100px", height: "22px", borderRadius: "6px", background: "rgba(255,255,255,0.35)" }} />
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            {[80, 60, 70].map((w, i) => (
              <div key={i} style={{ width: `${w}px`, height: "20px", borderRadius: "6px", background: "rgba(255,255,255,0.25)" }} />
            ))}
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "12px 28px", display: "flex", gap: "8px", alignItems: "center" }}>
        {[60, 80, 90, 140].map((w, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Bone width={`${w}px`} height="12px" rounded="4px" />
            {i < 3 && <div style={{ width: "6px", height: "12px", borderRadius: "2px", background: "#f0dcea" }} />}
          </div>
        ))}
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 28px 40px" }}>
        {/* Three-column grid */}
        <div style={{ display: "grid", gridTemplateColumns: "420px 1fr 320px", gap: "24px", alignItems: "start" }}>

          {/* Left: Image gallery */}
          <div style={{ position: "sticky", top: "76px" }}>
            <div
              style={{
                background: "#fff",
                borderRadius: "16px",
                border: "1.5px solid #f3e0ed",
                overflow: "hidden",
                marginBottom: "10px",
                height: "380px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <Bone width="280px" height="280px" rounded="12px" />
              {/* Wishlist button placeholder */}
              <div style={{ position: "absolute", top: "14px", right: "14px" }}>
                <Circle size="36px" />
              </div>
              {/* Discount badge placeholder */}
              <div style={{ position: "absolute", top: "14px", left: "14px" }}>
                <Bone width="64px" height="24px" rounded="20px" />
              </div>
            </div>
            {/* Thumbnails */}
            <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "10px",
                    background: "linear-gradient(90deg, #fce7f5 0%, #fdf0f8 40%, #fce7f5 80%)",
                    backgroundSize: "400% 100%",
                    animation: "shimmer 1.6s ease-in-out infinite",
                    flexShrink: 0,
                    border: "2px solid #f0e0eb",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Center: Product info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Main info card */}
            <div style={{ background: "#fff", borderRadius: "16px", border: "1.5px solid #f3e0ed", padding: "24px", display: "flex", flexDirection: "column", gap: "14px" }}>
              {/* Brand + title */}
              <Bone width="80px" height="11px" rounded="4px" />
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Bone height="22px" rounded="6px" />
                <Bone width="70%" height="22px" rounded="6px" />
              </div>

              {/* Rating row */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ display: "flex", gap: "4px" }}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Bone key={i} width="14px" height="14px" rounded="3px" />
                  ))}
                </div>
                <Bone width="140px" height="13px" rounded="4px" />
                <Bone width="80px" height="20px" rounded="10px" />
              </div>

              {/* Price */}
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                <Bone width="120px" height="30px" rounded="6px" />
                <Bone width="70px" height="18px" rounded="4px" />
                <Bone width="60px" height="18px" rounded="4px" />
              </div>
              <Bone width="140px" height="13px" rounded="4px" />

              {/* Color picker */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <Bone width="100px" height="13px" rounded="4px" />
                <div style={{ display: "flex", gap: "10px" }}>
                  {[0, 1, 2, 3].map((i) => (
                    <Circle key={i} size="32px" />
                  ))}
                </div>
              </div>

              {/* Storage picker */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <Bone width="110px" height="13px" rounded="4px" />
                <div style={{ display: "flex", gap: "8px" }}>
                  {[60, 70, 70, 80].map((w, i) => (
                    <Bone key={i} width={`${w}px`} height="34px" rounded="8px" />
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Bone width="80px" height="11px" rounded="4px" />
                {[90, 75, 82, 68, 85].map((pct, i) => (
                  <Bone key={i} width={`${pct}%`} height="13px" rounded="4px" />
                ))}
              </div>
            </div>

            {/* Tabs card */}
            <div style={{ background: "#fff", borderRadius: "16px", border: "1.5px solid #f3e0ed", overflow: "hidden" }}>
              {/* Tab bar */}
              <div style={{ display: "flex", borderBottom: "1.5px solid #f3e0ed", padding: "0 22px" }}>
                {["Highlights", "Specifications", "Reviews (32)"].map((tab, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      padding: "14px 0",
                      display: "flex",
                      justifyContent: "center",
                      borderBottom: i === 0 ? `2.5px solid ${PINK}` : "2.5px solid transparent",
                    }}
                  >
                    <Bone width={`${tab.length * 7}px`} height="13px" rounded="4px" />
                  </div>
                ))}
              </div>

              {/* Tab content */}
              <div style={{ padding: "22px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {[88, 72, 95, 65, 80, 70, 90].map((pct, i) => (
                  <Bone key={i} width={`${pct}%`} height="14px" rounded="4px" />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Purchase panel */}
          <div style={{ position: "sticky", top: "76px", display: "flex", flexDirection: "column", gap: "14px" }}>
            {/* Buy box */}
            <div style={{ background: "#fff", borderRadius: "16px", border: "1.5px solid #f3e0ed", padding: "20px", boxShadow: "0 2px 12px rgba(233,30,140,0.06)", display: "flex", flexDirection: "column", gap: "14px" }}>
              {/* Price label + value */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <Bone width="40px" height="11px" rounded="4px" />
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                  <Bone width="100px" height="26px" rounded="6px" />
                  <Bone width="60px" height="16px" rounded="4px" />
                </div>
              </div>

              {/* Delivery box */}
              <div style={{ background: "#fdf4fa", borderRadius: "10px", padding: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Bone width="15px" height="15px" rounded="4px" />
                  <Bone width="120px" height="14px" rounded="4px" />
                </div>
                <Bone width="80%" height="12px" rounded="4px" />
                <div style={{ display: "flex", gap: "6px" }}>
                  <Bone height="34px" rounded="8px" />
                  <Bone width="60px" height="34px" rounded="8px" />
                </div>
              </div>

              {/* Service icons */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Bone width="20px" height="20px" rounded="4px" />
                    <Bone width="130px" height="12px" rounded="4px" />
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <Bone height="44px" rounded="10px" />
                <div
                  style={{
                    width: "100%",
                    height: "44px",
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, rgba(233,30,140,0.25) 0%, rgba(194,19,110,0.25) 100%)",
                    backgroundSize: "400% 100%",
                    animation: "shimmer 1.6s ease-in-out infinite",
                  }}
                />
              </div>
            </div>

            {/* Offers box */}
            <div style={{ background: "#fff", borderRadius: "16px", border: "1.5px solid #f3e0ed", padding: "18px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <Bone width="110px" height="11px" rounded="4px" />
              {[0, 1, 2].map((i) => (
                <div key={i}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "4px 0" }}>
                    <Bone width="22px" height="22px" rounded="5px" />
                    <Bone height="13px" rounded="4px" />
                    <Bone width="14px" height="14px" rounded="3px" style={{ marginLeft: "auto" }} />
                  </div>
                  {i < 2 && <div style={{ height: "1px", background: "#f9f0f6", marginTop: "8px" }} />}
                </div>
              ))}
            </div>

            {/* Seller box */}
            <div style={{ background: "#fff", borderRadius: "16px", border: "1.5px solid #f3e0ed", padding: "16px 18px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Bone width="50px" height="11px" rounded="4px" />
                <Bone width="80px" height="11px" rounded="4px" />
              </div>
              <Bone width="160px" height="16px" rounded="4px" />
              <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <Bone width="48px" height="20px" rounded="4px" />
                <Bone width="120px" height="12px" rounded="4px" />
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div style={{ marginTop: "32px" }}>
          <Bone width="160px" height="22px" rounded="6px" style={{ marginBottom: "16px" }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  borderRadius: "14px",
                  border: "1.5px solid #f3e0ed",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "130px",
                    borderRadius: "10px",
                    background: "linear-gradient(90deg, #fce7f5 0%, #fdf0f8 40%, #fce7f5 80%)",
                    backgroundSize: "400% 100%",
                    animation: "shimmer 1.6s ease-in-out infinite",
                    marginBottom: "2px",
                  }}
                />
                <Bone width="85%" height="14px" rounded="4px" />
                <Bone width="60%" height="13px" rounded="4px" />
                {/* Stars */}
                <div style={{ display: "flex", gap: "3px" }}>
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Bone key={s} width="13px" height="13px" rounded="3px" />
                  ))}
                </div>
                {/* Price row */}
                <div style={{ display: "flex", gap: "6px", alignItems: "baseline" }}>
                  <Bone width="70px" height="16px" rounded="4px" />
                  <Bone width="45px" height="12px" rounded="4px" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
