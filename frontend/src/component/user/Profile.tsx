'use client'
import { useState, useRef } from 'react'
import { Pencil, Check, X, Camera } from 'lucide-react'
import { USER } from './userData'

function ReadonlyField({ label, value, editing, type = 'text', onChange }: {
  label: string; value: string; editing: boolean; type?: string; onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-500 tracking-wide uppercase">{label}</label>
      <input
        type={type}
        value={value}
        readOnly={!editing}
        onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all outline-none"
        style={{
          border: editing ? '1.5px solid #7c3aed' : '1.5px solid #e9d5ff',
          background: editing ? '#fff' : '#faf5ff',
          color: '#111',
          cursor: editing ? 'text' : 'default',
        }}
      />
    </div>
  )
}

function GenderField({ value, editing, onChange }: {
  value: string; editing: boolean; onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-500 tracking-wide uppercase">Gender</label>
      <select
        value={value}
        disabled={!editing}
        onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all outline-none appearance-none"
        style={{
          border: editing ? '1.5px solid #7c3aed' : '1.5px solid #e9d5ff',
          background: editing ? '#fff' : '#faf5ff',
          color: '#111',
          cursor: editing ? 'pointer' : 'default',
        }}
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
        <option value="prefer_not">Prefer not to say</option>
      </select>
    </div>
  )
}

export default function Profile() {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ ...USER })
  const [saved, setSaved] = useState({ ...USER })
  const [avatar, setAvatar] = useState<string>('')
  const fileRef = useRef<HTMLInputElement>(null)

  const set = (k: keyof typeof form) => (v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSave = () => {
    setSaved({ ...form })
    setEditing(false)
  }

  const handleCancel = () => {
    setForm({ ...saved })
    setEditing(false)
  }

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setAvatar(URL.createObjectURL(file))
  }

  const initials = `${form.firstName[0] ?? ''}${form.lastName[0] ?? ''}`.toUpperCase()

  return (
    <div className="max-w-2xl flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>My Profile</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your personal information</p>
      </div>

      {/* Card */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #f0ebff', boxShadow: '0 2px 16px rgba(124,58,237,0.07)' }}>
        {/* Top banner */}
        <div className="h-24 relative" style={{ background: 'linear-gradient(135deg, #7c3aed, #e91e8c)' }}>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all hover:bg-white/20"
              style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              <Pencil className="w-3.5 h-3.5" /> Edit Profile
            </button>
          )}
          {editing && (
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={handleCancel}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all hover:bg-white/20"
                style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}
              >
                <X className="w-3.5 h-3.5" /> Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold"
                style={{ background: '#fff', color: '#7c3aed' }}
              >
                <Check className="w-3.5 h-3.5" /> Save
              </button>
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-10 mb-6">
            <div className="relative">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-black text-xl overflow-hidden"
                style={{
                  background: avatar ? 'transparent' : 'linear-gradient(135deg, #e91e8c, #a855f7)',
                  border: '3px solid #fff',
                  boxShadow: '0 4px 16px rgba(124,58,237,0.2)',
                }}
              >
                {avatar
                  ? <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                  : initials
                }
              </div>
              {editing && (
                <button
                  onClick={() => fileRef.current?.click()}
                  className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full flex items-center justify-center text-white shadow-md"
                  style={{ background: '#7c3aed' }}
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              )}
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
            </div>
            <div className="pb-1">
              <p className="font-black text-gray-800 text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {saved.firstName} {saved.lastName}
              </p>
              <p className="text-xs text-gray-400">{saved.email}</p>
            </div>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ReadonlyField
              label="First Name"
              value={form.firstName}
              editing={editing}
              onChange={set('firstName')}
            />
            <ReadonlyField
              label="Last Name"
              value={form.lastName}
              editing={editing}
              onChange={set('lastName')}
            />
            <ReadonlyField
              label="Phone Number"
              type="tel"
              value={form.phone}
              editing={editing}
              onChange={set('phone')}
            />
            <ReadonlyField
              label="Email Address"
              type="email"
              value={form.email}
              editing={editing}
              onChange={set('email')}
            />
            <GenderField
              value={form.gender}
              editing={editing}
              onChange={set('gender')}
            />
            <ReadonlyField
              label="Date of Birth"
              type="date"
              value={form.dob}
              editing={editing}
              onChange={set('dob')}
            />
          </div>

          {/* Edit hint */}
          {!editing && (
            <p className="text-xs text-gray-400 mt-5 flex items-center gap-1.5">
              <Pencil className="w-3 h-3" />
              Click "Edit Profile" to update your information
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
