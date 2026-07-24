export function Field({ label, type, placeholder, value, onChange }: {
  label: string; type: string; placeholder: string; value: string; onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-300 outline-none transition-all duration-150"
        onFocus={e => { e.currentTarget.style.borderColor = '#e91e8c'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(233,30,140,0.1)' }}
        onBlur={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = 'none' }}
      />
    </div>
  )
}

export function PasswordField({ label, placeholder, value, onChange, show, onToggle }: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void; show: boolean; onToggle: () => void
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full px-3 py-2.5 pr-10 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-300 outline-none transition-all duration-150"
          onFocus={e => { e.currentTarget.style.borderColor = '#e91e8c'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(233,30,140,0.1)' }}
          onBlur={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = 'none' }}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500 transition-colors"
          tabIndex={-1}
        >
          {show ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
              <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}

export function PinkButton({ children, type, onClick }: { children: React.ReactNode; type?: 'submit' | 'button'; onClick?:()=>void }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full py-2.5 rounded-lg font-bold text-sm text-white tracking-wide transition-all duration-200 active:scale-95"
      style={{ background: 'linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)', boxShadow: '0 4px 14px rgba(233,30,140,0.35)' }}
      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 18px rgba(233,30,140,0.5)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 14px rgba(233,30,140,0.35)' }}
    >
      {children}
    </button>
  )
}

export function Divider() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-px bg-gray-100" />
      <span className="text-xs text-gray-300 font-medium">or</span>
      <div className="flex-1 h-px bg-gray-100" />
    </div>
  )
}

export function GoogleButton() {
  return (
    <button
      type="button"
      className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 transition-all duration-150 hover:border-pink-200 hover:bg-pink-50"
    >
      <svg width="16" height="16" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      Continue with Google
    </button>
  )
}

export function BrandPanel() {
  return (
    <div
      className="hidden sm:flex flex-col justify-between p-8 w-64 shrink-0"
      style={{ background: 'linear-gradient(160deg, #e91e8c 0%, #ad1457 100%)' }}
    >
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-md flex items-center justify-center text-white font-black text-base" style={{ background: 'rgba(255,255,255,0.22)' }}>S</div>
          <span className="text-white font-extrabold text-lg tracking-tight">ShopHub</span>
        </div>
        <p className="text-pink-200 text-xs mt-1">India's Smart Shopping Destination</p>
      </div>

      <div>
        <p className="text-white font-black text-2xl leading-snug mb-3">
          Shop smarter,<br />
          <span className="text-yellow-300">save bigger.</span>
        </p>
        <p className="text-pink-100 text-xs leading-relaxed mb-6">
          Discover millions of products with unbeatable prices and fast delivery.
        </p>
        <div className="flex flex-col gap-3">
          {[
            { icon: '🛡️', text: 'Secure Payments' },
            { icon: '🚀', text: 'Fast Delivery' },
            { icon: '↩️', text: '30-Day Returns' },
            { icon: '🏷️', text: 'Exclusive Deals Daily' },
          ].map(f => (
            <div key={f.text} className="flex items-center gap-2.5">
              <span className="text-sm">{f.icon}</span>
              <span className="text-pink-100 text-xs font-medium">{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-pink-300 text-xs">© 2026 ShopHub</p>
    </div>
  )
}
