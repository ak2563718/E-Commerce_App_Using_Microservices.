'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { searchProduct } from '@/redux/product/product.Action'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useMemo, useEffect, ReactHTMLElement } from 'react'
import SearchProductSkeleton from './SearchProductSkeleton'
import { authCheckSession } from '@/redux/auth/auth.Action'
import { getProfile } from '@/redux/user/user.Action'
import ProfileDropdown from './ProfileDropdown'
import { createCartItems, getCart } from '@/redux/cart/cart.Action'
import { toast } from 'sonner'
import { Search } from 'lucide-react'
import { getWishlist, manageWishlist } from '@/redux/product/product.Type.Action'

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
  images:any[]
  variants:any[]
}

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

function ProductCard({ product, addtocart, clickValue , wishlist, wishlisted}: { product: Product, addtocart:()=>void , clickValue:()=>void, wishlist:()=>void,wishlisted:boolean}) {
  const [imgError, setImgError] = useState(false)
  const [hovered, setHovered] = useState(false)
  

  const discoutcalculate =(val1:number, val2:number)=>{
      const percentage = ((val1-val2)/val1)*100;
      return Math.floor(percentage);
  }
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
      {/* Wishlist */}
      <button
        onClick={wishlist}
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
        onClick={clickValue}
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
          src={imgError ? 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=300&fit=crop&auto=format' : product.images?.[0]?.url}
          alt={product?.name}
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
          {product?.name}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <StarRating rating={product?.rating || 0} />
          <span style={{ fontSize: '11px', color: '#999' }}>({product?.reviewCount?.toLocaleString('en-IN')})</span>
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
            ₹{product?.variants?.[0]?.costPrice.toLocaleString('en-IN')}
          </span>
          <span style={{ fontSize: '12px', color: '#bbb', textDecoration: 'line-through' }}>
            ₹{product?.variants?.[0].price?.toLocaleString('en-IN')}
          </span>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#27ae60' }}>
            {discoutcalculate(product?.variants?.[0].price?.toLocaleString('en-IN'),product?.variants?.[0]?.costPrice.toLocaleString('en-IN'))}% off
          </span>
        </div>

        {product?.freeDelivery && (
          <span style={{ fontSize: '11px', color: '#27ae60', fontWeight: 500 }}>✓ Free Delivery</span>
        )}

        {product?.assured && (
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
            onClick={addtocart}
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
  const [ loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([])
  const params = useSearchParams()
  const [query, setquery] = useState('')
  const search = params.get("search")
  const [name, setName] = useState('')
  const dispatch = useAppDispatch();
  const { islogin } = useAppSelector((state)=>state.auth)
  const router = useRouter()
  
  useEffect(()=>{
    const getproduct = async()=>{
      const res = await dispatch(searchProduct(search)).unwrap();
      setData(res?.data)
      setLoading(false)
    }
    getproduct()
  },[search,dispatch])

  useEffect(()=>{
    const getuserinfo = async()=>{
      const logininfo = await dispatch(authCheckSession()).unwrap();
      const userinfo = await dispatch(getProfile()).unwrap()
      setName(userinfo.data?.firstName)
    }
    getuserinfo()
  },[dispatch])

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
    let result = [...data]
    if (selectedCategories.length > 0) result = result.filter(p => selectedCategories.includes(p.category))
    if (selectedBrands.length > 0) result = result.filter(p => selectedBrands.includes(p.brand))
    if (minRating !== null) result = result.filter(p => p.rating >= minRating)
    if (freeDeliveryOnly) result = result.filter(p => p.freeDelivery)
    if (assuredOnly) result = result.filter(p => p.assured)
    if (discountRange !== null) result = result.filter(p => p.discount >= discountRange)
    return result
  }, [data,selectedCategories, selectedBrands, minRating, freeDeliveryOnly, assuredOnly, discountRange])

   const ALL_CATEGORIES = [...new Set(data.map(p => p.category.name))]
   const ALL_BRANDS = [...new Set(data.map(p => p.brand.name))].sort()
   
   const [cartId, setCartId] = useState('')
   const [wishlistId, setWishlistId] = useState<any[]>([])
   useEffect(()=>{
    const getcartvalue = async()=>{
      try {
        const res = await dispatch(getCart()).unwrap()
        setCartId(res.data?.id)
      } catch (error) {
        console.log(error)
      }
    }
    getcartvalue()
   },[dispatch])

   const handleQuerySearch =(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
      router.push(`/search?search=${query.trim()}`)
   }
   const handleClick=(product:any)=>{
    const route = `product/${product.slug}/${product.id}`;
    router.push(route)
   }
   
   const handleAddtoCart = async(productId:string, variantId:string)=>{
    if(!islogin){
      router.push('/auth/login')
    }
    const data ={
        cartId,
        productId,
        variantId,
        quantity:1,
    }
    try {
      const res = await dispatch(createCartItems(data)).unwrap();
      toast.success(res.message)
    } catch (error:any) {
      toast.error(error.message)
    }
   }

   useEffect(()=>{
    const wishlistitems = async()=>{
      try {
        const res = await dispatch(getWishlist()).unwrap();
        setWishlistId(
          res.data.map((item:any)=>item.productId)
        )
      } catch (error) {
        console.log(error)
      }
    }
    wishlistitems()
   },[])
   const handlewishlist = async(product:any)=>{
        const res = await dispatch(manageWishlist(product.id)).unwrap();
        if(res.message === "Added"){
          setWishlistId((prev)=>[...prev,res.data.productId])
        }
        else{
        setWishlistId((prev)=>prev.filter((id)=>id!==product.id))
        }
   }

  if(loading){
    return <SearchProductSkeleton/>
  }

  return (
    <div  style={{ minHeight: '100vh', background: '#fdf0f8', fontFamily: 'Inter, sans-serif' }}>
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
            className="font-extrabold text-xl tracking-tight hidden sm:block"
            style={{ color: '#f5f5f5' }}
          >
            ShopHub
          </span>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.18)",
              borderRadius: "8px",
              padding: "6px 12px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flex: "0 0 420px",
              border: "1px solid rgba(255,255,255,0.3)",
              height: "40px",
              boxSizing: "border-box",
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              stroke="#fff"
              strokeWidth="2.2"
              fill="none"
              strokeLinecap="round"
              style={{
                flexShrink: 0,
              }}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>

            <span
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.7)",
                flex: 1,
                minWidth: 0,
              }}
            >
              <form
                onSubmit={handleQuerySearch}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  gap: "6px",
                  margin: 0,
                }}
              >
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setquery(e.target.value)}
                  placeholder="Search product..."
                  style={{
                    flex: 1,
                    minWidth: 0,
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: "#fff",
                    fontSize: "13px",
                    padding: "4px 0",
                  }}
                />

                <button
                  type='submit'
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "transparent",
                    border: "none",
                    color: "#fff",
                    padding: "4px",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </span>
          </div>

         <div className="flex items-center gap-3 shrink-0">
          {!islogin ?
          (
            <button
            onClick={()=>router.replace('/auth/login')}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all duration-150 active:scale-95 hover:bg-pink-50 hover:text-pink-500 transition-all duration-150"
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 5px 16px rgba(233,30,140,0.45)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 3px 10px rgba(233,30,140,0.30)' }}
          >
            Login
          </button>
          )
          :
          (
            <ProfileDropdown name={name}  />
          )}

          <button
          onClick={()=>router.push('/cart')}
            className="relative w-11 h-11 flex items-center justify-center rounded-xl text-gray-400 hover:bg-pink-50 hover:text-pink-500 transition-all duration-150"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </button>

          <button
              className="relative w-11 h-11 flex items-center justify-center rounded-xl text-gray-400 hover:bg-pink-50 hover:text-pink-500 transition-all duration-150"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.78-8.84a5.5 5.5 0 0 0 .06-7.78z" />
              </svg>
            </button>

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
                <ProductCard wishlisted={wishlistId.includes(product.id)} wishlist={()=>handlewishlist(product)} clickValue={()=>handleClick(product)} key={product.id} product={product} addtocart={()=>handleAddtoCart(product.id,product.variants?.[0]?.id)} />
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
