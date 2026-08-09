const PRODUCTS = [
  { id: 'P-001', name: 'Wireless Earbuds Pro', category: 'Audio', price: '$89.99', stock: 342, status: 'active', sales: 842 },
  { id: 'P-002', name: 'Mechanical Keyboard RGB', category: 'Peripherals', price: '$129.00', stock: 87, status: 'active', sales: 631 },
  { id: 'P-003', name: 'USB-C Hub 7-in-1', category: 'Accessories', price: '$44.50', stock: 204, status: 'active', sales: 519 },
  { id: 'P-004', name: 'Standing Desk Kit', category: 'Furniture', price: '$349.00', stock: 12, status: 'low stock', sales: 214 },
  { id: 'P-005', name: 'Monitor Light Bar', category: 'Accessories', price: '$58.00', stock: 176, status: 'active', sales: 388 },
  { id: 'P-006', name: 'Laptop Stand Aluminium', category: 'Accessories', price: '$74.99', stock: 0, status: 'out of stock', sales: 421 },
  { id: 'P-007', name: 'Noise-Cancelling Headset', category: 'Audio', price: '$219.00', stock: 54, status: 'active', sales: 297 },
  { id: 'P-008', name: 'Ergonomic Mouse', category: 'Peripherals', price: '$65.00', stock: 132, status: 'active', sales: 465 },
]

const STATUS: Record<string, string> = {
  active: 'badge-success',
  'low stock': 'badge-warning',
  'out of stock': 'badge-danger',
}

export default function Products() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn-primary">+ Add Product</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {PRODUCTS.map((p) => (
          <div key={p.id} className="card card-glow" style={{ padding: '18px 20px', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
              <div
                style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: 'linear-gradient(135deg, rgba(109,40,217,0.3), rgba(67,56,202,0.2))',
                  border: '1px solid rgba(139,92,246,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20,
                }}
              >
                {p.category === 'Audio' ? '🎧' : p.category === 'Furniture' ? '🪑' : p.category === 'Peripherals' ? '⌨️' : '🔌'}
              </div>
              <span className={`pill ${STATUS[p.status]}`}>{p.status}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600, color: '#e2d9f3', marginBottom: 4 }}>{p.name}</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#6b5fa0', marginBottom: 14 }}>{p.category} · {p.id}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, color: '#c4b5fd' }}>{p.price}</span>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: p.stock === 0 ? '#f87171' : p.stock < 20 ? '#fbbf24' : '#8b7eb8' }}>
                  {p.stock} in stock
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#6b5fa0' }}>{p.sales} sold</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
