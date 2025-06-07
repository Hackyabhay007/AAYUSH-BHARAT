'use client';
import React from 'react';
import ProductContent from '@/app/(pages)/product/[slug]/ProductContent';

interface ProductClientProps {
  productId: string;
}

const ProductClient: React.FC<ProductClientProps> = ({ productId }) => {
  return (
    <div>
      <ProductContent />
    </div>
  );
};

export default ProductClient;
