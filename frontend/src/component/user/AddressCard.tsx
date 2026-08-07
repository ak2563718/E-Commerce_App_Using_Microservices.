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
      className="relative rounded-2xl p-5 transition-all duration-200"
      style={
        address.isDefault
          ? { background: 'linear-gradient(135deg, #111111 0%, #ec4899 100%)', color: '#fff' }
          : { background: '#fff', border: '1.5px solid #f3e8ee', color: '#111' }
      }
    >
      {/* Label + default badge */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
          style={
            address.isDefault
              ? { background: 'rgba(255,255,255,0.15)', color: '#fff' }
              : { background: '#fce7f3', color: '#db2777' }
          }
        >
          {address.label || 'Address'}
        </span>
        {address.isDefault && (
          <span className="text-xs font-medium flex items-center gap-1" style={{ color: '#fbcfe8' }}>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
              <circle cx="4" cy="4" r="4" />
            </svg>
            Default
          </span>
        )}
      </div>

      {/* Content */}
      <p className="font-semibold text-sm">{address.fullName}</p>
      <p className="text-sm mt-0.5" style={{ color: address.isDefault ? 'rgba(255,255,255,0.75)' : '#6b7280' }}>
        {address.line1}{address.line2 ? `, ${address.line2}` : ''}
      </p>
      <p className="text-sm" style={{ color: address.isDefault ? 'rgba(255,255,255,0.75)' : '#6b7280' }}>
        {address.city}, {address.state} {address.zip} · {address.country}
      </p>
      {address.phone && (
        <p className="text-xs mt-1" style={{ color: address.isDefault ? 'rgba(255,255,255,0.5)' : '#9ca3af' }}>
          {address.phone}
        </p>
      )}

      {/* Actions */}
      <div
        className="flex items-center gap-2 mt-4 pt-3"
        style={{ borderTop: address.isDefault ? '1px solid rgba(255,255,255,0.12)' : '1px solid #fce7f3' }}
      >
        <button
          onClick={onEdit}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all active:scale-95"
          style={
            address.isDefault
              ? { background: 'rgba(255,255,255,0.15)', color: '#fff' }
              : { background: '#fce7f3', color: '#db2777' }
          }
        >
          Edit
        </button>

        {!address.isDefault && (
          <button
            onClick={onSetDefault}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all active:scale-95"
            style={{ background: '#fce7f3', color: '#db2777' }}
          >
            Set Default
          </button>
        )}

        <div className="ml-auto">
          {confirmDelete ? (
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: address.isDefault ? 'rgba(255,255,255,0.5)' : '#9ca3af' }}>
                Sure?
              </span>
              <button
                onClick={() => { onDelete(); setConfirmDelete(false) }}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-all active:scale-95"
              >
                Delete
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all active:scale-95"
                style={
                  address.isDefault
                    ? { background: 'rgba(255,255,255,0.15)', color: '#fff' }
                    : { background: '#fce7f3', color: '#db2777' }
                }
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
              style={{ color: address.isDefault ? 'rgba(255,255,255,0.4)' : '#d1d5db' }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
