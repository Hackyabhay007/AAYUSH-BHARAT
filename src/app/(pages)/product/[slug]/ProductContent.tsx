'use client';
import React, { useEffect, useState } from 'react';
import NatureIngredients from './components/Naturalingredients';
import HeroSection from './components/HeroSection';
import FixedBottomCart from './components/FixedBottomCart';
import SectionFive from '@/app/components/SectionFive';
import TextSlider from '@/app/components/TextSlider';
import VideoScrollSection from './components/VideoScrollSectoin';
import VideoSection from '@/app/components/VideoSection';
import productService, { Product } from '@/appwrite/product';
import { useParams } from 'next/navigation';

const ProductContent = () => {
  const params = useParams();
  const productId = typeof params.slug === 'string' ? params.slug : '';
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
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
  }, [productId]);

  if (loading) {
    return (
      <div className="pt-22 text-center text-xl font-medium">
        Loading product...
      </div>
    );
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
    <div className='hide-scroll-x'>
      <HeroSection product={product} />
      <VideoScrollSection />
      <TextSlider />
      <NatureIngredients />
      <SectionFive />
      <FixedBottomCart productName={product.name} price={product.price} productImage={product?.image}/>
      <VideoSection />
    </div>
  );
};

export default ProductContent;
