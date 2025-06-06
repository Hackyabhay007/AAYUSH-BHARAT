'use client';
import React, { useState, useEffect } from "react";
import ProductImageSlider from "./ImageSlider";
import ProductDetail from "./ProductDetail";
import getFilePreview from "@/lib/getFilePreview";
import { Product, Variants } from "@/types/product";

interface HeroSectionProps {
  product: Product;
}

const HeroSection: React.FC<HeroSectionProps> = ({ product }) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState<string[]>([]);

  // Get the selected variant
  const selectedVariant: Variants | null =
    product.variants?.[selectedVariantIndex] || null;

  // Update images when variant changes
  useEffect(() => {
    if (selectedVariant) {
      const mainImage = selectedVariant.image ? getFilePreview(selectedVariant.image) : '';
      const additionalImages = selectedVariant.additionalImages
        ? (Array.isArray(selectedVariant.additionalImages)
            ? selectedVariant.additionalImages.map(id => getFilePreview(id))
            : String(selectedVariant.additionalImages).split(',').map(id => getFilePreview(id.trim())).filter(Boolean))
        : [];

      setCurrentImages([mainImage, ...additionalImages].filter(Boolean));
    }
  }, [selectedVariant]);

  const handleVariantChange = (index: number) => {
    setSelectedVariantIndex(index);
  };

  const details = {
    product: product,
    productId: product.$id,
    productName: product.name,
    description: product.description || "",
    category: product.category,
    tags: product.tags || [],
    ingredients: product.ingredients || "",
    selectedVariantIndex,
    onVariantChange: handleVariantChange,
    variants: product.variants || [],
    selectedVariant
  };

  return (
    <div className="pt-20">
      <div className="flex justify-center items-start">
        <div className="flex flex-col lg:flex-row max-w-7xl w-full gap-8 p-2">
          {/* Left Image Slider */}
          <div className="lg:w-1/2 pb-20 lg:pb-4 w-full">
            <div className="">
              <ProductImageSlider images={currentImages} />
            </div>
          </div>

          {/* Right Product Info */}
          <div className="lg:w-1/2 w-full overflow-y-auto hide-scrollbar pr-2">
            <ProductDetail {...details} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;




