import React, { useState } from "react";
import { Star } from "lucide-react";

import { ChevronDown } from "lucide-react";

export default function ProductDetails () {

  const [expanded, setExpanded] = useState(false);

const plans = [
  {
    label: "3 bottles",
    quantity: 180,
    months: 3,
    price: 2096,
    originalPrice: 3297,
    perTablet: 11.64,
    discount: "36.43%",
    tag: "Best Results",
    tagColor: "bg-green-600",
    offer: "Free Serum Worth ₹2,799/-",
  },
  {
    label: "1 bottle",
    quantity: 60,
    months: 1,
    price: 780,
    originalPrice: 1099,
    perTablet: 13.00,
    discount: "29.03%",
  },
  {
    label: "2 bottles",
    quantity: 120,
    months: 2,
    price: 1379,
    originalPrice: 2198,
    perTablet: 11.49,
    discount: "37.26%",
    tag: "Money Saver",
    tagColor: "bg-yellow-500",
  },
];
  const [selected, setSelected] = useState(0);
  const [accordionOpen, setAccordionOpen] = useState<string | null>(null);

  return (
    <>
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Rating & Title */}
      <div>
        <div className="flex items-center gap-1 text-yellow-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={16} fill="currentColor" />
          ))}
          <span className="text-sm text-gray-600 ml-2">4.6 | 1027 reviews</span>
        </div>
        <h2 className="text-2xl text-dark-green font-medium mt-2">Biotin 30 MCG Tablets For Hair, Skin & Nails</h2>
      </div>

      {/* Icons Section */}
      {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        {["Ingredients", "Why choose us", "How it works", "How to use"].map((label, i) => (
          <div key={i} className="flex flex-col items-center">
            <img
              src={`/icons/icon${i + 1}.png`} // replace with actual icons
              alt={label}
              className="w-16 h-16 rounded-full border"
            />
            <p className="text-sm mt-1">{label}</p>
          </div>
        ))}
      </div> */}

      {/* Benefit Tags */}
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
        {[
          "Nourishes Nails",
          "Reduces Hair-Fall",
          "Nourishes Skin",
          "Nourishes Hair For Growth",
        ].map((text, i) => (
          <div
            key={i}
            className="bg-gray-100 rounded-lg px-4 py-2 text-base font-medium text-left"
          >
            {text}
          </div>
        ))}
      </div>

      {/* Description with Read More */}
      <div className="text-sm text-gray-700">
        {expanded ? (
          <>
           Biotin 30mcg tablets by ZeroHarm, powered by nanotechnology, are plant-based Vitamin B7 supplements derived from Sesbania Grandiflora. They promote hair growth, strengthen hair strands, and reduce hair fall while improving hair stiffness, making them one of the best biotin tablets. Additionally, they support skin health and stronger nails, ensuring overall nourishment for hair, skin, and nails.{" "}
            <button
              onClick={() => setExpanded(false)}
              className="text-green-700 underline"
            >
              Read less
            </button>
          </>
        ) : (
          <>
            Biotin 30mcg tablets by ZeroHarm, powered by nanotechnology, are plant-based Vitamin B7 supplements derived from Sesbania Grandiflora. They promote hair growth, strengthen hair strands, and reduce hair fall while improving hair stiffness, making them one of the best biotin tablets.
            <button
              onClick={() => setExpanded(true)}
              className="text-green-700 underline ml-1"
            >
              Read more
            </button>
          </>
        )}
      </div>

      {/* Consumption Instructions */}
      <div className="flex justify-center items-center gap-28 text-center gap-4 text-xs text-gray-700">
        <div>
          <img src="https://www.zeroharm.in/cdn/shop/files/TWICE_A_DAY-01_07dfc5bd-82ea-4eee-8304-136e82a79cb0_300x.png?v=1705991459" alt="Twice a Day" className="mx-auto h-16" />
          <p className="mt-1">Twice a Day</p>
        </div>
        <div>
          <img src="https://www.zeroharm.in/cdn/shop/files/before-meal_-01_300x.png?v=1702906666" alt="30 min Before/After" className="mx-auto h-16" />
          <p className="mt-1">30 min Before/After<br />Breakfast & Dinner</p>
        </div>
        <div>
          <img src="https://www.zeroharm.in/cdn/shop/files/consume_icons-01_1_300x.png?v=1705992080" alt="3 Months" className="mx-auto h-16" />
          <p className="mt-1">3 Months For Better<br />Results</p>
        </div>
      </div>
    </div>

      <div className="p-4 space-y-6 max-w-xl mx-auto">

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {plans.map((plan, index) => (
          <div
            key={index}
            onClick={() => setSelected(index)}
            className={`relative border rounded-xl p-4 cursor-pointer transition-all ${
              selected === index ? "border-green-600 shadow-md" : "border-gray-300"
            }`}
          >
            {/* Offer Tag */}
            {plan.offer && (
              <div className="absolute -top-3 -left-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded">
                {plan.offer}
              </div>
            )}
            <p className="font-semibold">{plan.label}</p>
            <p className="text-sm text-gray-500">{plan.months} months</p>
            <p className="text-red-600 text-sm font-semibold mt-1">-{plan.discount} off</p>
            <p className="text-lg font-bold mt-2">₹{plan.price}</p>
            <p className="text-xs text-gray-500 line-through">₹{plan.originalPrice}</p>
            <p className="text-sm text-gray-600 mt-1">₹{plan.perTablet} / tablet</p>

            {/* Badge */}
            {plan.tag && (
              <div className={`mt-3 text-white text-xs px-2 py-1 rounded ${plan.tagColor}`}>
                {plan.tag}
              </div>
            )}

            {/* Checkmark */}
            {selected === index && (
              <div className="absolute top-2 right-2 w-4 h-4 bg-green-600 rounded-full border-2 border-white" />
            )}
          </div>
        ))}
      </div>

      {/* Offer Banner */}
      <div className="rounded-lg overflow-hidden">
        <img src="https://cdn.shopify.com/s/files/1/0606/9298/8070/files/Nuessential_Shop_now_banner_27_02_24-01_1.jpg?v=1709722217" alt="Promo Banner" className="w-full" />
      </div>

      {/* Delivery Estimate */}
      <div className="flex justify-center items-center gap-2 border border-gray-300 rounded-lg p-3 text-center text-sm">
        <img src="https://cdn.shopify.com/s/files/1/0606/9298/8070/files/46-truck_100x.gif" className="h-8"  alt="" /> Delivery between <strong>15th - 17th May</strong> | Order within{" "}
        <span className="text-green-600 font-medium">3hr 50 mins</span>.
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="w-full border border-green-700 text-green-700 py-3 rounded-full font-semibold">
          Add To Cart
        </button>
        <button className="w-full bg-green-800 text-white py-3 rounded-full font-semibold">
          Buy It Now
        </button>
      </div>

      {/* Trust Icons */}
      <div className="flex justify-between text-center text-xs text-gray-700 mt-4">
        {[
          { label: "Customer Support", icon: "https://cdn.shopify.com/s/files/1/0606/9298/8070/files/1_0a0cef1f-1c8e-4a1d-a736-92af3849ef04.png", sub: "10am–7pm" },
          { label: "90 Day Satisfaction", icon: "https://cdn.shopify.com/s/files/1/0606/9298/8070/files/3_4fd354de-ab52-43b3-8735-ae1954a03e5d.png?v=1742891730", sub: "Guarantee" },
          { label: "Backed by", icon: "https://cdn.shopify.com/s/files/1/0606/9298/8070/files/2_296817ec-91d1-449f-ac40-e889fa839578.png", sub: "Nano-Technology" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col gap-3 items-center">
            <img src={item.icon} alt={item.label} className="h-16 mb-1" />
            <p>{item.label}</p>
            <span>{item.sub}</span>
          </div>
        ))}
      </div>

      {/* Accordions */}
      {["Ingredients", "Nutrients"].map((title, i) => (
        <div key={i} className="border-b">
          <button
            onClick={() => setAccordionOpen(accordionOpen === title ? null : title)}
            className="w-full flex justify-between items-center py-3 text-left font-medium"
          >
            {title}
            <ChevronDown
              className={`transform transition-transform ${
                accordionOpen === title ? "rotate-180" : ""
              }`}
            />
          </button>
          {accordionOpen === title && (
            <div className="text-sm text-gray-600 pb-4">
              {/* Replace with actual content */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
            </div>
          )}
        </div>
      ))}
    </div>
    </>
  );
};


