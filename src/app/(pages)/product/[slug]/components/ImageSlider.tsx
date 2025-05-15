import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Replace with actual image paths
const images = [
  "https://www.zeroharm.in/cdn/shop/files/biotin-01.jpg?v=1718445398&width=990",
  "https://www.zeroharm.in/cdn/shop/products/BiotinAmazonContent17822W1080xH1080pxl30mcg-03.jpg?v=1739794090&width=823",
  "https://www.zeroharm.in/cdn/shop/files/biotin3-01.jpg?v=1739794090&width=823",
  "https://www.zeroharm.in/cdn/shop/products/BiotinAmazonContent17822W1080xH1080pxl30mcg-07.jpg?v=1739794090&width=823",
];

const ProductImageSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleThumbnailClick = (index: number) => {
    if (index === current) return;
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Image Container with fixed height and no scroll jump */}
      <div className="relative h-[550px] overflow-hidden rounded-xl ">
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
            className="absolute top-0 left-0 w-full h-full object-contain"
          />
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      <div className="flex justify-center items-center gap-3 mt-4">
        {images.map((img, index) => (
                  <Image width={500} height={500}
            key={index}
            src={img}
            alt={`Thumbnail ${index}`}
            onClick={() => handleThumbnailClick(index)}
            className={`w-20 h-20 object-cover cursor-pointer rounded-md border-2 transition ${
              index === current ? "border-blue-500" : "border-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImageSlider;
