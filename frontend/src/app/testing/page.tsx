'use client'
import { useState } from 'react'
import axios from 'axios'
import Script from "next/script";

declare global {
  interface Window {
    Razorpay: any;
  }
}

function page() {
    const [amount, setAmount]= useState('')
    const handleClick = async () => {
     const response = await axios.post(`http://localhost:6006/createqr`,{amount}
     )
     console.log(response.data.data)
    };

  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

        <div className='flex'>
            <label>Enter amount:</label>
            <input 
            type="number" 
            value={amount}
            onChange={(e)=>setAmount(e.target.value)}
            className='border rounded-lg p-2'
            />
            <button onClick={handleClick} className='ml-2 rounded-lg bg-gray-400 px-4 py-1'>Pay-With-Upi </button>
        </div>
    </div>
  )
}

export default page