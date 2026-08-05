'use client'
import { useEffect, useState, type CSSProperties } from 'react'

function Shimmer({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <div
      className={`relative overflow-hidden bg-gray-200 ${className ?? ''}`}
      style={{ borderRadius: 'inherit', ...style }}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
  )
}

function NavbarSkeleton() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center gap-4">
        {/* Logo + shop name */}
        <div className="flex items-center gap-2 shrink-0">
          <Shimmer className="w-9 h-9 rounded-lg" />
          <Shimmer className="w-28 h-5 rounded-md" />
        </div>

        {/* Search bar */}
        <div className="flex-1 flex items-center gap-0 max-w-2xl mx-auto">
          <Shimmer className="h-10 flex-1 rounded-l-full" />
          <Shimmer className="h-10 w-12 rounded-r-full" />
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-3 shrink-0">
          <Shimmer className="w-24 h-9 rounded-full" />
          <Shimmer className="w-20 h-9 rounded-md" />
          <Shimmer className="w-9 h-9 rounded-full" />
          <div className="relative">
            <Shimmer className="w-9 h-9 rounded-full" />
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gray-300" />
          </div>
        </div>
      </div>
    </header>
  )
}

function SubNavSkeleton() {
  return (
    <nav className="bg-gray-50 border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 h-11 flex items-center gap-6 overflow-hidden">
        {Array.from({ length: 9 }).map((_, i) => (
          <Shimmer key={i} className="h-4 rounded-md shrink-0" style={{ width: `${52 + (i % 3) * 18}px` }} />
        ))}
      </div>
    </nav>
  )
}

function AdBannerSkeleton() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 mt-5">
      <Shimmer className="w-full h-48 rounded-2xl md:h-64" />
    </div>
  )
}

function CategoryGridSkeleton() {
  return (
    <section className="max-w-[1440px] mx-auto px-4 mt-8">
      <Shimmer className="w-40 h-6 rounded-md mb-5" />
      <div className="grid grid-cols-4 gap-4 sm:grid-cols-4 md:grid-cols-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <Shimmer className="w-16 h-16 rounded-2xl" />
            <Shimmer className="w-14 h-3 rounded-md" />
          </div>
        ))}
      </div>
    </section>
  )
}

function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 flex flex-col gap-3 border border-gray-100">
      <Shimmer className="w-full aspect-square rounded-xl" />
      <Shimmer className="w-3/4 h-4 rounded-md" />
      <Shimmer className="w-1/2 h-3 rounded-md" />
      <div className="flex items-center justify-between mt-1">
        <Shimmer className="w-20 h-5 rounded-md" />
        <Shimmer className="w-16 h-3 rounded-md" />
      </div>
      <div className="flex items-center gap-1 mt-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Shimmer key={i} className="w-3 h-3 rounded-sm" />
        ))}
        <Shimmer className="w-8 h-3 rounded-md ml-1" />
      </div>
      <Shimmer className="w-full h-9 rounded-xl mt-1" />
    </div>
  )
}

function ProductsSkeleton() {
  return (
    <section className="max-w-[1440px] mx-auto px-4 mt-10 pb-16">
      <div className="flex items-center justify-between mb-5">
        <Shimmer className="w-44 h-6 rounded-md" />
        <Shimmer className="w-20 h-4 rounded-md" />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 15 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </section>
  )
}

export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(200%); }
        }
      `}</style>
        <>
          <NavbarSkeleton />
          <SubNavSkeleton />
          <AdBannerSkeleton />
          <CategoryGridSkeleton />
          <ProductsSkeleton />
        </>
    </div>
  )
}
