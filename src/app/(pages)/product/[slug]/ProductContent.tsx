'use client';
import React, { useEffect, useState, useRef } from 'react';
import NatureIngredients from './components/Naturalingredients';
import HeroSection from './components/HeroSection';
import FixedBottomCart from './components/FixedBottomCart';
import SectionFive from '@/app/components/SectionFive';
import TextSlider from '@/app/components/TextSlider';
import VideoScrollSection from './components/VideoScrollSectoin';
import VideoSection from '@/app/components/VideoSection';
import productService from '@/appwrite/product';
import { useParams } from 'next/navigation';
import FAQ from './components/FAQ';
import { Product } from '@/types/product';
import { motion, AnimatePresence } from 'framer-motion';
import ProductSkeleton from './components/ProductSkeleton';

const ProductContent = () => {
  const params = useParams();
  const productId = typeof params.slug === 'string' ? params.slug : '';
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true); // Ensure loading is true when starting
      
      if (productId) {
        try {
          const data = await productService.fetchOneProduct(productId);
          setProduct(data as Product); // <--- set the fetched product here
        } catch (error) {
          console.error('Failed to fetch product:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    getProduct();
  }, [productId]);  // Add scroll event listener to detect when to show the cart with throttling for smoother transitions
  useEffect(() => {
    // Use a threshold value to prevent flickering at the transition point
    let isCartVisible = showCart;
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    const handleScroll = () => {
      lastScrollY = window.scrollY;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (heroSectionRef.current && videoSectionRef.current) {
            const heroRect = heroSectionRef.current.getBoundingClientRect();
            const videoRect = videoSectionRef.current.getBoundingClientRect();
            
            // Use better threshold calculation
            const shouldShowCart = heroRect.bottom < window.innerHeight * 0.2;
            
            if (shouldShowCart !== isCartVisible) {
              isCartVisible = shouldShowCart;
              setShowCart(shouldShowCart);
            }
          }
          ticking = false;
        });
        
        ticking = true;
      }
    };

    // Run once on mount to check initial position
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showCart]);
  
  if (loading) {
    return <ProductSkeleton />;
  }

  if (!product) {
    return (
      <div className="pt-22 text-center text-xl font-medium text-red-500">
        Product not found.
      </div>
    );
  }
  // Pass the product as prop to HeroSection
  return (
    <motion.div 
      className='hide-scroll-x'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div ref={heroSectionRef}>
        <HeroSection product={product} />
      </div>
      <div ref={videoSectionRef}>
        <VideoScrollSection />
      </div>
      <TextSlider />
      <NatureIngredients />
      <SectionFive />
      <FAQ/>      <AnimatePresence>
        {showCart && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ 
              type: 'keyframes',
              duration: 0.4,
              ease: "easeOut"
            }}
          >            <FixedBottomCart 
              productName={product.name} 
              productDescription={product.description} 
              productCategory={product.category} 
              productIngredients={product.ingredients}
              product={product}
              selectedVariant={product.variants?.[0] || null}
              selectedVariantIndex={0}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      <VideoSection />
    </motion.div>
  );
};

export default ProductContent;
