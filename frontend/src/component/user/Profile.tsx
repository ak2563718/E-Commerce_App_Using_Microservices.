'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getProfile, updateProfile } from '@/redux/user/user.Action'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface ProfileData {
  firstName: string
  lastName: string
  email: string
  phone: string
  gender: string
  dob: string
}

const initial: ProfileData = {
  firstName: 'Priya',
  lastName: 'Sharma',
  email: 'priya.sharma@gmail.com',
  phone: '+91 98765 43210',
  gender: 'Female',
  dob: '1995-03-14',
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-xs font-700 uppercase tracking-wide" style={{ color: '#be185d', fontFamily: 'Outfit, sans-serif' }}>
      {children}
    </label>
  )
}

function Field({
  label, value, type = 'text', editing, onChange, icon,
}: {
  label: string; value: string; type?: string; editing: boolean; onChange: (v: string) => void; icon: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base pointer-events-none">{icon}</span>
        <input
          type={type}
          value={value}
          readOnly={!editing}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
          style={
            editing
              ? { border: '1.5px solid #f9a8d4', background: '#fdf2f8', color: '#831843', cursor: 'text', fontFamily: 'Outfit, sans-serif' }
              : { border: '1.5px solid #fce7f3', background: '#fff', color: '#9d174d', cursor: 'default', fontFamily: 'Outfit, sans-serif' }
          }
          onFocus={(e) => { if (editing) e.currentTarget.style.borderColor = '#db2777' }}
          onBlur={(e) => { if (editing) e.currentTarget.style.borderColor = '#f9a8d4' }}
        />
      </div>
    </div>
  )
}

function GenderField({ value, editing, onChange }: { value: string; editing: boolean; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>Gender</Label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base pointer-events-none">⚧️</span>
        {editing ? (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 appearance-none"
            style={{ border: '1.5px solid #f9a8d4', background: '#fdf2f8', color: '#831843', fontFamily: 'Outfit, sans-serif' }}
          >
            <option>FEMALE</option>
            <option>MALE</option>
            <option>OTHERS</option>
          </select>
        ) : (
          <input
            readOnly
            value={value}
            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
            style={{ border: '1.5px solid #fce7f3', background: '#fff', color: '#9d174d', cursor: 'default', fontFamily: 'Outfit, sans-serif' }}
          />
        )}
      </div>
    </div>
  )
}

export default function Profile() {
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState<any>(null)
  const [draft, setDraft] = useState<any>(null)
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state)=>state.user)
  
  useEffect(()=>{
     const userProfile = async()=>{
      const res = await dispatch(getProfile());
     }
     userProfile();
  },[])
  useEffect(()=>{
    if(user){
      setSaved(user)
      setDraft(user)
    }
  },[user])
  const set = (key: keyof ProfileData) => (v: string) => setDraft((d:any) => ({ ...d, [key]: v }))

  const handleSave = async() => { 
    try {
       setSaved(draft); 
       const res = await dispatch(updateProfile(draft)).unwrap()
       toast.success(res?.message)
       setEditing(false) 
    } catch (error:any) {
       toast.error(error)
    }
  }
  const handleCancel = () => { setDraft(saved); setEditing(false) }

  const current = editing ? draft : saved
  return (
    <div className="h-full flex flex-col " style={{ background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)' }}>
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-8 py-5 flex-shrink-0 relative bottom-5 rounded-xl"
        style={{ background: '#fff', borderBottom: '1px solid #fbcfe8', boxShadow: '0 1px 8px rgba(190,24,93,0.05)' }}
      >
        <div >
          <h1 className="text-2xl font-900 text-pink-900" style={{ fontFamily: 'Outfit, sans-serif' }}>My Profile</h1>
          <p className="text-sm font-500 mt-0.5" style={{ color: '#f472b6' }}>Manage your personal information</p>
        </div>
        <div className="flex gap-2">
          {editing ? (
            <>
              <button
                onClick={handleCancel}
                className="px-5 py-2.5 rounded-xl text-sm font-600 transition-all duration-200 cursor-pointer"
                style={{ border: '1.5px solid #fbcfe8', color: '#be185d', background: '#fff', fontFamily: 'Outfit, sans-serif' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = '#fdf2f8')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = '#fff')}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2.5 rounded-xl text-sm font-700 text-white transition-all duration-200 cursor-pointer active:scale-95"
                style={{ background: 'linear-gradient(135deg, #be185d, #ec4899)', boxShadow: '0 4px 14px rgba(190,24,93,0.3)', fontFamily: 'Outfit, sans-serif' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, #9d174d, #db2777)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, #be185d, #ec4899)')}
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-700 text-white transition-all duration-200 cursor-pointer active:scale-95"
              style={{ background: 'linear-gradient(135deg, #be185d, #ec4899)', boxShadow: '0 4px 14px rgba(190,24,93,0.3)', fontFamily: 'Outfit, sans-serif' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, #9d174d, #db2777)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, #be185d, #ec4899)')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 relative bottom-10">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {/* Avatar card */}
          <div
            className="rounded-2xl p-6 flex items-center gap-6"
            style={{ background: '#fff', border: '1px solid #fbcfe8', boxShadow: '0 2px 16px rgba(190,24,93,0.07)' }}
          >
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #fbcfe8, #f9a8d4)', boxShadow: '0 4px 20px rgba(219,39,119,0.2)' }}
            >
              👩
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-800 text-pink-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {saved?.firstName} {saved?.lastName}
              </h2>
              <p className="text-sm mt-1" style={{ color: '#f472b6' }}>{saved?.email}</p>
            </div>
          </div>

          {/* Form card */}
          <div
            className="rounded-2xl p-8 relative bottom-3"
            style={{ background: '#fff', border: '1px solid #fbcfe8', boxShadow: '0 2px 16px rgba(190,24,93,0.07)' }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-5 rounded-full" style={{ background: 'linear-gradient(180deg, #be185d, #ec4899)' }} />
              <h3 className="font-800 text-pink-900 text-base" style={{ fontFamily: 'Outfit, sans-serif' }}>Personal Information</h3>
              {editing && (
                <span
                  className="ml-auto text-xs font-600 px-2.5 py-1 rounded-full"
                  style={{ background: '#fdf2f8', color: '#db2777', border: '1px solid #fbcfe8' }}
                >
                  Editing mode
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-5">
              <Field label="First Name" value={current?.firstName} editing={editing} onChange={set('firstName')} icon="👤" />
              <Field label="Last Name" value={current?.lastName} editing={editing} onChange={set('lastName')} icon="👤" />
              <Field label="Email Address" type="email" value={current?.email} editing={editing} onChange={set('email')} icon="✉️" />
              <Field label="Phone Number" type="tel" value={current?.phone} editing={editing} onChange={set('phone')} icon="📱" />
              <GenderField value={current?.gender} editing={editing} onChange={set('gender')} />
              <Field label="Date of Birth" type="date" value={current?.dob?.split("T")[0]} editing={editing} onChange={set('dob')} icon="🎂" />
            </div>

            {editing && (
              <p className="text-xs text-center mt-6 font-500" style={{ color: '#f9a8d4' }}>
                Fields are editable — make your changes and click <strong style={{ color: '#db2777' }}>Save Changes</strong> to update
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
