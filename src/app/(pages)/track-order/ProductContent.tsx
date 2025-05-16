import React from 'react'
import { FaTruck } from "react-icons/fa";

function ProductContent() {
  return (
    <div className="bg-beige">

    <div className=" h-154 bg-cover bg-center flex items-center justify-center px-4 py-10">
      <div className="text-center">
        <p className="text-dark-green tracking-widest uppercase font-medium mb-1">
          Order Tracking
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
          Track Your Order
        </h1>
        <div className="w-20 h-1 bg-dark-green mx-auto mb-4"></div>
        <p className="text-dark-green text-lg mb-8">
          Enter your order ID to track your package
        </p>

        <div className="bg-white shadow-lg rounded-xl flex py-3 px-4 flex-col sm:flex-row items-center justify-center max-w-xl mx-auto  sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            placeholder="Enter your order ID"
            className="w-full sm:w-120 px-4 py-3 rounded-md border border-gray-300 bg-yellow-50 placeholder-gray-800 focus:outline-none focus:ring-2 mb-2 lg:mb-0"
          />
          <button className="flex flex-row items-center px-12 py-3 bg-dark-green  text-white rounded-md shadow transition">
            <p>Track</p> <FaTruck className="ml-2" />
          </button>
        </div>
      </div>
    </div>

  
   
</div>
  )
}

export default ProductContent