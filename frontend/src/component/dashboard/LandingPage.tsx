'use client'
import { useState } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────

interface CategorySection {
  id: string
  label: string
  color: string
  gradient: string
  bgLight: string
  images: { url: string; caption: string }[]
}

interface Product {
  id: number
  name: string
  category: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  image: string
  badge?: string
  badgeColor?: string
}

// ─── Data ────────────────────────────────────────────────────────────────────

const categorySections: CategorySection[] = [
  {
    id: 'electronics',
    label: 'Electronics',
    color: '#1565c0',
    gradient: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
    bgLight: '#e3f2fd',
    images: [
      { url: 'https://images.unsplash.com/photo-1556196148-1fb724238998?w=600&q=80', caption: 'Headphones' },
      { url: 'https://images.unsplash.com/photo-1542317854-f9596ae570f7?w=600&q=80', caption: 'Laptops' },
      { url: 'https://images.unsplash.com/photo-1525513688408-aef73a11a340?w=600&q=80', caption: 'Cameras' },
    ],
  },
  {
    id: 'fashion',
    label: 'Fashion',
    color: '#7b1fa2',
    gradient: 'linear-gradient(135deg, #7b1fa2 0%, #4a148c 100%)',
    bgLight: '#f3e5f5',
    images: [
      { url: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600&q=80', caption: 'Outfits' },
      { url: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=600&q=80', caption: 'Style' },
      { url: 'https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe?w=600&q=80', caption: 'Wardrobe' },
    ],
  },
  {
    id: 'mobiles',
    label: 'Mobiles',
    color: '#00897b',
    gradient: 'linear-gradient(135deg, #00897b 0%, #00695c 100%)',
    bgLight: '#e0f2f1',
    images: [
      { url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80', caption: 'Smartphones' },
      { url: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&q=80', caption: 'Flagships' },
      { url: 'https://images.unsplash.com/photo-1634403665481-74948d815f03?w=600&q=80', caption: 'Latest Models' },
    ],
  },
  {
    id: 'beauty',
    label: 'Beauty',
    color: '#e91e8c',
    gradient: 'linear-gradient(135deg, #e91e8c 0%, #ad1457 100%)',
    bgLight: '#fce4ec',
    images: [
      { url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80', caption: 'Makeup' },
      { url: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&q=80', caption: 'Cosmetics' },
      { url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80', caption: 'Skincare' },
    ],
  },
  {
    id: 'home',
    label: 'Home & Living',
    color: '#ef6c00',
    gradient: 'linear-gradient(135deg, #ef6c00 0%, #bf360c 100%)',
    bgLight: '#fff3e0',
    images: [
      { url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80', caption: 'Furniture' },
      { url: 'https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=600&q=80', caption: 'Sofas' },
      { url: 'https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?w=600&q=80', caption: 'Decor' },
    ],
  },
]

const products: Product[] = [
  {
    id: 1,
    name: 'Sony WH-1000XM5 Wireless Headphones',
    category: 'Electronics',
    price: 279,
    originalPrice: 399,
    rating: 4.8,
    reviews: 2341,
    image: 'https://images.unsplash.com/photo-1528148343865-51218c4a13e6?w=400&q=80',
    badge: '30% off',
    badgeColor: '#e91e8c',
  },
  {
    id: 2,
    name: 'Apple MacBook Pro 14"',
    category: 'Electronics',
    price: 1599,
    originalPrice: 1999,
    rating: 4.9,
    reviews: 876,
    image: 'https://images.unsplash.com/photo-1613398773682-9e272a85f203?w=400&q=80',
    badge: 'Best Seller',
    badgeColor: '#1565c0',
  },
  {
    id: 3,
    name: "Women's Floral Summer Dress",
    category: 'Fashion',
    price: 49,
    originalPrice: 89,
    rating: 4.5,
    reviews: 1120,
    image: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=400&q=80',
    badge: '45% off',
    badgeColor: '#7b1fa2',
  },
  {
    id: 4,
    name: 'Samsung Galaxy S24 Ultra',
    category: 'Mobiles',
    price: 1099,
    originalPrice: 1299,
    rating: 4.7,
    reviews: 3402,
    image: 'https://images.unsplash.com/photo-1634403665481-74948d815f03?w=400&q=80',
    badge: 'New',
    badgeColor: '#00897b',
  },
  {
    id: 5,
    name: 'Luxury Skincare Gift Set',
    category: 'Beauty',
    price: 89,
    originalPrice: 129,
    rating: 4.6,
    reviews: 654,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80',
  },
  {
    id: 6,
    name: 'Modern Chaise Lounge Sofa',
    category: 'Home',
    price: 599,
    originalPrice: 899,
    rating: 4.4,
    reviews: 231,
    image: 'https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=400&q=80',
    badge: 'Hot Deal',
    badgeColor: '#ef6c00',
  },
  {
    id: 7,
    name: 'Nike Air Zoom Pegasus 41',
    category: 'Sports',
    price: 119,
    originalPrice: 160,
    rating: 4.8,
    reviews: 5812,
    image: 'https://images.unsplash.com/photo-1591311630200-ffa9120a540f?w=400&q=80',
    badge: 'Top Rated',
    badgeColor: '#f9a825',
  },
  {
    id: 8,
    name: 'Atomic Habits — James Clear',
    category: 'Books',
    price: 14,
    originalPrice: 22,
    rating: 4.9,
    reviews: 9201,
    image: 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=400&q=80',
    badge: 'Bestseller',
    badgeColor: '#558b2f',
  },
  {
    id: 9,
    name: 'Front-Load Washing Machine 8kg',
    category: 'Appliances',
    price: 449,
    originalPrice: 599,
    rating: 4.3,
    reviews: 412,
    image: 'https://images.unsplash.com/photo-1585314293845-4db3b9d0c6e9?w=400&q=80',
  },
  {
    id: 10,
    name: "Men's Slim-Fit Casual Jacket",
    category: 'Fashion',
    price: 79,
    originalPrice: 139,
    rating: 4.6,
    reviews: 883,
    image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=400&q=80',
    badge: '43% off',
    badgeColor: '#7b1fa2',
  },
  {
    id: 11,
    name: 'Canon EOS R50 Mirrorless Camera',
    category: 'Electronics',
    price: 679,
    originalPrice: 899,
    rating: 4.7,
    reviews: 1034,
    image: 'https://images.unsplash.com/photo-1525513688408-aef73a11a340?w=400&q=80',
    badge: '24% off',
    badgeColor: '#1565c0',
  },
  {
    id: 12,
    name: 'Professional Makeup Brush Set',
    category: 'Beauty',
    price: 34,
    originalPrice: 59,
    rating: 4.5,
    reviews: 2209,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80',
  },
  {
    id: 13,
    name: 'Running Shoes Ultra Boost',
    category: 'Sports',
    price: 89,
    originalPrice: 130,
    rating: 4.6,
    reviews: 3310,
    image: 'https://images.unsplash.com/photo-1637437757614-6491c8e915b5?w=400&q=80',
  },
  {
    id: 14,
    name: 'Dining Table Set — Oak Finish',
    category: 'Home',
    price: 349,
    originalPrice: 499,
    rating: 4.4,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=80',
    badge: 'Limited',
    badgeColor: '#ef6c00',
  },
  {
    id: 15,
    name: 'iPhone 15 Pro Max 256GB',
    category: 'Mobiles',
    price: 1199,
    originalPrice: 1399,
    rating: 4.9,
    reviews: 6742,
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&q=80',
    badge: 'New',
    badgeColor: '#00897b',
  },
]

// ─── Star Rating ──────────────────────────────────────────────────────────────

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24"
          fill={i <= Math.round(rating) ? '#f9a825' : 'none'}
          stroke={i <= Math.round(rating) ? '#f9a825' : '#d1d5db'}
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: Product }) {
  const [wishlisted, setWishlisted] = useState(false)
  const discount = Math.round((1 - product.price / product.originalPrice) * 100)

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden flex flex-col group cursor-pointer transition-all duration-200 hover:-translate-y-1"
      style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(233,30,140,0.14)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.07)' }}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50" style={{ height: '200px' }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Badge */}
        {product.badge && (
          <span
            className="absolute top-3 left-3 text-white text-[10px] font-black px-2 py-1 rounded-lg"
            style={{ background: product.badgeColor }}
          >
            {product.badge}
          </span>
        )}
        {/* Discount tag */}
        {!product.badge && discount > 0 && (
          <span className="absolute top-3 left-3 text-white text-[10px] font-black px-2 py-1 rounded-lg"
            style={{ background: '#e91e8c' }}>
            {discount}% off
          </span>
        )}
        {/* Wishlist */}
        <button
          onClick={e => { e.stopPropagation(); setWishlisted(v => !v) }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-white transition-all duration-150 hover:scale-110"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24"
            fill={wishlisted ? '#e91e8c' : 'none'}
            stroke={wishlisted ? '#e91e8c' : '#9ca3af'}
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
        {/* Quick add overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
          <button
            className="w-full py-2.5 text-white text-xs font-bold tracking-wide flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)' }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#e91e8c' }}>
          {product.category}
        </span>
        <p className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2">
          {product.name}
        </p>
        <div className="flex items-center gap-1.5">
          <Stars rating={product.rating} />
          <span className="text-[11px] text-gray-400">({product.reviews.toLocaleString()})</span>
        </div>
        <div className="flex items-center gap-2 mt-auto pt-1">
          <span className="text-base font-black text-gray-900">${product.price}</span>
          <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
        </div>
      </div>
    </div>
  )
}

// ─── Category Showcase Row ────────────────────────────────────────────────────

function CategoryShowcase({ section }: { section: CategorySection }) {
  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="w-1 h-6 rounded-full"
            style={{ background: section.gradient }}
          />
          <h2 className="text-lg font-black text-gray-800">{section.label}</h2>
        </div>
        <button
          className="text-xs font-bold flex items-center gap-1 transition-colors hover:opacity-80"
          style={{ color: section.color }}
        >
          View All
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Image trio + category tile */}
      <div className="grid gap-3" style={{ gridTemplateColumns: '1fr 1fr 1fr 140px' }}>
        {section.images.map((img, i) => (
          <div
            key={i}
            className="relative rounded-2xl overflow-hidden cursor-pointer group"
            style={{ height: '180px' }}
          >
            <img
              src={img.url}
              alt={img.caption}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 50%)' }}
            />
            <span className="absolute bottom-3 left-3 text-white text-xs font-bold">
              {img.caption}
            </span>
          </div>
        ))}

        {/* Category tile */}
        <div
          className="rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer group transition-all duration-200 hover:scale-105"
          style={{
            background: section.gradient,
            height: '180px',
            boxShadow: `0 6px 20px ${section.color}33`,
          }}
        >
          <span className="text-white text-3xl font-black opacity-20 select-none">
            {section.label[0]}
          </span>
          <div className="text-center px-3">
            <p className="text-white font-black text-sm">{section.label}</p>
            <p className="text-white text-[10px] opacity-75 mt-0.5">Shop Now →</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Landing Page ─────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const filters = ['All', 'Electronics', 'Fashion', 'Mobiles', 'Beauty', 'Home', 'Sports', 'Books', 'Appliances']

  const filtered = activeFilter === 'All'
    ? products
    : products.filter(p => p.category.toLowerCase() === activeFilter.toLowerCase())

  return (
    <div className="min-h-screen" style={{ background: '#f9fafb' }}>

      {/* ── Hero Banner ─────────────────────────────────────────────────── */}
      <div className="w-full relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #fce4ec 0%, #fdf2f6 55%, #f3e5f5 100%)', minHeight: '220px' }}>
        {/* Decorative blobs */}
        <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #e91e8c, transparent)' }} />
        <div className="absolute -bottom-16 left-20 w-48 h-48 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #7b1fa2, transparent)' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 flex items-center justify-between gap-8">
          <div className="flex flex-col gap-4 max-w-lg">
            <span
              className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full w-fit"
              style={{ background: 'rgba(233,30,140,0.1)', color: '#e91e8c' }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#e91e8c' }} />
              Flash Sale — Up to 70% off today!
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
              Everything you love,<br />
              <span style={{ color: '#e91e8c' }}>delivered fast.</span>
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed">
              Millions of products across every category. Free shipping on orders above $49.
            </p>
            <div className="flex items-center gap-3">
              <button
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-150 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)',
                  boxShadow: '0 4px 16px rgba(233,30,140,0.35)',
                }}
              >
                Shop Now
              </button>
              <button className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-600 border border-gray-200 bg-white hover:bg-pink-50 hover:border-pink-200 transition-all duration-150">
                Explore Deals
              </button>
            </div>
          </div>

          {/* Hero stat pills */}
          <div className="hidden md:flex flex-col gap-3 shrink-0">
            {[
              { label: 'Products', value: '5M+', icon: '🛍️' },
              { label: 'Happy Customers', value: '2.3M', icon: '😊' },
              { label: 'Sellers', value: '120K', icon: '🏪' },
            ].map(stat => (
              <div key={stat.label}
                className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3"
                style={{ boxShadow: '0 2px 12px rgba(233,30,140,0.10)' }}>
                <span className="text-xl">{stat.icon}</span>
                <div>
                  <p className="font-black text-base text-gray-800">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 flex flex-col gap-14">

        {/* ── Category Showcases ──────────────────────────────────────── */}
        <section className="flex flex-col gap-10">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-black text-gray-900">Shop by Category</h2>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          {categorySections.map(section => (
            <CategoryShowcase key={section.id} section={section} />
          ))}
        </section>

        {/* ── Product Grid ────────────────────────────────────────────── */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black text-gray-900">Popular Products</h2>
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(233,30,140,0.08)', color: '#e91e8c' }}
              >
                {filtered.length} items
              </span>
            </div>

            {/* Filter chips */}
            <div className="flex items-center gap-2 flex-wrap">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150"
                  style={
                    activeFilter === f
                      ? {
                          background: 'linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)',
                          color: '#fff',
                          boxShadow: '0 3px 10px rgba(233,30,140,0.30)',
                        }
                      : {
                          background: '#fff',
                          color: '#6b7280',
                          border: '1px solid #e5e7eb',
                        }
                  }
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid gap-5"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load more */}
          <div className="flex justify-center pt-4">
            <button
              className="px-8 py-3 rounded-xl font-bold text-sm border-2 transition-all duration-150 hover:bg-pink-50"
              style={{ color: '#e91e8c', borderColor: '#f8bbd0' }}
            >
              Load More Products
            </button>
          </div>
        </section>

        {/* ── Trust Banner ─────────────────────────────────────────────── */}
        <section
          className="rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6"
          style={{ background: 'linear-gradient(135deg, #fce4ec 0%, #fdf2f6 100%)' }}
        >
          {[
            { icon: '🚚', title: 'Free Delivery', sub: 'On orders above $49' },
            { icon: '🔄', title: 'Easy Returns', sub: '30-day hassle-free returns' },
            { icon: '🔒', title: 'Secure Payments', sub: '100% protected checkout' },
            { icon: '🎧', title: '24×7 Support', sub: 'Always here to help' },
          ].map(item => (
            <div key={item.title} className="flex flex-col items-center text-center gap-2">
              <span className="text-3xl">{item.icon}</span>
              <p className="font-black text-sm text-gray-800">{item.title}</p>
              <p className="text-xs text-gray-400">{item.sub}</p>
            </div>
          ))}
        </section>

      </div>
    </div>
  )
}