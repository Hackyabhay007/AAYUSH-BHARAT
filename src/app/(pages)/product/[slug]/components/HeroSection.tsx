'use client';
import React, { useRef, useEffect, useState } from 'react';
import ProductImageSlider from './ImageSlider';
import ProductDetails from './ProductDetail';

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.offsetHeight);
      }
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <>
      <div className="text-center  bg-beige pt-18 pb-2">
        <h1>Hair and Nail Strength, Boosted by Nano Tech</h1>
      </div>
<div className='flex justify-center items-center'>
   <div className="flex max-w-8xl gap-8 p-2" ref={containerRef}>
        {/* Left Image Slider */}
        <div className="w-1/2 pr-4">
          <div
            className="sticky top-20"
            style={{ maxHeight: `${containerHeight}px`, overflow: 'auto' }}
            >
            <ProductImageSlider />
          </div>
        </div>

        {/* Right Product Info */}
        <div className="w-1/2 ">
          <ProductDetails />
        </div>
      </div>
              </div>
    </>
  );
}

export default HeroSection;
