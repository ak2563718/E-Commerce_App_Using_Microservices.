'use client'
import { useState } from 'react'
import { Heart, ShoppingCart, Trash2, Star } from 'lucide-react'
import { WISHLIST } from './userData'

export default function Wishlist() {
  const [items, setItems] = useState(WISHLIST)

  const remove = (id: number) => setItems(w => w.filter(x => x.id !== id))

  return (
    <div className="max-w-2xl flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>My Wishlist</h1>
        <p className="text-sm text-gray-500 mt-0.5">{items.length} saved items</p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl p-12 flex flex-col items-center gap-4 text-center" style={{ background: '#fff', border: '1px solid #f0ebff' }}>
          <Heart className="w-12 h-12" style={{ color: '#e9d5ff' }} />
          <div>
            <p className="font-bold text-gray-700">Your wishlist is empty</p>
            <p className="text-sm text-gray-400 mt-1">Save items you love to buy them later</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map(item => {
            const discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
            return (
              <div
                key={item.id}
                className="rounded-2xl p-4 flex items-center gap-4 group transition-all hover:-translate-y-0.5"
                style={{ background: '#fff', border: '1px solid #f0ebff', boxShadow: '0 2px 8px rgba(124,58,237,0.05)' }}
              >
                <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl shrink-0" style={{ background: '#f3e8ff' }}>
                  {item.img}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800 truncate">{item.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Star className="w-3 h-3" style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                    <span className="text-xs text-gray-500">{item.rating} ({item.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-base font-black text-gray-900">₹{item.price.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-gray-400 line-through">₹{item.originalPrice.toLocaleString('en-IN')}</span>
                    <span className="text-xs font-bold px-1.5 py-0.5 rounded-md" style={{ background: '#dcfce7', color: '#16a34a' }}>{discount}% off</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white transition-all"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
                  >
                    <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                  </button>
                  <button
                    onClick={() => remove(item.id)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:bg-red-50"
                    style={{ color: '#ef4444', border: '1px solid #fee2e2' }}
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
