'use client'
import { useState } from 'react'
import { Plus, Pencil, Trash2, MapPin, Star } from 'lucide-react'
import { ADDRESSES } from './userData'

export default function Addresses() {
  const [addresses, setAddresses] = useState(ADDRESSES)

  const setDefault = (id: number) =>
    setAddresses(a => a.map(x => ({ ...x, isDefault: x.id === id })))

  const remove = (id: number) =>
    setAddresses(a => a.filter(x => x.id !== id))

  return (
    <div className="max-w-2xl flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>Addresses</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage your delivery addresses</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
        >
          <Plus className="w-4 h-4" /> Add Address
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {addresses.map(addr => (
          <div
            key={addr.id}
            className="rounded-2xl p-5 flex flex-col gap-3 transition-all"
            style={{
              background: '#fff',
              border: addr.isDefault ? '1.5px solid #7c3aed' : '1px solid #f0ebff',
              boxShadow: addr.isDefault ? '0 4px 16px rgba(124,58,237,0.12)' : '0 2px 8px rgba(124,58,237,0.05)',
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#f3e8ff' }}>
                  <MapPin className="w-4 h-4" style={{ color: '#7c3aed' }} />
                </div>
                <span className="text-sm font-black text-gray-800">{addr.label}</span>
                {addr.isDefault && (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: '#f3e8ff', color: '#7c3aed' }}>
                    <Star className="w-2.5 h-2.5" style={{ fill: '#7c3aed' }} /> Default
                  </span>
                )}
              </div>
              <div className="flex gap-1">
                <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-purple-50 transition-colors">
                  <Pencil className="w-3.5 h-3.5" style={{ color: '#7c3aed' }} />
                </button>
                <button onClick={() => remove(addr.id)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors">
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-800">{addr.name}</p>
              <p className="text-sm text-gray-500 mt-0.5">{addr.line1}</p>
              <p className="text-sm text-gray-500">{addr.city}, {addr.state} — {addr.pin}</p>
              <p className="text-xs text-gray-400 mt-1">{addr.phone}</p>
            </div>

            {!addr.isDefault && (
              <button
                onClick={() => setDefault(addr.id)}
                className="self-start text-xs font-bold px-3 py-1.5 rounded-lg transition-colors hover:bg-purple-50"
                style={{ color: '#7c3aed', border: '1px solid #e9d5ff' }}
              >
                Set as Default
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
