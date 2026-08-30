'use client'
import { createCart, createCartItems, getCart } from '@/redux/cart/cart.Action'
import { useAppDispatch } from '@/redux/hooks'
import { getProductbyId } from '@/redux/product/product.Action'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import ProductPageSkeleton from './ProductOverviewSkeleton'
import { getWishlist, manageWishlist } from '@/redux/product/product.Type.Action'

const PINK = '#e91e8c'
const PINK_DARK = '#c2185b'
const PINK_LIGHT = '#fce4f3'
const PINK_MID = '#f48ccc'

function fmt(n: number) {
  return '₹' + n.toLocaleString('en-IN')
}

const PRODUCT = {
  id: 1,
  name: 'Apple iPhone 15 Pro Max',
  brand: 'Apple',
  category: 'Smartphones',
  slug: 'apple-iphone-15-pro-max',
  rating: 4.6,
  reviewCount: 34210,
  price: 159900,
  originalPrice: 189900,
  discount: 15,
  assured: true,
  freeDelivery: true,
  deliveryDate: 'Sat, 16 Aug',
  returnDays: 7,
  warranty: '1 Year Apple Warranty',
  inStock: true,
  highlights: [
    '6.7-inch Super Retina XDR display with ProMotion (120Hz)',
    'A17 Pro chip with 6-core GPU',
    '48MP Main | 12MP Ultra Wide | 12MP Telephoto camera system',
    'Up to 29 hours video playback',
    'Titanium design — lighter and stronger',
    'Action Button for custom shortcuts',
    'USB-C with USB 3 speeds',
  ],
  colors: [
    { name: 'Natural Titanium', hex: '#b5a99a' },
    { name: 'Blue Titanium', hex: '#4a6670' },
    { name: 'White Titanium', hex: '#e8e6e1' },
    { name: 'Black Titanium', hex: '#2d2d2d' },
  ],
  storage: ['256GB', '512GB', '1TB'],
  images: [
    'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&h=600&fit=crop&auto=format',
  ],
  specs: {
    General: [
      ['Brand', 'Apple'],
      ['Model', 'iPhone 15 Pro Max'],
      ['Color', 'Natural Titanium'],
      ['Browse Type', 'Smartphones'],
      ['SIM Type', 'Nano SIM + eSIM'],
      ['Hybrid SIM Slot', 'No'],
      ['Touchscreen', 'Yes'],
      ['OTG Compatible', 'Yes'],
    ],
    Display: [
      ['Display Size', '6.7 inch'],
      ['Resolution', '2796 x 1290 pixels'],
      ['Resolution Type', 'Super Retina XDR'],
      ['GPU', 'Apple GPU (6-core)'],
      ['Display Type', 'LTPO OLED'],
      ['Refresh Rate', '120 Hz'],
      ['Brightness', '2000 nits'],
    ],
    Camera: [
      ['Primary Camera', '48 MP'],
      ['Primary Camera Features', 'f/1.78 aperture, OIS, 4K ProRes video'],
      ['Secondary Camera', '12 MP Ultra Wide + 12 MP Telephoto'],
      ['Flash', 'Photonic Engine Flash'],
      ['HD Recording', '4K at 60fps, 120fps ProRes'],
      ['Front Camera', '12 MP TrueDepth'],
    ],
    Battery: [
      ['Capacity', '4422 mAh'],
      ['Type', 'Li-Ion'],
      ['Wireless Charging', 'Yes — MagSafe 15W, Qi 7.5W'],
      ['USB Type', 'USB-C (USB 3)'],
    ],
  },
  offers: [
    { icon: '💳', title: 'Bank Offer', desc: '10% off on HDFC Bank Credit Cards, up to ₹1,500' },
    { icon: '🔄', title: 'Exchange Offer', desc: 'Get up to ₹35,000 off on exchange of old iPhone' },
    { icon: '🎁', title: 'Special Price', desc: 'Get extra 5% off (price inclusive of cashback/coupon)' },
    { icon: '🛡️', title: 'ShopHub Care+', desc: '1-year extended warranty plan available at ₹1,499' },
  ],
}

const REVIEWS = [
  {
    id: 1,
    user: 'Priya Sharma',
    avatar: 'PS',
    rating: 5,
    title: 'Best iPhone ever made',
    body: 'The titanium build feels premium and the camera system is absolutely stunning. ProRes video on a phone is a game changer for content creators.',
    date: '3 Aug 2026',
    helpful: 142,
    verified: true,
  },
  {
    id: 2,
    user: 'Rohan Mehta',
    avatar: 'RM',
    rating: 4,
    title: 'Great phone, slightly overpriced',
    body: 'Performance is top notch and the display is gorgeous. Battery life improved a lot over 14 Pro Max. Docking one star for the price tag.',
    date: '28 Jul 2026',
    helpful: 87,
    verified: true,
  },
  {
    id: 3,
    user: 'Ananya Iyer',
    avatar: 'AI',
    rating: 5,
    title: 'Switched from Android — no regrets',
    body: 'Action Button is so handy. The ecosystem lock-in is real but honestly everything just works. ShopHub delivery was also super fast!',
    date: '21 Jul 2026',
    helpful: 63,
    verified: false,
  },
]

const RELATED = [
  {
    id: 2,
    name: 'iPhone 15 Pro (256GB)',
    price: 134900,
    originalPrice: 149900,
    discount: 10,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=200&h=200&fit=crop&auto=format',
  },
  {
    id: 3,
    name: 'Samsung Galaxy S24 Ultra',
    price: 109999,
    originalPrice: 134999,
    discount: 18,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=200&h=200&fit=crop&auto=format',
  },
  {
    id: 4,
    name: 'Google Pixel 8 Pro',
    price: 79999,
    originalPrice: 99999,
    discount: 20,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=200&h=200&fit=crop&auto=format',
  },
  {
    id: 5,
    name: 'OnePlus 12 5G (256GB)',
    price: 64999,
    originalPrice: 69999,
    discount: 7,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=200&h=200&fit=crop&auto=format',
  },
]

function StarRating({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '2px',
        background: rating >= 4 ? '#27ae60' : rating >= 3 ? '#f39c12' : '#e74c3c',
        color: '#fff',
        fontSize: `${size - 2}px`,
        fontWeight: 700,
        padding: '2px 7px',
        borderRadius: '4px',
      }}
    >
      {rating.toFixed(1)} ★
    </span>
  )
}

function AssuredBadge() {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '11px', fontWeight: 700, color: PINK }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill={PINK}>
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
        <path d="M10 17l-4-4 1.4-1.4 2.6 2.6 6.6-6.6L18 9l-8 8z" fill="#fff" />
      </svg>
      ShopHub Assured
    </span>
  )
}

function RatingBar({ label, pct, count }: { label: string; pct: number; count: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
      <span style={{ minWidth: '18px', color: '#555', textAlign: 'right' }}>{label}★</span>
      <div style={{ flex: 1, height: '6px', background: '#f0e0eb', borderRadius: '4px', overflow: 'hidden' }}>
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: label >= '4' ? '#27ae60' : label === '3' ? '#f39c12' : PINK,
            borderRadius: '4px',
            transition: 'width 0.4s ease',
          }}
        />
      </div>
      <span style={{ minWidth: '32px', color: '#888' }}>{count.toLocaleString()}</span>
    </div>
  )
}

export default function ProductOverview() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedStorage, setSelectedStorage] = useState(1)
  const [activeTab, setActiveTab] = useState<'highlights' | 'specs' | 'reviews'>('highlights')
  const [activeSpecGroup, setActiveSpecGroup] = useState('General')
  const [wishlisted, setWishlisted] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const [pincode, setPincode] = useState('')
  const [deliveryChecked, setDeliveryChecked] = useState(false)
  const [expandedOffer, setExpandedOffer] = useState<number | null>(null)
  const [helpfulClicked, setHelpfulClicked] = useState<number[]>([])
  const [product, setProduct] = useState<any>(null)
  const [imagedata, setImageData] = useState<any[]>([])
  const [cartId, setCartId] = useState('')
  const [loading, setLoading] = useState(true)
  const [WishlistId, setWishlistId] = useState<any[]>([])
  const dispatch = useAppDispatch();
  const router = useRouter();

  const params = useParams<{slug:string,id:string}>()

  useEffect(()=>{
  const getproduct =async()=>{
    const res = await dispatch(getProductbyId(params.id)).unwrap();
    const cart = await dispatch(getCart()).unwrap();
    const wishlist = await dispatch(getWishlist()).unwrap();
    setProduct(res.data)
    setImageData(res.data.images.map((img:any)=>img.url))
    setCartId(cart.data.id)
    setLoading(false)
    setWishlistId(wishlist.data.map((item:any)=>item.productId))
    setWishlisted(wishlist.data.some((item:any) => item.productId === res.data?.id))
  }
  getproduct()
  },[params])
  

  const data ={
    cartId,
    productId:product?.id,
    variantId:product?.variants?.[0]?.id,
    quantity:1,
  }
 
 const date = new Date();
const deliveryDate = new Date(date);
deliveryDate.setDate(date.getDate() + 7);
const formattedDate = deliveryDate.toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'short',
});
const discount = product ? Math.round(((product.variants?.[0]?.price - product.variants?.[0]?.costPrice)/product.variants?.[0]?.price)*100):0;

const handleAddToCart = async() => {
    setAddedToCart(true)
    const res = await dispatch(createCartItems(data)).unwrap();
    console.log(res.data)
    if(res.data.success){
      setTimeout(() => setAddedToCart(false), 2200)
    }
  }

const handleWishlist = async()=>{
  const res = await dispatch(manageWishlist(params.id)).unwrap();
  if(res.message === "Added"){
    setWishlistId((prev)=>[...prev,res.data.productId])
    setWishlisted(true)
  }
  else{
    setWishlistId((prev)=>prev.filter((id)=>id!==product.id))
    setWishlisted(false)
  }
}

if(loading){
  return <ProductPageSkeleton/>
}
  return (
    <div style={{ minHeight: '100vh', background: '#fdf0f8', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${PINK} 0%, ${PINK_DARK} 100%)`,
          padding: '14px 0',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: '0 3px 16px rgba(233,30,140,0.25)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div onClick={()=>router.replace('/')} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#fff', borderRadius: '10px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke={PINK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 6h18M16 10a4 4 0 01-8 0" stroke={PINK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '22px', fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>ShopHub</span>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '12px 28px', display: 'flex', gap: '6px', alignItems: 'center', fontSize: '12px', color: '#aaa' }}>
        {['Home', `${product?.category.name}`, `${product?.brand.name}`, `${product?.name}`].map((crumb, i, arr) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ cursor: i < arr.length - 1 ? 'pointer' : 'default', color: i === arr.length - 1 ? '#555' : PINK, fontWeight: i === arr.length - 1 ? 500 : 400 }}>
              {crumb}
            </span>
            {i < arr.length - 1 && <span style={{ color: '#ddd' }}>›</span>}
          </span>
        ))}
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 28px 40px' }}>
        {/* Top section: images + purchase panel */}
        <div style={{ display: 'grid', gridTemplateColumns: '420px 1fr 320px', gap: '24px', alignItems: 'start' }}>

          {/* Image gallery */}
          <div style={{ position: 'sticky', top: '76px' }}>
            <div
              style={{
                background: '#fff',
                borderRadius: '16px',
                border: '1.5px solid #f3e0ed',
                overflow: 'hidden',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '380px',
                position: 'relative',
              }}
            >
              <img
                src={imagedata[selectedImage]}
                alt={product?.name}
                style={{ width: '300px', height: '300px', objectFit: 'contain', transition: 'opacity 0.2s' }}
              />
              {/* Wishlist */}
              <button
                onClick={handleWishlist}
                style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  background: '#fff',
                  border: `1.5px solid ${wishlisted ? PINK : '#e0d0da'}`,
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
                  transition: 'all 0.15s',
                }}
              >
                <svg width="16" height="15" viewBox="0 0 24 22" fill={wishlisted ? PINK : 'none'} stroke={wishlisted ? PINK : '#999'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
              {/* Discount tag */}
              <div
                style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  background: `linear-gradient(135deg, ${PINK}, ${PINK_DARK})`,
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '20px',
                }}
              >
                {discount}% OFF
              </div>
            </div>

            {/* Thumbnails */}
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              {imagedata.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  style={{
                    width: '56px',
                    height: '56px',
                    border: `2px solid ${selectedImage === i ? PINK : '#f0e0eb'}`,
                    borderRadius: '10px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    background: '#fff',
                    padding: 0,
                    transition: 'border-color 0.15s',
                    flexShrink: 0,
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div>
            <div style={{ background: '#fff', borderRadius: '16px', border: '1.5px solid #f3e0ed', padding: '24px', marginBottom: '16px' }}>
              <p style={{ margin: '0 0 4px', fontSize: '12px', color: PINK, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {product?.brand?.name}
              </p>
              <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '22px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 10px', lineHeight: 1.3 }}>
                {product?.name}
              </h1>

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <StarRating rating={PRODUCT.rating} size={14} />
                <span style={{ fontSize: '13px', color: '#888' }}>
                  {PRODUCT?.reviewCount?.toLocaleString('en-IN')} ratings & reviews
                </span>
                <span style={{ color: '#ddd' }}>|</span>
                <AssuredBadge />
              </div>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '28px', fontWeight: 800, color: '#1a1a2e' }}>
                  {fmt(Number(product?.variants?.[0].costPrice))}
                </span>
                <span style={{ fontSize: '15px', color: '#bbb', textDecoration: 'line-through' }}>
                  {fmt(Number(product?.variants?.[0].price))}
                </span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#27ae60' }}>
                  {discount}% off
                </span>
              </div>
              <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#27ae60', fontWeight: 600 }}>
                You save {fmt(Number(product?.variants?.[0].price-product?.variants?.[0].costPrice))}
              </p>

              {/* Color picker */}
              <div style={{ marginBottom: '18px' }}>
                <p style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: 600, color: '#555' }}>
                  Color: <span style={{ color: '#1a1a2e' }}>{PRODUCT.colors[selectedColor].name}</span>
                </p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {PRODUCT.colors.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(i)}
                      title={color.name}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: color.hex,
                        border: `3px solid ${selectedColor === i ? PINK : '#e0e0e0'}`,
                        cursor: 'pointer',
                        outline: selectedColor === i ? `2px solid ${PINK_MID}` : 'none',
                        outlineOffset: '2px',
                        transition: 'all 0.15s',
                        padding: 0,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Storage picker */}
              <div style={{ marginBottom: '20px' }}>
                <p style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: 600, color: '#555' }}>
                  Storage: <span style={{ color: '#1a1a2e' }}>{PRODUCT.storage[selectedStorage]}</span>
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {PRODUCT.storage.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedStorage(i)}
                      style={{
                        padding: '7px 18px',
                        border: `1.5px solid ${selectedStorage === i ? PINK : '#e0d0da'}`,
                        borderRadius: '8px',
                        background: selectedStorage === i ? PINK_LIGHT : '#fff',
                        color: selectedStorage === i ? PINK_DARK : '#555',
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div>
                <p style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Highlights
                </p>
                <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {PRODUCT.highlights.slice(0, 5).map((h, i) => (
                    <li key={i} style={{ fontSize: '13px', color: '#444', lineHeight: 1.5 }}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ background: '#fff', borderRadius: '16px', border: '1.5px solid #f3e0ed', overflow: 'hidden' }}>
              <div style={{ display: 'flex', borderBottom: '1.5px solid #f3e0ed' }}>
                {(['highlights', 'specs', 'reviews'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      flex: 1,
                      padding: '14px 0',
                      border: 'none',
                      background: 'none',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: activeTab === tab ? PINK : '#aaa',
                      borderBottom: `2.5px solid ${activeTab === tab ? PINK : 'transparent'}`,
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                      letterSpacing: '0.02em',
                      transition: 'all 0.15s',
                    }}
                  >
                    {tab === 'reviews' ? `Reviews (${REVIEWS.length})` : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div style={{ padding: '22px' }}>
                {/* Highlights tab */}
                {activeTab === 'highlights' && (
                  <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {PRODUCT.highlights.map((h, i) => (
                      <li key={i} style={{ fontSize: '14px', color: '#333', lineHeight: 1.6 }}>{h}</li>
                    ))}
                  </ul>
                )}

                {/* Specs tab */}
                {activeTab === 'specs' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {Object.keys(PRODUCT.specs).map(group => (
                        <button
                          key={group}
                          onClick={() => setActiveSpecGroup(group)}
                          style={{
                            padding: '9px 14px',
                            border: 'none',
                            borderRadius: '8px',
                            background: activeSpecGroup === group ? PINK_LIGHT : 'transparent',
                            color: activeSpecGroup === group ? PINK_DARK : '#666',
                            fontWeight: activeSpecGroup === group ? 700 : 400,
                            fontSize: '13px',
                            textAlign: 'left',
                            cursor: 'pointer',
                            transition: 'all 0.15s',
                            borderLeft: `3px solid ${activeSpecGroup === group ? PINK : 'transparent'}`,
                          }}
                        >
                          {group}
                        </button>
                      ))}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                      {PRODUCT.specs[activeSpecGroup as keyof typeof PRODUCT.specs].map(([key, val], i, arr) => (
                        <div
                          key={i}
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '150px 1fr',
                            gap: '12px',
                            padding: '10px 0',
                            borderBottom: i < arr.length - 1 ? '1px solid #f9f0f6' : 'none',
                          }}
                        >
                          <span style={{ fontSize: '13px', color: '#999', fontWeight: 500 }}>{key}</span>
                          <span style={{ fontSize: '13px', color: '#333', fontWeight: 500 }}>{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reviews tab */}
                {activeTab === 'reviews' && (
                  <div>
                    {/* Rating summary */}
                    <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '24px', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #f3e0ed' }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '52px', fontWeight: 800, color: '#1a1a2e', lineHeight: 1 }}>
                          {PRODUCT.rating}
                        </div>
                        <div style={{ fontSize: '22px', color: '#ffc107', margin: '4px 0' }}>★★★★½</div>
                        <div style={{ fontSize: '12px', color: '#aaa' }}>{PRODUCT.reviewCount.toLocaleString('en-IN')} ratings</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', justifyContent: 'center' }}>
                        <RatingBar label="5" pct={62} count={21210} />
                        <RatingBar label="4" pct={20} count={6842} />
                        <RatingBar label="3" pct={10} count={3421} />
                        <RatingBar label="2" pct={5} count={1710} />
                        <RatingBar label="1" pct={3} count={1027} />
                      </div>
                    </div>

                    {/* Review cards */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {REVIEWS.map(review => (
                        <div
                          key={review.id}
                          style={{
                            padding: '16px',
                            borderRadius: '12px',
                            border: '1.5px solid #f3e0ed',
                            background: '#fdfafa',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                            <div
                              style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                background: `linear-gradient(135deg, ${PINK}, ${PINK_DARK})`,
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '12px',
                                fontWeight: 700,
                                flexShrink: 0,
                              }}
                            >
                              {review.avatar}
                            </div>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a2e' }}>{review.user}</span>
                                {review.verified && (
                                  <span style={{ fontSize: '10px', color: '#27ae60', fontWeight: 600, background: '#e8f5e9', padding: '1px 7px', borderRadius: '10px' }}>
                                    ✓ Verified Purchase
                                  </span>
                                )}
                              </div>
                              <span style={{ fontSize: '11px', color: '#bbb' }}>{review.date}</span>
                            </div>
                            <div style={{ marginLeft: 'auto' }}>
                              <StarRating rating={review.rating} />
                            </div>
                          </div>
                          <p style={{ margin: '0 0 4px', fontSize: '13px', fontWeight: 700, color: '#1a1a2e' }}>{review.title}</p>
                          <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#555', lineHeight: 1.6 }}>{review.body}</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '12px', color: '#aaa' }}>Helpful?</span>
                            <button
                              onClick={() =>
                                setHelpfulClicked(prev =>
                                  prev.includes(review.id) ? prev.filter(id => id !== review.id) : [...prev, review.id]
                                )
                              }
                              style={{
                                border: `1px solid ${helpfulClicked.includes(review.id) ? PINK : '#e0d0da'}`,
                                borderRadius: '6px',
                                background: helpfulClicked.includes(review.id) ? PINK_LIGHT : '#fff',
                                color: helpfulClicked.includes(review.id) ? PINK : '#888',
                                fontSize: '11px',
                                fontWeight: 600,
                                padding: '3px 10px',
                                cursor: 'pointer',
                              }}
                            >
                              👍 Yes ({review.helpful + (helpfulClicked.includes(review.id) ? 1 : 0)})
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Purchase panel */}
          <div style={{ position: 'sticky', top: '76px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Buy box */}
            <div style={{ background: '#fff', borderRadius: '16px', border: '1.5px solid #f3e0ed', padding: '20px', boxShadow: '0 2px 12px rgba(233,30,140,0.06)' }}>
              <div style={{ marginBottom: '16px' }}>
                <p style={{ margin: '0 0 2px', fontSize: '12px', color: '#aaa', fontWeight: 500 }}>Price</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '24px', fontWeight: 800, color: '#1a1a2e' }}>{fmt(Number(product?.variants?.[0].costPrice))}</span>
                  <span style={{ fontSize: '13px', color: '#bbb', textDecoration: 'line-through' }}>{fmt(Number(product?.variants?.[0].price))}</span>
                </div>
              </div>

              {/* Delivery info */}
              <div style={{ background: '#fdf4fa', borderRadius: '10px', padding: '12px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={PINK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#1a1a2e' }}>
                    {product?.freeDelivery ? 'Free Delivery' : 'Standard Delivery ₹49'}
                  </span>
                </div>
                <p style={{ margin: '0 0 10px', fontSize: '12px', color: '#555' }}>
                  Delivery by <strong>{formattedDate}</strong> if ordered now
                </p>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <input
                    value={pincode}
                    onChange={e => { setPincode(e.target.value.replace(/\D/g, '').slice(0, 6)); setDeliveryChecked(false) }}
                    placeholder="Enter pincode"
                    style={{
                      flex: 1,
                      border: '1.5px solid #f0e0eb',
                      borderRadius: '8px',
                      padding: '7px 10px',
                      fontSize: '13px',
                      outline: 'none',
                      color: '#1a1a2e',
                      background: '#fff',
                    }}
                  />
                  <button
                    onClick={async() => {
                     try {
                        const res = await axios.get(
                          `http://localhost:6002/api/pincode/${pincode}`
                        );
                        if (res.data.success) {
                          setDeliveryChecked(true);
                        } else {
                          setDeliveryChecked(false);
                        }
                      } catch (error: any) {
                        setDeliveryChecked(false);
                        toast.error(error.response?.data.message)
                      }
                    }}
                    style={{
                      padding: '7px 12px',
                      background: pincode.length === 6 ? `linear-gradient(135deg, ${PINK}, ${PINK_DARK})` : '#f0e0eb',
                      color: pincode.length === 6 ? '#fff' : '#ccc',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: pincode.length === 6 ? 'pointer' : 'not-allowed',
                    }}
                  >
                    Check
                  </button>
                </div>
                {deliveryChecked && (
                  <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#27ae60', fontWeight: 600 }}>
                    ✓ Free delivery available for {pincode}
                  </p>
                )}
              </div>

              {/* Services */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
                {[
                  { icon: '🔄', text: `${PRODUCT.returnDays} Day Replacement` },
                  { icon: '🛡️', text: PRODUCT.warranty },
                  { icon: '✅', text: '100% Authentic Product' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14px' }}>{item.icon}</span>
                    <span style={{ fontSize: '12px', color: '#555', fontWeight: 500 }}>{item.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  onClick={handleAddToCart}
                  style={{
                    width: '100%',
                    padding: '13px 0',
                    background: addedToCart ? '#27ae60' : '#fff',
                    border: `1.5px solid ${addedToCart ? '#27ae60' : PINK}`,
                    borderRadius: '10px',
                    color: addedToCart ? '#fff' : PINK,
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    letterSpacing: '0.02em',
                  }}
                >
                  {addedToCart ? '✓ ADDED TO CART' : 'ADD TO CART'}
                </button>
                <button
                  onClick={()=>router.push(`/checkout?type=buy-now&productId=${product.id}`)}
                  style={{
                    width: '100%',
                    padding: '13px 0',
                    background: `linear-gradient(135deg, ${PINK} 0%, ${PINK_DARK} 100%)`,
                    border: 'none',
                    borderRadius: '10px',
                    color: '#fff',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(233,30,140,0.28)',
                    letterSpacing: '0.02em',
                    transition: 'opacity 0.15s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.88' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
                >
                  BUY NOW
                </button>
              </div>
            </div>

            {/* Offers */}
            <div style={{ background: '#fff', borderRadius: '16px', border: '1.5px solid #f3e0ed', padding: '18px' }}>
              <h4 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 14px' }}>
                Available Offers
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {PRODUCT.offers.map((offer, i) => (
                  <div key={i}>
                    <button
                      onClick={() => setExpandedOffer(expandedOffer === i ? null : i)}
                      style={{
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        padding: '8px 0',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        textAlign: 'left',
                      }}
                    >
                      <span style={{ fontSize: '16px', flexShrink: 0 }}>{offer.icon}</span>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#1a1a2e' }}>{offer.title}</span>
                      </div>
                      <span style={{ fontSize: '10px', color: PINK, fontWeight: 700 }}>
                        {expandedOffer === i ? '▲' : '▼'}
                      </span>
                    </button>
                    {expandedOffer === i && (
                      <p style={{ margin: '0 0 6px', fontSize: '12px', color: '#666', lineHeight: 1.5, paddingLeft: '24px' }}>
                        {offer.desc}
                      </p>
                    )}
                    {i < PRODUCT.offers.length - 1 && <div style={{ height: '1px', background: '#f9f0f6' }} />}
                  </div>
                ))}
              </div>
            </div>

            {/* Seller info */}
            <div style={{ background: '#fff', borderRadius: '16px', border: '1.5px solid #f3e0ed', padding: '16px 18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '12px', color: '#aaa', fontWeight: 500 }}>Sold by</span>
                <span style={{ fontSize: '12px', color: PINK, fontWeight: 700, cursor: 'pointer' }}>View Seller Info</span>
              </div>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#1a1a2e' }}>RetailNet India Pvt. Ltd.</p>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center', marginTop: '4px' }}>
                <span style={{ fontSize: '11px', background: '#e8f5e9', color: '#27ae60', fontWeight: 700, padding: '2px 7px', borderRadius: '4px' }}>4.8 ★</span>
                <span style={{ fontSize: '11px', color: '#aaa' }}>98% positive feedback</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        <div style={{ marginTop: '32px' }}>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 16px' }}>
            Similar Products
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
            {RELATED.map(item => (
              <div
                key={item.id}
                style={{
                  background: '#fff',
                  borderRadius: '14px',
                  border: '1.5px solid #f3e0ed',
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'center',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.boxShadow = '0 6px 24px rgba(233,30,140,0.13)'
                  el.style.borderColor = PINK_MID
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.boxShadow = 'none'
                  el.style.borderColor = '#f3e0ed'
                }}
              >
                <div style={{ height: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', background: '#fdf4fa', borderRadius: '10px' }}>
                  <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
                </div>
                <p style={{ margin: '0 0 6px', fontSize: '13px', fontWeight: 600, color: '#1a1a2e', lineHeight: 1.4 }}>{item.name}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '6px' }}>
                  <StarRating rating={item.rating} />
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '15px', fontWeight: 700, color: '#1a1a2e' }}>{fmt(item.price)}</span>
                  <span style={{ fontSize: '11px', color: '#bbb', textDecoration: 'line-through' }}>{fmt(item.originalPrice)}</span>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#27ae60' }}>{item.discount}% off</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
