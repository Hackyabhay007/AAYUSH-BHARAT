"use client";

import Image from "next/image";

const products = [
  {
    name: "Holistic Ashwagandha Tablets",
    rating: 4.5,
    reviews: 1621,
    originalPrice: 575,
    discountedPrice: 499,
    discount: 13,
    save: 76,
    image: "/products/ashwagandha.png",
  },
  {
    name: "Holistic Calcium Tablets With Vitamin D3 & K2-7",
    rating: 5,
    reviews: 1090,
    originalPrice: 1980,
    discountedPrice: 673,
    discount: 66,
    save: 1307,
    image: "/products/calcium.png",
  },
  {
    name: "Probiotic Multivitamin All in One Capsules",
    rating: 4.5,
    reviews: 511,
    originalPrice: 999,
    discountedPrice: 748,
    discount: 25,
    save: 251,
    image: "/products/multivitamin.png",
  },
  {
    name: "Holistic Curcumin Tablets With 95% Curcuminoids...",
    rating: 4.5,
    reviews: 992,
    originalPrice: 1450,
    discountedPrice: 769,
    discount: 47,
    save: 681,
    image: "/products/curcumin.png",
  },
];

function renderStars(rating: number) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  return (
    <div className="text-yellow-500 flex items-center">
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <span key={i}>★</span>
        ))}
      {halfStar && <span>½</span>}
    </div>
  );
}

export default function ProductCardSection() {
  return (
    <section className="py-12 px-4 md:px-16 bg-white">
      <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-8">
        Faster results with
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative bg-gray-100">
              <span className="absolute top-2 left-2 bg-green-700 text-white text-xs px-2 py-1 rounded">
                -{product.discount}%
              </span>
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-60 object-contain"
              />
            </div>
            <div className="p-4 text-center">
              {renderStars(product.rating)}
              <p className="text-sm text-gray-600 mb-2">({product.reviews})</p>
              <p className="font-semibold text-gray-800 mb-1">{product.name}</p>
              <div className="text-sm mb-3">
                <span className="line-through text-gray-500 mr-1">
                  ₹{product.originalPrice}
                </span>
                <span className="text-black font-semibold">₹{product.discountedPrice}</span>
                <span className="text-red-600 font-bold ml-2">| Save ₹{product.save}</span>
              </div>
              <button className="w-full bg-green-900 hover:bg-green-800 text-white py-2 rounded-lg text-sm font-medium transition">
                View product
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
