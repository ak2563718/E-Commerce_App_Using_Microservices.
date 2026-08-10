'use client'
import { authCheckSession } from '@/redux/auth/auth.Action'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Store, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

function SellNavbar() {
  const router = useRouter()
  const { user, islogin } = useAppSelector((state)=>state.auth);
  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(authCheckSession())
  },[dispatch])
  
  return (
    <div>
        <nav
        className="sticky top-0 z-50 flex items-center justify-between px-8 py-4"
        style={{
          background: 'rgba(250,245,255,0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(124,58,237,0.1)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #e91e8c, #7c3aed)' }}
          >
            <a href='/seller/information'><Store className="w-5 h-5 text-white" /></a>
          </div>
          <div>
            <span className="font-black text-gray-900 text-lg tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
              ShopHub
            </span>
            <span
              className="block text-xs font-bold tracking-widest uppercase leading-none -mt-0.5"
              style={{ color: '#7c3aed', letterSpacing: '0.15em' }}
            >
              Seller
            </span>
          </div>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-7">
          {['Features', 'Pricing', 'Support'].map(item => (
            <button
              key={item}
              className="text-sm font-medium text-gray-500 hover:text-purple-700 transition-colors"
            >
              {item}
            </button>
          ))}
        </div>

        {/* CTA buttons */}
        {user?.role !== 'SELLER' &&
        <div className="flex items-center gap-3">
          <button
            onClick={()=>router.push('/seller/login')}
            className="px-5 py-2 rounded-xl text-sm font-semibold transition-all hover:bg-purple-50"
            style={{ color: '#7c3aed', border: '1.5px solid #ddd6fe' }}
          >
            Sign In
          </button>
          <button
            onClick={()=>router.push('/seller/signup')}
            className="px-5 py-2 rounded-xl text-sm font-bold text-white flex items-center gap-1.5 transition-all active:scale-[0.97]"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              boxShadow: '0 4px 14px rgba(124,58,237,0.35)',
            }}
          >
            Create Account <ChevronRight className="w-4 h-4" />
          </button>
        </div>}
      </nav>
    </div>
  )
}

export default SellNavbar