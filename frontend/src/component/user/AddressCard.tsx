'use client'
import { useState } from 'react'
import type { Address } from './Addressess'

interface Props {
  address: Address
  onEdit: () => void
  onDelete: () => void
  onSetDefault: () => void
}

export default function AddressCard({ address, onEdit, onDelete, onSetDefault }: Props) {
  const [confirmDelete, setConfirmDelete] = useState(false)

  return (
    <div
      className={`relative rounded-2xl border p-5 transition-all duration-200 ${
        address.isDefault
          ? 'border-stone-700 bg-stone-800 text-stone-50 shadow-lg'
          : 'border-stone-200 bg-white text-stone-800 hover:border-stone-300 hover:shadow-sm'
      }`}
    >
      {/* Label row */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full tracking-wide ${
            address.isDefault
              ? 'bg-stone-600 text-stone-200'
              : 'bg-stone-100 text-stone-500'
          }`}
        >
          {address.label || 'Address'}
        </span>
        {address.isDefault && (
          <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
              <circle cx="5" cy="5" r="4" />
            </svg>
            Default
          </span>
        )}
      </div>

      {/* Address content */}
      <div className="space-y-0.5">
        <p className="font-semibold text-base">{address.fullName}</p>
        <p className={`text-sm ${address.isDefault ? 'text-stone-300' : 'text-stone-500'}`}>
          {address.line1}{address.line2 ? `, ${address.line2}` : ''}
        </p>
        <p className={`text-sm ${address.isDefault ? 'text-stone-300' : 'text-stone-500'}`}>
          {address.city}, {address.state} {address.zip}
        </p>
        <p className={`text-sm ${address.isDefault ? 'text-stone-300' : 'text-stone-500'}`}>
          {address.country}
        </p>
        {address.phone && (
          <p className={`text-sm mt-1 ${address.isDefault ? 'text-stone-400' : 'text-stone-400'}`}>
            {address.phone}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-opacity-20"
        style={{ borderColor: address.isDefault ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)' }}
      >
        <button
          onClick={onEdit}
          className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
            address.isDefault
              ? 'bg-stone-700 hover:bg-stone-600 text-stone-200'
              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
          }`}
        >
          Edit
        </button>

        {!address.isDefault && (
          <button
            onClick={onSetDefault}
            className="text-xs font-medium px-3 py-1.5 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
          >
            Set as Default
          </button>
        )}

        <div className="ml-auto">
          {confirmDelete ? (
            <div className="flex items-center gap-2">
              <span className={`text-xs ${address.isDefault ? 'text-stone-400' : 'text-stone-400'}`}>
                Sure?
              </span>
              <button
                onClick={() => { onDelete(); setConfirmDelete(false) }}
                className="text-xs font-medium px-3 py-1.5 rounded-md bg-red-500 hover:bg-red-600 text-white transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
                  address.isDefault
                    ? 'bg-stone-700 hover:bg-stone-600 text-stone-200'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
                address.isDefault
                  ? 'text-stone-400 hover:text-red-400 hover:bg-stone-700'
                  : 'text-stone-400 hover:text-red-500 hover:bg-red-50'
              }`}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
