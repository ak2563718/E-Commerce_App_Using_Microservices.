'use client'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export default function DeleteConfirmation({
  open,
  onConfirm,
  onCancel,
  loading
}: {
  open:boolean,
  onConfirm: () => void
  onCancel: () => void
  loading:boolean
}) 
{
    if(!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(10, 10, 30, 0.6)', backdropFilter: 'blur(6px)' }}
      onClick={onCancel}
    >
      <div
        className="relative bg-white rounded-2xl w-full max-w-sm mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: '0 32px 64px -12px rgba(30,58,138,0.25), 0 0 0 1px rgba(124,58,237,0.1)',
        }}
      >
        {/* gradient accent bar */}
        <div
          className="h-1 w-full"
          style={{ background: 'linear-gradient(90deg, #1e3a8a 0%, #7c3aed 50%, #ec4899 100%)' }}
        />

        <div className="px-7 pt-7 pb-6">
          {/* icon */}
          <div
            className="flex items-center justify-center w-12 h-12 rounded-full mb-5"
            style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #fce7f3 100%)' }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#7c3aed"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14H6L5 6" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
              <path d="M9 6V4h6v2" />
            </svg>
          </div>

          <h2 className="text-[17px] font-semibold text-gray-900 leading-snug mb-1">
            Are you sure?
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            This action is permanent and cannot be undone. The item will be removed immediately.
          </p>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onCancel}
              className="flex-1 h-10 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 bg-white transition-all duration-150 hover:bg-gray-50 hover:border-gray-300 active:scale-[0.97]"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 flex justify-center items-center h-10 rounded-xl text-sm font-semibold text-white transition-all duration-150 active:scale-[0.97]"
              style={{
                background: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 60%, #ec4899 100%)',
                boxShadow: '0 2px 12px rgba(124,58,237,0.4)',
              }}
            >
            { loading? <Loader2/> : "Yes, delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}