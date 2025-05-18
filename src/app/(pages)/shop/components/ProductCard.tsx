import React from "react";
import { Product } from "@/lib/product";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="bg-white w-120 shadow rounded-md overflow-hidden text-center">
      <img src={product.image} alt={product.name} className="w-full h-60 object-cover" />
      <div className="p-4">
        <h2 className="font-semibold text-lg">{product.name}</h2>
        <p className="text-sm text-gray-600 mt-1">⭐ {product.rating}</p>
        <p className="text-red-600 font-bold mt-2">₹{product.price}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {product.tags.map((tag) => (
            <span key={tag} className="text-xs bg-orange-200 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
