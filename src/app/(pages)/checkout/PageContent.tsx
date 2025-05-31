"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function PageContent() {
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [currenctProduct,setCurrenctProduct]=useState<{name:string,thumbnail:string,category:string,quatity:number} | null>(null)
  useEffect(() => {
    const data = localStorage.getItem('customer_data');
    if (data) {
       
      try {
        setUser(JSON.parse(data).user);

      } catch {
        setUser(null);
      }
    }

    const productData=localStorage.getItem('buyNowData');
    console.log(productData);
    
    if(productData){
      try{
        setCurrenctProduct(JSON.parse(productData).product);
      }
      catch{
        setCurrenctProduct(null);
      }
    }
  }, []);

  return (
    <div className="min-h-screen pt-24 bg-beige py-10 px-4 md:px-20">
      <h1 className="text-2xl lg:text-4xl font-medium uppercase tracking-wide text-center mb-10">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Contact Info */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-lg lg:text-xl  font-medium uppercase mb-2">Contact Information</h2>
            <p>Email: {user?.email || <span className="text-gray-400">Not available</span>}</p>
            <p>Name: {user?.name || <span className="text-gray-400">Not available</span>}</p>
          </div>

          {/* Delivery Address */}
          <div className="bg-white rounded-xl p-6 shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg uppercase font-medium">
                <span className="mr-2 bg-dark-green text-white px-4 py-2 rounded-full text-xl">2</span>
                Shipping Address
              </h2>
              <button className="bg-dark-green hover:bg-dark text-white px-4 py-2 rounded text-sm lg:text-base">
                Add New Address
              </button>
            </div>

            {/* Selected Address */}
            <div className="border border-dark-green bg-beige p-4 rounded-xl mb-3">
              <p className="font-medium">Kartik Bhatnagar</p>
              <p>9898989899</p>
              <p>Section 18, KP-3</p>
              <p>Bangalore, Karnataka - 201310</p>
              <div className="flex justify-end">
                <span className="text-white bg-dark-green text-xs px-2 py-1 rounded">Default</span>
              </div>
            </div>

            <button className="text-dark-green font-medium text-sm">+ Add New Address</button>
          </div>

          {/* Coupon */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-lg font-medium uppercase mb-2">Coupon</h2>
            <div className="flex">
              <input
                type="text"
                placeholder="Enter coupon code"
                className="flex-grow border border-dark-green rounded-l px-4 py-2 focus:outline-none"
              />
              <button className="bg-dark-green text-white px-4 py-2 rounded-r text-sm">
                Apply
              </button>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-lg font-medium uppercase mb-4">
              <span className="mr-2 bg-dark-green text-white px-2 py-1 rounded-full text-sm">3</span>
              Payment Method
            </h2>
            <div className="mb-4">
              <label className="flex items-center space-x-2">
                <input type="radio" checked readOnly />
                <span>Online Payment</span>
              </label>
            </div>
            <button className="bg-dark-green hover:bg-dark text-white w-full py-3 rounded-lg text-lg font-medium">
              Proceed to Pay ₹107
            </button>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="bg-white rounded-xl p-6 shadow h-fit">
          <h2 className="lg:text-xl text-lg font-medium uppercase  mb-4">Order Summary</h2>
          <div className="flex items-center gap-4 mb-4">
            <Image
              src="https://www.zeroharm.in/cdn/shop/files/biotin-01.jpg?v=1718445398&width=990"
              alt="Biotin 30 MCG Tablets For Hair, Skin & Nails"
              width={500}
              height={500}
              className="w-16 h-16 rounded"
            />
            <div>
              <p className="font-medium">{currenctProduct?.name}</p>
              <p className="text-sm text-gray-500">{currenctProduct?.category}</p>
              <p className="text-dark-green text-sm">{currenctProduct?.quatity}</p>
            </div>
            <span className="ml-auto text-gray-400">x1</span>
          </div>

          <div className="border-t pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹60</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Charges</span>
              <span>₹47</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹107</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
