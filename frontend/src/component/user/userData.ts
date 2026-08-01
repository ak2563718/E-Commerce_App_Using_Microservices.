export const USER = {
  firstName: 'Meera',
  lastName: 'Kapoor',
  phone: '+91 98765 43210',
  email: 'meera.kapoor@gmail.com',
  gender: 'female',
  dob: '1995-08-14',
  avatar: '',
}

export const ADDRESSES = [
  {
    id: 1,
    label: 'Home',
    name: 'Meera Kapoor',
    line1: '42, Lotus Lane, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pin: '400050',
    phone: '+91 98765 43210',
    isDefault: true,
  },
  {
    id: 2,
    label: 'Work',
    name: 'Meera Kapoor',
    line1: 'Oberoi Commerz II, Off WEH, Goregaon East',
    city: 'Mumbai',
    state: 'Maharashtra',
    pin: '400063',
    phone: '+91 98765 43210',
    isDefault: false,
  },
]

export const ORDERS = [
  {
    id: '#ORD-8821',
    date: 'Jul 31, 2025',
    status: 'delivered',
    items: [
      { name: 'Wireless Earbuds Pro', qty: 1, price: 2499, img: '📱' },
    ],
    total: 2499,
  },
  {
    id: '#ORD-8714',
    date: 'Jul 18, 2025',
    status: 'delivered',
    items: [
      { name: 'Bamboo Desk Organiser', qty: 2, price: 699, img: '🏠' },
      { name: 'Yoga Mat Premium', qty: 1, price: 1299, img: '🏃' },
    ],
    total: 2697,
  },
  {
    id: '#ORD-8601',
    date: 'Jul 5, 2025',
    status: 'shipped',
    items: [
      { name: 'Leather Crossbody Bag', qty: 1, price: 1899, img: '👜' },
    ],
    total: 1899,
  },
  {
    id: '#ORD-8503',
    date: 'Jun 22, 2025',
    status: 'cancelled',
    items: [
      { name: 'Smart Watch Series 5', qty: 1, price: 5999, img: '⌚' },
    ],
    total: 5999,
  },
]

export const WISHLIST = [
  { id: 1, name: 'USB-C Hub 7-in-1', price: 2199, originalPrice: 2799, img: '🔌', rating: 4.5, reviews: 312 },
  { id: 2, name: 'Running Shoes Men', price: 3499, originalPrice: 4999, img: '👟', rating: 4.3, reviews: 891 },
  { id: 3, name: 'Coffee Grinder Manual', price: 1299, originalPrice: 1799, img: '☕', rating: 4.7, reviews: 145 },
  { id: 4, name: 'Smart Watch Series 5', price: 5999, originalPrice: 7499, img: '⌚', rating: 4.6, reviews: 502 },
]

export const NOTIFICATIONS = [
  { id: 1, type: 'order', title: 'Order Delivered', msg: 'Your order #ORD-8821 has been delivered successfully.', time: '2 hours ago', read: false },
  { id: 2, type: 'offer', title: 'Flash Sale — 40% Off', msg: 'Electronics flash sale is live! Grab deals before they expire.', time: 'Yesterday', read: false },
  { id: 3, type: 'order', title: 'Order Shipped', msg: 'Your order #ORD-8601 is on its way. Track your package.', time: 'Jul 6, 2025', read: true },
  { id: 4, type: 'offer', title: "New Arrivals in Fashion", msg: 'Check out the latest summer collection now available on ShopHub.', time: 'Jul 3, 2025', read: true },
  { id: 5, type: 'account', title: 'Profile Updated', msg: 'Your profile information was updated successfully.', time: 'Jun 30, 2025', read: true },
]
