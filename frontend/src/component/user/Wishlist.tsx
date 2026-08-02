'use client'
import { useState } from 'react'

const ALL = [
  { id: 1, name: 'Embroidered Anarkali', cat: 'Fashion', price: 3299, orig: 4500, img: '👗', rating: 4.8, reviews: 124, inStock: true },
  { id: 2, name: 'Boho Maxi Skirt', cat: 'Fashion', price: 1499, orig: 1999, img: '🩱', rating: 4.5, reviews: 89, inStock: true },
  { id: 3, name: 'Minimalist Tote Bag', cat: 'Bags', price: 999, orig: 1499, img: '👜', rating: 4.7, reviews: 203, inStock: true },
  { id: 4, name: 'Pastel Nail Kit', cat: 'Beauty', price: 449, orig: 599, img: '💅', rating: 4.3, reviews: 56, inStock: false },
  { id: 5, name: 'Rose Quartz Face Roller', cat: 'Beauty', price: 799, orig: 1199, img: '🌸', rating: 4.9, reviews: 311, inStock: true },
  { id: 6, name: 'Woven Jute Clutch', cat: 'Bags', price: 649, orig: 849, img: '👛', rating: 4.4, reviews: 44, inStock: true },
]

export default function Wishlist() {
  const [items, setItems] = useState(ALL)
  const [search, setSearch] = useState('')

  const filtered = items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="h-full flex flex-col" style={{ background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)' }}>
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-8 py-5 flex-shrink-0"
        style={{ background: '#fff', borderBottom: '1px solid #fbcfe8', boxShadow: '0 1px 8px rgba(190,24,93,0.05)' }}
      >
        <div>
          <h1 className="text-2xl font-900 text-pink-900" style={{ fontFamily: 'Outfit, sans-serif' }}>Wishlist</h1>
          <p className="text-sm font-500 mt-0.5" style={{ color: '#f472b6' }}>{items.length} saved items</p>
        </div>
        {/* Search */}
        <div
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
          style={{ background: '#fdf2f8', border: '1.5px solid #fbcfe8', width: 240 }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f9a8d4" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input
            className="flex-1 text-sm outline-none bg-transparent"
            placeholder="Search wishlist..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ color: '#831843', fontFamily: 'Outfit, sans-serif' }}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="grid grid-cols-3 gap-4">
          {filtered.map((item) => {
            const pct = Math.round(((item.orig - item.price) / item.orig) * 100)
            return (
              <div
                key={item.id}
                className="rounded-2xl overflow-hidden group transition-all duration-200 hover:-translate-y-1"
                style={{ background: '#fff', border: '1px solid #fbcfe8', boxShadow: '0 2px 12px rgba(190,24,93,0.06)' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 28px rgba(190,24,93,0.14)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px rgba(190,24,93,0.06)')}
              >
                {/* Image area */}
                <div
                  className="relative h-36 flex items-center justify-center text-5xl"
                  style={{ background: 'linear-gradient(135deg, #fdf2f8, #fbcfe8)' }}
                >
                  {item.img}
                  {/* Remove btn */}
                  <button
                    onClick={() => setItems((prev) => prev.filter((i) => i.id !== item.id))}
                    className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                    style={{ background: 'rgba(255,255,255,0.9)', color: '#be185d', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                  </button>
                  {/* Discount badge */}
                  <span
                    className="absolute top-2.5 left-2.5 text-xs font-800 px-2 py-1 rounded-lg"
                    style={{ background: 'linear-gradient(135deg, #be185d, #ec4899)', color: '#fff', fontFamily: 'Outfit, sans-serif' }}
                  >
                    {pct}% OFF
                  </span>
                  {!item.inStock && (
                    <div
                      className="absolute inset-0 flex items-end pb-2 justify-center"
                      style={{ background: 'rgba(255,255,255,0.6)' }}
                    >
                      <span className="text-xs font-700 px-2 py-1 rounded-lg" style={{ background: '#fce7f3', color: '#be185d' }}>Out of Stock</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col gap-2">
                  <span className="text-xs font-600" style={{ color: '#f9a8d4', fontFamily: 'Outfit, sans-serif' }}>{item.cat}</span>
                  <p className="font-700 text-pink-900 text-sm leading-snug" style={{ fontFamily: 'Outfit, sans-serif' }}>{item.name}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-500" style={{ color: '#fbbf24' }}>★</span>
                    <span className="text-xs font-700 text-pink-800">{item.rating}</span>
                    <span className="text-xs font-400" style={{ color: '#f9a8d4' }}>({item.reviews})</span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-base font-900 text-pink-800" style={{ fontFamily: 'Outfit, sans-serif' }}>₹{item.price.toLocaleString('en-IN')}</span>
                    <span className="text-xs font-400 line-through" style={{ color: '#f9a8d4' }}>₹{item.orig.toLocaleString('en-IN')}</span>
                  </div>
                  <button
                    disabled={!item.inStock}
                    className="mt-1 w-full py-2.5 rounded-xl text-sm font-700 text-white transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    style={{ background: item.inStock ? 'linear-gradient(135deg, #be185d, #ec4899)' : '#fce7f3', color: item.inStock ? '#fff' : '#be185d', fontFamily: 'Outfit, sans-serif' }}
                  >
                    {item.inStock ? '🛒 Add to Cart' : 'Notify Me'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
