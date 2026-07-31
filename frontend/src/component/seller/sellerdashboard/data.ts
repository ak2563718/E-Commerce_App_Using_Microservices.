export const revenueData = [
  { month: 'Feb', revenue: 41200, orders: 312 },
  { month: 'Mar', revenue: 53800, orders: 401 },
  { month: 'Apr', revenue: 48600, orders: 367 },
  { month: 'May', revenue: 67400, orders: 512 },
  { month: 'Jun', revenue: 72100, orders: 548 },
  { month: 'Jul', revenue: 89300, orders: 683 },
]

export const categoryData = [
  { name: 'Electronics', value: 38, color: '#7c3aed' },
  { name: 'Fashion', value: 27, color: '#a855f7' },
  { name: 'Home & Garden', value: 19, color: '#e91e8c' },
  { name: 'Sports', value: 16, color: '#f472b6' },
]

export const recentOrders = [
  { id: '#ORD-8821', customer: 'Meera Kapoor', product: 'Wireless Earbuds Pro', amount: 2499, status: 'delivered', date: 'Jul 31, 2025' },
  { id: '#ORD-8820', customer: 'Arjun Nair', product: 'Leather Crossbody Bag', amount: 1899, status: 'shipped', date: 'Jul 31, 2025' },
  { id: '#ORD-8819', customer: 'Sunita Rao', product: 'Bamboo Desk Organiser', amount: 699, status: 'processing', date: 'Jul 30, 2025' },
  { id: '#ORD-8818', customer: 'Vikram Singh', product: 'Smart Watch Series 5', amount: 5999, status: 'delivered', date: 'Jul 30, 2025' },
  { id: '#ORD-8817', customer: 'Fatima Sheikh', product: 'Yoga Mat Premium', amount: 1299, status: 'cancelled', date: 'Jul 29, 2025' },
  { id: '#ORD-8816', customer: 'Rohan Desai', product: 'USB-C Hub 7-in-1', amount: 2199, status: 'shipped', date: 'Jul 29, 2025' },
]

export const topProducts = [
  { name: 'Wireless Earbuds Pro', sku: 'ELEC-WEP-001', stock: 142, sold: 891, revenue: 222509, trend: '+12%' },
  { name: 'Smart Watch Series 5', sku: 'ELEC-SWS-005', stock: 38, sold: 456, revenue: 273544, trend: '+8%' },
  { name: 'Leather Crossbody Bag', sku: 'FASH-LCB-012', stock: 67, sold: 312, revenue: 59269, trend: '+21%' },
  { name: 'USB-C Hub 7-in-1', sku: 'ELEC-UCH-007', stock: 203, sold: 278, revenue: 61122, trend: '+5%' },
  { name: 'Bamboo Desk Organiser', sku: 'HOME-BDO-003', stock: 15, sold: 189, revenue: 13211, trend: '-3%' },
]

export const notifications = [
  { type: 'order', msg: 'New order #ORD-8822 received — ₹3,499', time: '2 min ago' },
  { type: 'stock', msg: 'Bamboo Desk Organiser low stock (15 left)', time: '1 hr ago' },
  { type: 'payout', msg: 'Payout of ₹42,500 processed successfully', time: '3 hr ago' },
  { type: 'review', msg: 'New 5★ review on Wireless Earbuds Pro', time: 'Yesterday' },
]
