import Signup from '@/component/auth/Signup'
import React from 'react'

function page() {
  return (
   <div  className="min-h-screen flex items-center justify-center p-6"
         style={{ background: 'linear-gradient(135deg, #fce4ec 0%, #fdf2f6 60%, #fff8fa 100%)' }}>
           <Signup/>
       </div>
  )
}

export default page