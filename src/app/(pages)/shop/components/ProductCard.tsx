"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slice/cartSlice';
import { AppDispatch } from '@/store/store';
import toast from 'react-hot-toast';
import getFilePreview from "@/lib/getFilePreview";
import { Product, Variants } from "@/types/product";
import { CheckCircle } from 'lucide-react';

const ProductCard: React.FC<{ product: Product; onShowNowLoading?: (loading: boolean) => void }> = ({ product }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [addedToCart, setAddedToCart] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [productVariants, setProductVariants] = useState<Variants[]>([]);

  // Check if product is available and process variants
  useEffect(() => {
    // Product is available if it has stock or if stock is not specified
    const hasStock = product.stock === undefined || product.stock > 0;
    setIsAvailable(hasStock);
    
    // Process and store variants
    if (product.variants && Array.isArray(product.variants) && product.variants.length > 0) {
      // Use existing variants
      setProductVariants(product.variants);
      console.log(`Product ${product.name}: Using ${product.variants.length} existing variants`);
    } else {
      // Create a default variant using product data
      const defaultVariant: Variants = {
        $id: `default_${product.$id}`,
        productId: product.$id,
        price: product.price || 0,
        weight: product.weight || 100,
        sale_price: product.sale_price || product.price || 0,
        stock: product.stock || 0,
        months: 0, // Default value
        image: product.image,
        additionalImages: product.additionalImages
      };
      
      setProductVariants([defaultVariant]);
      console.log(`Product ${product.name}: Created default variant as no variants exist`);
    }
  }, [product]);
  const handleShopNow = async () => {
    // Don't set loading state when navigating
    // onShowNowLoading?.(true);
    router.push(`/product/${product.slug}`);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log("Add to cart clicked for:", product.name);
    
    if (isAddingToCart || !isAvailable || productVariants.length === 0) {
      console.log("Cannot add to cart - isAddingToCart:", isAddingToCart, 
                  "isAvailable:", isAvailable,
                  "hasVariants:", productVariants.length > 0);
      return;
    }
    
    setIsAddingToCart(true);
    
    try {
      console.log("Product variants to use:", productVariants);
      
      // Convert variants to weights format needed by cart
      const weights = productVariants.map(variant => ({
        id: variant.$id || `weight_${variant.weight}`,
        documentId: variant.$id || `weight_${variant.weight}`,
        weight_Value: variant.weight,
        original_Price: variant.price,
        sale_Price: variant.sale_price
      }));

      console.log("Mapped weights:", weights);
      
      // Select the first variant by default
      const result = await dispatch(addToCart({
        product: {
          ...product,
          weights
        },
        weightIndex: 0, // Use the first variant/weight
        quantity: 1
      })).unwrap();
      
      console.log("Cart updated:", result);
      
      // Show added to cart indicator
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
    <div className="bg-light text-center rounded-lg p-4 shadow-2xl transform transition-all duration-700 ease-in-out group w-74 relative">
      {/* Added to cart indicator */}
      {addedToCart && (
        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md z-10 flex items-center">
          <CheckCircle size={16} className="mr-1" />
          Added!
        </div>
      )}
      
      {/* Product image */}
      <div className="overflow-hidden rounded-md">
        <Image
          width={500}
          height={500}
          src={getFilePreview(product.image)}
          alt={product.name || 'Product Image'}
          className="w-full h-48 object-cover rounded-md mb-4 transform transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <h3 className="text-base uppercase font-light">{product.name}</h3>

      <div className="text-sm my-3">
        <span className="line-through text-dark mr-2">Rs. {product.price}</span>
         
        <span className="font-bold text-dark-green mr-2">Rs. {product.sale_price || ''}</span>
        {product.sale_price && ( 
              <span className="text-red-600 font-bold">| Rs. {product.price - product.sale_price} OFF</span>
        )}
      </div>

      <div className="flex gap-2 justify-center">
        <button
          className="uppercase px-4 cursor-pointer py-2 text-xs rounded border font-medium border-dark text-dark hover:text-primary hover:bg-dark-green transition-all duration-300"
          onClick={handleShopNow}
        >
         Shop Now
        </button>
        
        {/* Fix the add to cart button classes */}
        <button
          onClick={handleAddToCart}
          className={`uppercase px-4 py-2 text-xs rounded border font-medium transition-all duration-300
            ${isAvailable && productVariants.length > 0
              ? 'border-dark text-dark hover:text-primary hover:bg-dark-green cursor-pointer' 
              : 'border-gray-300 text-gray-400 cursor-not-allowed'
            } 
            ${isAddingToCart ? 'opacity-75' : ''}`}
          disabled={!isAvailable || productVariants.length === 0 || isAddingToCart}
          type="button"
        >
          {isAddingToCart ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
      
      {/* Only show out of stock if explicitly known to be out of stock */}
      {product.stock === 0 && (
        <div className="mt-2 text-xs text-red-500">
          Out of stock
        </div>
      )}
    </div>
  );
};

export default ProductCard;
