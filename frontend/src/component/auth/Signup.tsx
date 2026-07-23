'use client'
import { useState } from 'react'
import { BrandPanel, Divider, Field, GoogleButton, PasswordField, PinkButton } from './AuthLayout'
import { useRouter } from 'next/navigation'

function StrengthBar({ password }: { password: string }) {
  const strength = password.length === 0 ? 0
    : password.length < 6 ? 1
    : password.length < 10 ? 2
    : /[A-Z]/.test(password) && /[0-9]/.test(password) ? 4
    : 3
  const labels = ['', 'Weak', 'Fair', 'Strong', 'Very Strong']
  const colors = ['', '#f44336', '#ff9800', '#4caf50', '#2196f3']
  if (!password) return null
  return (
    <div className="flex flex-col gap-1 -mt-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300"
            style={{ background: i <= strength ? colors[strength] : '#e5e7eb' }} />
        ))}
      </div>
      <p className="text-xs font-semibold" style={{ color: colors[strength] }}>{labels[strength]}</p>
    </div>
  )
}

export default function Signup() {
    const router = useRouter()
  const [data, setData] = useState({ email: '', password: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <div className="flex rounded-2xl overflow-hidden shadow-2xl" style={{ boxShadow: '0 16px 48px rgba(233,30,140,0.18)', maxWidth: 740 }}>
      <BrandPanel />

      <div className="bg-white w-80 shrink-0">
        <div className="border-b border-gray-100 flex">
          <button onClick={()=>router.push('/login')}  className="flex-1 py-3.5 text-xs font-bold tracking-wide text-gray-400 hover:text-pink-400 transition-colors" style={{ borderBottom: '2px solid transparent' }}>
            Sign In
          </button>
          <button className="flex-1 py-3.5 text-xs font-bold tracking-wide" style={{ color: '#e91e8c', borderBottom: '2px solid #e91e8c' }}>
            Create Account
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-black text-gray-800 mb-0.5">Join ShopHub</h2>
            <p className="text-gray-400 text-xs">Create your free account today</p>
          </div>

          <Field label="Email" type="email" placeholder="you@example.com"
            value={data.email} onChange={v => setData(d => ({ ...d, email: v }))} />

          <PasswordField label="Password" placeholder="Create a password"
            value={data.password} onChange={v => setData(d => ({ ...d, password: v }))}
            show={showPass} onToggle={() => setShowPass(s => !s)} />

          <StrengthBar password={data.password} />

          <PasswordField label="Confirm Password" placeholder="Repeat your password"
            value={data.confirm} onChange={v => setData(d => ({ ...d, confirm: v }))}
            show={showConfirm} onToggle={() => setShowConfirm(s => !s)} />

          <PinkButton type="submit">Create Account</PinkButton>

          <Divider />

          <GoogleButton />

          <p className="text-center text-xs text-gray-400">
            Already have an account?{' '}
            <button type="button"  className="font-bold" style={{ color: '#e91e8c' }}>
              Sign in
            </button>
          </p>

          <p className="text-center text-xs text-gray-300">
            By continuing you agree to ShopHub's{' '}
            <span className="underline cursor-pointer" style={{ color: '#e91e8c' }}>Terms</span> &{' '}
            <span className="underline cursor-pointer" style={{ color: '#e91e8c' }}>Privacy</span>
          </p>
        </div>
      </div>
    </div>
  )
}
