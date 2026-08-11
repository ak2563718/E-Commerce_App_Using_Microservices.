'use client'
import { useState, useMemo } from 'react'

interface Product {
  id: number
  name: string
  slug: string
  category: string
  brand: string
  image: string
  price: number
  originalPrice: number
  discount: number
  rating: number
  reviewCount: number
  badge?: string
  freeDelivery?: boolean
  assured?: boolean
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Samsung Galaxy S24 Ultra 5G (Titanium Black, 256GB)',
    slug: 'samsung-galaxy-s24-ultra-5g-black-256gb',
    category: 'Smartphones',
    brand: 'Samsung',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&h=300&fit=crop&auto=format',
    price: 109999,
    originalPrice: 134999,
    discount: 18,
    rating: 4.5,
    reviewCount: 18432,
    badge: 'Bestseller',
    freeDelivery: true,
    assured: true,
  },
  {
    id: 2,
    name: 'Apple iPhone 15 Pro Max (Natural Titanium, 512GB)',
    slug: 'apple-iphone-15-pro-max-natural-titanium-512gb',
    category: 'Smartphones',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&h=300&fit=crop&auto=format',
    price: 159900,
    originalPrice: 189900,
    discount: 15,
    rating: 4.6,
    reviewCount: 34210,
    badge: 'Top Rated',
    freeDelivery: true,
    assured: true,
  },
  {
    id: 3,
    name: 'OnePlus 12 5G (Flowy Emerald, 256GB)',
    slug: 'oneplus-12-5g-flowy-emerald-256gb',
    category: 'Smartphones',
    brand: 'OnePlus',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&h=300&fit=crop&auto=format',
    price: 64999,
    originalPrice: 69999,
    discount: 7,
    rating: 4.3,
    reviewCount: 8764,
    freeDelivery: true,
    assured: true,
  },
  {
    id: 4,
    name: 'Xiaomi 14 Pro 5G (Black, 512GB)',
    slug: 'xiaomi-14-pro-5g-black-512gb',
    category: 'Smartphones',
    brand: 'Xiaomi',
    image: 'https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=300&h=300&fit=crop&auto=format',
    price: 79999,
    originalPrice: 99999,
    discount: 20,
    rating: 4.2,
    reviewCount: 5312,
    badge: 'Limited Deal',
    freeDelivery: true,
    assured: false,
  },
  {
    id: 5,
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    slug: 'sony-wh1000xm5-wireless-headphones',
    category: 'Headphones',
    brand: 'Sony',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop&auto=format',
    price: 26990,
    originalPrice: 34990,
    discount: 22,
    rating: 4.7,
    reviewCount: 22154,
    badge: 'Bestseller',
    freeDelivery: true,
    assured: true,
  },
  {
    id: 6,
    name: 'Apple AirPods Pro (2nd Gen) with MagSafe Case',
    slug: 'apple-airpods-pro-2nd-gen-magsafe',
    category: 'Headphones',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=300&h=300&fit=crop&auto=format',
    price: 19900,
    originalPrice: 24900,
    discount: 20,
    rating: 4.5,
    reviewCount: 41087,
    freeDelivery: true,
    assured: true,
  },
  {
    id: 7,
    name: 'Samsung Galaxy Watch 6 Classic (47mm, Graphite)',
    slug: 'samsung-galaxy-watch-6-classic-47mm-graphite',
    category: 'Smartwatches',
    brand: 'Samsung',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&auto=format',
    price: 34999,
    originalPrice: 44999,
    discount: 22,
    rating: 4.4,
    reviewCount: 9823,
    badge: 'New',
    freeDelivery: true,
    assured: true,
  },
  {
    id: 8,
    name: 'Apple Watch Series 9 GPS (45mm, Midnight)',
    slug: 'apple-watch-series-9-gps-45mm-midnight',
    category: 'Smartwatches',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300&h=300&fit=crop&auto=format',
    price: 44900,
    originalPrice: 51900,
    discount: 13,
    rating: 4.6,
    reviewCount: 31450,
    freeDelivery: true,
    assured: true,
  },
  {
    id: 9,
    name: 'Nothing Phone (2a) (Black, 256GB)',
    slug: 'nothing-phone-2a-black-256gb',
    category: 'Smartphones',
    brand: 'Nothing',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop&auto=format',
    price: 23999,
    originalPrice: 27999,
    discount: 14,
    rating: 4.1,
    reviewCount: 4210,
    freeDelivery: false,
    assured: false,
  },
  {
    id: 10,
    name: 'Bose QuietComfort 45 Bluetooth Headphones',
    slug: 'bose-quietcomfort-45-bluetooth-headphones',
    category: 'Headphones',
    brand: 'Bose',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=300&h=300&fit=crop&auto=format',
    price: 25990,
    originalPrice: 34900,
    discount: 25,
    rating: 4.5,
    reviewCount: 15630,
    badge: 'Top Rated',
    freeDelivery: true,
    assured: true,
  },
  {
    id: 11,
    name: 'Garmin Forerunner 265 GPS Running Smartwatch',
    slug: 'garmin-forerunner-265-gps-running-smartwatch',
    category: 'Smartwatches',
    brand: 'Garmin',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=300&h=300&fit=crop&auto=format',
    price: 39999,
    originalPrice: 49999,
    discount: 20,
    rating: 4.3,
    reviewCount: 3207,
    freeDelivery: true,
    assured: false,
  },
  {
    id: 12,
    name: 'Google Pixel 8 Pro (Hazel, 128GB)',
    slug: 'google-pixel-8-pro-hazel-128gb',
    category: 'Smartphones',
    brand: 'Google',
    image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=300&h=300&fit=crop&auto=format',
    price: 79999,
    originalPrice: 99999,
    discount: 20,
    rating: 4.4,
    reviewCount: 7851,
    freeDelivery: true,
    assured: true,
  },
]

const ALL_CATEGORIES = [...new Set(PRODUCTS.map(p => p.category))]
const ALL_BRANDS = [...new Set(PRODUCTS.map(p => p.brand))].sort()

const RATING_FILTERS = [
  { label: '4★ & above', value: 4 },
  { label: '3★ & above', value: 3 },
  { label: '2★ & above', value: 2 },
]

const PINK = '#e91e8c'
const PINK_DARK = '#c4177a'
const PINK_LIGHT = '#fce4f3'
const PINK_MID = '#f48ccc'

function StarRating({ rating }: { rating: number }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '2px',
        background: rating >= 4 ? '#27ae60' : rating >= 3 ? '#f39c12' : '#e74c3c',
        color: '#fff',
        fontSize: '10px',
        fontWeight: 700,
        padding: '2px 6px',
        borderRadius: '4px',
      }}
    >
      {rating.toFixed(1)} ★
    </span>
  )
}

function CheckboxItem({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        padding: '4px 0',
        fontSize: '13px',
        color: checked ? PINK : '#333',
        fontWeight: checked ? 600 : 400,
      }}
    >
      <div
        style={{
          width: '16px',
          height: '16px',
          minWidth: '16px',
          border: `2px solid ${checked ? PINK : '#ccc'}`,
          borderRadius: '4px',
          background: checked ? PINK : '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.15s',
        }}
      >
        {checked && (
          <svg width="9" height="7" viewBox="0 0 10 8" fill="none">
            <path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <input type="checkbox" checked={checked} onChange={onChange} style={{ display: 'none' }} />
      {label}
    </label>
  )
}

function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ borderBottom: '1px solid #f3e0ed', paddingBottom: '14px', marginBottom: '14px' }}>
      <h4
        style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: '11px',
          fontWeight: 700,
          color: PINK,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          margin: '0 0 10px',
        }}
      >
        {title}
      </h4>
      {children}
    </div>
  )
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        background: PINK_LIGHT,
        border: `1px solid ${PINK_MID}`,
        borderRadius: '20px',
        padding: '3px 10px 3px 12px',
        fontSize: '12px',
        color: PINK_DARK,
        fontWeight: 500,
      }}
    >
      {label}
      <button
        onClick={onRemove}
        style={{
          background: PINK_MID,
          border: 'none',
          cursor: 'pointer',
          color: '#fff',
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          lineHeight: 1,
          padding: 0,
          fontWeight: 700,
        }}
      >
        ×
      </button>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        borderRadius: '12px',
        overflow: 'hidden',
        border: `1.5px solid ${hovered ? PINK_MID : '#f0e0eb'}`,
        boxShadow: hovered ? '0 8px 28px rgba(233,30,140,0.13)' : '0 2px 8px rgba(0,0,0,0.05)',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Badge */}
      {product.badge && (
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            background: product.badge === 'New' ? '#7c3aed' : product.badge === 'Top Rated' ? '#059669' : PINK,
            color: '#fff',
            fontSize: '9px',
            fontWeight: 700,
            padding: '3px 8px',
            borderRadius: '20px',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            zIndex: 2,
          }}
        >
          {product.badge}
        </div>
      )}

      {/* Wishlist */}
      <button
        onClick={e => { e.stopPropagation(); setWishlisted(v => !v) }}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: '#fff',
          border: `1.5px solid ${wishlisted ? PINK : '#e0d0da'}`,
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 2,
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
          transition: 'all 0.15s',
        }}
      >
        <svg width="14" height="13" viewBox="0 0 24 22" fill={wishlisted ? PINK : 'none'} stroke={wishlisted ? PINK : '#999'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      {/* Image */}
      <div
        style={{
          background: '#fdf4fa',
          height: '180px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <img
          src={imgError ? 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=300&fit=crop&auto=format' : product.image}
          alt={product.name}
          onError={() => setImgError(true)}
          style={{
            width: '140px',
            height: '140px',
            objectFit: 'contain',
            transform: hovered ? 'scale(1.07)' : 'scale(1)',
            transition: 'transform 0.25s ease',
          }}
        />
      </div>

      {/* Info */}
      <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <p
          style={{
            margin: 0,
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            fontWeight: 500,
            color: '#1a1a2e',
            lineHeight: 1.4,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: '36px',
          }}
        >
          {product.name}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <StarRating rating={product.rating} />
          <span style={{ fontSize: '11px', color: '#999' }}>({product.reviewCount.toLocaleString('en-IN')})</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', flexWrap: 'wrap' }}>
          <span
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '16px',
              fontWeight: 700,
              color: '#1a1a2e',
            }}
          >
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          <span style={{ fontSize: '12px', color: '#bbb', textDecoration: 'line-through' }}>
            ₹{product.originalPrice.toLocaleString('en-IN')}
          </span>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#27ae60' }}>
            {product.discount}% off
          </span>
        </div>

        {product.freeDelivery && (
          <span style={{ fontSize: '11px', color: '#27ae60', fontWeight: 500 }}>✓ Free Delivery</span>
        )}

        {product.assured && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px',
              fontSize: '10px',
              fontWeight: 700,
              color: PINK,
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill={PINK}>
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
              <path d="M10 17l-4-4 1.4-1.4 2.6 2.6 6.6-6.6L18 9l-8 8z" fill="#fff" />
            </svg>
            ShopHub Assured
          </span>
        )}

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '6px', marginTop: 'auto', paddingTop: '6px' }}>
          <button
            style={{
              flex: 1,
              padding: '8px 0',
              background: '#fff',
              border: `1.5px solid ${PINK}`,
              borderRadius: '8px',
              color: PINK,
              fontFamily: 'Poppins, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLButtonElement
              el.style.background = PINK_LIGHT
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLButtonElement
              el.style.background = '#fff'
            }}
          >
            ADD TO CART
          </button>
          <button
            style={{
              flex: 1,
              padding: '8px 0',
              background: `linear-gradient(135deg, ${PINK} 0%, #c2185b 100%)`,
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'opacity 0.15s',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.88' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
          >
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  )
}

export default function SearchProduct() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [minRating, setMinRating] = useState<number | null>(null)
  const [freeDeliveryOnly, setFreeDeliveryOnly] = useState(false)
  const [assuredOnly, setAssuredOnly] = useState(false)
  const [discountRange, setDiscountRange] = useState<number | null>(null)

  const toggleCategory = (cat: string) =>
    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])

  const toggleBrand = (brand: string) =>
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand])

  const clearAll = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setMinRating(null)
    setFreeDeliveryOnly(false)
    setAssuredOnly(false)
    setDiscountRange(null)
  }

  const hasFilters =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    minRating !== null ||
    freeDeliveryOnly ||
    assuredOnly ||
    discountRange !== null

  const filtered = useMemo(() => {
    let result = [...PRODUCTS]
    if (selectedCategories.length > 0) result = result.filter(p => selectedCategories.includes(p.category))
    if (selectedBrands.length > 0) result = result.filter(p => selectedBrands.includes(p.brand))
    if (minRating !== null) result = result.filter(p => p.rating >= minRating)
    if (freeDeliveryOnly) result = result.filter(p => p.freeDelivery)
    if (assuredOnly) result = result.filter(p => p.assured)
    if (discountRange !== null) result = result.filter(p => p.discount >= discountRange)
    return result
  }, [selectedCategories, selectedBrands, minRating, freeDeliveryOnly, assuredOnly, discountRange])

  return (
    <div style={{ minHeight: '100vh', background: '#fdf0f8', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${PINK} 0%, #c2185b 100%)`,
          padding: '14px 0',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: '0 3px 16px rgba(233,30,140,0.25)',
        }}
      >
        <div
          style={{
            maxWidth: '1320px',
            margin: '0 auto',
            padding: '0 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                background: '#fff',
                borderRadius: '10px',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke={PINK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 6h18M16 10a4 4 0 01-8 0" stroke={PINK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '22px',
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '-0.3px',
              }}
            >
              ShopHub
            </span>
          </div>

          <div
            style={{
              background: 'rgba(255,255,255,0.18)',
              borderRadius: '8px',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flex: '0 0 420px',
              border: '1px solid rgba(255,255,255,0.3)',
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>Search products…</span>
          </div>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            {['Wishlist', 'Cart', 'Account'].map(item => (
              <span key={item} style={{ color: '#fff', fontSize: '13px', fontWeight: 500, cursor: 'pointer', opacity: 0.9 }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
          padding: '20px 28px',
          display: 'grid',
          gridTemplateColumns: '220px 1fr',
          gap: '20px',
          alignItems: 'start',
        }}
      >
        {/* Sidebar */}
        <aside
          style={{
            background: '#fff',
            borderRadius: '14px',
            padding: '18px',
            position: 'sticky',
            top: '76px',
            border: '1.5px solid #f3e0ed',
            boxShadow: '0 2px 12px rgba(233,30,140,0.06)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
              paddingBottom: '12px',
              borderBottom: '1.5px solid #f3e0ed',
            }}
          >
            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '15px', fontWeight: 700, color: '#1a1a2e' }}>
              Filters
            </span>
            {hasFilters && (
              <button
                onClick={clearAll}
                style={{
                  background: 'none',
                  border: 'none',
                  color: PINK,
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  padding: 0,
                  letterSpacing: '0.03em',
                }}
              >
                CLEAR ALL
              </button>
            )}
          </div>

          <SidebarSection title="Category">
            {ALL_CATEGORIES.map(cat => (
              <CheckboxItem key={cat} label={cat} checked={selectedCategories.includes(cat)} onChange={() => toggleCategory(cat)} />
            ))}
          </SidebarSection>

          <SidebarSection title="Brand">
            {ALL_BRANDS.map(brand => (
              <CheckboxItem key={brand} label={brand} checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} />
            ))}
          </SidebarSection>

          <SidebarSection title="Customer Rating">
            {RATING_FILTERS.map(rf => (
              <label
                key={rf.value}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  padding: '4px 0',
                  fontSize: '13px',
                  color: minRating === rf.value ? PINK : '#333',
                  fontWeight: minRating === rf.value ? 600 : 400,
                }}
              >
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === rf.value}
                  onChange={() => setMinRating(minRating === rf.value ? null : rf.value)}
                  style={{ accentColor: PINK }}
                />
                {rf.label}
              </label>
            ))}
          </SidebarSection>

          <SidebarSection title="Discount">
            {[10, 20, 30, 40].map(d => (
              <label
                key={d}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  padding: '4px 0',
                  fontSize: '13px',
                  color: discountRange === d ? PINK : '#333',
                  fontWeight: discountRange === d ? 600 : 400,
                }}
              >
                <input
                  type="radio"
                  name="discount"
                  checked={discountRange === d}
                  onChange={() => setDiscountRange(discountRange === d ? null : d)}
                  style={{ accentColor: PINK }}
                />
                {d}% or more
              </label>
            ))}
          </SidebarSection>

          <SidebarSection title="Availability">
            <CheckboxItem label="Free Delivery" checked={freeDeliveryOnly} onChange={() => setFreeDeliveryOnly(v => !v)} />
            <CheckboxItem label="ShopHub Assured" checked={assuredOnly} onChange={() => setAssuredOnly(v => !v)} />
          </SidebarSection>
        </aside>

        {/* Main */}
        <main>
          {/* Result count + active chips */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexWrap: 'wrap',
              marginBottom: '14px',
            }}
          >
            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: 600, color: '#1a1a2e' }}>
              {filtered.length} <span style={{ color: '#999', fontWeight: 400 }}>products found</span>
            </span>
            {hasFilters && (
              <>
                {selectedCategories.map(cat => (
                  <FilterChip key={cat} label={cat} onRemove={() => toggleCategory(cat)} />
                ))}
                {selectedBrands.map(brand => (
                  <FilterChip key={brand} label={brand} onRemove={() => toggleBrand(brand)} />
                ))}
                {minRating !== null && (
                  <FilterChip label={`${minRating}★ & above`} onRemove={() => setMinRating(null)} />
                )}
                {freeDeliveryOnly && (
                  <FilterChip label="Free Delivery" onRemove={() => setFreeDeliveryOnly(false)} />
                )}
                {assuredOnly && (
                  <FilterChip label="ShopHub Assured" onRemove={() => setAssuredOnly(false)} />
                )}
                {discountRange !== null && (
                  <FilterChip label={`${discountRange}% or more`} onRemove={() => setDiscountRange(null)} />
                )}
              </>
            )}
          </div>

          {/* Product Grid */}
          {filtered.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '14px',
              }}
            >
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div
              style={{
                background: '#fff',
                borderRadius: '14px',
                padding: '64px 20px',
                textAlign: 'center',
                border: '1.5px solid #f3e0ed',
              }}
            >
              <div style={{ fontSize: '52px', marginBottom: '16px' }}>🛍️</div>
              <h3
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#1a1a2e',
                  margin: '0 0 8px',
                }}
              >
                No products found
              </h3>
              <p style={{ fontSize: '13px', color: '#aaa', margin: '0 0 20px' }}>
                Try adjusting your filters to discover more
              </p>
              <button
                onClick={clearAll}
                style={{
                  background: `linear-gradient(135deg, ${PINK} 0%, #c2185b 100%)`,
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '11px 28px',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                CLEAR ALL FILTERS
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
