'use client'
import { useState } from 'react'
import { ShoppingBag, Tag, User, Check, Bell } from 'lucide-react'
import { NOTIFICATIONS } from './userData'

const TYPE_ICON: Record<string, typeof Bell> = {
  order: ShoppingBag,
  offer: Tag,
  account: User,
}

const TYPE_COLOR: Record<string, { bg: string; color: string }> = {
  order: { bg: '#f3e8ff', color: '#7c3aed' },
  offer: { bg: '#fce7f3', color: '#e91e8c' },
  account: { bg: '#dbeafe', color: '#2563eb' },
}

export default function Notifications() {
  const [items, setItems] = useState(NOTIFICATIONS)

  const markAll = () => setItems(n => n.map(x => ({ ...x, read: true })))
  const markOne = (id: number) => setItems(n => n.map(x => x.id === id ? { ...x, read: true } : x))

  const unread = items.filter(n => !n.read).length

  return (
    <div className="max-w-2xl flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>Notifications</h1>
          <p className="text-sm text-gray-500 mt-0.5">{unread} unread</p>
        </div>
        {unread > 0 && (
          <button
            onClick={markAll}
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-purple-50 transition-colors"
            style={{ color: '#7c3aed', border: '1px solid #e9d5ff' }}
          >
            <Check className="w-3.5 h-3.5" /> Mark all read
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {items.map(n => {
          const Icon = TYPE_ICON[n.type] ?? Bell
          const { bg, color } = TYPE_COLOR[n.type] ?? { bg: '#f3f4f6', color: '#6b7280' }
          return (
            <div
              key={n.id}
              className="rounded-2xl p-4 flex items-start gap-4 transition-all"
              style={{
                background: n.read ? '#fff' : '#faf5ff',
                border: n.read ? '1px solid #f0ebff' : '1.5px solid #ddd6fe',
                boxShadow: n.read ? 'none' : '0 2px 12px rgba(124,58,237,0.08)',
              }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: bg }}>
                <Icon className="w-4.5 h-4.5" style={{ width: 18, height: 18, color }} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-gray-800">{n.title}</p>
                  {!n.read && (
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: '#7c3aed' }} />
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{n.msg}</p>
                <p className="text-xs text-gray-400 mt-1.5">{n.time}</p>
              </div>

              {!n.read && (
                <button
                  onClick={() => markOne(n.id)}
                  className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center hover:bg-purple-100 transition-colors"
                  title="Mark as read"
                >
                  <Check className="w-3.5 h-3.5" style={{ color: '#7c3aed' }} />
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
