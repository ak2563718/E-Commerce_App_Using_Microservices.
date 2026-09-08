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
  try {
    const response = await axios.post(
      "https://change-thong-circular.ngrok-free.dev/testing",
      {
        amount: 200
      },
      {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      }
    );

    console.log("Backend:", response.data);

    const razorpayOrder = response.data.data;

    console.log("Order ID:", razorpayOrder.id);
    console.log("Amount:", razorpayOrder.amount);
    console.log("Currency:", razorpayOrder.currency);

    // Check SDK
    console.log("Razorpay:", window.Razorpay);
    console.log("Type:", typeof window.Razorpay);

    const options = {
      key: "rzp_test_TZOAr60rkcwSwY",

      amount: razorpayOrder.amount,

      currency: razorpayOrder.currency,

      order_id: razorpayOrder.id,

      name: "My E-Commerce",

      description: "Test Payment",

      handler: function (paymentResponse: any) {
        console.log(
          "Payment successful:",
          paymentResponse
        );
      },

      prefill: {
        name: "Akash Kumar",
        email: "test@example.com"
      }
    };

    console.log("Razorpay options:", options);

    const rzp = new window.Razorpay(options);

    rzp.on(
      "payment.failed",
      function (response: any) {
        console.log(
          "Payment failed:",
          response
        );
      }
    );

    rzp.open();

  } catch (error) {
    console.error(
      "Payment initialization error:",
      error
    );
  }
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
            <button onClick={handleClick} className='ml-2 rounded-lg bg-gray-400 px-4 py-1'>Pay</button>
        </div>
    </div>
  )
}

export default page