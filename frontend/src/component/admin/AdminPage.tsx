'use client'
import { useState, useRef, useCallback, useEffect } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import Dashboard from './Dashboard'
import Orders from './Orders'
import Products from './Products'
import Customers from './Customers'
import Analytics from './Analytics'

export type Page = 'dashboard' | 'orders' | 'products' | 'customers' | 'analytics'

const MIN_WIDTH = 56
const MAX_WIDTH = 280
const DEFAULT_WIDTH = 220

export default function AdminPage() {
  const [page, setPage] = useState<Page>('dashboard')
  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_WIDTH)
  const [collapsed, setCollapsed] = useState(false)
  const [dragging, setDragging] = useState(false)
  const dragStart = useRef<{ x: number; w: number } | null>(null)
  const prevWidth = useRef(DEFAULT_WIDTH)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    dragStart.current = { x: e.clientX, w: sidebarWidth }
    setDragging(true)
  }, [sidebarWidth])

  useEffect(() => {
    if (!dragging) return
    const onMove = (e: MouseEvent) => {
      if (!dragStart.current) return
      const delta = e.clientX - dragStart.current.x
      const next = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, dragStart.current.w + delta))
      setSidebarWidth(next)
      if (next <= MIN_WIDTH + 20) setCollapsed(true)
      else setCollapsed(false)
    }
    const onUp = () => {
      setDragging(false)
      dragStart.current = null
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [dragging])

  const toggleSidebar = () => {
    if (collapsed) {
      setCollapsed(false)
      setSidebarWidth(prevWidth.current)
    } else {
      prevWidth.current = sidebarWidth
      setCollapsed(true)
      setSidebarWidth(MIN_WIDTH)
    }
  }

  const pageMap: Record<Page, React.ReactNode> = {
    dashboard: <Dashboard />,
    orders: <Orders />,
    products: <Products />,
    customers: <Customers />,
    analytics: <Analytics />,
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#0a0814', userSelect: dragging ? 'none' : undefined }}>
      <div style={{ width: sidebarWidth, minWidth: sidebarWidth, flexShrink: 0, transition: dragging ? 'none' : 'width 0.2s ease' }}>
        <Sidebar
          collapsed={collapsed}
          activePage={page}
          onNavigate={setPage}
          onToggle={toggleSidebar}
          width={sidebarWidth}
        />
      </div>

      <div
        className={`resize-handle ${dragging ? 'dragging' : ''}`}
        onMouseDown={handleMouseDown}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Topbar page={page} />
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {pageMap[page]}
        </main>
      </div>
    </div>
  )
}
