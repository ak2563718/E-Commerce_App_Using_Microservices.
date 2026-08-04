'use client'
import { auth_ForgotPassword } from '@/redux/auth/auth.Action'
import { useAppDispatch } from '@/redux/hooks'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

type Status = 'idle' | 'sending' | 'sent'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    if (!email || status !== 'idle') return
    try {
       setStatus('sending')
       const res = await dispatch(auth_ForgotPassword(email)).unwrap()
       setStatus('sent')
    } catch (err:any) {
      setStatus("idle")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-6"
      style={{ background: 'linear-gradient(135deg, #fce4ec 0%, #fdf2f6 60%, #fff8fa 100%)' }}>

      <div className="bg-white rounded-2xl p-8 w-full max-w-sm"
        style={{ boxShadow: '0 12px 40px rgba(233,30,140,0.13)' }}>

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-7 h-7 rounded-md flex items-center justify-center text-white font-black text-base"
            style={{ background: '#e91e8c' }}>S</div>
          <span className="font-extrabold text-lg tracking-tight" style={{ color: '#e91e8c' }}>ShopHub</span>
        </div>

        {status !== 'sent' ? (
          <>
            {/* Icon */}
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #fce4ec, #f8bbd0)', boxShadow: '0 0 0 8px rgba(233,30,140,0.07)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                  stroke="#e91e8c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
            </div>

            <h2 className="text-lg font-black text-gray-800 text-center mb-1">Forgot your password?</h2>
            <p className="text-gray-400 text-sm text-center leading-relaxed mb-6">
              Enter your registered email and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  disabled={status === 'sending'}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-300 outline-none transition-all duration-150 disabled:opacity-50"
                  onFocus={e => { e.currentTarget.style.borderColor = '#e91e8c'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(233,30,140,0.1)' }}
                  onBlur={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = 'none' }}
                />
              </div>

              <button
                type="submit"
                disabled={!email || status === 'sending'}
                className="w-full py-2.5 rounded-lg font-bold text-sm text-white tracking-wide transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)', boxShadow: '0 4px 14px rgba(233,30,140,0.35)' }}
                onMouseEnter={e => { if (email && status === 'idle') (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 18px rgba(233,30,140,0.5)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 14px rgba(233,30,140,0.35)' }}
              >
                {status === 'sending' ? (
                  <>
                    <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Sending link...
                  </>
                ) : (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    Send Verification Link
                  </>
                )}
              </button>
            </form>

            <div className="my-5 h-px bg-gray-100" />
          </>
        ) : (
          <>
            {/* Sent state */}
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #fce4ec, #f8bbd0)', boxShadow: '0 0 0 8px rgba(233,30,140,0.07)' }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
                  stroke="#e91e8c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
            </div>

            <span className="flex justify-center">
              <span className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3"
                style={{ background: 'rgba(233,30,140,0.08)', color: '#e91e8c' }}>
                Link Sent
              </span>
            </span>

            <h2 className="text-lg font-black text-gray-800 text-center mb-2">Check your inbox</h2>
            <p className="text-gray-400 text-sm text-center leading-relaxed">
              We've sent a password reset link to{' '}
              <span className="font-semibold text-gray-600">{email}</span>.
              Open it to set a new password.
            </p>

            <div className="my-5 h-px bg-gray-100" />

            <div className="flex items-start gap-3 bg-pink-50 rounded-xl px-4 py-3 mb-5">
              <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="#e91e8c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-xs text-gray-500 leading-relaxed">
                Link expires in <span className="font-semibold text-gray-700">15 minutes</span>. Check spam if not received.
              </p>
            </div>

            <button
              type="button"
              onClick={() => { setStatus('idle'); setEmail('') }}
              className="w-full py-2.5 rounded-lg font-bold text-sm tracking-wide border transition-all duration-150 hover:bg-pink-50"
              style={{ color: '#e91e8c', borderColor: '#f8bbd0' }}
            >
              Try a different email
            </button>
          </>
        )}

        {/* Back to login */}
        <button
          type="button"
          onClick={()=>router.push("/auth/login")}
          className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-pink-500 transition-colors mt-2"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to Sign In
        </button>

      </div>
    </div>
  )
}
