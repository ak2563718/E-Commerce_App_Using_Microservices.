'use client'
import { useState, useRef } from 'react'

const categories = [
  {
    id: 'foryou',
    label: 'For You',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)',
    pill: 'New',
  },
  {
    id: 'electronics',
    label: 'Electronics',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
  },
  {
    id: 'fashion',
    label: 'Fashion',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #7b1fa2 0%, #4a148c 100%)',
  },
  {
    id: 'mobiles',
    label: 'Mobiles',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #00897b 0%, #00695c 100%)',
  },
  {
    id: 'beauty',
    label: 'Beauty',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #e91e8c 0%, #ad1457 100%)',
  },
  {
    id: 'home',
    label: 'Home',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #ef6c00 0%, #bf360c 100%)',
  },
  {
    id: 'appliances',
    label: 'Appliances',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #37474f 0%, #263238 100%)',
  },
  {
    id: 'books',
    label: 'Books',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #558b2f 0%, #33691e 100%)',
  },
  {
    id: 'sports',
    label: 'Sports',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M4.93 4.93 19.07 19.07" />
        <path d="M4.93 19.07 19.07 4.93" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #f9a825 0%, #f57f17 100%)',
  },
]

interface SubNavbarProps {
  onCategoryChange?: (id: string) => void
}

export default function SubNavbar({ onCategoryChange }: SubNavbarProps) {
  const [active, setActive] = useState('foryou')
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleSelect = (id: string) => {
    setActive(id)
    onCategoryChange?.(id)
  }

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' })
  }

  return (
    <div
      className="w-full sticky z-40"
      style={{
        top: '68px',
        background: '#fff',
        borderBottom: '1px solid rgba(233,30,140,0.08)',
        boxShadow: '0 2px 12px rgba(233,30,140,0.06)',
      }}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 relative flex items-center">

        {/* Left scroll arrow */}
        <button
          onClick={() => scroll('left')}
          className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-pink-500 hover:bg-pink-50 transition-all duration-150 mr-1"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Scrollable category strip */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-1 overflow-x-auto py-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map(cat => {
            const isActive = active === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => handleSelect(cat.id)}
                className="relative flex flex-col items-center gap-1.5 px-4 py-2 rounded-2xl shrink-0 transition-all duration-200 group"
                style={{
                  background: isActive ? 'rgba(233,30,140,0.06)' : 'transparent',
                  minWidth: '76px',
                }}
              >
                {/* Icon bubble */}
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 group-hover:scale-105"
                  style={{
                    background: isActive
                      ? cat.gradient
                      : 'rgba(0,0,0,0.04)',
                    color: isActive ? '#fff' : '#9ca3af',
                    boxShadow: isActive ? `0 4px 14px rgba(0,0,0,0.18)` : 'none',
                  }}
                >
                  {cat.icon}
                </div>

                {/* Label */}
                <span
                  className="text-[11px] font-bold tracking-wide whitespace-nowrap transition-colors duration-150"
                  style={{ color: isActive ? '#e91e8c' : '#6b7280' }}
                >
                  {cat.label}
                </span>

                {/* "New" pill */}
                {cat.pill && (
                  <span
                    className="absolute -top-0.5 right-2 text-white font-black rounded-full px-1.5 py-px"
                    style={{ background: '#e91e8c', fontSize: '8px', letterSpacing: '0.04em' }}
                  >
                    {cat.pill}
                  </span>
                )}

                {/* Active underline dot */}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: '#e91e8c' }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Right scroll arrow */}
        <button
          onClick={() => scroll('right')}
          className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-pink-500 hover:bg-pink-50 transition-all duration-150 ml-1"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

      </div>
    </div>
  )
}
