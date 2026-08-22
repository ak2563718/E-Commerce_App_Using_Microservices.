'use client'
import { deleteCartItems, getCart, getCartItems } from '@/redux/cart/cart.Action'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ProfileDropdown from './ProfileDropdown'
import { getProfile } from '@/redux/user/user.Action'
import { authCheckSession } from '@/redux/auth/auth.Action'
import CartSkeleton from './CartSkeleton'
import { toast } from 'sonner'

const PINK = '#e91e8c'
const PINK_DARK = '#c2185b'
const PINK_LIGHT = '#fce4f3'
const PINK_MID = '#f48ccc'

interface CartItem {
  id: number
  name: string
  brand: string
  image: string
  price: number
  originalPrice: number
  discount: number
  quantity: number
  color: string
  size?: string
  freeDelivery: boolean
  assured: boolean
  deliveryDate: string
  inStock: boolean
}

const INITIAL_CART: CartItem[] = [
  {
    id: 1,
    name: 'Apple iPhone 15 Pro Max (Natural Titanium, 512GB)',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&h=300&fit=crop&auto=format',
    price: 159900,
    originalPrice: 189900,
    discount: 15,
    quantity: 1,
    color: 'Natural Titanium',
    freeDelivery: true,
    assured: true,
    deliveryDate: 'Sat, 16 Aug',
    inStock: true,
  },
  {
    id: 2,
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    brand: 'Sony',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop&auto=format',
    price: 26990,
    originalPrice: 34990,
    discount: 22,
    quantity: 1,
    color: 'Midnight Black',
    freeDelivery: true,
    assured: true,
    deliveryDate: 'Sun, 17 Aug',
    inStock: true,
  },
  {
    id: 3,
    name: 'Samsung Galaxy Watch 6 Classic (47mm, Graphite)',
    brand: 'Samsung',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&auto=format',
    price: 34999,
    originalPrice: 44999,
    discount: 22,
    quantity: 2,
    color: 'Graphite',
    size: '47mm',
    freeDelivery: true,
    assured: false,
    deliveryDate: 'Mon, 18 Aug',
    inStock: true,
  },
  {
    id: 4,
    name: 'Nothing Phone (2a) — Black, 256GB',
    brand: 'Nothing',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop&auto=format',
    price: 23999,
    originalPrice: 27999,
    discount: 14,
    quantity: 1,
    color: 'Black',
    freeDelivery: false,
    assured: false,
    deliveryDate: 'Tue, 19 Aug',
    inStock: false,
  },
]

function fmt(n: number) {
  return '₹' + n.toLocaleString('en-IN')
}

function AssuredBadge() {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '10px', fontWeight: 700, color: PINK }}>
      <svg width="11" height="11" viewBox="0 0 24 24" fill={PINK}>
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
        <path d="M10 17l-4-4 1.4-1.4 2.6 2.6 6.6-6.6L18 9l-8 8z" fill="#fff" />
      </svg>
      ShopHub Assured
    </span>
  )
}

function QtyBtn({ onClick, children, disabled }: { onClick: () => void; children: React.ReactNode; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '28px',
        height: '28px',
        border: `1.5px solid ${disabled ? '#eee' : PINK_MID}`,
        borderRadius: '6px',
        background: disabled ? '#fafafa' : '#fff',
        color: disabled ? '#ccc' : PINK,
        fontSize: '16px',
        fontWeight: 700,
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.15s',
        lineHeight: 1,
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        if (!disabled) (e.currentTarget as HTMLButtonElement).style.background = PINK_LIGHT
      }}
      onMouseLeave={e => {
        if (!disabled) (e.currentTarget as HTMLButtonElement).style.background = '#fff'
      }}
    >
      {children}
    </button>
  )
}

function CartItemRow({
  item,
  onQtyChange,
  onRemove,
  onSaveLater,
}: {
  item: any
  onQtyChange: (id: number, delta: number) => void
  onRemove: () => void
  onSaveLater: (id: number) => void
}) {
  const [imgError, setImgError] = useState(false)
  const discountPer =(val1:number, val2:number)=>{
    const percentage = Math.floor(((val1-val2)/val1)*100);
    return percentage;
  }
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '14px',
        padding: '20px',
        border: '1.5px solid #f3e0ed',
        display: 'flex',
        gap: '18px',
        position: 'relative',
        opacity: item.stock ? 1 : 0.72,
      }}
    >
      {/* Out of stock ribbon */}
      {!item.stock && (
        <div
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            background: '#ff5252',
            color: '#fff',
            fontSize: '10px',
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: '20px',
            letterSpacing: '0.05em',
          }}
        >
          OUT OF STOCK
        </div>
      )}

      {/* Image */}
      <div
        style={{
          width: '110px',
          minWidth: '110px',
          height: '110px',
          background: '#fdf4fa',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          border: '1px solid #f3e0ed',
        }}
      >
        <img
          src={imgError ? 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&h=200&fit=crop&auto=format' : item.image}
          alt={item.name}
          onError={() => setImgError(true)}
          style={{ width: '90px', height: '90px', objectFit: 'contain' }}
        />
      </div>

      {/* Details */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: '0 0 2px', fontSize: '11px', color: '#aaa', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {item.brand}
        </p>
        <h3
          style={{
            margin: '0 0 6px',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '14px',
            fontWeight: 600,
            color: '#1a1a2e',
            lineHeight: 1.4,
            paddingRight: item.stock ? 0 : '100px',
          }}
        >
          {item.name}
        </h3>

        {/* Variants */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', color: '#666', background: '#f9f9f9', border: '1px solid #eee', padding: '2px 10px', borderRadius: '4px' }}>
            Color: <strong>{item.color}</strong>
          </span>
          {item.size && (
            <span style={{ fontSize: '12px', color: '#666', background: '#f9f9f9', border: '1px solid #eee', padding: '2px 10px', borderRadius: '4px' }}>
              Size: <strong>{item.size}</strong>
            </span>
          )}
        </div>

        {/* Price row */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px', fontWeight: 700, color: '#1a1a2e' }}>
            {fmt(item.price)}
          </span>
          <span style={{ fontSize: '13px', color: '#bbb', textDecoration: 'line-through' }}>
            {fmt(item.originalPrice)}
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#27ae60' }}>
            {discountPer(Number(item.originalPrice),Number(item.price))}% off
          </span>
          <span style={{ fontSize: '12px', color: '#27ae60' }}>
            You save {fmt((item.originalPrice - item.price) * item.quantity)}
          </span>
        </div>

        {/* Badges */}
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap' }}>
          {item.freeDelivery ? (
            <span style={{ fontSize: '12px', color: '#27ae60', fontWeight: 500 }}>✓ Free Delivery</span>
          ) : (
            <span style={{ fontSize: '12px', color: '#aaa' }}>Delivery ₹49</span>
          )}
          {item.assured && <AssuredBadge />}
          <span style={{ fontSize: '12px', color: '#666' }}>
            Delivery by <strong style={{ color: '#1a1a2e' }}>{item.deliveryDate}</strong>
          </span>
        </div>

        {/* Qty + actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <QtyBtn onClick={() => onQtyChange(item.id, -1)} disabled={item.quantity <= 1 || !item.inStock}>
              −
            </QtyBtn>
            <span
              style={{
                minWidth: '32px',
                textAlign: 'center',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '15px',
                fontWeight: 700,
                color: '#1a1a2e',
              }}
            >
              {item.quantity}
            </span>
            <QtyBtn onClick={() => onQtyChange(item.id, 1)} disabled={item.quantity >= 5 || !item.inStock}>
              +
            </QtyBtn>
          </div>

          <div style={{ display: 'flex', gap: '0', borderLeft: '1.5px solid #f0e0eb', paddingLeft: '16px' }}>
            <button
              onClick={onRemove}
              style={{
                background: 'none',
                border: 'none',
                color: '#e53935',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '4px 10px 4px 0',
                borderRight: '1px solid #eee',
                marginRight: '10px',
              }}
            >
              REMOVE
            </button>
            <button
              onClick={() => onSaveLater(item.id)}
              style={{
                background: 'none',
                border: 'none',
                color: PINK,
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '4px 0',
              }}
            >
              SAVE FOR LATER
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SavedItem({ item, onMoveToCart }: { item: CartItem; onMoveToCart: (id: number) => void }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '14px 0',
        borderBottom: '1px solid #f3e0ed',
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          background: '#fdf4fa',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #f3e0ed',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <img src={item.image} alt={item.name} style={{ width: '44px', height: '44px', objectFit: 'contain' }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: '0 0 2px', fontSize: '12px', fontWeight: 500, color: '#1a1a2e', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
          {item.name}
        </p>
        <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: PINK }}>
          {fmt(item.price)}
          <span style={{ fontSize: '11px', color: '#27ae60', fontWeight: 600, marginLeft: '6px' }}>{item.discount}% off</span>
        </p>
      </div>
      <button
        onClick={() => onMoveToCart(item.id)}
        style={{
          background: 'none',
          border: `1.5px solid ${PINK}`,
          borderRadius: '8px',
          color: PINK,
          fontSize: '11px',
          fontWeight: 700,
          padding: '6px 12px',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        MOVE TO CART
      </button>
    </div>
  )
}

export default function CartItems() {
   const dispatch = useAppDispatch()
  const { islogin } = useAppSelector((state)=>state.auth)
  const { cartitems } = useAppSelector((state)=>state.cart);
  const [ cartId, setCartId ] = useState('')
   useEffect(()=>{
    const cartinfo = async()=>{
      try {
        const cart = await dispatch(getCart()).unwrap();
        const cartItem = await dispatch(getCartItems(cart.data.id)).unwrap();
        setCartItems(cartItem.data)
        setCartId(cart.data.id)
      } catch (error) {
        console.log(error)
      }finally{
        setLoading(false)
      }
    }
    cartinfo()
  },[dispatch])
  const [cartItems, setCartItems] = useState<any[]>([])
  const [savedItems, setSavedItems] = useState<CartItem[]>([])
  const [name , setName ] = useState('')
  const [ loading, setLoading ] = useState(true)
  const handleQtyChange = (id: number, delta: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.min(5, Math.max(1, item.quantity + delta)) } : item
      )
    )
  }

  const handleRemove = async(item:any) => {
    try {
      const res = await dispatch(deleteCartItems(item.id)).unwrap();
      setCartItems(prev => prev.filter(i=>i.id !== item.id))
      toast.success(res.message)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSaveLater = (id: number) => {
    const item = cartItems.find(i => i.id === id)
    if (item) {
      setSavedItems(prev => [...prev, item])
      setCartItems(prev => prev.filter(i => i.id !== id))
    }
  }

  const handleMoveToCart = (id: number) => {
    const item = savedItems.find(i => i.id === id)
    if (item) {
      setCartItems(prev => [...prev, { ...item, quantity: 1 }])
      setSavedItems(prev => prev.filter(i => i.id !== id))
    }
  }

  const handleClearCart =()=>{
     console.log(cartId)
  }

  const inStockItems = cartItems.filter(i => i.stock)
  const subtotal = inStockItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const originalTotal = inStockItems.reduce((sum, i) => sum + i.originalPrice * i.quantity, 0)
  const totalDiscount = originalTotal - subtotal
  const deliveryCharge = inStockItems.every(i => i.freeDelivery) ? 0 : 49
  const totalAmount = subtotal + deliveryCharge
  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0)
  const router = useRouter()

  useEffect(()=>{
    const getprofileInfo = async()=>{
      try {
        const user = await dispatch(authCheckSession()).unwrap();
        const res = await dispatch(getProfile()).unwrap();
        setName(res.data?.firstName) 
      } catch (error) {
        console.log(error)
      }
    }
    getprofileInfo()
  },[dispatch])
  
  if(!islogin){
    return router.replace('/auth/login')
  }
 
  if(loading){
    return <CartSkeleton/>
  }
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
                  <div onClick={()=>router.push('/')} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '28px 28px' }}>
        {/* Page title */}
        <div style={{ marginBottom: '20px' }}>
          <h1
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '22px',
              fontWeight: 700,
              color: '#1a1a2e',
              margin: 0,
            }}
          >
            My Cart
            {cartItems.length > 0 && (
              <span style={{ fontSize: '14px', fontWeight: 500, color: '#aaa', marginLeft: '10px' }}>
                ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
              </span>
            )}
          </h1>
        </div>

        {cartItems.length === 0 ? (
          /* Empty cart */
          <div
            style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '72px 20px',
              textAlign: 'center',
              border: '1.5px solid #f3e0ed',
            }}
          >
            <div style={{ fontSize: '72px', marginBottom: '16px', lineHeight: 1 }}>🛒</div>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 8px' }}>
              Your cart is empty
            </h2>
            <p style={{ fontSize: '14px', color: '#aaa', margin: '0 0 28px' }}>
              Looks like you haven't added anything yet.
            </p>
            <button
              style={{
                background: `linear-gradient(135deg, ${PINK} 0%, ${PINK_DARK} 100%)`,
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                padding: '13px 36px',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              CONTINUE SHOPPING
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 340px',
              gap: '20px',
              alignItems: 'start',
            }}
          >
            {/* Left — cart items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {cartItems.map(item => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onQtyChange={handleQtyChange}
                  onRemove={()=>handleRemove(item)}
                  onSaveLater={handleSaveLater}
                />
              ))}

              {/* Place order button (mobile-style bottom bar) */}
              <div
                style={{
                  background: '#fff',
                  borderRadius: '14px',
                  padding: '16px 20px',
                  border: '1.5px solid #f3e0ed',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <button
                   onClick={handleClearCart}
                  style={{
                    background: `linear-gradient(135deg, ${PINK} 0%, ${PINK_DARK} 100%)`,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '13px 40px',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '14px',
                    fontWeight: 700,
                    marginRight: '12px',
                    cursor: 'pointer',
                    letterSpacing: '0.02em',
                    boxShadow: '0 4px 16px rgba(233,30,140,0.28)',
                    transition: 'opacity 0.15s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.88' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
                >
                  Clear Cart
                </button>
                <button
                  style={{
                    background: `linear-gradient(135deg, ${PINK} 0%, ${PINK_DARK} 100%)`,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '13px 40px',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    letterSpacing: '0.02em',
                    boxShadow: '0 4px 16px rgba(233,30,140,0.28)',
                    transition: 'opacity 0.15s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.88' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
                >
                  PLACE ORDER
                </button>
              </div>

              {/* Saved for later */}
              {savedItems.length > 0 && (
                <div
                  style={{
                    background: '#fff',
                    borderRadius: '14px',
                    padding: '18px 20px',
                    border: '1.5px solid #f3e0ed',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#1a1a2e',
                      margin: '0 0 4px',
                    }}
                  >
                    Saved for Later
                    <span style={{ fontSize: '12px', fontWeight: 500, color: '#aaa', marginLeft: '8px' }}>
                      ({savedItems.length})
                    </span>
                  </h3>
                  {savedItems.map((item, idx) => (
                    <SavedItem
                      key={item.id}
                      item={item}
                      onMoveToCart={handleMoveToCart}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right — order summary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'sticky', top: '84px' }}>
              {/* Price summary card */}
              <div
                style={{
                  background: '#fff',
                  borderRadius: '14px',
                  padding: '20px',
                  border: '1.5px solid #f3e0ed',
                  boxShadow: '0 2px 12px rgba(233,30,140,0.06)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#aaa',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    margin: '0 0 16px',
                    paddingBottom: '12px',
                    borderBottom: '1px solid #f3e0ed',
                  }}
                >
                  Price Details
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                  <PriceLine
                    label={`Price (${inStockItems.reduce((s, i) => s + i.quantity, 0)} items)`}
                    value={fmt(originalTotal)}
                  />
                  <PriceLine label="Discount" value={`− ${fmt(totalDiscount)}`} valueColor="#27ae60" />
                  <PriceLine
                    label="Delivery Charges"
                    value={deliveryCharge === 0 ? 'FREE' : fmt(deliveryCharge)}
                    valueColor={deliveryCharge === 0 ? '#27ae60' : '#1a1a2e'}
                  />
                </div>

                <div
                  style={{
                    borderTop: '1.5px dashed #f0e0eb',
                    paddingTop: '14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px',
                  }}
                >
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '15px', fontWeight: 700, color: '#1a1a2e' }}>
                    Total Amount
                  </span>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '17px', fontWeight: 800, color: '#1a1a2e' }}>
                    {fmt(totalAmount)}
                  </span>
                </div>

                <div
                  style={{
                    background: PINK_LIGHT,
                    border: `1px solid ${PINK_MID}`,
                    borderRadius: '8px',
                    padding: '10px 14px',
                    fontSize: '13px',
                    color: PINK_DARK,
                    fontWeight: 600,
                    textAlign: 'center',
                    marginBottom: '16px',
                  }}
                >
                  You will save {fmt(totalDiscount)} on this order
                </div>

                <button
                  style={{
                    width: '100%',
                    padding: '14px 0',
                    background: `linear-gradient(135deg, ${PINK} 0%, ${PINK_DARK} 100%)`,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    letterSpacing: '0.02em',
                    boxShadow: '0 4px 16px rgba(233,30,140,0.28)',
                    transition: 'opacity 0.15s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.88' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>

              {/* Safe transaction banner */}
              <div
                style={{
                  background: '#fff',
                  borderRadius: '14px',
                  padding: '14px 18px',
                  border: '1.5px solid #f3e0ed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    background: PINK_LIGHT,
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={PINK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </div>
                <div>
                  <p style={{ margin: '0 0 2px', fontSize: '13px', fontWeight: 700, color: '#1a1a2e' }}>Safe & Secure Payments</p>
                  <p style={{ margin: 0, fontSize: '11px', color: '#aaa' }}>100% Authentic Products · Easy Returns</p>
                </div>
              </div>

              {/* Offers card */}
              <div
                style={{
                  background: '#fff',
                  borderRadius: '14px',
                  padding: '16px 18px',
                  border: '1.5px solid #f3e0ed',
                }}
              >
                <h4
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#aaa',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    margin: '0 0 12px',
                  }}
                >
                  Available Offers
                </h4>
                {[
                  { icon: '💳', text: '10% off on HDFC Credit Cards. Max discount ₹750.' },
                  { icon: '🎁', text: 'Buy 2 get extra 5% off. Use code SAVE5.' },
                  { icon: '🚚', text: 'Free delivery on orders above ₹499.' },
                ].map((offer, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: i < 2 ? '10px' : 0 }}>
                    <span style={{ fontSize: '14px', flexShrink: 0 }}>{offer.icon}</span>
                    <p style={{ margin: 0, fontSize: '12px', color: '#555', lineHeight: 1.5 }}>{offer.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function PriceLine({ label, value, valueColor = '#1a1a2e' }: { label: string; value: string; valueColor?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: '13px', color: '#555' }}>{label}</span>
      <span style={{ fontSize: '13px', fontWeight: 600, color: valueColor }}>{value}</span>
    </div>
  )
}
