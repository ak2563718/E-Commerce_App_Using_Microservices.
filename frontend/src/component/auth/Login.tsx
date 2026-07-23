'use client'
import { useState } from 'react'
import { BrandPanel, Divider, Field, GoogleButton, PasswordField, PinkButton } from './AuthLayout'
import { useRouter } from 'next/navigation'


export default function Login() {
  const router = useRouter()
  const [data, setData] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)

  return (
    <div className="flex rounded-2xl overflow-hidden shadow-2xl" style={{ boxShadow: '0 16px 48px rgba(233,30,140,0.18)', maxWidth: 740 }}>
      <BrandPanel />

      <div className="bg-white w-80 shrink-0">
        <div className="border-b border-gray-100 flex">
          <button  className="flex-1 py-3.5 text-xs font-bold tracking-wide" style={{ color: '#e91e8c', borderBottom: '2px solid #e91e8c' }}>
            Sign In
          </button>
          <button onClick={()=>router.push('/signup')}  className="flex-1 py-3.5 text-xs font-bold tracking-wide text-gray-400 hover:text-pink-400 transition-colors" style={{ borderBottom: '2px solid transparent' }}>
            Create Account
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-black text-gray-800 mb-0.5">Welcome back!</h2>
            <p className="text-gray-400 text-xs">Sign in to continue shopping</p>
          </div>

          <Field label="Email" type="email" placeholder="you@example.com"
            value={data.email} onChange={v => setData(d => ({ ...d, email: v }))} />

          <PasswordField label="Password" placeholder="Enter your password"
            value={data.password} onChange={v => setData(d => ({ ...d, password: v }))}
            show={showPass} onToggle={() => setShowPass(s => !s)} />

          <div className="flex justify-end -mt-1">
            <button type="button" className="text-xs font-semibold" style={{ color: '#e91e8c' }}>
              Forgot Password?
            </button>
          </div>

          <PinkButton  type="submit">Sign In</PinkButton>

          <Divider />

          <GoogleButton />

          <p className="text-center text-xs text-gray-400">
            New to ShopHub?{' '}
            <button type="button"  className="font-bold" style={{ color: '#e91e8c' }}>
              Create account
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
