'use client'
function Bone({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`rounded-md bg-pink-100/70 animate-pulse ${className ?? ""}`}
      style={style}
    />
  );
}

function NavbarSkeleton() {
  return (
    <nav
      className="w-full sticky top-0 z-50"
      style={{ background: "#fff", boxShadow: "0 2px 16px rgba(233,30,140,0.10)" }}
    >
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-4"
        style={{ height: "68px" }}
      >
        {/* Logo + brand */}
        <div className="flex items-center gap-2 shrink-0">
          <Bone className="w-8 h-8 rounded-lg" />
          <Bone className="hidden sm:block h-5 w-24" />
        </div>

        {/* Search bar */}
        <div className="flex-1 max-w-xl mx-2 sm:mx-4">
          <Bone className="h-9 w-full rounded-xl" />
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Login button */}
          <Bone className="hidden sm:block h-9 w-20 rounded-xl" />
          {/* More */}
          <Bone className="h-9 w-16 rounded-xl" />
          {/* Bell */}
          <Bone className="w-11 h-11 rounded-xl" />
          {/* Cart */}
          <Bone className="w-11 h-11 rounded-xl" />
        </div>
      </div>
    </nav>
  );
}

function HeroBannerSkeleton() {
  return (
    <div
      className="w-full relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #fce4ec 0%, #fdf2f6 55%, #f3e5f5 100%)",
        minHeight: "220px",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 flex items-center justify-between gap-8">
        {/* Left copy block */}
        <div className="flex flex-col gap-4 max-w-lg w-full">
          {/* Badge */}
          <Bone className="h-6 w-48 rounded-full" />
          {/* Heading */}
          <div className="flex flex-col gap-2">
            <Bone className="h-9 w-72 rounded-lg" />
            <Bone className="h-9 w-52 rounded-lg" />
          </div>
          {/* Subtext */}
          <div className="flex flex-col gap-1.5">
            <Bone className="h-3.5 w-full rounded" />
            <Bone className="h-3.5 w-4/5 rounded" />
          </div>
          {/* Buttons */}
          <div className="flex items-center gap-3">
            <Bone className="h-10 w-28 rounded-xl" />
            <Bone className="h-10 w-32 rounded-xl" />
          </div>
        </div>

        {/* Right stat pills */}
        <div className="hidden md:flex flex-col gap-3 shrink-0">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3"
              style={{ boxShadow: "0 2px 12px rgba(233,30,140,0.10)" }}
            >
              <Bone className="w-8 h-8 rounded-lg" />
              <div className="flex flex-col gap-1.5">
                <Bone className="h-4 w-12" />
                <Bone className="h-2.5 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MainContentSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 flex flex-col gap-14">
      {/* Category section */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Bone className="h-7 w-48 rounded-lg" />
          <div className="flex-1 h-px bg-pink-100" />
        </div>
        {/* Category cards row */}
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <Bone key={i} className="h-32 w-36 rounded-2xl shrink-0" />
          ))}
        </div>
      </section>

      {/* Popular products section */}
      <section className="flex flex-col gap-6">
        {/* Section header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Bone className="h-7 w-44 rounded-lg" />
            <Bone className="h-6 w-16 rounded-full" />
          </div>
          {/* Filter chips */}
          <div className="flex gap-2">
            {[56, 48, 64, 52].map((w, i) => (
              <Bone key={i} className={`h-7 w-${w} rounded-xl`} style={{ width: `${w * 2}px` }} />
            ))}
          </div>
        </div>

        {/* Product grid */}
        <div
          className="grid gap-5"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white p-4 flex flex-col gap-3"
              style={{
                boxShadow: "0 2px 12px rgba(233,30,140,0.07)",
                border: "1px solid #fce4ec",
              }}
            >
              <Bone className="h-44 w-full rounded-xl" />
              <Bone className="h-4 w-3/4 rounded" />
              <Bone className="h-3 w-1/2 rounded" />
              <div className="flex items-center justify-between">
                <Bone className="h-5 w-16 rounded" />
                <Bone className="h-8 w-20 rounded-lg" />
              </div>
            </div>
          ))}
        </div>

        {/* Load more */}
        <div className="flex justify-center pt-4">
          <Bone className="h-11 w-44 rounded-xl" />
        </div>
      </section>

      {/* Trust banner */}
      <section
        className="rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6"
        style={{ background: "linear-gradient(135deg, #fce4ec 0%, #fdf2f6 100%)" }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <Bone className="w-9 h-9 rounded-xl" />
            <Bone className="h-3.5 w-24 rounded" />
            <Bone className="h-2.5 w-32 rounded" />
          </div>
        ))}
      </section>
    </div>
  );
}

export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen" style={{ background: "#f9fafb" }}>
      <NavbarSkeleton />
      <HeroBannerSkeleton />
      <MainContentSkeleton />
    </div>
  );
}
