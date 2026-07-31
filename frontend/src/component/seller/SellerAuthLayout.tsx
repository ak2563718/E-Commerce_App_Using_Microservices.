'use client'
import { type ReactNode, useState } from 'react'
import { Eye, EyeOff, ShoppingBag, Store, TrendingUp, Package, Star } from 'lucide-react'

// ── Brand Panel ─────────────────────────────────────────────────────────────
export function SellerBrandPanel() {
  return (
    <div
      className="w-72 shrink-0 flex flex-col justify-between p-8 relative overflow-hidden"
      style={{
        background: 'linear-gradient(155deg, #1a0533 0%, #2d0a5e 45%, #4c1a8c 100%)',
      }}
    >
      {/* Background orbs */}
      <div
        className="absolute rounded-full opacity-20"
        style={{
          width: 240,
          height: 240,
          background: 'radial-gradient(circle, #a855f7, transparent)',
          top: -60,
          right: -60,
        }}
      />
      <div
        className="absolute rounded-full opacity-15"
        style={{
          width: 180,
          height: 180,
          background: 'radial-gradient(circle, #e91e8c, transparent)',
          bottom: 40,
          left: -40,
        }}
      />

      {/* Logo */}
      <div className="relative">
        <div className="flex items-center gap-2.5 mb-1">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #e91e8c, #a855f7)' }}
          >
            <Store className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
            ShopHub
          </span>
        </div>
        <span
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: '#a855f7', letterSpacing: '0.18em' }}
        >
          Seller Portal
        </span>
      </div>

      {/* Center content */}
      <div className="relative flex flex-col gap-6">
        <div>
          <h2
            className="text-2xl font-black text-white leading-tight mb-2"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Grow your<br />
            <span style={{ color: '#c084fc' }}>business</span> with us
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Join thousands of sellers reaching millions of shoppers on ShopHub.
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-col gap-3">
          {[
            { icon: TrendingUp, value: '2M+', label: 'Active buyers' },
            { icon: Package, value: '500K+', label: 'Products listed' },
            { icon: Star, value: '4.8★', label: 'Seller satisfaction' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: 'rgba(168,85,247,0.2)', border: '1px solid rgba(168,85,247,0.3)' }}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: '#c084fc' }} />
              </div>
              <div>
                <div className="text-white font-bold text-sm leading-none">{value}</div>
                <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative">
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
          © 2025 ShopHub · All rights reserved
        </p>
      </div>
    </div>
  )
}

// ── Shared form components ───────────────────────────────────────────────────
interface FieldProps {
  label: string
  type?: string
  placeholder?: string
  value: string
  onChange: (v: string) => void
}

export function Field({ label, type = 'text', placeholder, value, onChange }: FieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-600 tracking-wide">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2.5 text-sm rounded-xl border outline-none transition-all"
        style={{
          border: '1.5px solid #e5e7eb',
          background: '#fafafa',
          color: '#111',
        }}
        onFocus={e => {
          e.currentTarget.style.border = '1.5px solid #7c3aed'
          e.currentTarget.style.background = '#fff'
        }}
        onBlur={e => {
          e.currentTarget.style.border = '1.5px solid #e5e7eb'
          e.currentTarget.style.background = '#fafafa'
        }}
      />
    </div>
  )
}

interface PasswordFieldProps extends Omit<FieldProps, 'type'> {
  show: boolean
  onToggle: () => void
}

export function PasswordField({ label, placeholder, value, onChange, show, onToggle }: PasswordFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-600 tracking-wide">{label}</label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full px-3 py-2.5 pr-10 text-sm rounded-xl border outline-none transition-all"
          style={{
            border: '1.5px solid #e5e7eb',
            background: '#fafafa',
            color: '#111',
          }}
          onFocus={e => {
            e.currentTarget.style.border = '1.5px solid #7c3aed'
            e.currentTarget.style.background = '#fff'
          }}
          onBlur={e => {
            e.currentTarget.style.border = '1.5px solid #e5e7eb'
            e.currentTarget.style.background = '#fafafa'
          }}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}

interface PurpleButtonProps {
  onClick?: () => void
  type?: 'button' | 'submit'
  children: ReactNode
  disabled?: boolean
}

export function PurpleButton({ onClick, type = 'button', children, disabled }: PurpleButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full py-2.5 rounded-xl text-white text-sm font-bold tracking-wide flex items-center justify-center gap-2 transition-opacity active:scale-[0.98]"
      style={{
        background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
        boxShadow: '0 4px 16px rgba(124,58,237,0.35)',
        opacity: disabled ? 0.7 : 1,
      }}
    >
      {children}
    </button>
  )
}

export function Divider() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px bg-gray-100" />
      <span className="text-xs text-gray-300 font-medium">or</span>
      <div className="flex-1 h-px bg-gray-100" />
    </div>
  )
}

export function GoogleButton() {
  return (
    <button
      type="button"
      className="w-full py-2.5 rounded-xl border text-sm font-medium text-gray-600 flex items-center justify-center gap-2.5 transition-all hover:border-purple-300 hover:bg-purple-50"
      style={{ border: '1.5px solid #e5e7eb' }}
    >
      <svg width="16" height="16" viewBox="0 0 18 18">
        <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
        <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
        <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
        <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"/>
      </svg>
      Continue with Google
    </button>
  )
}
