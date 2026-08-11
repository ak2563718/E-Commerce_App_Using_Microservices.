export default function ProfileLoader() {
  return (
    <div className="flex flex-col h-screen bg-[#f0f2f7] font-sans overflow-hidden">
    
      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
    
          {/* Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
            {/* Table header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div>
                <div className="w-32 h-4 rounded-lg skeleton mb-1.5" />
                <div className="w-48 h-3 rounded skeleton" />
              </div>
              <div className="flex gap-2.5">
                <div className="w-28 h-8 rounded-lg skeleton" />
                <div className="w-8 h-8 rounded-lg skeleton" />
              </div>
            </div>
            {/* Column headers */}
            <div className="grid grid-cols-5 gap-4 px-5 py-3 bg-gray-50 border-b border-gray-100">
              {[100, 80, 72, 60, 48].map((w, i) => (
                <div key={i} className="h-2.5 rounded skeleton" style={{ width: `${w}%` }} />
              ))}
            </div>
            {/* Rows */}
            {[1, 2, 3, 4, 5, 6].map((row) => (
              <div
                key={row}
                className="grid grid-cols-5 gap-4 items-center px-5 py-3.5 border-b border-gray-50 last:border-0"
              >
                {/* User cell */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full skeleton shrink-0" />
                  <div>
                    <div className="w-24 h-3 rounded skeleton mb-1.5" />
                    <div className="w-16 h-2.5 rounded skeleton" />
                  </div>
                </div>
                <div className="h-3 rounded skeleton w-3/4" />
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full skeleton" />
                  <div className="h-3 rounded skeleton w-16" />
                </div>
                <div className="h-3 rounded skeleton w-2/3" />
                <div className="flex items-center justify-end gap-2">
                  <div className="w-16 h-6 rounded-lg skeleton" />
                  <div className="w-6 h-6 rounded skeleton" />
                </div>
              </div>
            ))}
            {/* Footer pagination */}
            <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100 bg-gray-50">
              <div className="w-36 h-3 rounded skeleton" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg skeleton" />
                {[1, 2, 3].map((p) => (
                  <div key={p} className="w-8 h-8 rounded-lg skeleton" />
                ))}
                <div className="w-8 h-8 rounded-lg skeleton" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
