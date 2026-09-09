/* Shimmer keyframe injected once */
const SHIMMER_STYLE = `
@keyframes shimmer {
  0%   { background-position: -600px 0; }
  100% { background-position:  600px 0; }
}
`;

function injectShimmer() {
  if (typeof document !== "undefined" && !document.getElementById("shimmer-kf")) {
    const s = document.createElement("style");
    s.id = "shimmer-kf";
    s.textContent = SHIMMER_STYLE;
    document.head.appendChild(s);
  }
}
injectShimmer();

const SHIMMER: React.CSSProperties = {
  background: "linear-gradient(90deg, #f9e8f2 25%, #fde8f3 50%, #f9e8f2 75%)",
  backgroundSize: "600px 100%",
  animation: "shimmer 1.4s infinite linear",
  borderRadius: "6px",
};

function Bone({ w, h, r = 6, style = {} }: { w: string | number; h: string | number; r?: number; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        ...SHIMMER,
        width: w,
        height: h,
        borderRadius: r,
        flexShrink: 0,
        ...style,
      }}
    />
  );
}

function OrderCardSkeleton() {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        border: "1.5px solid #f3e0ed",
        padding: "18px 20px",
        boxShadow: "0 2px 10px rgba(233,30,140,0.05)",
      }}
    >
      {/* Top row — order ID + status badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <Bone w={140} h={13} />
          <Bone w={90} h={11} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Bone w={110} h={26} r={999} />
          <Bone w={16} h={16} r={4} />
        </div>
      </div>

      {/* Items preview — 3 thumbnails + text */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "14px" }}>
        {[0, 1, 2].map((i) => (
          <Bone key={i} w={52} h={52} r={10} />
        ))}
        <div style={{ flex: 1, paddingLeft: "4px", display: "flex", flexDirection: "column", gap: "7px" }}>
          <Bone w="70%" h={13} />
          <Bone w="45%" h={11} />
        </div>
      </div>

      {/* Bottom row — item count / delivery · price · button */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "12px",
          borderTop: "1px solid #f3e0ed",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Bone w={55} h={11} />
          <Bone w={4} h={4} r={999} style={{ opacity: 0.4 }} />
          <Bone w={90} h={11} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <Bone w={52} h={18} r={6} />
          <Bone w={98} h={32} r={8} />
        </div>
      </div>
    </div>
  );
}

export default function OrdersSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div style={{ minHeight: "100vh", background: "#fdf0f8", fontFamily: "Poppins, sans-serif" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "28px 20px" }}>

        {/* Title row */}
        <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Bone w={120} h={22} r={6} />
            <Bone w={64} h={16} r={6} />
          </div>
        </div>

        {/* Search bar */}
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            border: "1.5px solid #f3e0ed",
            padding: "13px 16px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "16px",
            boxShadow: "0 2px 8px rgba(233,30,140,0.06)",
          }}
        >
          <Bone w={16} h={16} r={999} />
          <Bone w="55%" h={13} r={6} />
        </div>

        {/* Filter tabs */}
        <div
          style={{
            display: "flex",
            gap: "6px",
            marginBottom: "20px",
            background: "#fff",
            borderRadius: "12px",
            padding: "6px",
            border: "1.5px solid #f3e0ed",
            width: "fit-content",
          }}
        >
          {[88, 60, 90, 84].map((w, i) => (
            <Bone key={i} w={w} h={34} r={8} />
          ))}
        </div>

        {/* Order cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {Array.from({ length: count }).map((_, i) => (
            <OrderCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
