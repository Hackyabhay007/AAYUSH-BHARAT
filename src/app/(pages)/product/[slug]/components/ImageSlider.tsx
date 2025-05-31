


import React, { useState } from "react"; 
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ProductImageSliderProps {
  images: string[];
}

const ProductImageSlider: React.FC<ProductImageSliderProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleThumbnailClick = (index: number) => {
    if (index === current) return;
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  if (!images || images.length === 0) {
    return <p>No images available</p>;
  }
  
// images.map((image,index)=>{
//   // console.log(index,'->',image);
  
// })
  

  return (
    <div className="w-full max-w-6xl mx-auto h-[600px]">
      <div className="relative h-[500px] overflow-hidden rounded-xl ">
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
      <div className="flex justify-center items-center mt-4 gap-3">
        {images.map((img, index) => (
          
          <Image
            key={index}
            src={img}
            alt={`Thumbnail ${index}`}
            width={500}
            height={500}
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

