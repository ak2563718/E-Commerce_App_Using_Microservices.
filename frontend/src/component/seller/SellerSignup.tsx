'use client'
import { useState } from 'react'
import { Loader2, ChevronLeft, Check } from 'lucide-react'
import {
  SellerBrandPanel,
  PurpleButton,
  GoogleButton,
  Divider,
} from './SellerAuthLayout'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { sellerSignup } from '@/redux/auth/auth.Action'
import { toast } from 'sonner'

interface Props {
  onGoLogin: () => void
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-xs font-semibold text-gray-600 tracking-wide">{children}</label>
}

function Field({ label, placeholder, value, onChange, type = 'text' }: {
  label: string; placeholder?: string; value: string; onChange: (v: string) => void; type?: string
}) {
  return (
    <div className="flex flex-col gap-1">
      <Label>{label}</Label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all"
        style={{ border: '1.5px solid #e5e7eb', background: '#fafafa', color: '#111' }}
        onFocus={e => { e.currentTarget.style.border = '1.5px solid #7c3aed'; e.currentTarget.style.background = '#fff' }}
        onBlur={e => { e.currentTarget.style.border = '1.5px solid #e5e7eb'; e.currentTarget.style.background = '#fafafa' }}
      />
    </div>
  )
}

export default function SellerSignup({ onGoLogin }: Props) {
  const [done, setDone] = useState(false)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { loading, accessToken } = useAppSelector((state)=>state.auth)
  const [form, setForm] = useState({
    businessName: '',
    businessEmail: '',
    businessPhone: '',
    gstNumber: '',
    panNumber: '',
    businessAddress: '',
    description: '',
  })

  const set = (k: keyof typeof form) => (v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async () => {
    try {
      const res = await dispatch(sellerSignup({formData:form,accessToken})).unwrap()
      toast.success(res.message)
      await new Promise(r => setTimeout(r, 1800))
      setDone(true)
    } catch (error:any) {
      toast.error(error)
      setDone(false)
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

      <div className="bg-white flex flex-col" style={{ width: 400 }}>
        {/* Tabs */}
        <div className="border-b border-gray-100 flex shrink-0">
          <button
            onClick={()=>router.push('/seller/login')}
            className="flex-1 py-3.5 text-xs font-bold tracking-wide text-gray-400 hover:text-purple-400 transition-colors"
            style={{ borderBottom: '2px solid transparent' }}
          >
            Sign In
          </button>
          <button
            className="flex-1 py-3.5 text-xs font-bold tracking-wide"
            style={{ color: '#7c3aed', borderBottom: '2px solid #7c3aed' }}
          >
            Create Account
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4" style={{ maxHeight: 560 }}>
          {!done ? (
            <>
              <div>
                <div
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-3"
                  style={{ background: '#f3e8ff', color: '#7c3aed' }}
                >
                  <span>🏪</span> Seller Registration
                </div>
                <h2 className="text-lg font-black text-gray-800 mb-0.5" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Register your business
                </h2>
                <p className="text-xs text-gray-400">Fill in your business details to get started</p>
              </div>

              <Field
                label="Business Name"
                placeholder="e.g. Priya's Fabrics"
                value={form.businessName}
                onChange={set('businessName')}
              />

              <Field
                label="Business Email"
                type="email"
                placeholder="business@example.com"
                value={form.businessEmail}
                onChange={set('businessEmail')}
              />

              <Field
                label="Business Phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={form.businessPhone}
                onChange={set('businessPhone')}
              />

              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="GST Number"
                  placeholder="22ABCDE1234F1Z5"
                  value={form.gstNumber}
                  onChange={set('gstNumber')}
                />
                <Field
                  label="PAN Number"
                  placeholder="ABCDE1234F"
                  value={form.panNumber}
                  onChange={set('panNumber')}
                />
              </div>

              <Field
                label="Business Address"
                placeholder="Street, City, State, PIN"
                value={form.businessAddress}
                onChange={set('businessAddress')}
              />

              <div className="flex flex-col gap-1">
                <Label>Business Description</Label>
                <textarea
                  placeholder="Briefly describe what your business sells..."
                  value={form.description}
                  onChange={e => set('description')(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none transition-all"
                  style={{ border: '1.5px solid #e5e7eb', background: '#fafafa', color: '#111', lineHeight: 1.6 }}
                  onFocus={e => { e.currentTarget.style.border = '1.5px solid #7c3aed'; e.currentTarget.style.background = '#fff' }}
                  onBlur={e => { e.currentTarget.style.border = '1.5px solid #e5e7eb'; e.currentTarget.style.background = '#fafafa' }}
                />
              </div>

              <PurpleButton onClick={handleSubmit} disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Seller Account'}
              </PurpleButton>

              <Divider />
              <GoogleButton />

              <p className="text-center text-xs text-gray-400">
                Already a seller?{' '}
                <button
                  type="button"
                  onClick={onGoLogin}
                  className="font-bold hover:opacity-80 transition-opacity"
                  style={{ color: '#7c3aed' }}
                >
                  Sign in
                </button>
              </p>

              <p className="text-center text-xs text-gray-300">
                By registering you agree to ShopHub's{' '}
                <span className="underline cursor-pointer" style={{ color: '#a78bfa' }}>Seller Terms</span>
                {' '}&{' '}
                <span className="underline cursor-pointer" style={{ color: '#a78bfa' }}>Privacy Policy</span>
              </p>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center flex-1 gap-5 py-10 text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', boxShadow: '0 8px 24px rgba(124,58,237,0.35)' }}
              >
                <Check className="w-8 h-8 text-white" strokeWidth={3} />
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-800 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  You're registered!
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed max-w-[240px] mx-auto">
                  Your seller account is under review. We'll email you within 24 hours.
                </p>
              </div>
              <button
                onClick={onGoLogin}
                className="flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity"
                style={{ color: '#7c3aed' }}
              >
                <ChevronLeft className="w-4 h-4" /> Back to Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
