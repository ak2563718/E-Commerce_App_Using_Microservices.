'use client'
import { useState } from 'react'
import type { Address } from './Addressess'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { createAddress } from '@/redux/user/address.type'

type FormData = Omit<Address, 'id' | 'isDefault'>

interface Props {
  initial?: Address
  onSubmit: (data: FormData) => void
  onCancel: () => void
}

const EMPTY: FormData = {
  label: 'Home',
  fullName: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  zip: '',
  country: 'India',
  phone: '',
}

const LABEL_OPTIONS = ['HOME', 'WORK', 'OTHER']
const COUNTRIES = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'India', 'Japan']

export default function AddressForm({ initial, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<FormData>(
    initial
      ? { label: initial.label, fullName: initial.fullName, line1: initial.line1,
          line2: initial.line2, city: initial.city, state: initial.state,
          zip: initial.zip, country: initial.country, phone: initial.phone }
      : EMPTY
  )
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state)=>state.user)
  const set = (key: keyof FormData, val: string) => {
    setForm((prev) => ({ ...prev, [key]: val }))
    setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  const validate = () => {
    const e: Partial<Record<keyof FormData, string>> = {}
    if (!form.fullName.trim()) e.fullName = 'Required'
    if (!form.line1.trim()) e.line1 = 'Required'
    if (!form.city.trim()) e.city = 'Required'
    if (!form.state.trim()) e.state = 'Required'
    if (!form.zip.trim()) e.zip = 'Required'
    return e
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    const res = await dispatch(createAddress(form)).unwrap()
    console.log(form)
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    onSubmit(form)
  }

  const inputCls = (field: keyof FormData) =>
    `w-full px-3 py-2 rounded-lg border text-sm text-gray-800 outline-none transition-all duration-150
    focus:ring-2 focus:ring-pink-200 focus:border-pink-400
    ${errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'}`

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden" style={{ fontFamily: "'Outfit', sans-serif" }}>
      {/* Pink gradient header */}
      <div
        className="px-5 py-4 flex items-center justify-between"
        style={{ background: 'linear-gradient(135deg, #111111 0%, #ec4899 100%)' }}
      >
        <div>
          <h2 className="text-base font-bold text-white" style={{ fontFamily: "'Lora', serif" }}>
            {initial ? 'Edit Address' : 'Add New Address'}
          </h2>
          <p className="text-pink-200 text-xs mt-0.5">
            {initial ? 'Update your details' : 'Enter your address details'}
          </p>
        </div>
        <button
          onClick={onCancel}
          className="w-7 h-7 flex items-center justify-center rounded-full text-pink-200 hover:bg-white/20 transition-colors text-xl leading-none"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        {/* Label pills */}
        <div className="flex gap-2">
          {LABEL_OPTIONS.map((opt) => (
            <button
              type="button"
              key={opt}
              onClick={() => set('label', opt)}
              className="px-3 py-1 rounded-full text-xs font-semibold border transition-all"
              style={
                form.label === opt
                  ? { background: 'linear-gradient(135deg, #111 0%, #ec4899 100%)', color: '#fff', borderColor: 'transparent' }
                  : { background: '#fff', color: '#9ca3af', borderColor: '#fce7f3' }
              }
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Row: Full Name + Phone */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Full Name *</label>
            <input className={inputCls('fullName')} value={form.fullName} onChange={(e) => set('fullName', e.target.value)} placeholder="Jane Smith" />
            {errors.fullName && <p className="text-xs text-red-400 mt-0.5">{errors.fullName}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Phone</label>
            <input className={inputCls('phone')} value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+1 (555) 000-0000" />
          </div>
        </div>

        {/* Address Line 1 */}
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1">Street Address *</label>
          <input className={inputCls('line1')} value={form.line1} onChange={(e) => set('line1', e.target.value)} placeholder="123 Main St" />
          {errors.line1 && <p className="text-xs text-red-400 mt-0.5">{errors.line1}</p>}
        </div>

        {/* Row: City + State + ZIP */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">City *</label>
            <input className={inputCls('city')} value={form.city} onChange={(e) => set('city', e.target.value)} placeholder="Portland" />
            {errors.city && <p className="text-xs text-red-400 mt-0.5">{errors.city}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">State *</label>
            <input className={inputCls('state')} value={form.state} onChange={(e) => set('state', e.target.value)} placeholder="OR" />
            {errors.state && <p className="text-xs text-red-400 mt-0.5">{errors.state}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">ZIP *</label>
            <input className={inputCls('zip')} value={form.zip} onChange={(e) => set('zip', e.target.value)} placeholder="97201" />
            {errors.zip && <p className="text-xs text-red-400 mt-0.5">{errors.zip}</p>}
          </div>
        </div>

        {/* Country */}
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1">Country</label>
          <select
            value={form.country}
            onChange={(e) => set('country', e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-800 bg-gray-50 outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400 focus:bg-white transition-all"
          >
            {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <button
            type="submit"
            className="flex-1 py-2.5 text-white text-sm font-bold rounded-xl active:scale-95 transition-all shadow-sm hover:shadow-md"
            style={{ background: 'linear-gradient(135deg, #111111 0%, #ec4899 100%)' }}
          >
            {initial ? 'Save Changes' : 'Add Address'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 bg-gray-100 text-gray-500 text-sm font-semibold rounded-xl hover:bg-gray-200 active:scale-95 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
