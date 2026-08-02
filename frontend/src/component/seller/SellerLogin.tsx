'use client'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import {
  SellerBrandPanel,
  Field,
  PasswordField,
  PurpleButton,
  Divider,
  GoogleButton,
} from './SellerAuthLayout'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { toast } from 'sonner'
import { authLogin } from '@/redux/auth/auth.Action'


export default function SellerLogin() {
  const [data, setData] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector((state)=>state.auth)
  const handleSubmit = async () => {
    if (!data.email || !data.password) return
    try {
      const res = await dispatch(authLogin(data)).unwrap();
      toast.success(res.message)
      await new Promise(r => setTimeout(r, 1800))
      router.replace('/seller/dashboard')
    } catch (error:any) {
      toast.error(error)
    }
  }

  return (
    <div
      className="flex rounded-2xl overflow-hidden"
      style={{
        boxShadow: '0 20px 60px rgba(124,58,237,0.18), 0 4px 16px rgba(0,0,0,0.08)',
        maxWidth: 720,
      }}
    >
      <SellerBrandPanel />

      <div className="bg-white w-80 shrink-0 flex flex-col">
        {/* Tabs */}
        <div className="border-b border-gray-100 flex">
          <button
            className="flex-1 py-3.5 text-xs font-bold tracking-wide"
            style={{ color: '#7c3aed', borderBottom: '2px solid #7c3aed' }}
          >
            Sign In
          </button>
          <button
            onClick={()=>router.push('/seller/signup')}
            className="flex-1 py-3.5 text-xs font-bold tracking-wide text-gray-400 hover:text-purple-400 transition-colors"
            style={{ borderBottom: '2px solid transparent' }}
          >
            Create Account
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4 flex-1">
          <div>
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-3"
              style={{ background: '#f3e8ff', color: '#7c3aed' }}
            >
              <span>🏪</span> Seller Account
            </div>
            <h2 className="text-lg font-black text-gray-800 mb-0.5" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Welcome back!
            </h2>
            <p className="text-gray-400 text-xs">Sign in to your seller dashboard</p>
          </div>

          <Field
            label="Business Email"
            type="email"
            placeholder="seller@business.com"
            value={data.email}
            onChange={v => setData(d => ({ ...d, email: v }))}
          />

          <PasswordField
            label="Password"
            placeholder="Enter your password"
            value={data.password}
            onChange={v => setData(d => ({ ...d, password: v }))}
            show={showPass}
            onToggle={() => setShowPass(s => !s)}
          />

          <div className="flex justify-end -mt-1">
            <button
              type="button"
              className="text-xs font-semibold hover:opacity-80 transition-opacity"
              style={{ color: '#7c3aed' }}
            >
              Forgot Password?
            </button>
          </div>

          <PurpleButton onClick={handleSubmit} disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign In to Dashboard'}
          </PurpleButton>

          <Divider />

          <GoogleButton />

          <p className="text-center text-xs text-gray-400">
            New seller?{' '}
            <button
              type="button"
              onClick={()=>router.push('/seller/signup')}
              className="font-bold hover:opacity-80 transition-opacity"
              style={{ color: '#7c3aed' }}
            >
              Create seller account
            </button>
          </p>

          <p className="text-center text-xs text-gray-300">
            By signing in you agree to ShopHub's{' '}
            <span className="underline cursor-pointer hover:text-purple-400 transition-colors" style={{ color: '#a78bfa' }}>
              Seller Terms
            </span>{' '}
            &{' '}
            <span className="underline cursor-pointer hover:text-purple-400 transition-colors" style={{ color: '#a78bfa' }}>
              Privacy Policy
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
