import { useState } from 'react'
import Sidebar from './Sidebar'
import Overview from './Overview'
import Orders from './Orders'
import Products from './Products'
import Analytics from './Analytics'
import Payouts from './Payouts'

export type NavItem = 'overview' | 'orders' | 'products' | 'analytics' | 'payouts'

interface Props {
  onLogout: () => void
}

export default function SellerDashboard({ onLogout }: Props) {
  const [active, setActive] = useState<NavItem>('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const pages: Record<NavItem, JSX.Element> = {
    overview: <Overview />,
    orders: <Orders />,
    products: <Products />,
    analytics: <Analytics />,
    payouts: <Payouts />,
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#f8f5ff', fontFamily: 'DM Sans, sans-serif' }}>
      <Sidebar
        active={active}
        setActive={setActive}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        onLogout={onLogout}
      />
      <main className="flex-1 overflow-y-auto">
        {pages[active]}
      </main>
    </div>
  )
}
