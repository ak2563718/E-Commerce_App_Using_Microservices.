import { useState } from 'react'
import type { Address } from './Addressess'

type FormData = Omit<Address, 'id' | 'isDefault'>

interface Props {
  initial?: Address
  onSubmit: (data: FormData) => void
  onCancel: () => void
}

const EMPTY: FormData = {
  label: '',
  fullName: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  zip: '',
  country: 'United States',
  phone: '',
}

const LABEL_OPTIONS = ['Home', 'Work', 'Other']

const COUNTRIES = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Germany',
  'France',
  'India',
  'Japan',
]

export default function AddressForm({ initial, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<FormData>(
    initial
      ? { label: initial.label, fullName: initial.fullName, line1: initial.line1,
          line2: initial.line2, city: initial.city, state: initial.state,
          zip: initial.zip, country: initial.country, phone: initial.phone }
      : EMPTY
  )
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const set = (key: keyof FormData, val: string) => {
    setForm((prev) => ({ ...prev, [key]: val }))
    setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  const validate = () => {
    const e: Partial<Record<keyof FormData, string>> = {}
    if (!form.fullName.trim()) e.fullName = 'Full name is required'
    if (!form.line1.trim()) e.line1 = 'Street address is required'
    if (!form.city.trim()) e.city = 'City is required'
    if (!form.state.trim()) e.state = 'State is required'
    if (!form.zip.trim()) e.zip = 'ZIP code is required'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    onSubmit(form)
  }

  const Field = ({
    label, field, placeholder, required, half
  }: {
    label: string
    field: keyof FormData
    placeholder?: string
    required?: boolean
    half?: boolean
  }) => (
    <div className={half ? 'col-span-1' : 'col-span-2'}>
      <label className="block text-xs font-semibold text-stone-500 mb-1 tracking-wide uppercase">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <input
        type="text"
        value={form[field] as string}
        onChange={(e) => set(field, e.target.value)}
        placeholder={placeholder}
        className={`w-full px-3 py-2.5 rounded-lg border text-sm text-stone-800 bg-stone-50 outline-none transition-all duration-150
          focus:bg-white focus:border-stone-600 focus:ring-2 focus:ring-stone-200
          ${errors[field] ? 'border-red-400 bg-red-50' : 'border-stone-200'}`}
      />
      {errors[field] && (
        <p className="text-xs text-red-500 mt-1">{errors[field]}</p>
      )}
    </div>
  )

  return (
    <div
      className="bg-white rounded-2xl shadow-2xl border border-stone-100 overflow-hidden"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Form header */}
      <div className="px-6 pt-6 pb-4 border-b border-stone-100 flex items-center justify-between">
        <div>
          <h2
            className="text-xl font-bold text-stone-800"
            style={{ fontFamily: "'Lora', serif" }}
          >
            {initial ? 'Edit Address' : 'Add New Address'}
          </h2>
          <p className="text-stone-400 text-xs mt-0.5">
            {initial ? 'Update the details below.' : 'Fill in your address details.'}
          </p>
        </div>
        <button
          onClick={onCancel}
          className="w-8 h-8 flex items-center justify-center rounded-full text-stone-400 hover:bg-stone-100 hover:text-stone-600 transition-colors text-lg"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {/* Label selector */}
        <div>
          <label className="block text-xs font-semibold text-stone-500 mb-2 tracking-wide uppercase">
            Address Label
          </label>
          <div className="flex gap-2">
            {LABEL_OPTIONS.map((opt) => (
              <button
                type="button"
                key={opt}
                onClick={() => set('label', opt)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  form.label === opt
                    ? 'bg-stone-800 text-stone-50 border-stone-800'
                    : 'bg-stone-50 text-stone-500 border-stone-200 hover:border-stone-400'
                }`}
              >
                {opt}
              </button>
            ))}
            {!LABEL_OPTIONS.includes(form.label) && form.label && (
              <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-stone-800 text-stone-50 border border-stone-800">
                {form.label}
              </span>
            )}
          </div>
        </div>

        {/* Grid fields */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Full Name" field="fullName" placeholder="Jane Smith" required />
          <Field label="Phone" field="phone" placeholder="+1 (555) 000-0000" half />
          <Field label="Address Line 1" field="line1" placeholder="123 Main St" required />
          <Field label="Address Line 2" field="line2" placeholder="Apt, Suite, etc." />
          <Field label="City" field="city" placeholder="Portland" required half />
          <Field label="State / Province" field="state" placeholder="OR" required half />
          <Field label="ZIP / Postal Code" field="zip" placeholder="97201" required half />

          {/* Country dropdown */}
          <div className="col-span-1">
            <label className="block text-xs font-semibold text-stone-500 mb-1 tracking-wide uppercase">
              Country
            </label>
            <select
              value={form.country}
              onChange={(e) => set('country', e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm text-stone-800 bg-stone-50 outline-none focus:bg-white focus:border-stone-600 focus:ring-2 focus:ring-stone-200 transition-all duration-150"
            >
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <button
            type="submit"
            className="flex-1 py-2.5 bg-stone-800 text-stone-50 text-sm font-semibold rounded-lg hover:bg-stone-700 active:scale-95 transition-all duration-150"
          >
            {initial ? 'Save Changes' : 'Add Address'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 bg-stone-100 text-stone-600 text-sm font-semibold rounded-lg hover:bg-stone-200 active:scale-95 transition-all duration-150"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
