'use client'
import { useAppDispatch } from '@/redux/hooks'
import { createShippingAddress, getShippingAddress } from '@/redux/order/order.Action'
import { getProductbyId } from '@/redux/product/product.Action'
import { Loader } from 'lucide-react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const PINK = '#e91e8c'
const PINK_DARK = '#c2185b'
const PINK_LIGHT = '#fce4f3'
const PINK_MID = '#f48ccc'

function fmt(n: number) {
  return '₹' + n.toLocaleString('en-IN')
}

/* ─── Types ─────────────────────────────────────────────── */
interface Address {
  id: string
  name: string
  phone: string
  flat: string
  area: string
  city: string
  state: string
  pincode: string
  type: 'HOME' | 'WORK' | 'OTHER'
  default: boolean
}

type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'wallet' | 'cod' | null
type Step = 'address' | 'payment' | 'review'

/* ─── Static data ────────────────────────────────────────── */
// const SAVED_ADDRESSES: Address[] = [
//   {
//     id: 1,
//     name: 'Priya Sharma',
//     phone: '9876543210',
//     flat: '42, Sunshine Apartments, MG Road',
//     area: 'Koramangala',
//     city: 'Bengaluru',
//     state: 'Karnataka',
//     pincode: '560034',
//     type: 'HOME',
//     default: true,
//   },
//   {
//     id: 2,
//     name: 'Priya Sharma',
//     phone: '9876543210',
//     flat: 'WeWork, 3rd Floor, Embassy Golf Links',
//     area: 'Intermediate Ring Road',
//     city: 'Bengaluru',
//     state: 'Karnataka',
//     pincode: '560071',
//     type: 'WORK',
//     default: false,
//   },
// ]

// const ORDER_ITEMS = [
//   {
//     id: 1,
//     name: 'Apple iPhone 15 Pro Max (Natural Titanium, 512GB)',
//     image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=120&h=120&fit=crop&auto=format',
//     price: 159900,
//     originalPrice: 189900,
//     discount: 15,
//     qty: 1,
//     deliveryDate: 'Sat, 16 Aug 2026',
//   },
//   {
//     id: 2,
//     name: 'Sony WH-1000XM5 Wireless Headphones',
//     image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=120&h=120&fit=crop&auto=format',
//     price: 26990,
//     originalPrice: 34990,
//     discount: 22,
//     qty: 1,
//     deliveryDate: 'Sun, 17 Aug 2026',
//   },
// ]

const BANKS = ['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra Bank', 'Punjab National Bank', 'Yes Bank', 'IndusInd Bank']
const WALLETS = [
  { name: 'Paytm', icon: '💙', color: '#00BAF2' },
  { name: 'PhonePe', icon: '💜', color: '#5F259F' },
  { name: 'Amazon Pay', icon: '🟠', color: '#FF9900' },
  { name: 'Mobikwik', icon: '🔵', color: '#1B64F1' },
]
const UPI_APPS = [
  { name: 'Google Pay', icon: '🔵' },
  { name: 'PhonePe', icon: '💜' },
  { name: 'Paytm UPI', icon: '💙' },
  { name: 'BHIM UPI', icon: '🟢' },
]

/* ─── Small components ───────────────────────────────────── */
function StepBadge({ n, active, done }: { n: number; active: boolean; done: boolean }) {
  return (
    <div
      style={{
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        background: done ? '#27ae60' : active ? PINK : '#e0e0e0',
        color: done || active ? '#fff' : '#aaa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '13px',
        fontWeight: 700,
        flexShrink: 0,
        transition: 'all 0.2s',
      }}
    >
      {done ? '✓' : n}
    </div>
  )
}

function SectionCard({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '16px',
        border: '1.5px solid #f3e0ed',
        overflow: 'hidden',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

function RadioCircle({ checked }: { checked: boolean }) {
  return (
    <div
      style={{
        width: '18px',
        height: '18px',
        borderRadius: '50%',
        border: `2px solid ${checked ? PINK : '#ccc'}`,
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'all 0.15s',
      }}
    >
      {checked && (
        <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: PINK }} />
      )}
    </div>
  )
}

function PriceLine({ label, value, bold, color }: { label: string; value: string; bold?: boolean; color?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' }}>
      <span style={{ fontSize: '13px', color: bold ? '#1a1a2e' : '#666', fontWeight: bold ? 700 : 400 }}>{label}</span>
      <span style={{ fontSize: '13px', color: color ?? (bold ? '#1a1a2e' : '#333'), fontWeight: bold ? 700 : 500 }}>{value}</span>
    </div>
  )
}

function TagBadge({ label, color }: { label: string; color: string }) {
  return (
    <span
      style={{
        fontSize: '10px',
        fontWeight: 700,
        padding: '2px 8px',
        borderRadius: '20px',
        background: color + '18',
        color,
        letterSpacing: '0.04em',
      }}
    >
      {label}
    </span>
  )
}

/* ─── Address form ───────────────────────────────────────── */
function AddressForm({ onSave, onCancel }: { onSave: (addr: Address) => void; onCancel: () => void }) {
  const [form, setForm] = useState({ name: '', phone: '', flat: '', area: '', city: '', state: '', pincode: '',landmark:'', type: 'HOME' as Address['type'] })
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm(f => ({ ...f, [k]: e.target.value }))
  const valid = Object.values(form).every(v => v.trim().length > 0)

  const inputStyle: React.CSSProperties = {
    width: '100%',
    border: '1.5px solid #f0e0eb',
    borderRadius: '8px',
    padding: '9px 12px',
    fontSize: '13px',
    color: '#1a1a2e',
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
    background: '#fff',
    boxSizing: 'border-box',
  }
  return (
    <div style={{ padding: '20px', borderTop: '1px solid #f3e0ed', background: '#fdfafa' }}>
      <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 16px' }}>
        Add New Address
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
        <div>
          <label style={{ fontSize: '11px', color: '#aaa', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Full Name</label>
          <input style={inputStyle} placeholder="Enter full name" value={form.name} onChange={set('name')} />
        </div>
        <div>
          <label style={{ fontSize: '11px', color: '#aaa', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Phone Number</label>
          <input style={inputStyle} placeholder="10-digit mobile number" value={form.phone} onChange={set('phone')} maxLength={10} />
        </div>
      </div>
      <div style={{ marginBottom: '12px' }}>
        <label style={{ fontSize: '11px', color: '#aaa', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Flat / House No. / Building</label>
        <input style={inputStyle} placeholder="Flat, House no., Company, Apartment" value={form.flat} onChange={set('flat')} />
      </div>
      <div style={{ marginBottom: '12px' }}>
        <label style={{ fontSize: '11px', color: '#aaa', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Area / Street / Village</label>
        <input style={inputStyle} placeholder="Area, Street, Sector, Village" value={form.area} onChange={set('area')} />
      </div>
      <div style={{ marginBottom: '12px' }}>
        <label style={{ fontSize: '11px', color: '#aaa', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Landmark</label>
        <input style={inputStyle} placeholder="Landmark, famous point" value={form.landmark} onChange={set('landmark')} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
        <div>
          <label style={{ fontSize: '11px', color: '#aaa', fontWeight: 600, display: 'block', marginBottom: '4px' }}>City</label>
          <input style={inputStyle} placeholder="City" value={form.city} onChange={set('city')} />
        </div>
        <div>
          <label style={{ fontSize: '11px', color: '#aaa', fontWeight: 600, display: 'block', marginBottom: '4px' }}>State</label>
          <input style={inputStyle} placeholder="State" value={form.state} onChange={set('state')} />
        </div>
        <div>
          <label style={{ fontSize: '11px', color: '#aaa', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Pincode</label>
          <input style={inputStyle} placeholder="6-digit pincode" value={form.pincode} onChange={set('pincode')} maxLength={6} />
        </div>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ fontSize: '11px', color: '#aaa', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Address Type</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          {(['HOME', 'WORK', 'OTHER'] as const).map(t => (
            <button
              key={t}
              onClick={() => setForm(f => ({ ...f, type: t }))}
              style={{
                padding: '7px 20px',
                border: `1.5px solid ${form.type === t ? PINK : '#e0d0da'}`,
                borderRadius: '8px',
                background: form.type === t ? PINK_LIGHT : '#fff',
                color: form.type === t ? PINK_DARK : '#666',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {t === 'HOME' ? '🏠' : t === 'WORK' ? '💼' : '📍'} {t}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={() =>{ 
            onSave({ ...form, id: String(Date.now()), default: false })
          }
          }
          disabled={!valid}
          style={{
            padding: '10px 28px',
            background: valid ? `linear-gradient(135deg, ${PINK}, ${PINK_DARK})` : '#f0e0eb',
            color: valid ? '#fff' : '#ccc',
            border: 'none',
            borderRadius: '10px',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '13px',
            fontWeight: 700,
            cursor: valid ? 'pointer' : 'not-allowed',
          }}
        >
          Save Address
        </button>
        <button
          onClick={onCancel}
          style={{ padding: '10px 20px', background: 'none', border: '1.5px solid #e0d0da', borderRadius: '10px', color: '#888', fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

/* ─── Main component ─────────────────────────────────────── */
export default function ProductCheckout() {
  const [step, setStep] = useState<Step>('address')
  const [addresses, setAddresses] = useState<Address[]>([])
  const [selectedAddress, setSelectedAddress] = useState<string>('')
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null)
  const [upiId, setUpiId] = useState('')
  const [upiApp, setUpiApp] = useState('')
  const [selectedBank, setSelectedBank] = useState('')
  const [selectedWallet, setSelectedWallet] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [saveCard, setSaveCard] = useState(false)
  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [loading, setLoading] = useState(false)
  const [ORDER_ITEMS,setORDER_ITEMS] =useState<any>({
    id:'',
    name:'',
    image:'',
    price:'',
    originalPrice:'',
    discount:'',
    qty:'',
    deliverDate:'',
  })
  const router = useRouter();
  const dispatch = useAppDispatch();
  const params = useSearchParams()
  const id = params.get('productId')

  const subtotal = ORDER_ITEMS.reduce((s, i) => s + i.price * i.qty, 0)
  const originalTotal = ORDER_ITEMS.reduce((s, i) => s + i.originalPrice * i.qty, 0)
  const discount = originalTotal - subtotal
  const couponDiscount = couponApplied ? 1500 : 0
  const delivery = 0
  const total = subtotal - couponDiscount + delivery

  const canProceedAddress = selectedAddress !== null
  const canProceedPayment =
    paymentMethod === 'cod' ||
    (paymentMethod === 'upi' && (upiId.includes('@') || upiApp !== '')) ||
    (paymentMethod === 'card' && cardNumber.length === 19 && cardName && cardExpiry && cardCvv.length === 3) ||
    (paymentMethod === 'netbanking' && selectedBank !== '') ||
    (paymentMethod === 'wallet' && selectedWallet !== '')
useEffect(() => {
  const getData = async () => {
    try {
      setLoading(true);

      if (!id) {
        return;
      }

      const [addressRes, product] = await Promise.all([
        dispatch(getShippingAddress()).unwrap(),
        dispatch(getProductbyId(id)).unwrap(),
      ]);
      console.log('product data is',product.data)
      setAddresses(addressRes.data);

      setORDER_ITEMS({
        id:product?.data.id,
        name:product?.data.name,
        image:product?.data?.variants?.[0].url,
        price:product?.data?.variants?.[0].costPrice,
        originalPrice:product?.data?.variants?.[0].price,
        discount:product?.data?.variants?.[0].price-product?.data?.variants?.[0].costPrice,
      }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  getData();
}, [id, params]);
  console.log(ORDER_ITEMS)
  const handleSaveAddress = async(addr: Address) => {
    const res = await dispatch(createShippingAddress(addr)).unwrap();
    console.log(res)
    setAddresses(prev => [...prev, addr])
    setSelectedAddress(addr.id)
    setShowAddressForm(false)
  }
  const handlePlaceOrder = () => setOrderPlaced(true)

  const STEPS: { key: Step; label: string }[] = [
    { key: 'address', label: 'Delivery Address' },
    { key: 'payment', label: 'Payment' },
    { key: 'review', label: 'Review & Place Order' },
  ]

  if(loading){
    return <Loader/>
  }

  if (orderPlaced) {
    return (
      <div style={{ minHeight: '100vh', background: '#fdf0f8', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
          <div style={{ background: '#fff', borderRadius: '20px', border: '1.5px solid #f3e0ed', padding: '56px 48px', textAlign: 'center', maxWidth: '480px', width: '100%' }}>
            <div
              style={{
                width: '80px', height: '80px', borderRadius: '50%',
                background: `linear-gradient(135deg, ${PINK}, ${PINK_DARK})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px', fontSize: '36px',
              }}
            >
              ✓
            </div>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '22px', fontWeight: 800, color: '#1a1a2e', margin: '0 0 8px' }}>
              Order Placed!
            </h2>
            <p style={{ fontSize: '14px', color: '#888', margin: '0 0 24px', lineHeight: 1.6 }}>
              Your order has been confirmed. You'll receive a confirmation SMS and email shortly.
            </p>
            <div style={{ background: '#fdf4fa', borderRadius: '12px', padding: '14px 20px', marginBottom: '24px', border: '1px solid #f3e0ed' }}>
              <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#aaa' }}>Order ID</p>
              <p style={{ margin: 0, fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: 800, color: PINK }}>
                #SH{Math.floor(Math.random() * 9000000 + 1000000)}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                onClick={() => setOrderPlaced(false)}
                style={{
                  padding: '11px 28px', background: `linear-gradient(135deg, ${PINK}, ${PINK_DARK})`,
                  color: '#fff', border: 'none', borderRadius: '10px',
                  fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                }}
              >
                Continue Shopping
              </button>
              <button
                style={{
                  padding: '11px 24px', background: '#fff', border: `1.5px solid ${PINK}`,
                  color: PINK, borderRadius: '10px', fontFamily: 'Poppins, sans-serif',
                  fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                }}
              >
                Track Order
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fdf0f8', fontFamily: 'Inter, sans-serif' }}>
      <Header />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 28px 48px' }}>
        {/* Stepper */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginBottom: '28px', background: '#fff', borderRadius: '14px', border: '1.5px solid #f3e0ed', padding: '0 28px', overflow: 'hidden' }}>
          {STEPS.map((s, i) => {
            const isDone = STEPS.findIndex(x => x.key === step) > i
            const isActive = s.key === step
            return (
              <div key={s.key} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '18px 0',
                    cursor: isDone ? 'pointer' : 'default',
                    flex: 1,
                  }}
                  onClick={() => isDone && setStep(s.key)}
                >
                  <StepBadge n={i + 1} active={isActive} done={isDone} />
                  <span
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '13px',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? PINK : isDone ? '#27ae60' : '#aaa',
                    }}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ width: '1px', height: '30px', background: '#f3e0ed', flexShrink: 0 }} />
                )}
              </div>
            )
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', alignItems: 'start' }}>
          {/* Left panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* ── STEP 1: Address ── */}
            {step === 'address' && (
              <SectionCard>
                <div style={{ padding: '20px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
                    Select Delivery Address
                  </h2>
                  <button
                    onClick={() => setShowAddressForm(v => !v)}
                    style={{ background: 'none', border: `1.5px solid ${PINK}`, borderRadius: '8px', color: PINK, fontSize: '12px', fontWeight: 700, padding: '6px 14px', cursor: 'pointer' }}
                  >
                    + Add New
                  </button>
                </div>

                <div style={{ padding: '16px 24px' }}>
                  {addresses.map(addr => (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddress(addr.id)}
                      style={{
                        border: `1.5px solid ${selectedAddress === addr.id ? PINK : '#f0e0eb'}`,
                        borderRadius: '12px',
                        padding: '16px',
                        marginBottom: '12px',
                        cursor: 'pointer',
                        background: selectedAddress === addr.id ? PINK_LIGHT : '#fff',
                        transition: 'all 0.15s',
                      }}
                    >
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <RadioCircle checked={selectedAddress === addr.id} />
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
                            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: 700, color: '#1a1a2e' }}>{addr.name}</span>
                            <TagBadge label={addr.type} color={addr.type === 'HOME' ? PINK : addr.type === 'WORK' ? '#2874f0' : '#888'} />
                            {addr.default && <TagBadge label="Default" color="#27ae60" />}
                            <span style={{ fontSize: '13px', color: '#555', marginLeft: '4px' }}>{addr.phone}</span>
                          </div>
                          <p style={{ margin: '0 0 4px', fontSize: '13px', color: '#555', lineHeight: 1.5 }}>
                            {addr?.flat}, {addr?.area}
                          </p>
                          <p style={{ margin: 0, fontSize: '13px', color: '#555' }}>
                            {addr.city}, {addr.state} — <strong>{addr?.pincode}</strong>
                          </p>
                        </div>
                        {selectedAddress === addr.id && (
                          <button
                            onClick={e => e.stopPropagation()}
                            style={{ background: 'none', border: 'none', color: PINK, fontSize: '12px', fontWeight: 600, cursor: 'pointer', padding: '0', flexShrink: 0 }}
                          >
                            Edit
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {showAddressForm && (
                  <AddressForm onSave={handleSaveAddress} onCancel={() => setShowAddressForm(false)} />
                )}

                <div style={{ padding: '0 24px 20px', display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => canProceedAddress && setStep('payment')}
                    disabled={!canProceedAddress}
                    style={{
                      padding: '12px 36px',
                      background: canProceedAddress ? `linear-gradient(135deg, ${PINK}, ${PINK_DARK})` : '#f0e0eb',
                      color: canProceedAddress ? '#fff' : '#ccc',
                      border: 'none', borderRadius: '10px',
                      fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: 700,
                      cursor: canProceedAddress ? 'pointer' : 'not-allowed',
                      boxShadow: canProceedAddress ? '0 4px 14px rgba(233,30,140,0.28)' : 'none',
                    }}
                  >
                    Deliver Here →
                  </button>
                </div>
              </SectionCard>
            )}

            {/* ── STEP 2: Payment ── */}
            {step === 'payment' && (
              <SectionCard>
                <div style={{ padding: '20px 24px 0' }}>
                  <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
                    Choose Payment Method
                  </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', minHeight: '400px' }}>
                  {/* Method list */}
                  <div style={{ borderRight: '1px solid #f3e0ed', padding: '16px 0' }}>
                    {([
                      { key: 'upi', label: 'UPI', icon: '📲' },
                      { key: 'card', label: 'Credit / Debit Card', icon: '💳' },
                      { key: 'netbanking', label: 'Net Banking', icon: '🏦' },
                      { key: 'wallet', label: 'Wallets', icon: '👛' },
                      { key: 'cod', label: 'Cash on Delivery', icon: '💵' },
                    ] as { key: PaymentMethod; label: string; icon: string }[]).map(m => (
                      <button
                        key={m.key}
                        onClick={() => setPaymentMethod(m.key)}
                        style={{
                          width: '100%',
                          padding: '13px 18px',
                          background: paymentMethod === m.key ? PINK_LIGHT : 'transparent',
                          border: 'none',
                          borderLeft: `3px solid ${paymentMethod === m.key ? PINK : 'transparent'}`,
                          textAlign: 'left',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          transition: 'all 0.15s',
                        }}
                      >
                        <span style={{ fontSize: '16px' }}>{m.icon}</span>
                        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: paymentMethod === m.key ? 700 : 500, color: paymentMethod === m.key ? PINK_DARK : '#444' }}>
                          {m.label}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Method detail */}
                  <div style={{ padding: '20px 22px' }}>
                    {!paymentMethod && (
                      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '10px', color: '#ccc' }}>
                        <span style={{ fontSize: '40px' }}>💳</span>
                        <span style={{ fontSize: '13px' }}>Select a payment method</span>
                      </div>
                    )}

                    {/* UPI */}
                    {paymentMethod === 'upi' && (
                      <div>
                        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 14px' }}>Pay via UPI</p>
                        <p style={{ fontSize: '12px', color: '#888', margin: '0 0 10px' }}>Select UPI App</p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '18px' }}>
                          {UPI_APPS.map(app => (
                            <button
                              key={app.name}
                              onClick={() => { setUpiApp(app.name); setUpiId('') }}
                              style={{
                                border: `1.5px solid ${upiApp === app.name ? PINK : '#f0e0eb'}`,
                                borderRadius: '10px',
                                background: upiApp === app.name ? PINK_LIGHT : '#fff',
                                padding: '10px 12px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                transition: 'all 0.15s',
                              }}
                            >
                              <span style={{ fontSize: '18px' }}>{app.icon}</span>
                              <span style={{ fontSize: '12px', fontWeight: 600, color: upiApp === app.name ? PINK_DARK : '#444' }}>{app.name}</span>
                            </button>
                          ))}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                          <div style={{ flex: 1, height: '1px', background: '#f3e0ed' }} />
                          <span style={{ fontSize: '11px', color: '#aaa' }}>or enter UPI ID</span>
                          <div style={{ flex: 1, height: '1px', background: '#f3e0ed' }} />
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <input
                            value={upiId}
                            onChange={e => { setUpiId(e.target.value); setUpiApp('') }}
                            placeholder="yourname@upi"
                            style={{ flex: 1, border: '1.5px solid #f0e0eb', borderRadius: '8px', padding: '9px 12px', fontSize: '13px', outline: 'none', color: '#1a1a2e' }}
                          />
                          <button
                            style={{
                              padding: '9px 16px', background: upiId.includes('@') ? `linear-gradient(135deg, ${PINK}, ${PINK_DARK})` : '#f0e0eb',
                              color: upiId.includes('@') ? '#fff' : '#ccc', border: 'none', borderRadius: '8px',
                              fontSize: '12px', fontWeight: 700, cursor: upiId.includes('@') ? 'pointer' : 'not-allowed',
                            }}
                          >
                            Verify
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Card */}
                    {paymentMethod === 'card' && (
                      <div>
                        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 16px' }}>
                          Credit / Debit Card
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <div>
                            <label style={{ fontSize: '11px', color: '#aaa', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Card Number</label>
                            <input
                              value={cardNumber}
                              onChange={e => {
                                const v = e.target.value.replace(/\D/g, '').slice(0, 16)
                                setCardNumber(v.replace(/(.{4})/g, '$1 ').trim())
                              }}
                              placeholder="1234 5678 9012 3456"
                              style={{ width: '100%', border: '1.5px solid #f0e0eb', borderRadius: '8px', padding: '9px 12px', fontSize: '13px', outline: 'none', color: '#1a1a2e', boxSizing: 'border-box' }}
                            />
                          </div>
                          <div>
                            <label style={{ fontSize: '11px', color: '#aaa', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Name on Card</label>
                            <input
                              value={cardName}
                              onChange={e => setCardName(e.target.value)}
                              placeholder="As printed on card"
                              style={{ width: '100%', border: '1.5px solid #f0e0eb', borderRadius: '8px', padding: '9px 12px', fontSize: '13px', outline: 'none', color: '#1a1a2e', boxSizing: 'border-box' }}
                            />
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <div>
                              <label style={{ fontSize: '11px', color: '#aaa', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Expiry (MM/YY)</label>
                              <input
                                value={cardExpiry}
                                onChange={e => {
                                  const v = e.target.value.replace(/\D/g, '').slice(0, 4)
                                  setCardExpiry(v.length > 2 ? v.slice(0, 2) + '/' + v.slice(2) : v)
                                }}
                                placeholder="MM/YY"
                                style={{ width: '100%', border: '1.5px solid #f0e0eb', borderRadius: '8px', padding: '9px 12px', fontSize: '13px', outline: 'none', color: '#1a1a2e', boxSizing: 'border-box' }}
                              />
                            </div>
                            <div>
                              <label style={{ fontSize: '11px', color: '#aaa', fontWeight: 600, display: 'block', marginBottom: '4px' }}>CVV</label>
                              <input
                                value={cardCvv}
                                onChange={e => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                                placeholder="•••"
                                type="password"
                                style={{ width: '100%', border: '1.5px solid #f0e0eb', borderRadius: '8px', padding: '9px 12px', fontSize: '13px', outline: 'none', color: '#1a1a2e', boxSizing: 'border-box' }}
                              />
                            </div>
                          </div>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12px', color: '#555' }}>
                            <div
                              onClick={() => setSaveCard(v => !v)}
                              style={{
                                width: '16px', height: '16px', border: `2px solid ${saveCard ? PINK : '#ccc'}`,
                                borderRadius: '4px', background: saveCard ? PINK : '#fff',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
                              }}
                            >
                              {saveCard && <svg width="9" height="7" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                            </div>
                            Save this card securely for future payments
                          </label>
                          <p style={{ margin: 0, fontSize: '11px', color: '#aaa', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            🔒 Your card details are encrypted and secure
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Net Banking */}
                    {paymentMethod === 'netbanking' && (
                      <div>
                        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 14px' }}>Select Your Bank</p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
                          {BANKS.slice(0, 6).map(bank => (
                            <button
                              key={bank}
                              onClick={() => setSelectedBank(bank)}
                              style={{
                                border: `1.5px solid ${selectedBank === bank ? PINK : '#f0e0eb'}`,
                                borderRadius: '10px',
                                background: selectedBank === bank ? PINK_LIGHT : '#fff',
                                padding: '10px 12px',
                                cursor: 'pointer',
                                textAlign: 'left',
                                transition: 'all 0.15s',
                              }}
                            >
                              <span style={{ fontSize: '12px', fontWeight: 600, color: selectedBank === bank ? PINK_DARK : '#444' }}>🏦 {bank}</span>
                            </button>
                          ))}
                        </div>
                        <div>
                          <label style={{ fontSize: '11px', color: '#aaa', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Or select from all banks</label>
                          <select
                            value={selectedBank}
                            onChange={e => setSelectedBank(e.target.value)}
                            style={{ width: '100%', border: '1.5px solid #f0e0eb', borderRadius: '8px', padding: '9px 12px', fontSize: '13px', outline: 'none', color: '#1a1a2e', background: '#fff', cursor: 'pointer' }}
                          >
                            <option value="">-- Choose bank --</option>
                            {BANKS.map(b => <option key={b} value={b}>{b}</option>)}
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Wallets */}
                    {paymentMethod === 'wallet' && (
                      <div>
                        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 14px' }}>Select Wallet</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {WALLETS.map(w => (
                            <button
                              key={w.name}
                              onClick={() => setSelectedWallet(w.name)}
                              style={{
                                border: `1.5px solid ${selectedWallet === w.name ? PINK : '#f0e0eb'}`,
                                borderRadius: '10px',
                                background: selectedWallet === w.name ? PINK_LIGHT : '#fff',
                                padding: '12px 16px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                transition: 'all 0.15s',
                              }}
                            >
                              <RadioCircle checked={selectedWallet === w.name} />
                              <span style={{ fontSize: '20px' }}>{w.icon}</span>
                              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 600, color: selectedWallet === w.name ? PINK_DARK : '#333' }}>
                                {w.name}
                              </span>
                              <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#27ae60', fontWeight: 600 }}>
                                ₹0 balance
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* COD */}
                    {paymentMethod === 'cod' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div style={{ background: PINK_LIGHT, border: `1px solid ${PINK_MID}`, borderRadius: '12px', padding: '16px 18px', display: 'flex', gap: '12px' }}>
                          <span style={{ fontSize: '28px' }}>💵</span>
                          <div>
                            <p style={{ margin: '0 0 4px', fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: 700, color: PINK_DARK }}>
                              Cash on Delivery
                            </p>
                            <p style={{ margin: 0, fontSize: '13px', color: '#666', lineHeight: 1.6 }}>
                              Pay in cash when your order is delivered to your doorstep. No extra charges.
                            </p>
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {[
                            { icon: '✅', text: 'No advance payment required' },
                            { icon: '📦', text: 'Pay when the package arrives' },
                            { icon: '🔄', text: 'Easy returns within 7 days' },
                            { icon: '💰', text: 'Keep exact change ready' },
                          ].map((pt, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <span style={{ fontSize: '16px' }}>{pt.icon}</span>
                              <span style={{ fontSize: '13px', color: '#555' }}>{pt.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ padding: '16px 24px', borderTop: '1px solid #f3e0ed', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button
                    onClick={() => setStep('address')}
                    style={{ background: 'none', border: '1.5px solid #e0d0da', borderRadius: '10px', color: '#888', fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 600, padding: '10px 20px', cursor: 'pointer' }}
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => canProceedPayment && setStep('review')}
                    disabled={!canProceedPayment}
                    style={{
                      padding: '12px 36px',
                      background: canProceedPayment ? `linear-gradient(135deg, ${PINK}, ${PINK_DARK})` : '#f0e0eb',
                      color: canProceedPayment ? '#fff' : '#ccc', border: 'none', borderRadius: '10px',
                      fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: 700,
                      cursor: canProceedPayment ? 'pointer' : 'not-allowed',
                      boxShadow: canProceedPayment ? '0 4px 14px rgba(233,30,140,0.28)' : 'none',
                    }}
                  >
                    Continue →
                  </button>
                </div>
              </SectionCard>
            )}

            {/* ── STEP 3: Review ── */}
            {step === 'review' && (() => {
              const addr = addresses.find(a => a.id === selectedAddress)!
              const methodLabel: Record<string, string> = { upi: upiApp || upiId, card: `Card ending ···· ${cardNumber.replace(/\s/g, '').slice(-4)}`, netbanking: selectedBank, wallet: selectedWallet, cod: 'Cash on Delivery' }
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {/* Delivery address summary */}
                  <SectionCard>
                    <div style={{ padding: '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Deliver To</span>
                        </div>
                        <p style={{ margin: '0 0 2px', fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: 700, color: '#1a1a2e' }}>{addr.name} · {addr.phone}</p>
                        <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>{addr.flat}, {addr.area}, {addr.city}, {addr.state} — {addr.pincode}</p>
                      </div>
                      <button onClick={() => setStep('address')} style={{ background: 'none', border: 'none', color: PINK, fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>Change</button>
                    </div>
                  </SectionCard>

                  {/* Payment summary */}
                  <SectionCard>
                    <div style={{ padding: '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '4px' }}>Payment</span>
                        <span style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a2e' }}>{methodLabel[paymentMethod!] || '—'}</span>
                      </div>
                      <button onClick={() => setStep('payment')} style={{ background: 'none', border: 'none', color: PINK, fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>Change</button>
                    </div>
                  </SectionCard>

                  {/* Items */}
                  <SectionCard>
                    <div style={{ padding: '18px 22px 0' }}>
                      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Order Items</span>
                    </div>
                    {ORDER_ITEMS.map((item, i) => (
                      <div
                        key={item.id}
                        style={{
                          display: 'flex', gap: '16px', padding: '16px 22px',
                          borderBottom: i < ORDER_ITEMS.length - 1 ? '1px solid #f9f0f6' : 'none',
                        }}
                      >
                        <div style={{ width: '70px', height: '70px', background: '#fdf4fa', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #f3e0ed', flexShrink: 0, overflow: 'hidden' }}>
                          <img src={item.image} alt={item.name} style={{ width: '58px', height: '58px', objectFit: 'contain' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ margin: '0 0 4px', fontSize: '13px', fontWeight: 600, color: '#1a1a2e', lineHeight: 1.4 }}>{item.name}</p>
                          <p style={{ margin: '0 0 6px', fontSize: '12px', color: '#888' }}>Qty: {item.qty}</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '15px', fontWeight: 700, color: '#1a1a2e' }}>{fmt(item.price)}</span>
                            <span style={{ fontSize: '11px', color: '#27ae60', fontWeight: 600 }}>{item.discount}% off</span>
                          </div>
                          <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#27ae60', fontWeight: 600 }}>Delivery by {item.deliveryDate}</p>
                        </div>
                      </div>
                    ))}
                  </SectionCard>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' }}>
                    <button
                      onClick={() => setStep('payment')}
                      style={{ background: 'none', border: '1.5px solid #e0d0da', borderRadius: '10px', color: '#888', fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 600, padding: '10px 20px', cursor: 'pointer' }}
                    >
                      ← Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      style={{
                        padding: '13px 44px',
                        background: `linear-gradient(135deg, ${PINK}, ${PINK_DARK})`,
                        color: '#fff', border: 'none', borderRadius: '10px',
                        fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: 700,
                        cursor: 'pointer', boxShadow: '0 4px 18px rgba(233,30,140,0.32)',
                        letterSpacing: '0.02em',
                      }}
                    >
                      Place Order 🎉
                    </button>
                  </div>
                </div>
              )
            })()}
          </div>

          {/* Right — order summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'sticky', top: '80px' }}>

            {/* Price summary */}
            <div style={{ background: '#fff', borderRadius: '16px', border: '1.5px solid #f3e0ed', padding: '20px', boxShadow: '0 2px 12px rgba(233,30,140,0.06)' }}>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 14px', paddingBottom: '12px', borderBottom: '1px solid #f3e0ed' }}>
                Price Details
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                <PriceLine label={`Price (${ORDER_ITEMS.length} items)`} value={fmt(originalTotal)} />
                <PriceLine label="Discount" value={`− ${fmt(discount)}`} color="#27ae60" />
                {couponApplied && <PriceLine label="Coupon Discount" value={`− ${fmt(couponDiscount)}`} color="#27ae60" />}
                <PriceLine label="Delivery Charges" value="FREE" color="#27ae60" />
              </div>
              <div style={{ borderTop: '1.5px dashed #f0e0eb', paddingTop: '12px', marginBottom: '14px' }}>
                <PriceLine label="Total Amount" value={fmt(total)} bold />
              </div>
              <div style={{ background: PINK_LIGHT, border: `1px solid ${PINK_MID}`, borderRadius: '8px', padding: '10px 14px', textAlign: 'center', fontSize: '13px', color: PINK_DARK, fontWeight: 600 }}>
                You will save {fmt(discount + couponDiscount)} on this order
              </div>
            </div>

            {/* Items mini list */}
            <div style={{ background: '#fff', borderRadius: '16px', border: '1.5px solid #f3e0ed', padding: '16px 18px' }}>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px' }}>
                {ORDER_ITEMS.length} Items in Order
              </p>
              {ORDER_ITEMS.map((item, i) => (
                <div key={item.id} style={{ display: 'flex', gap: '10px', alignItems: 'center', paddingBottom: i < ORDER_ITEMS.length - 1 ? '10px' : 0, marginBottom: i < ORDER_ITEMS.length - 1 ? '10px' : 0, borderBottom: i < ORDER_ITEMS.length - 1 ? '1px solid #f9f0f6' : 'none' }}>
                  <div style={{ width: '44px', height: '44px', background: '#fdf4fa', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #f3e0ed', overflow: 'hidden', flexShrink: 0 }}>
                    <img src={item.image} alt="" style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: '0 0 2px', fontSize: '11px', color: '#444', fontWeight: 500, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{item.name}</p>
                    <p style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: PINK }}>{fmt(item.price)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust */}
            <div style={{ background: '#fff', borderRadius: '16px', border: '1.5px solid #f3e0ed', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', background: PINK_LIGHT, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={PINK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </div>
              <div>
                <p style={{ margin: '0 0 2px', fontSize: '13px', fontWeight: 700, color: '#1a1a2e' }}>100% Secure Checkout</p>
                <p style={{ margin: 0, fontSize: '11px', color: '#aaa' }}>SSL encrypted · PCI-DSS compliant</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Header() {
  return (
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
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: '#fff', borderRadius: '10px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke={PINK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 6h18M16 10a4 4 0 01-8 0" stroke={PINK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '22px', fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>ShopHub</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.85)', fontSize: '12px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
          Safe & Secure Checkout
        </div>
      </div>
    </div>
  )
}
