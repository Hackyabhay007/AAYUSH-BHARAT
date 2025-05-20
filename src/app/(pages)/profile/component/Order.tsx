import Link from "next/link";
import React from "react";

export default function Order() {
  return (
    <div className="w-full flex justify-center items-center min-h-[300px] px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md py-10 px-6 text-center">
        <h2 className="text-xl uppercase lg:text-2xl md:text-2xl font-semibold text-dark-green mb-2">
          No orders found
        </h2>
        <p className="text-gray-500 lg:text-lg mb-6">
          Start shopping to create your first order!
        </p>
        <button className="bg-dark-green text-white px-5 py-2 rounded-md hover:bg-dark transition">
          <Link href={'/product/12'}>
          Browse Products
          </Link>
        </button>
      </div>
    </div>
  );
}
