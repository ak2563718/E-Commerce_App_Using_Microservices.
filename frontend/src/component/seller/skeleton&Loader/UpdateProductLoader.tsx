const Bone = ({ className = "" }: { className?: string }) => (
  <div className={`rounded-md bg-white/8 animate-pulse ${className}`} />
);

export default function UpdateProductLoader() {
  return (
    <div
      className="min-h-full overflow-y-auto"
      style={{ background: "#0d0118", fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6">

        {/* breadcrumb */}
        <div className="flex items-center gap-1.5 mb-6">
          <Bone className="h-3 w-14" />
          <Bone className="h-2.5 w-2.5" />
          <Bone className="h-3 w-24" />
        </div>

        {/* page header card */}
        <div
          className="rounded-2xl p-5 mb-4"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <Bone className="h-6 w-2/3 mb-3" />
              <div className="flex flex-wrap items-center gap-2">
                <Bone className="h-6 w-20 rounded-md" />
                <Bone className="h-6 w-20 rounded-full" />
                <Bone className="h-6 w-28 rounded-full" />
              </div>
            </div>
            <div className="text-right shrink-0 flex flex-col items-end gap-2">
              <Bone className="h-8 w-28" />
              <Bone className="h-3.5 w-20" />
            </div>
          </div>
        </div>

        {/* images section */}
        <div
          className="rounded-2xl p-5 mb-4"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {/* section header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col gap-1.5">
              <Bone className="h-4 w-28" />
              <Bone className="h-3 w-44" />
            </div>
            <Bone className="h-7 w-14 rounded-lg" />
          </div>
          {/* image grid */}
          <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))" }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Bone key={i} className="aspect-square rounded-xl w-full" />
            ))}
          </div>
        </div>

        {/* details section */}
        <div
          className="rounded-2xl p-5"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {/* section header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex flex-col gap-1.5">
              <Bone className="h-4 w-32" />
              <Bone className="h-3 w-56" />
            </div>
            <Bone className="h-7 w-14 rounded-lg" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Product Name — full width */}
            <div className="sm:col-span-2">
              <Bone className="h-2.5 w-24 mb-2" />
              <Bone className="h-9 w-full rounded-lg" />
            </div>

            {/* two-column fields */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i}>
                <Bone className="h-2.5 w-20 mb-2" />
                <Bone className="h-9 w-full rounded-lg" />
              </div>
            ))}

            {/* Description — full width */}
            <div className="sm:col-span-2">
              <Bone className="h-2.5 w-20 mb-2" />
              <Bone className="h-24 w-full rounded-lg" />
            </div>

            {/* two more two-column fields */}
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i}>
                <Bone className="h-2.5 w-20 mb-2" />
                <Bone className="h-9 w-full rounded-lg" />
              </div>
            ))}

            {/* SEO Description — full width */}
            <div className="sm:col-span-2">
              <Bone className="h-2.5 w-28 mb-2" />
              <Bone className="h-24 w-full rounded-lg" />
            </div>

            {/* remaining two-column fields */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>
                <Bone className="h-2.5 w-16 mb-2" />
                <Bone className="h-9 w-full rounded-lg" />
              </div>
            ))}
          </div>
        </div>

        <Bone className="h-3 w-64 mx-auto mt-5 rounded-full" />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .animate-pulse { animation: pulse 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      `}</style>
    </div>
  );
}
