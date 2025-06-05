


import React, { useState, useEffect } from "react"; 
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ProductImageSliderProps {
  images: string[];
}

const ShimmerImage = () => (
  <div className="w-full h-full bg-gray-200 shimmer"></div>
);

const ProductImageSlider: React.FC<ProductImageSliderProps> = ({ images }) => {  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  
  useEffect(() => {
    // Show shimmer effect immediately without waiting
    if (images && images.length > 0) {
      // Set loading false immediately to show at least one image
      // The rest of the images will load in the background
      setLoading(false);      // But still preload images for smoother experience
      images.forEach(src => {
        const img = new window.Image();
        img.src = src;
        img.onload = () => {
          setLoadedImages(prev => [...prev, src]);
        };
      });
    } else {
      setLoading(false);
    }
  }, [images]);

  const handleThumbnailClick = (index: number) => {
    if (index === current) return;
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  if (!images || images.length === 0) {
    return <p>No images available</p>;
  }
  
  return (
    <div className="w-full max-w-6xl mx-auto h-[500px] lg:h-[600px]">
      <div className="relative lg:h-[600px] h-[500px] overflow-hidden rounded-xl">
        {loading ? (
          <ShimmerImage />
        ) : (
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={images[current]}
              src={images[current]}
              alt={`Slide ${current}`}
              custom={direction}
              initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute top-0 left-0 lg:w-[700px] lg:h-[600px] h-[500px] object-cover"
            />
          </AnimatePresence>
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex justify-center items-center mt-4 gap-3">
        {images.map((img, index) => (
          <div key={index} className={`w-20 h-20 rounded-md border-2 transition ${
            index === current ? "border-blue-500" : "border-transparent"
          }`}>
            {loading ? (
              <ShimmerImage />
            ) : (
              <Image
                src={img}
                alt={`Thumbnail ${index}`}
                width={500}
                height={500}
                onClick={() => handleThumbnailClick(index)}
                className="w-full h-full object-cover cursor-pointer rounded-md"
                onLoad={() => {
                  if (!loadedImages.includes(img)) {
                    setLoadedImages(prev => [...prev, img]);
                  }
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImageSlider;

