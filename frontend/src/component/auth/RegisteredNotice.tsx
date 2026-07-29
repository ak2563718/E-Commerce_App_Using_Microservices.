export default function RegisteredNotice() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6"
      style={{ background: 'linear-gradient(135deg, #fce4ec 0%, #fdf2f6 60%, #fff8fa 100%)' }}>

      <div className="bg-white rounded-2xl p-8 w-full max-w-sm text-center"
        style={{ boxShadow: '0 12px 40px rgba(233,30,140,0.13)' }}>

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-7 h-7 rounded-md flex items-center justify-center text-white font-black text-base"
            style={{ background: '#e91e8c' }}>S</div>
          <span className="font-extrabold text-lg tracking-tight" style={{ color: '#e91e8c' }}>ShopHub</span>
        </div>

        {/* Envelope icon */}
        <div className="flex items-center justify-center mb-5">
          <div className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #fce4ec, #f8bbd0)', boxShadow: '0 0 0 8px rgba(233,30,140,0.07)' }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
              stroke="#e91e8c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
        </div>

        {/* Badge */}
        <span className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3"
          style={{ background: 'rgba(233,30,140,0.08)', color: '#e91e8c' }}>
          User Registered
        </span>

        <h2 className="text-lg font-black text-gray-800 mb-2">Check your email</h2>

        <p className="text-gray-400 text-sm leading-relaxed">
          We've sent a verification link to your email address. Please open it to verify your account and login to ShopHub.
        </p>
        <p className="text-center text-sm text-gray-500 mt-4">
          Already verified your email?{" "}
          <a
            href="/auth/login"
            className="font-semibold text-pink-600 hover:text-pink-700 hover:underline transition-colors"
          >
            Click here to sign in
          </a>
          .
        </p>
        <p className="text-center text-sm text-gray-500 mt-4">
          Failed to Verify Email?{" "}
          <a href="/auth/signup" className="font-semibold text-pink-600 hover:text-pink-700 hover:underline transition-colors">
          click here
          </a>
          {" "} to Registered again.
        </p>

        {/* Divider */}
        <div className="my-5 h-px bg-gray-100" />

        {/* Info row */}
        <div className="flex items-start gap-3 text-left bg-pink-50 rounded-xl px-4 py-3">
          <svg className="shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="#e91e8c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="text-xs text-gray-500 leading-relaxed">
            Didn't receive the email? Check your spam folder or contact{' '}
            <span className="font-semibold" style={{ color: '#e91e8c' }}>support@shophub.in</span>
          </p>
        </div>

      </div>
    </div>
  )
}
