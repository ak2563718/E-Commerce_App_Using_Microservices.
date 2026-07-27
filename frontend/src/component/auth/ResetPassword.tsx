'use client'
import { auth_ResetPassword } from '@/redux/auth/auth.Action'
import { useAppDispatch } from '@/redux/hooks'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'


export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()

  const mismatch = confirm.length > 0 && password !== confirm
  const tooShort = password.length > 0 && password.length < 8
  const canSubmit = password.length >= 8 && password === confirm && status === 'idle'

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    const token = searchParams.get('token')
    if (!canSubmit) return
    try {
      setStatus("submitting")
      const res = await dispatch(auth_ResetPassword({token,password})).unwrap()
      console.log("res is",res)
      setStatus('success')
    } catch (error) {
      console.log('error is',error)
      setStatus("idle")
    }
  }

  const strength = password.length === 0 ? 0
    : password.length < 6 ? 1
    : password.length < 8 ? 2
    : /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password) ? 4
    : password.length >= 8 && (/[A-Z]/.test(password) || /[0-9]/.test(password)) ? 3
    : 2

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength]
  const strengthColor = ['', '#f44336', '#ff9800', '#4caf50', '#e91e8c'][strength]

  return (
    <div
      className="flex items-center justify-center min-h-screen p-6"
      style={{ background: 'linear-gradient(135deg, #fce4ec 0%, #fdf2f6 60%, #fff8fa 100%)' }}
    >
      <div
        className="bg-white rounded-2xl p-8 w-full max-w-sm"
        style={{ boxShadow: '0 12px 40px rgba(233,30,140,0.13)' }}
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center text-white font-black text-base"
            style={{ background: '#e91e8c' }}
          >
            S
          </div>
          <span className="font-extrabold text-lg tracking-tight" style={{ color: '#e91e8c' }}>
            ShopHub
          </span>
        </div>

        {status !== 'success' ? (
          <>
            {/* Icon */}
            <div className="flex justify-center mb-5">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #fce4ec, #f8bbd0)',
                  boxShadow: '0 0 0 8px rgba(233,30,140,0.07)',
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                  stroke="#e91e8c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
            </div>

            <h2 className="text-lg font-black text-gray-800 text-center mb-1">Set a new password</h2>
            <p className="text-gray-400 text-sm text-center leading-relaxed mb-6">
              Choose a strong password to keep your account secure.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* New password */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 8 characters"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    disabled={status === 'submitting'}
                    className="w-full px-3 py-2.5 pr-10 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-300 outline-none transition-all duration-150 disabled:opacity-50"
                    onFocus={e => {
                      e.currentTarget.style.borderColor = '#e91e8c'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(233,30,140,0.1)'
                    }}
                    onBlur={e => {
                      e.currentTarget.style.borderColor = tooShort ? '#f44336' : '#e5e7eb'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500 transition-colors"
                  >
                    {showPassword ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Strength bar */}
                {password.length > 0 && (
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex gap-1 flex-1">
                      {[1, 2, 3, 4].map(i => (
                        <div
                          key={i}
                          className="h-1 flex-1 rounded-full transition-all duration-300"
                          style={{
                            background: i <= strength ? strengthColor : '#e5e7eb',
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-semibold" style={{ color: strengthColor }}>
                      {strengthLabel}
                    </span>
                  </div>
                )}

                {tooShort && (
                  <p className="text-xs text-red-400 mt-0.5">Password must be at least 8 characters.</p>
                )}
              </div>

              {/* Confirm password */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Re-enter your password"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    required
                    disabled={status === 'submitting'}
                    className="w-full px-3 py-2.5 pr-10 rounded-lg border text-sm text-gray-800 placeholder-gray-300 outline-none transition-all duration-150 disabled:opacity-50"
                    style={{ borderColor: mismatch ? '#f44336' : '#e5e7eb' }}
                    onFocus={e => {
                      e.currentTarget.style.borderColor = mismatch ? '#f44336' : '#e91e8c'
                      e.currentTarget.style.boxShadow = mismatch
                        ? '0 0 0 3px rgba(244,67,54,0.1)'
                        : '0 0 0 3px rgba(233,30,140,0.1)'
                    }}
                    onBlur={e => {
                      e.currentTarget.style.borderColor = mismatch ? '#f44336' : '#e5e7eb'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowConfirm(v => !v)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500 transition-colors"
                  >
                    {showConfirm ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {mismatch && (
                  <p className="text-xs text-red-400 mt-0.5">Passwords do not match.</p>
                )}
              </div>

              {/* Requirements hint */}
              <div className="flex items-start gap-2 bg-pink-50 rounded-xl px-3 py-2.5">
                <svg className="shrink-0 mt-0.5" width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="#e91e8c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Use at least <span className="font-semibold text-gray-700">8 characters</span> with
                  a mix of uppercase, numbers, and symbols for a stronger password.
                </p>
              </div>

              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full py-2.5 rounded-lg font-bold text-sm text-white tracking-wide transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)',
                  boxShadow: '0 4px 14px rgba(233,30,140,0.35)',
                }}
                onMouseEnter={e => {
                  if (canSubmit) (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 18px rgba(233,30,140,0.5)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 14px rgba(233,30,140,0.35)'
                }}
              >
                {status === 'submitting' ? (
                  <>
                    <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Updating password...
                  </>
                ) : (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    Reset Password
                  </>
                )}
              </button>
            </form>

            <div className="my-5 h-px bg-gray-100" />
          </>
        ) : (
          <>
            {/* Success state */}
            <div className="flex justify-center mb-5">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #fce4ec, #f8bbd0)',
                  boxShadow: '0 0 0 8px rgba(233,30,140,0.07)',
                }}
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
                  stroke="#e91e8c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>

            <span className="flex justify-center">
              <span
                className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3"
                style={{ background: 'rgba(233,30,140,0.08)', color: '#e91e8c' }}
              >
                Password Updated
              </span>
            </span>

            <h2 className="text-lg font-black text-gray-800 text-center mb-2">All done!</h2>
            <p className="text-gray-400 text-sm text-center leading-relaxed">
              Your password has been reset successfully. You can now sign in with your new password.
            </p>

            <div className="my-5 h-px bg-gray-100" />

            <button
              type="button"
              onClick={()=>router.replace('/auth/login')}
              className="w-full py-2.5 rounded-lg font-bold text-sm text-white tracking-wide transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)',
                boxShadow: '0 4px 14px rgba(233,30,140,0.35)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 18px rgba(233,30,140,0.5)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 14px rgba(233,30,140,0.35)'
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              Go to Sign In
            </button>
          </>
        )}

        {/* Back to login */}
        {status !== 'success' && (
          <button
            type="button"
            onClick={()=>router.replace('/auth/login')}
            className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-pink-500 transition-colors mt-2"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Sign In
          </button>
        )}
      </div>
    </div>
  )
}
