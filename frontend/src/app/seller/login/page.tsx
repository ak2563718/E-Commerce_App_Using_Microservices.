import SellerLogin from '@/component/seller/SellerLogin'
import React from 'react'

function page() {
  return (
     <div className="min-h-screen flex items-center justify-center p-6 "
          style={{ background: 'linear-gradient(135deg, #fefbfc 0%, #dbd6d6 60%, #e4e4e4 100%)' }}>
            <div className='relative bottom-10'><SellerLogin /></div>
        </div>
  )
}

export default page