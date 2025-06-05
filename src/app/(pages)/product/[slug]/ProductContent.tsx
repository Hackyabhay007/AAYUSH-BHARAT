'use client';
import React, { useEffect, useState } from 'react';
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
import { motion } from 'framer-motion';
import ProductSkeleton from './components/ProductSkeleton';
const ProductContent = () => {
  const params = useParams();
  const productId = typeof params.slug === 'string' ? params.slug : '';
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

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

    getProduct();  }, [productId]);  
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
      <HeroSection product={product} />
      <VideoScrollSection />
      <TextSlider />
      <NatureIngredients />
      <SectionFive />
      <FAQ/>
      <FixedBottomCart 
        productName={product.name} 
        price={product.price} 
        productImage={product?.image} 
        productDescription={product.description} 
        productCategory={product.category} 
        productSalePrice={product?.sale_price}
        productIngredients={product.ingredients}
        product={product}
      />
      <VideoSection />
    </motion.div>
  );
};

export default ProductContent;
