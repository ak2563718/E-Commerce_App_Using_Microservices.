'use client'
import { useState } from 'react'

const PINK = '#e91e8c'
const PINK_DARK = '#c2185b'
const PINK_LIGHT = '#fce4f3'
const PINK_MID = '#f48ccc'

function fmt(n: number) {
  return '₹' + n.toLocaleString('en-IN')
}

interface WishlistItem {
  id: number
  name: string
  brand: string
  category: string
  image: string
  price: number
  originalPrice: number
  discount: number
  rating: number
  reviewCount: number
  inStock: boolean
  assured: boolean
  freeDelivery: boolean
  addedOn: string
  badge?: string
}

const INITIAL_WISHLIST: WishlistItem[] = [
  {
    id: 1,
    name: 'Apple iPhone 15 Pro Max (Natural Titanium, 512GB)',
    brand: 'Apple',
    category: 'Smartphones',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop&auto=format',
    price: 159900,
    originalPrice: 189900,
    discount: 15,
    rating: 4.6,
    reviewCount: 34210,
    inStock: true,
    assured: true,
    freeDelivery: true,
    addedOn: '14 Aug 2026',
    badge: 'Top Rated',
  },
  {
    id: 2,
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    brand: 'Sony',
    category: 'Headphones',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop&auto=format',
    price: 26990,
    originalPrice: 34990,
    discount: 22,
    rating: 4.7,
    reviewCount: 22154,
    inStock: true,
    assured: true,
    freeDelivery: true,
    addedOn: '12 Aug 2026',
    badge: 'Bestseller',
  },
  {
    id: 3,
    name: 'Samsung Galaxy Watch 6 Classic 47mm (Graphite)',
    brand: 'Samsung',
    category: 'Smartwatches',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&auto=format',
    price: 34999,
    originalPrice: 44999,
    discount: 22,
    rating: 4.4,
    reviewCount: 9823,
    inStock: false,
    assured: true,
    freeDelivery: true,
    addedOn: '10 Aug 2026',
    badge: 'New',
  },
  {
    id: 4,
    name: 'Apple AirPods Pro (2nd Gen) with MagSafe Case',
    brand: 'Apple',
    category: 'Headphones',
    image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=400&fit=crop&auto=format',
    price: 19900,
    originalPrice: 24900,
    discount: 20,
    rating: 4.5,
    reviewCount: 41087,
    inStock: true,
    assured: true,
    freeDelivery: true,
    addedOn: '9 Aug 2026',
  },
  {
    id: 5,
    name: 'Google Pixel 8 Pro (Hazel, 128GB)',
    brand: 'Google',
    category: 'Smartphones',
    image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400&h=400&fit=crop&auto=format',
    price: 79999,
    originalPrice: 99999,
    discount: 20,
    rating: 4.4,
    reviewCount: 7851,
    inStock: true,
    assured: false,
    freeDelivery: true,
    addedOn: '7 Aug 2026',
  },
  {
    id: 6,
    name: 'Bose QuietComfort 45 Bluetooth Headphones',
    brand: 'Bose',
    category: 'Headphones',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop&auto=format',
    price: 25990,
    originalPrice: 34900,
    discount: 25,
    rating: 4.5,
    reviewCount: 15630,
    inStock: true,
    assured: true,
    freeDelivery: true,
    addedOn: '5 Aug 2026',
    badge: 'Top Rated',
  },
  {
    id: 7,
    name: 'OnePlus 12 5G (Flowy Emerald, 256GB)',
    brand: 'OnePlus',
    category: 'Smartphones',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop&auto=format',
    price: 64999,
    originalPrice: 69999,
    discount: 7,
    rating: 4.3,
    reviewCount: 8764,
    inStock: false,
    assured: true,
    freeDelivery: true,
    addedOn: '2 Aug 2026',
  },
  {
    id: 8,
    name: 'Garmin Forerunner 265 GPS Running Smartwatch',
    brand: 'Garmin',
    category: 'Smartwatches',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&h=400&fit=crop&auto=format',
    price: 39999,
    originalPrice: 49999,
    discount: 20,
    rating: 4.3,
    reviewCount: 3207,
    inStock: true,
    assured: false,
    freeDelivery: true,
    addedOn: '29 Jul 2026',
  },
]

const CATEGORIES = ['All', ...Array.from(new Set(INITIAL_WISHLIST.map(i => i.category)))]
const SORT_OPTIONS = [
  { label: 'Date Added', value: 'date' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Discount', value: 'discount' },
  { label: 'Rating', value: 'rating' },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '2px',
      background: rating >= 4 ? '#27ae60' : rating >= 3 ? '#f39c12' : '#e74c3c',
      color: '#fff', fontSize: '10px', fontWeight: 700,
      padding: '2px 6px', borderRadius: '4px',
    }}>
      {rating.toFixed(1)} ★
    </span>
  )
}

function AssuredBadge() {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '10px', fontWeight: 700, color: PINK }}>
      <svg width="11" height="11" viewBox="0 0 24 24" fill={PINK}>
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
        <path d="M10 17l-4-4 1.4-1.4 2.6 2.6 6.6-6.6L18 9l-8 8z" fill="#fff" />
      </svg>
      Assured
    </span>
  )
}

function WishlistCard({
  item,
  onRemove,
  onMoveToCart,
  onShare,
}: {
  item: WishlistItem
  onRemove: (id: number) => void
  onMoveToCart: (id: number) => void
  onShare: (id: number) => void
}) {
  const [imgErr, setImgErr] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const handleCart = () => {
    setAddedToCart(true)
    onMoveToCart(item.id)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        borderRadius: '16px',
        border: `1.5px solid ${hovered ? PINK_MID : '#f3e0ed'}`,
        overflow: 'hidden',
        boxShadow: hovered ? '0 8px 32px rgba(233,30,140,0.13)' : '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'all 0.22s ease',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Badges */}
      <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', flexDirection: 'column', gap: '4px', zIndex: 2 }}>
        {item.badge && (
          <span style={{
            background: item.badge === 'New' ? '#7c3aed' : item.badge === 'Top Rated' ? '#059669' : PINK,
            color: '#fff', fontSize: '9px', fontWeight: 700,
            padding: '3px 8px', borderRadius: '20px', letterSpacing: '0.05em',
          }}>
            {item.badge}
          </span>
        )}
        {!item.inStock && (
          <span style={{
            background: '#ff5252', color: '#fff', fontSize: '9px',
            fontWeight: 700, padding: '3px 8px', borderRadius: '20px',
          }}>
            Out of Stock
          </span>
        )}
      </div>

      {/* Remove button */}
      <button
        onClick={() => onRemove(item.id)}
        title="Remove from wishlist"
        style={{
          position: 'absolute', top: '10px', right: '10px', zIndex: 2,
          width: '30px', height: '30px', borderRadius: '50%',
          background: '#fff', border: '1.5px solid #f0e0eb',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
          transition: 'all 0.15s',
          color: '#bbb', fontSize: '14px', fontWeight: 700,
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLButtonElement
          el.style.background = '#fff0f5'
          el.style.borderColor = PINK
          el.style.color = PINK
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLButtonElement
          el.style.background = '#fff'
          el.style.borderColor = '#f0e0eb'
          el.style.color = '#bbb'
        }}
      >
        ×
      </button>

      {/* Image */}
      <div style={{
        height: '200px', background: '#fdf4fa',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', cursor: 'pointer',
      }}>
        <img
          src={imgErr ? 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=300&fit=crop&auto=format' : item.image}
          alt={item.name}
          onError={() => setImgErr(true)}
          style={{
            width: '150px', height: '150px', objectFit: 'contain',
            transform: hovered ? 'scale(1.07)' : 'scale(1)',
            transition: 'transform 0.25s ease',
            opacity: item.inStock ? 1 : 0.5,
          }}
        />
      </div>

      {/* Info */}
      <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <p style={{ margin: 0, fontSize: '10px', color: PINK, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {item.brand}
        </p>
        <h3 style={{
          margin: 0, fontSize: '13px', fontWeight: 600, color: '#1a1a2e',
          lineHeight: 1.4, display: '-webkit-box',
          WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          minHeight: '36px',
        }}>
          {item.name}
        </h3>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <StarRating rating={item.rating} />
          <span style={{ fontSize: '11px', color: '#aaa' }}>({item.reviewCount.toLocaleString('en-IN')})</span>
          {item.assured && <AssuredBadge />}
        </div>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '17px', fontWeight: 800, color: item.inStock ? '#1a1a2e' : '#bbb' }}>
            {fmt(item.price)}
          </span>
          <span style={{ fontSize: '11px', color: '#ccc', textDecoration: 'line-through' }}>
            {fmt(item.originalPrice)}
          </span>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#27ae60' }}>
            {item.discount}% off
          </span>
        </div>

        {/* Delivery */}
        {item.inStock
          ? <span style={{ fontSize: '11px', color: '#27ae60', fontWeight: 500 }}>✓ Free Delivery</span>
          : <span style={{ fontSize: '11px', color: '#ff5252', fontWeight: 500 }}>Currently unavailable</span>
        }

        <p style={{ margin: 0, fontSize: '10px', color: '#bbb' }}>Added on {item.addedOn}</p>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
          <button
            onClick={handleCart}
            disabled={!item.inStock}
            style={{
              flex: 1, padding: '9px 0', border: 'none', borderRadius: '9px',
              background: !item.inStock ? '#f5f5f5' : addedToCart ? '#27ae60' : `linear-gradient(135deg, ${PINK}, ${PINK_DARK})`,
              color: !item.inStock ? '#ccc' : '#fff',
              fontFamily: 'Poppins, sans-serif', fontSize: '11px', fontWeight: 700,
              cursor: item.inStock ? 'pointer' : 'not-allowed',
              transition: 'all 0.18s', letterSpacing: '0.02em',
              boxShadow: item.inStock && !addedToCart ? '0 3px 10px rgba(233,30,140,0.22)' : 'none',
            }}
          >
            {addedToCart ? '✓ Added' : item.inStock ? 'Add to Cart' : 'Notify Me'}
          </button>
          <button
            onClick={() => onShare(item.id)}
            title="Share"
            style={{
              width: '36px', height: '36px', border: '1.5px solid #f0e0eb',
              borderRadius: '9px', background: '#fff', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.15s', flexShrink: 0,
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLButtonElement
              el.style.borderColor = PINK_MID
              el.style.background = PINK_LIGHT
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLButtonElement
              el.style.borderColor = '#f0e0eb'
              el.style.background = '#fff'
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={PINK} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Notification toast ── */
function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div style={{
      position: 'fixed', bottom: '28px', left: '50%',
      transform: `translateX(-50%) translateY(${visible ? 0 : '20px'})`,
      opacity: visible ? 1 : 0, transition: 'all 0.25s ease',
      background: '#1a1a2e', color: '#fff', borderRadius: '10px',
      padding: '12px 22px', fontSize: '13px', fontWeight: 600,
      boxShadow: '0 8px 24px rgba(0,0,0,0.2)', zIndex: 999,
      pointerEvents: 'none', whiteSpace: 'nowrap',
    }}>
      {message}
    </div>
  )
}

/* ── Share modal ── */
function ShareModal({ item, onClose }: { item: WishlistItem | null; onClose: () => void }) {
  if (!item) return null
  const shareUrl = `https://shophub.in/product/${item.id}`
  const [copied, setCopied] = useState(false)

  const copy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 200, padding: '20px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: '20px', padding: '28px 28px 24px',
          width: '380px', maxWidth: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
            Share Product
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', color: '#bbb', cursor: 'pointer', lineHeight: 1 }}>×</button>
        </div>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', alignItems: 'center' }}>
          <img src={item.image} alt="" style={{ width: '52px', height: '52px', objectFit: 'contain', borderRadius: '10px', background: '#fdf4fa', border: '1px solid #f3e0ed', padding: '4px' }} />
          <p style={{ margin: 0, fontSize: '13px', color: '#333', lineHeight: 1.4, fontWeight: 500 }}>{item.name}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '20px' }}>
          {[
            { label: 'WhatsApp', icon: '💬', bg: '#25D366', color: '#fff' },
            { label: 'Instagram', icon: '📸', bg: 'linear-gradient(135deg, #833ab4,#fd1d1d,#fcb045)', color: '#fff' },
            { label: 'Twitter', icon: '🐦', bg: '#1DA1F2', color: '#fff' },
            { label: 'Email', icon: '✉️', bg: '#f3e0ed', color: PINK_DARK },
          ].map(s => (
            <button key={s.label} style={{
              border: 'none', borderRadius: '10px', background: s.bg, color: s.color,
              padding: '10px 4px', cursor: 'pointer', display: 'flex',
              flexDirection: 'column', alignItems: 'center', gap: '4px', transition: 'opacity 0.15s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.85' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
            >
              <span style={{ fontSize: '18px' }}>{s.icon}</span>
              <span style={{ fontSize: '9px', fontWeight: 700 }}>{s.label}</span>
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{
            flex: 1, border: '1.5px solid #f0e0eb', borderRadius: '8px',
            padding: '8px 12px', fontSize: '12px', color: '#888',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {shareUrl}
          </div>
          <button
            onClick={copy}
            style={{
              padding: '8px 16px', border: 'none', borderRadius: '8px',
              background: copied ? '#27ae60' : `linear-gradient(135deg, ${PINK}, ${PINK_DARK})`,
              color: '#fff', fontSize: '12px', fontWeight: 700, cursor: 'pointer',
              flexShrink: 0, transition: 'background 0.2s',
            }}
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Main ── */
export default function App() {
  const [items, setItems] = useState<WishlistItem[]>(INITIAL_WISHLIST)
  const [filterCategory, setFilterCategory] = useState('All')
  const [sortBy, setSortBy] = useState('date')
  const [shareItem, setShareItem] = useState<WishlistItem | null>(null)
  const [toast, setToast] = useState({ visible: false, message: '' })
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectMode, setSelectMode] = useState(false)
  const [selected, setSelected] = useState<number[]>([])

  const showToast = (message: string) => {
    setToast({ visible: true, message })
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 2500)
  }

  const handleRemove = (id: number) => {
    setItems(prev => prev.filter(i => i.id !== id))
    showToast('Removed from wishlist')
  }

  const handleRemoveSelected = () => {
    setItems(prev => prev.filter(i => !selected.includes(i.id)))
    showToast(`${selected.length} item${selected.length > 1 ? 's' : ''} removed`)
    setSelected([])
    setSelectMode(false)
  }

  const handleMoveToCart = (id: number) => {
    showToast('Added to cart!')
  }

  const handleShare = (id: number) => {
    const item = items.find(i => i.id === id) || null
    setShareItem(item)
  }

  const handleToggleSelect = (id: number) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  const handleMoveAllSelected = () => {
    const count = selected.filter(id => items.find(i => i.id === id)?.inStock).length
    showToast(count > 0 ? `${count} item${count > 1 ? 's' : ''} moved to cart!` : 'No in-stock items selected')
    setSelected([])
    setSelectMode(false)
  }

  const displayed = items
    .filter(i => filterCategory === 'All' || i.category === filterCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price_asc': return a.price - b.price
        case 'price_desc': return b.price - a.price
        case 'discount': return b.discount - a.discount
        case 'rating': return b.rating - a.rating
        default: return 0
      }
    })

  const outOfStockCount = items.filter(i => !i.inStock).length
  const totalSavings = items.filter(i => i.inStock).reduce((s, i) => s + (i.originalPrice - i.price), 0)

  return (
    <div style={{ minHeight: '100vh', background: '#fdf0f8', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${PINK} 0%, ${PINK_DARK} 100%)`,
        padding: '14px 0', position: 'sticky', top: 0, zIndex: 100,
        boxShadow: '0 3px 16px rgba(233,30,140,0.25)',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#fff', borderRadius: '10px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke={PINK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 6h18M16 10a4 4 0 01-8 0" stroke={PINK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '22px', fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>ShopHub</span>
          </div>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            {['Home', 'Products', 'Cart'].map(item => (
              <span key={item} style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>{item}</span>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '8px', padding: '6px 12px', cursor: 'pointer' }}>
              <svg width="14" height="14" viewBox="0 0 24 22" fill="#fff" stroke="#fff" strokeWidth="0">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span style={{ color: '#fff', fontSize: '13px', fontWeight: 600 }}>Wishlist</span>
              <span style={{ background: '#fff', color: PINK, borderRadius: '10px', padding: '1px 7px', fontSize: '11px', fontWeight: 800 }}>{items.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 28px 48px' }}>
        {/* Page header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '24px', fontWeight: 800, color: '#1a1a2e', margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="22" height="20" viewBox="0 0 24 22" fill={PINK}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              My Wishlist
            </h1>
            <p style={{ margin: 0, fontSize: '13px', color: '#aaa' }}>
              {items.length} saved item{items.length !== 1 ? 's' : ''}
              {outOfStockCount > 0 && <span style={{ color: '#ff5252', marginLeft: '8px' }}>· {outOfStockCount} out of stock</span>}
            </p>
          </div>

          {/* Stats pills */}
          {items.length > 0 && (
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <div style={{ background: '#fff', border: '1.5px solid #f3e0ed', borderRadius: '12px', padding: '10px 16px', textAlign: 'center' }}>
                <p style={{ margin: '0 0 2px', fontSize: '18px', fontWeight: 800, color: PINK, fontFamily: 'Poppins, sans-serif' }}>{items.length}</p>
                <p style={{ margin: 0, fontSize: '10px', color: '#aaa', fontWeight: 600 }}>SAVED</p>
              </div>
              <div style={{ background: '#fff', border: '1.5px solid #f3e0ed', borderRadius: '12px', padding: '10px 16px', textAlign: 'center' }}>
                <p style={{ margin: '0 0 2px', fontSize: '18px', fontWeight: 800, color: '#27ae60', fontFamily: 'Poppins, sans-serif' }}>{fmt(totalSavings)}</p>
                <p style={{ margin: 0, fontSize: '10px', color: '#aaa', fontWeight: 600 }}>TOTAL SAVINGS</p>
              </div>
              <div style={{ background: '#fff', border: '1.5px solid #f3e0ed', borderRadius: '12px', padding: '10px 16px', textAlign: 'center' }}>
                <p style={{ margin: '0 0 2px', fontSize: '18px', fontWeight: 800, color: '#1a1a2e', fontFamily: 'Poppins, sans-serif' }}>{items.filter(i => i.inStock).length}</p>
                <p style={{ margin: 0, fontSize: '10px', color: '#aaa', fontWeight: 600 }}>IN STOCK</p>
              </div>
            </div>
          )}
        </div>

        {items.length === 0 ? (
          /* Empty state */
          <div style={{
            background: '#fff', borderRadius: '20px', border: '1.5px solid #f3e0ed',
            padding: '80px 20px', textAlign: 'center',
          }}>
            <div style={{
              width: '100px', height: '100px', borderRadius: '50%',
              background: PINK_LIGHT, display: 'flex', alignItems: 'center',
              justifyContent: 'center', margin: '0 auto 20px',
            }}>
              <svg width="44" height="40" viewBox="0 0 24 22" fill={PINK_MID}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '22px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 8px' }}>
              Your wishlist is empty
            </h2>
            <p style={{ fontSize: '14px', color: '#aaa', margin: '0 0 28px', maxWidth: '340px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
              Save your favourite items here and shop them whenever you're ready.
            </p>
            <button style={{
              background: `linear-gradient(135deg, ${PINK}, ${PINK_DARK})`,
              color: '#fff', border: 'none', borderRadius: '12px',
              padding: '13px 36px', fontFamily: 'Poppins, sans-serif',
              fontSize: '14px', fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(233,30,140,0.28)',
            }}>
              Explore Products
            </button>
          </div>
        ) : (
          <>
            {/* Toolbar */}
            <div style={{
              background: '#fff', borderRadius: '14px', border: '1.5px solid #f3e0ed',
              padding: '12px 18px', marginBottom: '16px',
              display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap',
            }}>
              {/* Category filter pills */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', flex: 1 }}>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    style={{
                      padding: '5px 14px', border: `1.5px solid ${filterCategory === cat ? PINK : '#f0e0eb'}`,
                      borderRadius: '20px',
                      background: filterCategory === cat ? PINK : '#fff',
                      color: filterCategory === cat ? '#fff' : '#666',
                      fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: 600,
                      cursor: 'pointer', transition: 'all 0.15s',
                    }}
                  >
                    {cat}
                    {cat !== 'All' && (
                      <span style={{ marginLeft: '5px', opacity: 0.75 }}>
                        ({items.filter(i => i.category === cat).length})
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                style={{
                  border: '1.5px solid #f0e0eb', borderRadius: '8px',
                  padding: '6px 10px', fontSize: '12px', color: '#555',
                  outline: 'none', background: '#fff', cursor: 'pointer', fontWeight: 500,
                }}
              >
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>

              {/* View toggle */}
              <div style={{ display: 'flex', border: '1.5px solid #f0e0eb', borderRadius: '8px', overflow: 'hidden' }}>
                {(['grid', 'list'] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    style={{
                      padding: '6px 10px', border: 'none', cursor: 'pointer',
                      background: viewMode === mode ? PINK_LIGHT : '#fff',
                      color: viewMode === mode ? PINK : '#aaa', transition: 'all 0.15s',
                    }}
                  >
                    {mode === 'grid'
                      ? <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="0" width="6" height="6" rx="1.5" /><rect x="10" y="0" width="6" height="6" rx="1.5" /><rect x="0" y="10" width="6" height="6" rx="1.5" /><rect x="10" y="10" width="6" height="6" rx="1.5" /></svg>
                      : <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="1" width="16" height="2.5" rx="1.25" /><rect x="0" y="6.75" width="16" height="2.5" rx="1.25" /><rect x="0" y="12.5" width="16" height="2.5" rx="1.25" /></svg>
                    }
                  </button>
                ))}
              </div>

              {/* Select mode toggle */}
              <button
                onClick={() => { setSelectMode(v => !v); setSelected([]) }}
                style={{
                  border: `1.5px solid ${selectMode ? PINK : '#f0e0eb'}`,
                  borderRadius: '8px', background: selectMode ? PINK_LIGHT : '#fff',
                  color: selectMode ? PINK_DARK : '#666', fontSize: '12px', fontWeight: 600,
                  padding: '6px 12px', cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                {selectMode ? 'Cancel' : 'Select'}
              </button>
            </div>

            {/* Bulk action bar */}
            {selectMode && (
              <div style={{
                background: '#fff', borderRadius: '12px', border: `1.5px solid ${PINK_MID}`,
                padding: '12px 18px', marginBottom: '14px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px',
              }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: '#1a1a2e' }}>
                  <div
                    onClick={() => setSelected(selected.length === displayed.length ? [] : displayed.map(i => i.id))}
                    style={{
                      width: '18px', height: '18px', borderRadius: '5px',
                      border: `2px solid ${selected.length === displayed.length ? PINK : '#ccc'}`,
                      background: selected.length === displayed.length ? PINK : '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                    }}
                  >
                    {selected.length === displayed.length && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  {selected.length > 0 ? `${selected.length} selected` : 'Select all'}
                </label>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={handleMoveAllSelected}
                    disabled={selected.length === 0}
                    style={{
                      padding: '8px 18px', border: 'none', borderRadius: '8px',
                      background: selected.length > 0 ? `linear-gradient(135deg, ${PINK}, ${PINK_DARK})` : '#f0e0eb',
                      color: selected.length > 0 ? '#fff' : '#ccc',
                      fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: 700,
                      cursor: selected.length > 0 ? 'pointer' : 'not-allowed',
                    }}
                  >
                    Move to Cart
                  </button>
                  <button
                    onClick={handleRemoveSelected}
                    disabled={selected.length === 0}
                    style={{
                      padding: '8px 18px', border: `1.5px solid ${selected.length > 0 ? '#ff5252' : '#f0e0eb'}`,
                      borderRadius: '8px', background: '#fff',
                      color: selected.length > 0 ? '#ff5252' : '#ccc',
                      fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: 700,
                      cursor: selected.length > 0 ? 'pointer' : 'not-allowed',
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}

            {/* Grid / List */}
            {viewMode === 'grid' ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
                {displayed.map(item => (
                  <div key={item.id} style={{ position: 'relative' }}>
                    {selectMode && (
                      <div
                        onClick={() => handleToggleSelect(item.id)}
                        style={{
                          position: 'absolute', top: '10px', left: '10px', zIndex: 10,
                          width: '22px', height: '22px', borderRadius: '6px',
                          border: `2px solid ${selected.includes(item.id) ? PINK : '#ddd'}`,
                          background: selected.includes(item.id) ? PINK : 'rgba(255,255,255,0.9)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                        }}
                      >
                        {selected.includes(item.id) && (
                          <svg width="11" height="9" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                    )}
                    <WishlistCard item={item} onRemove={handleRemove} onMoveToCart={handleMoveToCart} onShare={handleShare} />
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {displayed.map(item => (
                  <div key={item.id} style={{ position: 'relative', display: 'flex' }}>
                    {selectMode && (
                      <div
                        onClick={() => handleToggleSelect(item.id)}
                        style={{
                          position: 'absolute', top: '18px', left: '18px', zIndex: 10,
                          width: '22px', height: '22px', borderRadius: '6px',
                          border: `2px solid ${selected.includes(item.id) ? PINK : '#ddd'}`,
                          background: selected.includes(item.id) ? PINK : 'rgba(255,255,255,0.9)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                        }}
                      >
                        {selected.includes(item.id) && (
                          <svg width="11" height="9" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                    )}
                    <div style={{
                      background: '#fff', borderRadius: '16px', border: '1.5px solid #f3e0ed',
                      display: 'flex', gap: '16px', padding: '16px 20px',
                      width: '100%', transition: 'all 0.18s',
                      boxSizing: 'border-box',
                    }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLDivElement
                        el.style.boxShadow = '0 6px 24px rgba(233,30,140,0.1)'
                        el.style.borderColor = PINK_MID
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLDivElement
                        el.style.boxShadow = 'none'
                        el.style.borderColor = '#f3e0ed'
                      }}
                    >
                      {/* Image */}
                      <div style={{ width: '100px', height: '100px', background: '#fdf4fa', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #f3e0ed', flexShrink: 0, overflow: 'hidden' }}>
                        <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'contain', opacity: item.inStock ? 1 : 0.5 }} />
                      </div>

                      {/* Details */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', gap: '6px', marginBottom: '4px', flexWrap: 'wrap', alignItems: 'center' }}>
                          <span style={{ fontSize: '10px', color: PINK, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.brand}</span>
                          {item.badge && <span style={{ background: item.badge === 'New' ? '#7c3aed' : item.badge === 'Top Rated' ? '#059669' : PINK, color: '#fff', fontSize: '9px', fontWeight: 700, padding: '1px 7px', borderRadius: '20px' }}>{item.badge}</span>}
                          {!item.inStock && <span style={{ background: '#ff5252', color: '#fff', fontSize: '9px', fontWeight: 700, padding: '1px 7px', borderRadius: '20px' }}>Out of Stock</span>}
                        </div>
                        <p style={{ margin: '0 0 6px', fontSize: '14px', fontWeight: 600, color: '#1a1a2e', lineHeight: 1.4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>
                          {item.name}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <StarRating rating={item.rating} />
                          <span style={{ fontSize: '11px', color: '#aaa' }}>({item.reviewCount.toLocaleString('en-IN')})</span>
                          {item.assured && <AssuredBadge />}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                          <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px', fontWeight: 800, color: item.inStock ? '#1a1a2e' : '#bbb' }}>{fmt(item.price)}</span>
                          <span style={{ fontSize: '12px', color: '#ccc', textDecoration: 'line-through' }}>{fmt(item.originalPrice)}</span>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#27ae60' }}>{item.discount}% off</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center', flexShrink: 0 }}>
                        <button
                          onClick={() => { handleMoveToCart(item.id); showToast('Added to cart!') }}
                          disabled={!item.inStock}
                          style={{
                            padding: '9px 20px', border: 'none', borderRadius: '9px',
                            background: item.inStock ? `linear-gradient(135deg, ${PINK}, ${PINK_DARK})` : '#f5f5f5',
                            color: item.inStock ? '#fff' : '#ccc',
                            fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: 700,
                            cursor: item.inStock ? 'pointer' : 'not-allowed', whiteSpace: 'nowrap',
                          }}
                        >
                          {item.inStock ? 'Add to Cart' : 'Notify Me'}
                        </button>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            onClick={() => handleShare(item.id)}
                            style={{
                              flex: 1, padding: '7px 0', border: '1.5px solid #f0e0eb', borderRadius: '8px',
                              background: '#fff', color: '#888', fontSize: '11px', fontWeight: 600, cursor: 'pointer',
                            }}
                          >
                            Share
                          </button>
                          <button
                            onClick={() => handleRemove(item.id)}
                            style={{
                              flex: 1, padding: '7px 0', border: '1.5px solid #ffe0e0', borderRadius: '8px',
                              background: '#fff0f0', color: '#ff5252', fontSize: '11px', fontWeight: 600, cursor: 'pointer',
                            }}
                          >
                            Remove
                          </button>
                        </div>
                        <p style={{ margin: 0, fontSize: '10px', color: '#ccc', textAlign: 'center' }}>Added {item.addedOn}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No results for filter */}
            {displayed.length === 0 && (
              <div style={{ background: '#fff', borderRadius: '16px', border: '1.5px solid #f3e0ed', padding: '48px 20px', textAlign: 'center' }}>
                <p style={{ fontSize: '40px', margin: '0 0 12px' }}>🔍</p>
                <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 6px' }}>No items in this category</p>
                <button onClick={() => setFilterCategory('All')} style={{ background: 'none', border: 'none', color: PINK, fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>Show all items</button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Share modal */}
      <ShareModal item={shareItem} onClose={() => setShareItem(null)} />

      {/* Toast */}
      <Toast message={toast.message} visible={toast.visible} />
    </div>
  )
}
