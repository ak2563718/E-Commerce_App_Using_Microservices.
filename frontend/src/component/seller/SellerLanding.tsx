'use client'
import { useAppSelector } from '@/redux/hooks'
import { Store, TrendingUp, Package, Star, Shield, Zap, Users, ArrowRight, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const FEATURES = [
  {
    icon: TrendingUp,
    title: 'Grow Your Revenue',
    desc: 'Reach millions of active buyers across India. Our seller tools help you scale fast with real-time analytics.',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    desc: 'Get paid on time, every time. Our escrow system and fraud protection keep your earnings safe.',
  },
  {
    icon: Zap,
    title: 'Easy Onboarding',
    desc: 'List your first product in under 10 minutes. No tech skills needed — our dashboard is built for everyone.',
  },
  {
    icon: Package,
    title: 'Smart Inventory',
    desc: 'Manage stock, variants, and fulfillment from a single place. Never oversell or miss an order again.',
  },
  {
    icon: Users,
    title: 'Dedicated Support',
    desc: '24/7 seller support via chat, call, or email. Our team is always ready to help you succeed.',
  },
  {
    icon: Star,
    title: 'Top Seller Badges',
    desc: 'Earn trust badges and featured placements as you grow. High-rated sellers get promoted automatically.',
  },
]

const STATS = [
  { value: '2M+', label: 'Active Buyers' },
  { value: '500K+', label: 'Products Listed' },
  { value: '98%', label: 'On-time Payouts' },
  { value: '4.8★', label: 'Seller Rating' },
]


export default function SellerLanding() {
  const router = useRouter()
  const { user } = useAppSelector((state)=>state.auth)
  console.log(user)
  if(user.role === 'SELLER'){
    return router.replace('/seller/dashboard')
  }
  return (
    <div className="min-h-screen w-full" style={{ background: '#faf5ff', fontFamily: 'DM Sans, sans-serif' }}>
    
      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center text-center px-6 pt-20 pb-16 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute rounded-full pointer-events-none" style={{ width: 600, height: 600, background: 'radial-gradient(circle, rgba(168,85,247,0.12), transparent)', top: -200, left: '50%', transform: 'translateX(-50%)' }} />
        <div className="absolute rounded-full pointer-events-none" style={{ width: 300, height: 300, background: 'radial-gradient(circle, rgba(233,30,140,0.08), transparent)', bottom: -60, right: '10%' }} />
        <h1
          className="text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-5 max-w-3xl relative"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          Sell smarter on{' '}
          <span
            className="relative inline-block"
            style={{ color: '#7c3aed' }}
          >
            ShopHub
          </span>
        </h1>

        <p className="text-lg text-gray-500 max-w-xl mb-9 leading-relaxed relative">
          India's fastest-growing e-commerce platform. List products, manage orders,
          and get paid — all from one beautiful dashboard.
        </p>

        <div className="flex items-center gap-4 relative">
          <button
            onClick={()=>router.replace('/seller/signup')}
            className="px-8 py-3.5 rounded-2xl text-white font-bold text-base flex items-center gap-2 transition-all active:scale-[0.97]"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              boxShadow: '0 8px 24px rgba(124,58,237,0.35)',
            }}
          >
            Start Selling Free <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={()=>router.replace('/seller/login')}
            className="px-8 py-3.5 rounded-2xl font-bold text-base transition-all hover:bg-white"
            style={{ color: '#7c3aed', border: '1.5px solid #ddd6fe' }}
          >
            Sign In
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-4 relative">No credit card required · Free forever plan available</p>
      </section>

     

      {/* ── Features ────────────────────────────────────────────────────────── */}
      <section className="px-8 py-14 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-gray-900 mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Everything you need to succeed
          </h2>
          <p className="text-gray-500 text-base max-w-lg mx-auto">
            Powerful tools built for sellers of every size — from first-timers to enterprise brands.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl p-6 flex flex-col gap-4 group transition-all hover:-translate-y-0.5"
              style={{
                background: '#fff',
                border: '1px solid #f3e8ff',
                boxShadow: '0 2px 12px rgba(124,58,237,0.06)',
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #f3e8ff, #ede9fe)' }}
              >
                <Icon className="w-5 h-5" style={{ color: '#7c3aed' }} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1.5" style={{ fontFamily: 'Outfit, sans-serif' }}>{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ── CTA banner ──────────────────────────────────────────────────────── */}
      <section className="px-8 py-16 flex flex-col items-center text-center">
        <h2 className="text-3xl font-black text-gray-900 mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Ready to start selling?
        </h2>
        <div className="flex items-center gap-4">
          <button
            onClick={()=>router.replace('/seller/signup')}
            className="px-8 py-3.5 rounded-2xl text-white font-bold text-base flex items-center gap-2 transition-all active:scale-[0.97]"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              boxShadow: '0 8px 24px rgba(124,58,237,0.3)',
            }}
          >
            Create Free Account <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={()=>router.replace('/seller/login')}
            className="text-sm font-semibold hover:opacity-70 transition-opacity"
            style={{ color: '#7c3aed' }}
          >
            Already have an account? Sign in
          </button>
        </div>
      </section>
    </div>
  )
}
