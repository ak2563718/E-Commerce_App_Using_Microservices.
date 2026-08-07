'use client'
import { useState } from 'react'
import AddressCard from './AddressCard'
import AddressForm from './AddressForm'

export interface Address {
  id: string
  label: string
  fullName: string
  line1: string
  line2: string
  city: string
  state: string
  zip: string
  country: string
  phone: string
  isDefault: boolean
}

const INITIAL: Address[] = [
  {
    id: '1',
    label: 'Home',
    fullName: 'Eleanor Voss',
    line1: '47 Birchwood Lane',
    line2: 'Apt 3B',
    city: 'Portland',
    state: 'OR',
    zip: '97201',
    country: 'United States',
    phone: '+1 (503) 555-0142',
    isDefault: true,
  },
]

export default function Addressess() {
  const [addresses, setAddresses] = useState<Address[]>(INITIAL)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Address | null>(null)

  const handleAdd = (data: Omit<Address, 'id' | 'isDefault'>) => {
    const newAddr: Address = { ...data, id: Date.now().toString(), isDefault: addresses.length === 0 }
    setAddresses((prev) => [...prev, newAddr])
    setShowForm(false)
  }

  const handleUpdate = (data: Omit<Address, 'id' | 'isDefault'>) => {
    if (!editing) return
    setAddresses((prev) => prev.map((a) => (a.id === editing.id ? { ...a, ...data } : a)))
    setEditing(null)
  }

  const handleDelete = (id: string) => {
    setAddresses((prev) => {
      const filtered = prev.filter((a) => a.id !== id)
      if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) filtered[0].isDefault = true
      return filtered
    })
  }

  const handleSetDefault = (id: string) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })))
  }

  const closeForm = () => { setShowForm(false); setEditing(null) }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs tracking-[0.16em] uppercase mb-0.5 font-medium bg-gradient-to-r from-black to-pink-500 bg-clip-text text-transparent">
            Account
          </p>
          <h1
            className="text-2xl font-bold bg-gradient-to-r from-zinc-900 via-zinc-700 to-pink-500 bg-clip-text text-transparent"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Saved Addresses
          </h1>
        </div>

        <button
          onClick={() => { setEditing(null); setShowForm(true) }}
          className="flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl active:scale-95 transition-all duration-150 shadow-md hover:shadow-lg"
          style={{ background: 'linear-gradient(135deg, #111111 0%, #ec4899 100%)' }}
        >
          <span className="text-base leading-none">+</span>
          Add Address
        </button>
      </div>

      {/* Modal */}
      {(showForm || editing) && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={closeForm} />
          <div className="relative z-50 w-full max-w-md">
            <AddressForm
              initial={editing ?? undefined}
              onSubmit={editing ? handleUpdate : handleAdd}
              onCancel={closeForm}
            />
          </div>
        </div>
      )}

      {/* Empty state */}
      {addresses.length === 0 && (
        <div className="text-center py-16 border-2 border-dashed border-pink-100 rounded-2xl bg-pink-50/30">
          <p className="text-gray-400 font-medium">No addresses saved yet.</p>
          <p className="text-gray-300 text-sm mt-1">Click "Add Address" to get started.</p>
        </div>
      )}

      {/* Cards */}
      <div className="grid gap-3">
        {addresses.map((addr) => (
          <AddressCard
            key={addr.id}
            address={addr}
            onEdit={() => { setShowForm(false); setEditing(addr) }}
            onDelete={() => handleDelete(addr.id)}
            onSetDefault={() => handleSetDefault(addr.id)}
          />
        ))}
      </div>

      {addresses.length > 0 && (
        <p className="text-center text-xs text-gray-300 mt-8">
          {addresses.length} address{addresses.length !== 1 ? 'es' : ''} saved
        </p>
      )}
    </div>
  )
}
