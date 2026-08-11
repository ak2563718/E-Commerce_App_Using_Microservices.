export default function AddressSkeleton() {
  return (
    <div className="min-h-screen bg-[#f0f2f7] font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <div className="w-40 h-5 rounded-lg skeleton mb-2" />
            <div className="w-56 h-3.5 rounded skeleton" />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full skeleton" />
            <div className="w-px h-5 bg-gray-200" />
            <div className="w-24 h-3.5 rounded skeleton" />
          </div>
        </div>
      </header>

      {/* Page content */}
      <div className="max-w-4xl mx-auto px-8 py-10 space-y-6">

        {/* Box 1 — Personal / Contact Info */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-7">
          {/* Box header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl skeleton shrink-0" />
            <div>
              <div className="w-36 h-4 rounded-lg skeleton mb-1.5" />
              <div className="w-52 h-3 rounded skeleton" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-2">
                <div className="w-20 h-3 rounded skeleton" />
                <div className="w-full h-11 rounded-xl skeleton" />
              </div>
            ))}
            <div className="space-y-2">
              <div className="w-24 h-3 rounded skeleton" />
              <div className="w-full h-11 rounded-xl skeleton" />
            </div>
            <div className="space-y-2">
              <div className="w-16 h-3 rounded skeleton" />
              <div className="w-full h-11 rounded-xl skeleton" />
            </div>
          </div>
        </div>

        {/* Box 2 — Address Details */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-7">
          {/* Box header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl skeleton shrink-0" />
            <div>
              <div className="w-44 h-4 rounded-lg skeleton mb-1.5" />
              <div className="w-60 h-3 rounded skeleton" />
            </div>
          </div>

          <div className="space-y-5">
            {/* Street address full-width */}
            <div className="space-y-2">
              <div className="w-28 h-3 rounded skeleton" />
              <div className="w-full h-11 rounded-xl skeleton" />
            </div>
            {/* Apt / Suite */}
            <div className="space-y-2">
              <div className="w-36 h-3 rounded skeleton" />
              <div className="w-full h-11 rounded-xl skeleton" />
            </div>
            {/* City / State / Zip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[["City", "w-10"], ["State", "w-12"], ["ZIP Code", "w-16"]].map(([, w], i) => (
                <div key={i} className="space-y-2">
                  <div className={`${w} h-3 rounded skeleton`} />
                  <div className="w-full h-11 rounded-xl skeleton" />
                </div>
              ))}
            </div>
            {/* Country */}
            <div className="space-y-2">
              <div className="w-16 h-3 rounded skeleton" />
              <div className="w-full h-11 rounded-xl skeleton" />
            </div>
          </div>
        </div>

        {/* Box 3 — Delivery Preferences */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-7">
          {/* Box header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl skeleton shrink-0" />
            <div>
              <div className="w-48 h-4 rounded-lg skeleton mb-1.5" />
              <div className="w-64 h-3 rounded skeleton" />
            </div>
          </div>

          {/* Delivery type radio cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`rounded-xl border p-4 space-y-2 ${i === 1 ? "border-indigo-200 bg-indigo-50/50" : "border-gray-100"}`}
              >
                <div className="w-6 h-6 rounded-full skeleton" style={i === 1 ? { background: "linear-gradient(90deg,#c7d2fe 0%,#e0e7ff 40%,#c7d2fe 80%)", backgroundSize: "800px 100%", animation: "shimmer 1.8s ease-in-out infinite" } : {}} />
                <div className="w-20 h-3.5 rounded skeleton" />
                <div className="w-28 h-2.5 rounded skeleton" />
              </div>
            ))}
          </div>

          {/* Delivery note textarea */}
          <div className="space-y-2 mb-6">
            <div className="w-32 h-3 rounded skeleton" />
            <div className="w-full h-24 rounded-xl skeleton" />
          </div>

          {/* Save as default checkbox */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-5 h-5 rounded skeleton shrink-0" />
            <div className="w-48 h-3 rounded skeleton" />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-6">
            <div className="w-20 h-3.5 rounded skeleton" />
            <div className="flex gap-3">
              <div className="w-24 h-10 rounded-xl skeleton" />
              <div className="w-36 h-10 rounded-xl skeleton" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}