import React from 'react';
import { motion } from 'framer-motion';

const ProductSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero Section Skeleton */}
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Slider Skeleton */}
          <div className="w-full md:w-1/2">
            <div className="relative w-full h-[500px] lg:h-[600px] bg-gray-200 rounded-xl overflow-hidden shimmer"></div>
            {/* Thumbnail Skeleton */}
            <div className="flex mt-4 gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-20 h-20 bg-gray-200 rounded-md shimmer"></div>
              ))}
            </div>
          </div>

          {/* Product Details Skeleton */}
          <div className="w-full md:w-1/2">
            {/* Rating */}
            <div className="flex items-center h-5 w-32 bg-gray-200 rounded shimmer"></div>
            
            {/* Title */}
            <div className="h-8 w-3/4 bg-gray-200 rounded mt-4 shimmer"></div>
            
            {/* Features */}
            <div className="grid grid-cols-2 gap-2 mt-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 bg-gray-200 rounded-lg shimmer"></div>
              ))}
            </div>
            
            {/* Description */}
            <div className="space-y-2 mt-6">
              <div className="h-4 w-full bg-gray-200 rounded shimmer"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded shimmer"></div>
              <div className="h-4 w-4/6 bg-gray-200 rounded shimmer"></div>
            </div>
              {/* Pricing Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-36 bg-gray-200 rounded-xl shimmer"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductSkeleton;
