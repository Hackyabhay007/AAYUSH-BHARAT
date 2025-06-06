"use client";

import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import toast from 'react-hot-toast';
import { Product, Variants } from "@/types/product";
import { CheckCircle } from 'lucide-react';
import getFilePreview from "@/lib/getFilePreview";
import { useState, useEffect } from 'react';
import { addToCart } from '@/store/slice/cartSlice';
import Image from 'next/image';

const ProductCard: React.FC<{ product: Product; onShowNowLoading?: (loading: boolean) => void }> = ({ product }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [addedToCart, setAddedToCart] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<Variants | null>(null);

  useEffect(() => {
    if (product.variants && product.variants.length > 0) {
      const availableVariant = product.variants.find(v => v.stock > 0) || product.variants[0];
      setSelectedVariant(availableVariant);
    }
  }, [product]);

  const handleShopNow = () => {
    router.push(`/product/${product.slug}`);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!selectedVariant) {
      toast.error('Please select a variant');
      return;
    }

    if (isAddingToCart || selectedVariant.stock <= 0) {
      return;
    }
    
    setIsAddingToCart(true);
    
    try {
      const weight = {
        id: selectedVariant.$id || `weight_${selectedVariant.weight}`,
        documentId: selectedVariant.$id || `weight_${selectedVariant.weight}`,
        weight_Value: selectedVariant.weight,
        original_Price: selectedVariant.price,
        sale_Price: selectedVariant.sale_price
      };

      await dispatch(addToCart({
        product: {
          ...product,
          weights: [weight]
        },
        weightIndex: 0,
        quantity: 1
      })).unwrap();
      
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
      toast.success('Added to cart');
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error('Failed to add to cart');
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 w-[320px] cursor-pointer">
      {/* Product Image Section - 60% */}
      <div 
        className="relative w-full h-[200px]"
        onClick={handleShopNow}
      >
        <Image
          src={selectedVariant?.image ? getFilePreview(selectedVariant.image) : '/images/placeholder.jpg'}
          alt={product.name}
          fill
          className="object-cover transform transition-transform duration-500 hover:scale-110"
        />
        {addedToCart && (
          <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
            <CheckCircle className="h-5 w-5" />
          </div>
        )}
      </div>

      {/* Product Info Section - 40% */}
      <div className="p-3 text-left px-4">
        <h3 className="text-lg font-medium text-dark-green line-clamp-1 mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm line-clamp-2 h-10 mb-2">{product.description}</p>

        {/* Price Display */}
        {selectedVariant && (
          <div className="flex items-center justify-start gap-2 mb-3">
            <span className="text-lg font-semibold text-dark-green">
              <span className="text-sm font-normal">₹</span>{selectedVariant.sale_price}
            </span>
            {selectedVariant.sale_price < selectedVariant.price && (
              <span className="text-sm text-gray-500 line-through">
                <span className="text-sm">₹</span>{selectedVariant.price}
              </span>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2 pt-0  ">
          <button
            onClick={handleShopNow}
            className="flex-1 bg-dark-green pointer-cursor text-white py-1.5 px-3 rounded font-medium text-sm hover:bg-dark-green/10 hover:text-dark-green transition-colors"
          >
            Shop Now
          </button>
          {selectedVariant && selectedVariant.stock > 0 && (
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="flex-1 pointer-cursor bg-dark-green/10 text-dark-green py-1.5 px-3 rounded font-medium text-sm hover:bg-dark-green/90 hover:text-white transition-colors disabled:opacity-50"
            >
              Add to Cart
            </button>
          )}
        </div>

        {/* Stock Status */}
        {selectedVariant && selectedVariant.stock <= 0 && (
          <p className="text-red-500 text-xs text-center">Out of Stock</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
