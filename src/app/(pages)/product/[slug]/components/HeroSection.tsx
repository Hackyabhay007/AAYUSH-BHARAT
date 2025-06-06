'use client';
import React, { useState } from "react";
import ProductImageSlider from "./ImageSlider";
import ProductDetail from "./ProductDetail";
import getFilePreview from "@/lib/getFilePreview";
import { Product, Variants } from "@/types/product";
interface HeroSectionProps {
  product: Product;
}

const HeroSection: React.FC<HeroSectionProps> = ({ product }) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const selectedVariant: Variants | null =
    product.variants?.[selectedVariantIndex] || null;
  const mainImage = selectedVariant?.image || product.image;
  const additionalImages = selectedVariant?.additionalImages
    ? (Array.isArray(selectedVariant.additionalImages)
        ? selectedVariant.additionalImages
        : String(selectedVariant.additionalImages).split(',').map(id => id.trim()).filter(Boolean))
    : (typeof product.additionalImages === 'string'
        ? (product.additionalImages as string).split(',').map(id => id.trim()).filter(Boolean)
        : Array.isArray(product.additionalImages) 
          ? product.additionalImages 
          : []);

  const images: string[] = [mainImage, ...additionalImages]
    .filter(Boolean)
    .map(id => getFilePreview(id));

  const details = {
    product:product,
    thumbnail:product.image,
    productId:product.$id,
    productName: product.name,
    description: product.description || "",
    price: product.price,
    rating: product.rating,
    weight: product.weight,
    tags:product.tags,
    ingredients:product.ingredients,
    category:product.category,
    selectedVariantIndex,
    sale_price:product.sale_price || 0,
    onVariantChange: setSelectedVariantIndex,
    variants: product.variants || [],
  };

  return (
    <div className="pt-20">
      {/* <div className="text-center bg-beige pt-18 pb-2">
        <h1>Hair and Nail Strength, Boosted by Nano Tech</h1>
      </div> */}
      <div className="flex justify-center items-start">
        <div className="flex flex-col lg:flex-row max-w-7xl w-full gap-8 p-2">
          {/* Left Image Slider */}
          <div className="lg:w-1/2 pb-20 lg:pb-4 w-full">
            <div className="">
              <ProductImageSlider images={images} />
            </div>
          </div>

          {/* Right Product Info */}
          <div className="lg:w-1/2 w-full  overflow-y-auto hide-scrollbar pr-2">
            <ProductDetail {...details} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;




