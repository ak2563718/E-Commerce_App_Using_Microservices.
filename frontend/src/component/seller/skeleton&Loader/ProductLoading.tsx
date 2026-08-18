function Bone({ className }: { className?: string }) {
  return (
    <div
      className={`rounded-md bg-purple-100/60 animate-pulse ${className ?? ""}`}
    />
  );
}

function ProductCardSkeleton() {
  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-3"
      style={{
        background: "#fff",
        border: "1px solid #f0ebff",
        boxShadow: "0 1px 8px rgba(124,58,237,0.06)",
      }}
    >
      {/* Image */}
      <div
        className="w-full h-40 rounded-xl animate-pulse"
        style={{ background: "linear-gradient(135deg, #f3e8ff, #ede9fe)" }}
      />

      {/* Name + SKU */}
      <div className="flex flex-col gap-1.5">
        <Bone className="h-3.5 w-3/4" />
        <Bone className="h-2.5 w-1/3" />
      </div>

      {/* Price + Stock tiles */}
      <div className="grid grid-cols-2 gap-2">
        {[0, 1].map((i) => (
          <div key={i} className="rounded-lg p-3" style={{ background: "#faf5ff" }}>
            <Bone className="h-4 w-12 mb-1.5" />
            <Bone className="h-2.5 w-8" />
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between pt-2 border-t"
        style={{ borderColor: "#f3e8ff" }}
      >
        <Bone className="h-2.5 w-14" />
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <Bone key={i} className="w-7 h-7 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductsLoading({ count = 8 }: { count?: number }) {
  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Bone className="h-7 w-28" />
          <Bone className="h-3 w-40" />
        </div>
        <Bone className="h-9 w-28 rounded-xl" />
      </div>

      {/* Search bar */}
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-xl max-w-sm"
        style={{ background: "#fff", border: "1px solid #e9d5ff" }}
      >
        <Bone className="w-4 h-4 rounded-full flex-shrink-0" />
        <Bone className="h-3 w-48" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
