import React from "react";
import { Product } from "@/appwrite/product";
import Image from "next/image";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="bg-white w-120 shadow rounded-md overflow-hidden text-center">
      <Image height={500} width={500} src={product.image} alt={product.name} className="w-full h-90 object-cover" />
      <div className="p-4">
        <h2 className="font-semibold text-lg">{product.name}</h2>
        <p className="text-sm text-gray-600 mt-1">⭐ {product.rating}</p>
        <p className="text-red-600 font-bold mt-2">₹{product.price}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {/* {product.tags.map((tag) => ( */}
            <span  className="text-xs bg-orange-200 px-2 py-1 rounded-full">
              {product.tags}
            </span>
          {/* ))} */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
