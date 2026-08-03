'use client'
import { useState, useMemo } from "react"
import { Search, X, ShoppingCart, Heart, Star, SlidersHorizontal, ChevronDown, Package, Zap, Tag } from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

type Tab = "profile" | "orders" | "wishlist" | "notifications" | "shop"

type Product = {
  id: number
  name: string
  category: string
  price: number
  original: number
  discount: number
  rating: number
  reviews: number
  img: string
  badge?: string
  inStock: boolean
}

// ─── Data ────────────────────────────────────────────────────────────────────

const user = {
  name: "Rahul Sharma",
  email: "rahul.sharma@gmail.com",
  phone: "+91 98765 43210",
  joined: "January 2024",
  avatar: "RS",
}

const orders = [
  { id: "#SH10234", item: "Nike Air Max 270", date: "28 Jul 2026", status: "Delivered", price: "₹8,499", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop&auto=format" },
  { id: "#SH10198", item: "boAt Rockerz 450", date: "20 Jul 2026", status: "In Transit", price: "₹1,799", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop&auto=format" },
  { id: "#SH10155", item: "Levi's 511 Slim Jeans", date: "10 Jul 2026", status: "Delivered", price: "₹2,299", img: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=80&h=80&fit=crop&auto=format" },
  { id: "#SH10102", item: "Philips Air Fryer", date: "1 Jul 2026", status: "Cancelled", price: "₹6,999", img: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=80&h=80&fit=crop&auto=format" },
]

const wishlistData = [
  { id: 1, name: "Apple iPhone 15", price: "₹79,999", original: "₹89,999", discount: "11%", img: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=120&h=120&fit=crop&auto=format" },
  { id: 2, name: "Sony WH-1000XM5", price: "₹24,990", original: "₹29,990", discount: "17%", img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=120&h=120&fit=crop&auto=format" },
  { id: 3, name: "Samsung 4K Monitor", price: "₹32,500", original: "₹39,000", discount: "17%", img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=120&h=120&fit=crop&auto=format" },
  { id: 4, name: "Adidas Ultraboost 22", price: "₹12,999", original: "₹15,999", discount: "19%", img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=120&h=120&fit=crop&auto=format" },
]

const notifications = [
  { id: 1, type: "order", title: "Order Delivered!", desc: "Your Nike Air Max 270 has been delivered.", time: "2 hours ago", read: false },
  { id: 2, type: "offer", title: "Flash Sale — 40% Off", desc: "Mega sale on electronics. Ends tonight at midnight!", time: "5 hours ago", read: false },
  { id: 3, type: "order", title: "Order Shipped", desc: "boAt Rockerz 450 is on its way. ETA: 2 days.", time: "Yesterday", read: true },
  { id: 4, type: "offer", title: "Exclusive Deal for You", desc: "Use code RAHUL20 to get extra 20% off on your next order.", time: "2 days ago", read: true },
  { id: 5, type: "system", title: "Profile Updated", desc: "Your phone number was updated successfully.", time: "3 days ago", read: true },
]

const allProducts: Product[] = [
  { id: 1, name: "Apple iPhone 15 Pro", category: "Electronics", price: 119999, original: 134999, discount: 11, rating: 4.8, reviews: 2340, img: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&auto=format", badge: "Bestseller", inStock: true },
  { id: 2, name: "Sony WH-1000XM5 Headphones", category: "Audio", price: 24990, original: 29990, discount: 17, rating: 4.7, reviews: 1820, img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop&auto=format", badge: "Top Rated", inStock: true },
  { id: 3, name: "Nike Air Max 270", category: "Footwear", price: 8499, original: 10995, discount: 23, rating: 4.5, reviews: 984, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&auto=format", inStock: true },
  { id: 4, name: "Samsung 32\" 4K Monitor", category: "Electronics", price: 32500, original: 39000, discount: 17, rating: 4.6, reviews: 562, img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop&auto=format", inStock: true },
  { id: 5, name: "Levi's 511 Slim Fit Jeans", category: "Fashion", price: 2299, original: 3499, discount: 34, rating: 4.3, reviews: 3120, img: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=400&h=400&fit=crop&auto=format", badge: "Deal", inStock: true },
  { id: 6, name: "Philips HD Air Fryer", category: "Appliances", price: 6999, original: 9999, discount: 30, rating: 4.4, reviews: 1450, img: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop&auto=format", inStock: false },
  { id: 7, name: "boAt Rockerz 450 Wireless", category: "Audio", price: 1799, original: 3990, discount: 55, rating: 4.1, reviews: 8901, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&auto=format", badge: "Hot", inStock: true },
  { id: 8, name: "Adidas Ultraboost 22", category: "Footwear", price: 12999, original: 15999, discount: 19, rating: 4.6, reviews: 730, img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop&auto=format", inStock: true },
  { id: 9, name: "Apple MacBook Air M2", category: "Electronics", price: 114900, original: 119900, discount: 4, rating: 4.9, reviews: 4210, img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop&auto=format", badge: "New", inStock: true },
  { id: 10, name: "Canon EOS R50 Camera", category: "Electronics", price: 59990, original: 72990, discount: 18, rating: 4.7, reviews: 321, img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop&auto=format", inStock: true },
  { id: 11, name: "Dyson V12 Vacuum", category: "Appliances", price: 52900, original: 62900, discount: 16, rating: 4.5, reviews: 890, img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&auto=format", inStock: true },
  { id: 12, name: "The North Face Jacket", category: "Fashion", price: 11999, original: 15999, discount: 25, rating: 4.4, reviews: 612, img: "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=400&h=400&fit=crop&auto=format", inStock: false },
]

const categories = ["All", "Electronics", "Audio", "Footwear", "Fashion", "Appliances"]

const statusColor: Record<string, { bg: string; text: string }> = {
  Delivered: { bg: "#e8f5e9", text: "#388e3c" },
  "In Transit": { bg: "#e3f2fd", text: "#1976d2" },
  Cancelled: { bg: "#fce4ec", text: "#c62828" },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={11}
          className={i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"}
        />
      ))}
    </div>
  )
}

function BadgePill({ badge }: { badge: string }) {
  const map: Record<string, string> = {
    Bestseller: "#7c3aed",
    "Top Rated": "#0ea5e9",
    Hot: "#ef4444",
    Deal: "#16a34a",
    New: "#e91e8c",
  }
  return (
    <span
      className="text-white text-xs font-black px-2 py-0.5 rounded-full"
      style={{ background: map[badge] ?? "#e91e8c", fontSize: 9 }}
    >
      {badge}
    </span>
  )
}

function ProductCard({ product, onWishlist, wishlisted }: {
  product: Product
  onWishlist: (id: number) => void
  wishlisted: boolean
}) {
  const [addedToCart, setAddedToCart] = useState(false)

  function handleCart() {
    if (!product.inStock) return
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 1800)
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden flex flex-col group transition-shadow duration-200 hover:shadow-xl"
      style={{ boxShadow: "0 4px 20px rgba(233,30,140,0.07)" }}>
      {/* Image */}
      <div className="relative overflow-hidden" style={{ background: "#fdf2f6" }}>
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="text-xs font-black text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
              Out of Stock
            </span>
          </div>
        )}
        <div className="absolute top-2.5 left-2.5 flex gap-1.5 flex-wrap">
          {product.badge && <BadgePill badge={product.badge} />}
          <span className="text-xs font-black px-2 py-0.5 rounded-full text-white"
            style={{ background: "#16a34a", fontSize: 9 }}>
            {product.discount}% off
          </span>
        </div>
        <button
          onClick={() => onWishlist(product.id)}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm transition-transform duration-150 hover:scale-110"
        >
          <Heart
            size={15}
            className={wishlisted ? "fill-pink-500 text-pink-500" : "text-gray-300"}
          />
        </button>
      </div>

      {/* Info */}
      <div className="p-3.5 flex flex-col flex-1">
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">{product.category}</p>
        <p className="text-sm font-bold text-gray-800 leading-snug line-clamp-2 mb-2">{product.name}</p>

        <div className="flex items-center gap-1.5 mb-2.5">
          <StarRating rating={product.rating} />
          <span className="text-xs text-gray-400">({product.reviews.toLocaleString()})</span>
        </div>

        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-base font-black" style={{ color: "#e91e8c" }}>
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          <span className="text-xs text-gray-400 line-through">
            ₹{product.original.toLocaleString("en-IN")}
          </span>
        </div>

        <button
          onClick={handleCart}
          disabled={!product.inStock}
          className="mt-auto flex items-center justify-center gap-2 w-full py-2 rounded-xl text-sm font-bold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: addedToCart ? "#16a34a" : "rgba(233,30,140,0.09)",
            color: addedToCart ? "#fff" : "#e91e8c",
          }}
        >
          <ShoppingCart size={14} />
          {addedToCart ? "Added!" : product.inStock ? "Add to Cart" : "Unavailable"}
        </button>
      </div>
    </div>
  )
}

// ─── Product Search + Listing Tab ─────────────────────────────────────────────

function ShopTab() {
  const [query, setQuery] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")
  const [sortBy, setSortBy] = useState("relevance")
  const [wishlistedIds, setWishlistedIds] = useState<Set<number>>(new Set([1, 2]))
  const [showFilters, setShowFilters] = useState(false)
  const [maxPrice, setMaxPrice] = useState(150000)

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) setSubmitted(true)
  }

  function handleClear() {
    setQuery("")
    setSubmitted(false)
    setActiveCategory("All")
  }

  function toggleWishlist(id: number) {
    setWishlistedIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const filtered = useMemo(() => {
    let list = allProducts

    if (submitted && query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      )
    }

    if (activeCategory !== "All") {
      list = list.filter(p => p.category === activeCategory)
    }

    list = list.filter(p => p.price <= maxPrice)

    switch (sortBy) {
      case "price-asc": return [...list].sort((a, b) => a.price - b.price)
      case "price-desc": return [...list].sort((a, b) => b.price - a.price)
      case "rating": return [...list].sort((a, b) => b.rating - a.rating)
      case "discount": return [...list].sort((a, b) => b.discount - a.discount)
      default: return list
    }
  }, [query, submitted, activeCategory, sortBy, maxPrice])

  return (
    <div className="max-w-5xl">
      {/* Search hero */}
      <div className="mb-6 rounded-2xl p-6 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #fce4f3 0%, #fdf2f6 60%, #f3e8ff 100%)" }}>
        <div className="relative z-10">
          <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: "#e91e8c" }}>
            ShopHub Store
          </p>
          <h1 className="text-2xl font-black text-gray-800 mb-4">
            What are you looking for?
          </h1>

          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={e => { setQuery(e.target.value); if (!e.target.value.trim()) setSubmitted(false) }}
                placeholder="Search products, brands, categories…"
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-white border border-pink-100 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-pink-300 transition-colors"
                style={{ boxShadow: "0 2px 12px rgba(233,30,140,0.08)" }}
              />
              {query && (
                <button type="button" onClick={handleClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors">
                  <X size={15} />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="px-5 py-3 rounded-xl text-sm font-black text-white transition-opacity hover:opacity-90"
              style={{ background: "#e91e8c" }}
            >
              Search
            </button>
          </form>

          {/* Quick chips */}
          <div className="flex flex-wrap gap-2 mt-3">
            {["iPhone", "Headphones", "Shoes", "Air Fryer", "Laptop"].map(s => (
              <button
                key={s}
                onClick={() => { setQuery(s); setSubmitted(true) }}
                className="text-xs font-semibold px-3 py-1 rounded-full bg-white border border-pink-100 text-gray-500 hover:border-pink-300 hover:text-pink-600 transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results section — only shown after search or always showing all */}
      <div>
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="text-xs font-bold px-3 py-1.5 rounded-full border transition-all duration-150"
                style={{
                  background: activeCategory === cat ? "#e91e8c" : "white",
                  color: activeCategory === cat ? "white" : "#6b7280",
                  borderColor: activeCategory === cat ? "#e91e8c" : "#f3e4ed",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(f => !f)}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border transition-all"
              style={{
                background: showFilters ? "rgba(233,30,140,0.09)" : "white",
                color: showFilters ? "#e91e8c" : "#6b7280",
                borderColor: showFilters ? "#e91e8c" : "#f3e4ed",
              }}
            >
              <SlidersHorizontal size={12} />
              Filters
            </button>

            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="appearance-none text-xs font-bold pl-3 pr-7 py-1.5 rounded-full border border-pink-100 bg-white text-gray-600 outline-none cursor-pointer"
              >
                <option value="relevance">Relevance</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="rating">Top Rated</option>
                <option value="discount">Best Discount</option>
              </select>
              <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Expanded filter panel */}
        {showFilters && (
          <div className="bg-white rounded-2xl p-4 mb-4 flex flex-wrap gap-6"
            style={{ boxShadow: "0 4px 16px rgba(233,30,140,0.07)" }}>
            <div className="flex-1 min-w-48">
              <label className="text-xs font-black text-gray-500 uppercase tracking-wider block mb-2">
                Max Price: ₹{maxPrice.toLocaleString("en-IN")}
              </label>
              <input
                type="range"
                min={1000}
                max={150000}
                step={1000}
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full accent-pink-500"
              />
              <div className="flex justify-between text-xs text-gray-300 mt-1">
                <span>₹1K</span><span>₹1.5L</span>
              </div>
            </div>
          </div>
        )}

        {/* Result count */}
        <div className="flex items-center gap-2 mb-4">
          <p className="text-sm text-gray-500">
            {submitted && query.trim() ? (
              <>Showing <span className="font-black text-gray-800">{filtered.length}</span> results for <span className="font-black" style={{ color: "#e91e8c" }}>"{query}"</span></>
            ) : (
              <><span className="font-black text-gray-800">{filtered.length}</span> products available</>
            )}
          </p>
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{ background: "rgba(233,30,140,0.09)" }}>
              <Package size={28} style={{ color: "#e91e8c" }} />
            </div>
            <p className="text-base font-black text-gray-700 mb-1">No products found</p>
            <p className="text-sm text-gray-400 mb-4">Try a different search term or category.</p>
            <button onClick={handleClear}
              className="text-sm font-bold px-4 py-2 rounded-xl text-white"
              style={{ background: "#e91e8c" }}>
              Clear search
            </button>
          </div>
        )}

        {/* Product grid */}
        {filtered.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onWishlist={toggleWishlist}
                wishlisted={wishlistedIds.has(product.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Dashboard Shell ──────────────────────────────────────────────────────────

export default function ProductListing() {
  const [activeTab, setActiveTab] = useState<Tab>("shop")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [wishlistItems, setWishlistItems] = useState(wishlistData)
  const unread = notifications.filter(n => !n.read).length

  const navItems: { key: Tab; label: string; icon: React.ReactNode }[] = [
    {
      key: "shop", label: "Shop",
      icon: <Zap size={18} />,
    },
    {
      key: "profile", label: "My Profile",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    },
    {
      key: "orders", label: "My Orders",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
    },
    {
      key: "wishlist", label: "Wishlist",
      icon: <Heart size={18} />,
    },
    {
      key: "notifications", label: "Notifications",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#fdf2f6" }}>

      {/* Top bar */}
      <header
        className="bg-white border-b border-pink-100 px-5 py-3 flex items-center justify-between sticky top-0 z-20"
        style={{ boxShadow: "0 2px 12px rgba(233,30,140,0.07)" }}
      >
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-1.5 rounded-lg hover:bg-pink-50 transition-colors"
            onClick={() => setSidebarOpen(o => !o)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e91e8c" strokeWidth="2.5" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md flex items-center justify-center text-white font-black text-sm"
              style={{ background: "#e91e8c" }}>S</div>
            <span className="font-extrabold text-base tracking-tight" style={{ color: "#e91e8c" }}>ShopHub</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black"
              style={{ background: "linear-gradient(135deg, #e91e8c, #c2185b)" }}
            >{user.avatar}</div>
            {unread > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-yellow-400 text-xs font-black text-gray-800 flex items-center justify-center"
                style={{ fontSize: 9 }}
              >{unread}</span>
            )}
          </div>
          <span className="hidden sm:block text-sm font-semibold text-gray-700">{user.name.split(" ")[0]}</span>
        </div>
      </header>

      <div className="flex flex-1 relative">

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/30 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed md:static top-0 left-0 h-full md:h-auto z-30 md:z-auto w-60 bg-white border-r border-pink-100 flex flex-col transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
          style={{ boxShadow: "2px 0 16px rgba(233,30,140,0.06)", minHeight: "100%" }}
        >
          {/* Avatar block */}
          <div className="p-5 border-b border-pink-50">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-white font-black text-base shrink-0"
                style={{ background: "linear-gradient(135deg, #e91e8c, #c2185b)" }}
              >{user.avatar}</div>
              <div className="min-w-0">
                <p className="text-sm font-black text-gray-800 truncate">{user.name}</p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-1 p-3 flex-1">
            {navItems.map(item => (
              <button
                key={item.key}
                onClick={() => { setActiveTab(item.key); setSidebarOpen(false) }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 text-left"
                style={{
                  background: activeTab === item.key ? "rgba(233,30,140,0.09)" : "transparent",
                  color: activeTab === item.key ? "#e91e8c" : "#6b7280",
                }}
              >
                <span style={{ color: activeTab === item.key ? "#e91e8c" : "#9ca3af" }}>{item.icon}</span>
                {item.label}
                {item.key === "notifications" && unread > 0 && (
                  <span
                    className="ml-auto w-5 h-5 rounded-full text-white text-xs font-black flex items-center justify-center"
                    style={{ background: "#e91e8c", fontSize: 10 }}
                  >{unread}</span>
                )}
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-3 border-t border-pink-50">
            <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-50 hover:text-red-500 transition-all duration-150 w-full">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-5 md:p-7 overflow-auto">

          {/* Shop */}
          {activeTab === "shop" && <ShopTab />}

          {/* Profile */}
          {activeTab === "profile" && (
            <div className="max-w-xl">
              <h1 className="text-xl font-black text-gray-800 mb-5">My Profile</h1>
              <div className="bg-white rounded-2xl p-6 mb-4" style={{ boxShadow: "0 4px 20px rgba(233,30,140,0.08)" }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-xl"
                    style={{ background: "linear-gradient(135deg, #e91e8c, #c2185b)" }}>{user.avatar}</div>
                  <div>
                    <p className="text-lg font-black text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-400">Member since {user.joined}</p>
                    <span className="inline-block mt-1 text-xs font-bold px-2.5 py-0.5 rounded-full"
                      style={{ background: "rgba(233,30,140,0.09)", color: "#e91e8c" }}>ShopHub Plus</span>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  {[
                    { label: "Full Name", value: user.name },
                    { label: "Email Address", value: user.email },
                    { label: "Phone Number", value: user.phone },
                  ].map(f => (
                    <div key={f.label} className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">{f.label}</label>
                      <div className="px-3 py-2.5 rounded-lg border border-gray-100 text-sm text-gray-700 bg-gray-50">{f.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Total Orders", value: orders.length },
                  { label: "Wishlist Items", value: wishlistItems.length },
                  { label: "Unread Alerts", value: unread },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-xl p-4 text-center" style={{ boxShadow: "0 4px 16px rgba(233,30,140,0.07)" }}>
                    <p className="text-2xl font-black" style={{ color: "#e91e8c" }}>{s.value}</p>
                    <p className="text-xs text-gray-400 mt-0.5 leading-tight">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Orders */}
          {activeTab === "orders" && (
            <div className="max-w-2xl">
              <h1 className="text-xl font-black text-gray-800 mb-5">My Orders</h1>
              <div className="flex flex-col gap-3">
                {orders.map(order => (
                  <div key={order.id} className="bg-white rounded-2xl p-4 flex items-center gap-4"
                    style={{ boxShadow: "0 4px 16px rgba(233,30,140,0.07)" }}>
                    <img src={order.img} alt={order.item} className="w-16 h-16 rounded-xl object-cover bg-pink-50 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-800 truncate">{order.item}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{order.id} · {order.date}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <p className="text-sm font-black text-gray-800">{order.price}</p>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                        style={{ background: statusColor[order.status].bg, color: statusColor[order.status].text }}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Wishlist */}
          {activeTab === "wishlist" && (
            <div className="max-w-2xl">
              <h1 className="text-xl font-black text-gray-800 mb-5">
                Wishlist <span className="text-base font-semibold text-gray-400">({wishlistItems.length})</span>
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {wishlistItems.map(item => (
                  <div key={item.id} className="bg-white rounded-2xl p-4 flex gap-4"
                    style={{ boxShadow: "0 4px 16px rgba(233,30,140,0.07)" }}>
                    <img src={item.img} alt={item.name} className="w-20 h-20 rounded-xl object-cover bg-pink-50 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-800 leading-snug mb-1">{item.name}</p>
                      <p className="text-base font-black" style={{ color: "#e91e8c" }}>{item.price}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-xs text-gray-400 line-through">{item.original}</p>
                        <span className="text-xs font-bold text-green-600">{item.discount} off</span>
                      </div>
                      <button
                        onClick={() => setWishlistItems(w => w.filter(i => i.id !== item.id))}
                        className="mt-2 text-xs font-semibold text-red-400 hover:text-red-500 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <div className="max-w-xl">
              <h1 className="text-xl font-black text-gray-800 mb-5">Notifications</h1>
              <div className="flex flex-col gap-2">
                {notifications.map(n => (
                  <div key={n.id} className="bg-white rounded-2xl px-4 py-3.5 flex items-start gap-3"
                    style={{ boxShadow: "0 4px 16px rgba(233,30,140,0.07)", borderLeft: !n.read ? "3px solid #e91e8c" : "3px solid transparent" }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: "rgba(233,30,140,0.09)", color: "#e91e8c" }}>
                      <Tag size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-bold text-gray-800">{n.title}</p>
                        {!n.read && <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "#e91e8c" }} />}
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed mt-0.5">{n.desc}</p>
                      <p className="text-xs text-gray-300 mt-1">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}
