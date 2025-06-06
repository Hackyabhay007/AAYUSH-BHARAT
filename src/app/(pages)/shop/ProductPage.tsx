"use client";

import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import productService from "@/appwrite/product";
import SectionFour from "@/app/components/SectionFour";
import SectionFive from "@/app/components/SectionFive";
import { Product } from "@/types/product";
import ShimmerProductsGrid from "./components/ShimmerProductsGrid";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        console.log('Fetching products...');
        const data = await productService.fetchProduct();        console.log('Raw product data:', data);
        // Map Document[] to Product[]
        const productsData = data.map((doc) => ({
          $id: doc.$id,
          name: doc.name,
          description: doc.description,
          category: doc.category,
          tags: doc.tags || '',
          ingredients: doc.ingredients || '',
          slug: doc.slug,
          collections: doc.collections || [],
          variants: (doc.variants || []).map(variant => ({
            $id: variant.$id,
            productId: variant.productId,
            weight: variant.weight,
            price: variant.price,
            sale_price: variant.sale_price,
            stock: variant.stock,
            image: variant.image,
            additionalImages: variant.additionalImages || [],
            months: variant.months
          }))
        })) as Product[];
        console.log('Mapped products:', productsData);
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-col pt-0 text-center bg-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl lg:text-4xl font-medium uppercase tracking-wide my-8 text-dark-green">AAYUDH BHARAT RITUAL KITS</h1>
          <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            Discover our authentic collection of Ayurvedic products crafted with time-tested wisdom from Charaka, Sushruta, and Bhaishajya Granthas. 100% natural formulations for holistic wellness without synthetics or chemicals.
          </p>
        
          <div className="pb-12">
            {loading ? (
              <ShimmerProductsGrid />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {products.length > 0 ? (
                  products.map((product) => (
                    <ProductCard 
                      key={product.$id} 
                      product={product} 
                    />
                  ))
                ) : (
                  <div className="col-span-3 py-12 text-center">
                    <p className="text-lg text-gray-600">No products found. Please check back later.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <SectionFour />
        <SectionFive />
      </div>
    </div>
  );
};

export default ProductsPage;
