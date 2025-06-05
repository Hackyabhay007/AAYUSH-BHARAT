import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slice/cartSlice';
import { AppDispatch } from '@/store/store';
import toast from 'react-hot-toast';
import getFilePreview from '@/lib/getFilePreview';

interface FixedBottomCartProps {
  productId?: string;
  productName: string;
  price: number;
  productImage?: string;
  productDescription?: string;
  productCategory?: string;
  productSalePrice?: number;
  productIngredients?: string;
  product?: any; // Replace with proper Product type
  selectedVariantIndex?: number;
}

const FixedBottomCart = ({ 
  productName, 
  price, 
  productImage,
  productDescription,
  productCategory,
  productSalePrice,
  productIngredients,
  product,
  selectedVariantIndex = 0
}: FixedBottomCartProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [quantity, setQuantity] = React.useState(1);

  const handleAddToCart = async () => {
    try {
      await dispatch(addToCart({
        product,
        weightIndex: selectedVariantIndex,
        quantity
      }));
      toast.success('Added to cart');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50 px-4 py-2 flex lg:flex-row flex-col items-center justify-center gap-4 lg:gap-24">
      {/* Left - Product Info */}
      <div className="flex items-center gap-4">        <Image
          width={500} height={500}  
          src={productImage ? getFilePreview(productImage) : '/placeholder.jpg'}
          alt={productName}
          className="w-12 h-12 object-cover rounded lg:block hidden" 
        />
        <div className='lg:block hidden'>
          <h2 className="font-light text-sm lg:text-lg ">{productName}</h2>
          <div className="flex flex-row gap-2 items-center">
            <div className="text-base font-light text-green-700">₹{price}</div>
          </div>
        </div>
      </div>

      {/* Center - Size and Quantity */}
      <div className="flex items-center gap-4 w-full md:w-auto justify-center">
        <div className="px-4 py-1 flex flex-col rounded border border-gray-200 bg-gray-50">
          <label className="block text-xs text-gray-500">Size</label>
          <div className="text-sm font-medium">{product?.weights?.[selectedVariantIndex]?.weight_Value}g</div>
        </div>
        <div className="flex items-center border border-gray-200 rounded bg-gray-50">
          <button 
            onClick={() => quantity > 1 && setQuantity(q => q - 1)}
            className="px-3 py-2 text-lg font-bold text-gray-600 hover:bg-gray-200 transition"
          >
            -
          </button>
          <span className="px-4 text-base">{quantity}</span>
          <button 
            onClick={() => setQuantity(q => q + 1)}
            className="px-3 py-2 text-lg font-bold text-gray-600 hover:bg-gray-200 transition"
          >
            +
          </button>
        </div>
      </div>

      {/* Right - Add to Cart */}
      <button 
        onClick={handleAddToCart}
        className="bg-green-800 text-white px-6 py-2 rounded font-light text-base hover:bg-green-700 transition"
      >
        Add To Cart ( ₹{price * quantity} )
      </button>
    </div>
  );
};

export default FixedBottomCart;
