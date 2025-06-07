import React from 'react'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import JsonLd from '@/components/JsonLd'
import productService from '@/appwrite/product'
import { generateProductSchema } from './schema'
import { Product } from '@/types/product'
import ProductClient from '@/components/ProductClient'
export { generateMetadata } from './metadata'

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
  const scrolled = true;
  
  // Await the params Promise
  const params = await props.params;
  
  // Fetch product data for schema
  const product = await productService.fetchOneProduct(params.slug) as Product;
  const productSchema = product ? generateProductSchema(product) : null;

  return (
    <div>
      {productSchema && <JsonLd data={productSchema} />}
      <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#363f1d] text-black shadow-md" : "bg-transparent text-black"}`}>
        <Navbar scrolled={true} />
      </div>
      <ProductClient productId={params.slug} />
      <div className='mb-18'>
        <Footer />
      </div>
    </div>
  )
};