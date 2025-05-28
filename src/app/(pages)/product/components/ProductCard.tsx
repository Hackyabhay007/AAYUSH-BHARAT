import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import getFilePreview from "@/lib/getFilePreview";
import { Product } from "@/types/product";
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  console.log(getFilePreview(product.image));
  
  return (

   <div className="bg-light text-center rounded-lg p-4 shadow-2xl transform transition-all duration-700 ease-in-out group w-74">
              <div className="overflow-hidden rounded-md">
                <Image
                  width={500}
                  height={500}
                  src={getFilePreview(product.image)}
                  alt={product.name || 'Product Image'}
                  className="w-full h-48 object-cover rounded-md mb-4 transform transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="text-yellow-500 text-sm flex justify-center items-center space-x-1">
                <span className="flex">  {Array.from({ length: product.rating }).map((_, i) => (
            <Star key={i} size={16} fill="currentColor" />
          ))}</span>
                <span className="text-gray-600 text-xs">(1027)</span>
              </div>

              <h3 className="text-base uppercase font-light">{product.name}</h3>

              <div className="text-sm my-3">
                <span className="line-through text-dark mr-2">Rs. {product.price*15}</span>
                <span className="font-bold text-dark-green mr-2">Rs. {product.price}</span>
                <span className="text-red-600 font-bold">| Rs. {product.price*15 - product.price}</span>
              </div>

              <button className="uppercase px-8 cursor-pointer py-2 text-base rounded border font-medium border-dark text-dark  hover:text-primary hover:bg-dark-green transition-all duration-300">
                
                <Link href={`/product/${product.slug}`}>Shop Now</Link>
              </button>
            </div>




    // <div className="bg-white lg:w-120 w-90 shadow rounded-md overflow-hidden text-center">
    //   <Image height={500} width={500} src={product.image} alt={product.name} className="w-full h-90 object-cover" />
    //   <div className="p-4">
    //     <h2 className="font-semibold text-lg">{product.name}</h2>
    //     <p className="text-sm text-gray-600 mt-1">⭐ {product.rating}</p>
    //     <p className="text-red-600 font-bold mt-2">₹{product.price}</p>
    //     <div className="mt-2 flex flex-wrap justify-center gap-2">
    //       {/* {product.tags.map((tag) => ( */}
    //         <span  className="text-xs bg-orange-200 px-2 py-1 rounded-full">
    //           {product.tags}
    //         </span>
    //       {/* ))} */}
    //     </div>
    //   </div>
    // </div>
  );
};

export default ProductCard;
