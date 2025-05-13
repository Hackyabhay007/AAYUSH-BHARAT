'use client';

import { FaFlask, FaHeart, FaMicrochip } from 'react-icons/fa6';
import React from 'react';

const items = [
  { icon: <FaFlask size={20} />, text: 'AYUSH' },
  { icon: <FaMicrochip size={20} />, text: 'GMP' },
  { icon: <FaFlask size={20} />, text: '100% Classical' },
  { icon: <FaHeart size={20} />, text: 'Made in India' },
];

export default function TextSlider() {
  // Duplicate items to ensure content is wider than the viewport for a smoother loop
  // Duplicating more times can sometimes help if the content is short
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden border-t border-b border-primary bg-primary py-3">
      <div className="flex animate-marquee whitespace-nowrap">
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item.text.replace(/\s+/g, '-')}-${index}`}
            className="flex flex-shrink-0 items-center gap-4 px-12 py-2 text-sm font-semibold text-dark"
          >
            <span className="text-lg text-dark-green">{item.icon}</span> 
            <span className="text-dark-green uppercase tracking-widest">{item.text}</span>
          </div>
        ))} 
      </div>
    </div>
  );
}
