import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import { Star } from "lucide-react";
import getFilePreview from "@/lib/getFilePreview";
import { Product } from "@/types/product";

const ProductCard: React.FC<{ product: Product; onShowNowLoading?: (loading: boolean) => void }> = ({ product, onShowNowLoading }) => {
  const router = useRouter();

  const handleShopNow = async () => {
    onShowNowLoading?.(true);
    router.push(`/product/${product.slug}`);
    // No need to set loading to false, as navigation will unmount the page
  };

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

      {/* <div className="text-yellow-500 text-sm flex justify-center items-center space-x-1">
        <span className="flex">
          {Array.from({ length: product.rating }).map((_, i) => (
            <Star key={i} size={16} fill="currentColor" />
          ))}
        </span>
        <span className="text-gray-600 text-xs">(1027)</span>
      </div> */}

      <h3 className="text-base uppercase font-light">{product.name}</h3>

      <div className="text-sm my-3">
        <span className="line-through text-dark mr-2">Rs. {product.price}</span>
         
        <span className="font-bold text-dark-green mr-2">Rs. {product.sale_price || ''}</span>
        {product.sale_price && ( 
              <span className="text-red-600 font-bold">| Rs. {product.price - product.sale_price} OFF</span>
        
  )}
      </div>

      <div className="flex  gap-2 justify-center">
        <button
          className="uppercase px-4 cursor-pointer py-2 text-xs rounded border font-medium border-dark text-dark hover:text-primary hover:bg-dark-green transition-all duration-300 disabled:opacity-60"
          onClick={handleShopNow}
        >
         Show Now
        </button>
        <button
          className="uppercase px-4 cursor-pointer py-2 text-xs rounded border font-medium border-dark text-dark hover:text-primary hover:bg-dark-green transition-all duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
