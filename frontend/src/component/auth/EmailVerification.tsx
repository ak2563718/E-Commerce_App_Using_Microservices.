'use client'
import { authVerifyEmail } from '@/redux/auth/auth.Action'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'

type Status = 'verifying' | 'success' | 'error'

export default function EmailVerification({ email = 'you@example.com', onResend, onContinue }: {
  email?: string
  onResend?: () => void
  onContinue?: () => void
}) {
  const router = useRouter()
  const [status, setStatus] = useState<Status>('verifying')
  const [countdown, setCountdown] = useState(30)
  const [canResend, setCanResend] = useState(false)
  const [dots, setDots] = useState(0)
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const { loading, message, error} = useAppSelector((state)=>state.auth)

  // Simulate backend verification (remove in real use)
  useEffect(() => {
    const timer = setTimeout(() => setStatus('success'), 3500)
    return () => clearTimeout(timer)
  }, [])

  // Animated dots while verifying
  useEffect(() => {
    if (status !== 'verifying') return
    const interval = setInterval(() => setDots(d => (d + 1) % 4), 500)
    return () => clearInterval(interval)
  }, [status])

  // Resend countdown
  useEffect(() => {
    if (canResend) return
    const interval = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { setCanResend(true); clearInterval(interval); return 0 }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [canResend])

  const handleResend = () => {
    setCanResend(false)
    setCountdown(30)
    onResend?.()
  }

  useEffect(()=>{
    const token = searchParams.get("token");
    if(!token) return;
    dispatch(authVerifyEmail(token))
    if(message){
      toast.success(message)
    }
    if(error){
      toast.error(error)
    }
  },[searchParams])

  return (
    <div className="flex items-center justify-center min-h-screen p-6 "
      style={{ background: 'linear-gradient(135deg, #fce4ec 0%, #fdf2f6 60%, #fff8fa 100%)' }}>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm text-center"
        style={{ boxShadow: '0 16px 48px rgba(233,30,140,0.15)' }}>

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-7 h-7 rounded-md flex items-center justify-center text-white font-black text-base"
            style={{ background: '#e91e8c' }}>S</div>
          <span className="font-extrabold text-lg tracking-tight" style={{ color: '#e91e8c' }}>ShopHub</span>
        </div>

        {/* Icon area */}
        <div className="flex items-center justify-center mb-5">
          {status === 'verifying' && <VerifyingIcon />}
          {status === 'success' && <SuccessIcon />}
          {status === 'error' && <ErrorIcon />}
        </div>

        {/* Heading */}
        <h2 className="text-xl font-black text-gray-800 mb-2">
          {status === 'verifying' && 'Verifying your email'}
          {status === 'success' && 'Email verified!'}
          {status === 'error' && 'Verification failed'}
        </h2>

        {/* Subtext */}
        <p className="text-gray-400 text-sm leading-relaxed mb-1">
          {status === 'verifying' && (
            <>Checking your email address{'.'.repeat(dots)}</>
          )}
          {status === 'success' && 'Your account is ready. Welcome to ShopHub!'}
          {status === 'error' && 'The link may have expired or is invalid.'}
        </p>

        {status !== 'success' && (
          <p className="text-xs text-gray-400 mb-6">
            Sent to <span className="font-semibold text-gray-600">{email}</span>
          </p>
        )}

        {status === 'verifying' && (
          <div className="mb-6">
            <ProgressBar />
          </div>
        )}

        {/* Actions */}
        {status === 'success' && (
          <button
            onClick={()=>router.push('/auth/login')}
            className="w-full py-2.5 rounded-lg font-bold text-sm text-white tracking-wide transition-all duration-200 active:scale-95 mb-4"
            style={{ background: 'linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)', boxShadow: '0 4px 14px rgba(233,30,140,0.35)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 18px rgba(233,30,140,0.5)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 14px rgba(233,30,140,0.35)' }}
          >
            Login Account
          </button>
        )}

        {status === 'error' && (
          <button
            onClick={handleResend}
            className="w-full py-2.5 rounded-lg font-bold text-sm text-white tracking-wide transition-all duration-200 active:scale-95 mb-4"
            style={{ background: 'linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)', boxShadow: '0 4px 14px rgba(233,30,140,0.35)' }}
          >
            Resend Email
          </button>
        )}

        {/* Resend row */}
        {status === 'verifying' && (
          <div className="text-xs text-gray-400">
            Didn't receive it?{' '}
            {canResend ? (
              <button onClick={handleResend} className="font-bold" style={{ color: '#e91e8c' }}>
                Resend email
              </button>
            ) : (
              <span className="text-gray-400">
                Resend in <span className="font-semibold text-gray-600">{countdown}s</span>
              </span>
            )}
          </div>
        )}

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {(['Account Created', 'Email Verified', 'Login Account'] as const).map((step, i) => {
            const done = status === 'success' ? i <= 1 : i === 0
            const active = status === 'verifying' && i === 1
            return (
              <div key={step} className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300"
                    style={{
                      background: done ? '#e91e8c' : active ? 'rgba(233,30,140,0.15)' : '#f3f4f6',
                      color: done ? '#fff' : active ? '#e91e8c' : '#9ca3af',
                      border: active ? '1.5px solid #e91e8c' : 'none',
                    }}>
                    {done ? '✓' : i + 1}
                  </div>
                  <span className="text-gray-400 whitespace-nowrap" style={{ fontSize: 9 }}>{step}</span>
                </div>
                {i < 2 && <div className="w-8 h-px mb-4 transition-all duration-500"
                  style={{ background: done && i < 1 ? '#e91e8c' : '#e5e7eb' }} />}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function VerifyingIcon() {
  return (
    <div className="relative w-20 h-20">
      {/* Spinning ring */}
      <svg className="absolute inset-0 animate-spin" width="80" height="80" viewBox="0 0 80 80" style={{ animationDuration: '1.4s' }}>
        <circle cx="40" cy="40" r="34" fill="none" stroke="#fce4ec" strokeWidth="4" />
        <circle cx="40" cy="40" r="34" fill="none" stroke="#e91e8c" strokeWidth="4"
          strokeLinecap="round" strokeDasharray="60 154" strokeDashoffset="0" />
      </svg>
      {/* Email icon center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #fce4ec, #f8bbd0)' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e91e8c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>
      </div>
    </div>
  )
}

function SuccessIcon() {
  return (
    <div className="w-20 h-20 rounded-full flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #fce4ec, #f8bbd0)', boxShadow: '0 0 0 8px rgba(233,30,140,0.08)' }}>
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#e91e8c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        style={{ animation: 'pop 0.3s ease-out' }}>
        <path d="M20 6 9 17l-5-5" />
      </svg>
      <style>{`@keyframes pop { from { transform: scale(0.5); opacity: 0 } to { transform: scale(1); opacity: 1 } }`}</style>
    </div>
  )
}

function ErrorIcon() {
  return (
    <div className="w-20 h-20 rounded-full flex items-center justify-center"
      style={{ background: '#fff5f5', boxShadow: '0 0 0 8px rgba(244,67,54,0.08)' }}>
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#f44336" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    </div>
  )
}

function ProgressBar() {
  return (
    <div className="w-full h-1.5 bg-pink-100 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full"
        style={{
          background: 'linear-gradient(90deg, #e91e8c, #f48fb1)',
          animation: 'progress 3.5s ease-in-out forwards',
          width: '0%',
        }}
      />
      <style>{`@keyframes progress { from { width: 0% } to { width: 95% } }`}</style>
    </div>
  )
}
