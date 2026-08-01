import React from 'react'

function SellerFooter() {
  return (
    <div>
        {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer
        className="px-8 py-5 flex items-center justify-between text-xs"
        style={{ borderTop: '1px solid #f3e8ff', color: '#9ca3af' }}
      >
        <span>© 2025 ShopHub · All rights reserved</span>
        <div className="flex gap-5">
          {['Terms', 'Privacy', 'Support'].map(l => (
            <span key={l} className="cursor-pointer hover:text-purple-500 transition-colors">{l}</span>
          ))}
        </div>
      </footer>
    </div>
  )
}

export default SellerFooter