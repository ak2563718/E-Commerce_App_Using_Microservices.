'use client'
import { useState } from 'react'
import { Loader2, ChevronLeft, ChevronRight, Check } from 'lucide-react'
import {
  SellerBrandPanel,
  Field,
  PasswordField,
  PurpleButton,
  Divider,
  GoogleButton,
} from './SellerAuthLayout'
import { useRouter } from 'next/navigation'



const CATEGORIES = [
  'Electronics', 'Fashion', 'Home & Garden', 'Sports',
  'Books', 'Beauty', 'Toys', 'Food & Grocery', 'Automotive', 'Other',
]

export default function SellerSignup() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const router = useRouter()

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    businessType: '' as '' | 'individual' | 'company',
    category: '',
    gstin: '',
  })

  const set = (k: keyof typeof form) => (v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleNext = () => {
    if (step < 3) setStep(s => s + 1)
  }
  const handleBack = () => {
    if (step > 1) setStep(s => s - 1)
  }

  const handleSubmit = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 2000))
    setLoading(false)
    setStep(4)
  }

  const steps = ['Account', 'Business', 'Details']

  return (
    <div 
      className="flex rounded-2xl overflow-hidden mt-6"
      style={{
        boxShadow: '0 20px 60px rgba(124,58,237,0.18), 0 4px 16px rgba(0,0,0,0.08)',
        maxWidth: 720,
      }}
    >
      <SellerBrandPanel />

      <div className="bg-white flex flex-col" style={{ width: 380 }}>
        {/* Tabs */}
        <div className="border-b border-gray-100 flex">
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

        <div className="p-6 flex flex-col gap-4 flex-1 overflow-y-auto">
          {step < 4 && (
            <>
              {/* Header */}
              <div>
                <div
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-3"
                  style={{ background: '#f3e8ff', color: '#7c3aed' }}
                >
                  <span>🏪</span> Seller Registration
                </div>
                <h2 className="text-lg font-black text-gray-800 mb-0.5" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {step === 1 && 'Create your account'}
                  {step === 2 && 'Business info'}
                  {step === 3 && 'Final details'}
                </h2>
                <p className="text-gray-400 text-xs">Step {step} of 3 — {steps[step - 1]}</p>
              </div>

              {/* Progress bar */}
              <div className="flex gap-1.5">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className="h-1 flex-1 rounded-full transition-all duration-300"
                    style={{ background: i < step ? '#7c3aed' : '#e5e7eb' }}
                  />
                ))}
              </div>
            </>
          )}

          {/* ── Step 1: Account ── */}
          {step === 1 && (
            <>
              <Field label="Full Name" placeholder="Jane Doe" value={form.fullName} onChange={set('fullName')} />
              <Field label="Email Address" type="email" placeholder="seller@business.com" value={form.email} onChange={set('email')} />
              <Field label="Phone Number" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} />
              <PasswordField
                label="Password"
                placeholder="Create a strong password"
                value={form.password}
                onChange={set('password')}
                show={showPass}
                onToggle={() => setShowPass(s => !s)}
              />
              <PasswordField
                label="Confirm Password"
                placeholder="Repeat your password"
                value={form.confirmPassword}
                onChange={set('confirmPassword')}
                show={showConfirm}
                onToggle={() => setShowConfirm(s => !s)}
              />

              <PurpleButton onClick={handleNext}>
                Continue <ChevronRight className="w-4 h-4" />
              </PurpleButton>

              <Divider />
              <GoogleButton />

              <p className="text-center text-xs text-gray-400">
                Already a seller?{' '}
                <button
                  type="button"
                  onClick={()=>router.push('/seller/login')}
                  className="font-bold hover:opacity-80 transition-opacity"
                  style={{ color: '#7c3aed' }}
                >
                  Sign in
                </button>
              </p>
            </>
          )}

          {/* ── Step 2: Business ── */}
          {step === 2 && (
            <>
              <Field
                label="Business / Store Name"
                placeholder="My Awesome Store"
                value={form.businessName}
                onChange={set('businessName')}
              />

              {/* Business type */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600 tracking-wide">Business Type</label>
                <div className="flex gap-2">
                  {(['individual', 'company'] as const).map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, businessType: type }))}
                      className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all capitalize"
                      style={
                        form.businessType === type
                          ? { background: '#7c3aed', color: '#fff', border: '1.5px solid #7c3aed' }
                          : { background: '#fafafa', color: '#6b7280', border: '1.5px solid #e5e7eb' }
                      }
                    >
                      {type === 'individual' ? '👤 Individual' : '🏢 Company'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600 tracking-wide">Primary Category</label>
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, category: cat }))}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all"
                      style={
                        form.category === cat
                          ? { background: '#7c3aed', color: '#fff' }
                          : { background: '#f3f4f6', color: '#6b7280' }
                      }
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-500 flex items-center justify-center gap-1 border border-gray-200 hover:border-purple-300 hover:text-purple-600 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <div className="flex-1">
                  <PurpleButton onClick={handleNext}>
                    Continue <ChevronRight className="w-4 h-4" />
                  </PurpleButton>
                </div>
              </div>
            </>
          )}

          {/* ── Step 3: Details ── */}
          {step === 3 && (
            <>
              <Field
                label="GSTIN (optional)"
                placeholder="22ABCDE1234F1Z5"
                value={form.gstin}
                onChange={set('gstin')}
              />

              {/* Summary card */}
              <div
                className="rounded-xl p-4 flex flex-col gap-2.5"
                style={{ background: '#faf5ff', border: '1px solid #e9d5ff' }}
              >
                <p className="text-xs font-bold text-purple-700 uppercase tracking-widest mb-1">Review Details</p>
                {[
                  { label: 'Name', value: form.fullName || '—' },
                  { label: 'Email', value: form.email || '—' },
                  { label: 'Store', value: form.businessName || '—' },
                  { label: 'Type', value: form.businessType || '—' },
                  { label: 'Category', value: form.category || '—' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{label}</span>
                    <span className="text-xs font-semibold text-gray-800 capitalize truncate ml-4 max-w-[160px]">{value}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-400 -mt-1">
                By registering you agree to ShopHub's{' '}
                <span className="underline cursor-pointer" style={{ color: '#a78bfa' }}>Seller Terms</span>
                {' '}&{' '}
                <span className="underline cursor-pointer" style={{ color: '#a78bfa' }}>Privacy Policy</span>.
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-500 flex items-center justify-center gap-1 border border-gray-200 hover:border-purple-300 hover:text-purple-600 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <div className="flex-1">
                  <PurpleButton onClick={handleSubmit} disabled={loading}>
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Account'}
                  </PurpleButton>
                </div>
              </div>
            </>
          )}

          {/* ── Step 4: Success ── */}
          {step === 4 && (
            <div className="flex flex-col items-center justify-center flex-1 gap-5 py-8 text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', boxShadow: '0 8px 24px rgba(124,58,237,0.35)' }}
              >
                <Check className="w-8 h-8 text-white" strokeWidth={3} />
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-800 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Welcome aboard!
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed max-w-[240px] mx-auto">
                  Your seller account has been created. Start listing your products today.
                </p>
              </div>
              <PurpleButton >
                Go to Sign In
              </PurpleButton>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
