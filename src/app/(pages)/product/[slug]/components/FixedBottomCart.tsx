import React from 'react';

const FixedBottomCart: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50 px-4 py-2 flex items-center justify-center gap-24">
      {/* Left - Product Info */}
      <div className="flex items-center gap-4">
        <img
          src="https://www.zeroharm.in/cdn/shop/files/biotin-01.jpg?v=1718445398&width=990" // Replace with actual image path
          alt="Zeroharm Back to Teens Tablets"
          className="w-12 h-12 object-cover rounded"
        />
        <div>
          <h2 className="font-light text-lg">Zeroharm Back to Teens Tablets</h2>
          <div className="flex flex-row gap-2 items-center">

          <div className="text-sm text-gray-500 line-through">INR 3,597</div>
          <div className="text-base font-light text-green-700">INR 2,199</div>
          </div>
        </div>
      </div>

      {/* Center - Size and Quantity */}
      <div className="flex items-center gap-4">
        <div className='px-8 py-1 flex flex-col rounded  border-1'>
          <label className="block text-xs text-gray-500">Size</label>
          <div className="text-sm font-medium">180 Tablets</div>
        </div>
        <div className="flex   items-center border rounded">
          <button className="px-3 py-2 text-lg border-r font-bold">-</button>
          <span className="px-4">1</span>
          <button className="px-3 py-2 text-lg border-l font-bold">+</button>
        </div>
      </div>

      {/* Right - Add to Cart */}
      <button className="bg-green-800 text-white px-6 py-2 rounded font-light text-base hover:bg-green-700 transition">
        Add To Cart ( <span className="line-through  mr-1">INR 3,597</span> INR 2,199 )
      </button>
    </div>
  );
};

export default FixedBottomCart;
