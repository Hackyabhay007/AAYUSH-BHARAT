import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slice/cartSlice';
import { AppDispatch } from '@/store/store';
import toast from 'react-hot-toast';
import getFilePreview from '@/lib/getFilePreview';
import { Product, Variants } from '@/types/product';

interface FixedBottomCartProps {
  productId?: string;
  productName: string;
  productDescription?: string;
  productCategory?: string;
  productIngredients?: string;
  product: Product;
  selectedVariant?: Variants | null;
  selectedVariantIndex?: number;
}

const FixedBottomCart = ({ 
  productName, 

  product,
  selectedVariant,
  selectedVariantIndex = 0
}: FixedBottomCartProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [quantity, setQuantity] = React.useState(1);
  const handleAddToCart = async () => {    try {      // Convert variants to weights format, ensuring no undefined values
      const weights = (product.variants || []).map(variant => ({
        id: variant.$id || 0, // Allow id to be number or string
        documentId: variant.$id || '0',
        weight_Value: variant.weight,
        original_Price: variant.price,
        sale_Price: variant.sale_price,
      }));

      // If no weights, provide a default weight from the selected variant
      if (weights.length === 0 && selectedVariant) {
        weights.push({
          id: selectedVariant.$id || 0, // Allow id to be number or string
          documentId: selectedVariant.$id || '0',
          weight_Value: selectedVariant.weight,
          original_Price: selectedVariant.price,
          sale_Price: selectedVariant.sale_price,
        });
      }      // Create product with weights
      // Cast product to include the weights property
      const productWithWeights = {
        ...product,
        weights,
      } as Product & { 
        weights: Array<{ 
          id: string | number, 
          documentId: string,
          weight_Value: number,
          original_Price: number,
          sale_Price: number
        }> 
      };

      await dispatch(addToCart({
        product: productWithWeights,
        weightIndex: selectedVariantIndex,
        quantity
      }));
      toast.success('Added to cart');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };return (
  <div className="bg-green-100 shadow-lg border-t border-greenn-500 px-4 py-2 flex lg:flex-row flex-col items-center justify-center gap-4 lg:gap-10">
      {/* Left - Product Info */}      <div className="flex items-center gap-4">        <Image
          width={500} height={500}  
          src={selectedVariant?.image ? getFilePreview(selectedVariant.image) : '/placeholder.jpg'}
          alt={productName}
          className="w-12 h-12 object-cover rounded lg:block hidden" 
        />
        <div className='lg:block hidden'>
          <h2 className="font-light text-sm lg:text-lg ">{productName}</h2>
          <div className="flex flex-row gap-2 items-center">
            <div className="text-base font-light text-green-700">
              ₹{selectedVariant?.price || 0}
            </div>
          </div>
        </div>
      </div>      {/* Center - Size and Quantity */}
      <div className="flex items-center gap-6 w-full md:w-auto justify-between">
        <div className="px-4 py-1 flex flex-col rounded border border-gray-200 bg-gray-50">
          <label className="block text-xs text-gray-500">Size</label>
          <div className="text-sm font-medium">{selectedVariant?.weight || 0}g</div>
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

      {/* Right - Add to Cart */}      <button 
        onClick={handleAddToCart}
        className="bg-green-800 text-white px-6 cursor-pointer border py-2 rounded  text-base uppercase hover:bg-white hover:text-green-900 hover:border-black transition"
      >
        Add To Cart ( ₹{(selectedVariant?.price || 0) * quantity} )
      </button>
    </div>
  );
};

export default FixedBottomCart;
