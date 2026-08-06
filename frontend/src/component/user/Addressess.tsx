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
    const newAddr: Address = {
      ...data,
      id: Date.now().toString(),
      isDefault: addresses.length === 0,
    }
    setAddresses((prev) => [...prev, newAddr])
    setShowForm(false)
  }

  const handleUpdate = (data: Omit<Address, 'id' | 'isDefault'>) => {
    if (!editing) return
    setAddresses((prev) =>
      prev.map((a) => (a.id === editing.id ? { ...a, ...data } : a))
    )
    setEditing(null)
  }

  const handleDelete = (id: string) => {
    setAddresses((prev) => {
      const filtered = prev.filter((a) => a.id !== id)
      if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
        filtered[0].isDefault = true
      }
      return filtered
    })
  }

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    )
  }

  const closeForm = () => {
    setShowForm(false)
    setEditing(null)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs tracking-[0.18em] uppercase text-stone-400 mb-1 font-medium">
          Account Settings
        </p>
        <div className="flex items-end justify-between">
          <div>
            <h1
              className="text-3xl font-bold text-stone-800 leading-tight"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Saved Addresses
            </h1>
            <p className="text-stone-500 text-sm mt-1">
              Manage your delivery and billing addresses.
            </p>
          </div>
          <button
            onClick={() => { setEditing(null); setShowForm(true) }}
            className="flex items-center gap-2 px-4 py-2.5 bg-stone-800 text-stone-50 text-sm font-medium rounded-lg hover:bg-stone-700 active:scale-95 transition-all duration-150"
          >
            <span className="text-lg leading-none">+</span>
            Add Address
          </button>
        </div>
      </div>

      {/* Form overlay */}
      {(showForm || editing) && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
            onClick={closeForm}
          />
          <div className="relative z-50 w-full max-w-lg">
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
        <div className="text-center py-20 border-2 border-dashed border-stone-300 rounded-2xl">
          <div className="text-4xl mb-3">📭</div>
          <p className="text-stone-500 font-medium">No addresses saved yet.</p>
          <p className="text-stone-400 text-sm mt-1">
            Click "Add Address" to get started.
          </p>
        </div>
      )}

      {/* Address list */}
      <div className="grid gap-4">
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

      <p className="text-center text-xs text-stone-400 mt-10">
        {addresses.length} address{addresses.length !== 1 ? 'es' : ''} saved
      </p>
    </div>
  )
}
